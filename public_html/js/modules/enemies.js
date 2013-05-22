window.enemy = {};
enemy.create = function (generator) {

    var o = setMerge (enemy.preset (), generator);
    var e = Crafty.e ('2D, Canvas, Image, {0}, {1}'.format (ENEMY_ABS, o.image));
    e.create (o.path, o.speed, o.resistance, o.health, o.shield, o.wobble, o.money);
    return e;
};
Crafty.c (ENEMY_ABS, {
    create: function (path, speed, resistance, health, shield, wobble, money) {
        this.path = path !== undefined ? path : null;
        this.speed = speed !== undefined ? speed : 3;
        this.resistance = resistance !== undefined ? toDamage (resistance) : toDamage (0);
        this.health = (health !== undefined ? health : 100) * DIFFICULTY;
        this.shield = (shield !== undefined ? shield : 0) * DIFFICULTY;
        this.wobble = wobble !== undefined ? wobble : 10;
        this.money = money !== undefined ? money : 0;
        this.bx = (this.w - W) / 2;
        this.by = (this.h - H) / 2;
        this.shieldActor = null;
    },
    init: function () {
        this.z = Z_ENEMY;
        this.resistance = toDamage (0);
        this.shield = 0;
        this.speed = 32;
        this.spd = this.speed;
        this.random = 10;
        this.path = null;

        this.slowShot = null;
        this.hurtShot = null;

        this.healthChanged = false;
        this.maxHealth = 0;
        this.previousHealth = 0;
        this._health = 100;
        this.active = false;
        this.__defineGetter__ ('health', this.getHealth);
        this.__defineSetter__ ('health', this.setHealth);
        this.__defineGetter__ ('center', function () {
            return toPoint ([this.x + this.w / 2, this.y + this.h / 2]);
        });

        //# current point, next point to go
        this._cp = null;
        this._np = null;

        //# point to go, randomness included
        this.coords = {x: 0, y: 0};
        //# block index (starting at zeroth)
        this._bi = 0;
    },
    addShield: function () {
        if (this.shield > 0)
            this.shieldActor = Crafty.e ("Shield").attr ({enemy: this}).start ();
        return this;
    },
    start: function () {
        //# assigning first two path blocks
        if (this.path !== null) {
            this._bi = 0;
            this._cp = this.path[0];
            this.x = this._cp.x - this.bx;
            this.y = this._cp.y - this.bx;
            this.findDirection (this._bi);
        }

        this.addShield ();

        this.maxHealth = this.health;
        this.maxShield = this.shield;
        this.active = true;
        this.requires ('Collision2');
        enemyBrain.add (this);
        this.onHit (SHOT_ABS, this.processHit);
        return this;
    },
    doDestroy: function () {
        this.isNull = true;
        if (this.shieldActor)
            this.shieldActor.destroy ();
        this.destroy ();
    },
    processDeath: function (reason) {
        effects.create (this.center, 'exp_complex', 48).alpha = 0.35;

        Crafty.trigger ('Death', null);
        this.trigger ('Death-shield', null);
        this.doDestroy ();

        if (reason === 'end') {
            Crafty.audio.play ("death_end", 1, VOLUME/2);
            Crafty.trigger (ENEMY_SLIP);
        } else {
            PlayerUtils.addPlayerMoney (this.money + Math.floor ((this.maxHealth + this.maxShield) / MONEY_BALANCE[$.actualLevel]));
            refreshMoney ();
            Crafty.audio.play ("death_0" + Crafty.math.randomInt (1, 5), 1, VOLUME);
        }
    },
    //#
    processHit: function (shots) {
        for (var i = 0, l = shots.length; i < l; i++) {
            var s = shots[i].obj;

            //# was routine already done?
            if (!s.isValid)
                continue;
            s.invalidate ();

            //# P2P routine
            if (s.has (SHOT_P2P)) {
                this.transferDamage (s.getDamage ());

                s.doDestroy ();
                if (this.isDead ())
                    return this.processDeath (s);
            }


            //# HOMING routine
            if (s.has (SHOT_HOMING)) {
                s.doDestroy ();
            }


            //# SPLASH routine
            if (s.has (SHOT_SPLASH) && s.checkHit (this)) {
                this.transferDamage (s.getDamage ());

                if (this.isDead ())
                    return this.processDeath (s);
            }




            //# LASER routine
            if (s.has (SHOT_LASER)) {
                this.transferDamage (s.getDamage ());

                if (this.isDead ())
                    return this.processDeath (s);
            }


        }
    },
    transferDamage: function (dmg) {
        var res = this.getResistance ();

        //# is valid periodic shot
        if (dmg.period > 0 && dmg.repeat > 0 && dmg.value !== 0)
            if (this.hurtShot === null || this.hurtShot.value <= dmg.value)
                this.hurtShot = {
                    'value': dmg.value, 'repeat': dmg.repeat,
                    'period': dmg.period, 'count': 0
                };

        //# is valid slow shot
        if (dmg.slow !== 0 && (dmg.duration > 0 || dmg.duration === -1) && Math.random () < dmg.chance)
            if (this.slowShot === null || this.slowShot.slow <= dmg.slow)
                this.slowShot = {'slow': dmg.slow, 'duration': dmg.duration};


        //# shield left? if so, apply electric
        if (this.shield > 0) {
            this.shield -= (REZISTANCE - res.electric) * dmg.electric;

            //# shield still left? apply rest with smaller dmg
            if (this.shield > 0) {
                this.shield -= (1 / BENEFIT_SHIELD) * (
                        +(REZISTANCE - res.basic) * dmg.basic
                        + (REZISTANCE - res.fire) * dmg.fire
                        + (REZISTANCE - res.poison) * dmg.poison
                        + (REZISTANCE - res.ice) * dmg.ice);

                //# shield gone? good, -rest will substract health (higher dmg)
                if (this.shield < 0) {
                    this.health += this.shield * BENEFIT_SHIELD;
                    this.shield = 0;
                }

                //# no shield, -rest will substract health (higher dmg)
            } else {
                this.health += this.shield * BENEFIT_SHIELD;
                this.shield = 0;
                //# health substraction
                this.health -= (REZISTANCE - res.basic) * dmg.basic
                        + (REZISTANCE - res.fire) * dmg.fire
                        + (REZISTANCE - res.poison) * dmg.poison
                        + (REZISTANCE - res.ice) * dmg.ice;
            }
        } else {
            //# health substraction
            this.health -= (REZISTANCE - res.electric) * dmg.electric
                    + (REZISTANCE - res.basic) * dmg.basic
                    + (REZISTANCE - res.fire) * dmg.fire
                    + (REZISTANCE - res.poison) * dmg.poison
                    + (REZISTANCE - res.ice) * dmg.ice;
        }
    },
    //#
    isDead: function () {
        return this.health <= 0;
    },
    //#
    findDirection: function (bi) {
        if (bi + 1 >= this.path.length) {
            return this.processDeath ('end');
            return;
        }
        this._cp = this.path[bi + 0];
        this._np = this.path[bi + 1];

        //# randomness in movement
        this.coords = {x: this._np.x, y: this._np.y};
        this.coords.x = this._np.x + Crafty.math.randomInt (-this.wobble, +this.wobble) - this.bx;
        this.coords.y = this._np.y + Crafty.math.randomInt (-this.wobble, +this.wobble) - this.by;

        //# angle and x/y step
        this.angle = Math.atan2 (this.coords.y - this.y, this.coords.x - this.x);
        this.xstep = Math.cos (this.angle);
        this.ystep = Math.sin (this.angle);
    },
    isAtNextStop: function () {
        var d = distance (this, this.coords);
        return d < this.spd * 2;
    },
    //#
    getResistance: function () {
        return this.resistance;
    },
    setResistance: function (value) {
        this.resistance = toDamage (value);
        return this;
    },
    //#
    getHealth: function () {
        return this._health;
    },
    setHealth: function (value) {
        if (this._health === value)
            return;
        this._health = value;
        this.previousHealth = this._health;
        this.healthChanged = true;
        return this;
    },
    //#
    getShield: function () {
        return this.shield;
    },
    setShield: function (value) {
        this.shield = value;
        return this;
    },
    //#
    getSpeed: function () {
        return this.speed;
    },
    setSpeed: function (value) {
        this.speed = value;
        return this;
    },
    //#
    getPath: function () {
        return this.path;
    },
    setPath: function (value) {
        this.path = value;
        return this;
    },
    getWobble: function () {
        return this.wobble;
    },
    setWobble: function (value) {
        this.wobble = value;
        return this;
    }
});



Crafty.c (MULTI_FREEZE, {
    init: function () {
        this.s1 = Crafty.e ('2D, Canvas, Image, Mouse').attr ({w: 52, h: 52, z: Z_MULTI_FREEZE}).image ('images/multi-freeze.png');
        this.s2 = Crafty.e ('2D, Canvas, Image').attr ({w: 52, h: 52, z: Z_MULTI_FREEZE, alpha: .5}).image ('images/multi-freeze.png');
        this.s3 = Crafty.e ('2D, Canvas, Image').attr ({w: 52, h: 52, z: Z_MULTI_FREEZE, alpha: .5}).image ('images/multi-freeze.png');
        this.setProgress (0);
        this.chargeStep = 0.005;
        this.step = 0.05;
        this.interval = 5;
        this.stopValue = 0.25;
        this.frameCount = (((1 - this.stopValue) + this.step) / this.step);
        this.delay = this.interval * this.frameCount;
        this.s1.x = this.s2.x = this.s3.x = SCREEN_WIDTH - PANEL_WIDTH - 74;
        this.s1.y = this.s2.y = this.s3.y = SCREEN_HEIGHT - 74;

        var that = this;
        this.s1.bind ('Click', function () {
            that.fire ();
        });

        timer.repeat (this.charge, 25, this);
    },
    setProgress: function (value) {
        this.progress = value;
        this.s1.visible = this.progress === 1;
        this.s2.visible = this.progress !== 1;
        this.s2.h = 52 * this.progress;
        return this;
    },
    charge: function () {
        if ($.buildPhase())
            return;
        var val = this.progress + this.chargeStep;
        if (val >= 1)
            val = 1;
        this.setProgress (val);
    },
    recharge: function () {
        this.setProgress (100);
    },
    fire: function () {
        if ($.buildPhase())
            return;
        this.setProgress (0);
        this.fireStart ();
    },
    fireStart: function () {
        enemySpeed = 1;
        timer.repeat (this.decSpeed, this.interval, this, this.frameCount);
        timer.delay (this.fireReverse, this.delay * 2, this);
    },
    fireReverse: function () {
        enemySpeed = this.stopValue;
        timer.repeat (this.incSpeed, this.interval, this, this.frameCount);
        timer.delay (this.fireEnd, this.delay, this);
    },
    fireEnd: function () {
        enemySpeed = 1;
    },
    decSpeed: function () {
        enemySpeed -= this.step;
    },
    incSpeed: function () {
        enemySpeed += this.step;
    }
});
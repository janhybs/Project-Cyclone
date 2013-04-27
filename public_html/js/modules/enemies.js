window.enemy = {};
enemy.create = function (generator) {

    var o = setMerge (enemy.preset (), generator);

    var e = Crafty.e ('2D, Canvas, Image, {0}, {1}'.format (ENEMY_ABS, o.image));
    e.w *= o.size;
    e.h *= o.size;
    e.create (o.path, o.speed, o.resistance, o.health, o.shield, o.wobble);
    return e;
};



Crafty.c (ENEMY_ABS, {
    create: function (path, speed, resistance, health, shield, wobble) {
        this.path = path !== undefined ? path : null;
        this.speed = speed !== undefined ? speed : 3;
        this.resistance = resistance !== undefined ? toDamage (resistance) : toDamage (0);
        this.health = health !== undefined ? health : 100;
        this.shield = shield !== undefined ? shield : 0;
        this.wobble = wobble !== undefined ? wobble : 10;
    },
    init: function () {
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
    start: function () {
        //# assigning first two path blocks
        if (this.path !== null) {
            this._bi = 0;
            this._cp = this.path[0];
            this.x = this._cp.x;
            this.y = this._cp.y;
            this.findDirection (this._bi);
        }

        this.maxHealth = this.health;
        this.maxShield = this.shield;
        this.requires ('Collision');
        enemyBrain.add (this);
        this.onHit (SHOT_ABS, this.processHit);
    },
    processDeath: function (reason) {
        doSplash (this);
        this.trigger ('Death', null);
        this.destroy ();
        this.isNull = true;
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
        this.coords.x = this._np.x + Crafty.math.randomInt (-this.wobble, +this.wobble);
        this.coords.y = this._np.y + Crafty.math.randomInt (-this.wobble, +this.wobble);

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
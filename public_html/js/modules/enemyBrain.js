Crafty.c (ENEMY_BRAIN, {
    init: function () {
        this.items = [];
        this.requires ("Framer");
        this.repeat (this.clean, FRAME_RATE * 30);
        this.bind ("EnterFrame", this.enterFrame);
        this.n = 0;
        this.mod = 2;
    },
    enterFrame: function () {
        if (this.n++ % this.mod !== 0)
            return;
        for (var i in this.items) {
            var enemy = this.items[i];
            if (enemy === null || enemy === undefined || enemy.isNull)
                continue;

            this.enemyEnterFrame (enemy);
        }
    },
    enemyEnterFrame: function (e) {
        e.spd = e.speed;

        //# slow shot
        if (e.slowShot !== null) {
            e.spd *= 1 - e.slowShot.slow;

            if (--e.slowShot.duration === 0)
                e.slowShot = null;
        }


        //# hurt shot
        if (e.hurtShot !== null) {
            if (++e.hurtShot.count === e.hurtShot.period) {
                e.hurtShot.count = 0;
                e.transferDamage (toDamage (e.hurtShot.value));

                if (e.isDead ())
                    return e.processDeath (e.hurtShot);

                if (--e.hurtShot.repeat === 0)
                    e.hurtShot = null;
            }
        }

        //# moving
        if (e.spd > 0) {
            e.x += e.xstep * e.spd * this.mod;
            e.y += e.ystep * e.spd * this.mod;
        }

        if (e.healthChanged) {
            e.healthChanged = false;
            e.trigger ('HealthChanged', {previous: e.previousHealth, current: e._health});
        }

        //# if enemy has reached next point (block)
        //# generate next coords (xstep, ystep)
        if (e.path !== null && e.isAtNextStop ()) {
            e.findDirection (++e._bi);
        }
    },
    add: function (enemy) {
        return this.items.push (enemy) - 1;
    },
    removebyIndex: function (index) {
        if (index === -1)
            return undefined;
        return this.items.splice (index, 1);
    },
    removebyRef: function (enemy) {
        return this.removebyIndex (this.items.indexOf (enemy));
    },
    clean: function () {
        var j = 0;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] === null
                    || this.items[i] === undefined
                    || this.items[i].isNull) {
                this.items.splice (i, 1);
                i--;
                j++;
            }
        }
    }


});

window.enemyBrain = Crafty.e (ENEMY_BRAIN);
window.shot = {
    get: function (type, avatar, avatar2) {
        switch (type) {
            case SHOT_P2P:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}, {2}'.format (SHOT_ABS, type, avatar || P2P_IMAGE_NAME.shotNormal));
            case SHOT_LASER:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}'.format (SHOT_ABS, type))
                        .setImage (avatar || LASER_IMAGE_PATH.laserThickPurple)
                        .setEnding (avatar2 || LASER_IMAGE_NAME.laserThickPurpleEnd)
                        .attr ({w: 10, h: 10});
            case SHOT_HOMING:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}, {2}'.format (SHOT_ABS, type, avatar || HOMING_IMAGE_NAME.rocketBlueSmall));
            case SHOT_SPLASH:
                return Crafty.e ('2D, Canvas, Image, SpriteAnimation, {0}, {1}, {2}'.format (SHOT_ABS, type, avatar || SPLASH_IMAGE_NAME.auraRed))
                        .attr ({w: W, h: H});
        }
    }
};


Crafty.c (SHOT_ABS, {
    abstractCreate: function (startPoint, endPoint, ttl, damage) {
        this.startPoint = toPoint (startPoint);
        this.endPoint = toPoint (endPoint);
        this.ttl = ttl !== undefined ? ttl * FRAME_RATE : 10 * FRAME_RATE;
        this.damage = damage !== undefined ? damage : toDamage (0);
    },
    init: function () {
        this.ttl = 10 * FRAME_RATE;
        this.startPoint = this.endPoint = null;
        this.damage = toDamage (0);
        this.visible = false;
        this.isValid = true;
    },
    //#
    invalidate: function () {
        this.isValid = false;
    },
    //#
    getStartPoint: function () {
        return this.startPoint;
    },
    setStartPoint: function (value) {
        this.startPoint = toPoint (value);
        return this;
    },
    //#
    getEndPoint: function () {
        return this.endPoint;
    },
    setEndPoint: function (value) {
        this.endPoint = toPoint (value);
        return this;
    },
    //#
    getTTL: function () {
        return this.ttl;
    },
    setTTL: function (value) {
        this.ttl = value;
        return this;
    },
    //#
    getDamage: function () {
        return this.damage;
    },
    setDamage: function (value) {
        this.damage = toDamage (value);
        return this;
    }
});


Crafty.c (SHOT_P2P, {
    create: function (speed, angle, spreading) {
        this.speed = speed !== undefined ? speed : NaN;
        this.angle = angle !== undefined ? angle : NaN;
        this.spreading = spreading !== undefined ? (spreading / 180) * PI : 0;
    },
    //#
    enterFrame: function () {

        this.x += this.xstep;
        this.y += this.ystep;
        this.rotation = (this.angle / PI) * 180;

        //# destroy rutine
        if (this.ttl-- <= 0) {
            this.destroy ();
        }
    },
    //#
    start: function () {

        if (this.startPoint !== null) {
            this.x = this.startPoint.x - this.w / 2;
            this.y = this.startPoint.y - this.h / 2;
            this.origin (this.w / 2, this.h / 2);
        }

        if (this.endPoint !== null) {
            this.shiftPoint = toPoint ([this.startPoint.x, this.startPoint.y]);
            this.angle = Math.atan2 (this.endPoint.y - this.shiftPoint.y, this.endPoint.x - this.shiftPoint.x) - this.spreading / 2 + Math.random () * this.spreading;
            this.xstep = Math.cos (this.angle) * this.speed;
            this.ystep = Math.sin (this.angle) * this.speed;
            this.bind ("EnterFrame", this.enterFrame);
            this.visible = true;
        } else if (!isNaN (this.angle)) {
            this.angle = this.angle - this.spreading / 2 + Math.random () * this.spreading;
            this.xstep = Math.cos (this.angle) * this.speed;
            this.ystep = Math.sin (this.angle) * this.speed;
            this.bind ("EnterFrame", this.enterFrame);
            this.visible = true;
        }
    },
    //#
    doDestroy: function () {
        effects.create ([this.x + this.w / 2, this.y + this.h / 2], 'exp_simple', 8);
        this.destroy ();
    },
    //#
    getSpeed: function () {
        return this.speed;
    },
    setSpeed: function (value) {
        this.speed = value;
        this.xstep = Math.cos (this.angle) * this.speed;
        this.ystep = Math.sin (this.angle) * this.speed;
        return this;
    },
    //#
    getAngle: function () {
        return this.angle;
    },
    setAngle: function (value) {
        this.angle = (value / 180) * PI - this.spreading / 2 + Math.random () * this.spreading;
        this.xstep = Math.cos (this.angle) * this.speed;
        this.ystep = Math.sin (this.angle) * this.speed;
        return this;
    },
    //#
    getSpreading: function () {
        return this.spreading;
    },
    setSpreading: function (value) {
        this.spreading = (value / 180) * PI;
        return this;
    }
});



Crafty.c (SHOT_LASER, {
    //variable enables radius range
    withRadius: false,
    //variable with range
    rangeRadius: 0,
    create: function (laser, ending) {
        this.angle = NaN;
        if (!this.ending || ending)
            this.setEnding (ending || LASER_IMAGE_NAME.laserThinRedEnd);
        if (!this.laser || laser)
            this.setImage (laser || LASER_IMAGE_PATH.laserThinRed);
    },
    //#
    enterFrame: function () {
        var ep = {x: this.endPoint.x, y: this.endPoint.y};

        if (this.withRadius) {
            var d = this.rangeRadius / distance (this.shiftPoint, this.endPoint);
            d = d > 1 ? 1 : d;
            ep.x = this.startPoint.x + (this.endPoint.x - this.startPoint.x) * d;
            ep.y = this.startPoint.y + (this.endPoint.y - this.startPoint.y) * d;
        }

        this.angle = Math.atan2 (
                (ep.y - this.startPoint.y),
                (ep.x - this.startPoint.x));

        this.x = ep.x - this.w / 2;
        this.y = ep.y - this.h / 2;
        this.laser.w = this.len + distance (this.shiftPoint, ep);
        this.laser.rotation = (this.angle * 180) / Math.PI;
        this.laser.visible = true;
        this.ending.visible = true;

        this.ending.x = ep.x - this.ending.w/2;
        this.ending.y = ep.y - this.ending.h/2;
    },
    //#
    start: function () {
        if (this.startPoint !== null && this.endPoint !== null) {
            this.laser.z = this.z;
            this.ending.z = this.z+1;
            this.setStartPoint (this.startPoint);
            this.laser.origin (0, this.laser.h / 2);
            this.len = 0;
            this.bind ("EnterFrame", this.enterFrame);
            this.visible = true;
        }
    },
    //#
    getAngle: function () {
        return this.angle;
    },
    setAngle: function (value) {
        this.angle = value;
        this.xstep = Math.cos (this.angle) * this.speed;
        this.ystep = Math.sin (this.angle) * this.speed;
        return this;
    },
    //#
    setStartPoint: function (value) {
        this.startPoint = toPoint (value);
        if (!this.laser)
            return;
        this.laser.x = this.startPoint.x;
        this.laser.y = this.startPoint.y - H / 2;
        this.laser.h = H;
        this.laser.w = W;
        this.shiftPoint = toPoint ([this.startPoint.x, this.startPoint.y]);
        return this;
    },
    //#
    doDestroy: function () {
        this.laser.destroy ();
        this.ending.destroy ();
        this.destroy ();
    },
    //#
    invalidate: function () {
        //# this.isValid = false;
        //# laser is always valid
    },
    //#
    setImage: function (path) {
        this.laser = Crafty.e ("2D, Canvas, Image").image (path, "repeat");
        this.laser.visible = false;
        return this;
    },
    //#
    setEnding: function (avatar) {
        this.ending = Crafty.e ("2D, Canvas, Image, {0}".format (avatar));
        this.ending.visible = false;
        return this;
    }
});



Crafty.c (SHOT_HOMING, {
    create: function (speed, curving) {
        this.speed = speed !== undefined ? speed : NaN;
        this.curving = curving !== undefined ? curving : 30;
        this.angle = NaN;
    },
    //#
    enterFrame: function () {
        this.shiftPoint = toPoint ([this.x + this.w / 2, this.y + this.h / 2]);
        this.angle = Math.atan2 (this.endPoint.y - this.shiftPoint.y, this.endPoint.x - this.shiftPoint.x);
        this.aprox = radDist (this.aprox, this.angle, this.curving);
        this.xstep = Math.cos (this.aprox) * this.speed;
        this.ystep = Math.sin (this.aprox) * this.speed;
        this.x += this.xstep;
        this.y += this.ystep;
        this.rotation = (this.aprox / PI) * 180;

        //# destroy rutine
        if (this.ttl-- <= 0)
            this.destroy ();

        //# once in a while llok for next target
        if (this.ttl % (FRAME_RATE * 5) === 0)
            this.findEnemy ();
    },
    //#
    start: function () {
        if (this.startPoint !== null) {
            this.x = this.startPoint.x - this.w / 2;
            this.y = this.startPoint.y - this.h / 2;
            this.origin (this.w / 2, this.h / 2);
            this.shiftPoint = toPoint ([this.x, this.y]);
            this.findEnemy ();
            this.angle = Math.atan2 (this.endPoint.y - this.shiftPoint.y, this.endPoint.x - this.shiftPoint.x);
            this.aprox = this.angle;
            this.bind ("EnterFrame", this.enterFrame);
            this.visible = true;
        }
    },
    //#
    findEnemy: function () {
        var elems = getEntities (ENEMY_ABS, this, 1 * 1000 * 1000);
        if (elems.length === 0)
            return;
        var aim = aiming.get (AIMING_FURTHEST);
        this.endPoint = aim.getElement (elems, this.startPoint);
    },
    //# when destroyed, release SPLASH shot
    doDestroy: function () {
        //# homing destroy effect
        effects.create ([this.x + this.w / 2, this.y + this.h / 2], 'exp_simple', 32);
        //# homing splash effect
        effects.create ([this.x + this.w / 2, this.y + this.h / 2], 'exp_simple', 64).attr ({alpha: 0.3});
        var s = shot.get (SHOT_SPLASH);
        s.alpha = 0;
        s.setStartPoint (this);
        s.create (128);
        s.setTTL (FRAME_RATE);
        s.setDamage (this.getDamage ());
        s.start ();
        this.destroy ();
    },
    //#
    getAngle: function () {
        return this.angle;
    },
    setAngle: function (value) {
        this.angle = value;
        this.xstep = Math.cos (this.angle) * this.speed;
        this.ystep = Math.sin (this.angle) * this.speed;
        return this;
    },
    getCurving: function () {
        return this.curving;
    },
    setCurving: function (value) {
        this.curving = value;
        return this;
    }
});



Crafty.c (SHOT_SPLASH, {
    create: function (radius) {
        this.radius = radius !== undefined ? radius : 100;
        this.w = this.h = this.radius;
        this.nextIsInvalid = false;
    },
    //#
    enterFrame: function () {

        //# destroy rutine
        if (this.ttl-- <= 0) {
            this.destroy ();
        }

        //# should fix hurting multiple enemies at once
        if (this.nextIsInvalid)
            this.isValid = false;
    },
    //# invalidation will be set in next EnterFrame round
    //# so this shot can be used on more than one enemy
    //# at the same time
    invalidate: function () {
        this.nextIsInvalid = true;
    },
    //#
    start: function () {
        if (this.startPoint !== null) {
            this.x = this.startPoint.x + (W - this.w) / 2;
            this.y = this.startPoint.y + (H - this.h) / 2;
            this.center = toPoint ([this.startPoint.x + W / 2, this.startPoint.y + H / 2]);
            this.bind ("EnterFrame", this.enterFrame);
            this.visible = true;
        }
    },
    //#
    checkHit: function (enemy) {
        return distance (this.center, enemy.center) <= this.radius / 2;
    },
    //#
    getRadius: function () {
        return this.radius;
    },
    setRadius: function (value) {
        this.radius = value;
        return this;
    }
});

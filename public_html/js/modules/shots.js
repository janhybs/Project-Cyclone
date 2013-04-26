window.shot = {
    get: function (type) {
        switch (type) {
            case SHOT_P2P:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}, shot'.format (SHOT_ABS, type))
                        .attr ({w: W, h: H});
            case SHOT_LASER:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}'.format (SHOT_ABS, type))
                        .attr ({w: 10, h: 10});
            case SHOT_HOMING:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}, rocket'.format (SHOT_ABS, type))
                        .attr ({w: 40 * .7, h: 25 * .7});
            case SHOT_SPLASH:
                return Crafty.e ('2D, Canvas, Image, SpriteAnimation, {0}, {1}, exp_simple_32_16'.format (SHOT_ABS, type))
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
        this.visible = true;
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
        }

        if (this.endPoint !== null) {
            this.shiftPoint = toPoint ([this.startPoint.x , this.startPoint.y]);
            this.angle = Math.atan2 (this.endPoint.y - this.shiftPoint.y, this.endPoint.x - this.shiftPoint.x) - this.spreading / 2 + Math.random () * this.spreading;
            this.xstep = Math.cos (this.angle) * this.speed;
            this.ystep = Math.sin (this.angle) * this.speed;
            this.requires ('Collision');
            this.bind ("EnterFrame", this.enterFrame);
        } else if (!isNaN (this.angle)) {
            this.angle = this.angle - this.spreading / 2 + Math.random () * this.spreading;
            this.xstep = Math.cos (this.angle) * this.speed;
            this.ystep = Math.sin (this.angle) * this.speed;
            this.requires ('Collision');
            this.bind ("EnterFrame", this.enterFrame);
        }
    },
    //#
    doDestroy: function () {
        doSplash (this);
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
    create: function (laser) {
        this.angle = NaN;
        this.laser = Crafty.e ("2D, Canvas, Image").image (laser !== undefined ? laser : "images/laser-01.png", "repeat");
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
    },
    //#
    start: function () {
        if (this.startPoint !== null && this.endPoint !== null) {
            this.laser.z = this.z;
            this.setStartPoint (this.startPoint);
            this.laser.origin (0, this.laser.h / 2);
            this.len = 0;
            this.bind ("EnterFrame", this.enterFrame);
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
        this.destroy ();
    },
    //#
    invalidate: function () {
        //# this.isValid = false;
        //# laser is always valid
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
        if (this.ttl-- <= 0) {
            this.destroy ();
        }
    },
    //#
    start: function () {
        if (this.startPoint !== null && this.endPoint !== null) {
            this.x = this.startPoint.x - this.w / 2;
            this.y = this.startPoint.y - this.h / 2;
            this.origin (this.w / 2, this.h / 2);
            this.shiftPoint = toPoint ([this.x, this.y]);
            this.angle = Math.atan2 (this.endPoint.y - this.shiftPoint.y, this.endPoint.x - this.shiftPoint.x);
            this.aprox = this.angle;
            this.requires ('Collision');
            this.bind ("EnterFrame", this.enterFrame);
        }
    },
    //# when destroyed, release SPLASH shot
    doDestroy: function () {
        doSplash (this);
        var s = shot.get (SHOT_SPLASH);
        s.alpha = .3;
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
            this.requires ('Collision');
            this.bind ("EnterFrame", this.enterFrame);
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
    },
});

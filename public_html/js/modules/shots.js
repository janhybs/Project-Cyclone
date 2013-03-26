window.shot = {
    get: function (type) {
        switch (type) {
            case SHOT_P2P:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}, shot'.format (SHOT_ABS, type))
                        .attr ({w: W, h: H});
            case SHOT_LASER:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}'.format (SHOT_ABS, type))
                        .attr ({w: W, h: H});
            case SHOT_HOMING:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}, laser'.format (SHOT_ABS, type))
                        .attr ({w: W / 2, h: H / 2});
            case SHOT_SPLASH:
                return Crafty.e ('2D, Canvas, Image, SpriteAnimation, {0}, {1}, exp_simple_32_16'.format (SHOT_ABS, type))
                        .attr ({w: 1, h: 1});
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

        //# destroy rutine
        if (this.ttl-- <= 0) {
            this.destroy ();
        }
    },
    //#
    start: function () {
        if (this.startPoint !== null && this.endPoint !== null) {
            this.x = this.startPoint.x;
            this.y = this.startPoint.y;
            this.angle = Math.atan2 (this.endPoint.y - this.y, this.endPoint.x - this.x) - this.spreading / 2 + Math.random () * this.spreading;
            this.xstep = Math.cos (this.angle) * this.speed;
            this.ystep = Math.sin (this.angle) * this.speed;
            this.requires ('Collision');
            this.bind ("EnterFrame", this.enterFrame);
        } else if (this.startPoint !== null && !isNaN (this.angle)) {
            this.x = this.startPoint.x;
            this.y = this.startPoint.y;
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
    create: function (angle) {
        this.angle = angle !== undefined ? angle : NaN;
        this.laser = Crafty.e ("2D, Canvas, Image").image ("images/laser-cat.png", "repeat");
    },
    //#
    enterFrame: function () {
        this.angle = Math.atan2 (this.endPoint.y - this.y, this.endPoint.x - this.x);
        this.laser.w = W / 2 / 2 + Math.sqrt (Math.pow (this.startPoint.x - this.endPoint.x, 2) + Math.pow (this.startPoint.y - this.endPoint.y, 2));
        this.laser.h = H / 2;
        this.laser.rotation = (this.angle * 180) / Math.PI;
    },
    //#
    start: function () {
        if (this.startPoint !== null && this.endPoint !== null) {
            this.x = this.startPoint.x;
            this.y = this.startPoint.y;
            this.laser.x = this.x + W / 2 / 2;
            this.laser.y = this.y + H / 2 / 2;
            this.laser.origin (W / 2 / 2, H / 2 / 2);
            this.angle = Math.atan2 (this.endPoint.y - this.y, this.endPoint.x - this.x);
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

        this.angle = Math.atan2 (this.endPoint.y - this.y - H, this.endPoint.x - this.x - W);
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
            this.x = this.startPoint.x;
            this.y = this.startPoint.y;
            this.angle = Math.atan2 (this.endPoint.y - this.y - H, this.endPoint.x - this.x - W);
            this.aprox = this.angle;
            this.requires ('Collision');
            this.bind ("EnterFrame", this.enterFrame);
        }
    },
    //# when destroyed, release SPLASH shot
    doDestroy: function () {
        doSplash (this);
        var s = shot.get (SHOT_SPLASH);
        s.setStartPoint (this);
        s.create (20, 64);
        s.setTTL (FRAME_RATE);
        s.setFrameCount (16);
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
    create: function (growth, radius) {
        this.growth = growth !== undefined ? growth : 25;
        this.radius = radius !== undefined ? radius : 100;
        this.nextIsInvalid = false;
    },
    //#
    enterFrame: function () {

        if (this.w < this.radius) {
            this.w += (this.radius - this.w) / this.growth + this.radius / 100;
            this.h = this.w;

            //# bound check
            if (this.w > this.radius)
                this.w = this.h = this.radius;

            this.x = this.startPoint.x - this.w / 2;
            this.y = this.startPoint.y - this.h / 2;
        }

        //# destroy rutine
        if (this.ttl-- <= 0) {
            this.destroy ();
        }

        //#
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
            this.x = this.startPoint.x;
            this.y = this.startPoint.y;
            this.requires ('Collision');
            this.bind ("EnterFrame", this.enterFrame);
            this.animate ('splash-growth', 10, -1);
        }
    },
    //#
    getGrowth: function () {
        return this.growth;
    },
    setGrowth: function (value) {
        this.growth = value;
        return this;
    },
    //#
    getRadius: function () {
        return this.radius;
    },
    setRadius: function (value) {
        this.radius = value;
        return this;
    },
    //#
    setFrameCount: function (value) {
        this.frameCount = value;
        this.animate ('splash-growth', [
            [0, 0], [1, 0], [2, 0], [3, 0],
            [0, 1], [1, 1], [2, 1], [3, 1],
            [0, 2], [1, 2], [2, 2], [3, 2],
            [0, 3], [1, 3], [2, 3], [3, 3]
        ]);
        return this;
    }
});

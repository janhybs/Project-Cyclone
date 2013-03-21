Crafty.c (ENEMY_ABS, {
    create: function (path, speed, resistance, health, shield, random) {
        this.path = path !== undefined ? path : null;
        this.speed = speed !== undefined ? speed : 3;
        this.resistance = resistance !== undefined ? toDamage (resistance) : toDamage (0);
        this.health = health !== undefined ? health : 100;
        this.shield = shield !== undefined ? shield : 0;
        this.random = random !== undefined ? random : 10;
    },
    init: function () {
        this.resistance = toDamage (0);
        this.health = 100;
        this.shield = 0;
        this.speed = 32;
        this.random = 10;
        this.path = null;

        //# current point, next point to go
        this._cp = null;
        this._np = null;

        //# point to go, randomness included
        this.coords = {x: 0, y: 0};
        //# block index (starting at zeroth)
        this._bi = 0;
    },
    enterFrame: function () {

        //# moving
        this.x += this.xstep;
        this.y += this.ystep;

        //# if enemy has reached next point (block)
        //# generate next coords (xstep, ystep)
        if (this.isAtNextStop ()) {
            this.findDirection (++this._bi);
        }
    },
    start: function () {
        //# assigning first two path blocks
        this._bi = 0;
        this._cp = this.path[0];
        this.x = this._cp.x;
        this.y = this._cp.y;
        this.findDirection (this._bi);
        this.bind ("EnterFrame", this.enterFrame);
    },
    findDirection: function (bi) {
        if (bi + 1 >= this.path.length) {
            this.doSplash ();
            this.destroy ();
            return;
        }
        this._cp = this.path[bi + 0];
        this._np = this.path[bi + 1];

        //# randomness in movement
        this.coords = {x: this._np.x, y: this._np.y};
        this.coords.x = this._np.x + Crafty.math.randomInt (-this.random, +this.random);
        this.coords.y = this._np.y + Crafty.math.randomInt (-this.random, +this.random);

        //# angle and x/y step
        this.angle = Math.atan2 (this.coords.y - this.y, this.coords.x - this.x);
        this.xstep = Math.cos (this.angle) * this.speed;
        this.ystep = Math.sin (this.angle) * this.speed;
    },
    doSplash: function () {
        var s = shot.get (SHOT_SPLASH);
        s.setStartPoint (this);
        s.create (20, 64);
        s.setTTL (2 * FRAME_RATE);
        s.setFrameCount (16);
        s.start ();
    },
    isAtNextStop: function () {
        var d = distance (this, this.coords);
        return d < this.speed * 2;
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
        return this.health;
    },
    setHealth: function (value) {
        this.health = value;
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
    getRandom: function () {
        return this.random;
    },
    setRandom: function (value) {
        this.random = value;
        return this;
    },
});


Crafty.c (ENEMY_SIMPLE, {
    init: function () {
    }
});
Crafty.c (ENEMY_ABS, {
    abstractCreate: function (resistance, health, shield, speed, path) {
        this.resistance = resistance !== undefined ? toDamage (resistance) : toDamage (0);
        this.health = health !== undefined ? health : 100;
        this.shield = shield !== undefined ? shield : 0;
        this.speed = speed !== undefined ? speed : 3;
        this.path = path !== undefined ? path : null;
    },
    init: function () {
        this.resistance = toDamage (0);
        this.health = 100;
        this.shield = 0;
        this.speed = 32;
        this.path = enlargePath (expandPath (splitPath ('0,0 1,0 1,8 8,8 12,8 12,14 15,14 15,0 16,0 16,6')));

        //# current point and next point to go
        this._cp = null;
        this._np = null;
        //# block index (starting at zeroth)
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
        this.findDirection (this._bi);
        this.x = this._cp.x;
        this.y = this._cp.y;
        this.bind ("EnterFrame", this.enterFrame);
    },
    findDirection: function (bi) {
        if (bi+1 >= this.path.length) {
            this._bi = 0;
            this.findDirection (this._bi);
            return;
        }
        this._cp = this.path[bi + 0];
        this._np = this.path[bi + 1];
        this.angle = Math.atan2 (this._np.y - this.y, this._np.x - this.x);
        this.xstep = Math.cos (this.angle) * this.speed;
        this.ystep = Math.sin (this.angle) * this.speed;
    },
    isAtNextStop: function () {
        var d = distance (this, this._np);
        return d < 5;
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
    }
});


Crafty.c (ENEMY_SIMPLE, {
    init: function () {
        console.log ('-enemy');
    }
});
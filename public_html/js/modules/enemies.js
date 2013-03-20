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
        this.speed = 3;
        this.path = null;
    },
    enterFrame: function () {
        console.log ('abs');
    },
    start: function () {
        this.bind ("EnterFrame", this.enterFrame);
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
    enterFrame: function () {
        console.log ('enemy');
    },
});
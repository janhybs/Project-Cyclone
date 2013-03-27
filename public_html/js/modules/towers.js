/*** TOWER MODULE ***/

/*** Define as global object ***/
window.tower = {
    get: function(type) {
        switch (type) {
            case TOWER_MACHINEGUN:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_P2P, type))
                        .attr({w: W, h: H});
            case TOWER_FLAMETHROWER:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_P2P, type))
                        .attr({w: W, h: H});
            case TOWER_BEAM_LASER:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, cat'.format(TOWER_ABS, TOWER_LASER, type))
                        .attr({w: W, h: H});
            case TOWER_CHAIN_LASER:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, cat'.format(TOWER_ABS, TOWER_LASER, type))
                        .attr({w: W, h: H});
            case TOWER_HOMING_MISSILE:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, cat'.format(TOWER_ABS, TOWER_HOMING, type))
                        .attr({w: W, h: H});
            case TOWER_ELECTRIC_AURA:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, cat'.format(TOWER_ABS, TOWER_SPLASH, type))
                        .attr({w: W, h: H});
        }
    }
};

/*** ABSTRACT TOWER COMPONENTS ***/

/*** Base Abstract Tower Component ***/
Crafty.c(TOWER_ABS, {
    abstractCreate: function(startPoint, damage, outputDamage, rate, range, price) {
        this.startPoint = toPoint(startPoint);
        this.damage = damage !== undefined ? damage : toDamage(0);
        this.rate = rate !== undefined ? rate : NaN;
        this.range = range !== undefined ? range : NaN;
        this.outputDamage = outputDamage !== undefined ? outputDamage : NaN;
        this.level = 1;
        this.price = price !== undefined ? price : DEFAULT_PRICE;
    },
    init: function() {
        this.startPoint = null;
    },
    getStartPoint: function() {
        return this.startPoint;
    },
    setStartPoint: function(value) {
        this.startPoint = toPoint(value);
        this.x = this.startPoint.x;
        this.y = this.startPoint.y;
        return this;
    },
    getDamage: function() {
        return this.damage;
    },
    setDamage: function(damage) {
        this.damage = toDamage(damage);
        return this;
    },
    getOutputDamage: function() {
        return this.outputDamage;
    },
    setOutputDamage: function(outputDamage) {
        this.outputDamage = toDamage(outputDamage);
        return this;
    },
    getRate: function() {
        return this.rate;
    },
    setRate: function(rate) {
        this.rate = rate;
        return this;
    },
    getRange: function() {
        return this.range;
    },
    setRange: function(range) {
        this.range = range;
        return this;
    },
    getPrice: function() {
        return this.price;
    },
    setPrice: function(price) {
        this.price = price;
        return this;
    },
    getLevel: function() {
        return this.level;
    },
    setLevel: function(level) {
        this.level = level !== MAX_LEVEL ? level : MAX_LEVEL;
        return this;
    }
});

/*** Abstract P2P Tower Component ***/
Crafty.c(TOWER_P2P, {
    abstractCreate: function(endPoint, spreading) {
        this.endPoint = toPoint(endPoint);
        this.spreding = spreading !== undefined ? spreading : 0;
    },
    getEndPoint: function() {
        return this.endPoint;
    },
    setEndPoint: function(value) {
        this.endPoint = toPoint(value);
        return this;
    },
    getSpreading: function() {
        return this.spreading;
    },
    setSpreading: function(value) {
        this.spreading = toPoint(value);
    }   
});

/*** Abstract Laser Tower Component ***/
Crafty.c(TOWER_LASER, {
    abstractCreate: function(endPoint) {
        this.endPoint = toPoint(endPoint);
    },
    getEndPoint: function() {
        return this.endPoint;
    },
    setEndPoint: function(value) {
        this.endPoint = toPoint(value);
        return this;
    }
});

/*** Abstract Homing Missile Tower Component ***/
Crafty.c(TOWER_HOMING, {
    abstractCreate: function(endPoint, curving) {
        this.endPoint = toPoint(endPoint);
        this.curving = curving !== undefined ? curving : NaN;
    },
    getEndPoint: function() {
        return this.endPoint;
    },
    setEndPoint: function(value) {
        this.endPoint = toPoint(value);
        return this;
    },
    getCurving: function() {
        return this.curving;
    },
    setCurving: function(value) {
        this.curving = curving;
        return this;
    }
});

/*** Abstract Splash Tower Component ***/
Crafty.c(TOWER_SPLASH, {
    abstractCreate: function(growth, radius) {
        this.growth = growth !== undefined ? growth : NaN;
        this.radius = radius !== undefined ? radius : NaN;
    },
    getGrowth: function() {
        return this.growth;
    },
    setGrowth: function(growth) {
        this.growth = growth;
        return this;
    },
    getRadius: function() {
        return this.radius;
    },
    setRadius: function(radius) {
        this.radius = radius;
        return this;
    }
});

/*** TOWER COMPONENTS P2P ***/

/*** Machine Gun Tower Component ***/
Crafty.c(TOWER_MACHINEGUN, {
    create: function() {
        this.damage = MG_DAMAGE;
        this.outputDamage = MG_OUTPUT_DAMAGE;
        this.rate = MG_RATE;
        this.range = MG_RANGE;
        this.spreading = MG_SPREADING;
        this.price = MG_PRICE;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        //projit, najit minimum, predat strele
    },      
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setSpreading(this.spreading);
        s.setTTL(this.range);
        s.create(this.rate);
        s.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
        //upgrade sequence - dohodnout
    }
});

/*** Flamethrower Tower Component ***/
Crafty.c(TOWER_FLAMETHROWER, {
    create: function() {
        this.damage = FT_DAMAGE;
        this.outputDamage = FT_OUTPUT_DAMAGE;
        this.rate = FT_RATE;
        this.range = FT_RANGE;
        this.spreading = FT_SPREADING;
        this.price = FT_PRICE;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        //projit, najit minimum, predat strele
    },   
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setSpreading(this.spreading);
        s.setTTL(this.range);
        s.create(this.rate);
        s.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
        //upgrade sequence - dohodnout
    }
});

/*** TOWER COMPONENTS LASER ***/

/*** Beam Laser Tower Component ***/
Crafty.c(TOWER_BEAM_LASER, {
    create: function() {
        this.damage = L_DAMAGE;
        this.outputDamage = L_OUTPUT_DAMAGE;
        this.rate = L_RATE;
        this.range = L_RANGE;
        this.price = L_PRICE;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        //projit, najit minimum, predat strele
    },  
    fire: function() {
        var s = shot.get(SHOT_LASER);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setTTL(this.range);
        s.create();
        s.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
    }
});

/*** Chain Laser Tower Component ***/
/*** CHAINING NOT DONE ***/
Crafty.c(TOWER_CHAIN_LASER, {
    create: function(endpoint) {
        this.damage = CHL_DAMAGE;
        this.outputDamage = CHL_OUTPUT_DAMAGE;
        this.rate = CHL_RATE;
        this.range = CHL_RANGE;
        this.price = CHL_PRICE;
        this.endPoint2 = toPoint(endpoint);
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        //projit, najit minimum, predat strele
    }, 
    fire: function() {
        var s = shot.get(SHOT_LASER);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setTTL(this.range);
        s.create();
        s.start();
        var s2 = shot.get(SHOT_LASER);
        s2.setStartPoint([this.endPoint.x, this.endPoint.y]);
        s2.setEndPoint([this.endPoint2.x, this.endPoint2.y]);
        s2.setDamage(this.damage);
        s2.setTTL(this.range);
        s2.create();
        s2.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
    }
});

/*** TOWER COMPONENTS HOMING ***/

/*** Homing Missile Tower Component ***/
Crafty.c(TOWER_HOMING_MISSILE, {
    create: function() {
        this.damage = HM_DAMAGE;
        this.outputDamage = HM_OUTPUT_DAMAGE;
        this.rate = HM_RATE;
        this.range = HM_RANGE;
        this.price = HM_PRICE;
        this.curving = HM_CURVING;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        //projit, najit minimum, predat strele
    }, 
    fire: function() {
        var s = shot.get(SHOT_HOMING);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setTTL(this.range);
        s.create(this.rate, this.curving);
        s.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
        //upgrade sequence - dohodnout
    }
});

/*** TOWER COMPONENTS SPLASH ***/

/*** Electric Aura Tower Component ***/
Crafty.c(TOWER_ELECTRIC_AURA, {
    create: function() {
        this.damage = EA_DAMAGE;
        this.outputDamage = EA_OUTPUT_DAMAGE;
        this.rate = EA_RATE;
        this.range = EA_RANGE;
        this.price = EA_PRICE;
        this.growth = EA_GROWTH;
        this.radius = EA_RADIUS;
    },
    start: function() {
        fire();
    }, 
    fire: function() {
        var s = shot.get(SHOT_SPLASH);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setDamage(this.damage);
        s.setTTL(this.range);
        s.create(this.growth, this.radius);
        s.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
        //upgrade sequence - dohodnout
    }
});
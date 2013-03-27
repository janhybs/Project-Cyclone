/*** TOWER MODULE ***/

/*** Define as global object ***/
window.tower = {
    get: function(type) {
        switch (type) {
            case TOWER_MACHINEGUN:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_P2P, type))
                        .attr({w: W, h: H});
            case TOWER_CANNON:
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
    abstractCreate: function(startPoint, damage, outputDamage, rate, range, price, ttl) {
        this.startPoint = toPoint(startPoint);
        this.damage = damage !== undefined ? damage : toDamage(0);
        this.rate = rate !== undefined ? rate : NaN;
        this.range = range !== undefined ? range : NaN;
        this.outputDamage = outputDamage !== undefined ? outputDamage : NaN;
        this.level = 1;
        this.price = price !== undefined ? price : DEFAULT_PRICE;
        this.ttl = ttl !== undefined ? ttl : 10; 
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
    },
    getTTL: function() {
        return this.ttl;
    },
    setTTL: function(ttl) {
        this.ttl = ttl !== undefined ? ttl : 10;
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
        this.ttl = MG_TTL;
        this.price = MG_PRICE;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        if (!elems) {
            var minDistance = Number.MAX_VALUE;
            var element = 0;
            var tempDist;
            for (elem in elems) {
                tempDist = distance(elem, this.startPoint)
                if (tempDist < minDistance) {
                    minDistance = tempDist;
                    element = elem;
                }
            }
            this.endPoint = element;
            fire();
        }
    },
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setSpreading(this.spreading);
        s.setTTL(this.ttl);
        s.create(this.rate);
        s.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
        //upgrade sequence - dohodnout
    }
});

/*** Cannon Tower Component ***/
Crafty.c(TOWER_CANNON, {
    create: function() {
        this.damage = C_DAMAGE;
        this.outputDamage = C_OUTPUT_DAMAGE;
        this.rate = C_RATE;
        this.range = C_RANGE;
        this.spreading = C_SPREADING;
        this.ttl = C_TTL;
        this.price = C_PRICE;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        if (!elems) {
            var minDistance = Number.MAX_VALUE;
            var element = 0;
            var tempDist;
            for (elem in elems) {
                tempDist = distance(elem, this.startPoint)
                if (tempDist < minDistance) {
                    minDistance = tempDist;
                    element = elem;
                }
            }
            this.endPoint = element;
            fire();
        }
    },
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setSpreading(this.spreading);
        s.setTTL(this.ttl);
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
        this.ttl = FT_TTL;
        this.price = FT_PRICE;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        if (!elems) {
            var minDistance = Number.MAX_VALUE;
            var element = 0;
            var tempDist;
            for (elem in elems) {
                tempDist = distance(elem, this.startPoint)
                if (tempDist < minDistance) {
                    minDistance = tempDist;
                    element = elem;
                }
            }
            this.endPoint = element;
            fire();
        }
    },
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setSpreading(this.spreading);
        s.setTTL(this.ttl);
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
        this.ttl = L_TTL;
        this.price = L_PRICE;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        if (!elems) {
            var minDistance = Number.MAX_VALUE;
            var element = 0;
            var tempDist;
            for (elem in elems) {
                tempDist = distance(elem, this.startPoint)
                if (tempDist < minDistance) {
                    minDistance = tempDist;
                    element = elem;
                }
            }
            this.endPoint = element;
            fire();
        }
    },
    fire: function() {
        var s = shot.get(SHOT_LASER);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setTTL(this.ttl);
        s.create();
        s.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
    }
});

/*** Chain Laser Tower Component ***/
/*** CHAINING NOT DONE -> DORESIT ***/
Crafty.c(TOWER_CHAIN_LASER, {
    create: function(endpoint) {
        this.damage = CHL_DAMAGE;
        this.outputDamage = CHL_OUTPUT_DAMAGE;
        this.rate = CHL_RATE;
        this.range = CHL_RANGE;
        this.ttl = CHL_TTL;
        this.price = CHL_PRICE;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        if (!elems) {
            var minDistance = Number.MAX_VALUE;
            var element = 0;
            var tempDist;
            for (elem in elems) {
                tempDist = distance(elem, this.startPoint)
                if (tempDist < minDistance) {
                    minDistance = tempDist;
                    element = elem;
                }
            }
            this.endPoint = element;
            fire();
        }
    },
    fire: function() {
        var s = shot.get(SHOT_LASER);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setTTL(this.ttl);
        s.create();
        s.start();
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
        this.ttl = HM_TTL;
        this.curving = HM_CURVING;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        if (!elems) {
            var minDistance = Number.MAX_VALUE;
            var element = 0;
            var tempDist;
            for (elem in elems) {
                tempDist = distance(elem, this.startPoint)
                if (tempDist < minDistance) {
                    minDistance = tempDist;
                    element = elem;
                }
            }
            this.endPoint = element;
            fire();
        }
    },
    fire: function() {
        var s = shot.get(SHOT_HOMING);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setTTL(this.ttl);
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
        this.ttl = EA_TTL;
        this.radius = EA_RADIUS;
    },
    start: function() {
        var elems = getEntities(ENEMY_ABS, this, this.range);
        if (!elems) {
            fire();
        }
    },
    fire: function() {
        var s = shot.get(SHOT_SPLASH);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setDamage(this.damage);
        s.setTTL(this.ttl);
        s.create(this.growth, this.radius);
        s.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
        //upgrade sequence - dohodnout
    }
});
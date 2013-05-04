/*** TOWER MODULE ***/

/*** Define as global object ***/
window.tower = {
    get: function(type) {
        switch (type) {
            case TOWER_MACHINEGUN:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}'.format(TOWER_ABS, TOWER_P2P, type))
                        .attr({w: W, h: H})
                        .image(TOWER_IMAGE_ARRAY[type]);
            case TOWER_CANNON:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_P2P, type))
                        .attr({w: W, h: H});
            case TOWER_FLAMETHROWER:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_P2P, type))
                        .attr({w: W, h: H});
            case TOWER_ICE_DART:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_P2P, type))
                        .attr({w: W, h: H});
            case TOWER_BEAM_LASER:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_LASER, type))
                        .attr({w: W, h: H});
            case TOWER_CHAIN_LASER:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_LASER, type))
                        .attr({w: W, h: H});
            case TOWER_HOMING_MISSILE:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_HOMING, type))
                        .attr({w: W, h: H});
            case TOWER_ELECTRIC_AURA:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_SPLASH, type))
                        .attr({w: W, h: H});
            case TOWER_SLOW_AURA:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_SPLASH, type))
                        .attr({w: W, h: H});
        }
    }
};

/*** ABSTRACT TOWER COMPONENTS ***/

/*** Base Abstract Tower Component ***/
Crafty.c(TOWER_ABS, {
    abstractCreate: function(startPoint, damage, rate, range, price, upgradePrice, ttl, frameRate) {
        this.startPoint = toPoint(startPoint);
        this.damage = damage !== undefined ? damage : toDamage(0);
        this.rate = rate !== undefined ? rate : NaN;
        this.range = range !== undefined ? range : NaN;
        this.level = 1;
        this.price = price !== undefined ? price : DEFAULT_PRICE;
        this.upgradePrice = upgradePrice !== undefined ? upgradePrice : DEFAULT_PRICE;
        this.ttl = ttl !== undefined ? ttl : 10;
        this.frameRate = frameRate !== undefined ? frameRate : 5;
    },
    init: function() {
        this.startPoint = null;
        this.level = 1;
        this.repId = false;
    },
    doDestroy: function() {
        this.destroy();
        if(this.repID !== false)
            timer.clearTimer(this.repId);
    },
    getLevel: function() {
        return this.level;
    },
    setLevel: function(level) {
        this.level = level !== MAX_LEVEL ? level : MAX_LEVEL;
        return this;
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
    getFrameRate: function() {
        return this.frameRate;
    },
    setFrameRate: function(frameRate) {
        this.frameRate = frameRate;
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
    getUpgradePrice: function() {
        return this.upgradePrice;
    },
    setUpgradePrice: function(price) {
        this.upgradePrice = price;
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
        this.spreading = spreading !== undefined ? spreading : 0;
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
    setCurving: function(curving) {
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
        this.rate = MG_RATE;
        this.range = MG_RANGE;
        this.spreading = MG_SPREADING;
        this.ttl = MG_TTL;
        this.price = MG_PRICE;
        this.upgradePrice = MG_UPGRADE_PRICE;
        this.frameRate = MG_FRAME_RATE;
    },
    start: function() {
        this.repId = timer.repeat (function () { 
            var elems = getEntities(ENEMY_ABS, this, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get(AIMING_CLOSEST);
                this.endPoint = aim.getElement(elems, this.startPoint);
                this.fire();
            }
        }, FRAME_RATE/MG_FRAME_RATE, this );
    },
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setSpreading(this.spreading);
        s.setTTL(this.ttl);
        s.create(this.rate);
        Crafty.audio.play(ELECTRIC_SOUND, 1);
        s.start();
    },   
    upgrade: function() {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel(this.level + 1);
            switch (this.level) {
                case(2):
                    this.rate = MG_RATE_2;
                    this.range = MG_RANGE_2;
                    this.damage = MG_DAMAGE_2;
                    break;
                case(3):
                    this.rate = MG_RATE_3;
                    this.range = MG_RANGE_3;
                    this.damage = MG_DAMAGE_3;
                    break;
            }
        }
    }
});

/*** Cannon Tower Component ***/
Crafty.c(TOWER_CANNON, {
    create: function() {
        this.damage = C_DAMAGE;
        this.rate = C_RATE;
        this.range = C_RANGE;
        this.spreading = C_SPREADING;
        this.ttl = C_TTL;
        this.price = C_PRICE;
        this.upgradePrice = C_UPGRADE_PRICE;
        this.frameRate = C_FRAME_RATE;
    },
    start: function() {
        this.repId = timer.repeat (function () { 
            var elems = getEntities(ENEMY_ABS, this, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get(AIMING_FURTHEST);
                this.endPoint = aim.getElement(elems, this.startPoint);
                this.fire();
            }
        }, FRAME_RATE/C_FRAME_RATE, this );
    },
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);;
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setSpreading(this.spreading);
        s.setTTL(this.ttl);
        s.create(this.rate);
        Crafty.audio.play(CANNON_SOUND, 1);
        s.start();
    },
    upgrade: function() {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel(this.level + 1);
            switch (this.level) {
                case(2):
                    this.rate = C_RATE_2;
                    this.range = C_RANGE_2;
                    this.damage = C_DAMAGE_2;
                    break;
                case(3):
                    this.rate = C_RATE_3;
                    this.range = C_RANGE_3;
                    this.damage = C_DAMAGE_3;
                    break;
            }
        }
    }
});

/*** Flamethrower Tower Component ***/
Crafty.c(TOWER_FLAMETHROWER, {
    create: function() {
        this.damage = FT_DAMAGE;
        this.rate = FT_RATE;
        this.range = FT_RANGE;
        this.spreading = FT_SPREADING;
        this.ttl = FT_TTL;
        this.price = FT_PRICE;
        this.upgradePrice = FT_UPGRADE_PRICE;
        this.frameRate = FT_FRAME_RATE;
    },
    start: function() {
        this.repId = timer.repeat (function () { 
            var elems = getEntities(ENEMY_ABS, this, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get(AIMING_CLOSEST);
                this.endPoint = aim.getElement(elems, this.startPoint);
                this.fire();
            }
        }, FRAME_RATE/FT_FRAME_RATE, this);
    },
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);;
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setSpreading(this.spreading);
        s.setTTL(this.ttl);
        s.create(this.rate);
        Crafty.audio.play(SPRAY_SOUND, 1);
        s.start();
    },
    upgrade: function() {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel(this.level + 1);
            switch (this.level) {
                case(2):
                    this.rate = FT_RATE_2;
                    this.range = FT_RANGE_2;
                    this.damage = FT_DAMAGE_2;
                    break;
                case(3):
                    this.rate = FT_RATE_3;
                    this.range = FT_RANGE_3;
                    this.damage = FT_DAMAGE_3;
                    break;
            }
        }
    }
});

/*** Ice Dart Tower Component ***/
Crafty.c(TOWER_ICE_DART, {
    create: function() {
        this.damage = ID_DAMAGE;
        this.rate = ID_RATE;
        this.range = ID_RANGE;
        this.ttl = ID_TTL;
        this.price = ID_PRICE;
        this.upgradePrice = ID_UPGRADE_PRICE;
        this.frameRate = ID_FRAME_RATE;
    },
    start: function() {
        this.repId = timer.repeat (function () { 
            var elems = getEntities(ENEMY_ABS, this, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get(AIMING_FURTHEST);
                this.endPoint = aim.getElement(elems, this.startPoint);
                this.fire();
            }
        }, FRAME_RATE/ID_FRAME_RATE, this);
    },
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);;
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setSpreading(this.spreading);
        s.setTTL(this.ttl);
        s.create(this.rate);
        Crafty.audio.play(SPRAY_SOUND, 1);
        s.start();
    },
    upgrade: function() {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel(this.level + 1);
            switch (this.level) {
                case(2):
                    this.rate = ID_RATE_2;
                    this.range = ID_RANGE_2;
                    this.damage = ID_DAMAGE_2;
                    break;
                case(3):
                    this.rate = ID_RATE_3;
                    this.range = ID_RANGE_3;
                    this.damage = ID_DAMAGE_3;
                    break;
            }
        }
    }
});

/*** TOWER COMPONENTS LASER ***/

/*** Beam Laser Tower Component ***/
Crafty.c(TOWER_BEAM_LASER, {
    create: function() {
        this.damage = L_DAMAGE;
        this.rate = L_RATE;
        this.range = L_RANGE;
        this.ttl = L_TTL;
        this.price = L_PRICE;
        this.upgradePrice = L_UPGRADE_PRICE;
        this.s = shot.get(SHOT_LASER);
        this.frameRate = L_FRAME_RATE;
    },
    start: function() {
        this.s.create(LASER_IMAGE_PATH.laserThickYellow, LASER_IMAGE_NAME.laserThickYellowEnd);
        this.s.setStartPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);
        this.s.setEndPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);
        this.s.start();
        this.s.hide();

        this.repId = timer.repeat (function () { 
            var elems = getEntities(ENEMY_ABS, this, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get(AIMING_CLOSEST);
                this.endPoint = aim.getElement(elems, this.startPoint);
                this.fire();
            } else
                this.s.hide();
        }, FRAME_RATE/L_FRAME_RATE, this);
    },
    fire: function() {
        this.s.setStartPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);
        this.s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        this.s.setDamage(this.damage);
        this.s.setTTL(this.ttl);
        this.s.show();
        Crafty.audio.play(LASER_SOUND, 1);
    },
    upgrade: function() {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel(this.level + 1);
            switch (this.level) {
                case(2):
                    this.rate = L_RATE_2;
                    this.range = L_RANGE_2;
                    this.damage = L_DAMAGE_2;
                    break;
                case(3):
                    this.rate = L_RATE_3;
                    this.range = L_RANGE_3;
                    this.damage = L_DAMAGE_3;
                    break;
            }
        }
    }
});

/*** Chain Laser Tower Component ***/
Crafty.c(TOWER_CHAIN_LASER, {
    create: function() {
        this.damage = CHL_DAMAGE;
        this.rate = CHL_RATE;
        this.range = CHL_RANGE;
        this.ttl = CHL_TTL;
        this.price = CHL_PRICE;
        this.upgradePrice = CHL_UPGRADE_PRICE;
        this.s = [];
        this.chain = CHL_CHAIN;
        for(var i = 0; i < this.chain; i++){
            this.s.push(shot.get(SHOT_LASER));
        }
        this.frameRate = CHL_FRAME_RATE;
    },
    start: function() {
        
        var tempStart;
        var tempEnd;
        var chainCount;
        
        for(var i = 0; i < this.chain; i++){
            this.s[i].create(LASER_IMAGE_PATH.laserThinRed, LASER_IMAGE_NAME.laserThinRedEnd); 
            this.s[i].setStartPoint(this.startPoint);
            this.s[i].setEndPoint(this.startPoint);
            this.s[i].start();
            this.s[i].hide();
        }
        
        this.repId = timer.repeat (function () { 
            tempStart = toPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);
            chainCount = 0;
            
            for(var i = 0; i < this.chain; i++){
                var elems = getEntities(ENEMY_ABS, tempStart, this.range);
                if (elems.length !== 0) {
                    chainCount++;
                    var aim = aiming.get(AIMING_FURTHEST);
                    this.s[i].setStartPoint(tempStart);
                    this.s[i].setEndPoint(aim.getElement(elems, tempStart));
                    tempStart = this.s[i].getEndPoint();
                }                    
            }
            
            if(chainCount !== 0)
                this.fire(chainCount);
            
            for (var i = chainCount+1; i < this.chain; i++){
                this.s[i].hide();
            }
            
        }, FRAME_RATE/CHL_FRAME_RATE, this );
    },
    fire: function(chainCount) {
        for(var i = 0; i < chainCount; i++){
            //this.s[i].show();
            this.s[i].setDamage(this.damage);
            this.s[i].setTTL(this.ttl);
        }
        Crafty.audio.play(LASER_SOUND, 1);
    },
    upgrade: function() {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel(this.level + 1);
            switch (this.level) {
                case(2):
                    this.rate = CHL_RATE_2;
                    this.range = CHL_RANGE_2;
                    this.damage = CHL_DAMAGE_2;
                    break;
                case(3):
                    this.rate = CHL_RATE_3;
                    this.range = CHL_RANGE_3;
                    this.damage = CHL_DAMAGE_3;
                    break;
            }
        }
    }
});

/*** TOWER COMPONENTS HOMING ***/

/*** Homing Missile Tower Component ***/
Crafty.c(TOWER_HOMING_MISSILE, {
    create: function() {
        this.damage = HM_DAMAGE;
        this.rate = HM_RATE;
        this.range = HM_RANGE;
        this.price = HM_PRICE;
        this.ttl = HM_TTL;
        this.curving = HM_CURVING;
        this.upgradePrice = HM_UPGRADE_PRICE;
        this.frameRate = HM_FRAME_RATE;
    },
    start: function() {
        this.repId = timer.repeat (function () { 
            var elems = getEntities(ENEMY_ABS, this, this.range);
            if (elems.length !== 0) {
                this.fire();
            }
        }, FRAME_RATE/HM_FRAME_RATE, this );
    },
    fire: function() {
        var s = shot.get(SHOT_HOMING);
        s.setStartPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);
        s.setDamage(this.damage);
        s.setTTL(this.ttl);
        s.create(this.rate, this.curving);
        Crafty.audio.play(ELECTRIC_SOUND, 1);
        s.start();
    },
    upgrade: function() {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel(this.level + 1);
            switch (this.level) {
                case(2):
                    this.rate = HM_RATE_2;
                    this.range = HM_RANGE_2;
                    this.damage = HM_DAMAGE_2;
                    break;
                case(3):
                    this.rate = HM_RATE_3;
                    this.range = HM_RANGE_3;
                    this.damage = HM_DAMAGE_3;
                    break;
            }
        }
    }
});

/*** TOWER COMPONENTS SPLASH ***/

/*** Electric Aura Tower Component ***/
Crafty.c(TOWER_ELECTRIC_AURA, {
    create: function() {
        this.damage = EA_DAMAGE;
        this.rate = EA_RATE;
        this.price = EA_PRICE;
        this.growth = EA_GROWTH;
        this.ttl = EA_TTL;
        this.radius = EA_RADIUS;
        this.upgradePrice = EA_UPGRADE_PRICE;
        this.frameRate = EA_FRAME_RATE;
    },
    start: function() {
        this.repId = timer.repeat (function () { 
            var elems = getEntities(ENEMY_ABS, this, this.radius);
            if (elems.length !== 0) {
                this.fire();
            }
        }, FRAME_RATE/EA_FRAME_RATE, this );
    },
    fire: function() {
        var s = shot.get(SHOT_SPLASH);
        s.setStartPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);
        s.setDamage(this.damage);
        s.setTTL(this.ttl);
        s.create(this.growth, this.radius);
        Crafty.audio.play(ELECTRIC_SOUND, 1);
        s.start();
    },
    upgrade: function() {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel(this.level + 1);
            switch (this.level) {
                case(2):
                    this.rate = EA_RATE_2;
                    this.radius = EA_RADIUS_2;
                    this.growth = EA_GROWTH_2;
                    this.damage = EA_DAMAGE_2;
                    break;
                case(3):
                    this.rate = EA_RATE_3;
                    this.radius = EA_RADIUS_3;
                    this.growth = EA_GROWTH_3;
                    this.damage = EA_DAMAGE_3;
                    break;
            }
        }
    }
});

/*** Slow Aura Tower Component ***/
Crafty.c(TOWER_SLOW_AURA, {
    create: function() {
        this.damage = SA_DAMAGE;
        this.rate = SA_RATE;
        this.price = SA_PRICE;
        this.growth = SA_GROWTH;
        this.ttl = SA_TTL;
        this.radius = SA_RADIUS;
        this.upgradePrice = SA_UPGRADE_PRICE;
        this.frameRate = SA_FRAME_RATE;
    },
    start: function() {
        this.repId = timer.repeat (function () { 
            var elems = getEntities(ENEMY_ABS, this, this.radius);
            if (elems.length !== 0) {
                this.fire();
            }
        }, FRAME_RATE/SA_FRAME_RATE, this );
    },
    fire: function() {
        var s = shot.get(SHOT_SPLASH);
        s.setStartPoint([this.startPoint.x + W/2, this.startPoint.y + H/2]);
        s.setDamage(this.damage);
        s.setTTL(this.ttl);
        s.create(this.growth, this.radius);
        Crafty.audio.play(SPRAY_SOUND, 1);
        s.start();
    },
    upgrade: function() {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel(this.level + 1);
            switch (this.level) {
                case(2):
                    this.rate = SA_RATE_2;
                    this.radius = SA_RADIUS_2;
                    this.growth = SA_GROWTH_2;
                    this.damage = SA_DAMAGE_2;
                    break;
                case(3):
                    this.rate = SA_RATE_3;
                    this.radius = SA_RADIUS_3;
                    this.growth = SA_GROWTH_3;
                    this.damage = SA_DAMAGE_3;
                    break;
            }
        }
    }
});
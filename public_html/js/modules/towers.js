/*** TOWER MODULE ***/

/*** Define as global object ***/
window.tower = {
    get: function (type) {
        switch (type) {
            case TOWER_MACHINEGUN:
                return Crafty.e ('2D, Canvas, Mouse, {0}, {1}, {2}, {3}'.format (TOWER_ABS, TOWER_P2P, type, TOWER_IMAGE_NAME.machineGunBody));
            case TOWER_CANNON:
                return Crafty.e ('2D, Canvas, Mouse, {0}, {1}, {2}, {3}'.format (TOWER_ABS, TOWER_P2P, type, TOWER_IMAGE_NAME.cannonBody));
            case TOWER_FLAMETHROWER:
                return Crafty.e ('2D, Canvas, Mouse, {0}, {1}, {2}, {3}'.format (TOWER_ABS, TOWER_P2P, type, TOWER_IMAGE_NAME.flamethrowerBody));
            case TOWER_ICE_DART:
                return Crafty.e ('2D, Canvas, Mouse, {0}, {1}, {2}, {3}'.format (TOWER_ABS, TOWER_P2P, type, TOWER_IMAGE_NAME.iceDartBody));
            case TOWER_BEAM_LASER:
                return Crafty.e ('2D, Canvas, Mouse, {0}, {1}, {2}, {3}'.format (TOWER_ABS, TOWER_LASER, type, TOWER_IMAGE_NAME.beamLaserBody));
            case TOWER_CHAIN_LASER:
                return Crafty.e ('2D, Canvas, Mouse, {0}, {1}, {2}, {3}'.format (TOWER_ABS, TOWER_LASER, type, TOWER_IMAGE_NAME.chainLaserBody));
            case TOWER_HOMING_MISSILE:
                return Crafty.e ('2D, Canvas, Mouse, {0}, {1}, {2}, {3}'.format (TOWER_ABS, TOWER_HOMING, type, TOWER_IMAGE_NAME.homingMissileBody));
            case TOWER_ELECTRIC_AURA:
                return Crafty.e ('2D, Canvas, Mouse, {0}, {1}, {2}, {3}'.format (TOWER_ABS, TOWER_SPLASH, type, TOWER_IMAGE_NAME.electricAuraBody));
            case TOWER_SLOW_AURA:
                return Crafty.e ('2D, Canvas, Mouse, {0}, {1}, {2}, {3}'.format (TOWER_ABS, TOWER_SPLASH, type, TOWER_IMAGE_NAME.slowAuraBody));
        }
    }
};

/*** ABSTRACT TOWER COMPONENTS ***/

/*** Base Abstract Tower Component ***/
Crafty.c (TOWER_ABS, {
    abstractCreate: function (startPoint, damage, speed, range, price, upgradePrice, ttl, frameRate, aimStyle) {
        this.startPoint = toPoint (startPoint);
        this.damage = damage !== undefined ? damage : toDamage (0);
        this.speed = speed !== undefined ? speed : NaN;
        this.range = range !== undefined ? range : NaN;
        this.level = 1;
        this.price = price !== undefined ? price : DEFAULT_PRICE;
        this.upgradePrice = upgradePrice !== undefined ? upgradePrice : DEFAULT_PRICE;
        this.ttl = ttl !== undefined ? ttl : 10;
        this.frameRate = frameRate !== undefined ? frameRate : 5;
        this.aimStyle = aimStyle !== undefined ? aimStyle : AIMING_CLOSEST;
        this.type = TOWER_ABS;
        this.levelComp;
    },
    init: function () {
        this.startPoint = null;
        this.level = 1;
        this.repId = false;
        this.z = Z_TOWER_BODY;
        this.bind ('Click', function () {
            towerClicked (this);
        });
    },
    prepareActor: function (type) {
        this.actor = Crafty.e ('2D, Canvas, Image, {0}'.format (type));
        this.actor.origin (24, 24);
        this.actor.x = this.x;
        this.actor.y = this.y;
        this.actor.z = Z_TOWER_HEAD;
    },
    doDestroy: function () {
        this.destroy ();
        if (this.repID !== false)
            timer.clearTimer (this.repId);
        towerBrain.removeByTower (this);
        if (this.actor !== undefined)
            this.actor.destroy ();
        if (this.levelComp !== undefined)
            this.levelComp.destroy ();
    },
    doDestroyAll: function () {
        this.destroy ();
        if (this.repID !== false)
            timer.clearTimer (this.repId);
        if (this.actor !== undefined)
            this.actor.destroy ();
        if (this.levelComp !== undefined)
            this.levelComp.destroy ();
    },
    getLevel: function () {
        return this.level;
    },
    setLevel: function (level) {
        this.level = level !== MAX_LEVEL ? level : MAX_LEVEL;
        return this;
    },
    getAimStyle: function () {
        return this.aimStyle;
    },
    setAimStyle: function (aimStyle) {
        this.aimStyle = aimStyle;
        return this;
    },
    getStartPoint: function () {
        return this.startPoint;
    },
    setStartPoint: function (value) {
        this.startPoint = toPoint (value);
        this.x = this.startPoint.x - 8;
        this.y = this.startPoint.y - 8;
        this.center = toPoint ([this.startPoint.x + W / 2, this.startPoint.y + H / 2]);
        return this;
    },
    getDamage: function () {
        return this.damage;
    },
    setDamage: function (damage) {
        this.damage = toDamage (damage);
        return this;
    },
    getFrameRate: function () {
        return this.frameRate;
    },
    setFrameRate: function (frameRate) {
        this.frameRate = frameRate;
        return this;
    },
    getSpeed: function () {
        return this.speed;
    },
    setSpeed: function (value) {
        this.speed = value;
        return this;
    },
    getRange: function () {
        return this.range;
    },
    setRange: function (range) {
        this.range = range;
        return this;
    },
    getPrice: function () {
        return this.price;
    },
    setPrice: function (price) {
        this.price = price;
        return this;
    },
    getUpgradePrice: function () {
        return this.upgradePrice;
    },
    setUpgradePrice: function (price) {
        this.upgradePrice = price;
        return this;
    },
    getTTL: function () {
        return this.ttl;
    },
    setTTL: function (ttl) {
        this.ttl = ttl !== undefined ? ttl : 10;
        return this;
    },
    setType: function (type) {
        this.type = type;
    },
    getType: function () {
        return this.type;
    },
    upgradeLevel: function (image) {
        if (this.levelComp !== undefined)
            this.levelComp.destroy ();
        this.levelComp = Crafty.e ("2D, Canvas, Image")
                .attr ({x: this.startPoint.x + LEVEL_X_MOVE, y: this.startPoint.y + LEVEL_Y_MOVE, z: Z_TOWER_LEVEL})
                .image (image, "no-repeat");
    }
});

/*** Abstract P2P Tower Component ***/
Crafty.c (TOWER_P2P, {
    abstractCreate: function (endPoint, spreading) {
        this.endPoint = toPoint (endPoint);
        this.spreading = spreading !== undefined ? spreading : 0;
    },
    getEndPoint: function () {
        return this.endPoint;
    },
    setEndPoint: function (value) {
        this.endPoint = toPoint (value);
        return this;
    },
    getSpreading: function () {
        return this.spreading;
    },
    setSpreading: function (value) {
        this.spreading = toPoint (value);
    }
});

/*** Abstract Laser Tower Component ***/
Crafty.c (TOWER_LASER, {
    abstractCreate: function (endPoint) {
        this.endPoint = toPoint (endPoint);
    },
    getEndPoint: function () {
        return this.endPoint;
    },
    setEndPoint: function (value) {
        this.endPoint = toPoint (value);
        return this;
    }
});

/*** Abstract Homing Missile Tower Component ***/
Crafty.c (TOWER_HOMING, {
    abstractCreate: function (endPoint, curving) {
        this.endPoint = toPoint (endPoint);
        this.curving = curving !== undefined ? curving : NaN;
    },
    getEndPoint: function () {
        return this.endPoint;
    },
    setEndPoint: function (value) {
        this.endPoint = toPoint (value);
        return this;
    },
    getCurving: function () {
        return this.curving;
    },
    setCurving: function (curving) {
        this.curving = curving;
        return this;
    }
});

/*** Abstract Splash Tower Component ***/
Crafty.c (TOWER_SPLASH, {
    abstractCreate: function () {
    }
});

/*** TOWER COMPONENTS P2P ***/

/*** Machine Gun Tower Component ***/
Crafty.c (TOWER_MACHINEGUN, {
    create: function () {
        this.price = TOWER_MACHINEGUN_PROPS.price;
        this.upgradePrice = TOWER_MACHINEGUN_PROPS.upgradePrice;
        this.aimStyle = TOWER_MACHINEGUN_PROPS.aimStyle;
        this.prepareActor (TOWER_IMAGE_NAME.machineGunHead);
        for (var p in TOWER_PROPS)
            this[TOWER_PROPS[p]] = TOWER_MACHINEGUN_PROPS[TOWER_PROPS[p] + "" + this.level];
    },
    start: function () {
        this.repId = timer.repeat (function () {
            var elems = getEntities (ENEMY_ABS, this.center, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get (this.aimStyle);
                this.endPoint = aim.getElement (elems, this.center);
                this.fire ();
            }
        }, this.frameRate, this);
    },
    fire: function () {
        this.actor.rotation = Math.atan2 (this.y + this.h / 2 - this.endPoint.y, this.x + this.h / 2 - this.endPoint.x) * 180 / Math.PI + 180;
        var s = shot.get (SHOT_P2P, P2P_IMAGE_NAME.machineGun);
        s.setStartPoint (this.center);
        s.setEndPoint ([this.endPoint.x, this.endPoint.y]);
        s.setDamage (this.damage);
        s.setSpreading (this.spreading);
        s.setTTL (this.ttl);
        s.create (this.speed);
        s.z = Z_TOWER_SHOT;
        Crafty.audio.play (TOWER_SOUND_NAME.machineGun, 1);
        s.start ();
    },
    upgrade: function () {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel (this.level + 1);
            this.upgradeLevel (TOWER_LEVEL_IMAGE['level' + (this.level - 1)]);
            for (var p in TOWER_PROPS)
                this[TOWER_PROPS[p]] = TOWER_MACHINEGUN_PROPS[TOWER_PROPS[p] + "" + this.level];

            timer.clearTimer (this.repId);

            this.repId = timer.repeat (function () {
                var elems = getEntities (ENEMY_ABS, this.center, this.range);
                if (elems.length !== 0) {
                    var aim = aiming.get (this.aimStyle);
                    this.endPoint = aim.getElement (elems, this.center);
                    this.fire ();
                }
            }, this.frameRate, this);
        }
    }
});

/*** Cannon Tower Component ***/
Crafty.c (TOWER_CANNON, {
    create: function () {
        this.price = TOWER_CANNON_PROPS.price;
        this.upgradePrice = TOWER_CANNON_PROPS.upgradePrice;
        this.aimStyle = TOWER_CANNON_PROPS.aimStyle;
        this.prepareActor (TOWER_IMAGE_NAME.cannonHead);
        for (var p in TOWER_PROPS)
            this[TOWER_PROPS[p]] = TOWER_CANNON_PROPS[TOWER_PROPS[p] + "" + this.level];
    },
    start: function () {
        this.repId = timer.repeat (function () {
            var elems = getEntities (ENEMY_ABS, this.center, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get (this.aimStyle);
                this.endPoint = aim.getElement (elems, this.center);
                this.fire ();
            }
        }, this.frameRate, this);
    },
    fire: function () {
        this.actor.rotation = Math.atan2 (this.y + this.h / 2 - this.endPoint.y, this.x + this.h / 2 - this.endPoint.x) * 180 / Math.PI + 180;
        var s = shot.get (SHOT_P2P, P2P_IMAGE_NAME.cannon);
        s.setStartPoint (this.center);
        s.setEndPoint ([this.endPoint.x, this.endPoint.y]);
        s.setDamage (this.damage);
        s.setSpreading (this.spreading);
        s.setTTL (this.ttl);
        s.create (this.speed);
        s.z = Z_TOWER_SHOT;
        Crafty.audio.play (TOWER_SOUND_NAME.cannon, 1);
        s.start ();
    },
    upgrade: function () {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel (this.level + 1);
            this.upgradeLevel (TOWER_LEVEL_IMAGE['level' + (this.level - 1)]);
            for (var p in TOWER_PROPS)
                this[TOWER_PROPS[p]] = TOWER_CANNON_PROPS[TOWER_PROPS[p] + "" + this.level];

            timer.clearTimer (this.repId);

            this.repId = timer.repeat (function () {
                var elems = getEntities (ENEMY_ABS, this.center, this.range);
                if (elems.length !== 0) {
                    var aim = aiming.get (this.aimStyle);
                    this.endPoint = aim.getElement (elems, this.center);
                    this.fire ();
                }
            }, this.frameRate, this);
        }
    }
});

/*** Flamethrower Tower Component ***/
Crafty.c (TOWER_FLAMETHROWER, {
    create: function () {
        this.price = TOWER_FLAMETHROWER_PROPS.price;
        this.upgradePrice = TOWER_FLAMETHROWER_PROPS.upgradePrice;
        this.aimStyle = TOWER_FLAMETHROWER_PROPS.aimStyle;
        this.prepareActor (TOWER_IMAGE_NAME.flamethrowerHead);
        for (var p in TOWER_PROPS)
            this[TOWER_PROPS[p]] = TOWER_FLAMETHROWER_PROPS[TOWER_PROPS[p] + "" + this.level];
    },
    start: function () {
        this.repId = timer.repeat (function () {
            var elems = getEntities (ENEMY_ABS, this.center, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get (this.aimStyle);
                this.endPoint = aim.getElement (elems, this.center);
                this.fire ();
            }
        }, this.frameRate, this);
    },
    fire: function () {
        this.actor.rotation = Math.atan2 (this.y + this.h / 2 - this.endPoint.y, this.x + this.h / 2 - this.endPoint.x) * 180 / Math.PI + 180;
        var s = shot.get (SHOT_P2P, P2P_IMAGE_NAME.flame);
        s.setStartPoint (this.center);
        s.setEndPoint ([this.endPoint.x, this.endPoint.y]);
        s.setDamage (this.damage);
        s.setSpreading (this.spreading);
        s.setTTL (this.ttl);
        s.create (this.speed, this.spreading);
        s.z = Z_TOWER_SHOT;
        Crafty.audio.play (TOWER_SOUND_NAME.flame, 1);
        s.start ();
    },
    upgrade: function () {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel (this.level + 1);
            this.upgradeLevel (TOWER_LEVEL_IMAGE['level' + (this.level - 1)]);
            for (var p in TOWER_PROPS)
                this[TOWER_PROPS[p]] = TOWER_FLAMETHROWER_PROPS[TOWER_PROPS[p] + "" + this.level];

            timer.clearTimer (this.repId);

            this.repId = timer.repeat (function () {
                var elems = getEntities (ENEMY_ABS, this.center, this.range);
                if (elems.length !== 0) {
                    var aim = aiming.get (this.aimStyle);
                    this.endPoint = aim.getElement (elems, this.center);
                    this.fire ();
                }
            }, this.frameRate, this);
        }
    }
});

/*** Ice Dart Tower Component ***/
Crafty.c (TOWER_ICE_DART, {
    create: function () {
        this.price = TOWER_ICE_DART_PROPS.price;
        this.upgradePrice = TOWER_ICE_DART_PROPS.upgradePrice;
        this.aimStyle = TOWER_ICE_DART_PROPS.aimStyle;
        this.prepareActor (TOWER_IMAGE_NAME.iceDartHead);
        for (var p in TOWER_PROPS)
            this[TOWER_PROPS[p]] = TOWER_ICE_DART_PROPS[TOWER_PROPS[p] + "" + this.level];
    },
    start: function () {
        this.repId = timer.repeat (function () {
            var elems = getEntities (ENEMY_ABS, this.center, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get (this.aimStyle);
                var elem = aim.getElement (elems, this.center);
                if (elem !== null) {
                    this.endPoint = elem;
                    this.fire ();
                }
            }
        }, this.frameRate, this);
    },
    fire: function () {
        this.actor.rotation = Math.atan2 (this.y + this.h / 2 - this.endPoint.y, this.x + this.h / 2 - this.endPoint.x) * 180 / Math.PI + 180;
        var s = shot.get (SHOT_P2P, P2P_IMAGE_NAME.iceDart);
        s.setStartPoint (this.center);
        s.setEndPoint ([this.endPoint.x, this.endPoint.y]);
        s.setDamage (this.damage);
        s.setSpreading (this.spreading);
        s.setTTL (this.ttl);
        s.create (this.speed);
        s.z = Z_TOWER_SHOT;
        Crafty.audio.play (TOWER_SOUND_NAME.iceDart, 1);
        s.start ();
    },
    upgrade: function () {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel (this.level + 1);
            this.upgradeLevel (TOWER_LEVEL_IMAGE['level' + (this.level - 1)]);
            for (var p in TOWER_PROPS)
                this[TOWER_PROPS[p]] = TOWER_ICE_DART_PROPS[TOWER_PROPS[p] + "" + this.level];

            timer.clearTimer (this.repId);

            this.repId = timer.repeat (function () {
                var elems = getEntities (ENEMY_ABS, this.center, this.range);
                if (elems.length !== 0) {
                    var aim = aiming.get (this.aimStyle);
                    var elem = aim.getElement (elems, this.center);
                    if (elem !== null) {
                        this.endPoint = elem;
                        this.fire ();
                    }
                }
            }, this.frameRate, this);
        }
    }
});

/*** TOWER COMPONENTS LASER ***/

/*** Beam Laser Tower Component ***/
Crafty.c (TOWER_BEAM_LASER, {
    create: function () {
        this.s = shot.get (SHOT_LASER);
        this.price = TOWER_BEAM_LASER_PROPS.price;
        this.upgradePrice = TOWER_BEAM_LASER_PROPS.upgradePrice;
        this.aimStyle = TOWER_BEAM_LASER_PROPS.aimStyle;
        this.prepareActor (TOWER_IMAGE_NAME.beamLaserHead);
        for (var p in TOWER_PROPS)
            this[TOWER_PROPS[p]] = TOWER_BEAM_LASER_PROPS[TOWER_PROPS[p] + "" + this.level];
    },
    start: function () {
        this.s.create (LASER_IMAGE_NAME.laser, LASER_IMAGE_NAME.laserEnd);
        this.s.setStartPoint ([this.startPoint.x + W / 2, this.startPoint.y + H / 2]);
        this.s.setEndPoint ([this.startPoint.x + W / 2, this.startPoint.y + H / 2]);
        this.s.z = Z_TOWER_SHOT;
        this.s.start ();
        this.s.hide ();

        this.repId = timer.repeat (function () {
            var elems = getEntities (ENEMY_ABS, this.center, this.range);
            if (elems.length !== 0) {
                var aim = aiming.get (this.aimStyle);
                this.endPoint = aim.getElement (elems, this.center);
                this.fire ();
            } else
                this.s.hide ();
        }, this.frameRate, this);
    },
    fire: function () {
        this.actor.rotation = Math.atan2 (this.y + this.h / 2 - this.endPoint.y, this.x + this.h / 2 - this.endPoint.x) * 180 / Math.PI + 180;
        this.s.setStartPoint (this.center);
        this.s.setEndPoint ([this.endPoint.x, this.endPoint.y]);
        this.s.setDamage (this.damage);
        this.s.setTTL (this.ttl);
        this.s.show ();
        Crafty.audio.play (TOWER_SOUND_NAME.laser, 1);
    },
    upgrade: function () {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel (this.level + 1);
            this.upgradeLevel (TOWER_LEVEL_IMAGE['level' + (this.level - 1)]);
            for (var p in TOWER_PROPS)
                this[TOWER_PROPS[p]] = TOWER_BEAM_LASER_PROPS[TOWER_PROPS[p] + "" + this.level];

            timer.clearTimer (this.repId);

            this.repId = timer.repeat (function () {
                var elems = getEntities (ENEMY_ABS, this.center, this.range);
                if (elems.length !== 0) {
                    var aim = aiming.get (this.aimStyle);
                    this.endPoint = aim.getElement (elems, this.center);
                    this.fire ();
                } else
                    this.s.hide ();
            }, this.frameRate, this);
        }
    },
    doDestroy: function () {
        if (this.levelComp !== undefined)
            this.levelComp.destroy ();
        this.destroy ();
        if (this.repID !== false)
            timer.clearTimer (this.repId);
        towerBrain.removeByTower (this);
        this.actor.destroy ();
        this.s.doDestroy ();
    }
});

/*** Chain Laser Tower Component ***/
Crafty.c (TOWER_CHAIN_LASER, {
    create: function () {
        this.price = TOWER_CHAIN_LASER_PROPS.price;
        this.upgradePrice = TOWER_CHAIN_LASER_PROPS.upgradePrice;
        this.aimStyle = TOWER_CHAIN_LASER_PROPS.aimStyle;
        this.chain = TOWER_CHAIN_LASER_PROPS.chain1;
        this.prepareActor (TOWER_IMAGE_NAME.chainLaserHead);
        for (var p in TOWER_PROPS)
            this[TOWER_PROPS[p]] = TOWER_CHAIN_LASER_PROPS[TOWER_PROPS[p] + "" + this.level];
        this.s = [];
        for (var i = 0; i < this.chain; i++) {
            this.s.push (shot.get (SHOT_LASER));
        }
    },
    start: function () {

        var tempStart;
        var chainCount;
        var mobsPos = [];
        var tempMob;

        for (var i = 0; i < this.chain; i++) {
            this.s[i].create (LASER_IMAGE_NAME.chain, LASER_IMAGE_NAME.chainEnd);
            this.s[i].setStartPoint (this.startPoint);
            this.s[i].setEndPoint (this.startPoint);
            this.s[i].z = Z_TOWER_SHOT;
            this.s[i].start ();
            this.s[i].hide ();
        }

        this.repId = timer.repeat (function () {
            mobsPos = [];
            tempStart = this.center;
            chainCount = 0;

            for (var i = 0; i < this.chain; i++) {
                var elems = getEntities (ENEMY_ABS, tempStart, this.range);
                for (var e in elems) {
                    if (!!~mobsPos.indexOf (elems[e]))
                        elems.splice (e, 1);
                }

                if (elems.length !== 0) {
                    chainCount++;
                    var aim = aiming.get (this.aimStyle);
                    this.s[i].setStartPoint (tempStart);
                    tempMob = aim.getElement (elems, tempStart);
                    this.s[i].setEndPoint (tempMob);
                    tempStart = this.s[i].getEndPoint ();
                    mobsPos.push (tempMob);
                }
            }

            if (chainCount !== 0)
                this.fire (chainCount);

            for (var i = chainCount; i < this.chain; i++) {
                this.s[i].hide ();
            }

        }, this.frameRate, this);
    },
    fire: function (chainCount) {
        for (var i = 0; i < chainCount; i++) {
            if (i === 0) {
                this.actor.rotation = Math.atan2 (this.y + this.h / 2 - this.s[0].endPoint.y, this.x + this.h / 2 - this.s[0].endPoint.x) * 180 / Math.PI + 180;
                this.s[0].z = this.z - 1;
            }
            this.s[i].show ();
            this.s[i].setDamage (this.damage);
            this.s[i].setTTL (this.ttl);
        }
        Crafty.audio.play (TOWER_SOUND_NAME.chain, 1);
    },
    upgrade: function () {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel (this.level + 1);
            this.chain = TOWER_CHAIN_LASER_PROPS['chain' + this.level];
            this.upgradeLevel (TOWER_LEVEL_IMAGE['level' + (this.level - 1)]);
            for (var p in TOWER_PROPS)
                this[TOWER_PROPS[p]] = TOWER_CHAIN_LASER_PROPS[TOWER_PROPS[p] + "" + this.level];
            for (var p in this.s)
                this.s[p].doDestroy ();
            this.s = [];
            for (var i = 0; i < this.chain; i++)
                this.s.push (shot.get (SHOT_LASER));
            for (var i = 0; i < this.chain; i++) {
                this.s[i].create (LASER_IMAGE_NAME.chain, LASER_IMAGE_NAME.chainEnd);
                this.s[i].setStartPoint (this.startPoint);
                this.s[i].setEndPoint (this.startPoint);
                this.s[i].z = Z_TOWER_SHOT;
                this.s[i].start ();
                this.s[i].hide ();
            }

            timer.clearTimer (this.repId);

            this.repId = timer.repeat (function () {
                mobsPos = [];
                tempStart = this.center;
                chainCount = 0;

                for (var i = 0; i < this.chain; i++) {
                    var elems = getEntities (ENEMY_ABS, tempStart, this.range);
                    for (var e in elems) {
                        if (!!~mobsPos.indexOf (elems[e]))
                            elems.splice (e, 1);
                    }

                    if (elems.length !== 0) {
                        chainCount++;
                        var aim = aiming.get (this.aimStyle);
                        this.s[i].setStartPoint (tempStart);
                        tempMob = aim.getElement (elems, tempStart);
                        this.s[i].setEndPoint (tempMob);
                        tempStart = this.s[i].getEndPoint ();
                        mobsPos.push (tempMob);
                    }
                }

                if (chainCount !== 0)
                    this.fire (chainCount);

                for (var i = chainCount; i < this.chain; i++) {
                    this.s[i].hide ();
                }

            }, this.frameRate, this);
        }
    },
    doDestroy: function () {
        if (this.levelComp !== undefined)
            this.levelComp.destroy ();
        this.destroy ();
        if (this.repID !== false)
            timer.clearTimer (this.repId);
        towerBrain.removeByTower (this);
        this.actor.destroy ();
        for (var i = 0; i < this.chain; i++) {
            this.s[i].doDestroy ();
        }
    }
});

/*** TOWER COMPONENTS HOMING ***/

/*** Homing Missile Tower Component ***/
Crafty.c (TOWER_HOMING_MISSILE, {
    create: function () {
        this.curving = TOWER_HOMING_MISSILE_PROPS.curving1;
        this.price = TOWER_HOMING_MISSILE_PROPS.price;
        this.upgradePrice = TOWER_HOMING_MISSILE_PROPS.upgradePrice;
        this.aimStyle = TOWER_HOMING_MISSILE_PROPS.aimStyle;
        for (var p in TOWER_PROPS)
            this[TOWER_PROPS[p]] = TOWER_HOMING_MISSILE_PROPS[TOWER_PROPS[p] + "" + this.level];
    },
    start: function () {
        this.repId = timer.repeat (function () {
            var elems = getEntities (ENEMY_ABS, this.center, this.range);
            if (elems.length !== 0) {
                this.fire ();
            }
        }, this.frameRate, this);
    },
    fire: function () {
        var s = shot.get (SHOT_HOMING, HOMING_IMAGE_NAME.homing);
        s.setStartPoint (this.center);
        s.setDamage (this.damage);
        s.setTTL (this.ttl);
        s.create (this.speed, this.curving, this.aimStyle);
        s.z = Z_TOWER_SHOT;
        Crafty.audio.play (TOWER_SOUND_NAME.homing, 1);
        s.start ();
    },
    upgrade: function () {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel (this.level + 1);
            this.curving = TOWER_HOMING_MISSILE_PROPS['curving' + this.level];
            this.upgradeLevel (TOWER_LEVEL_IMAGE['level' + (this.level - 1)]);
            for (var p in TOWER_PROPS)
                this[TOWER_PROPS[p]] = TOWER_HOMING_MISSILE_PROPS[TOWER_PROPS[p] + "" + this.level];

            timer.clearTimer (this.repId);

            this.repId = timer.repeat (function () {
                var elems = getEntities (ENEMY_ABS, this.center, this.range);
                if (elems.length !== 0) {
                    var aim = aiming.get (this.aimStyle);
                    this.endPoint = aim.getElement (elems, this.center);
                    this.fire ();
                }
            }, this.frameRate, this);
        }
    }
});

/*** TOWER COMPONENTS SPLASH ***/

/*** Electric Aura Tower Component ***/
Crafty.c (TOWER_ELECTRIC_AURA, {
    create: function () {
        this.price = TOWER_ELECTRIC_AURA_PROPS.price;
        this.upgradePrice = TOWER_ELECTRIC_AURA_PROPS.upgradePrice;
        this.aimStyle = TOWER_ELECTRIC_AURA_PROPS.aimStyle;
        for (var p in TOWER_PROPS)
            this[TOWER_PROPS[p]] = TOWER_ELECTRIC_AURA_PROPS[TOWER_PROPS[p] + "" + this.level];
    },
    start: function () {
        this.repId = timer.repeat (function () {
            var elems = getEntities (ENEMY_ABS, this.center, this.range);
            if (elems.length !== 0) {
                this.fire ();
            }
        }, this.frameRate, this);
    },
    fire: function () {
        var s = shot.get (SHOT_SPLASH, SPLASH_IMAGE_NAME.electric);
        s.setStartPoint ([this.startPoint.x, this.startPoint.y]);
        s.setDamage (this.damage);
        s.setTTL (this.ttl);
        s.create (this.range*2);
        s.z = Z_TOWER_SHOT;
        Crafty.audio.play (TOWER_SOUND_NAME.electric, 1);
        s.start ();
    },
    upgrade: function () {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel (this.level + 1);
            this.upgradeLevel (TOWER_LEVEL_IMAGE['level' + (this.level - 1)]);
            for (var p in TOWER_PROPS)
                this[TOWER_PROPS[p]] = TOWER_ELECTRIC_AURA_PROPS[TOWER_PROPS[p] + "" + this.level];

            timer.clearTimer (this.repId);

            this.repId = timer.repeat (function () {
                var elems = getEntities (ENEMY_ABS, this.center, this.range);
                if (elems.length !== 0) {
                    this.fire ();
                }
            }, this.frameRate, this);
        }
    }
});

/*** Slow Aura Tower Component ***/
Crafty.c (TOWER_SLOW_AURA, {
    create: function () {
        this.price = TOWER_SLOW_AURA_PROPS.price;
        this.upgradePrice = TOWER_SLOW_AURA_PROPS.upgradePrice;
        this.aimStyle = TOWER_SLOW_AURA_PROPS.aimStyle;
        for (var p in TOWER_PROPS)
            this[TOWER_PROPS[p]] = TOWER_SLOW_AURA_PROPS[TOWER_PROPS[p] + "" + this.level];
    },
    start: function () {
        this.repId = timer.repeat (function () {
            var elems = getEntities (ENEMY_ABS, this.center, this.range);
            if (elems.length !== 0) {
                this.fire ();
            }
        }, this.frameRate, this);
    },
    fire: function () {
        var s = shot.get (SHOT_SPLASH, SPLASH_IMAGE_NAME.slow);
        s.setStartPoint ([this.startPoint.x, this.startPoint.y]);
        s.setDamage (this.damage);
        s.setTTL (this.ttl);
        s.create (this.range*2);
        s.z = Z_TOWER_SHOT;
        Crafty.audio.play (TOWER_SOUND_NAME.slow, 1);
        s.start ();
    },
    upgrade: function () {
        if ((this.level + 1) <= MAX_LEVEL) {
            this.setLevel (this.level + 1);
            this.upgradeLevel (TOWER_LEVEL_IMAGE['level' + (this.level - 1)]);
            for (var p in TOWER_PROPS)
                this[TOWER_PROPS[p]] = TOWER_SLOW_AURA_PROPS[TOWER_PROPS[p] + "" + this.level];

            timer.clearTimer (this.repId);

            this.repId = timer.repeat (function () {
                var elems = getEntities (ENEMY_ABS, this.center, this.range);
                if (elems.length !== 0) {
                    this.fire ();
                }
            }, this.frameRate, this);
        }
    }
});
/*** TOWER BRAIN MODULE ***/

Crafty.c (TOWER_BRAIN, {
    init: function () {
        this.items = [];
    },
        
    add: function(type, position){
        var t = tower.get(type);
        t.setStartPoint(position);
        t.create();
        t.start();
        t.setType(type);
        this.items.push(t);
        return t;
    },
        
    clearTowers: function (){
        for(var t in this.items){
            this.items[t].doDestroyAll();          
        }
        this.items = [];
    },
        
    isPositionAvailable: function (position){
        var tempPos = toPoint(position);
        tempPos = [tempPos.x * W, tempPos.y * H];
        for(var t in this.items){
            if(tempPos[0] === this.items[t].startPoint.x && tempPos[1] === this.items[t].startPoint.y){
                return false;    
            }
        }
        return true;
    },
        
    removeByTower: function (tower){
        for(var t in this.items){
            if(tower === this.items[t]){
                this.items.splice(t, 1); 
            }
        }
    },

    getImage: function (type){
        var result;
        switch (type) {
            case TOWER_MACHINEGUN:
                result = TOWER_IMAGE_NAME.machineGunBody;
                break;
            case TOWER_CANNON:
                result = TOWER_IMAGE_NAME.cannonBody;
                break;
            case TOWER_FLAMETHROWER:
                result = TOWER_IMAGE_NAME.flamethrowerBody;
                break;
            case TOWER_ICE_DART:
                result = TOWER_IMAGE_NAME.iceDartBody;
                break;
            case TOWER_BEAM_LASER:
                result = TOWER_IMAGE_NAME.beamLaserBody;
                break;
            case TOWER_CHAIN_LASER:
                result = TOWER_IMAGE_NAME.chainLaserBody;
                break;
            case TOWER_HOMING_MISSILE:
                result = TOWER_IMAGE_NAME.homingMissileBody;
                break;
            case TOWER_ELECTRIC_AURA:
                result = TOWER_IMAGE_NAME.electricAuraBody;
                break;
            case TOWER_SLOW_AURA:
                result = TOWER_IMAGE_NAME.slowAuraBody;
                break;
        }
        return Crafty.e ('2D, Canvas, {0}'.format(result))
                .attr ({w: W, h: H, alpha: 0.8, z: 2});
    },
        
    getRange: function (type){
        switch (type) {
            case TOWER_MACHINEGUN:
                return TOWER_MACHINEGUN_PROPS.range1;
            case TOWER_CANNON:
                return TOWER_CANNON_PROPS.range1;
            case TOWER_FLAMETHROWER:
                return TOWER_FLAMETHROWER_PROPS.range1;
            case TOWER_ICE_DART:
                return TOWER_ICE_DART_PROPS.range1;
            case TOWER_BEAM_LASER:
                return TOWER_BEAM_LASER_PROPS.range1;
            case TOWER_CHAIN_LASER:
                return TOWER_CHAIN_LASER_PROPS.range1;
            case TOWER_HOMING_MISSILE:
                return TOWER_HOMING_MISSILE_PROPS.range1;
            case TOWER_ELECTRIC_AURA:
                return TOWER_ELECTRIC_AURA_PROPS.range1;
            case TOWER_SLOW_AURA:
                return TOWER_SLOW_AURA_PROPS.range1;
        }
    }        
});

window.towerBrain = Crafty.e (TOWER_BRAIN);
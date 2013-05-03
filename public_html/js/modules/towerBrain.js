Crafty.c (TOWER_BRAIN, {
    init: function () {
        this.items = [];
    },
        
    add: function(type, position){
        var t = tower.get(type);
        t.setStartPoint(position);
        t.create();
        t.start();
        this.items.push(t);
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
        
    removeByPosition: function (position){
        var tempPos = toPoint(position);
        tempPos = [tempPos.x * W, tempPos.y * H];
        for(var t in this.items){
            if(tempPos[0] === this.items[t].startPoint.x && tempPos[1] === this.items[t].startPoint.y){
                this.items[t].doDestroy();
                this.items.splice(t, 1); 
            }
        }
    },
        
    upgradeByPosition: function (position){
        var tempPos = toPoint(position);
        tempPos = [tempPos.x * W, tempPos.y * H];
        for(var t in this.items){
            if(tempPos[0] === this.items[t].startPoint.x && tempPos[1] === this.items[t].startPoint.y){
                this.items[t].upgrade();
            }
        }
    },

    getImage: function (type){
        return TOWER_IMAGE_ARRAY[type];
    }
});

window.towerBrain = Crafty.e (TOWER_BRAIN);
//define as global object
window.towerBuilder = {
    create: function(type) { 
        var build = Crafty.e ("2D, Canvas, Mouse, {0}".format(TOWER_BUILDER));
        build.setTowerType(type);
    }
}

//tower builder component
Crafty.c (TOWER_BUILDER, {
    towerType: false,
    transBG: false,
    lastX: false,
    lastY: false,
    
    init: function () {
        activeSceneCursor('default');
        this.w = SCREEN_WIDTH - PANEL_WIDTH;
        this.h = SCREEN_HEIGHT;
        this.transBG = Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH-PANEL_WIDTH, h: SCREEN_HEIGHT, alpha: 0.5, z: 1}).image ("images/sq.jpg", "repeat");
        this.bind('MouseMove', this.positionControl);
    },
    
    positionControl: function() {
        var xPos = mousePos.x / W;
    },
            
    setTowerType: function(type) {
        this.towerType = type;
    }
});
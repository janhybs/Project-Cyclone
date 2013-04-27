//define as global object
window.towerBuilder = {
    create: function(type) { 
        var build = Crafty.e ("2D, Canvas, Mouse, {0}".format(TOWER_BUILDER));
        build.setTowerType(type);
        build.setLevelPath('levels/level-01.xml'); //!!!! ONLY DEBUG !!!! - then do pointer to actual LEVEL!!!!
    }
}

//tower builder component
Crafty.c (TOWER_BUILDER, {
    towerType: false,
    transBG: false,
    levelPath: false,
    levelBoard: false,
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
        var xPos = Math.round(mousePos.x / W);
        var yPos = Math.round(mousePos.y / H);
                        
    },
            
    setTowerType: function(type) {
        this.towerType = type;
    },
            
    setLevelPath: function(level) {
        this.levelPath = level;
        this.loadActLevel();
    },
    
    loadActLevel: function() {
        jQuery.get (this.levelPath, this.setLevelBoard);
    },
    
    setLevelBoard: function(data) {
        this.levelBoard = parseBoard(($.xml2json (data)).board);
    }
});
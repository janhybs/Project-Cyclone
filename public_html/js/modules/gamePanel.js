/*********************
 *  Game panel modul *
 *********************
 */

//define as global object
window.gamePanel = {
    create: function() {
        return Crafty.e('2D, Canvas, Color, KeyBoard, {0}, {1}'.format(GAME_PANEL_COMPONENT, GAME_PANEL_CONTENT));
    }
};

/*
 * Game panel component.
 * ---------------------
 */
Crafty.c(GAME_PANEL_COMPONENT, {
    //init method
    init: function() {
        //panel width
        this.w = PANEL_WIDTH;
        //panel height
        this.h = Crafty.viewport.height;
        //panel position
        this.x = Crafty.viewport.width - PANEL_WIDTH;
        this.y = 0;
        //panel background color
        this.requires("Color").color(PANEL_BG_COLOR);
        //z set
        this.z = 2;
        //set key binding
        this.bind('KeyDown', this.keyShortcut);
    },
    
    //method for setting height
    setHeight: function(height) {
        this.h = height;
    },
            
    //method for setting bg color
    setBgColor: function(color) {
        this.color = color;
    },
    
    //method for key binding
    keyShortcut: function() {
        var key = arguments[0];
    }
});

/*
 * Game panel content
 * ------------------
 */
Crafty.c(GAME_PANEL_CONTENT, {
    //init method
    init: function() {
        Crafty.e("2D, DOM, Color, Text").attr({ x: Crafty.viewport.width - PANEL_WIDTH + 10, y: 30 }).text("TEST").textColor('#222299');
    }
});
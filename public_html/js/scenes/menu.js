Crafty.scene (SCENE_MENU, function () {
    
    Crafty.audio.play ('intro', 1);
    Crafty.audio.play ('snd', -1);

    Crafty.e ("2D, DOM, Image, _background")
            .attr ({w: Crafty.viewport.width, h: Crafty.viewport.height})
            .image ("images/bg.jpg", "repeat");


    Crafty.e ("2D, DOM, Text, Mouse").attr ({w: Crafty.viewport.width, h: 20, x: 0, y: 120})
            .text ("menu")
            .css ({"text-align": "center"})
            .bind ('MouseUp',
            function () {
                Crafty.scene (SCENE_GAME);
            });
        
    Crafty.e ("2D, DOM, Text, Mouse").attr ({w: Crafty.viewport.width, h: 20, x: 0, y: 170})
            .text ("p2p test")
            .css ({"text-align": "center"})
            .bind ('MouseUp',
            function () {
                Crafty.scene (SCENE_P2P_TEST);
            });        
        
        
    Crafty.e ("2D, DOM, Text, Mouse").attr ({w: Crafty.viewport.width, h: 20, x: 0, y: 220})
            .text ("laser test")
            .css ({"text-align": "center"})
            .bind ('MouseUp',
            function () {
                Crafty.scene (SCENE_LASER_TEST);
            });
        
        
    Crafty.e ("2D, DOM, Text, Mouse").attr ({w: Crafty.viewport.width, h: 20, x: 0, y: 270})
            .text ("homing test")
            .css ({"text-align": "center"})
            .bind ('MouseUp',
            function () {
                Crafty.scene (SCENE_HOMING_TEST);
            });
        
        
    Crafty.e ("2D, DOM, Text, Mouse").attr ({w: Crafty.viewport.width, h: 20, x: 0, y: 320})
            .text ("splash test")
            .css ({"text-align": "center"})
            .bind ('MouseUp',
            function () {
                Crafty.scene (SCENE_SPLASH_TEST);
            });
   
    Crafty.e("2D, DOM, Text, Mouse").attr({w: Crafty.viewport.width, h: 20, x: 0, y: 370})
            .text("tower test")
            .css({"text-align": "center"})
            .bind('MouseUp',
            function() {
                Crafty.scene(SCENE_P2P_TOWER_TEST);
            });
        
   
    Crafty.e("2D, DOM, Text, Mouse").attr({w: Crafty.viewport.width, h: 20, x: 0, y: 420})
            .text("enemy test")
            .css({"text-align": "center"})
            .bind('MouseUp',
            function() {
                Crafty.scene(SCENE_ENEMY_TEST);
            });
});
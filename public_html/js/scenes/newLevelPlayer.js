Crafty.scene (SCENE_LEVEL_UP, function () {
    
    //background
    Crafty.background ('#DDD');
    
    //text about level up
    Crafty.e("2D, DOM, Text").attr({y: 40 ,w: Crafty.viewport.width})
            .text(LEVEL_UP_TEXT).css({'text-align': 'center', 'font-family': 'Arial', 'font-size': '30px'});
    
    //image of hero
    Crafty.e("2D, DOM, Image").attr({x: 440, y: 100, w: Crafty.viewport.width, h: 100})
             .image("images/soldier_hero.png");
});
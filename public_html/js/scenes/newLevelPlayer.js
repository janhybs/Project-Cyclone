Crafty.scene (SCENE_LEVEL_UP, function () {
    
    //background
    Crafty.background ('#DDD');
    
    //text about level up
    Crafty.e("2D, DOM, Text").attr({y: 40 ,w: Crafty.viewport.width})
            .text(LEVEL_UP_TEXT).css({'text-align': 'center', 'font-family': 'Arial', 'font-size': '30px'});
    
    //image of hero
    Crafty.e("2D, DOM, Image").attr({x: 440, y: 100, w: Crafty.viewport.width, h: 100})
             .image("images/soldier_hero.png");
  
    //text about player points
    var playerPoints = Crafty.e("2D, DOM, Text").attr({y: 220 ,w: Crafty.viewport.width})
            .text(AVAILABLE_POINTS_TEXT + "2").css({'text-align': 'center', 'font-family': 'Arial', 'font-size': '20px'});
    
    //text damage
    Crafty.e("2D, DOM, Text").attr({y: 270 ,w: Crafty.viewport.width})
            .text("Damage (Max 10)").css({'text-align': 'center', 'font-family': 'Arial', 'font-size': '22px'});
    
    //left damage arrow
    var leftDamage = Crafty.e("2D, DOM, Image, Mouse").attr({x: 360, y: 300, w: Crafty.viewport.width, h: 100})
             .image("images/left_arrow.png").bind('MouseOver', function() {this.image("images/left_arrow_active.png")})
             .bind('MouseOut', function() {this.image("images/left_arrow.png")});
    
    //text about player points
    var damagePoints = Crafty.e("2D, DOM, Text").attr({y: 320 ,w: Crafty.viewport.width})
            .text("3").css({'text-align': 'center', 'font-family': 'Arial', 'font-size': '22px'});
    
    //right damage arrow
    var rightDamage = Crafty.e("2D, DOM, Image, Mouse").attr({x: 540, y: 300, w: Crafty.viewport.width, h: 100})
             .image("images/right_arrow.png").bind('MouseOver', function() {this.image("images/right_arrow_active.png")})
             .bind('MouseOut', function() {this.image("images/right_arrow.png")});
     
    //text range
    Crafty.e("2D, DOM, Text").attr({y: 390 ,w: Crafty.viewport.width})
            .text("Range (Max 10)").css({'text-align': 'center', 'font-family': 'Arial', 'font-size': '22px'});
    
    //left damage arrow
    var leftRange = Crafty.e("2D, DOM, Image, Mouse").attr({x: 360, y: 420, w: Crafty.viewport.width, h: 100})
             .image("images/left_arrow.png").bind('MouseOver', function() {this.image("images/left_arrow_active.png")})
             .bind('MouseOut', function() {this.image("images/left_arrow.png")});
    
    //text about player points
    var rangePoints = Crafty.e("2D, DOM, Text").attr({y: 440 ,w: Crafty.viewport.width})
            .text("2").css({'text-align': 'center', 'font-family': 'Arial', 'font-size': '22px'});
    
    //right damage arrow
    var rightRange = Crafty.e("2D, DOM, Image, Mouse").attr({x: 540, y: 420, w: Crafty.viewport.width, h: 100})
             .image("images/right_arrow.png").bind('MouseOver', function() {this.image("images/right_arrow_active.png")})
             .bind('MouseOut', function() {this.image("images/right_arrow.png")});
});
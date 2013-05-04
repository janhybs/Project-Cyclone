Crafty.scene(SCENE_P2P_TOWER_TEST, function() {

    Crafty.background('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var path1 = enlargePath (expandPath (splitPath ('0,0 1,0 1,8 8,8 12,8 12,14 15,14 15,0 19,0 19,6')));
    var p0 = {x: 10, y: 10};

    var timer = Crafty.e ('Framer');

        var e = enemy.create ({
            path: path1,
            image: "enemy_red_48",
            speed: 0,
            shield: 9999999,
            size: ENEMY_SIZE.normal
        });
        e.start ();
        e.requires ('HealthBar');
        
    timer.repeat (function (){
        e.x = mousePos.x;
        e.y = mousePos.y;
    }, 1);
        
    
    towerBrain.add(TOWER_BEAM_LASER, [p0.x * W, p0.y * H]);
    //towerBrain.add(TOWER_BEAM_LASER, [p2.x * W, p2.y * H]);
    //towerBrain.isPositionAvailable([p2.x, p2.y]);
    //towerBrain.upgradeByPosition([p0.x, p0.y]);

});
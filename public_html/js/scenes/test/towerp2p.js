Crafty.scene(SCENE_P2P_TOWER_TEST, function() {

    Crafty.background('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var path1 = enlargePath (expandPath (splitPath ('0,0 1,0 1,8 8,8 12,8 12,14 15,14 15,0 19,0 19,6')));
    var p0 = {x: 2, y: 2};
    var p1 = {x: 4, y: 10};
    var p2 = {x: 5, y: 6};

    var timer = Crafty.e ('Framer');

    timer.repeat (function () {
        var e = enemy.create ({
            path: path1,
            image: "scream_32",
            speed: ENEMY_SPEED.slow,
            shield: ENEMY_SHIELD.boss,
            size: ENEMY_SIZE.normal,
            resistance: arrayMerge (arrayMult (ENEMY_TYPE.normal, 0.8), arrayMult (ENEMY_TYPE.fire, 0.2))
        });
        e.start ();
        e.requires ('HealthBar');
    }, FRAME_RATE);

    var t = tower.get(TOWER_ICE_DART);
    t.setStartPoint([p0.x * W, p0.y * H]);
    t.create();
    t.upgrade();
    t.start();

    var t2 = tower.get(TOWER_MACHINEGUN);
    t2.setStartPoint([p1.x * W, p1.y * H]);
    t2.create();
    t2.start();
        
    var t3 = tower.get(TOWER_BEAM_LASER);
    t3.setStartPoint([p2.x * W, p2.y * H]);
    t3.create();
    t3.start();

});
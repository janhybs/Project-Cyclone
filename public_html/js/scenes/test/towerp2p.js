Crafty.scene(SCENE_P2P_TOWER_TEST, function() {

    Crafty.background('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var path1 = enlargePath (expandPath (splitPath ('0,0 1,0 1,8 8,8 12,8 12,14 15,14 15,0 19,0 19,6')));
    var p0 = {x: 4, y: 2};
    var p1 = {x: 4, y: 10};
    var p2 = {x: 5, y: 6};

    var timer = Crafty.e ('Framer');

    timer.repeat (function () {
        var e = enemy.create ({
            path: path1,
            shield: ENEMY_SHIELD.no,
            size: ENEMY_SIZE.small,
            speed: ENEMY_SPEED.slow,
            resistance: arrayMerge (arrayMult (ENEMY_TYPE.normal, 0.8), arrayMult (ENEMY_TYPE.fire, 0.2))
        });
        e.start ();
        e.requires ('HealthBar');
    }, FRAME_RATE);

    var t = tower.get(TOWER_MACHINEGUN);
    t.setStartPoint([p0.x * W, p0.y * H]);
    t.create();
    t.upgrade();
    timer.repeat(function() {
        t.start();
    }, FRAME_RATE / 5);

    var t2 = tower.get(TOWER_CANNON);
    t2.setStartPoint([p1.x * W, p1.y * H]);
    t2.create();
    timer.repeat(function() {
        t2.start();
    }, FRAME_RATE / 1);
    
    var t3 = tower.get(TOWER_HOMING_MISSILE);
    t3.setStartPoint([p2.x * W, p2.y * H]);
    t3.create();
    timer.repeat(function() {
        t3.start();
    }, FRAME_RATE / 2);

});
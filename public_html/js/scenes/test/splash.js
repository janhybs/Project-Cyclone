Crafty.scene (SCENE_SPLASH_TEST, function () {

    Crafty.background ('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var p0 = {x: 2, y: 2};
    var p1 = {x: 20, y: 12};


    //# cat tower #1
//    board.createGate (p0);
    setInterval (function () {
        var s = shot.get (SHOT_SPLASH);
        s.setStartPoint ([Crafty.math.randomInt (0, 30) * W, Crafty.math.randomInt (0, 20) * H]);
        s.create (W * 5);
        s.setDamage ([100, 0, 0, 0, 0]);
        s.setTTL (FRAME_RATE);
        s.start ();
    }, 100);





    for (var i = 0; i < SCREEN_WIDTH; i += 1 * W) {
        for (var j = 0; j < SCREEN_HEIGHT; j += 1 * H) {
            var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
            e.attr ({w: W / 2, h: H / 2});
            e.create (null, 0, 0, 100, 0, 0);
            e.x = i + (W - e.w) / 2;
            e.y = j + (H - e.h) / 2;
            e.start ();
            e.requires ('HealthBar');
            e.healthbarWidth = W * 0.66;
            e.healthbarHeight = 4;
        }
    }


});
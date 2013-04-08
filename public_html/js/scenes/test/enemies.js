Crafty.scene (SCENE_ENEMY_TEST, function () {

    Crafty.background ('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var path1 = enlargePath (expandPath (splitPath ('0,0 1,0 1,8 8,8 12,8 12,14 15,14 15,0 19,0 19,6')));
    var path2 = enlargePath (expandPath (splitPath ('25,18 1,18')));
    var path3 = enlargePath (splitPath ('25,0 20,15'));

    var timer = Crafty.e ('Framer');


//    var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
//    e.attr ({w: 33 * (1.0), h: 37 * (1.0)});
//    e.create (path1, 1.0, 0, 100, 0, 0);
//    e.start ();
//    e.requires ('HealthBar');
//    e.health /= 1.5;

    timer.repeat (function () {
        var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
        e.attr ({w: 33 * (0.6), h: 37 * (0.6)});
        e.create (path1, 1.0, 0, 100);
        e.start ();
        e.requires ('HealthBar');
    }, FRAME_RATE);

    timer.repeat (function () {
        var s = shot.get (SHOT_P2P);
        s.setStartPoint ([14 * W, 9 * H]);
        s.setEndPoint (mousePos);
        s.create (15);
        s.setDamage ([
            20, 0, 0, 0, 0,
            5, 30, 2,
            0.5, 1, FRAME_RATE * 10]);
        s.start ();
    }, FRAME_RATE / 5);
//    e.requires ('HealthBar');
//    for (var i = 0; i < SCREEN_WIDTH; i+= W) {
//        for (var j = 0; j < SCREEN_HEIGHT; j+= H) {
//            var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
//            e.attr ({w: 33 * (1.0), h: 37 * (1.0)});
//            e.x = i;
//            e.y = j;
//        }    
//    }
//
//    var radius = 0;
//    timer.repeat (function () {
//        var e = getEntities (ENEMY_ABS, [SCREEN_WIDTH/2, SCREEN_HEIGHT/2], radius);
//        console.log (e);
//        for (var i = 0, l = e.length; i < l; i++)
//            e[i].alpha = (e[i].alpha - 0.05) < 0 ? 1 : (e[i].alpha - 0.05);
//        radius = (radius + 20) > SCREEN_WIDTH/4 ? 0 : (radius + 20);
//    }, 10);

//    timer.repeat ( function () {
//        if (new Date ().getSeconds () % 2 === 0) {
//            var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
//            e.attr ({w: 33 * (.7), h: 37 * (.7)});
//            e.create (path1, 3.0);
//            e.start ();
//        }
//    }, 100);

//    var t = tower.get (TOWER_P2P);
//    t.setStartPoint ([SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2]);
//    timer.repeat ( function () {
//        t.setEndPoint ([Crafty.math.randomInt (0, SCREEN_WIDTH), Crafty.math.randomInt (0, SCREEN_HEIGHT)]);
//        t.shoot ();
//    }, 30);

//    timer.repeat ( function () {
//        var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
//        e.attr ({w: 33 * (.7), h: 37 * (.7)});
//        e.create (path2, 3.0, 0, 0, 0, 24);
//        e.start ();
//    }, 60);


//    timer.repeat ( function () {
//        var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
//        e.attr ({w: 33 * (.7), h: 37 * (.7)});
//        e.create (path3, 3.0, 0, 0, 0, 0);
//        e.start ();
//    }, 150);

});

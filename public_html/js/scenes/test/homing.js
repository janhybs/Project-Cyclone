Crafty.scene (SCENE_HOMING_TEST, function () {

    Crafty.background ('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var p0 = {x: 14, y: 9};
    var p1 = {x: 5, y: 5};
    var p2 = {x: 10, y: 10};

    var timer = Crafty.e ('Timer');

    //# cat tower #1
    board.createGate (p0);
    timer.repeat (function () {
        var h = shot.get (SHOT_HOMING);
        h.setStartPoint ([p0.x * W + W / 2, p0.y * H + H / 2]);
        h.setEndPoint (mousePos);
        h.create (5, 30);
        h.setTTL (30 * FRAME_RATE);
        h.start ();

        var h = shot.get (SHOT_HOMING);
        h.setStartPoint ([p0.x * W + W / 2, p0.y * H + H / 2]);
        h.setEndPoint ([Crafty.math.randomInt (0, 30) * W, Crafty.math.randomInt (0, 20) * H]);
        h.create (10, 2);
        h.setTTL (10 * FRAME_RATE);
        h.start ();
    }, 250);



    //# cat tower #2
//    board.createGate (p1);
//    setInterval (function () {
//        var h = shot.get (SHOT_HOMING);
//        h.setStartPoint ([p1.x * W, p1.y * H]);
//        h.setEndPoint (mousePos);
//        h.create (10, 30 + Math.random () * 30);
//        h.setTTL (30 * FRAME_RATE);
//        h.start ();
//    }, 100);


});
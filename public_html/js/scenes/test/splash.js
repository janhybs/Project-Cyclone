Crafty.scene (SCENE_SPLASH_TEST, function () {

    Crafty.background ('#333');

    var p0 = {x: 2, y: 2};
    var p1 = {x: 20, y: 12};
    


    //# cat tower #1
    board.createGate (p0);
    setInterval (function () {
        var s = shot.get (SHOT_SPLASH);
        s.setStartPoint ([Crafty.math.randomInt (50, SCREEN_WIDTH-50), Crafty.math.randomInt (50, SCREEN_HEIGHT-50)]);
        s.create (20, 32);
        s.setTTL (2 * FRAME_RATE);
        s.setFrameCount (16);
        s.start ();
    }, 50);
//
//
//
    //# cat tower #2
    board.createGate (p1);
    setInterval (function () {
        var s = shot.get (SHOT_SPLASH);
        s.setStartPoint ([SCREEN_WIDTH/2, SCREEN_HEIGHT/2]);
        s.create (1, 240);
        s.setTTL (1 * FRAME_RATE);
        s.setFrameCount (16);
        s.start ();
    }, 1000);


});
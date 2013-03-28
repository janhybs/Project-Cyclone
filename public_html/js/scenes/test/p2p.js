Crafty.scene (SCENE_P2P_TEST, function () {

    Crafty.background ('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var p0 = {x: 2, y: 2};
    var p1 = {x: 12, y: 8};
    var p2 = {x: 10, y: 10};
    var HIDDEN = 0.1;
    var timer = Crafty.e ('Timer');

    //# cat tower #1
    board.createGate (p0).alpha = HIDDEN;
    timer.repeat (function () {
        var s = shot.get (SHOT_P2P);
        s.setStartPoint ([p0.x * W, p0.y * H]);
        s.setEndPoint (mousePos);
        s.create (5);
        s.start ();
        s.alpha = HIDDEN;
    }, 500);



    //# cat tower #2
    var a = 0; // angle (0 - 360)
    var d = 0; // delta (spreading) 0 - 180 (180 - 360 = entire 360°)
    board.createGate (p1);
    timer.repeat (function () {
        for (var i = 0; i < 5; i++) {
            var s = shot.get (SHOT_P2P);
            s.setStartPoint ([p1.x * W, p1.y * H]);
            s.setSpreading ((d = (++d) >= 180 * 4 ? 0 : d) / 4);
            a = d === 0 ? Math.random () * 360 : a;
            s.setAngle (a);
            s.setSpeed (5);
            s.setTTL (FRAME_RATE);
            s.start ();
        }
    }, 10);


    //# moving cat tower #3
    board.createGate (p2).alpha = HIDDEN;
    var gate = board.createPortal (p2);
    gate.alpha = HIDDEN;
    timer.repeat (function () {
        var s = shot.get (SHOT_P2P);
        s.setStartPoint ([p2.x * W, p2.y * H]);
        s.setEndPoint (gate);
        s.create (5);
        s.start ();
        s.alpha = HIDDEN;
    }, 100);
    timer.repeat (function () {
        gate.x = Math.random () * 920 + 20;
        gate.y = Math.random () * 600 + 20;
    }, 1500);

});
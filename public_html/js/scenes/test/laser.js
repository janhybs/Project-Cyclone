Crafty.scene (SCENE_LASER_TEST, function () {

    Crafty.background ('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var p0 = {x: 12, y: 8};
    var p1 = {x: 5, y: 5};
    var p2 = {x: 10, y: 10};
    var p = [p0, p1, p2];

    for (var i = 0; i < 3; i++) {
        var g = board.createGate (p[i]);
        var l = shot.get (SHOT_LASER);
        g.z = 100;
        l.z = 99;
        l.setStartPoint ([p[i].x * W, p[i].y * H]);
        l.setEndPoint (mousePos);
        l.create ("images/laser-0{0}.png".format (i + 1));
        l.start ();
    }
});
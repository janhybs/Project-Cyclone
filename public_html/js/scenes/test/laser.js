Crafty.scene (SCENE_LASER_TEST, function () {

    Crafty.background ('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var p0 = {x: 12, y: 8};
    var p1 = {x: 5, y: 5};
    var p2 = {x: 10, y: 10};
    var p3 = {x: 20, y: 5};
    var p = [p0, p1, p2, p3];
    
    var lasers = [LASER_IMAGE_PATH.laserThickBlue,
        LASER_IMAGE_PATH.laserThickPurple,
        LASER_IMAGE_PATH.laserThickYellow,
        LASER_IMAGE_PATH.laserThinRed];

    for (var i = 0; i < p.length; i++) {
        var g = board.createGate (p[i]);
        var l = shot.get (SHOT_LASER);
        g.z = 100;
        l.z = 99;
        l.setStartPoint ([p[i].x * W + W / 2, p[i].y * H + H / 2]);
        l.setEndPoint (mousePos);
        l.create (lasers[i]);
        l.start ();
    }
});
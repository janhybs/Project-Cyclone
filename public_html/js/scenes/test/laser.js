Crafty.scene (SCENE_LASER_TEST, function () {

    Crafty.background ('#333');

    var p0 = {x: 2, y: 2};
    var p1 = {x: 5, y: 5};
    var p2 = {x: 10, y: 10};

    //# cat laser tower #1
    board.createGate (p0);
    var l = shot.get (SHOT_LASER);
    l.setStartPoint ([p0.x * W, p0.y * H]);
    l.setEndPoint (mousePos);
    l.create ();
    l.start ();



    //# cat tower #2
    board.createGate (p1);
    var l1 = shot.get (SHOT_LASER);
    l1.setStartPoint ([p1.x * W, p1.y * H]);
    l1.setEndPoint ([Math.random () * 920 + 20, Math.random () * 600 + 20]);
    l1.create ();
    l1.start ();

    setInterval (function () {
        l1.setEndPoint ([Math.random () * 920 + 20, Math.random () * 600 + 20]);
    }, 500);

});
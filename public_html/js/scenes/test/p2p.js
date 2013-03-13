Crafty.scene (SCENE_P2P_TEST, function () {

    Crafty.background ('#333');

    var p0 = {x: 2, y: 2};
    var p1 = {x: 5, y: 5};
    var p2 = {x: 10, y: 10};   

    //# cat tower #1
    board.createGate (p0);
    setInterval (function () {
        var s = shot.get (SHOT_P2P);
        s.setStartPoint ([p0.x * W, p0.y * H]);
        s.setEndPoint (mousePos);
        s.create (5);
        s.start ();
    }, 500);



    //# cat tower #2
    board.createGate (p1);
    setInterval (function () {
        var s = shot.get (SHOT_P2P);
        s.setStartPoint ([p1.x * W, p1.y * H]);
        s.setEndPoint (mousePos);
        s.create (5);
        s.start ();
    }, 100);


    //# moving cat tower #3
    board.createGate (p2);
    var gate = board.createPortal (p2);
    setInterval (function () {   
        var s = shot.get (SHOT_P2P);
        s.setStartPoint ([p2.x * W, p2.y * H]);
        s.setEndPoint (gate);
        s.create (5);
        s.start ();
    }, 100);
    setInterval (function () {
        gate.x = Math.random ()*920+20;
        gate.y = Math.random ()*600+20;
    }, 1500);

});
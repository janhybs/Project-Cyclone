Crafty.scene (SCENE_ENEMY_TEST, function () {

    Crafty.background ('#BBB');
    var path1 = enlargePath (expandPath (splitPath ('0,0 1,0 1,8 8,8 12,8 12,14 15,14 15,0 19,0 19,6')));
    var path2 = enlargePath (expandPath (splitPath ('25,18 1,18')));
    var path3 = enlargePath (splitPath ('25,0 20,15'));



    setInterval (function () {
        if (new Date ().getSeconds () % 2 === 0) {
            var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
            e.attr ({w: 33 * (.7), h: 37 * (.7)});
            e.create (path1, 3.0);
            e.start ();
        }
    }, 100);

    setInterval (function () {
        var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
        e.attr ({w: 33 * (.7), h: 37 * (.7)});
        e.create (path2, 3.0, 0, 0, 0, 24);
        e.start ();
    }, 60);


    setInterval (function () {
        var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
        e.attr ({w: 33 * (.7), h: 37 * (.7)});
        e.create (path3, 3.0, 0, 0, 0, 0);
        e.start ();
    }, 150);

});
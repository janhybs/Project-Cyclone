Crafty.scene (SCENE_GAME, function () {

    Crafty.background ('#F00');


    Crafty.e ("2D, DOM, Text")
            .attr ({w: Crafty.viewport.width, h: 20, x: 0, y: 120})
            .text ("GAME")
            .css ({"text-align": "center"});

    jQuery.get ('levels/level-01.xml', function (data) {
        var xmldata = $.xml2json (data);

        var levelBoard = parseBoard (xmldata.board);
        var levelPaths = parsePaths (xmldata.paths);

        board.showBoard (levelBoard);
        board.showPortals (levelPaths);
        board.showGates (levelPaths);
        
        
        var h = shot.get (SHOT_HOMING);
        h.setStartPoint ([3 * W, 3 * H]);
        h.setEndPoint (mousePos);
        h.create (3);
        h.start ();


    }, null, 'text');
    //test player
    var pl = player.create(PLAYER_DEBUG);
});
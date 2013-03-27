Crafty.scene (SCENE_GAME, function () {

    Crafty.background ('#F00');

    //mouse click activating for this scene
    activeSceneMouseClick();
    
    //add special cursor (fire-cursor)
    activeSceneCursor('crosshair');

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
    
    //add panel to scene
    var panel = gamePanel.create();
    
    //test player
    var pl = player.create(PLAYER_SOLDIER);
});
Crafty.scene (SCENE_GAME, function () {

    activateCanvas ();
    loadPage ('gamePanel', 'panel-main');
    Crafty.background ('#F00');

    //mouse click activating for this scene
    activeSceneMouseClick();
    //mouse stop fire activating for this scene
    activeSceneMouseStopFire();
    
    //add special cursor (fire-cursor)
    activeSceneCursor('url(/Project-Cyclone/images/crosshair.png),default');

    jQuery.get ('levels/level-01.xml', function (data) {
        var xmldata = $.xml2json (data);

        var levelBoard = parseBoard (xmldata.board);
        var levelPaths = parsePaths (xmldata.paths);

        board.showBoard (levelBoard);
        board.showPortals (levelPaths);
        board.showGates (levelPaths);
        
        
        var timer = Crafty.e ("Framer");
        var path = enlargePath (levelPaths[0]);
        timer.repeat (function () {
            var e = enemy.create ({path: path, speed: ENEMY_SPEED.fast});
//            e.requires ('HealthBar');
            e.start ();
        }, FRAME_RATE * 2);
        
        

    }, null, 'text');
    
    //add panel to scene
    var panel = gamePanel.create();
    
    //test player
    var pl = player.create(PLAYER_LASER);
});
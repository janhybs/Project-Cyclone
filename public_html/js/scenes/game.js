Crafty.scene (SCENE_GAME, function () {

    activateCanvas ();
    loadPage ('gamePanel', 'panel-main');
    Crafty.background ('#F00');

    //mouse click activating for this scene
    activeSceneMouseClick ();
    //mouse stop fire activating for this scene
    activeSceneMouseStopFire ();

    //add special cursor (fire-cursor)
    activeSceneCursor ('url(/Project-Cyclone/images/crosshair.png),default');

    var lvl = 2;
    jQuery.get ('levels/level-0{0}.xml'.format (lvl), function (data) {
        var xmldata = $.xml2json (data);

        var levelBoard = parseBoard (xmldata.board);
        var levelPaths = parsePaths (xmldata.paths);

        board.showBoard (levelBoard);
        board.showPortals (levelPaths);
        board.showGates (levelPaths);


        var paths = [];
        for (var i = 0; i < levelPaths.length; i++) {
            paths.push (enlargePath (levelPaths[i]));
        }

        timer.repeat (function () {
            for (var i = 0; i < levelPaths.length; i++) {
                enemy.create ({
                    path: paths[i], speed: 10, wobble: ENEMY_WOBBLE.no
                }).start ();
            }
        }, FRAME_RATE / 5);
        
        Crafty.e ("2D, Canvas, Image, _background")
                .attr ({w: SCREEN_WIDTH - PANEL_WIDTH, h: SCREEN_HEIGHT})
                .image ("images/levels/level-0{0}.png".format (lvl), "no-repeat");



    }, null, 'text');

    //add panel to scene
    var panel = gamePanel.create ();

    //test player
    $.player = player.create (PLAYER_SOLDIER);
    
    //actual level - debug only - it will be deleted
    $.actualLevel = 'levels/level-02.xml';
});
Crafty.scene (SCENE_GAME, function () {

    activateCanvas ();
    loadPage ('gamePanel', 'panel-main', function () {
        //load money info
        $('#availableMoney').html(PlayerUtils.getPlayerMoney());
    });

    //mouse click activating for this scene
    activeSceneMouseClick ();
    //mouse stop fire activating for this scene
    activeSceneMouseStopFire ();

    //add special cursor (fire-cursor)
    activeSceneCursor ('url(/Project-Cyclone/images/crosshair.png),default');

    jQuery.get ('levels/level-0{0}.xml'.format ($.actualLevel), function (data) {
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
                    path: paths[i], speed: ENEMY_SPEED.lighbolt, wobble: ENEMY_WOBBLE.no
                }).start ();
            }
        }, FRAME_RATE);
        
        Crafty.e ("2D, Canvas, Image, _background")
                .attr ({w: SCREEN_WIDTH - PANEL_WIDTH, h: SCREEN_HEIGHT})
                .image ("images/levels/level-0{0}.png".format ($.actualLevel), "no-repeat");



    }, null, 'text');

    //test player
    $.player = PlayerLoader.load();
    
    //lock for towerbuilder
    $.toverBuilderLock = false;
});

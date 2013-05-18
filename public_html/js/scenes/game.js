Crafty.scene (SCENE_GAME, function () {

    activateCanvas ();
    loadPage ('gamePanel', 'panel-main', function () {
        bindActions ();
    });

    //mouse click activating for this scene
    activeSceneMouseClick ();
    //mouse stop fire activating for this scene
    activeSceneMouseStopFire ();

    //add special cursor (fire-cursor)
    activeSceneCursor ('url(/images/crosshair.png),default');

    jQuery.get ('levels/level-0{0}.xml'.format ($.actualLevel), function (data) {
        var xmlData = $.xml2json (data);

        $.totalWaves = Number (xmlData.waves.wave.length);
        $.currentWave = 1;
        $.livesTotal = Number (xmlData.tolerance);
        $.livesLeft = Number (xmlData.tolerance);

        var levelBoard = parseBoard (xmlData.board);
        var levelPaths = parsePaths (xmlData.paths);
        PlayerUtils.setPlayerMoney (parseInt (xmlData.money));


        refreshMoney ();
        refreshWave ();

        board.showBoard (levelBoard);
        board.showPortals (levelPaths);
        $.gates = board.showGates (levelPaths);

        $.currentWave = 0;
        $.gameOver = false;
        $ ('#livesInfo').html ("{1}/{0}".format ($.livesTotal, $.livesLeft));
        generator.start (xmlData, levelPaths);


        Crafty.e ("2D, Canvas, Image, _background")
                .attr ({w: SCREEN_WIDTH - PANEL_WIDTH, h: SCREEN_HEIGHT, z: Z_BOARD})
                .image ("images/levels/level-0{0}.png".format ($.actualLevel), "no-repeat")
                .bind (ENEMY_SLIP, function () {
            $.livesLeft--;
            if ($.livesLeft === 0) {
                $.gameOver = true;
                Crafty.trigger (GAME_OVER, $.livesTotal);
            }
            $ ('#livesInfo').html ("{1}/{0}".format ($.livesTotal, $.livesLeft));
        });

        $.freeze = Crafty.e (MULTI_FREEZE);



        Crafty.viewport.reload ();

    }, null, 'text');

    //test player
    $.player = PlayerLoader.load ();

    //lock for towerbuilder
    $.toverBuilderLock = false;

    //binds for ending game
    Crafty.bind (GAME_OVER, function () {
        Crafty.scene (SCENE_GAME_OVER);
    });

    Crafty.bind (GAME_END, function (slips) {
        $.enemyLosts = slips;

        if ($.actualLevel === 5)
            Crafty.scene (SCENE_GAME_WIN);
        else
            Crafty.scene (SCENE_GAME_SUCCESS);
    });
}, function () {
    //# clean up when we are leaving this scene
    enemyBrain.clearEnemies ();
    towerBrain.clearTowers ();
    timer.clear ();
    Crafty ("{0}, {1}, {2}".format (ENEMY_ABS,
            PLAYER_ABS, TOWER_ABS)).destroy ();
    Crafty.audio.stop ();
});

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
    activeSceneCursor ('url(/Project-Cyclone/images/crosshair.png),default');

    jQuery.get ('levels/level-0{0}.xml'.format ($.actualLevel), function (data) {
        var xmlData = $.xml2json (data);

        var levelBoard = parseBoard (xmlData.board);
        var levelPaths = parsePaths (xmlData.paths);
        PlayerUtils.setPlayerMoney (parseInt (xmlData.money));
        $.totalWaves = xmlData.waves.wave.length;
        $.currentWave = 1;

        refreshMoney ();
        refreshWave ();
        $.currentWave = 0;

        board.showBoard (levelBoard);
        board.showPortals (levelPaths);
        board.showGates (levelPaths);
        window.levelData = xmlData;

        $.livesTotal = Number (xmlData.waves.tolerance);
        $.livesLeft = Number (xmlData.waves.tolerance);
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



    }, null, 'text');

    //test player
    $.player = PlayerLoader.load ();

    //lock for towerbuilder
    $.toverBuilderLock = false;

    //binds for ending game
    Crafty.bind (GAME_OVER, function () {
        enemyBrain.clearEnemies ();
        towerBrain.clearTowers ();
        timer.clear ();
        Crafty ("{0}, {1}, {2}".format (ENEMY_ABS,
                PLAYER_ABS, TOWER_ABS)).destroy ();
        Crafty.audio.stop ();
        console.log ("game over");
        Crafty.scene (SCENE_GAME_OVER);
    });

    Crafty.bind (GAME_END, function (slips) {
        enemyBrain.clearEnemies ();
        towerBrain.clearTowers ();
        timer.clear ();
        Crafty ("{0}, {1}, {2}".format (ENEMY_ABS,
                PLAYER_ABS, TOWER_ABS)).destroy ();
        Crafty.audio.stop ();
        $.enemyLosts = slips;
        console.log ('game success');

        if ($.actualLevel === 5)
            Crafty.scene (SCENE_GAME_WIN);
        else
            Crafty.scene (SCENE_GAME_SUCCESS);
    });
});

Crafty.scene (SCENE_GAME_SUCCESS,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-game-complete', function () {
                if($.actualLevel === PlayerUtils.getMaxOpenLevel())
                    PlayerUtils.openNextLevel();
                PlayerUtils.setBestScoreByLevel($.actualLevel, ($.livesTotal- $.livesLeft));
            });
        },
        function () {

            activateCanvas ();
        });
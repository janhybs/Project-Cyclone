Crafty.scene (SCENE_GAME_WIN,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-game-win', function () {
                PlayerUtils.setBestScoreByLevel($.actualLevel, ($.livesTotal- $.livesLeft));
            });
        },
        function () {

            activateCanvas ();
        });
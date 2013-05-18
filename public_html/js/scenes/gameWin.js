Crafty.scene (SCENE_GAME_WIN,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-game-win', function () {
                 var score = {
                    points: Math.floor ((PlayerUtils.getPlayerMoney () * 10) * ($.livesLeft / $.livesTotal)),
                    slips: Math.floor (($.livesTotal- $.livesLeft))
                };
                PlayerUtils.setBestScoreByLevel($.actualLevel, score);
            });
        },
        function () {

            activateCanvas ();
        });
Crafty.scene (SCENE_GAME_SUCCESS,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-game-complete', function () {
                if($.actualLevel === PlayerUtils.getMaxOpenLevel())
                    PlayerUtils.openNextLevel();
                
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
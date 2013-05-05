Crafty.scene (SCENE_GAME_SUCCESS,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-game-complete', function () {
                var maxMoney = MONEY_BY_LEVEL[$.actualLevel];
                var earnedMoney = maxMoney - (maxMoney * Math.round(($.livesLeft - $.livesTotal)/$.livesTotal));
                $("#recMoney").html(earnedMoney);
                PlayerUtils.addPlayerMoney(earnedMoney);
            });
        },
        function () {

            activateCanvas ();
        });
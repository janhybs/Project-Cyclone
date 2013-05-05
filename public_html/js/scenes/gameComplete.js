Crafty.scene (SCENE_GAME_SUCCESS,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-game-complete', function () {
                var maxMoney = MONEY_BY_LEVEL[$.actualLevel-1];
                var earnedMoney = maxMoney - (maxMoney * Math.round((($.livesTotal- $.livesLeft)/$.livesTotal)*100)/100);
                $("#recMoney").html(earnedMoney);
                PlayerUtils.addPlayerMoney(earnedMoney);
            });
        },
        function () {

            activateCanvas ();
        });
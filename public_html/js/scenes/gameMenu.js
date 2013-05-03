Crafty.scene (SCENE_GAME_MENU,
        function () {
            activateWebview();
            loadPage ('webview', 'scene-game-menu', function () {
                $('#moneyPoints').html(PlayerUtils.getPlayerMoney());
                //disable non-available levels
                var maxLev = PlayerUtils.getMaxOpenLevel();
                for(var i = maxLev+1; i <=5; i++) {
                    $('#level'+i).attr('disabled', 'disabled');
                }
                //add best score about
                for(var i = 1; i <=maxLev-1; i++) {
                    $('#levelscore'+i).html('Your best score: ' + PlayerUtils.getBestScoreByLevel(i) + 'lost');
                }
                //names of players
                $('#soldierName').html(PlayerUtils.getPlayerNameByType(PLAYER_SOLDIER));
                $('#laserName').html(PlayerUtils.getPlayerNameByType(PLAYER_LASER));
                //player levels info
                $('#soldierLevelInfo').html("Level: " + PlayerUtils.getActualLevelByPlayerType(GUN_PLAYER));
                $('#laserLevelInfo').html("Level: " + PlayerUtils.getActualLevelByPlayerType(LASER_PLAYER));
                //select actual player
                if(PlayerUtils.getActualPlayer() === GUN_PLAYER) {
                    $('#soldierPlayer').attr("checked", "checked");
                } else {
                    $('#laserPlayer').attr("checked", "checked");
                }
            });
        },
        function () {
            activateCanvas ();
        });
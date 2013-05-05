Crafty.scene (SCENE_GAME_MENU,
        function () {
            activateWebview();
            loadPage ('webview', 'scene-game-menu', function () {
                $('#moneyPoints').html(PlayerUtils.getPlayerMoney());
                //set transparency
                for(var i = 1; i <= 5; i++) {
                    $('#level'+i).animate({opacity: 0.3}, 500);
                }
                //disable non-available levels
                var maxLev = PlayerUtils.getMaxOpenLevel();
                for(var i = 1; i <= maxLev; i++) {
                    $('#level'+i).attr('onclick', '$.actualLevel = {0};Crafty.scene(SCENE_GAME);'.format(i));
                    $('#level'+i).mouseover(i, function(event) {$('#level'+event.data).animate({opacity: 1}, 1000);});
                    $('#level'+i).mouseout(i, function(event) {$('#level'+event.data).animate({opacity: 0.3}, 500);});
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
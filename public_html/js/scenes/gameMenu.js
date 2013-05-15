Crafty.scene (SCENE_GAME_MENU,
        function () {
            activateWebview();
            loadPage ('webview', 'scene-game-menu', function () {
                //set transparency
                for(var i = 1; i <= 5; i++) {
                    $('#level'+i).animate({opacity: 0.3}, 500);
                }
                //disable non-available levels
                var maxLev = PlayerUtils.getMaxOpenLevel();
                for(var i = 1; i <= maxLev && i <= 5; i++) {
                    $('#level'+i).attr('style', 'cursor:pointer');
                    $('#level'+i).attr('onclick', '$.actualLevel = {0};Crafty.scene(SCENE_GAME);'.format(i));
                    $('#level'+i).mouseover(i, function(event) {$('#level'+event.data).animate({opacity: 1}, 1000);});
                    $('#level'+i).mouseout(i, function(event) {$('#level'+event.data).animate({opacity: 0.3}, 500);});
                }
                //add best score about
                for(var i = 1; i <=maxLev-1  && i < 5; i++) {
                    $('#levelscore'+i).html('Your best score: ' + PlayerUtils.getBestScoreByLevel(i) + ' lost');
                }
                //names of players
                $('#soldierName').html(PlayerUtils.getPlayerNameByType(PLAYER_SOLDIER));
                $('#laserName').html(PlayerUtils.getPlayerNameByType(PLAYER_LASER));
                //player levels info
                $('#soldierLevelInfo').html("Level: " + PlayerUtils.getActualLevelByPlayerType(GUN_PLAYER));
                $('#laserLevelInfo').html("Level: " + PlayerUtils.getActualLevelByPlayerType(LASER_PLAYER));
                //select actual player
                if(PlayerUtils.getActualPlayer() === GUN_PLAYER) {
                    $('#laserPart').animate({opacity: 0.3}, 500);
                } else {
                    $('#soldierPart').animate({opacity: 0.3}, 500);
                }
                //player animate
                $('#soldierPart').mouseenter(function() {
                        $('#soldierPart').animate({opacity: 1}, 1000); 
                        $('#laserPart').animate({opacity: 0.3}, 200);});
                $('#soldierPart').mouseleave(function() {if(PlayerUtils.getActualPlayerType() !== PLAYER_SOLDIER) {
                        $('#soldierPart').animate({opacity: 0.3}, 200);
                        $('#laserPart').animate({opacity: 1}, 1000);
                    }});
                $('#laserPart').mouseenter(function() {
                        $('#laserPart').animate({opacity: 1}, 1000);
                        $('#soldierPart').animate({opacity: 0.3}, 200);});
                $('#laserPart').mouseleave(function() {if(PlayerUtils.getActualPlayerType() === PLAYER_SOLDIER) { 
                        $('#laserPart').animate({opacity: 0.3}, 200);
                        $('#soldierPart').animate({opacity: 1}, 1000);
                    }});
            });
        },
        function () {
            activateCanvas ();
        });
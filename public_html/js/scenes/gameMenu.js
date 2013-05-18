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
                    $('#level'+i).mouseover(i, function(event) {$('#level'+event.data).stop ().animate({opacity: 1}, 1000);});
                    $('#level'+i).mouseout(i, function(event) {$('#level'+event.data).stop ().animate({opacity: 0.3}, 500);});
                }
                //add best score about
                for(var i = 1; i <=maxLev-1  && i < 5; i++) {
                    var score = PlayerUtils.getBestScoreByLevel(i);
                    if (score !== null && typeof score === 'object')
                        $('#levelscore'+i).html('Total score: {0}<br /> {1} enemies slipped'
                                .format (score.points, score.slips));
                }
                //names of players
                $('#soldierName').html(PlayerUtils.getPlayerNameByType(PLAYER_SOLDIER));
                $('#laserName').html(PlayerUtils.getPlayerNameByType(PLAYER_LASER));
                //player levels info
                $('#soldierLevelInfo').html("Level: " + PlayerUtils.getActualLevelByPlayerType(GUN_PLAYER));
                $('#laserLevelInfo').html("Level: " + PlayerUtils.getActualLevelByPlayerType(LASER_PLAYER));
                //select actual player
                if(PlayerUtils.getActualPlayer() === GUN_PLAYER) {
                    $('#laserPart').stop ().animate({opacity: 0.3}, 500);
                } else {
                    $('#soldierPart').stop ().animate({opacity: 0.3}, 500);
                }
                //player animate
                $('#soldierPart').mouseenter(function() {
                        $('#soldierPart').stop ().animate({opacity: 1}, 1000); 
                        $('#laserPart').stop ().animate({opacity: 0.3}, 200);});
                $('#soldierPart').mouseleave(function() {if(PlayerUtils.getActualPlayerType() !== PLAYER_SOLDIER) {
                        $('#soldierPart').stop ().animate({opacity: 0.3}, 200);
                        $('#laserPart').stop ().animate({opacity: 1}, 1000);
                    }});
                $('#laserPart').mouseenter(function() {
                        $('#laserPart').stop ().animate({opacity: 1}, 1000);
                        $('#soldierPart').stop ().animate({opacity: 0.3}, 200);});
                $('#laserPart').mouseleave(function() {if(PlayerUtils.getActualPlayerType() === PLAYER_SOLDIER) { 
                        $('#laserPart').stop ().animate({opacity: 0.3}, 200);
                        $('#soldierPart').stop ().animate({opacity: 1}, 1000);
                    }});
            });
        },
        function () {
            activateCanvas ();
        });
Crafty.scene (SCENE_LEVEL_UP,
        function () {
            PlayerUtils.increaseLevel();
            activateWebview ();
            loadPage ('webview', 'scene-level-up', function () {
            $("#actPlayer").html("Your player {0} has".format(PlayerUtils.getActualName()));
            $("#actLevel").html("LEVEL {0}".format(PlayerUtils.getActualLevel()));
            $('#damage').html(PlayerUtils.getDamagePoints());
            $('#range').html(PlayerUtils.getRangePoints());
            
            //test max of range/damage
            var tmp = 0;
            if(PlayerUtils.getDamagePoints() === PLAYER_MAX_DAMAGE) {
                tmp++;
                $('#addDamage').attr('disabled', 'disabled');
                $('#addDamage').fadeOut(2000);
            }
            if(PlayerUtils.getRangePoints() === PLAYER_MAX_RANGE) {
                tmp++;
                $('#addRange').attr('disabled', 'disabled');
                $('#addRange').fadeOut(2000);
            }
            if(tmp === 2) {
                $('#scene-level-up-but').removeAttr('disabled');
            }
            });
        },
        function () {

            activateCanvas ();
        });
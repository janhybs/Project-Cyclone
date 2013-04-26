Crafty.scene (SCENE_LEVEL_UP,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-level-up', function () {
                $ ('#scene-new-game-next');
            $("#actPlayer").html("Your player {0} has".format(PlayerUtils.getActualName()));
            $("#actLevel").html("LEVEL {0}".format(PlayerUtils.getActualLevel()));
            $('#damage').html(PlayerUtils.getDamagePoints())
            $('#range').html(PlayerUtils.getRangePoints())
            });
        },
        function () {

            activateCanvas ();
        });
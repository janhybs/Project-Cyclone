Crafty.scene (SCENE_MENU,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-menu', function () {
                if (PlayerUtils.getActualPlayer () === null)
                    $ ('#scene-menu-to-game-menu').hide ();
            });
        },
        function () {

            activateCanvas ();
        });
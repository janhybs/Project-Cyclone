Crafty.scene (SCENE_MENU,
        function () {

            Crafty.audio.play ('music', -1, VOLUME);
                        
            activateWebview ();
            loadPage ('webview', 'scene-menu', function () {
                if (PlayerUtils.getActualPlayer () === null)
                    $ ('#scene-menu-to-game-menu').hide ();
            });
        },
        function () {

            activateCanvas ();
        });
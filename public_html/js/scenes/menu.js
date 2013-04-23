Crafty.scene (SCENE_MENU,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-menu', function () {
                $ ('#scene-menu-to-continue').attr ('disabled', 'disabled');
            });
        },
        function () {

            activateCanvas ();
        });
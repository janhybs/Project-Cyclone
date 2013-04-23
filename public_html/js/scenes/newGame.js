Crafty.scene (SCENE_NEW_GAME,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-new-game', function () {
                $ ('#scene-new-game-next').attr ('disabled', 'disabled');
            });
        },
        function () {

            activateCanvas ();
        });
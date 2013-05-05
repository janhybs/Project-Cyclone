Crafty.scene (SCENE_GAME_SUCCESS,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-new-game', function () {
            });
        },
        function () {

            activateCanvas ();
        });
Crafty.scene (SCENE_GAME_OVER,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-game-over', function () {
            });
        },
        function () {

            activateCanvas ();
        });
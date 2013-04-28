Crafty.scene (SCENE_GAME_MENU,
        function () {
            activateWebview();
            loadPage ('webview', 'scene-game-menu', function () {
            });
        },
        function () {
            activateCanvas ();
        });
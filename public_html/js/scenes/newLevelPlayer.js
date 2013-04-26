Crafty.scene (SCENE_LEVEL_UP,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-level-up', function () {
                $ ('#scene-new-game-next');
            });
        },
        function () {

            activateCanvas ();
        });
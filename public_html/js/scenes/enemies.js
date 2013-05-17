Crafty.scene (SCENE_ENEMIES,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-enemies', function () {
                
            });
        },
        function () {

            activateCanvas ();
        });
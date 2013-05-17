Crafty.scene (SCENE_TOWERS,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-towers', function () {
                
            });
        },
        function () {

            activateCanvas ();
        });
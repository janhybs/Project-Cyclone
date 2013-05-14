Crafty.scene (SCENE_STORY_MESSAGE,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-story', function () {
                
            });
        },
        function () {

            activateCanvas ();
        });
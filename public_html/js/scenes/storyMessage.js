Crafty.scene (SCENE_STORY_MESSAGE,
        function () {

            activateWebview ();
            loadPage ('webview', 'scene-story', function () {
                jQuery.get ('texts/story.txt'.format ($.actualLevel), function (data) {
                    $('#story').html(data);
                });
            });
        },
        function () {

            activateCanvas ();
        });
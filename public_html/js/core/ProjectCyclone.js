ProjectCyclone = {
    //start crafty :) 
    start: function () {
        Crafty.init (SCREEN_WIDTH, SCREEN_HEIGHT);
        Crafty.canvas.init ();
        Crafty.scene (SCENE_LOADING);

        $ ('#cr-stage').before ($ ('<div id="webview"></div>')[0]);
        $ ('#webview').load ('pages.html #scene-new-game');
        
        $ ('#cr-stage').hide ();
    }
};
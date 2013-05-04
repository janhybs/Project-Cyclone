ProjectCyclone = {
    //start crafty :) 
    start: function () {
        Crafty.init (SCREEN_WIDTH - PANEL_WIDTH, SCREEN_HEIGHT);
        Crafty.canvas.init ();
        Crafty.scene (SCENE_LOADING);

        $ ('#cr-stage').before ($ ('<div id="webview"></div>')[0]);
        $ ('#cr-stage').after ($ ('<div id="gamePanel">ahoj</div>')[0]);
        $ ('#webview').before ($ ('<div id="header"></div>')[0]);
        onResizeHandler (null);
        
        loadPage ('header', 'header-main', 'pages.html');
    }
};
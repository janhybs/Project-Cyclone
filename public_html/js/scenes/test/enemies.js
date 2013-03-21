Crafty.scene (SCENE_ENEMY_TEST, function () {

    Crafty.background ('#BBB');
    
    var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
    e.attr ({w: 33*(.7), h: 37*(.7)});
    e.start ();
    
    var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
    e.attr ({w: 33*(.7), h: 37*(.7)});
    e.setSpeed (3);
    e.start ();
    
    var e = Crafty.e ('2D, Canvas, Image, {0}, {1}, enemy'.format (ENEMY_ABS, ENEMY_SIMPLE));
    e.attr ({w: 33*(.7), h: 37*(.7)});
    e.setSpeed (10);
    e.start ();
    
    window.ee = e;
    console.log (e);

});
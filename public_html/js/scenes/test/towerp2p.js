Crafty.scene(SCENE_P2P_TOWER_TEST, function() {

    Crafty.background('#333');

    var p0 = {x: 2, y: 2};
    var p1 = {x: 5, y: 5};
    var p2 = {x: 15, y: 5};

    var t = tower.get(TOWER_MACHINEGUN);
    
    t.setStartPoint([p0.x * W, p0.y * H]);
    t.setEndPoint([p2.x * W, p2.y * H]);
    t.create();
    t.upgrade();
    setInterval(function() {
        t.fire();
    }, 100);

});
Crafty.scene(SCENE_P2P_TOWER_TEST, function() {

    Crafty.background('#333');

    var p0 = {x: 2, y: 2};
    var p1 = {x: 5, y: 5};
    var p2 = {x: 15, y: 5};

    var t = tower.get(TOWER_P2P);
    t.setStartPoint([p1.x * W, p1.y * H]);

    var t2 = tower.get(TOWER_P2P);
    t2.setStartPoint([p2.x * W, p2.y * H]);
   
    setInterval(function() {
        var a = Math.floor(Math.random() * (SCREEN_WIDTH / W) + 1);
        var b = Math.floor(Math.random() * (SCREEN_HEIGHT / H) + 1);
        t.setEndPoint([a * W, b * H]);
        t.shoot();
    }, 100);

    setInterval(function() {
        var a = Math.floor(Math.random() * (SCREEN_WIDTH / W) + 1);
        var b = Math.floor(Math.random() * (SCREEN_HEIGHT / H) + 1);
        t2.setEndPoint([a * W, b * H]);
        t2.shoot();
    }, 15);
});
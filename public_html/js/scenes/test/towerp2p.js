Crafty.scene(SCENE_P2P_TOWER_TEST, function() {

    Crafty.background('#333');

    var p0 = {x: 2, y: 2};
    var p1 = {x: 20, y: 15};
    var p2 = {x: 10, y: 10};
    var p3 = {x: 20, y: 2};

    var t = tower.get(TOWER_MACHINEGUN);
    t.setStartPoint([p0.x * W, p0.y * H]);
    t.create();
    t.upgrade();
    setInterval(function() {
        t.setEndPoint([Crafty.math.randomInt(0, SCREEN_WIDTH / W) * W, Crafty.math.randomInt(0, SCREEN_HEIGHT / H) * H]);
        t.fire();
    }, 100);

    var t2 = tower.get(TOWER_CHAIN_LASER);
    t2.setStartPoint([p3.x * W, p3.y * H]);
    t2.setEndPoint([Crafty.math.randomInt(0, SCREEN_WIDTH / W) * W, Crafty.math.randomInt(0, SCREEN_HEIGHT / H) * H]);
    t2.create([p0.x * W, p0.y * H]);
    t2.fire();
    
    var t3 = tower.get(TOWER_HOMING_MISSILE);
    t3.setStartPoint([p1.x * W, p1.y * H]);
    t3.create();
    t3.upgrade();
    setInterval(function() {
        t3.setEndPoint([Crafty.math.randomInt(0, SCREEN_WIDTH / W) * W, Crafty.math.randomInt(0, SCREEN_HEIGHT / H) * H]);
        t3.fire();
    }, 100);

    var t4 = tower.get(TOWER_ELECTRIC_AURA);
    t4.setStartPoint([p1.x * W, p1.y * H]);
    t4.create();
    setInterval(function() {
        t4.setStartPoint([Crafty.math.randomInt(0, SCREEN_WIDTH / W) * W, Crafty.math.randomInt(0, SCREEN_HEIGHT / H) * H]);
        t4.fire();
    }, 100);

    
});
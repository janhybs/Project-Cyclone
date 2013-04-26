Crafty.scene (SCENE_ENEMY_TEST, function () {

    activateCanvas ();
    loadPage ('gamePanel', 'panel-main');
    Crafty.background ('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    //mouse click activating for this scene
    activeSceneMouseClick();
    //mouse stop fire activating for this scene
    activeSceneMouseStopFire();

    var path1 = enlargePath (expandPath (splitPath ('0,0 1,0 1,8 8,8 12,8 12,14 15,14 15,0 19,0 19,6')));
    var path2 = enlargePath (expandPath (splitPath ('25,18 1,18')));
    var path3 = enlargePath (splitPath ('25,0 20,15'));
    
    var p0 = {x: 4, y: 2};
    var p1 = {x: 4, y: 10};
    var p2 = {x: 5, y: 6};

    var timer = Crafty.e ('Framer');
    var enemies = ['alien', 'bat', 'casper', 'devil', 'dracula', 'freddie',
        'ghost', 'gomez', 'chucky', 'jack', 'jason', 'kokey', 'mike', 'mummy',
        'pumpkin', 'scream', 'skull', 'slimer', 'squash'];
    var size = '_64';


    var shotDamage = [].concat (
            [0, 10, 0, 0, 0],
            [0, 0, 0],
            [1, 1, -1]);

    timer.repeat (function () {
        var e = enemy.create ({
            path: path1,
            shield: ENEMY_SHIELD.boss,
            size: ENEMY_SIZE.small,
            speed: ENEMY_SPEED.slow,
            health: ENEMY_HEALTH.normal,
            resistance: arrayMerge (arrayMult (ENEMY_TYPE.normal, 0.8), arrayMult (ENEMY_TYPE.fire, 0.2)),
            image: enemies[Math.floor (Math.random () * enemies.length)] + size
        });
        e.start ();
        e.requires ('HealthBar');
    }, FRAME_RATE * 2);

    var t = tower.get(TOWER_BEAM_LASER);
    t.setStartPoint([p0.x * W, p0.y * H]);
    t.create();
    t.upgrade();
    timer.repeat(function() {
        t.start();
    }, FRAME_RATE / 5);

    var t2 = tower.get(TOWER_CANNON);
    t2.setStartPoint([p1.x * W, p1.y * H]);
    t2.create();
    timer.repeat(function() {
        t2.start();
    }, FRAME_RATE / 1);
    
    var t3 = tower.get(TOWER_HOMING_MISSILE);
    t3.setStartPoint([p2.x * W, p2.y * H]);
    t3.create();
    timer.repeat(function() {
        t3.start();
    }, FRAME_RATE / 2);



//    var s = shot.get (SHOT_HOMING);
//    s.setStartPoint ([14 * W + W / 2, 9 * H + H / 2]);
//    s.setEndPoint (mousePos);
//    s.setDamage (shotDamage);
//    s.create (10, 10);
////    s.create ("images/laser-01.png");
//    s.start ();
    //test player
    var pl = player.create(PLAYER_SOLDIER);
});

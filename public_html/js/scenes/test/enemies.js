Crafty.scene (SCENE_ENEMY_TEST, function () {

    Crafty.background ('#333');
    Crafty.e ("2D, Canvas, Image").attr ({w: SCREEN_WIDTH, h: SCREEN_HEIGHT, alpha: 0.25}).image ("images/sq.jpg", "repeat");

    var path1 = enlargePath (expandPath (splitPath ('0,0 1,0 1,8 8,8 12,8 12,14 15,14 15,0 19,0 19,6')));
    var path2 = enlargePath (expandPath (splitPath ('25,18 1,18')));
    var path3 = enlargePath (splitPath ('25,0 20,15'));

    var timer = Crafty.e ('Framer');
    var enemies = ['alien', 'bat', 'casper', 'devil', 'dracula', 'freddie',
        'ghost', 'gomez', 'chucky', 'jack', 'jason', 'kokey', 'mike', 'mummy',
        'pumpkin', 'scream', 'skull', 'slimer', 'squash'];
    var size = '_64';


    var shotDamage = [].concat (
            [0, 10, 0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]);

    timer.repeat (function () {
        var e = enemy.create ({
            path: path1,
            shield: ENEMY_SHIELD.no,
            size: ENEMY_SIZE.small,
            speed: ENEMY_SPEED.slow,
            resistance: arrayMerge (arrayMult (ENEMY_TYPE.normal, 0.8), arrayMult (ENEMY_TYPE.fire, 0.2)),
            image: enemies[Math.floor (Math.random () * enemies.length)] + size
        });
        e.start ();
        e.requires ('HealthBar');
    }, FRAME_RATE * 2);

    var s = shot.get (SHOT_LASER);
    s.setStartPoint ([14 * W + W / 2, 9 * H + H / 2]);
    s.setEndPoint (mousePos);
    s.create ("images/laser-01.png");
    s.setDamage (shotDamage);
    s.start ();

});

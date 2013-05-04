Crafty.scene (SCENE_LOADING, function () {

    Crafty.e ("2D, DOM, Text").attr ({w: Crafty.viewport.width, h: 20, x: 0, y: 120})
            .text ('Loading')
            .css ({'text-align': 'center'});

    //image files
    var images = [
        'images/bg.jpg',
        'images/dungeon.png',
        'images/characters.png',
        'images/cat.gif',
        'images/shot.png',
        'images/laser-cat.png',
        'images/grass.jpg',
        //# explosion packed
        'images/exp-simple.png',
        'images/exp-complex.png',
        'images/exp-simple-32(16).png',
        'images/exp-complex-32(16).png',
        'images/exp-complex-64(25).png',
        //# enemies packed
        'images/enemies.png',
        //# towers packed
        'images/towers.png',
        //# shield
        'images/shield.png',
        //# shots packed
        'images/shots.png',
        'images/laser-thin-red.png',
        'images/laser-thick-yellow.png',
        'images/laser-thick-purple.png',
        'images/laser-thick-blue.png',
        //
        'images/enemy.png',
        'images/debug.png',
        'images/rocket.png',
        'images/laser_hero.png',
        'images/soldier_hero.png',
        'images/left_arrow.png',
        'images/right_arrow.png',
        'images/left_arrow_active.png',
        'images/right_arrow_active.png',
        'images/crosshair.png'];

    //sound files
    var sounds = [
        'sounds/player/step.wav',
        'sounds/cannon.ogg',
        'sounds/death-end.ogg',
        'sounds/death-01.ogg',
        'sounds/death-02.ogg',
        'sounds/death-03.ogg',
        'sounds/death-04.ogg',
        'sounds/death-05.ogg',
        'sounds/eletric.ogg',
        'sounds/laser.ogg',
        'sounds/shot-01.ogg',
        'sounds/shot-02.ogg',
        'sounds/spray.ogg'
    ];

    Crafty.load ([].concat (images, sounds), function () {
        Crafty.scene (SCENE_MENU);
    });

});

/***********
 * SPRITES *
 ***********
 */


Crafty.sprite (32, 'images/dungeon.png', {
    path: [0, 1],
    wall: [17, 0],
});

Crafty.sprite (32, 'images/characters.png', {
    portal: [3, 0]
});

Crafty.sprite (32, 'images/cat.gif', {
    gate: [0, 0],
});

Crafty.sprite (64, 'images/debug.png', {
    player: [0, 0],
});

Crafty.sprite (32, 'images/shot.png', {
    shot: [0, 0],
});

Crafty.sprite (16, 'images/laser-cat.png', {
    laser: [0, 0],
});

Crafty.sprite (48, 'images/shield.png', {
    shield: [0, 0],
});

Crafty.sprite (32, 'images/exp-complex-32(16).png', {
    exp_complex_32_16: [0, 0],
});

Crafty.sprite (32, 'images/exp-complex-64(25).png', {
    exp_complex_64_25: [0, 0],
});

Crafty.sprite (32, 'images/exp-simple-32(16).png', {
    exp_simple_32_16: [0, 0],
});

Crafty.sprite (32, 'images/exp-simple.png', {
    exp_simple: [0, 0],
});

Crafty.sprite (32, 'images/exp-complex.png', {
    exp_complex: [0, 0],
});


Crafty.sprite ('images/rocket.png', {
    rocket: [0, 0, 40, 25],
});




/************
 *  SOUNDS  *
 ************
 */

Crafty.audio.add ({
    step: ["sounds/player/step.wav"],
    cannon: ['sounds/cannon.ogg'],
    death_end: ['sounds/death-end.ogg'],
    death_01: ['sounds/death-01.ogg'],
    death_02: ['sounds/death-02.ogg'],
    death_03: ['sounds/death-03.ogg'],
    death_04: ['sounds/death-04.ogg'],
    death_05: ['sounds/death-05.ogg'],
    electric: ['sounds/eletric.ogg'],
    laser: ['sounds/laser.ogg'],
    shot_01: ['sounds/shot-01.ogg'],
    shot_02: ['sounds/shot-02.ogg'],
    spray: ['sounds/spray.ogg']
});



/*************
 *  ENEMIES  *
 *************
 */

Crafty.sprite ('images/enemy.png', {
    enemy: [0, 0, 33, 37],
});

Crafty.sprite ('images/enemies.png', {
    enemy_blue_128: [0, 0, 128, 128],
    enemy_brown_128: [128, 0, 128, 128],
    enemy_green_128: [0, 128, 128, 128],
    enemy_purple_128: [128, 128, 128, 128],
    enemy_red_128: [256, 0, 128, 128],
    enemy_yellow_128: [256, 128, 128, 128],
    enemy_blue_24: [160, 352, 24, 24],
    enemy_brown_24: [272, 256, 24, 24],
    enemy_green_24: [208, 320, 24, 24],
    enemy_purple_24: [240, 288, 24, 24],
    enemy_red_24: [184, 352, 24, 24],
    enemy_yellow_24: [240, 312, 24, 24],
    enemy_blue_32: [64, 352, 32, 32],
    enemy_brown_32: [96, 352, 32, 32],
    enemy_green_32: [208, 256, 32, 32],
    enemy_purple_32: [128, 352, 32, 32],
    enemy_red_32: [208, 288, 32, 32],
    enemy_yellow_32: [240, 256, 32, 32],
    enemy_blue_48: [64, 256, 48, 48],
    enemy_brown_48: [64, 304, 48, 48],
    enemy_green_48: [112, 256, 48, 48],
    enemy_purple_48: [160, 256, 48, 48],
    enemy_red_48: [112, 304, 48, 48],
    enemy_yellow_48: [160, 304, 48, 48],
    enemy_blue_64: [384, 0, 64, 64],
    enemy_brown_64: [384, 64, 64, 64],
    enemy_green_64: [384, 128, 64, 64],
    enemy_purple_64: [384, 192, 64, 64],
    enemy_red_64: [0, 256, 64, 64],
    enemy_yellow_64: [0, 320, 64, 64]
});

Crafty.sprite ('images/shots.png', {
    aura_blue: [0, 0, 128, 128],
    aura_red: [128, 0, 128, 128],
    laser_thick_blue: [40, 128, 32, 32],
    laser_thick_blue_end: [0, 178, 32, 32],
    laser_thick_purple: [40, 160, 32, 32],
    laser_thick_purple_end: [72, 128, 32, 32],
    laser_thick_yellow: [0, 210, 32, 32],
    laser_thick_yellow_end: [72, 160, 32, 32],
    laser_thin_red: [104, 128, 32, 32],
    laser_thin_red_end: [32, 192, 32, 32],
    rocket_blue: [0, 128, 40, 25],
    rocket_blue_small: [32, 224, 30, 19],
    rocket_red: [0, 153, 40, 25],
    rocket_red_small: [64, 192, 30, 19],
    shot_cannon: [32, 178, 7, 7],
    shot_green: [104, 160, 16, 16],
    shot_ice: [0, 247, 9, 5],
    shot_normal: [0, 242, 11, 5]
});

Crafty.sprite ('images/towers.png', {
    body_01: [0, 0, 48, 48],
    body_02: [48, 0, 48, 48],
    body_03: [0, 48, 48, 48],
    body_04: [48, 48, 48, 48],
    body_05: [96, 0, 48, 48],
    body_06: [96, 48, 48, 48],
    body_07: [144, 0, 48, 48],
    body_08: [144, 48, 48, 48],
    body_09: [0, 96, 48, 48],
    head_01: [0, 144, 48, 48],
    head_02: [48, 96, 48, 48],
    head_03: [96, 96, 48, 48],
    head_04: [48, 144, 48, 48],
    head_05: [96, 144, 48, 48],
    head_07: [144, 96, 48, 48],
    head_08: [144, 144, 48, 48]
});

Crafty.scene (SCENE_LOADING, function () {

    Crafty.e ("2D, DOM, Text").attr ({w: Crafty.viewport.width, h: 20, x: 0, y: 120})
            .text ('Loading')
            .css ({'text-align': 'center'});

    //image files
    var images = [
        'images/cat.gif',
        //# explosion packed
        'images/exp-simple.png',
        'images/exp-complex.png',
        //# enemies packed
        'images/enemies.png',
        //# towers packed
        'images/towers/towers.png',
        //# shield
        'images/shield.png',
        //# shots packed
        'images/shots.png',
        //
        'images/enemy.png',
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
        'sounds/flame.ogg',
        'sounds/homing.ogg',
        'sounds/chain.ogg',
        'sounds/ice-dart.ogg',
        'sounds/laser.ogg',
        'sounds/machine-gun.ogg',
        'sounds/slow.ogg'
    ];

    Crafty.load ([].concat (images, sounds), function () {
        Crafty.scene (SCENE_MENU);
    });

});

/***********
 * SPRITES *
 ***********
*/

Crafty.sprite (48, 'images/shield.png', {
    shield: [0, 0]
});

Crafty.sprite (32, 'images/exp-simple.png', {
    exp_simple: [0, 0]
});

Crafty.sprite (32, 'images/exp-complex.png', {
    exp_complex: [0, 0]
});


/************
 *  SOUNDS  *
 ************
 */

Crafty.audio.add ({
    step: ["sounds/player/step.wav"],
    cannon: ['sounds/cannon.ogg'],
    electric: ['sounds/eletric.ogg'],
    flame: ['sounds/flame.ogg'],
    homing: ['sounds/homing.ogg'],
    chain: ['sounds/chain.ogg'],
    iceDart: ['sounds/ice-dart.ogg'],
    laser: ['sounds/laser.ogg'],
    machineGun: ['sounds/machine-gun.ogg'],
    slow: ['sounds/slow.ogg'],
    death_end: ['sounds/death-end.ogg'],
    death_01: ['sounds/death-01.ogg'],
    death_02: ['sounds/death-02.ogg'],
    death_03: ['sounds/death-03.ogg'],
    death_04: ['sounds/death-04.ogg'],
    death_05: ['sounds/death-05.ogg']
});



/*************
 *  ENEMIES  *
 *************
 */

Crafty.sprite ('images/enemy.png', {
    enemy: [0, 0, 33, 37]
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
    cannon: [64, 160, 16, 16],
    electric: [0, 0, 128, 128],
    flame: [32, 192, 16, 16],
    homing: [96, 128, 20, 13],
    chain: [0, 128, 32, 32],
    chain_end: [0, 160, 32, 32],
    ice_dart: [0, 224, 16, 16],
    laser: [32, 128, 32, 32],
    laser_end: [0, 192, 32, 32],
    machine_gun: [96, 141, 9, 9],
    player_laser: [64, 128, 32, 32],
    player_laser_end: [32, 160, 32, 32],
    player_soldier: [32, 208, 9, 9],
    slow: [128, 0, 128, 128]
});

Crafty.sprite ('images/towers/towers.png', {
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

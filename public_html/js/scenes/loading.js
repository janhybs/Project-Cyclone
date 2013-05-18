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
        'images/multi-freeze.png',
        'images/levels/target.png',
        'images/enemy.png',
        'images/crosshair.png',
        'images/radius.png'];

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
        'sounds/slow.ogg',
        'sounds/player_laser.ogg'
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

Crafty.sprite (256, 'images/radius.png', {
    radius: [0, 0]
});

Crafty.sprite (32, 'images/exp-simple.png', {
    exp_simple: [0, 0]
});

Crafty.sprite (32, 'images/exp-complex.png', {
    exp_complex: [0, 0]
});

Crafty.sprite (56, 'images/levels/target.png', {
    gate: [0, 0]
});
Crafty.sprite (52, 'images/multi-freeze.png', {
    multi_freeze: [0, 0]
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
    death_05: ['sounds/death-05.ogg'],
    playerLaserSound: ['sounds/player_laser.ogg']
});



/*************
 *  ENEMIES  *
 *************
 */

Crafty.sprite ('images/enemy.png', {
    enemy: [0, 0, 33, 37]
});

Crafty.sprite ('images/enemies.png', {
    enemy_blue_24: [232, 0, 24, 24],
    enemy_brown_24: [232, 24, 24, 24],
    enemy_green_24: [232, 48, 24, 24],
    enemy_purple_24: [136, 228, 24, 24],
    enemy_red_24: [228, 144, 24, 24],
    enemy_yellow_24: [192, 180, 24, 24],
    enemy_blue_28: [228, 88, 28, 28],
    enemy_brown_28: [120, 200, 28, 28],
    enemy_green_28: [228, 116, 28, 28],
    enemy_purple_28: [108, 228, 28, 28],
    enemy_red_28: [148, 200, 28, 28],
    enemy_yellow_28: [196, 152, 28, 28],
    enemy_blue_32: [0, 224, 32, 32],
    enemy_brown_32: [196, 88, 32, 32],
    enemy_green_32: [76, 216, 32, 32],
    enemy_purple_32: [124, 168, 32, 32],
    enemy_red_32: [196, 120, 32, 32],
    enemy_yellow_32: [160, 160, 32, 32],
    enemy_blue_36: [124, 96, 36, 36],
    enemy_brown_36: [124, 132, 36, 36],
    enemy_green_36: [160, 88, 36, 36],
    enemy_purple_36: [40, 216, 36, 36],
    enemy_red_36: [84, 176, 36, 36],
    enemy_yellow_36: [160, 124, 36, 36],
    enemy_blue_40: [44, 96, 40, 40],
    enemy_brown_40: [44, 136, 40, 40],
    enemy_green_40: [84, 96, 40, 40],
    enemy_purple_40: [0, 184, 40, 40],
    enemy_red_40: [84, 136, 40, 40],
    enemy_yellow_40: [44, 176, 40, 40],
    enemy_blue_44: [144, 0, 44, 44],
    enemy_brown_44: [144, 44, 44, 44],
    enemy_green_44: [188, 0, 44, 44],
    enemy_purple_44: [188, 44, 44, 44],
    enemy_red_44: [0, 96, 44, 44],
    enemy_yellow_44: [0, 140, 44, 44],
    enemy_blue_48: [0, 0, 48, 48],
    enemy_brown_48: [48, 0, 48, 48],
    enemy_green_48: [0, 48, 48, 48],
    enemy_purple_48: [48, 48, 48, 48],
    enemy_red_48: [96, 0, 48, 48],
    enemy_yellow_48: [96, 48, 48, 48]
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

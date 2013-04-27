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
        'images/exp-simple-32(16).png',
        'images/exp-complex-32(16).png',
        'images/exp-complex-64(25).png',
        //# enemies packed
        'images/enemies-24.png',
        'images/enemies-32.png',
        'images/enemies-64.png',
        'images/enemies-128.png',
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
        'images/range_circle.png',
        'images/crosshair.png'];

    //sound files
    var sounds = [
        'sounds/player/step.wav',
    ];

    Crafty.load ([].concat (images, sounds), function () {
        Crafty.scene (SCENE_MENU);
    });

});

/***********
 * SPRITES *
 ***********
 */

Crafty.sprite (310, 'images/range_circle.png', {
    playerRange: [0, 0]
});

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

Crafty.sprite (32, 'images/exp-complex-32(16).png', {
    exp_complex_32_16: [0, 0],
});

Crafty.sprite (32, 'images/exp-complex-64(25).png', {
    exp_complex_64_25: [0, 0],
});

Crafty.sprite (32, 'images/exp-simple-32(16).png', {
    exp_simple_32_16: [0, 0],
});


Crafty.sprite ('images/rocket.png', {
    rocket: [0, 0, 40, 25],
});




/************
 *  SOUNDS  *
 ************
 */

Crafty.audio.add ({
    step: ["sounds/player/step.wav"]
});


/*************
 *  ENEMIES  *
 *************
 */

Crafty.sprite ('images/enemy.png', {
    enemy: [0, 0, 33, 37],
});

Crafty.sprite ('images/enemies-24.png', {
    alien_24: [0, 0, 24, 24],
    bat_24: [24, 0, 24, 24],
    casper_24: [0, 24, 24, 24],
    devil_24: [24, 24, 24, 24],
    dracula_24: [48, 0, 24, 24],
    freddie_24: [48, 24, 24, 24],
    ghost_24: [72, 0, 24, 24],
    gomez_24: [96, 0, 24, 24],
    chucky_24: [72, 24, 24, 24],
    jack_24: [96, 24, 24, 24],
    jason_24: [0, 48, 24, 24],
    kokey_24: [24, 48, 24, 24],
    mike_24: [0, 72, 24, 24],
    mummy_24: [48, 48, 24, 24],
    pumpkin_24: [24, 72, 24, 24],
    scream_24: [0, 96, 24, 24],
    skull_24: [24, 96, 24, 24],
    slimer_24: [72, 48, 24, 24],
    squash_24: [48, 72, 24, 24]
});

Crafty.sprite ('images/enemies-32.png', {
    alien_32: [0, 0, 32, 32],
    bat_32: [32, 0, 32, 32],
    casper_32: [0, 32, 32, 32],
    devil_32: [32, 32, 32, 32],
    dracula_32: [64, 0, 32, 32],
    freddie_32: [64, 32, 32, 32],
    ghost_32: [96, 0, 32, 32],
    gomez_32: [96, 32, 32, 32],
    chucky_32: [0, 64, 32, 32],
    jack_32: [0, 96, 32, 32],
    jason_32: [32, 64, 32, 32],
    kokey_32: [64, 64, 32, 32],
    mike_32: [32, 96, 32, 32],
    mummy_32: [64, 96, 32, 32],
    pumpkin_32: [96, 64, 32, 32],
    scream_32: [96, 96, 32, 32],
    skull_32: [128, 0, 32, 32],
    slimer_32: [160, 0, 32, 32],
    squash_32: [128, 32, 32, 32]
});

Crafty.sprite ('images/enemies-64.png', {
    alien_64: [0, 0, 64, 64],
    bat_64: [64, 0, 64, 64],
    casper_64: [0, 64, 64, 64],
    devil_64: [64, 64, 64, 64],
    dracula_64: [128, 0, 64, 64],
    freddie_64: [128, 64, 64, 64],
    ghost_64: [192, 0, 64, 64],
    gomez_64: [192, 64, 64, 64],
    chucky_64: [0, 128, 64, 64],
    jack_64: [0, 192, 64, 64],
    jason_64: [64, 128, 64, 64],
    kokey_64: [128, 128, 64, 64],
    mike_64: [64, 192, 64, 64],
    mummy_64: [128, 192, 64, 64],
    pumpkin_64: [192, 128, 64, 64],
    scream_64: [192, 192, 64, 64],
    skull_64: [256, 0, 64, 64],
    slimer_64: [320, 0, 64, 64],
    squash_64: [256, 64, 64, 64]
});

Crafty.sprite ('images/enemies-128.png', {
    alien_128: [0, 0, 128, 128],
    bat_128: [128, 0, 128, 128],
    casper_128: [0, 128, 128, 128],
    devil_128: [128, 128, 128, 128],
    dracula_128: [256, 0, 128, 128],
    freddie_128: [256, 128, 128, 128],
    ghost_128: [384, 0, 128, 128],
    gomez_128: [384, 128, 128, 128],
    chucky_128: [0, 256, 128, 128],
    jack_128: [0, 384, 128, 128],
    jason_128: [128, 256, 128, 128],
    kokey_128: [256, 256, 128, 128],
    mike_128: [128, 384, 128, 128],
    mummy_128: [256, 384, 128, 128],
    pumpkin_128: [384, 256, 128, 128],
    scream_128: [384, 384, 128, 128],
    skull_128: [512, 0, 128, 128],
    slimer_128: [640, 0, 128, 128],
    squash_128: [512, 128, 128, 128]
});

Crafty.sprite ('images/shots.png', {
    aura_blue: [0, 0, 128, 128],
    aura_red: [128, 0, 128, 128],
    laser_thick_blue: [40, 128, 32, 32],
    laser_thick_purple: [0, 178, 32, 32],
    laser_thick_yellow: [40, 160, 32, 32],
    laser_thin_red: [72, 128, 32, 32],
    rocket_blue: [0, 128, 40, 25],
    rocket_blue_small: [0, 210, 30, 19],
    rocket_red: [0, 153, 40, 25],
    rocket_red_small: [0, 229, 30, 19],
    shot_cannon: [32, 178, 7, 7],
    shot_green: [72, 160, 16, 16],
    shot_ice: [32, 192, 9, 5],
    shot_normal: [104, 128, 11, 5]
});

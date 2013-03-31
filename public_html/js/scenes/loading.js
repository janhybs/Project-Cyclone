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
    
    Crafty.load ([].concat(images, sounds), function () {
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

Crafty.audio.add({
    step: ["sounds/player/step.wav"]
});


/*************
 *  ENEMIES  *
 *************
 */

Crafty.sprite ('images/enemy.png', {
    enemy: [0, 0, 33, 37],
});
Crafty.scene (SCENE_LOADING, function () {

    Crafty.e ("2D, DOM, Text").attr ({w: Crafty.viewport.width, h: 20, x: 0, y: 120})
            .text ('Loading')
            .css ({'text-align': 'center'});

    var images = [
        'images/bg.jpg',
        'images/dungeon.png',
        'images/characters.png',
        'images/cat.gif',
        'images/shot.png',
		'images/laser-cat.png',
        'images/debug.png'];

    Crafty.load (images, function () {
        Crafty.scene (SCENE_MENU);
    });

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
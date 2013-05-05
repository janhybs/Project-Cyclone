window.effects = {};
effects.create = function (pos, type, size) {
    pos = toPoint (pos || [0, 0]);
    type = type || 'exp_simple';
    size = size || 32;

    var e = Crafty.e ('2D, Canvas, SpriteAnimation, {0}'.format (type));
    e.animate ('explosion', 0, 0, 19);
    e.animate ('explosion', 20, 0);
    e.attr ({x: pos.x - size / 2, y: pos.y - size / 2, h: size, w: size, z: Z_EFFECTS});
    e.bind ('EnterFrame', function () {
        if (!e.isPlaying ())
            e.destroy ();
    });
    return e;
};
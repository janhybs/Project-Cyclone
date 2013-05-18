window.board = {
    showBoard: function (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            for (var j = 0, ls = data[i].length; j < ls; j++) {
                switch (data[i].charAt (j)) {
                    case '0':
                        Crafty.e ("2D, Canvas, Rectangle, path").attr ({x: j * W, y: i * H, w: W, h: H});
                        break;
                    case '1':
                        break;
                }
            }
        }
    },
    showPortals: function (data) {
        var p, points = {};

        for (var i = 0, l = data.length; i < l; i++) {

            p = data[i][0];

            if (!points.hasOwnProperty (p.x + '-' + p.y)) {
                this.createPortal (p);
                points[p.x + '-' + p.y] = true;
            }
        }
    },
    showGates: function (data) {
        var p, points = {};
        var r = [];

        for (var i = 0, l = data.length; i < l; i++) {

            p = data[i][data[i].length - 1];

            if (!points.hasOwnProperty (p.x + '-' + p.y)) {
                r.push(this.createGate (p));
                points[p.x + '-' + p.y] = true;
            }
        }
        return r;
    },
    createPortal: function (point) {
        var p = toPoint (point);
        return Crafty.e ("2D, Canvas, portal").attr ({x: p.x * W, y: p.y * H});
    },
    createGate: function (point) {
        var p = toPoint (point);
        var e = Crafty.e ("2D, Canvas, Mouse, gate").attr ({x: p.x * W, y: p.y * H, z: Z_ENEMY_TARGET});
        e.bind('EnterFrame', function () {
           this.rotation++;
        });
        e.origin ('center');
        e.attr ({x: e.x - e.w / 2 + W / 2, y: e.y - e.h / 2 + H / 2});
        e.requires ('WavePreview');
        return e;
    }
};



window.board = {
    showBoard: function (data) {
        for (var i = 0, l = data.length; i < l; i++) {
            for (var j = 0, ls = data[i].length; j < ls; j++) {
                switch (data[i].charAt (j)) {
                    case '0':
                        Crafty.e ("2D, Canvas, path").attr ({x: j * W, y: i * H});
                        break;
                    case '1':
                        Crafty.e ("2D, Canvas, Image").attr ({x: j * W, y: i * H}).image('images/grass.jpg', 'no-repeat');
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

        for (var i = 0, l = data.length; i < l; i++) {

            p = data[i][data[i].length - 1];

            if (!points.hasOwnProperty (p.x + '-' + p.y)) {
                 this.createGate (p);
                points[p.x + '-' + p.y] = true;
            }
        }
    },
    createPortal: function (point) {
        var p = toPoint (point);
        return Crafty.e ("2D, Canvas, portal").attr ({x: p.x * W, y: p.y * H});
    },
    createGate: function (point) {
        var p = toPoint (point);
        return Crafty.e ("2D, Canvas, gate").attr ({x: p.x * W, y: p.y * H});
    }
};



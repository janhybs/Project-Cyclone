window.parseBoard = function (data) {
    return data.toString ().split (/\s+/);
};

window.splitPath = function (data) {
    var ps = data.toString ().split (/\s+/);
    var result = [];
    for (var i = 0, l = ps.length; i < l; i++) {
        var p = ps[i].toString ().split (/,/);
        result.push ({x: Number (p[0]), y: Number (p[1])});
    }
    return result;
};

window.expandPath = function (data) {
    var result = [];

    var curr, prev = data[0];
    for (var i = 0, l = data.length; i < l; i++) {
        curr = data[i];

        if (prev.x > curr.x) {
            for (var j = prev.x; j > curr.x; j--)
                result.push ({x: j, y: curr.y});
        } else if (prev.x < curr.x) {
            for (var j = prev.x; j < curr.x; j++)
                result.push ({x: j, y: curr.y});
        } else

        if (prev.y > curr.y) {
            for (var j = prev.y; j > curr.y; j--)
                result.push ({y: j, x: curr.x});
        } else if (prev.y < curr.y) {
            for (var j = prev.y; j < curr.y; j++)
                result.push ({y: j, x: curr.x});
        }

        prev = curr;
    }

    result.push ({x: curr.x, y: curr.y});

    return result;
};

window.parsePaths = function (data) {
    var result = [];

    for (var i = 0, l = data.path.length; i < l; i++) {
        result.push (expandPath (splitPath (data.path[i])));
    }

    return result;
};

window.mousePos = {x: 0, y: 0};
window.addEventListener ('mousemove', function (e) {
    mousePos.x = e.x;
    mousePos.y = e.y;
});

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace (/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

window.toPoint = function (o) {
    if (o.hasOwnProperty ('x') && o.hasOwnProperty ('y'))
        return o;
    return {x: o[0], y: o[1]};
};

window.toDamage = function (o) {
    if (typeof o !== 'object')
        return toDamage ([o]);
    var props = ['basic', 'fire', 'watter', 'poison'];

    //# array (probably)
    if (o.length) {
        var r = {};
        for (var i = 0, l = props.length; i < l; i++)
            r[props[i]] = o[i] || 0;
        return r;
        //# object (keep reference)
    } else {
        for (var i = 0, l = props.length; i < l; i++)
            o[props[i]] = o[props[i]] || 0;
        return o;
    }
};

window.radDist = function (a, b, f) {
    dif = b - a;
    dif = dif % RAD;
    if (dif !== dif % (RAD / 2)) {
        dif = (dif < 0) ? dif + RAD : dif - RAD;
    }
    return a + dif / f;
};

//method for activating mouse click over whole scene
//you can catch SCENE_MOUSE_CLICK_EVENT (for queries - Pavel)
window.activeSceneMouseClick = function() {
    Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
        Crafty.trigger(SCENE_MOUSE_CLICK_EVENT);
    });
};
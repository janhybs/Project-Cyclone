/**
 * Method parses board data in the following format
 * yyyyy
 * yyyyy
 * yyyyy
 * where 'y' is one char representing board tile. Split is being done 
 * by white char. 
 * @param {String} data arra
 * @returns Array of rows
 */
window.parseBoard = function (data) {
    return data.toString ().split (/\s+/);
};

/**
 * Method multiples each point in array by W and H value
 * @param {Array} a
 * @returns {Array}
 */
window.enlargePath = function (a) {
    for (var i = 0, l = a.length; i < l; i++) {
        a[i].x = a[i].x * W;
        a[i].y = a[i].y * H;
    }
    return a;
};

/**
 * Parse path data and returns array of points
 * @param {string} data in the following format (comma and space as separators)
 * x,y x,y x,y
 * @returns array of points from given data
 */
window.splitPath = function (data) {
    var ps = data.toString ().split (/\s+/);
    var result = [];
    for (var i = 0, l = ps.length; i < l; i++) {
        var p = ps[i].toString ().split (/,/);
        result.push ({x: Number (p[0]), y: Number (p[1])});
    }
    return result;
};

/**
 * Method transforms given array of points using interpolation
 * Only one property between two points in given array can differ
 * @param {array} data array of points
 */
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

/**
 * Parse path data and returns array of path
 * @param {Array} data in the following format (comma and space as separators)
 * ['x,y x,y x,y'], ['x,y x,y x,y'], ...
 * @returns complete (interpolace included) array of path
 */
window.parsePaths = function (data) {
    var result = [];
    if (typeof data.path === "string") {
        data.path = [data.path];
        return parsePaths (data);
    }
    for (var i = 0, l = data.path.length; i < l; i++) {
        result.push (expandPath (splitPath (data.path[i])));
    }

    return result;
};

window.onMouseMoveHandler = function (e) {
    mousePos.x = e.x - offset.left + window.pageXOffset;
    mousePos.y = e.y - offset.top + window.pageYOffset;

    if (Crafty)
        Crafty.trigger (MOUSE_MOVE);
};

window.onResizeHandler = function (e) {
    if ($ ('#cr-stage')[0] !== undefined)
        offset = $ ('#cr-stage').offset ();
};

window.mousePos = {x: 0, y: 0};
window.offset = {left: 0, top: 0};
window.addEventListener ('mousemove', onMouseMoveHandler);
window.addEventListener ('resize', onResizeHandler);

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace (/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };
}

arrayMult = function (a, n) {
    var r = new Array (a.length);
    for (var i in a)
        r[i] = a[i] * n;
    return r;
};

arrayMerge = function () {
    var args = arguments;
    var r = new Array (args[0].length);
    for (var i in args)
        for (var j in args[i])
            r[j] = (r[j] === undefined ? 0 : r[j]) + args[i][j];
    return r;
};

setMerge = function () {
    var s = arguments;
    var r = {};
    for (var p in s)
        for (var q in s[p])
            r[q] = s[p][q];
    return r;
};

/**
 * Convert array or object to object with 'x' and 'y' properties
 * @param {Array|Object} o array or object
 * @returns Point with 'x' an 'y' property, if object has these 
 * properties, reference is kept (no change)
 */
window.toPoint = function (o) {
    if (o.hasOwnProperty ('x') && o.hasOwnProperty ('y'))
        return o;
    return {x: o[0], y: o[1]};
};

/**
 * Converts object (array, number, object) into defined object with
 * exact representation (surely has desired properties)
 * @param {Array|Number|Object} o array, number, object
 * @returns {toDamage} desired object representation, if object has these 
 * properties, reference is kept (no change)
 */
window.toDamage = function (o) {
    if (typeof o !== 'object')
        return toDamage ([o]);
    var props = DAMAGE_PROP;

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


/**
 * Method calculate distance between two angle (a, b)
 * Optimaze this distance to smalles representation
 * 
 * @param {Number} a start angle
 * @param {Number} b end angle
 * @param {Number} f step
 * @returns part way angle from 'a' to 'b' in distance/'f' step
 */
window.radDist = function (a, b, f) {
    var dif = b - a;
    dif = dif % RAD;
    if (dif !== dif % (RAD / 2)) {
        dif = (dif < 0) ? dif + RAD : dif - RAD;
    }
    return a + dif / f;
};

//method for activating mouse click over whole scene without panel
//you can catch SCENE_MOUSE_CLICK_EVENT
window.activeSceneMouseClick = function () {
    Crafty.addEvent (this, Crafty.stage.elem, "mousedown", function (e) {
        if ((mousePos.x < (SCREEN_WIDTH - PANEL_WIDTH)) && !$.playerFreeze && e.button === 0) {
            Crafty.trigger (SCENE_MOUSE_CLICK_EVENT);
        }
    });
};

//method for activating mouse stop fire over whole scene without panel
//you can catch SCENE_MOUSE_STOP_FIRE
window.activeSceneMouseStopFire = function () {
    //mouse up
    Crafty.addEvent (this, Crafty.stage.elem, "mouseup", function (e) {
        if (mousePos.x < (SCREEN_WIDTH - PANEL_WIDTH)) {
            Crafty.trigger (SCENE_MOUSE_STOP_FIRE);
        }
    });

    //mouse over
    Crafty.addEvent (this, Crafty.stage.elem, "mouseout", function (e) {
        if (mousePos.x < (SCREEN_WIDTH - PANEL_WIDTH)) {
            Crafty.trigger (SCENE_MOUSE_STOP_FIRE);
        }
    });

    Crafty.addEvent (this, Crafty.stage.elem, "mousemove", function (e) {
        if (mousePos.x >= (SCREEN_WIDTH - PANEL_WIDTH)) {
            Crafty.trigger (SCENE_MOUSE_STOP_FIRE);
        }
    });
};

//method for activating special type of cursor for active scene
window.activeSceneCursor = function (cursorType) {
    $ ('#cr-stage').css ('cursor', cursorType);
};


/**
 * Method calculates Euclidean distance of given points
 * @param {Point} p1
 * @param {Point} p2
 * @returns {Number} Euclidean distance of two points
 */
window.distance = function (p1, p2) {
    return Math.sqrt (Math.pow (p1.x - p2.x, 2) + Math.pow (p1.y - p2.y, 2));
};


window.getEntities = function (selector, startPoint, radius) {
    var e = Crafty (selector);
    var s = toPoint (startPoint);
    var r = [];

    var t, deltaX, deltaY;
    var rad = radius * radius;
    for (var i = 0, l = e.length; i < l; i++) {
        //# watch out for center
        t = Crafty (e[i]);
        if (!t.active)
            continue;
        t = t.center;
        deltaX = s.x - t.x;
        deltaY = s.y - t.y;

        if ((deltaX * deltaX + deltaY * deltaY) <= rad) {
            r.push (Crafty (e[i]));
        }
    }
    return r;
};


window.doSplash = function (point) {
    var s = shot.get (SHOT_SPLASH);
    s.setStartPoint (point);
    s.create (W);
    s.setTTL (FRAME_RATE);
    s.start ();
};


window.activateCanvas = function () {
    $ ('#webview').hide ();
    $ ('#cr-stage').show ();
    $ ('#gamePanel').show ();
};


window.activateWebview = function () {
    $ ('#webview').show ();
    $ ('#cr-stage').hide ();
    $ ('#gamePanel').hide ();
};

window.loadPage = function (sourdeID, divID, callback) {
    $ ('#{0}'.format (sourdeID)).load ('pages.html #{1}'.format ('pages.html', divID), callback);
};
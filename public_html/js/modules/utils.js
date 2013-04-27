
/**@
 * #Crafty Time
 * @category Utilities
 */
Crafty.c ("Timer", {
    init: function () {
        this._delays = [];
        this.bind ("EnterFrame", function () {
            var now = new Date ().getTime ();
            for (var index in this._delays) {
                var item = this._delays[index];
                if (!item.triggered && item.start + item.delay + item.pause < now) {
                    item.triggered = true;
                    item.func.call (this);
                    if (item.repeat) {
                        item.start = new Date ().getTime ();
                        item.triggered = false;
                        item.pauseBuffer = 0;
                        item.pause = 0;
                    }
                }
            }
        });
        this.bind ("Pause", function () {
            var now = new Date ().getTime ();
            for (var index in this._delays) {
                this._delays[index].pauseBuffer = now;
            }
        });
        this.bind ("Unpause", function () {
            var now = new Date ().getTime ();
            for (var index in this._delays) {
                var item = this._delays[index];
                item.pause += now - item.pauseBuffer;
            }
        });
    },
    /**@
     * #.delay
     * @comp Crafty Time
     * @sign public this.delay(Function callback, Number delay)
     * @param callback - Method to execute after given amount of milliseconds
     * @param delay - Amount of milliseconds to execute the method
     * 
     * The delay method will execute a function after a given amount of time in milliseconds.
     * It is not a wrapper for `setTimeout`.
     * If Crafty is paused, the delay is interrupted with the pause and then resume when unpaused
     * If the entity is destroyed, the delay is also destroyed and will not have effect. 
     *
     * @example
     * ~~~
     * console.log("start");
     * this.delay(function() {
     *     console.log("100ms later");
     * }, 100);
     * ~~~
     */
    delay: function (func, delay) {
        return this._delays.push ({
            start: new Date ().getTime (),
            func: func,
            delay: delay,
            triggered: false,
            pauseBuffer: 0,
            pause: 0
        }) - 1;
    },
    /**@
     * #.repeat
     * @comp Crafty Time
     * @sign public this.repeat(Function callback, Number delay)
     * @param callback - Method to  be execute (repeatedly) after given amount of milliseconds
     * @param delay - Amount of milliseconds to execute the method
     * 
     * The repeat method will execute a function after a given amount of time in milliseconds.
     * It is not a wrapper for `setInterval`.
     * If Crafty is paused, the delay is interrupted with the pause and then resume when unpaused
     * If the entity is destroyed, the delay is also destroyed and will not have effect. 
     *
     * @example
     * ~~~
     * console.log ("start");
     * this.repeat (function() {
     *     console.log("100ms later");
     * }, 100);
     * ~~~
     */
    repeat: function (func, delay) {
        return this._delays.push ({
            start: new Date ().getTime (),
            func: func,
            delay: delay,
            triggered: false,
            pauseBuffer: 0,
            pause: 0,
            repeat: true
        }) - 1;
    },
    /**@
     * #.clearTimer
     * @comp Crafty Time
     * @sign public this.clearTimer (int id)
     * @param id - delay/repeat id
     * 
     * This method will abort delay/repeat with given id
     * 
     */
    clearTimer: function (id) {
        this._delays[id].repeat = false;
        this._delays[id].triggered = true;
    }
});



/**@
 * #Crafty Time
 * @category Utilities
 */
Crafty.c ("Framer", {
    init: function () {
        this._delays = [];
        this.bind ("EnterFrame", function () {
            for (var index in this._delays) {
                var item = this._delays[index];

                if (item.repeat !== 0 && --item.count === 0) {
                    item.func.call (this);
                    if (--item.repeat !== 0) {
                        item.count = item.frames;
                    }
                }
            }
        });
    },
    delay: function (func, frames) {
        return this._delays.push ({
            count: Math.floor (frames),
            func: func,
            frames: Math.floor (frames),
            repeat: 1
        }) - 1;
    },
    repeat: function (func, frames, repeat) {
        return this._delays.push ({
            count: Math.floor (frames),
            func: func,
            frames: Math.floor (frames),
            repeat: repeat || -1
        }) - 1;
    },
    /**@
     * #.clearTimer
     * @comp Crafty Time
     * @sign public this.clearTimer (int id)
     * @param id - delay/repeat id
     * 
     * This method will abort delay/repeat with given id
     * 
     */
    clearTimer: function (id) {
        this._delays[id].repeat = false;
        this._delays[id].triggered = true;
    }
});



/**@
 * #Crafty HealthBar
 * @category Utilities
 */
Crafty.c ('HealthBar', {
    init: function () {
        this.healthbar = Crafty.e ('2D, Canvas').attr ({w: W, h: H});
        this.healthbarHeight = 4;
        this.healthbarWidth = this.w;
        this.healthbarPosition = this.h;
        this.healthbarColor = "#C00";
        this.healthbarShieldColor = "#00C";
        var _this = this;

        this.bind ('Death', function () {
            _this.healthbar.destroy ();
        });

        this.healthbar.draw = function (e) {
            var ctx = Crafty.canvas.context;
            var x = _this.x + (_this.w - _this.healthbarWidth) / 2;
            var c = _this.maxShield === 0 || _this.shield === 0 ? _this.healthbarColor : _this.healthbarShieldColor;
            var t = _this.maxShield === 0 || _this.shield === 0 ? _this.health / _this.maxHealth : _this.shield / _this.maxShield;
            t = (t > 1 ? 1 : t < 0 ? 0 : t);

            //# match position
            _this.healthbar.x = _this.x;
            _this.healthbar.y = _this.y;
            _this.healthbar.z = _this.z + 1;

            //# draw
            ctx.beginPath ();
            ctx.setFillColor ('#333');
            ctx.globalAlpha = 0.75;
            ctx.fillRect (x, _this.y + _this.healthbarPosition, _this.healthbarWidth, _this.healthbarHeight);
            ctx.globalAlpha = 1;
            ctx.setFillColor (c);
            ctx.fillRect (x, _this.y + _this.healthbarPosition, _this.healthbarWidth * t, _this.healthbarHeight);
            ctx.closePath ();
        };

        this.bind ('Move', this.healthbar.draw);
        this.bind ('HealthChanged', this.healthbar.draw);
    }
});


Crafty.c ('Shield', {
    init: function () {
        this.requires ('2D');
        this.requires ('Canvas');
        this.requires ('Image');
        this.requires ('shield');
        this.enemy = null;
    },
    start: function () {
        if (this.enemy === null || this.enemy === undefined)
            return this.destroy ();
        this.attr ({w: this.enemy.w, h: this.enemy.h});
        this.bind ('EnterFrame', this.update);
        return this;
    },
    update: function () {
        this.x = this.enemy.center.x - this.w / 2;
        this.y = this.enemy.center.y - this.h / 2;
        
        if (this.enemy.shield <= 0) {
            this.enemy.shieldActor = null;
            this.destroy ();
        }
    }
});
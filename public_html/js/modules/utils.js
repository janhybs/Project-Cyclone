
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
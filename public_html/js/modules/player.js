/*****************
 *  Player modul *
 *****************
 */

//define as global object
window.player = {
    create: function(type) {
        switch (type) {
            default:
                var result = Crafty.e('2D, Canvas, Collision, Multiway, SpriteAnimation, player, KeyBoard, PlayerControls, ' + PLAYER_ABS + ', ' + type)
                        .attr({w: 32, h: 32});
                return result;
        }
    }
};

/*
 * Player control component.
 * -------------------------
 */
Crafty.c('PlayerControls', {
    //move definition
    move: {left: false, right: false, up: false, down: false},
    //default speed
    speedPX: 4,
    //init method
    init: function(speed) {
        if (speed)
            this.speedPX = speed;
        this.requires('KeyBoard');
        console.log("Player controls loaded.");

        //move with new frames
        this.bind('EnterFrame', function() {
            pX = this.x;
            pY = this.y;
            if (this.move.right)
                this.x += this.speedPX;
            else if (this.move.left)
                this.x -= this.speedPX;
            else if (this.move.up)
                this.y -= this.speedPX;
            else if (this.move.down)
                this.y += this.speedPX;
            else
                return;
            this.repairPosition(pX, pY);
            //bind key down
        }).bind('KeyDown', function(e) {
            this.move.right = this.move.left = this.move.down = this.move.up = false;

            if (e.key === Crafty.keys['RIGHT_ARROW'])
                this.move.right = true;
            if (e.key === Crafty.keys['LEFT_ARROW'])
                this.move.left = true;
            if (e.key === Crafty.keys['UP_ARROW'])
                this.move.up = true;
            if (e.key === Crafty.keys['DOWN_ARROW'])
                this.move.down = true;

            //bind key up
        }).bind('KeyUp', function(e) {
            if (e.key === Crafty.keys['RIGHT_ARROW'])
                this.move.right = false;
            if (e.key === Crafty.keys['LEFT_ARROW'])
                this.move.left = false;
            if (e.key === Crafty.keys['UP_ARROW'])
                this.move.up = false;
            if (e.key === Crafty.keys['DOWN_ARROW'])
                this.move.down = false;

        });
    }});

/*
 * Abstract player component.
 * --------------------------
 */
Crafty.c(PLAYER_ABS, {
    //init method
    init: function() {

    },
    
    //repair position after change x or y (collision detect, etc.)
    repairPosition: function(fromX, fromY) {
        //path detection
        if (this.hit('path')) {
            this.attr({x: fromX, y: fromY});
        }
        //over screen protection
        if (this.x < 0 || this.x > screenWidth - W || this.y < 0 || this.y > screenHeight - H) {
            this.attr({x: fromX, y: fromY});
        }
    },
        
    //set position method    
    setPosition: function(x, y) {
        this.x = x;
        this.y = y;
    }
});


/*
 * Special player for debuging.
 * ----------------------------
 */
Crafty.c(PLAYER_DEBUG, {
    //init method
    init: function() {
        this.multiway(4, {W: -90, S: 90, D: 0, A: 180});
        this.animate("go_left", 1,0,1)
            .animate("go_right", 0,0,0)
            .animate("go_up", 2,0,2)
            .animate("go_down", 3,0,3)
            .bind("NewDirection",
                    function (direction) {
                        console.log('dudu');
                        if (direction.x < 0) {
                            if (!this.isPlaying("go_left"))
                                this.stop().animate("go_left", 10, -1);
                        }
                        if (direction.x > 0) {
                            if (!this.isPlaying("go_right"))
                                this.stop().animate("go_right", 10, -1);
                        }
                        if (direction.y < 0) {
                            if (!this.isPlaying("go_up"))
                                this.stop().animate("go_up", 10, -1);
                        }
                        if (direction.y > 0) {
                            if (!this.isPlaying("go_down"))
                                this.stop().animate("go_down", 10, -1);
                        }
                        if(!direction.x && !direction.y) {
                            this.stop();
                        }
                });
    }
});
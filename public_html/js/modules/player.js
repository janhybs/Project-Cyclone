/*****************
 *  Player modul *
 *****************
 */

//define as global object
window.player = {
    create: function(type) {
        switch (type) {
            default:
                var result = Crafty.e('2D, Canvas, Collision, SpriteAnimation, player, KeyBoard, PlayerControls, PlayerAnimate, ' + PLAYER_ABS + ', ' + type)
                        .attr({w: PLAYER_WIDTH, h: PLAYER_HEIGHT, x: 0, y: 0,  z: 1});
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
    //default speed in pixels
    speedPX: 2,
    //init method
    init: function(speed) {
        if (speed)
            this.speedPX = speed;
        this.requires('KeyBoard');
        console.log("Player controls loaded.");

        //move with new frames
        this.bind('EnterFrame', function() {
            var move = this.move;
            if (move.right) {
                this.x += this.speedPX;
                if(!this.isPlaying(WALK_RIGHT))
                    Crafty.trigger(PLAYER_DIRECTION, RIGHT_DIRECTION);
            }
            if (move.left) {
                this.x -= this.speedPX;
                if(!this.isPlaying(WALK_LEFT))
                    Crafty.trigger(PLAYER_DIRECTION, LEFT_DIRECTION);
            }
            if (move.up) {
                this.y -= this.speedPX;
                if(!this.isPlaying(WALK_UP))
                    Crafty.trigger(PLAYER_DIRECTION, UP_DIRECTION);
            }
            if (move.down) {
                this.y += this.speedPX;
                if(!this.isPlaying(WALK_DOWN))
                    Crafty.trigger(PLAYER_DIRECTION, DOWN_DIRECTION);
            }
            if (!move.right && !move.left && !move.up && !move.down) {
                if(this.isPlaying())
                    Crafty.trigger(PLAYER_DIRECTION, NO_DIRECTION);
                return;
            } else
                this.repairPosition(this.x, this.y, move);
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
    }
});

/*
 * Player animation component.
 * ---------------------------
 */
Crafty.c('PlayerAnimate', {
    //speed of animation
    speedAnim: 10,
    //last move
    lastMove: NO_DIRECTION,
    //init method
    init: function() {
        this.animate(WALK_LEFT, 0, 1, 3)
                .animate(WALK_RIGHT, 0, 2, 3)
                .animate(WALK_UP, 0, 3, 3)
                .animate(WALK_DOWN, 0, 0, 3)
                .bind(PLAYER_DIRECTION,
                function(direction) {
                    var speedAnim = this.speedAnim;
                    switch (direction) {
                        case NO_DIRECTION:
                            if(this.lastMove !== NO_DIRECTION)
                                this.doLastStep(this.lastMove);
                            this.lastMove = NO_DIRECTION;
                            break;
                        case UP_DIRECTION:
                            if (!this.isPlaying(WALK_UP))
                                this.stop().animate(WALK_UP, speedAnim, -1);
                            this.lastMove = UP_DIRECTION;
                            break;
                        case DOWN_DIRECTION:
                            if (!this.isPlaying(WALK_DOWN))
                                this.stop().animate(WALK_DOWN, speedAnim, -1);
                            this.lastMove = DOWN_DIRECTION;
                            break;
                        case RIGHT_DIRECTION:
                            if (!this.isPlaying(WALK_RIGHT))
                                this.stop().animate(WALK_RIGHT, speedAnim, -1);
                            this.lastMove = RIGHT_DIRECTION;
                            break;
                        case LEFT_DIRECTION:
                            if (!this.isPlaying(WALK_LEFT))
                                this.stop().animate(WALK_LEFT, speedAnim, -1);
                            this.lastMove = LEFT_DIRECTION;
                            break;
                    }
                });
    },
    //method normalized last step
    doLastStep: function(lastMove) {
        switch (lastMove) {
            case UP_DIRECTION:
                this.stop();
                this.sprite(0, 3);
                this.lastMove = UP_DIRECTION;
                break;
            case DOWN_DIRECTION:
                this.stop();
                this.sprite(0, 0);
                this.lastMove = DOWN_DIRECTION;
                break;
            case RIGHT_DIRECTION:
                this.stop();
                this.sprite(0, 2);
                this.lastMove = RIGHT_DIRECTION;
                break;
            case LEFT_DIRECTION:
                this.stop();
                this.sprite(0, 1);
                this.lastMove = LEFT_DIRECTION;
                break;
        }
    },
    //setter for speed animation
    setSpeedOfAnimation: function(speedAnim) {
        this.speedAnim = speedAnim;
    }
});

/*
 * Abstract player component.
 * --------------------------
 */
Crafty.c(PLAYER_ABS, {
    //init method
    init: function() {

    },
    //repair position after change x or y (collision detect, etc.)
    repairPosition: function(fromX, fromY, move) {
        //path detection
        if (this.hit('path') || this.x < 0 || this.x > SCREEN_WIDTH - PLAYER_WIDTH || this.y < 0 || this.y > SCREEN_HEIGHT - PLAYER_HEIGHT) {
            if(move.left) {
                this.attr({x: fromX+1, y: fromY});
                this.repairPosition(this.x, this.y, move);
            }
            if(move.right) {
                this.attr({x: fromX-1, y: fromY});
                this.repairPosition(this.x, this.y, move);
            }
            if(move.up) {
                this.attr({x: fromX, y: fromY+1});
                this.repairPosition(this.x, this.y, move);
            }
            if(move.down) {
                this.attr({x: fromX, y: fromY-1});
                this.repairPosition(this.x, this.y, move);
            }
        }
        
        //over screen protection
        if (this.x < 0 || this.x > SCREEN_WIDTH - PLAYER_WIDTH || this.y < 0 || this.y > SCREEN_HEIGHT - PLAYER_HEIGHT) {
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
        this.speedPX = 5;
    }
});
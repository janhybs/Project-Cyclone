/*****************
 *  Player modul *
 *****************
 */

//define as global object
window.player = {
    create: function(type) {
        switch (type) {
            default:
                var result = Crafty.e('2D, Canvas, Collision, SpriteAnimation, player, KeyBoard, PlayerControls, PlayerAnimate, PlayerSounds, PlayerFire, {0}, {1}'.format(PLAYER_ABS, type))
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
    //last pressed move key
    lastKey: NO_DIRECTION, 
    //init method
    init: function(speed) {
        if (speed)
            this.speedPX = speed;
        this.requires('KeyBoard');
        console.log("Player controls loaded.");

        //move with new frames
        this.bind('EnterFrame', function() {
            var move = this.move;
            if (this.lastKey === RIGHT_DIRECTION) {
                this.x += this.speedPX;
                if(!this.isPlaying(WALK_RIGHT))
                    Crafty.trigger(PLAYER_DIRECTION, RIGHT_DIRECTION);
                this.repairPosition(this.x, this.y, this.lastKey);
            }
            else if (this.lastKey === LEFT_DIRECTION) {
                this.x -= this.speedPX;
                if(!this.isPlaying(WALK_LEFT))
                    Crafty.trigger(PLAYER_DIRECTION, LEFT_DIRECTION);
                this.repairPosition(this.x, this.y, this.lastKey);
            }
            else if (this.lastKey === UP_DIRECTION) {
                this.y -= this.speedPX;
                if(!this.isPlaying(WALK_UP))
                    Crafty.trigger(PLAYER_DIRECTION, UP_DIRECTION);
                this.repairPosition(this.x, this.y, this.lastKey);
            }
            else if (this.lastKey === DOWN_DIRECTION) {
                this.y += this.speedPX;
                if(!this.isPlaying(WALK_DOWN))
                    Crafty.trigger(PLAYER_DIRECTION, DOWN_DIRECTION);
                this.repairPosition(this.x, this.y, this.lastKey);
            }
            else if (this.lastKey === NO_DIRECTION) {
                if(this.isPlaying()) {
                    //stop animation
                    Crafty.trigger(PLAYER_DIRECTION, NO_DIRECTION);
                    //player stops to move
                    Crafty.trigger(PLAYER_STOP_MOVE);
                }
                return;
            }
        //bind key down
        }).bind('KeyDown', function(e) {
            if (e.key === Crafty.keys['RIGHT_ARROW'] || e.key === Crafty.keys['D']) {
                this.move.right = true;
                //this.move.left = false;
                this.lastKey = RIGHT_DIRECTION;
                //player starts to move
                Crafty.trigger(PLAYER_START_MOVE);
            }
            if (e.key === Crafty.keys['LEFT_ARROW'] || e.key === Crafty.keys['A']) {
                this.move.left = true;
                //this.move.right = false;
                this.lastKey = LEFT_DIRECTION;
                //player starts to move
                Crafty.trigger(PLAYER_START_MOVE);
            }
            if (e.key === Crafty.keys['UP_ARROW'] || e.key === Crafty.keys['W']) {
                this.move.up = true;
                //this.move.down = false;
                this.lastKey = UP_DIRECTION;
                //player starts to move
                Crafty.trigger(PLAYER_START_MOVE);
            }
            if (e.key === Crafty.keys['DOWN_ARROW'] || e.key === Crafty.keys['S']) {
                this.move.down = true;
                //this.move.up = false;
                this.lastKey = DOWN_DIRECTION;
                //player starts to move
                Crafty.trigger(PLAYER_START_MOVE);
            }

        //bind key up
        }).bind('KeyUp', function(e) {
            if (e.key === Crafty.keys['RIGHT_ARROW'] || e.key === Crafty.keys['D']) {
                this.move.right = false;
            }
            if (e.key === Crafty.keys['LEFT_ARROW'] || e.key === Crafty.keys['A']) {
                this.move.left = false;
            }
            if (e.key === Crafty.keys['UP_ARROW'] || e.key === Crafty.keys['W']) {
                this.move.up = false;
            }
            if (e.key === Crafty.keys['DOWN_ARROW'] || e.key === Crafty.keys['S']) {
                this.move.down = false;
            }
            //last move activation
            if(this.move.up) this.lastKey = UP_DIRECTION;
            else if(this.move.down) this.lastKey = DOWN_DIRECTION;
            else if(this.move.right) this.lastKey = RIGHT_DIRECTION;
            else if(this.move.left) this.lastKey = LEFT_DIRECTION;
            else this.lastKey = NO_DIRECTION;
        });
    }
});

/*
 * Player fire component.
 * ---------------------------
 */
Crafty.c('PlayerFire', {
    //actual weapon type
    actualWeapon: SHOT_P2P,
    //shot speed
    shotSpeed: 5,
    
    //init method
    init: function() {
        this.bind(SCENE_MOUSE_CLICK_EVENT, this.doFire)
    },
    
    //fire method
    doFire: function() {
        var h = shot.get (this.actualWeapon);
        h.setStartPoint ([this.x, this.y]);
        h.setEndPoint (mousePos);
        h.create (this.shotSpeed);
        h.start ();
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
 * Player sounds component.
 * -------------------------
 */
Crafty.c('PlayerSounds', {
    //playing variable
    isStepping: false,
            
    //init method
    init: function() {
        //player starts move
        this.bind(PLAYER_START_MOVE, function() {
            if(!this.isStepping) {
                this.isStepping = true;
                Crafty.audio.play(PLAYER_STEP_SOUND, -1);
            }
        });
        //player stops move
        this.bind(PLAYER_STOP_MOVE, function() {
            if(this.isStepping) {
                this.isStepping = false;
                Crafty.audio.stop(PLAYER_STEP_SOUND);
            }
        });
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
            if(move === LEFT_DIRECTION) {
                this.attr({x: fromX+1, y: fromY});
                this.repairPosition(this.x, this.y, move);
            }
            else if(move === RIGHT_DIRECTION) {
                this.attr({x: fromX-1, y: fromY});
                this.repairPosition(this.x, this.y, move);
            }
            else if(move === UP_DIRECTION) {
                this.attr({x: fromX, y: fromY+1});
                this.repairPosition(this.x, this.y, move);
            }
            else if(move === DOWN_DIRECTION) {
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
        this.speedPX = 3;
    }
});

/*
 * Soldier player.
 * ---------------
 */
Crafty.c(PLAYER_SOLDIER, {
    //init method
    init: function() {
        this.speedPX = 3;
        this.actualWeapon = SHOT_P2P;
        this.shotSpeed = 5;
    }
});

/*
 * Homing player.
 * --------------
 */
Crafty.c(PLAYER_HOMING, {
    //init method
    init: function() {
        this.speedPX = 4;
        this.actualWeapon = SHOT_HOMING;
        this.shotSpeed = 7;
    }
});

/*
 * Laser player.
 * --------------
 */
Crafty.c(PLAYER_LASER, {
    //init method
    init: function() {
        this.speedPX = 5;
        this.actualWeapon = SHOT_LASER;
        this.shotSpeed = 4;
    }
});
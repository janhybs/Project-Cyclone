/*****************
 *  Player modul *
 *****************
 */

//define as global object
window.player = {
    create: function(type) {
        switch (type) {
            default:
                var result = Crafty.e('2D, Canvas, Collision, KeyBoard, PlayerControls, PlayerAnimate, PlayerSounds, PlayerFire, {0}, {1}'.format(PLAYER_ABS, type))
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
    //optimalization
    opt: true,
    //init method
    init: function() {
        this.requires('KeyBoard');
        console.log("Player controls loaded.");
        //center for rotation
        this.origin(12, 12);
        //move with new frames
        this.bind('EnterFrame', function() {
            this.opt = this.opt?false:true;
            if(this.opt) {
                return;
            }
            var move = this.move;
            if (this.lastKey === RIGHT_DIRECTION) {
                this.x += this.speedPX;
                this.repairPosition(this.x, this.y, this.lastKey);
            }
            else if (this.lastKey === LEFT_DIRECTION) {
                this.x -= this.speedPX;
                this.repairPosition(this.x, this.y, this.lastKey);
            }
            else if (this.lastKey === UP_DIRECTION) {
                this.y -= this.speedPX;
                this.repairPosition(this.x, this.y, this.lastKey);
            }
            else if (this.lastKey === DOWN_DIRECTION) {
                this.y += this.speedPX;
                this.repairPosition(this.x, this.y, this.lastKey);
            } else if(this.lastKey === NO_DIRECTION) {
                Crafty.trigger(PLAYER_STOP_MOVE);
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
        //player rotation
        this.bind(MOUSE_MOVE, function() {
            this.rotation = Math.atan2(this.y + this.h/2 - mousePos.y, this.x + this.w/2 - mousePos.x) * 180 / Math.PI + 180;
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
    //shot damage
    shotDamage: 1,
    //shot range
    shotRange: 15,
    //laser actual shot
    actualShot: false,

    //init method
    init: function() {
        this.bind(SCENE_MOUSE_CLICK_EVENT, this.doFire);
        this.bind(SCENE_MOUSE_STOP_FIRE, this.stopFire);
        $.shotRepID = false;
    },
    
    //fire method
    doFire: function() {
        if(this.actualWeapon === SHOT_P2P) {
            this.doP2PFire();
            $.shotRepID = timer.repeat(this.doP2PFire, FRAME_RATE / 2);
        } else {
            this.doLaserFire();
        }
        
    },
    
    doP2PFire: function() {
        this.actualShot = false;
        this.actualShot = shot.get(SHOT_P2P);
        this.actualShot.setStartPoint([$.player.x + $.player.w / 2, $.player.y + $.player.h / 2]);
        this.actualShot.setEndPoint(mousePos);
        this.actualShot.setDamage($.player.shotDamage);
        this.actualShot.setTTL($.player.rangePointer.getDiameter()/(2*$.player.shotSpeed));
        this.actualShot.create($.player.shotSpeed);
        this.actualShot.start();
    },
            
    doLaserFire: function() {
        this.actualShot = false;
        this.actualShot = shot.get(this.actualWeapon);
        this.actualShot.setStartPoint([this.x + this.w / 2, this.y + this.h / 2]);
        this.actualShot.setEndPoint(mousePos);
        this.actualShot.setDamage(this.shotDamage);       
        this.actualShot.withRadius = true;
        this.actualShot.rangeRadius = this.rangePointer.getDiameter()/2;
        this.actualShot.create(PLAYER_LASER_IMAGE);
        this.bind("Move", function() {
            this.actualShot.setStartPoint([this.x + this.w / 2, this.y + this.h / 2]);
        });
        this.actualShot.start();
    },
    
    //method for stop fire        
    stopFire: function() {
        if(this.actualWeapon === SHOT_P2P) {
            if($.shotRepID !== false)
                timer.clearTimer($.shotRepID);
        }
        if(this.actualWeapon === SHOT_LASER && !(typeof(this.actualShot) === 'boolean')) {
            this.actualShot.doDestroy();
        }
    }
});

/*
 * Player range pointer.
 * ---------------------
 */
Crafty.c('PlayerRangePointer', {
    //visible variable
    visible: false,
    //transparency: 0.0 - 1.0
    transparency: 0.3,
    //pointer diameter
    diameter: 0,
    //init method
    init: function() {
        this.w = this.h= this.diameter;
        this.alpha = this.transparency;
        this.z = 1;
    },
    
    //set size
    setDiameter: function(dia) {
       this.diameter = 32 * dia;
       this.w = this.h= this.diameter;
    },
    
    //get size
    getDiameter: function() {
       return this.diameter;
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
    //level of player
    level: 0,
    //init method
    init: function() {
        //player fire freeze global var
        $.playerFreeze = false;
        //add range pointer
        this.rangePointer = Crafty.e("2D, Canvas, PlayerRangePointer");
        this.rangePointer.setDiameter(this.shotRange);
        this.requires('Image');
    },
    //repair position after change x or y (collision detect, etc.)
    repairPosition: function(fromX, fromY, move) {
        //path detection
        if (this.hit('path') || this.x < 0 || this.x > (SCREEN_WIDTH - PANEL_WIDTH - W) || this.y < 0 || this.y > SCREEN_HEIGHT - PLAYER_HEIGHT) {
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
 * Soldier player.
 * ---------------
 */
Crafty.c(PLAYER_SOLDIER, {
    //init method
    init: function() {
        this.speedPX = 6;
        this.actualWeapon = SHOT_P2P;
        this.shotSpeed = 5;
        this.shotDamage = 30;
        this.image('images/player/soldier.png');
    }
});

/*
 * Laser player.
 * --------------
 */
Crafty.c(PLAYER_LASER, {
    //init method
    init: function() {
        this.speedPX = 6;
        this.actualWeapon = SHOT_LASER;
        this.image('images/player/soldier.png');
    }
});
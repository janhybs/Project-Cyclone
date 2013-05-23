/*****************
 *  Player modul *
 *****************
 */

//define as global object
window.player = {
    create: function(type) {
        var result = Crafty.e('2D, Canvas, KeyBoard, PlayerControls, PlayerAnimate, PlayerSounds, PlayerFire, {0}, {1}'.format(PLAYER_ABS, type))
                           .attr({w: PLAYER_WIDTH, h: PLAYER_HEIGHT, x: SCENE_LIMIT, y: SCENE_LIMIT});
        return result;
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
    //collision rect
    collisionRect: false,
    //init method
    init: function() {
        this.collisionRect = Crafty.e("2D, Rectangle, Collision").attr({w: PLAYER_WIDTH, h: PLAYER_HEIGHT, x: 0, y: 0});
        this.requires('KeyBoard');
        //center for rotation
        this.origin(16, 14);
        //move with new frames
        this.bind('EnterFrame', function() {
            this.opt = this.opt?false:true;
            if(this.opt) {
                return;
            }
            var move = this.move;
            if (this.lastKey === RIGHT_DIRECTION && !this.isOverScreen(this.x + this.speedPX, this.y)) {
                this.x += this.speedPX;
                this.collisionRect.x += this.speedPX;
                this.repairPosition(this.collisionRect.x, this.collisionRect.y, this.lastKey);
                Crafty.trigger(MOUSE_MOVE);
            }
            else if (this.lastKey === LEFT_DIRECTION && !this.isOverScreen(this.x - this.speedPX, this.y)) {
                this.x -= this.speedPX;
                this.collisionRect.x -= this.speedPX;
                this.repairPosition(this.collisionRect.x, this.collisionRect.y, this.lastKey);
                Crafty.trigger(MOUSE_MOVE);
            }
            else if (this.lastKey === UP_DIRECTION && !this.isOverScreen(this.x, this.y - this.speedPX)) {
                this.y -= this.speedPX;
                this.collisionRect.y -= this.speedPX;
                this.repairPosition(this.collisionRect.x, this.collisionRect.y, this.lastKey);
                Crafty.trigger(MOUSE_MOVE);
            }
            else if (this.lastKey === DOWN_DIRECTION && !this.isOverScreen(this.x, this.y + this.speedPX)) {
                this.y += this.speedPX;
                this.collisionRect.y += this.speedPX;
                this.repairPosition(this.collisionRect.x, this.collisionRect.y, this.lastKey);
                Crafty.trigger(MOUSE_MOVE);
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
    },
            
    //overscreen protection        
    isOverScreen: function(x, y) {
        return x < SCENE_LIMIT || x > SCREEN_WIDTH - PLAYER_WIDTH - SCENE_LIMIT - PANEL_WIDTH || y < SCENE_LIMIT || y > SCREEN_HEIGHT - PLAYER_HEIGHT - SCENE_LIMIT;
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
        Crafty.audio.play(PLAYER_GUN_SOUND, 1, VOLUME);
        this.actualShot = false;
        this.actualShot = shot.get(SHOT_P2P, P2P_IMAGE_NAME.playerSoldier);
        this.actualShot.setStartPoint([$.player.x + $.player.w / 2, $.player.y + $.player.h / 2]);
        this.actualShot.setEndPoint(mousePosCursor);
        this.actualShot.setDamage($.player.shotDamage);
        this.actualShot.setTTL($.player.rangePointer.getDiameter()/(2*$.player.shotSpeed));
        this.actualShot.create($.player.shotSpeed);
        this.actualShot.z = Z_PLAYER_SHOT;
        this.actualShot.start();
    },
            
    doLaserFire: function() {
        this.actualShot = false;
        this.actualShot = shot.get(this.actualWeapon);
        this.actualShot.setStartPoint([this.x + this.w / 2, this.y + this.h / 2]);
        this.actualShot.setEndPoint(mousePosCursor);
        this.actualShot.setDamage(this.shotDamage);       
        this.actualShot.withRadius = true;
        this.actualShot.rangeRadius = this.rangePointer.getDiameter()/2;
        this.actualShot.z = Z_PLAYER_SHOT;
        this.actualShot.create(LASER_IMAGE_NAME.playerLaser, LASER_IMAGE_NAME.playerLaserEnd);
        this.bind("Move", function() {
            this.actualShot.setStartPoint([this.x + this.w / 2, this.y + this.h / 2]);
        });
        this.actualShot.start();
        Crafty.audio.play(PLAYER_LASER_SOUND, -1, VOLUME/2);
    },
    
    //method for stop fire        
    stopFire: function() {
        if(this.actualWeapon === SHOT_P2P) {
            if($.shotRepID !== false)
                timer.clearTimer($.shotRepID);
        }
        if(this.actualWeapon === SHOT_LASER && !(typeof(this.actualShot) === 'boolean')) {
            Crafty.audio.stop(PLAYER_LASER_SOUND);
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
                Crafty.audio.play(PLAYER_STEP_SOUND, -1, VOLUME/2);
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
        this.requires('Image');
        //z - index
        this.z = Z_PLAYER;
    },
    //repair position after change x or y (collision detect, etc.)
    repairPosition: function(fromX, fromY, move) {
        //path detection
        if (this.collisionRect.hit('path') || this.collisionRect.x < 0 || this.collisionRect.x > (SCREEN_WIDTH - PANEL_WIDTH - W) || this.collisionRect.y < 0 || this.collisionRect.y > SCREEN_HEIGHT - PLAYER_HEIGHT) {
            if(move === LEFT_DIRECTION) {
                this.attr({x: fromX+1, y: fromY});
                this.collisionRect.attr({x: fromX+1, y: fromY});
                this.repairPosition(this.collisionRect.x, this.collisionRect.y, move);
            }
            else if(move === RIGHT_DIRECTION) {
                this.attr({x: fromX-1, y: fromY});
                this.collisionRect.attr({x: fromX-1, y: fromY});
                this.repairPosition(this.collisionRect.x, this.collisionRect.y, move);
            }
            else if(move === UP_DIRECTION) {
                this.attr({x: fromX, y: fromY+1});
                this.collisionRect.attr({x: fromX, y: fromY+1});
                this.repairPosition(this.collisionRect.x, this.collisionRect.y, move);
            }
            else if(move === DOWN_DIRECTION) {
                this.attr({x: fromX, y: fromY-1});
                this.collisionRect.attr({x: fromX, y: fromY-1});
                this.repairPosition(this.collisionRect.x, this.collisionRect.y, move);
            }
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
        this.image('images/player/laser.png');
    }
});
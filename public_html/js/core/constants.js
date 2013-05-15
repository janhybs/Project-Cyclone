/***************
 *    CORE     *
 ***************
 */
var ALWAYS_DRAW_ALL = true;

var Z_BOARD = 1;
var Z_ENEMY = 2;
var Z_PLAYER = 1000;
var Z_TOWER_RANGE_INFO = 1001;
var Z_TOWER_BODY = 10 * 1000;
var Z_TOWER_LEVEL = 50 * 1000;
var Z_TOWER_HEAD = 100 * 1000;
var Z_PLAYER_SHOT = Z_PLAYER - 1;
var Z_TOWER_SHOT = Z_TOWER_BODY + 1;
var Z_EFFECTS = 1000 * 1000;
var Z_ENEMY_TARGET = 3;
var GAME_OVER = 'gameOver';
var GAME_END = 'gameEnd';
var ENEMY_SLIP = 'enemySlip';
var MONEY_BY_LEVEL = [1000, 2000, 3000, 4000, 5000];

/***************
 * GAME SCENES *
 ***************
 */
//scenes
var SCENE_GAME = 'game';
var SCENE_MENU = 'menu';
var SCENE_LOADING = 'loading';
var SCENE_LEVEL_UP = 'playerLevelUp';
var SCENE_NEW_GAME = 'newGame';
var SCENE_CONTINUE = 'continue';
var SCENE_GAME_MENU = 'gameMenu';
var SCENE_GAME_OVER = 'gameOverScene';
var SCENE_GAME_SUCCESS = 'gameMenuSuccess';
var SCENE_STORY_MESSAGE = 'gameStoryMessage';

//events
var SCENE_MOUSE_CLICK_EVENT = "sceneMouseClickEvent";
var SCENE_MOUSE_RELEASED_EVENT = "sceneMouseReleasedEvent";
var SCENE_MOUSE_OUT_EVENT = "sceneMouseOutEvent";
var SCENE_MOUSE_STOP_FIRE = "sceneMouseStopFireEvent";
var MOUSE_MOVE = "playerMouseMove";

/***********
 * ENEMIES *
 ***********
 */
var ENEMY_ABS = 'enemyAbstract';
var ENEMY_BRAIN = 'enemyBrain';

//# types
var ENEMY_RES = .8;
var ENEMY_TYPE = {
    no: [0, 0, 0, 0, 0],
    normal: [ENEMY_RES, 0, 0, 0, 0],
    fire: [0, ENEMY_RES, 0, 0, 0],
    electric: [0, 0, ENEMY_RES, 0, 0],
    poison: [0, 0, 0, ENEMY_RES, 0],
    ice: [0, 0, 0, 0, ENEMY_RES]
};

//# sizes
var ENEMY_SIZE = {
    lvl24: 24,
    lvl28: 28,
    lvl32: 32,
    lvl36: 36,
    lvl40: 40,
    lvl44: 44,
    lvl48: 48
};

//# health
var ENEMY_HEALTH = {
    lvl0: 1,
    lvl1: 100,
    lvl2: 115,
    lvl3: 130,
    lvl4: 150,
    lvl5: 175,
    lvl6: 200,
    lvl7: 300,
    lvl8: 500,
    lvl9: 750,
    lvl10: 1000,
    boss: 2000
};

//# sizes
var ENEMY_SHIELD = {
    lvl0: 0,
    lvl1: 100,
    lvl2: 115,
    lvl3: 130,
    lvl4: 150,
    lvl5: 175,
    lvl6: 200,
    lvl7: 300,
    lvl8: 500,
    lvl9: 750,
    lvl10: 1000,
    boss: 2000
};

//# speed
var ENEMY_SPEED = {
    lvl1: 1 / 3,
    lvl2: 2 / 3,
    lvl3: 1,
    lvl4: 3 / 2,
    lvl5: 2,
    lvl6: 3
};


//# wobble (random movement)
var ENEMY_WOBBLE = {
    lvl1: 0,
    lvl2: 5,
    lvl3: 10,
    lvl4: 16,
};



//# images
var ENEMY_IMAGE = {
    red: 'enemy_red',
    blue: 'enemy_blue',
    green: 'enemy_green',
    brown: 'enemy_brown',
    purple: 'enemy_purple',
    yellow: 'enemy_yellow',
};

/*********
 * SIZES *
 *********
 */
//screen size
var SCREEN_WIDTH = 960;
var SCREEN_HEIGHT = 640;

//size
var W = 32;
var H = 32;

var SCENE_LIMIT = 15;

/**********
 * SHOOTS *
 **********
 */
var SHOT_ABS = 'shotAbstract';
var SHOT_P2P = 'P2P';
var SHOT_LASER = 'Laser';
var SHOT_SPLASH = 'Splash';
var SHOT_HOMING = 'Homing';


var LASER_IMAGE_NAME = {
    chain: "chain",
    chainEnd: "chain_end",
    laser: "laser",
    laserEnd: "laser_end",
    playerLaser: "player_laser",
    playerLaserEnd: "player_laser_end"
};

var P2P_IMAGE_NAME = {
    cannon: 'cannon',
    flame: 'flame',
    machineGun: 'machine_gun',
    iceDart: 'ice_dart',
    playerSoldier: "player_soldier"
};

var HOMING_IMAGE_NAME = {
    homing: 'homing'
};

var SPLASH_IMAGE_NAME = {
    electric: 'electric',
    slow: 'slow'
};

var REZISTANCE = 1.00;
var BENEFIT_SHIELD = 4;
var DAMAGE_PROP = [
    'basic', 'fire', 'electric', 'poison', 'ice', // basic damage types
    'period', 'repeat', 'value', // poison and fire can repeat itself
    'slow', 'chance', 'duration' // how much to slow down 0.0 - 1.0, chance 0.0 - 1.0
];

//utils
var FRAME_RATE = 25;
var RAD = Math.PI * 2;
var PI = Math.PI;

/**********
 * TOWERS *
 **********
 */
var TOWER_ABS = 'AbstractTower';
var TOWER_P2P = 'P2PTower';
var TOWER_LASER = 'LaserTower';
var TOWER_HOMING = 'HomingTower';
var TOWER_SPLASH = 'SplashTower';
var DEFAULT_PRICE = 100;
var MAX_LEVEL = 3;

var TOWER_SOUND_NAME = {
    cannon: 'cannon',
    electric: 'electric',
    flame: 'flame',
    homing: 'homing',
    chain: 'chain',
    iceDart: 'iceDart',
    laser: 'laser',
    machineGun: 'machineGun',
    slow: 'slow'
};

var TOWER_LEVEL_IMAGE = {
    level1: 'images/pages/level-01.png',
    level2: 'images/pages/level-02.png'
};

var LEVEL_X_MOVE = 18;
var LEVEL_Y_MOVE = 20;

var CANNON_SOUND = 'cannon';
var ELECTRIC_SOUND = 'electric';
var LASER_SOUND = 'laser';
var SPRAY_SOUND = 'spray';
var SHOT_SOUND1 = 'shot-01';
var SHOT_SOUND2 = 'shot-02';
var TOWER_PROPS = ['damage', 'speed', 'range', 'spreading', 'ttl', 'frameRate'];
var TOWER_MACHINEGUN = 'MachineGunTower';


var TOWER_MACHINEGUN_PROPS = {
    price: 100,
    upgradePrice: 100,
    aimStyle: 'ClosestAim',
    damage1: toDamage (10),
    speed1: 5,
    range1: 100,
    spreading1: 0,
    ttl1: 30,
    frameRate1: 12,
    damage2: toDamage (15),
    speed2: 5,
    range2: 110,
    spreading2: 0,
    ttl2: 30,
    frameRate2: 10,
    damage3: toDamage (25),
    speed3: 5,
    range3: 125,
    spreading3: 0,
    ttl3: 30,
    frameRate3: 8
};

var TOWER_CANNON = 'CannonTower';
var TOWER_CANNON_PROPS = {
    price: 200,
    upgradePrice: 150,
    aimStyle: 'MostHealthAim',
    damage1: toDamage (49),
    speed1: 5,
    range1: 200,
    spreading1: 0,
    ttl1: 60,
    frameRate1: 45,
    damage2: toDamage (75),
    speed2: 6,
    range2: 250,
    spreading2: 0,
    ttl2: 60,
    frameRate2: 40,
    damage3: toDamage (125),
    speed3: 7,
    range3: 300,
    spreading3: 0,
    ttl3: 60,
    frameRate3: 30
};

var TOWER_FLAMETHROWER = 'FlamethrowerTower';
var TOWER_FLAMETHROWER_PROPS = {
    price: 150,
    upgradePrice: 120,
    aimStyle: 'ClosestAim',
    damage1: setMerge (toDamage (1, 1), {period: 10, repeat: 6, value: 5}),
    speed1: 3,
    range1: 80,
    spreading1: 20,
    ttl1: 30,
    frameRate1: 2,
    damage2: setMerge (toDamage (2, 2), {period: 8, repeat: 6, value: 7}),
    speed2: 4,
    range2: 96,
    spreading2: 30,
    ttl2: 30,
    frameRate2: 1,
    damage3: setMerge (toDamage (4, 4), {period: 5, repeat: 6, value: 10}),
    speed3: 5,
    range3: 112,
    spreading3: 40,
    ttl3: 30,
    frameRate3: 1
};


var TOWER_ICE_DART = 'IceDartTower';
var TOWER_ICE_DART_PROPS = {
    price: 50,
    upgradePrice: 60,
    aimStyle: 'NoFreezeAim',
    damage1: setMerge (toDamage (0), {slow: .7, chance: .9, duration: 25}),
    speed1: 3,
    range1: 80,
    spreading1: 0,
    ttl1: 30,
    frameRate1: 45,
    damage2: setMerge (toDamage (0), {slow: .8, chance: .95, duration: 35}),
    speed2: 4,
    range2: 96,
    spreading2: 0,
    ttl2: 30,
    frameRate2: 45,
    damage3: setMerge (toDamage (0), {slow: .9, chance: 1, duration: 50}),
    speed3: 5,
    range3: 112,
    spreading3: 0,
    ttl3: 30,
    frameRate3: 40
};

var TOWER_BEAM_LASER = 'BeamLaserTower';
var TOWER_BEAM_LASER_PROPS = {
    price: 150,
    upgradePrice: 120,
    aimStyle: 'ClosestAim',
    damage1: setMerge (toDamage (.5), {electric: .7}),
    speed1: 0,
    range1: 80,
    spreading1: 0,
    ttl1: 10000,
    frameRate1: 5,
    damage2: setMerge (toDamage (1), {electric: 1.4}),
    speed2: 0,
    range2: 96,
    spreading2: 0,
    ttl2: 10000,
    frameRate2: 5,
    damage3: setMerge (toDamage (3), {electric: 4}),
    speed3: 0,
    range3: 112,
    spreading3: 0,
    ttl3: 10000,
    frameRate3: 5
};

var TOWER_CHAIN_LASER = 'ChainLaserTower';
var TOWER_CHAIN_LASER_PROPS = {
    price: 250,
    upgradePrice: 400,
    aimStyle: 'FurthestAim',
    damage1: setMerge (toDamage (.35), {electric: .35}),
    speed1: 0,
    range1: 96,
    spreading1: 0,
    ttl1: 10000,
    frameRate1: 5,
    chain1: 2,
    damage2: setMerge (toDamage (.7), {electric: .7}),
    speed2: 0,
    range2: 112,
    spreading2: 0,
    ttl2: 10000,
    frameRate2: 5,
    chain2: 3,
    damage3: setMerge (toDamage (2), {electric: 2}),
    speed3: 0,
    range3: 128,
    spreading3: 0,
    ttl3: 10000,
    frameRate3: 5,
    chain3: 5
};

var TOWER_HOMING_MISSILE = 'HomingMissileTower';
var TOWER_HOMING_MISSILE_PROPS = {
    price: 250,
    upgradePrice: 400,
    aimStyle: 'MostHealthAim',
    damage1: toDamage (10),
    speed1: 3,
    range1: 200,
    spreading1: 0,
    ttl1: 100,
    frameRate1: 45,
    curving1: 30,
    damage2: toDamage (15),
    speed2: 3,
    range2: 250,
    spreading2: 0,
    ttl2: 150,
    frameRate2: 40,
    curving2: 30,
    damage3: toDamage (30),
    speed3: 4,
    range3: 300,
    spreading3: 0,
    ttl3: 250,
    frameRate3: 30,
    curving3: 20
};

var TOWER_ELECTRIC_AURA = 'ElectricAuraTower';
var TOWER_ELECTRIC_AURA_PROPS = {
    price: 200,
    upgradePrice: 150,
    aimStyle: 'ClosestAim',
    damage1: setMerge (toDamage (2), {electric: 8}),
    speed1: 0,
    range1: 128,
    spreading1: 0,
    ttl1: 75 - 1,
    frameRate1: 75,
    damage2: setMerge (toDamage (4), {electric: 16}),
    speed2: 0,
    range2: 150,
    spreading2: 0,
    ttl2: 65 - 1,
    frameRate2: 65,
    damage3: setMerge (toDamage (5), {electric: 35}),
    speed3: 0,
    range3: 182,
    spreading3: 0,
    ttl3: 50 - 1,
    frameRate3: 50
};

var TOWER_SLOW_AURA = 'SlowAuraTower';
var TOWER_SLOW_AURA_PROPS = {
    price: 200,
    upgradePrice: 150,
    aimStyle: 'ClosestAim',
    damage1: setMerge (toDamage (1), {poison: .5}, {period: 10, repeat: 5, value: 0.5}, {slow: .3, chance: 1, duration: 25}),
    speed1: 0,
    range1: 128,
    spreading1: 0,
    ttl1: 75 - 1,
    frameRate1: 75,
    damage2: setMerge (toDamage (2), {poison: 1}, {period: 10, repeat: 5, value: 0.7}, {slow: .4, chance: 1, duration: 35}),
    speed2: 0,
    range2: 150,
    spreading2: 0,
    ttl2: 65 - 1,
    frameRate2: 65,
    damage3: setMerge (toDamage (3), {poison: 2}, {period: 10, repeat: 5, value: 1.0}, {slow: .5, chance: 1, duration: 50}),
    speed3: 0,
    range3: 182,
    spreading3: 0,
    ttl3: 50 - 1,
    frameRate3: 50
};

var TOWER_IMAGE_ARRAY = {MachineGunTower: ['images/cat.gif'], CannonTower: ['images/cat.gif'],
    FlamethrowerTower: ['images/cat.gif'], IceDartTower: ['images/cat.gif'],
    BeamLaserTower: ['images/cat.gif'], ChainLaserTower: ['images/cat.gif'],
    HomingMissileTower: ['images/cat.gif'], ElectricAuraTower: ['images/cat.gif'],
    SlowAuraTower: ['images/cat.gif']};

var TOWER_BRAIN = 'TowerBrainComp';

var TOWER_IMAGE_NAME = {
    machineGunBody: 'body_02',
    machineGunHead: 'head_02',
    cannonBody: 'body_01',
    cannonHead: 'head_01',
    flamethrowerBody: 'body_04',
    flamethrowerHead: 'head_04',
    iceDartBody: 'body_08',
    iceDartHead: 'head_08',
    beamLaserBody: 'body_03',
    beamLaserHead: 'head_03',
    chainLaserBody: 'body_05',
    chainLaserHead: 'head_05',
    homingMissileBody: 'body_07',
    homingMissileHead: 'head_07',
    electricAuraBody: 'body_06',
    slowAuraBody: 'body_09'
};

//tower bilder
var TOWER_BUILDER = 'towerBuilderComp';

//enemy generator
var ENEMY_GENERATOR = 'enemyGenerator';

/**********
 * AIMING *
 **********
 */

var AIMING_MOST_HEALTH = 'MostHealthAim';
var AIMING_LEAST_HEALTH = 'LeastHealthAim';
var AIMING_CLOSEST = 'ClosestAim';
var AIMING_FURTHEST = 'FurthestAim';
var AIMING_NO_FREEZE = 'NoFreezeAim';

/********************
 * PLAYER CONSTANTS *
 ********************
 */
//players
var PLAYER_ABS = 'AbstractPlayer';
var PLAYER_SOLDIER = 'SoldierPlayer';
var PLAYER_LASER = 'LaserPlayer';

//player size
var PLAYER_HEIGHT = 24;
var PLAYER_WIDTH = 24;

//player events
var PLAYER_DIRECTION = "PlayerDirection";
var PLAYER_START_MOVE = "PlayerStartMove";
var PLAYER_STOP_MOVE = "PlayerStopMove";

//player directions
var NO_DIRECTION = 0;
var UP_DIRECTION = 1;
var DOWN_DIRECTION = 2;
var RIGHT_DIRECTION = 3;
var LEFT_DIRECTION = 4;

//player damage & range
var PLAYER_DAMAGES = {
    0: 0,
    1: 5,
    2: 15,
    3: 35,
    4: 60,
    5: 100,
    6: 150,
    7: 200,
    8: 275,
    9: 350,
    10: 500
};

var PLAYER_RANGES = {
    0: 0.00,
    1: 32 * 2.50,
    2: 32 * 3.00,
    3: 32 * 3.50,
    4: 32 * 4.00,
    5: 32 * 6.00,
    6: 32 * 7.00,
    7: 32 * 8.00,
    8: 32 * 9.00,
    9: 32 * 10.00,
    10: 32 * 15.00
};

var PLAYER_MAX_RANGE = 10;
var PLAYER_MAX_DAMAGE = 10;

//sounds
var PLAYER_STEP_SOUND = "step";
var PLAYER_GUN_SOUND = "machineGun";
var PLAYER_LASER_SOUND = "playerLaserSound";


//others
var LEVEL_UP_TEXT = "Your level was increased!";

/************************
 * GAME PANEL CONSTANTS *
 ************************
 */
//panel components
var GAME_PANEL_COMPONENT = "gamePanelComp";
var GAME_PANEL_CONTENT = "gamePanelContent";

//panel properties
var PANEL_WIDTH = 5 * 32;
var PANEL_BG_COLOR = "#888888";


/********************************
 * LOCAL STORAGE DATA CONSTANTS *
 ********************************
 */

/*******************
 * GENERAL STORAGE *
 *******************
 */
//storage
var GUN_PLAYER = "gunPlayer";
var LASER_PLAYER = "laserPlayer";
var GUN_PLAYER_NAME = "gunPlayerName";
var LASER_PLAYER_NAME = "laserPlayerName";
var ACTIVE_PLAYER = "activePlayer";
var GUN_PLAYER_EXPS = "gunPlayerExps";
var GUN_PLAYER_LEVEL = "gunPlayerLevel";
var GUN_PLAYER_DAMAGE = "gunPlayerDamage";
var GUN_PLAYER_RANGE = "gunPlayerRange";
var LASER_PLAYER_EXPS = "laserPlayerExps";
var LASER_PLAYER_LEVEL = "laserPlayerLevel";
var LASER_PLAYER_DAMAGE = "laserPlayerDamage";
var LASER_PLAYER_RANGE = "laserPlayerRange";

var PLAYER_MONEY = "playerMoney";
var PLAYER_START_MONEY_PACK = 1000;
var MAX_OPENED_LEVEL = "maxOpenedLevel";
var BEST_SCORE_LEVEL1 = "bestScoreLevel1";
var BEST_SCORE_LEVEL2 = "bestScoreLevel2";
var BEST_SCORE_LEVEL3 = "bestScoreLevel3";
var BEST_SCORE_LEVEL4 = "bestScoreLevel4";
var BEST_SCORE_LEVEL5 = "bestScoreLevel5";

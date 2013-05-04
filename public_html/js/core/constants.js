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

//debug scenes
var SCENE_DEBUG_MENU = 'debugMenu';
var SCENE_P2P_TEST = 'p2p-test';
var SCENE_LASER_TEST = 'laser-test';
var SCENE_HOMING_TEST = 'homing-test';
var SCENE_SPLASH_TEST = 'splash-test';
var SCENE_P2P_TOWER_TEST = 'tower-p2p-test';
var SCENE_ENEMY_TEST = 'enemy-test';

//events
var SCENE_MOUSE_CLICK_EVENT = "sceneMouseClickEvent";
var SCENE_MOUSE_RELEASED_EVENT = "sceneMouseReleasedEvent";
var SCENE_MOUSE_OUT_EVENT = "sceneMouseOutEvent";
var SCENE_MOUSE_STOP_FIRE = "sceneMouseStopFireEvent";

/***********
 * ENEMIES *
 ***********
 */
var ENEMY_ABS = 'enemyAbstract';
var ENEMY_BRAIN = 'enemyBrain';

//# types
var ENEMY_TYPE = {
    no: [0, 0, 0, 0, 0],
    normal: [1, 0, 0, 0, 0],
    fire: [0, 1, 0, 0, 0],
    electric: [0, 0, 1, 0, 0],
    poison: [0, 0, 0, 1, 0],
    ice: [0, 0, 0, 0, 1]
};

//# sizes
var ENEMY_SIZE = {
    tiny: 0 + 1 / 3,
    small: 0 + 2 / 3,
    normal: 1,
    large: 1 + 1 / 3,
    huge: 1 + 2 / 3,
    boss: 4
};

//# health
var ENEMY_HEALTH = {
    weak: 50,
    normal: 100,
    strong: 500,
    boss: 2000
};

//# sizes
var ENEMY_SHIELD = {
    no: 0,
    weak: 20,
    normal: 50,
    strong: 100,
    boss: 500
};

//# speed
var ENEMY_SPEED = {
    snail: 1 / 3,
    slow: 2 / 3,
    normal: 1,
    fast: 2,
    lighbolt: 3
};


//# wobble (random movement)
var ENEMY_WOBBLE = {
    no: 0,
    normal: 5,
    drunk: 10,
    high: 20
};



//# images
var ENEMY_IMAGE = {
    normal: 'enemy'
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

/**********
 * SHOOTS *
 **********
 */
var SHOT_ABS = 'shotAbstract';
var SHOT_P2P = 'P2P';
var SHOT_LASER = 'Laser';
var SHOT_SPLASH = 'Splash';
var SHOT_HOMING = 'Homing';

var LASER_IMAGE_PATH = {
    laserThinRed: 'images/laser-thin-red.png',
    laserThickYellow: 'images/laser-thick-yellow.png',
    laserThickPurple: 'images/laser-thick-purple.png',
    laserThickBlue: 'images/laser-thick-blue.png'
};

var LASER_IMAGE_NAME = {
    laserThinRed: 'laser_thin_red',
    laserThickYellow: 'laser_thick_yellow',
    laserThickPurple: 'laser_thick_purple',
    laserThickBlue: 'laser_thick_blue',
    laserThinRedEnd: 'laser_thin_red_end',
    laserThickYellowEnd: 'laser_thick_yellow_end',
    laserThickPurpleEnd: 'laser_thick_purple_end',
    laserThickBlueEnd: 'laser_thick_blue_end'
};

var P2P_IMAGE_NAME = {
    shotCannon: 'shot_cannon',
    shotGreen: 'shot_green',
    shotRed: 'shot_red',
    shotIce: 'shot_ice',
    shotNormal: 'shot_normal'
};

var HOMING_IMAGE_NAME = {
    rocketBlue: 'rocket_blue',
    rocketBlueSmall: 'rocket_blue_small',
    rocketRed: 'rocket_red',
    rocketRedSmall: 'rocket_red_small'
};

var SPLASH_IMAGE_NAME = {
    auraBlue: 'aura_blue',
    auraRed: 'aura_red',
    auraGreen: 'aura_green',
};

var REZISTANCE = 1.00;
var BENEFIT_SHIELD = 2;
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

var CANNON_SOUND = 'cannon';
var ELECTRIC_SOUND = 'electric';
var LASER_SOUND = 'laser';
var SPRAY_SOUND = 'spray';
var SHOT_SOUND1 = 'shot-01';
var SHOT_SOUND2 = 'shot-02';

var TOWER_MACHINEGUN = 'MachineGunTower';
var MG_DAMAGE = [25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var MG_RATE = 5;
var MG_RANGE = 100;
var MG_SPREADING = 0;
var MG_TTL = 100;
var MG_PRICE = 100;
var MG_UPGRADE_PRICE = 50;
var MG_RATE_2 = 6;
var MG_RANGE_2 = 150;
var MG_DAMAGE_2 = [30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var MG_RATE_3 = 8;
var MG_RANGE_3 = 200;
var MG_DAMAGE_3 = [50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var MG_FRAME_RATE = 5;
var MG_AIM_STYLE = 'ClosestAim';

var TOWER_CANNON = 'CannonTower';
var C_DAMAGE = [80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var C_RATE = 2;
var C_RANGE = 150;
var C_SPREADING = 0;
var C_TTL = 100;
var C_PRICE = 200;
var C_UPGRADE_PRICE = 50;
var C_RATE_2 = 4;
var C_RANGE_2 = 170;
var C_DAMAGE_2 = [90, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var C_RATE_3 = 6;
var C_RANGE_3 = 200;
var C_DAMAGE_3 = [95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var C_FRAME_RATE = 1;
var C_AIM_STYLE = 'FurthestAim';

var TOWER_FLAMETHROWER = 'FlamethrowerTower';
var FT_DAMAGE = [0, 5, 0, 0, 0, 3, 1, 3, 0, 0, 0];
var FT_RATE = 5;
var FT_RANGE = 100;
var FT_SPREADING = 50;
var FT_TTL = 100;
var FT_PRICE = 200;
var FT_UPGRADE_PRICE = 50;
var FT_RATE_2 = 6;
var FT_RANGE_2 = 150;
var FT_DAMAGE_2 = [0, 10, 0, 0, 0, 5, 1, 5, 0, 0, 0];
var FT_RATE_3 = 8;
var FT_RANGE_3 = 200;
var FT_DAMAGE_3 = [0, 15, 0, 0, 0, 5, 1, 10, 0, 0, 0];
var FT_FRAME_RATE = 10;
var FT_AIM_STYLE = 'ClosestAim';

var TOWER_ICE_DART = 'IceDartTower';
var ID_DAMAGE = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0.5, 0.5];
var ID_RATE = 1;
var ID_RANGE = 100;
var ID_TTL = 100;
var ID_PRICE = 200;
var ID_UPGRADE_PRICE = 50;
var ID_RATE_2 = 2;
var ID_RANGE_2 = 150;
var ID_DAMAGE_2 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0.75, 0.5];
var ID_RATE_3 = 3;
var ID_RANGE_3 = 200;
var ID_DAMAGE_3 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1];
var ID_FRAME_RATE = 1;
var ID_AIM_STYLE = 'MostHealthAim';

var TOWER_BEAM_LASER = 'BeamLaserTower';
var L_DAMAGE = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
var L_RATE = 1;
var L_RANGE = 200;
var L_TTL = 100;
var L_PRICE = 200;
var L_UPGRADE_PRICE = 50;
var L_RATE_2 = 2;
var L_RANGE_2 = 210;
var L_DAMAGE_2 = [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0];
var L_RATE_3 = 3;
var L_RANGE_3 = 220;
var L_DAMAGE_3 = [0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0];
var L_FRAME_RATE = 5;
var L_AIM_STYLE = 'ClosestAim';

var TOWER_CHAIN_LASER = 'ChainLaserTower';
var CHL_CHAIN = 2;
var CHL_DAMAGE = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0];
var CHL_RATE = 2;
var CHL_RANGE = 120;
var CHL_TTL = 40;
var CHL_PRICE = 300;
var CHL_UPGRADE_PRICE = 50;
var CHL_RATE_2 = 6;
var CHL_RANGE_2 = 150;
var CHL_DAMAGE_2 = [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0];
var CHL_RATE_3 = 8;
var CHL_RANGE_3 = 200;
var CHL_DAMAGE_3 = [0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0];
var CHL_FRAME_RATE = 5;
var CHL_CHAIN_2 = 3;
var CHL_CHAIN_3 = 4;
var CHL_AIM_STYLE = 'MostHealthAim';

var TOWER_HOMING_MISSILE = 'HomingMissileTower';
var HM_DAMAGE = [100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var HM_RATE = 5;
var HM_RANGE = 300;
var HM_TTL = 300;
var HM_PRICE = 500;
var HM_CURVING = 30;
var HM_UPGRADE_PRICE = 50;
var HM_RATE_2 = 6;
var HM_RANGE_2 = 350;
var HM_DAMAGE_2 = [120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var HM_RATE_3 = 8;
var HM_RANGE_3 = 400;
var HM_DAMAGE_3 = [140, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var HM_FRAME_RATE = 1;
var HM_AIM_STYLE = 'MostHealthAim';

var TOWER_ELECTRIC_AURA = 'ElectricAuraTower';
var EA_DAMAGE = [10, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0];
var EA_RATE = 10;
var EA_TTL = 100;
var EA_PRICE = 300;
var EA_GROWTH = 100;
var EA_RADIUS = 100;
var EA_UPGRADE_PRICE = 50;
var EA_RATE_2 = 11;
var EA_RADIUS_2 = 150;
var EA_GROWTH_2 = 150;
var EA_DAMAGE_2 = [12, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0];
var EA_RATE_3 = 12;
var EA_RADIUS_3 = 200;
var EA_GROWTH_3 = 200;
var EA_DAMAGE_3 = [15, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0];
var EA_FRAME_RATE = 1;

var TOWER_SLOW_AURA = 'SlowAuraTower';
var SA_DAMAGE = [0, 0, 0, 0, 0, 1, 1, 1, 0.3, 1, 0.1];
var SA_RATE = 10;
var SA_TTL = 100;
var SA_PRICE = 300;
var SA_GROWTH = 100;
var SA_RADIUS = 100;
var SA_UPGRADE_PRICE = 50;
var SA_RATE_2 = 11;
var SA_RADIUS_2 = 150;
var SA_GROWTH_2 = 150;
var SA_DAMAGE_2 = [0, 0, 0, 0, 0, 1, 1, 1, 0.5, 1, 0.1];
var SA_RATE_3 = 12;
var SA_RADIUS_3 = 200;
var SA_GROWTH_3 = 200;
var SA_DAMAGE_3 = [0, 0, 0, 0, 0, 1, 1, 3, 0.6, 1, 0.1];
var SA_FRAME_RATE = 1;

var TOWER_IMAGE_ARRAY = {MachineGunTower:['images/cat.gif'], CannonTower:['images/cat.gif'], 
            FlamethrowerTower:['images/cat.gif'], IceDartTower:['images/cat.gif'],
            BeamLaserTower:['images/cat.gif'], ChainLaserTower:['images/cat.gif'],
            HomingMissileTower:['images/cat.gif'], ElectricAuraTower:['images/cat.gif'],
            SlowAuraTower:['images/cat.gif']};

var TOWER_BRAIN = 'TowerBrainComp';

var TOWER_IMAGE_NAME = {
    machineGunBody: 'body_02',
    machineGunHead: 'head_02',
    cannonBody: 'body_01',
    cannonHead: 'head_01',
    flamethrowerBody: 'body_04',
    flamethrowerHead: 'head_04',
    iceDartBody: 'cat',
    iceDartHead: 'cat',
    beamLaserBody: 'body_03',
    beamLaserHead: 'head_03',
    chainLaserBody: 'body_05',
    chainLaserHead: 'head_05',
    homingMissileBody: 'cat',
    homingMissileHead: 'cat',
    electricAuraBody: 'body_06',
    slowAuraBody: 'cat'
};

//tower bilder
var TOWER_BUILDER = "towerBuilderComp";

/**********
 * AIMING *
 **********
 */

var AIMING_MOST_HEALTH = 'MostHealthAim';
var AIMING_LEAST_HEALTH = 'LeastHealthAim';
var AIMING_CLOSEST = 'ClosestAim';
var AIMING_FURTHEST = 'FurthestAim';

/********************
 * PLAYER CONSTANTS *
 ********************
 */
//players
var PLAYER_ABS = 'AbstractPlayer';
var PLAYER_DEBUG = 'DebugPlayer';
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

//walking
var WALK_UP = "walkUp";
var WALK_DOWN = "walkDown";
var WALK_LEFT = "walkLeft";
var WALK_RIGHT = "walkRight";

//sounds
var PLAYER_STEP_SOUND = "step";

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

//others
var LAST_STEPS_COUNT = 3;
var LEVEL_UP_TEXT = "Your level was increased!";
var AVAILABLE_POINTS_TEXT = "Your free points: ";
var PLAYER_LASER_IMAGE = "images/laser-01.png";

/************************
 * GAME PANEL CONSTANTS *
 ************************
 */
//panel components
var GAME_PANEL_COMPONENT = "gamePanelComp";
var GAME_PANEL_CONTENT = "gamePanelContent";

//panel properties
var PANEL_WIDTH = 5*32;
var PANEL_BG_COLOR = "#888888";


/********************************
 * LOCAL STORAGE DATA CONSTANTS *
 ********************************
 */
//player parts
var PLAYER_DAMAGE = "_Damage";
var PLAYER_RANGE = "_Range";

/*******************
 * GENERAL STORAGE *
 *******************
 */
var PLAYER_MONEY = "playerMoney";
var PLAYER_START_MONEY_PACK = 1000;
var MAX_OPENED_LEVEL = "maxOpenedLevel";
var BEST_SCORE_LEVEL1 = "bestScoreLevel1";
var BEST_SCORE_LEVEL2 = "bestScoreLevel2";
var BEST_SCORE_LEVEL3 = "bestScoreLevel3";
var BEST_SCORE_LEVEL4 = "bestScoreLevel4";
var BEST_SCORE_LEVEL5 = "bestScoreLevel5";

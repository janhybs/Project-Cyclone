/***************
 * GAME SCENES *
 ***************
 */
//scenes
var SCENE_GAME = 'game';
var SCENE_MENU = 'menu';
var SCENE_LOADING = 'loading';

//debug scenes
var SCENE_P2P_TEST = 'p2p-test';
var SCENE_LASER_TEST = 'laser-test';
var SCENE_HOMING_TEST = 'homing-test';
var SCENE_SPLASH_TEST = 'splash-test';
var SCENE_P2P_TOWER_TEST = 'tower-p2p-test';
var SCENE_ENEMY_TEST = 'enemy-test';

//events
var SCENE_MOUSE_CLICK_EVENT = "sceneMouseClickEvent";

/***********
 * ENEMIES *
 ***********
 */
var ENEMY_ABS = 'enemyAbstract';
var ENEMY_SIMPLE = 'enemySimple';

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
var DEFAULT_PRICE = 100;
var MAX_LEVEL = 5;

var TOWER_MACHINEGUN = 'MachineGunTower';
var MG_DAMAGE = [1, 0, 0, 0];
var MG_OUTPUT_DAMAGE = 10;
var MG_RATE = 10;
var MG_RANGE = 25;
var MG_PRICE = 100;

/********************
 * PLAYER CONSTANTS *
 ********************
 */
//players
var PLAYER_ABS = 'AbstractPlayer';
var PLAYER_DEBUG = 'DebugPlayer';

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

//others
var LAST_STEPS_COUNT = 3;
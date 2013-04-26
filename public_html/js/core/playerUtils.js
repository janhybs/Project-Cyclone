window.PlayerUtils = {};

PlayerUtils.newGameInitialize = function(nameGunPlayer, nameLaserPlayer) {
    localStorage[GUN_PLAYER_NAME] = nameGunPlayer;
    localStorage[GUN_PLAYER_NAME] = nameGunPlayer;
    localStorage[LASER_PLAYER_NAME] = nameLaserPlayer;
    localStorage[ACTIVE_PLAYER] = GUN_PLAYER;
    localStorage[GUN_PLAYER_EXPS] = 0;
    localStorage[GUN_PLAYER_LEVEL] = 1;
    localStorage[GUN_PLAYER_AVAILABLE_POINTS] = 0;
    localStorage[GUN_PLAYER_USED_POINTS] = 0;
    localStorage[LASER_PLAYER_EXPS] = 0;
    localStorage[LASER_PLAYER_LEVEL] = 1;
    localStorage[LASER_PLAYER_AVAILABLE_POINTS] = 0;
    localStorage[LASER_PLAYER_USED_POINTS] = 0;
};
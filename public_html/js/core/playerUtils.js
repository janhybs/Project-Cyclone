window.PlayerUtils = {};

//new game init
PlayerUtils.newGameInitialize = function(nameGunPlayer, nameLaserPlayer) {
    $.jStorage.set(GUN_PLAYER_NAME, nameGunPlayer);
    $.jStorage.set(LASER_PLAYER_NAME, nameLaserPlayer);
    $.jStorage.set(ACTIVE_PLAYER, GUN_PLAYER);
    $.jStorage.set(GUN_PLAYER_EXPS, 0);
    $.jStorage.set(GUN_PLAYER_LEVEL, 1);
    $.jStorage.set(GUN_PLAYER_DAMAGE, 1);
    $.jStorage.set(GUN_PLAYER_RANGE, 1);
    $.jStorage.set(LASER_PLAYER_EXPS, 0);
    $.jStorage.set(LASER_PLAYER_LEVEL, 1);
    $.jStorage.set(LASER_PLAYER_DAMAGE, 1);
    $.jStorage.set(LASER_PLAYER_RANGE, 1);
};

//method returns actualLevel of actual player
PlayerUtils.getActualLevel = function() {
    if($.jStorage.get(ACTIVE_PLAYER) === GUN_PLAYER) {
        return $.jStorage.get(GUN_PLAYER_LEVEL);            
    } else {
        return $.jStorage.get(LASER_PLAYER_LEVEL);
    }
};

//method returns actualLevel by player type
PlayerUtils.getActualLevelByPlayerType = function(type) {
    if(type === GUN_PLAYER) {
        return $.jStorage.get(GUN_PLAYER_LEVEL);            
    } else {
        return $.jStorage.get(LASER_PLAYER_LEVEL);
    }
};

//method returns name of actual player
PlayerUtils.getActualName = function() {
    if($.jStorage.get(ACTIVE_PLAYER) === GUN_PLAYER) {
        return $.jStorage.get(GUN_PLAYER_NAME);            
    } else {
        return $.jStorage.get(LASER_PLAYER_NAME);
    }
};

//method adds one damage point of actual player
PlayerUtils.addDamagePoint = function() {
        if($.jStorage.get(ACTIVE_PLAYER) === GUN_PLAYER) {
            $.jStorage.set(GUN_PLAYER_DAMAGE, $.jStorage.get(GUN_PLAYER_DAMAGE) + 1);            
    } else {
            $.jStorage.set(LASER_PLAYER_DAMAGE, $.jStorage.get(LASER_PLAYER_DAMAGE) + 1);
    }
};

//method adds one range point of actual player
PlayerUtils.addRangePoint = function() {
        if($.jStorage.get(ACTIVE_PLAYER) === GUN_PLAYER) {
            $.jStorage.set(GUN_PLAYER_RANGE, $.jStorage.get(GUN_PLAYER_RANGE) + 1);            
    } else {
            $.jStorage.set(LASER_PLAYER_RANGE, $.jStorage.get(LASER_PLAYER_RANGE) + 1);
    }
};

//method gets range of actual player
PlayerUtils.getRangePoints = function() {
    if($.jStorage.get(ACTIVE_PLAYER) === GUN_PLAYER) {
        return $.jStorage.get(GUN_PLAYER_RANGE);            
    } else {
        return $.jStorage.get(LASER_PLAYER_RANGE);
    }
};

//method gets damage of actual player
PlayerUtils.getDamagePoints = function() {
    if($.jStorage.get(ACTIVE_PLAYER) === GUN_PLAYER) {
        return $.jStorage.get(GUN_PLAYER_DAMAGE);            
    } else {
        return $.jStorage.get(LASER_PLAYER_DAMAGE);
    }
};
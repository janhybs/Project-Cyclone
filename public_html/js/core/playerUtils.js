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
    $.jStorage.set(PLAYER_MONEY, PLAYER_START_MONEY_PACK);
    $.jStorage.set(MAX_OPENED_LEVEL, 1);
    $.actualLevel = 1;
    //best scores
    for(var i = 1; i <=5; i++) {
        $.jStorage.set(window['BEST_SCORE_LEVEL'+i], 0);
    }
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

//method gets money player
PlayerUtils.getPlayerMoney = function() {
    return $.jStorage.get(PLAYER_MONEY);
};

//method adds one range point of actual player
PlayerUtils.addPlayerMoney = function(money) {
    PlayerUtils.setPlayerMoney (PlayerUtils.getPlayerMoney () + money);
};

//method sets money
PlayerUtils.setPlayerMoney = function(money) {
    $.jStorage.set(PLAYER_MONEY, money);
    if (moneyChanged) moneyChanged ();
};

//method gets damage of actual player
PlayerUtils.getDamagePoints = function() {
    if($.jStorage.get(ACTIVE_PLAYER) === GUN_PLAYER) {
        return $.jStorage.get(GUN_PLAYER_DAMAGE);            
    } else {
        return $.jStorage.get(LASER_PLAYER_DAMAGE);
    }
};

//method increases level of actual player
PlayerUtils.increaseLevel = function() {
    if($.jStorage.get(ACTIVE_PLAYER) === GUN_PLAYER) {
            $.jStorage.set(GUN_PLAYER_LEVEL, $.jStorage.get(GUN_PLAYER_LEVEL) + 1);            
    } else {
            $.jStorage.set(LASER_PLAYER_LEVEL, $.jStorage.get(LASER_PLAYER_LEVEL) + 1);
    }
};

//method gets max open level
PlayerUtils.getMaxOpenLevel = function() {
    return $.jStorage.get(MAX_OPENED_LEVEL);
};

//method gets max open level
PlayerUtils.openNextLevel = function() {
    return $.jStorage.set(MAX_OPENED_LEVEL, $.jStorage.get(MAX_OPENED_LEVEL) + 1);
};

//method gets best score for level
PlayerUtils.getBestScoreByLevel = function(level) {
    return $.jStorage.get(window['BEST_SCORE_LEVEL'+level]);
};

//method sets best score for level
PlayerUtils.setBestScoreByLevel = function(level, score) {
    return $.jStorage.set(window['BEST_SCORE_LEVEL'+level], score);
};

//method gets player name by player type
PlayerUtils.getPlayerNameByType = function(type) {
    if(type === PLAYER_SOLDIER) {
        return $.jStorage.get(GUN_PLAYER_NAME);
    } else {
        return $.jStorage.get(LASER_PLAYER_NAME);
    }
};

//method changes actuall player
PlayerUtils.setActualPlayer = function(type) {
    return $.jStorage.set(ACTIVE_PLAYER, type);
};

//method gets actuall player
PlayerUtils.getActualPlayer = function() {
    return $.jStorage.get(ACTIVE_PLAYER);
};

//method gets actuall player type (laser or soldier)
PlayerUtils.getActualPlayerType = function() {
    if($.jStorage.get(ACTIVE_PLAYER) === GUN_PLAYER)
        return PLAYER_SOLDIER;
    else
        return PLAYER_LASER;
};
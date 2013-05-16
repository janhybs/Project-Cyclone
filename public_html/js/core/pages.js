var towerInfo;
var towerMenu;
var infoName;
var infoDamage;
var infoRange;
var infoRate;
var infoPrice;
var towerUpgrade;
var towerUpgradeDisabled;
var towerDelete;
var gamePause;
var gameResume;
var nextWave;
var nextWaveDisabled;
var turbo;

var currentMoney;
var targetMoney;

$.selectedTower = undefined;

var items = {
    machineGun: [TOWER_MACHINEGUN, TOWER_MACHINEGUN_PROPS],
    flame: [TOWER_FLAMETHROWER, TOWER_FLAMETHROWER_PROPS],
    laserGun: [TOWER_BEAM_LASER, TOWER_BEAM_LASER_PROPS],
    homingGun: [TOWER_HOMING_MISSILE, TOWER_HOMING_MISSILE_PROPS],
    cannon: [TOWER_CANNON, TOWER_CANNON_PROPS],
    electricAura: [TOWER_ELECTRIC_AURA, TOWER_ELECTRIC_AURA_PROPS],
    laserChain: [TOWER_CHAIN_LASER, TOWER_CHAIN_LASER_PROPS],
    iceDart: [TOWER_ICE_DART, TOWER_ICE_DART_PROPS],
    slowAura: [TOWER_SLOW_AURA, TOWER_SLOW_AURA_PROPS],
};


function loadDivs () {
    towerInfo = $ ('#towerInfo');
    towerMenu = $ ('#towerMenu');
    infoName = $ ('#infoName');
    infoDamage = $ ('#infoDamage');
    infoRange = $ ('#infoRange');
    infoRate = $ ('#infoRate');
    infoPrice = $ ('#infoPrice');

    towerUpgrade = $ ('#towerUpgrade');
    towerUpgradeDisabled = $ ('#towerUpgradeDisabled');
    towerDelete = $ ('#towerDelete');

    gamePause = $ ('#gamePause');
    gameResume = $ ('#gameResume');
    nextWave = $ ('#nextWave');
    nextWaveDisabled = $ ('#nextWaveDisabled');
    turbo = [$ ('#x1'), $ ('#x2'), $ ('#x3'), $ ('#x4')];
}

function bindActions () {
    loadDivs ();
    gameResume.hide ();
    nextWaveDisabled.hide ();
    towerInfo.hide ();
    towerMenu.hide ();
    turbo.forEach (hide);
    turbo.forEach (function (e) {
        e.bind ('click', cycleTurbo)
    });
    turbo[skipper.frameSkip].show ();

    towerUpgradeDisabled.hide ();
    towerUpgrade.bind ('click', upgradeSelectedTower);
    towerDelete.bind ('click', deleteSelectedTower);
    gamePause.bind ('click', pauseGame);
    gameResume.bind ('click', pauseGame);
    nextWave.bind ('click', startNextWave);

    for (var p in items) {
        var e = $ ('#{0}'.format (p));
        e.bind ('click', p, function (event) {
            if ($.toverBuilderLock || Crafty.isPaused ())
                return;
            var p = event.data;

            if (PlayerUtils.getPlayerMoney () >= items[p][1].price)
                towerBuilder.create (items[p][0]);
            towerInfo.show ();
            towerMenu.hide ();

            showInfo ('{0} (lvl{1})'.format (getTowerName (items[p][0]), 1),
                    getDamageSum (items[p][1].damage1),
                    items[p][1].range1,
                    items[p][1].rate1,
                    items[p][1].price
                    );
        });
        e.bind ('mouseover', p, function (event) {
            if ($.toverBuilderLock || Crafty.isPaused ())
                return;
            removeTowerRangeInfo ();
            var p = event.data;

            towerInfo.show ();
            towerMenu.hide ();

            showInfo ('{0} (lvl {1})'.format (getTowerName (items[p][0]), 1),
                    getDamageSum (items[p][1].damage1),
                    items[p][1].range1,
                    items[p][1].rate1,
                    items[p][1].price);
        });
        e.bind ('mouseout', function (event) {
            if ($.toverBuilderLock || Crafty.isPaused ())
                return;
            towerInfo.hide ();
            towerMenu.hide ();
        });
    }
}

function hide (e) {
    e.hide ();
}

function cycleTurbo () {
    var skip = skipper.frameSkip;
    skip = ++skip >= 4 ? 0 : skip;
    skipper.skip (skip);
    turbo.forEach (hide);
    turbo[skipper.frameSkip].show ();
}

function pauseGame () {
    Crafty.pause ();
    if (Crafty.isPaused ()) {
        gameResume.show ();
        gamePause.hide ();
    } else {
        gameResume.hide ();
        gamePause.show ();
    }
}

function startNextWave () {
    generator.nextWave ();
}

function onWaveEndHandler () {
    nextWave.show ();
    nextWaveDisabled.hide ();

    currentMoney = PlayerUtils.getPlayerMoney ();
    targetMoney = currentMoney + (currentMoney > 500 ? 50 : currentMoney * 0.1);
    PlayerUtils.setPlayerMoney (targetMoney);
    $ (window).animate ({currentMoney: targetMoney}, {duration: 2000, progress: upgradeMoney});
}

function upgradeMoney () {
    $ ('#availableMoney').html (Math.floor (currentMoney));
}

function onWaveStartHandler () {
    nextWave.hide ();
    nextWaveDisabled.show ();
}

function showInfo (name, damage, range, rate, price) {
    loadDivs ();

    infoName.html (name);
    infoDamage.html (damage);
    infoRange.html (range);
    infoRate.html (rate);
    infoPrice.html (price);
}

function getDamageSum (dmg) {
    var ps = ['basic', 'fire', 'electric', 'poison', 'ice'];
    var sum = 0;
    for (var p in ps)
        sum += dmg[ps[p]];
    return sum;
}

function getTowerName (name) {
    return name.replace (/([A-Z])/g, " $1").replace (/Tower/g, "").trim ();

}

function towerClicked (tower) {
    if (Crafty.isPaused ())
        return;

    removeTowerRangeInfo ();
    showTowerRange (tower.getStartPoint ().x, tower.getStartPoint ().y, tower.getRange ());

    loadDivs ();

    towerInfo.show ();
    towerMenu.show ();

    $.selectedTower = tower;
    setupTowerActions ();

    showInfo ('{0} (lvl {1})'.format (getTowerName (tower.getType ()), tower.getLevel ()),
            getDamageSum (tower.getDamage ()),
            tower.getRange (),
            tower.getFrameRate (),
            tower.getUpgradePrice () * (tower.getLevel ()));

}

function setupTowerActions () {
    if ($.selectedTower === undefined)
        return;
    loadDivs ();

    if ($.selectedTower.getLevel () === 3) {
        towerUpgrade.hide ();
        towerUpgradeDisabled.show ();
    } else {
        towerUpgrade.show ();
        towerUpgradeDisabled.hide ();
    }
}

function upgradeSelectedTower () {
    if ($.selectedTower === undefined)
        return;

    var price = $.selectedTower.getLevel () * $.selectedTower.upgradePrice;
    if (buyStuff (price)) {
        $.selectedTower.upgrade ();
        towerClicked ($.selectedTower);
    }
}

function buyStuff (price) {
    if (PlayerUtils.getPlayerMoney () >= price) {
        //# upgrade money status
        PlayerUtils.addPlayerMoney (-price);
        refreshMoney ();
        return true;
    }
    return false;
}

function refreshMoney () {
    $ ('#availableMoney').html (PlayerUtils.getPlayerMoney ());
}

function deleteSelectedTower () {
    if ($.selectedTower === undefined)
        return;
    removeTowerRangeInfo ();
    PlayerUtils.addPlayerMoney (($.selectedTower.getPrice () + $.selectedTower.getUpgradePrice () * ($.selectedTower.getLevel () - 1)) / 2);
    refreshMoney ();
    $.selectedTower.doDestroy ();
    $.selectedTower = undefined;
    towerInfo.hide ();
    towerMenu.hide ();
}

function showTowerRange (pX, pY, r) {
    var x = pX + W / 2;
    var y = pY + H / 2;
    var range = r;
    $.towerRangeInfo = Crafty.e ("2D, Canvas, radius")
            .attr ({w: range * 2, h: range * 2, x: x - range, y: y - range, z: Z_TOWER_RANGE_INFO});
}

function removeTowerRangeInfo () {
    if ($.towerRangeInfo) {
        $.towerRangeInfo.destroy ();
        $.towerRangeInfo = false;
    }
}
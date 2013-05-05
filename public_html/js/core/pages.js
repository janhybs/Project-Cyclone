var towerInfo;
var towerMenu;
var infoName;
var infoDamage;
var infoRange;
var infoRate;
var towerUpgrade;
var towerDelete;
var wavePause;
var waveNext;

$.selectedTower = undefined;

var items = {
    machineGun: [TOWER_MACHINEGUN, "MG"],
    flame: [TOWER_FLAMETHROWER, "FT"],
    laserGun: [TOWER_BEAM_LASER, "L"],
    homingGun: [TOWER_HOMING_MISSILE, "HM"],
    cannon: [TOWER_CANNON, "C"],
    electricAura: [TOWER_ELECTRIC_AURA, "EA"],
    laserChain: [TOWER_CHAIN_LASER, "CHL"],
    iceDart: [TOWER_ICE_DART, "ID"],
    slowAura: [TOWER_SLOW_AURA, "SA"],
};


function loadDivs () {
    towerInfo = $ ('#towerInfo');
    towerMenu = $ ('#towerMenu');
    infoName = $ ('#infoName');
    infoDamage = $ ('#infoDamage');
    infoRange = $ ('#infoRange');
    infoRate = $ ('#infoRate');

    towerUpgrade = $ ('#towerUpgrade');
    towerDelete = $ ('#towerDelete');
    wavePause = $ ('#wavePause');
    waveNext = $ ('#waveNext');
}

function bindActions () {
    loadDivs ();
    towerInfo.hide ();
    towerMenu.hide ();

    towerUpgrade.bind ('click', upgradeSelectedTower);
    towerDelete.bind ('click', deleteSelectedTower);
    wavePause.bind ('click', pauseGame);
    waveNext.bind ('click', startNextWave);

    for (var p in items) {
        var e = $ ('#{0}'.format (p));
        e.bind ('click', p, function (event) {
            if ($.toverBuilderLock || Crafty.isPaused ())
                return;
            var p = event.data;

            towerBuilder.create (items[p][0]);
            towerInfo.show ();
            towerMenu.hide ();

            showInfo ('{0} (lvl{1})'.format (getTowerName (items[p][0]), 1),
                    getDamageSum (window["{0}_DAMAGE".format (items[p][1])]),
                    window["{0}_RANGE".format (items[p][1])],
                    window["{0}_RATE".format (items[p][1])]);
        });
        e.bind ('mouseover', p, function (event) {
            if ($.toverBuilderLock || Crafty.isPaused ())
                return;
            var p = event.data;

            towerInfo.show ();
            towerMenu.hide ();

            showInfo ('{0} (lvl {1})'.format (getTowerName (items[p][0]), 1),
                    getDamageSum (window["{0}_DAMAGE".format (items[p][1])]),
                    window["{0}_RANGE".format (items[p][1])],
                    window["{0}_RATE".format (items[p][1])]);
        });
        e.bind ('mouseout', function (event) {
            if ($.toverBuilderLock || Crafty.isPaused ())
                return;
            towerInfo.hide ();
            towerMenu.hide ();
        });
    }
}

function pauseGame () {
    Crafty.pause ();
}

function startNextWave () {
    generator.nextWave ();
}

function showInfo (name, damage, range, rate) {
    loadDivs ();

    infoName.html (name);
    infoDamage.html (damage);
    infoRange.html (range);
    infoRate.html (rate);
}

function getDamageSum (dmg) {
    var ps = ['basic', 'fire', 'electric', 'poison', 'ice'];
    var sum = 0;
    for (var p in ps)
        sum += dmg[p];
    return sum;
}

function getTowerName (name) {
    return name.replace (/([A-Z])/g, " $1").replace (/Tower/g, "").trim ();

}

function towerClicked (tower) {
    if (Crafty.isPaused ())
        return;
    loadDivs ();

    towerInfo.show ();
    towerMenu.show ();

    $.selectedTower = tower;
    setupTowerActions ();

    showInfo ('{0} (lvl {1})'.format (getTowerName (tower.getType ()), tower.getLevel ()),
            getDamageSum (tower.getDamage ()),
            tower.getRange (),
            tower.getRate ());
}

function setupTowerActions () {
    if ($.selectedTower === undefined)
        return;
    loadDivs ();

    if ($.selectedTower.getLevel () === 3)
        towerUpgrade.hide ();
    else
        towerUpgrade.show ();
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
        $ ('#availableMoney').html (PlayerUtils.getPlayerMoney ());
        return true;
    }
    return false;
}

function deleteSelectedTower () {
    if ($.selectedTower === undefined)
        return;

    $.selectedTower.doDestroy ();
    $.selectedTower = undefined;
    towerInfo.hide ();
    towerMenu.hide ();
}
var towerInfo;
var towerMenu;
var infoName;
var infoDamage;
var infoRange;
var infoRate;

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
}

function bindActions () {
    loadDivs ();

    for (var p in items) {
        var e = $ ('#{0}'.format (p));
        e.bind ('click', p, function (event) {
            if ($.toverBuilderLock)
                return;
            var p = event.data;

            towerBuilder.create (items[p][0]);
            towerInfo.show ();
            towerMenu.hide ();

            showInfo (getTowerName (items[p][0]),
                    getDamageSum (window["{0}_DAMAGE".format (items[p][1])]),
                    window["{0}_RANGE".format (items[p][1])],
                    window["{0}_RATE".format (items[p][1])]);
        });
        e.bind ('mouseover', p, function (event) {

            if ($.toverBuilderLock)
                return;
            var p = event.data;

            towerInfo.show ();
            towerMenu.hide ();

            showInfo (getTowerName (items[p][0]),
                    getDamageSum (window["{0}_DAMAGE".format (items[p][1])]),
                    window["{0}_RANGE".format (items[p][1])],
                    window["{0}_RATE".format (items[p][1])]);
        });
        e.bind ('mouseout', function (event) {
            if ($.toverBuilderLock)
                return;
            towerInfo.hide ();
            towerMenu.hide ();
        });
    }
}

function showInfo (name, damage, range, rate) {
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
    return name.replace (/([A-Z])/g, " $1").trim ();
}

function towerClicked (tower) {
    alert ('klikátor');
}
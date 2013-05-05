window.PlayerLoader = {};

//method for load player with actual player params
PlayerLoader.load = function () {
    window.pl = player.create (PlayerUtils.getActualPlayerType ());
    pl.shotDamage = PLAYER_DAMAGES[PlayerUtils.getDamagePoints ()];
    pl.rangePointer.setDiameter (PLAYER_RANGES[PlayerUtils.getRangePoints ()] / 32.0 * 2);
    return pl;
};
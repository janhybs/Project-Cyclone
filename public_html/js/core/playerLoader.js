window.PlayerLoader = {};

//method for load player with actual player params
PlayerLoader.load = function() {
    var pl = player.create(PlayerUtils.getActualPlayerType());
    pl.shotDamage = PlayerUtils.getDamagePoints();
    pl.rangePointer.setDiameter(PlayerUtils.getRangePoints()*3); //*3 for debug
    return pl;
};
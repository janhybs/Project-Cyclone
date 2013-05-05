



window.generator = {
    //-------------------------
    start: function (data, levelPaths) {
        this.timer = Crafty.e ('Framer');
        this.xmlData = data;
        this.i = 0;
        this.paths = [];
        for (var i = 0; i < levelPaths.length; i++) {
             this.paths.push (enlargePath (levelPaths[i]));
        }
        this.nextWave (0);
        
    },
    nextWave: function (i) {
//    for (var w in xmlData.waves.wave) {
//    for (var j in xmlData.waves.wave[i][j]) {
        timer.repeat (function () {
            timer.repeat (function () {
                for (var j = 0; j < this.paths.length; j++) {
                    enemy.create ({
                        path: this.paths[j], speed: ENEMY_SPEED.lighbolt, shield: ENEMY_SHIELD.boss, wobble: ENEMY_WOBBLE.no
                    }).requires ('HealthBar').start ();
                }
            },
                    this.xmlData.waves.wave[i].item[0].frame, this,
                    this.xmlData.waves.wave[i].item[0].count);
        },
                this.xmlData.waves.wave[i].item[0].delay, this,
                this.xmlData.waves.wave[i].item[0].repeat);
    }


};





//nextWave: function (i) {
////    for (var w in xmlData.waves.wave) {
////    for (var j in xmlData.waves.wave[i][j]) {
//console.log (xmlData.waves.wave[i][0]);
//        timer.repeat (function () {
//console.log ('ted');
//}, xmlData.waves.wave[i][0].repeat);
//}
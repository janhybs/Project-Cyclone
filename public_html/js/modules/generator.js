

$.enemyCount = 0;
$.buildPhase = function () {
    return $.enemyCount === 0;
}

window.generator = {
    //-------------------------
    start: function (data, levelPaths) {
        this.watchDogID = timer.repeat (function () {
            if (!$.gameOver && Crafty (ENEMY_ABS).length === 0 && this.everythingReleased) {
                $.gameOver = true;
                timer.clearTimer (this.watchDogID);
                Crafty.trigger (GAME_END, $.livesTotal - $.livesLeft);
            }
        }, 25, this);
        this.xmlData = data;
        this.i = 0;
        this.paths = [];
        this.currentWave = -1;
        this.currentPart = -1;
        this.autoPlay = false;
        this.totalWaves = this.xmlData.waves.wave.length;
        this.everythingReleased = false;
        $.enemyCount = 0;

        Crafty.bind ('Death', function () {
            $.enemyCount--;
        });

        for (var i = 0; i < levelPaths.length; i++)
            this.paths.push (enlargePath (levelPaths[i]));

        var items = [];
        for (var i = 0; i < this.xmlData.waves.wave[0].item.length; i++) {
            var o = JSON.parse (this.xmlData.waves.wave[0].item[i].generator);
            items.push ({image: o.image, shield: o.shield, size: o.size});
        }
        onWaveEndHandler (items);
    },
    nextWave: function () {
        //# end round
        if (!this.incWave ())
            return;
        this.nextPart ();
        onWaveStartHandler ();
    },
    nextPart: function () {
        //# end wave
        if (!this.incPart ()) {
            if (this.currentWave + 1 === this.totalWaves)
                this.everythingReleased = true;

            if (this.xmlData.waves.wave[this.currentWave + 1]) {
                var items = [];
                for (var i = 0; i < this.xmlData.waves.wave[this.currentWave + 1].item.length; i++) {
                    var o = JSON.parse (this.xmlData.waves.wave[this.currentWave + 1].item[i].generator);
                    items.push ({image: o.image, shield: o.shield, size: o.size});
                }
            }

            onWaveEndHandler (items);

            if (this.autoPlay)
                this.nextWave ();
            return;
        }

        var o = this.xmlData.waves.wave[this.currentWave].item[this.currentPart];
        var oGenerator = enemy.parse (JSON.parse (o.generator));
        var oRepeat = Number (o.repeat || 1);
        var oDelay = Number (o.delay || 1);
        var oCount = Number (o.count || 1);
        var oFrame = Number (o.frame || 1);
        var oPause = Number (o.pause || 1);

        timer.repeat (function () {
            for (var s = 0; s < oCount; s++) {
                timer.delay (function () {
                    for (var j = 0; j < this.paths.length; j++) {
                        enemy.create (oGenerator).requires ('HealthBar')
                                .setPath (this.paths[j])
                                .start ();
                    }
                }, 1 + s * oFrame, this);
            }
        }, oDelay + oFrame * oCount, this, oRepeat, oPause);

        $.enemyCount += oCount * oRepeat;


        timer.delay (function () {
            this.nextPart ();
        }, (oCount * oFrame + oDelay) * oRepeat, this);
    },
    incWave: function () {
        this.currentPart = -1;
        return ++this.currentWave < this.xmlData.waves.wave.length;
    },
    incPart: function () {
        return ++this.currentPart < this.xmlData.waves.wave[this.currentWave].item.length;
    }
};

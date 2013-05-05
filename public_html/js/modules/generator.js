



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
        this.autoPlay = true;
        this.totalWaves = this.xmlData.waves.wave.length;
        this.everythingReleased = false;

        for (var i = 0; i < levelPaths.length; i++)
            this.paths.push (enlargePath (levelPaths[i]));
    },
    nextWave: function () {
        //# end round
        if (!this.incWave ())
            return;
        this.nextPart ();
    },
    nextPart: function () {
        //# end wave
        if (!this.incPart ()) {
            if (this.currentWave + 1 === this.totalWaves) {
                this.everythingReleased = true;
            }

            if (this.autoPlay)
                this.nextWave ();
            return;
        }

        var o = this.xmlData.waves.wave[this.currentWave].item[this.currentPart];
        timer.repeat (function () {
            timer.repeat (function () {
                var generator = enemy.parse (JSON.parse (o.generator));
                generator.speed = 40;
                for (var j = 0; j < this.paths.length; j++) {
                    enemy.create (generator).requires ('HealthBar')
                            .setPath (this.paths[j])
                            .start ();
                }
            }, o.frame, this, o.count);
        }, o.delay, this, o.repeat);

        var partTime = (Number (o.count) * Number (o.frame) + Number (o.delay)) * Number (o.repeat);

        timer.delay (function () {
            this.nextPart ();
        }, partTime, this);
    },
    incWave: function () {
        this.currentPart = -1;
        return ++this.currentWave < this.xmlData.waves.wave.length;
    },
    incPart: function () {
        return ++this.currentPart < this.xmlData.waves.wave[this.currentWave].item.length;
    }
};

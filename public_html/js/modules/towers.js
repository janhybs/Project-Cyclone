window.tower = {
    get: function(type) {
        switch (type) {
            case TOWER_MACHINEGUN:
                return Crafty.e('2D, Canvas, Image, {0}, {1}, {2}, portal'.format(TOWER_ABS, TOWER_P2P, type))
                        .attr({w: W, h: H});
                /*
                 return Crafty.e('2D, Canvas, Image, {0}, {1}, P2P'.format(TOWER_ABS, type))
                 .attr({w: W, h: H});
                 */
        }
    }
};


Crafty.c(TOWER_ABS, {
    abstractCreate: function(startPoint, damage, outputDamage, rate, range, price) {
        this.startPoint = toPoint(startPoint);
        this.damage = damage !== undefined ? damage : toDamage(0);
        this.rate = rate !== undefined ? rate : NaN;
        this.range = range !== undefined ? range : NaN;
        this.outputDamage !== undefined ? outputDamage : NaN;
        this.level = 1;
        this.price = price !== undefined ? price : DEFAULT_PRICE;
    },
    init: function() {
        this.startPoint = null;
    },
    //#
    getStartPoint: function() {
        return this.startPoint;
    },
    setStartPoint: function(value) {
        this.startPoint = toPoint(value);
        this.x = this.startPoint.x;
        this.y = this.startPoint.y;
        return this;
    },
    //#
    getDamage: function() {
        return this.damage;
    },
    setDamage: function(damage) {
        this.damage = toDamage(damage);
        return this;
    },
    //#
    getOutputDamage: function() {
        return this.outputDamage;
    },
    setOutputDamage: function(outputDamage) {
        this.outputDamage = toDamage(outputDamage);
        return this;
    },
    //#
    getRate: function() {
        return this.rate;
    },
    setRate: function(rate) {
        this.rate = rate;
        return this;
    },
    //#
    getRange: function() {
        return this.range;
    },
    setRange: function(range) {
        this.range = range;
        return this;
    },
    //#
    getPrice: function() {
        return this.price;
    },
    setPrice: function(price) {
        this.price = price;
        return this;
    },
    //#
    getLevel: function() {
        return this.level;
    },
    setLevel: function(level) {
        this.level = level !== MAX_LEVEL ? level : MAX_LEVEL;
        return this;
    }
});


Crafty.c(TOWER_P2P, {
    abstractCreate: function(endPoint) {
        this.endPoint = toPoint(endPoint);
    },
    getEndPoint: function() {
        return this.endPoint;
    },
    setEndPoint: function(value) {
        this.endPoint = toPoint(value);
        return this;
    }
});

Crafty.c(TOWER_MACHINEGUN, {
    create: function() {
        this.damage = MG_DAMAGE;
        this.outputDamage = MG_OUTPUT_DAMAGE;
        this.rate = MG_RATE;
        this.range = MG_RANGE;
        this.price = MG_PRICE;
    },
    fire: function() {
        var s = shot.get(SHOT_P2P);
        s.setStartPoint([this.startPoint.x, this.startPoint.y]);
        s.setEndPoint([this.endPoint.x, this.endPoint.y]);
        s.setDamage(this.damage);
        s.setTTL(this.range);
        s.create(this.rate);
        s.start();
    },
    upgrade: function() {
        this.setLevel(this.level + 1);
    }
});

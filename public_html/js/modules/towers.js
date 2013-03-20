window.tower = {
    get: function (type) {
        switch (type) {
            case TOWER_P2P:
                return Crafty.e ('2D, Canvas, Image, {0}, {1}, portal'.format (TOWER_ABS, type))
                        .attr ({w: W, h: H});
                /*
                return Crafty.e('2D, Canvas, Image, {0}, {1}, P2P'.format(TOWER_ABS, type))
                        .attr({w: W, h: H});
                        */
        }
    }    
};


Crafty.c (TOWER_ABS, {
    abstractCreate: function(startPoint) {
        this.startPoint = toPoint(startPoint);
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
    }
});


Crafty.c (TOWER_P2P, {
    create: function(endPoint) {
        this.endPoint = toPoint(endPoint);
    },
    getEndPoint: function() {
        return this.endPoint;
    },
    setEndPoint: function(value) {
        this.endPoint = toPoint(value);
        return this;
    },
    shoot: function() {
            var s = shot.get(SHOT_P2P);
            s.setStartPoint([this.startPoint.x, this.startPoint.y]);
            s.setEndPoint([this.endPoint.x, this.endPoint.y]);
            s.create(10);
            s.start();
    }

});

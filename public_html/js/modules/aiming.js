/*** AIMING MODULE ***/

/*** Define as global object ***/
window.aiming = {
    get: function(type) {
        switch (type) {
            case AIMING_CLOSEST:
                return Crafty.e('AIMING_CLOSEST');
            case AIMING_FURTHEST:
                return Crafty.e('AIMING_FURTHEST');
            case AIMING_MOST_HEALTH:
                return Crafty.e('AIMING_MOST_HEALTH');
            case AIMING_LEAST_HEALTH:
                return Crafty.e('AIMING_LEAST_HEALTH');
        }
    }
};

/*** MISSING - LOC AIMING -> MOBS ID? ***/

/*** Component - closest mob ***/
Crafty.c(AIMING_CLOSEST, {
    getElement: function(elems, startPoint) {
        var minDistance = Number.MAX_VALUE;
        var element = 0;
        var tempDist;
        for (elem in elems) {
            tempDist = distance(elem, startPoint);
            if (tempDist < minDistance) {
                minDistance = tempDist;
                element = elem;
            }
        }
        return element;
    }
});

/*** Component - furthest mob ***/
Crafty.c(AIMING_FURTHEST, {
    getElement: function(elems, startPoint) {
        var maxDistance = Number.MIN_VALUE;
        var element = 0;
        var tempDist;
        for (elem in elems) {
            tempDist = distance(elem, startPoint);
            if (tempDist > maxDistance) {
                maxDistance = tempDist;
                element = elem;
            }
        }
        return element;
    }
});

/*** Component - most health mob ***/
Crafty.c(AIMING_MOST_HEALTH, {
    getElement: function(elems) {
        var maxHealth = Number.MIN_VALUE;
        var element = 0;
        var tempHealth;
        for (elem in elems) {
            tempHealth = elem.health + elem.shield;
            if (tempHealth > maxHealth) {
                maxHealth = tempHealth;
                element = elem;
            }
        }
        return element;
    }
});

/*** Component - least health mob ***/
Crafty.c(AIMING_LEAST_HEALTH, {
    getElement: function(elems) {
        var minHealth = Number.MAX_VALUE;
        var element = 0;
        var tempHealth;
        for (elem in elems) {
            tempHealth = elem.health + elem.shield;
            if (tempHealth < minHealth) {
                minHealth = tempHealth;
                element = elem;
            }
        }
        return element;
    }
});
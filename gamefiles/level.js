function mobloader(maxamount){
    var self = this;
    var counter = 0;
    self.currentlevel = 1;
    self.maxamount = rInt(1,4) * self.currentlevel;
    self.levels = maxamount.length;
    self.objective = maxamount[self.currentlevel - 1];
    self.amount = 0;
    self.aliveamount = 0;
    self.spawntype = 0;
    self.updatemobs = function(){
//Calder Likes Men//
        counter ++;
        if (self.amount > 0 && self.aliveamount <= 0){
            self.currentlevel += 1;
            self.objective = maxamount[self.currentlevel - 1];
            if (self.objective == 0){
                self.maxamount = rInt(1,4) * self.currentlevel;
            }
            counter = 0;
            self.amount = 0;
        }
        if (counter > 20 && self.amount < self.maxamount && self.objective == 0){
            self.spawntype = rInt(1,5);
            counter = 0;
            self.aliveamount += 1;
            self.amount += 1;
            if (self.spawntype == 1){
                var t = new enem(rInt(10, 400), rInt(-200, -50), rInt(0,3));
            }
            if (self.spawntype == 2){
                var t = new enem(rInt(650, 750), rInt(10,400), rInt(0,3));
            }
            if (self.spawntype == 3){
                var t = new enem(rInt(10, 400), rInt(550, 640), rInt(0,3));
            }
            if (self.spawntype == 4){
                var t = new enem(rInt(-200, -50), rInt(10,400), rInt(0,3));
            }
            enemies.push(t);
        }
        for (l = 0; l < enemies.length; l++){
            enemies[l].updatemob();
        }
    }
}
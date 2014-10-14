function mobloader(maxamount){
    var self = this;
    var counter = 0;
    self.currentlevel = 0;
    self.maxamount = maxamount[self.currentlevel];
    self.levels = maxamount.length;
    self.amount = 0;
    self.aliveamount = 0;
    self.spawntype = 0;
    self.updatemobs = function(){
        counter ++;
        if (self.amount > 0 && self.aliveamount <= 0){
            self.currentlevel += 1;
            self.maxamount = maxamount[self.currentlevel];
            counter = 0;
            self.amount = 0;
        }
        if (counter > 20 && self.amount < self.maxamount){
            self.spawntype = rInt(1,5);
            counter = 0;
            self.aliveamount += 1;
            self.amount += 1;
            if (self.spawntype == 1){
                var t = new enemy(rInt(10, 400), rInt(-200, -50), rInt(1,3), rInt(10, 30));
            }
            if (self.spawntype == 2){
                var t = new enemy(rInt(650, 750), rInt(10,400), rInt(1,3), rInt(10, 30));
            }
            if (self.spawntype == 3){
                var t = new enemy(rInt(10, 400), rInt(550, 640), rInt(1,3), rInt(10, 30));
            }
            if (self.spawntype == 4){
                var t = new enemy(rInt(-200, -50), rInt(10,400), rInt(1,3), rInt(10, 30));
            }
            enemies.push(t);
        }
        for (l = 0; l < enemies.length; l++){
            enemies[l].updatemob();
        }
    }
}
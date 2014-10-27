function mobloader(){
    var self = this;
    var counter = 0;
    self.currentlevel = 1;
    self.maxamount = rInt(10,15) * self.currentlevel;
    self.levels = 10;
    self.objective = 0;
    self.amount = 0;
    self.aliveamount = 0;
    self.spawntype = 0;
    self.mobrange = 3;
    self.timer = 200;
    self.updatemobs = function(){
        if (running){
//Calder Likes Men//
            counter ++;
            if (self.currentlevel > 2){
                self.mobrange = rInt(0,3);
            }else {
                    self.mobrange = 2;
            }
            if (self.amount > 0 && self.aliveamount <= 0){
                self.timer = 200;
                self.currentlevel += 1;
                self.objective = 0;
                if (self.objective == 0){
                    self.maxamount = rInt(10,15) * self.currentlevel;
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
                    var t = new enem(rInt(10, 910), rInt(-200, -50), self.mobrange);
                }
                if (self.spawntype == 2){
                    var t = new enem(rInt(1050, 1150), rInt(10,690), self.mobrange);
                }
                if (self.spawntype == 3){
                    var t = new enem(rInt(10, 910), rInt(700, 850), self.mobrange);
                }
                if (self.spawntype == 4){
                    var t = new enem(rInt(-200, -50), rInt(10,690), self.mobrange);
                }
                enemies.push(t);
            }
            }
            for (l = 0; l < enemies.length; l++){
                enemies[l].updatemob();
            }
            self.timer -= 1;
            if (self.timer < 0){
                self.timer = 0;
            }
            if (self.timer > 0 && running == true){
                ctx.fillStyle = '#262626';
                ctx.font = '20px Helvetica';
                ctx.textBaseline = 'bottom';
                ctx.fillText("Round " + self.currentlevel,10,70);
            }
        if (running == false){
            ctx.fillStyle = '#262626';
            ctx.font = '20px Helvetica';
            ctx.textBaseline = 'bottom';
            ctx.fillText("Press R to begin game",10,70);
        }
    }
}
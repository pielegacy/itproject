function experience(originx, originy, amount){
    var self = this;
    self.originx = originx;
    self.originy = originy;
    self.amount = amount;
    for (e = 0; e < self.amount; e++){
        var eb = new expball(self.originx, self.originy);
        expbundle.push(eb);
    }
    
}
function expball(x,y){
    var self = this; 
    self.x = x;
    self.y = y;
    self.tx = self.x + rInt(-60, 60);
    self.ty = self.y + rInt(0,100);
    self.active = true;
    self.moving = true;
    self.updateexp = function(){
        if (self.moving){
            if (self.x < self.tx){
                self.x += rInt(1,5);
            }
            if (self.x > self.tx){
                self.x -= rInt(1,5);
            }
            if (self.y < self.ty){
                self.y += rInt(4,8);
            }
        }   
        if (self.x < self.x + 3 && self.x > self.x - 3 && self.y > self.y + 2){
            self.moving = false;
        }
        if (self.active && self.x <= wizard.x + 20 && self.x >= wizard.x && self.y <= wizard.y + 30 && self.y >= wizard.y){
            self.active = false;
        }
        if (self.active){
            ctx.fillStyle = "#f9ff68";
            ctx.fillRect(self.x, self.y, 4, 4);
        }
    }
}
function clot(x,y){
    var self = this;
    self.x = x;
    self.y = y;
    self.size = rInt(10,100);
    for (b = 0; b < self.size; b ++){
        var bld = new blood(self.x, self.y, self.type);
        bloods.push(bld);
    }
}
function blood(x,y){
    var self = this; 
    self.x = x;
    self.y = y;
    self.dx = rInt(-3,3);
    self.dy = rInt(-3,3);
    self.size = rInt(10,100);
    self.flytime = rInt(0, 50);
    self.active = true;
    self.bloodset = ["#f82f2f","#cb2020","#ef4747","#f00"];
    self.bloodcolour = rInt(0, self.bloodset.length);
    self.updateblood = function(){
        self.size -= 2;
        self.flytime -= 1;
        if (self.flytime <= 0){
            self.flytime = 0;
        }
        if (self.flytime > 0){
            self.x += self.dx;
            self.y += self.dy;
        }   
        if (self.size <= 0){
            self.size = 0;
            self.active = false;
        }
        if (self.active){
            ctx.fillStyle = self.bloodset[self.bloodcolour];
            ctx.fillRect(self.x, self.y, self.size / 10, self.size / 10);
        }
    }
}
function water(x,y,d){
    var self = this;
    self.x = x;
    self.y = y;
    self.d = d;
    self.active = true;
    self.size = rInt(10,20);
    if (self.d == 1){
        self.dx = rInt(-10,10);
        self.dy = rInt(-10,-2);
    }
    if (self.d == 2){
        self.dx = rInt(2,10);
        self.dy = rInt(-10,10);
    }
    if (self.d == 3){
        self.dx = rInt(-10,10);
        self.dy = rInt(2,10);
    }
    if (self.d == 4){
        self.dx = rInt(-10,-2);
        self.dy = rInt(-10,10);
    }
    self.updatewater = function(){
        self.size -= 0.5;
        if (self.size <= 0 && self.active){
            self.x += self.dx;
            self.y += self.dy;
            ctx.fillStyle = "#14249d";
            ctx.fillRect(self.x, self.y, self.size, self.size);
        }
        if (self.size < 0){
            self.size = 0;
            self.active = false;
        }
            
    }
}
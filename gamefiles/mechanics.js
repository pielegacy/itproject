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
        if (self.active && self.x <= wizard.c.spr.x + 70 && self.x >=  wizard.c.spr.x - 70 && self.y <= wizard.c.spr.y + 80 && self.y >= wizard.c.spr.y - 50){
            if (self.x > wizard.c.spr.x){
                self.x -= 5;
            }
            if (self.x < wizard.c.spr.x){
                self.x += 5;
            }
            if (self.y > wizard.c.spr.y){
                self.y -= 5;
            }
            if (self.y < wizard.c.spr.y){
                self.y += 5;
            }
        }
        if (self.active && self.x <=  wizard.c.spr.x + 60 && self.x >= wizard.c.spr.x - 20 && self.y <= wizard.c.spr.y + 60 && self.y >= wizard.c.spr.y - 2){
            wizard.experience += 1;
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
function water(x,y,d,s,dam,spread){
    var self = this;
    self.x = x;
    self.y = y;
    self.d = d;
    self.s = s;
    self.dx;
    self.dy;
    self.dam = dam;
    self.sc = 2;
    self.spreading = spread;
    self.active = true;
    self.c = ["#14249d","#4e61f7","#4758d6"];
    self.cc = rInt(0,self.c.length);
    self.size = rInt(5,10);
    self.sizecount = self.size * 10;
    if (self.d == 1){
        self.dx = rInt(-1 * self.spreading, self.spreading);
        self.dy = -1 * self.s;
    }
    if (self.d == 2){
        self.dx = self.s;
        self.dy = rInt(-1 * self.spreading, self.spreading);
    }
    if (self.d == 3){
        self.dx = rInt(-1 * self.spreading, self.spreading);
        self.dy = self.s;
    }
    if (self.d == 4){
        self.dx = -1 * self.s;
        self.dy = rInt(-1 * self.spreading, self.spreading);
    }
    if (self.d == 5){
        self.dx =rInt(-4,5) * self.s;
        self.dy = rInt(-4,5) * self.s;
    }
    self.updatepart = function(){
        self.sizecount -= self.sc;
        self.size = self.sizecount / 10;
        if (self.active){
            self.x += self.dx;
            self.y += self.dy;
            ctx.fillStyle = self.c[self.cc];
            ctx.fillRect(self.x, self.y, self.size, self.size);
        }
        for (e = 0; e < enemies.length; e++){
            if (self.x > enemies[e].enemyspr.x && self.x < enemies[e].enemyspr.x + enemies[e].enemyspr.w && self.y > enemies[e].enemyspr.y && self.y < enemies[e].enemyspr.y + enemies[e].enemyspr.h && self.active && enemies[e].enemyspr.active){
                enemies[e].kx = enemies[e].enemyspr.x + self.dx * (self.dam/2);
                enemies[e].ky = enemies[e].enemyspr.y + self.dy * (self.dam/2);
                enemies[e].knocked = true;
                enemies[e].health -= self.dam;
                self.active = false;
            }
        }
        if (self.size < 1){
            self.active = false;
        }
        if (self.x > 1100 || self.x < -100 || self.y > 800 || self.y < -100){
            self.active = false;
        }
    }
}
function fire(x,y,d,s,dam,spread){
    var self = this;
    self.x = x;
    self.y = y;
    self.d = d;
    self.s = s;
    self.dx;
    self.dy;
    self.dam = dam;
    self.sc = 1;
    self.spreading = spread;
    self.active = true;
    self.c = ["#f82f2f","#e53c1d","#fd0404"];
    self.cc = rInt(0,self.c.length);
    self.size = rInt(5,10);
    self.sizecount = self.size * 10;
    if (self.d == 1){
        self.dx = rInt(-1 * self.spreading, self.spreading);
        self.dy = -1 * self.s;
    }
    if (self.d == 2){
        self.dx = self.s;
        self.dy = rInt(-1 * self.spreading, self.spreading);
    }
    if (self.d == 3){
        self.dx = rInt(-1 * self.spreading, self.spreading);
        self.dy = self.s;
    }
    if (self.d == 4){
        self.dx = -1 * self.s;
        self.dy = rInt(-1 * self.spreading, self.spreading);
    }
    self.updatepart = function(){
        self.sizecount -= self.sc;
        self.size = self.sizecount / 10;
        if (self.active){
            self.x += self.dx;
            self.y += self.dy;
            ctx.fillStyle = self.c[self.cc];
            ctx.fillRect(self.x, self.y, self.size, self.size);
        }
        for (e = 0; e < enemies.length; e++){
            if (self.x > enemies[e].enemyspr.x && self.x < enemies[e].enemyspr.x + enemies[e].enemyspr.w && self.y > enemies[e].enemyspr.y && self.y < enemies[e].enemyspr.y + enemies[e].enemyspr.h && self.active && enemies[e].enemyspr.active){
                enemies[e].kx = enemies[e].enemyspr.x + self.dx * (self.dam/2);
                enemies[e].ky = enemies[e].enemyspr.y + self.dy * (self.dam/2);
                enemies[e].knocked = true;
                enemies[e].health -= self.dam;
                self.active = false;
            }
        }
        if (self.size < 1){
            self.active = false;
        }
        if (self.x > 1100 || self.x < -100 || self.y > 800 || self.y < -100){
            self.active = false;
        }
    }
}
function air(x,y,d,s,dam,spread){
    var self = this;
    self.x = x;
    self.y = y;
    self.d = d;
    self.s = s;
    self.dx;
    self.dy;
    self.spreading = spread;
    self.dam = dam;
    self.active = true;
    self.cuts = false;
    self.size = rInt(2,5);
    self.c = ["#e5e5e5","#fff","#efefef"];
    self.cc = rInt(0,self.c.length);
    self.sizecount = self.size * 10;
    if (self.d == 1){
        self.dx = rInt(-1 * self.spreading, self.spreading);
        self.dy = -1 * self.s;
    }
    if (self.d == 2){
        self.dx = self.s;
        self.dy = rInt(-1 * self.spreading, self.spreading);
    }
    if (self.d == 3){
        self.dx = rInt(-1 * self.spreading, self.spreading);
        self.dy = self.s;
    }
    if (self.d == 4){
        self.dx = -1 * self.s;
        self.dy = rInt(-1 * self.spreading, self.spreading);
    }
    self.updatepart = function(){
        self.size = self.sizecount / 10;
        if (self.active){
            self.x += self.dx;
            self.y += self.dy;
            ctx.fillStyle = self.c[self.cc];
            if (self.d == 1 || self.d == 3){
                ctx.fillRect(self.x, self.y, self.size, self.size * rInt(7,10));
            }
            if (self.d == 2 || self.d == 4){
                ctx.fillRect(self.x, self.y, self.size * rInt(7,10), self.size);
            }
        }
        for (e = 0; e < enemies.length; e++){
            if (self.x > enemies[e].enemyspr.x && self.x < enemies[e].enemyspr.x + enemies[e].enemyspr.w && self.y > enemies[e].enemyspr.y && self.y < enemies[e].enemyspr.y + enemies[e].enemyspr.h && self.active && enemies[e].enemyspr.active){
                enemies[e].kx = enemies[e].enemyspr.x + self.dx * (self.dam/2);
                enemies[e].ky = enemies[e].enemyspr.y + self.dy * (self.dam/2);
                enemies[e].knocked = true;
                enemies[e].health -= self.dam;
                if (self.cuts == false){
                    self.active = false;
                }
            }
        }
        if (self.size < 1){
            self.active = false;
        }
        if (self.x > 1100 || self.x < -100 || self.y > 800 || self.y < -100){
            self.active = false;
        }
    }
}
function earth(x,y,d,s,dam,spread){
    var self = this;
    self.x = x;
    self.y = y;
    self.d = d;
    self.s = s;
    self.dx;
    self.dy;
    self.dam = dam;
    self.active = true;
    self.spreading = spread;
    self.size = rInt(5,10);
    self.sizecount = self.size * 10;
    if (self.d == 1){
        self.dx = rInt(-1 * self.spreading, self.spreading);
        self.dy = -1 * self.s;
    }
    if (self.d == 2){
        self.dx = self.s;
        self.dy = rInt(-1 * self.spreading, self.spreading);
    }
    if (self.d == 3){
        self.dx = rInt(-1 * self.spreading, self.spreading);
        self.dy = self.s;
    }
    if (self.d == 4){
        self.dx = -1 * self.s;
        self.dy = rInt(-1 * self.spreading, self.spreading);
    }
    if (self.d == 5){
        self.dx =rInt(-4,5) * self.s;
        self.dy = rInt(-4,5) * self.s;
    }
    self.updatepart = function(){
        //self.size = self.sizecount / 10;
        if (self.active){
            self.x += self.dx;
            self.y += self.dy;
            ctx.fillStyle = "#290808";
            ctx.fillRect(self.x, self.y, self.size, self.size);
        }
        for (e = 0; e < enemies.length; e++){
            if (self.x > enemies[e].enemyspr.x && self.x < enemies[e].enemyspr.x + enemies[e].enemyspr.w && self.y > enemies[e].enemyspr.y && self.y < enemies[e].enemyspr.y + enemies[e].enemyspr.h && self.active && enemies[e].enemyspr.active){
                enemies[e].kx = enemies[e].enemyspr.x + self.dx * (self.dam/2);
                enemies[e].ky = enemies[e].enemyspr.y + self.dy * (self.dam/2);
                enemies[e].knocked = true;
                enemies[e].health -= self.dam;
                self.active = false;
            }
        }
        if (self.size < 1){
            self.active = false;
        }
        if (self.x > 1100 || self.x < -100 || self.y > 800 || self.y < -100){
            self.active = false;
        }
    }
}
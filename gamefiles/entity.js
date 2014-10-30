var spells = [];
var types = ["Air", "Water", "Earth", "Fire", "Plasma"];
var currentype;
var currentspellid;
function mainchar(x, y){
	var self = this;
	self.x = x;
	self.y = y;
    self.mana = 0;
    self.spellid = 1;
    self.casting = false;
    self.level = 1;
    self.experience = 0;
    self.typec = rInt(0,types.length);
    self.type = types[self.typec];
    currentype = self.type;
    self.timer = 0;
    self.dmod = 0;
    self.smod = 0;
    self.fmod = 0;
	self.action = 0;
	self.c = new character("genuine_wiz.png", self.x, self.y, 30, 30, 4, 11, 4, false);
    self.c.spr.cl = self.typec;
	self.c.speed = 6;
    self.c.spr.limit = 2;
	self.c.direction = "undef";
	self.c.moving = true;
	self.updatechar = function(){
        currentspellid = self.spellid;
        currentype = self.type;
        //document.getElementById("title").innerHTML = self.c.spr.cl + " "  + self.typec + " " + self.type;
        if (self.casting == false){
            self.c.spr.limited = true;
        }
        else 
        {
            self.c.spr.limited = false;
        }
		self.c.update();
        self.mana -= 1;
        if (self.mana <= 0){
            self.mana = 0;
        }
        if (self.experience > 15  * self.level){
            var choice = rInt(0,3);
            self.level += 1;
            if (choice == 0){
                self.dmod += 1;
                document.getElementById("title").innerHTML = "Damage increased";
            }
            if (choice == 1){
                self.smod += 1;
                document.getElementById("title").innerHTML = "Spread increased";
            }
            if (choice == 2){
                self.fmod += 1;
                document.getElementById("title").innerHTML = "Speed increased";
            }
            self.experience = 0;
            }
        ctx.fillStyle = '#262626';
        ctx.font = '15px Arial';
        ctx.textBaseline = 'bottom';
        ctx.fillText("Mana : " + self.mana, 10, 20);    
		self.x = self.c.spr.x;
		self.y = self.c.spr.y;
		if (self.y < 10){
			self.c.spr.y = 10;
		}
		if (self.y > 660){
			self.c.spr.y = 660;
		}
        if (self.x < 10){
			self.c.spr.x = 10;
		}
		if (self.x > 970){
			self.c.spr.x = 970;
        }
        if (82 in keysDown){
            running = true;
            self.fmod += 1;
        }
        if (self.c.active == true && self.mana == 0 && running){
            self.casting = false;
            if (38 in keysDown){
                self.casting = true;
                cast(0,1);
                self.timer = 0;
            }
            if (39 in keysDown){
                self.casting = true;
                cast(0,2);
                self.timer = 0;
            }
            if (40 in keysDown){
                self.casting = true;
                cast(0,3);
                self.timer = 0;
            }
            if (37 in keysDown){
                self.casting = true;
                cast(0,4);
                self.timer = 0;
            }
            ///////////////////////////////
            // TODO: Diagonally Shooting //
            ///////////////////////////////
            
            /*if (38 in keysDown && 39 in keysDown ){
                var thing = new spell("air", 5, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                self.timer = 0;
            }
            if (39 in keysDown && 40 in keysDown ){
                var thing = new spell("air", 6, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                self.timer = 0;
            }
            if (40 in keysDown && 37 in keysDown ){
                var thing = new spell("air", 7, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                self.timer = 0;
            }
            if (37 in keysDown && 38 in keysDown ){
                var thing = new spell("air", 8, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                self.timer = 0;
            }*/
            if (32 in keysDown && self.mana == 0){
                self.mana = 100;
                for (i = 0; i < 1000; i++){
                    var w = new water(self.x, self.y, 2, rInt(4,10));
                    waters.push(w);
                }
                self.timer = 0;
                    
            }
        }
        self.timer += 1;
	}
}
function rect(x, y, w, h, colour){
	var self = this;
	self.x = x;
	self.y = y;
	self.w = w;
	self.h = h;
	self.colour = colour;
	self.updaterect = function(){
		ctx.fillStyle = self.colour;
		ctx.fillRect(self.x,self.y,self.w,self.h);
	}
}
function enem(x, y, type){
    var self = this;
    self.x = x;
    self.y = y;
    self.cx = 0;
    self.cy = 0;
    self.dx = 0;
    self.dy = 0;
    self.knocked = false;
    self.kx = 0;
    self.ky = 0;
    self.attitude = "norm";
    self.exp = 0;
    self.timer = 0;
    self.type = type;
    var choice = rInt(0,100);
    if (self.type == 0){
        self.enemyspr = new sprite("mobs/enem_darkshade.png", self.x, self.y, 20, 30, 2, 1, 1, false);
        self.health = rInt(15,20);
        self.basespeed = 3;
        self.exp = 5;
        self.speed = self.basespeed;
    }
    if (self.type == 1){
        self.enemyspr = new sprite("mobs/enem_havnn.png", self.x, self.y, 30, 35, 7, 1, 1, false);
        self.health = rInt(20,30);
        self.basespeed = 2;
        self.enemyspr.fps = 4;
        self.exp = 10;
        self.timer = rInt(30,40);
        self.speed = self.basespeed;
    }
    if (self.type == 2){
        self.enemyspr = new sprite("mobs/enem_ogre.png", self.x, self.y, 20, 30, 4, 1, 1, false);
        self.health = rInt(7,15);
        self.basespeed = 2;
        self.attitude = "dumb";
        self.exp = 10;
        self.speed = self.basespeed;
    }
    if (self.type == 3){
        self.enemyspr = new sprite("mobs/enem_drel.png", self.x, self.y, 30, 30, 4, 1, 1, false);
        self.health = 30;
        self.basespeed = 1;
        self.attitude = "scared";
        self.exp = rInt(10,20);
        self.speed = self.basespeed;
    }
    self.updatemob = function(){
        //Experimental Dodging//
        /*for (s = 0; s < parts.length; s++){
            if (parts[s].y >= self.enemyspr.y - 250 && parts[s].y <= self.enemyspr.y + self.enemyspr.h + 250 && parts[s].x <= self.enemyspr.x + self.enemyspr.w + 250 && parts[s].x >= self.enemyspr.x - 250  && self.enemyspr.active == true && parts[s].active){
                if (parts[s].d == 1){
                    if (choice >= 50){
                        self.enemyspr.x -= 2;
                    }
                    if (choice < 50){
                        self.enemyspr.x += 2;
                    }
                }
                if (parts[s].d == 2){
                     if (choice >= 50){
                        self.enemyspr.y -= 2;
                    }
                    if (choice < 50){
                        self.enemyspr.y += 2;
                    }
                }
                if (parts[s].d == 3){
                    if (choice >= 50){
                        self.enemyspr.x -= 2;
                    }
                    if (choice < 50){
                        self.enemyspr.x += 2;
                    }
                }
                if (parts[s].d == 4){
                    if (choice >= 50){
                        self.enemyspr.y -= 2;
                    }
                    if (choice < 50){
                        self.enemyspr.y += 2;
                    }
                }
            }
        }*/
        if (running){
            if (self.enemyspr.active == true && self.knocked == false){
                if (wizard.x > self.enemyspr.x){
                    self.dx = self.speed;
                }
                if (wizard.x < self.enemyspr.x){
                    self.dx = -1 * self.speed;
                }
                if (wizard.y > self.enemyspr.y){
                    self.dy = self.speed;
                }
                if (wizard.y < self.enemyspr.y){
                    self.dy = -1 * self.speed;
                }

            }
            if (self.type == 0){
                if (self.timer <= 0){
                    var thing = new darkshot(self.cx, self.cy, rInt(1,5), 1, 10, 2);
                    parts.push(thing);
                    self.timer = rInt(50,100);
                }
            }
            if (self.attitude == "dumb"){
                if (self.knocked == false){
                    self.knocked = true;
                    self.kx = rInt(100,900);
                    self.ky = rInt(100,600);
                }
            }
            if (self.enemyspr.x >= wizard.c.spr.x - 200 && self.enemyspr.x <= wizard.c.spr.x + 200 && self.enemyspr.y >= wizard.c.spr.y - 200 && self.enemyspr.y <= wizard.c.spr.y + 200 && self.type == 2) {
                self.knocked = false;
                    self.attitude == "smart";
            }
            if (self.knocked == true){
                if (self.enemyspr.x >= self.kx * self.basespeed && self.enemyspr.x <= self.kx* self.basespeed && self.enemyspr.y >= self.ky* self.basespeed && self.enemyspr.y <= self.ky* self.basespeed) {
                    self.knocked = false; 
                }
                else {
                    if (self.kx - 2 > self.enemyspr.x){
                        self.dx = self.speed;
                    }
                    if (self.kx + 2 < self.enemyspr.x){
                        self.dx = -1 * self.speed;
                    }
                    if (self.ky - 2 > self.enemyspr.y){
                        self.dy = self.speed;
                    }
                    if (self.ky + 2 < self.enemyspr.y){
                        self.dy = -1 * self.speed;
                    }
                }
            }

            if (self.enemyspr.x >= wizard.c.spr.x - 100 && self.enemyspr.x <= wizard.c.spr.x + 100 && self.enemyspr.y >= wizard.c.spr.y - 100 && self.enemyspr.y <= wizard.c.spr.y + 100 && self.type == 1) {
                    self.speed = self.basespeed * 2;
                    self.enemyspr.fps = 2;
            }
            else {
                self.speed = self.basespeed;
                self.enemyspr.fps = 4;
            }

            if (self.enemyspr.x >= wizard.c.spr.x - 2 && self.enemyspr.x <= wizard.c.spr.x + 2 && self.enemyspr.y >= wizard.c.spr.y - 2 && self.enemyspr.y <= wizard.c.spr.y + 2) {
                    self.speed = 0; 
            }
            if (self.enemyspr.x >= wizard.c.spr.x - 5 && self.enemyspr.x <= wizard.c.spr.x + 5) {
                    self.dx = 0;
            }
            if (self.enemyspr.y >= wizard.c.spr.y - 5 && self.enemyspr.y <= wizard.c.spr.y + 5) {
                    self.dy = 0;
            }
            if (self.health <= 0 && self.enemyspr.active == true){
                mobs.aliveamount -= 1;
                experience(self.cx, self.cy, self.exp);
                if (self.type == 2){
                    clot(self.cx, self.cy,1);
                }
                else {
                    clot(self.cx, self.cy,0);
                }
                self.enemyspr.active = false;
            }
            self.enemyspr.x += self.dx;
            self.enemyspr.y += self.dy;
            self.cx = self.enemyspr.x + (self.enemyspr.w / 2);
            self.cy = self.enemyspr.y + (self.enemyspr.h / 2);
            if (self.cy >= wizard.c.spr.y && self.cy <= wizard.c.spr.y + wizard.c.spr.h && self.cx <= wizard.c.spr.x + wizard.c.spr.w && self.cx >= wizard.c.spr.x && self.enemyspr.active == true){
                wizard.c.active = false;
            }
        }
        self.enemyspr.update();
    }
}


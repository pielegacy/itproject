var spells = [];
var types = ["Air", "Water", "Earth", "Fire"];
var currentype;
var currentspellid;
function mainchar(type, x, y){
	var self = this;
	self.t = type;
	self.x = x;
	self.y = y;
    self.spellid = 1;
    self.typec = rInt(0,4);
    self.type = types[self.typec];
    document.getElementById("title").innerHTML = self.type;
    currentype = self.type;
    self.timer = 0;
	self.action = 0;
	if (self.t == 1){
		self.f = 2;
		self.l = 2;
	}
	self.c = new character("genuine_wiz.png", self.x, self.y, 20, 30, self.f, self.l, 1, false);
	self.c.speed = 5;
	self.c.direction = "undef";
	self.c.moving = true;
	self.updatechar = function(){
        currentspellid = self.spellid;
		self.c.update();
        for (i = 0; i < spells.length; i++){
            spells[i].updatespell();
        }
		self.x = self.c.spr.x;
		self.y = self.c.spr.y;
		if (self.y < 0){
			self.c.spr.y = 0;
		}
		if (self.y > 440){
			self.c.spr.y = 440;
		}
        if (self.x < 0){
			self.c.spr.x = 0;
		}
		if (self.x > 555){
			self.c.spr.x = 555;
		}
        if (self.timer > 10 && self.c.active == true){
            if (38 in keysDown){
                var thing = new spell("air", 1, self.c.spr.x + (self.c.spr.w / 4), self.c.spr.y+ (self.c.spr.h / 2));
                spells.push(thing);
                self.timer = 0;
            }
            if (39 in keysDown){
                var thing = new spell("air", 2, self.c.spr.x+ (self.c.spr.w / 4), self.c.spr.y+ (self.c.spr.h / 2));
                spells.push(thing);
                self.timer = 0;
            }
            if (40 in keysDown){
                var thing = new spell("air", 3, self.c.spr.x+ (self.c.spr.w / 4), self.c.spr.y+ (self.c.spr.h / 2));
                spells.push(thing);
                self.timer = 0;
            }
            if (37 in keysDown){
                var thing = new spell("air", 4, self.c.spr.x+ (self.c.spr.w / 4), self.c.spr.y+ (self.c.spr.h / 2));
                spells.push(thing);
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
            if (32 in keysDown){
                for (i = 0; i < 10; i++){
                var thing = new spell("air", 1, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                var thing = new spell("air", 2, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                var thing = new spell("air", 3, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                var thing = new spell("air", 4, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
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
function enemy(x, y, speed, health){
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
    self.health = health;
    self.speed = speed;
    self.enemyspr = new sprite("darkshade.png", self.x, self.y, 20, 30, 2, 1, 1, false);
    self.updatemob = function(){
        for (s = 0; s < spells.length; s++){
            if (spells[s].cy >= self.enemyspr.y && spells[s].cy <= self.enemyspr.y + self.enemyspr.h && spells[s].cx <= self.enemyspr.x + self.enemyspr.w && spells[s].cx >= self.enemyspr.x && self.enemyspr.active == true && spells[s].spellspr.active && spells[s].hit == false){
                if (spells[s].direction == 1){
                    self.ky = self.enemyspr.y - spells[s].knock;
                    self.kx = self.enemyspr.x;
                }
                if (spells[s].direction == 2){
                    self.kx = self.enemyspr.x + spells[s].knock;
                    self.ky = self.enemyspr.y;
                }
                if (spells[s].direction == 3){
                    self.ky = self.enemyspr.y + spells[s].knock;
                    self.kx = self.enemyspr.x;
                }
                if (spells[s].direction == 4){
                    self.kx = self.enemyspr.x - spells[s].knock;
                    self.ky = self.enemyspr.y;
                }
                self.knocked = true;
                spells[s].hit = true;
                self.health -= spells[s].damage;
            }
        }
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
        if (self.knocked == true){
            if (self.enemyspr.x >= self.kx - 1 && self.enemyspr.x <= self.kx + 1 && self.enemyspr.y >= self.ky - 1 && self.enemyspr.y <= self.ky + 1) {
                self.knocked = false; 
            }
            else {
                if (self.kx > self.enemyspr.x){
                    self.dx = self.speed;
                }
                if (self.kx < self.enemyspr.x){
                    self.dx = -1 * self.speed;
                }
                if (self.ky > self.enemyspr.y){
                    self.dy = self.speed;
                }
                if (self.ky < self.enemyspr.y){
                    self.dy = -1 * self.speed;
                }
            }
        }
        if (self.health <= 0 && self.enemyspr.active == true){
            mobs.aliveamount -= 1;
            self.enemyspr.active = false;
        }
        self.enemyspr.x += self.dx;
        self.enemyspr.y += self.dy;
        self.cx = self.enemyspr.x + (self.enemyspr.w / 2);
        self.cy = self.enemyspr.y + (self.enemyspr.h / 2);
        if (self.cy >= wizard.c.spr.y && self.cy <= wizard.c.spr.y + wizard.c.spr.h && self.cx <= wizard.c.spr.x + wizard.c.spr.w && self.cx >= wizard.c.spr.x && self.enemyspr.active == true){
            wizard.c.active = false;
        }
        self.enemyspr.update();
    }
}
function spell(type, direction, x, y){
    var self = this;
    self.x = x;
    self.y = y;
    self.cx;
    self.cy;
    self.speed = 10;
    self.damage = 10;
    self.knock = 0;
    self.type = type;
    self.direction = direction;
    if (currentspellid == 1){
        if (currentype == "Air"){
            self.spellspr = new sprite("spells_1.png", self.x, self.y, 15, 15, 2, 2, 0, false);
            self.spellspr.cl = 0;
            self.speed = 14;
            self.damage = 5;
            self.knock = 15;
        }
        if (currentype == "Fire"){
            self.spellspr = new sprite("spells_1.png", self.x, self.y, 15, 15, 2, 2, 0, false);
            self.spellspr.cl = 1;
            self.speed = 10;
            self.damage = 10;
            self.knock = 8;
        }
        if (currentype == "Earth"){
            self.spellspr = new sprite("spells_1.png", self.x, self.y, 15, 15, 2, 2, 0, false);
            self.spellspr.cl = 2;
            self.speed = 5;
            self.damage = 15;
            self.knock = 20;
        }
        if (currentype == "Water"){
            self.spellspr = new sprite("spells_1.png", self.x, self.y, 15, 15, 2, 2, 0, false);
            self.spellspr.cl = 3;
            self.speed = 8;
            self.damage = 12;
            self.knock = 10;
        }
    }
    self.hit = false;
    self.hitcounter = 0;
    self.updatespell = function(){
        self.cx = self.spellspr.x + 7;
        self.cy = self.spellspr.y + 7;
        if (self.hit == true){
            self.direction = 0;
            self.hitcounter ++;
            if (self.hitcounter < 5){
                self.spellspr.cf = 1;
            }
            else if (self.hitcounter < 10){
                self.spellspr.cf = 2;
            }
            else if (self.hitcounter < 15){
                self.spellspr.cf = 3;
            }
            else if (self.hitcounter < 20){
                self.spellspr.cf = 4;
            }
            else {
                self.spellspr.active = false;
                self.hitcounter = 20;
            }
        }
        if (self.direction == 1){
            self.spellspr.y -= self.speed;
        }
        if (self.direction == 2){
            self.spellspr.x += self.speed;
        }
        if (self.direction == 3){
            self.spellspr.y += self.speed;
        }
        if (self.direction == 4){
            self.spellspr.x -= self.speed;
        }
        if (self.direction == 5){
            self.spellspr.y -= self.speed;
            self.spellspr.x += self.speed;
        }
        if (self.direction == 6){
            self.spellspr.x += self.speed;
            self.spellspr.y += self.speed;
        }
        if (self.direction == 7){
            self.spellspr.y += self.speed;
            self.spellspr.x -= self.speed;
        }
        if (self.direction == 8){
            self.spellspr.x -= self.speed;
            self.spellspr.y -= self.speed;
        }
        if (self.spellspr.x > 650 || self.spellspr.x < -50 || self.spellspr.y > 550 || self.spellspr.y < -50){
            self.spellspr.active = false;
        }
        self.spellspr.update();
    }
}


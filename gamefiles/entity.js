var spells = [];
function mainchar(type, x, y){
	var self = this;
	self.t = type;
	self.x = x;
	self.y = y;
    self.timer = 0;
	self.action = 0;
	if (self.t == 1){
		self.f = 2;
		self.l = 2;
	}
	self.c = new character("sprite_wiz.png", self.x, self.y, 45, 60, self.f, self.l, 1, false);
	self.c.speed = 5;
	self.c.direction = "undef";
	self.c.moving = true;
    document.getElementById("title").innerHTML = spells.length;
	self.updatechar = function(){
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
        if (self.timer > 10){
            if (38 in keysDown){
                var thing = new spell("air", 1, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                self.timer = 0;
            }
            if (39 in keysDown){
                var thing = new spell("air", 2, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                self.timer = 0;
            }
            if (40 in keysDown){
                var thing = new spell("air", 3, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
                self.timer = 0;
            }
            if (37 in keysDown){
                var thing = new spell("air", 4, self.c.spr.x, self.c.spr.y);
                spells.push(thing);
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
function enemy(x, y){
    var self = this;
    self.x = x;
    self.y = y;
    self.enemyspr = new sprite("moose_still.png", self.x, self.y, 35, 35, 2, 1, 0, false);
    self.updatemob = function(){
        for (s = 0; s < spells.length; s++){
            if (spells[s].cy >= self.enemyspr.y && spells[s].cy <= self.enemyspr.y + self.enemyspr.h && spells[s].cx <= self.enemyspr.x + self.enemyspr.w && spells[s].cx >= self.enemyspr.x && self.enemyspr.active == true ){
                self.enemyspr.active = false;
                spells[s].spellspr.active = false;
            }
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
    self.speed = 5;
    self.type = type;
    self.direction = direction;
    self.spellspr = new sprite("grasstest.png", self.x, self.y, 40, 40, 1, 1, 0, false);
    self.updatespell = function(){
        self.cx = self.spellspr.x + 20;
        self.cy = self.spellspr.y + 20;
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
        if (self.spellspr.x > 650 || self.spellspr.x < -50 || self.spellspr.y > 450 || self.spellspr.y < -50){
            self.spellspr.active = false;
        }
        self.spellspr.update();
    }
}


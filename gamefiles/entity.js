function mainchar(type, x, y){
	var self = this;
	self.t = type;
	self.x = x;
	self.y = y;
	self.action = 0;
	if (self.t == 1){
		self.f = 2;
		self.l = 2;
	}
	self.c = new character("sprite_wiz.png", self.x, self.y, 75, 100, self.f, self.l, 1, false);
	self.c.speed = 3;
	self.c.direction = "undef";
	self.updatechar = function(){
		self.c.update();
		self.x = self.c.spr.x;
		self.y = self.c.spr.y;
		if (self.y < 350){
			self.c.spr.y = 350;
		}
		if (self.y > 400){
			self.c.spr.y = 400;
		}
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
function instance(size, mainc){
	var self = this;
	self.levels = [];
	self.cha = mainc;
	self.currentinstant = 0;
	self.ground = new rect(0, 425, 600, 75, "#54C44E");
	self.sky = new rect(0,0,600,500,"#0DFFF6");
	self.sun = new rect(-40,10,40,40,"yellow");
	for (i = 0; i < size; i++){
		self.levels.push(rInt(100000,999999));
	}
	self.updateinstance = function(){
		if (self.cha.c.spr.x > 550){
			if (self.currentinstant < self.levels.length){
				self.cha.c.spr.x = 0;
				self.currentinstant += 1;
			}else{
				self.cha.spr.x = 550;
			}
		}
		if (self.cha.c.spr.x < 0){
			if (self.currentinstant > 0){
				self.cha.c.spr.x = 550;
				self.currentinstant -= 1;
			}
			else {
				self.cha.c.spr.x = 0;
			}
		}
		document.getElementById("title").innerHTML = self.levels[self.currentinstant];
		self.sun.x += 0.5;
		self.sun.y = (1/1000) * Math.pow(self.sun.x - 300, 2) + 10;
		if (self.sun.x > 600){
			if (self.sun.colour == "yellow"){
				self.sun.colour = "white";
				self.sky.colour = "black";
			}
			else {
				self.sun.colour = "yellow";
				self.sky.colour = "#0DFFF6";
			}
			self.sun.x = - 40;
		}
		self.sky.updaterect();
		self.ground.updaterect();
		self.sun.updaterect();
	}
}

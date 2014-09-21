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
	self.c = new character("sprite_wiz.png", self.x, self.y, 45, 60, self.f, self.l, 1, false);
	self.c.speed = 3;
	self.c.direction = "undef";
	self.c.moving = true;
	self.updatechar = function(){
		self.c.update();
		self.x = self.c.spr.x;
		self.y = self.c.spr.y;
		if (self.y < 280){
			self.c.spr.y = 280;
		}
		if (self.y > 420){
			self.c.spr.y = 420;
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


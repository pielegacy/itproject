function mainchar(type, x, y){
	var self = this;
	self.t = type;
	self.x = x;
	self.y = y;
	if (self.t == 1){
		self.f = 2;
		self.l = 2;
	}
	self.c = new character("sprite_wiz.png", self.x, self.y, 30, 40, self.f, self.l, 1, false);
	self.c.speed = 4;
	self.updatechar = function(){
		if (16 in keysDown){
			self.c.speed = 5;
		}
		else {
			self.c.speed = 3;
		}
		self.c.update();
	}
}
function instance(type, arr){
	var self = this;
	self.t = type;
	self.a = arr;
	if (self.t == 1){
		self.tiles = "test_texture.png";
	}
	self.l = new world(self.tiles, self.a, false);
	self.updateinstance = function(){
		self.l.update();
		var count = 0;

	}
}

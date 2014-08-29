function mainchar(type, x, y){
	var self = this;
	self.t = type;
	self.x = x;
	self.y = y;
	if (self.t == 1){
		self.f = 2;
		self.l = 0;
	}
	self.c = new character("moose_still.png", self.x, self.y, 35, 35, self.f, self.l, 1, false);
	self.updatechar = function(){
		self.c.update();
	}
}
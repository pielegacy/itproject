var gRef = "#54C44E";
var dsRef = "#0DFFF6";
var nsRef = "black";
var l = new loader();
var instanceitems = {};
function instance(size, mainc){
	var self = this;
	self.levels = [];
	self.cha = mainc;
	self.sunx = -40;
	self.suny = 10;
	self.ground = new rect(0, 300, 600, 300, gRef);
	self.sky = new rect(0,0,600,500,"#0DFFF6");
	self.sun = new rect(self.sunx, self.suny,40,40,"yellow");
	self.currentinstant = 0;
	for (i = 0; i < size; i++){
		if (i == 0){
			self.levels.push(0);
		}
		else{
			self.levels.push(rInt(100000,999999));
		}	
	}
	self.loadinstance = function(){
		self.ground = new rect(0, 300, 600, 300, gRef);
		self.sky = new rect(0,0,600,500,"#0DFFF6");
		self.sun = new rect(self.sunx, self.suny,40,40,"yellow");
		l.loadlevel(self.levels[self.currentinstant]);
	}
	self.loadinstance();
	self.updateinstance = function(){
		if (self.cha.c.spr.x > 550){
			if (self.currentinstant < self.levels.length){
				self.cha.c.spr.x = 0;
				self.currentinstant += 1;
				self.loadinstance();
			}else{
				self.cha.spr.x = 550;
			}
		}
		if (self.cha.c.spr.x < 0){
			if (self.currentinstant > 0){
				self.cha.c.spr.x = 550;
				self.currentinstant -= 1;
				self.loadinstance();
			}
			else {
				self.cha.c.spr.x = 0;
			}
		}
		document.getElementById("title").innerHTML = instanceitems[self.currentinstant];
		self.sun.x += 0.5;
		self.sunx = self.sun.x;
		self.sun.y = (1/1000) * Math.pow(self.sun.x - 300, 2) + 10;
		self.suny = self.sun.y;
		if (self.sun.x > 600){
			if (self.sun.colour == "yellow"){
				self.sun.colour = "white";
				self.sky.colour = nsRef;
			}
			else {
				self.sun.colour = "yellow";
				self.sky.colour = dsRef;
			}
			self.sun.x = - 40;
		}
		self.sky.updaterect();
		self.ground.updaterect();
		self.sun.updaterect();
		l.updatelevel(self.levels[self.currentinstant]);
	}
}
//TODO: Objects Shite//
function loader(){
	var self = this;
	self.loadlevel = function(key){
		self.defkey = key;
		instanceitems[self.defkey] = [];
		self.ref = key.toString();
		self.ref = self.ref.split("");
			for (i = 0; i < self.ref.length; i++){
				if (self.ref[i] == "1"){
					instanceitems[self.defkey].push(new sprite("grasstest.png", rInt(100,500), rInt(350,400), 40, 40, 1, 1, 0, false));			
				}
			}
	}
	self.updatelevel = function(key){
		if (instanceitems[key] != null){
			for (j = 0; j < instanceitems[key].length; j++){
				instanceitems[key][j].update();
			}
		}
	}
}
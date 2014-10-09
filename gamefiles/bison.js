//bison.js by Alex Billson//
//version 0.01//
//Basic Javascript 2D Games Engine//

function rInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var c = document.getElementById("gamescreen");
var ctx = c.getContext("2d");
var bgcolor = "#000";
var keysDown = {};
addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);
// Basic Sprite Class //
function sprite(src, x, y, w, h, f, l, a, loaded){
    var self = this;
    self.src = src;
    self.x = x;
    self.y = y;
    self.w = w;
    self.h = h;
    self.cf = 0;
    self.f = f;
    self.cl = 0;
    self.l = l;
    self.active = true;
    self.a = a;
    self.cfps = 0;
    self.fps = 10;
    self.loaded = loaded;
    self.spr = new Image();
    self.spr.onload = function(){self.loaded = true;}
    self.spr.src = self.src;    
    self.update = function(){
        if (self.active == true){
            self.cfps += 1;
            if (self.cfps > self.fps && self.a == 1){
                self.cfps = 0;
                self.cf += 1;
                if (self.cf >= self.f){
                    self.cf = 0;
                }
            }
            if (self.a == 3){
                if (self.f > 9){
                    self.cl = Math.floor(self.f / 10);
                    self.cf = self.f - (Math.floor(self.f / 10) * 10);
                }
                if (self.f <=9){
                    self.cf = self.f;
                    self.cl = self.l;
                }
            }
            ctx.drawImage(self.spr, self.w * self.cf, self.h * self.cl, self.w, self.h, self.x, self.y, self.w, self.h);
        }
    }
}
//Tile Loader//
//ts = source, l = level array //
function world(ts, l, loaded){
    var self = this;
    self.ts = ts;
    self.l = l;
    self.w = [];
    self.xval = 0;
    self.yval = 0;
    self.loaded = loaded;
    self.count = 0;
    for (i = 0; i < self.l.length; i++){
        for (j = 0; j < self.l[i].length; j++){
            block = new sprite(ts, 40 * j, 40 * i, 40, 40, self.l[i][j], 0, 3, false);
            self.w.push(block);
            self.xval += 1;
            self.count += 1;
        }
        self.yval += 1;
    }
    self.update = function(){
            for (k = 0; k < self.w.length; k++){
                if (self.w[k].loaded){
                        self.w[k].update();
                    }
            }
    }
}

// Controlled Player Class //
function character(src, x, y, w, h, f, l, a, loaded){
    var self = this;
    self.active = true;
    self.speed = 3;
    self.moving = true;
    self.direction = "undef";
    self.spr = new sprite(src, x, y, w, h, f, l, a, false);
    self.update = function(){
        if (self.active){
            self.cfps += 1;
            self.moving = true;
            if (87 in keysDown || self.direction == "up"){
                self.spr.y -= self.speed;
                self.spr.cl = 1;
            }
            if (83 in keysDown || self.direction == "down"){
                self.spr.y += self.speed;
                self.spr.cl = 1;
            }
            if (65 in keysDown || self.direction == "left"){
                self.spr.x -= self.speed;
                self.moving = true;
                self.spr.cl = 1;
            }
            if (68 in keysDown || self.direction == "right"){
                self.spr.x += self.speed;
                self.moving = true;
                self.spr.cl = 1;
            }
            if (self.moving == false){
                self.spr.cl = 0;
            }
            self.spr.update();
        }
    }
}
//Basic Enemy//
function enemy(src, x, y, w, h, f, l, a, loaded){
    var self = this;
    self.active = true;
    self.speed = 3;
    self.cfps = 0;
    self.fps = 10;
    self.spr = new sprite(src, x, y, w, h, f, l, a, false);
    self.update = function(){
        self.spr.x -= self.speed;
        if (self.cfps > self.fps && self.spr.a == 1){
            self.cfps = 0;
            self.spr.cf += 1;
            if (self.spr.cf >= self.spr.f){
                self.spr.cf = 0;
            }
        }
        self.spr.update();
    }
}

//Collision Detection//
//s = singular item/character, a = array of characters//
//TODO: Set this shit up//
function collide(s,a){
    var self = this;
    self.o = s;
    self.a = a;
}

function gameupdate(){
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, c.width, c.height);
    updategame();
}
setInterval(gameupdate, 16);
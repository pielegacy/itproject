var particles = [];
function cast(id, direction){
    var self = this;
    self.direction = direction;
    if (id == 0){
        var thing = new spell("norm", self.direction, wizard.c.spr.x + (wizard.c.spr.w / 4), wizard.c.spr.y+ (wizard.c.spr.h / 2));
    }
    if (id == 1){
        var thing = new spell("cut", self.direction, wizard.c.spr.x + (wizard.c.spr.w / 4), wizard.c.spr.y+ (wizard.c.spr.h / 2));
    }
    spells.push(thing);
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
            wizard.mana += 10;
        }
        if (currentype == "Fire"){
            self.spellspr = new sprite("spells_1.png", self.x, self.y, 15, 15, 2, 2, 0, false);
            self.spellspr.cl = 1;
            self.speed = 10;
            self.damage = 10;
            self.knock = 8;
            wizard.mana += 20;
        }
        if (currentype == "Earth"){
            self.spellspr = new sprite("spells_1.png", self.x, self.y, 15, 15, 2, 2, 0, false);
            self.spellspr.cl = 2;
            self.speed = 5;
            self.damage = 15;
            self.knock = 20;
            wizard.mana += 30;
        }
        if (currentype == "Water"){
            self.spellspr = new sprite("spells_1.png", self.x, self.y, 15, 15, 2, 2, 0, false);
            self.spellspr.cl = 3;
            self.speed = 8;
            self.damage = 12;
            self.knock = 10;
            wizard.mana += 20;
        }
    }
    
    self.hit = false;
    self.hitcounter = 0;
    self.updatespell = function(){
        self.cx = self.spellspr.x + 7;
        self.cy = self.spellspr.y + 7;
        if (self.hit == false){
            /*for (i = 0; i < 10; i++){
                var p = new particle(0, self.cx + rInt(-10, 10), self.cy + rInt(-10, 10), 1);
                particles.push(p);
            }*/
        }
        if (self.hit == true){
            if (self.type != "cut"){
                self.direction = 0;
            }
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
                if (self.type != "cut"){
                    self.spellspr.active = false;
                    self.hitcounter = 20;
                }
                else {
                    self.hit = false;
                    self.hitcounter = 0;
                    self.cf = 0;
                }
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

function particle(type, x, y, direction){
    var self = this;
    self.type = type;
    self.x = x;
    self.y = y;
    self.direction = direction;
    if (self.type == 0){
        self.timeout = 10;
    }
    self.updateparticle = function(){
        if (self.type == 0){
            self.y += 5;
        }
        if (self.timeout > 0){
            ctx.fillStyle = "#ff7529";
            ctx.fillRect(self.x, self.y, 2, 2);
        }
        self.timeout -= 1;
    }
    
}

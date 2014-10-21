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
    if (id == 100){
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
            self.speed = 20;
            self.damage = 5;
            self.knock = 15;
            wizard.mana += 10;
            for (i = 0; i < 3; i++){
                var w = new air(self.x, self.y, self.direction, self.speed, self.damage);
            }
            parts.push(w);
        }
        if (currentype == "Fire"){
            self.speed = 15;
            self.damage = 10;
            self.knock = 8;
            wizard.mana += 20;
            for (i = 0; i < 3; i++){
                var w = new fire(self.x, self.y, self.direction, self.speed, self.damage);
                parts.push(w);
            }
        }
        if (currentype == "Earth"){
            self.speed = 8;
            self.damage = 15;
            self.knock = 20;
            wizard.mana += 30;
            for (i = 0; i < rInt(3,5); i++){
                var w = new earth(self.x, self.y, self.direction, self.speed, self.damage);
                parts.push(w);
            }
        }
        if (currentype == "Water"){
            self.speed = 12;
            self.damage = 4;
            self.knock = 10;
            wizard.mana += 20;
            for (i = 0; i < 10; i++){
                var w = new water(self.x, self.y, self.direction, self.speed, self.damage, 2);
                parts.push(w);
            }
        }
    }
    if (currentspellid == 2){
        if (currentype == "Air"){
            self.speed = 20;
            self.damage = 1;
            self.knock = rInt(30,40);
            wizard.mana += 2;
            for (i = 0; i < 15; i++){
                var w = new air(self.x + rInt(-10,10), self.y+ rInt(-10,10), self.direction, self.speed, self.damage);
                w.cuts = true;
            }
            parts.push(w);
        }
        if (currentype == "Fire"){
            self.speed = 10;
            self.damage = 2;
            self.knock = 8;
            wizard.mana += 1;
            for (i = 0; i < 1; i++){
                var w = new fire(self.x, self.y, self.direction, self.speed, self.damage);
                w.sc = 3;
                parts.push(w);
            }
        }
        if (currentype == "Earth"){
            self.speed = 8;
            self.damage = 4;
            self.knock = 20;
            wizard.mana += 40;
            for (i = 0; i < rInt(20,40); i++){
                var w = new earth(self.x+ rInt(-40,40), self.y+ rInt(-40,40), self.direction, self.speed + rInt(-2,3), self.damage);
                parts.push(w);
            }
        }
        if (currentype == "Water"){
            self.speed = 15;
            self.damage = 2;
            self.knock = 10;
            wizard.mana += 40;
            for (i = 0; i < 20; i++){
                if (self.direction == 2 || self.direction == 4){
                    var w = new water(self.x + rInt(-30,30), self.y+ rInt(-2,3), self.direction, self.speed, self.damage, 0);
                }
                if (self.direction == 1 || self.direction == 3){
                    var w = new water(self.x + rInt(-2,3), self.y+ rInt(-30,30), self.direction, self.speed, self.damage, 0);
                }
                w.sc = 1;
                parts.push(w);
            }
        }
    }
    
    self.hit = false;
    self.hitcounter = 0;
    self.updatespell = function(){
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

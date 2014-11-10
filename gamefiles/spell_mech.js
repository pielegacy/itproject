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
    self.damage = 190;
    self.knock = 0;
    self.type = type;
    self.direction = direction;
        if (currentype == "Air"){
            if (currentspellid == 1){
                self.speed = 20;
                self.damage = 5;
                self.knock = 15;
                wizard.mana += 10;
                for (i = 0; i < 5; i++){
                    if (self.direction == 1 || self.direction == 3){
                        var w = new air(self.x + rInt(-10,10), self.y, self.direction, self.speed, self.damage,2);
                    }
                    if (self.direction == 2 || self.direction == 4){
                        var w = new air(self.x, self.y + rInt(-10,10), self.direction, self.speed, self.damage,2);
                    }
                }
                parts.push(w);
            }
        }
        if (currentype == "Fire"){
            if (currentspellid == 1){
                self.speed = 10;
                self.damage = 10;
                self.knock = 8;
                wizard.mana += 20;
                for (i = 0; i < rInt(1,3 + wizard.smod); i++){
                    var w = new fire(self.x, self.y, self.direction, self.speed, self.damage,5);
                    parts.push(w);
                }
            }
            if (currentspellid == 2){
                self.speed = 10;
                self.damage = 2;
                self.knock = 8;
                wizard.mana += 1;
                for (i = 0; i < 1; i++){
                    var w = new fire(self.x, self.y, self.direction, self.speed, self.damage,3);
                    w.sc = 3;
                    parts.push(w);
                }
            }
        }
        if (currentype == "Earth"){
            if (currentspellid == 1){
                self.speed = 5;
                self.damage = 12;
                self.knock = 20;
                wizard.mana += 30;
                for (i = 0; i < rInt(1,3 + wizard.smod); i++){
                    var w = new earth(self.x, self.y, self.direction, self.speed, self.damage,2);
                    parts.push(w);
                }
            }
        }
        if (currentype == "Water"){
            if (currentspellid == 1){
                self.speed = 12;
                self.damage = 1;
                self.knock = 10;
                wizard.mana += 20;
                for (i = 0; i < 10; i++){
                    var w = new water(self.x, self.y, self.direction, self.speed, self.damage, 2);
                    parts.push(w);
                }
            }
        }
        if (currentype == "Plasma"){
            self.speed = 20;
            self.damage = 1;
            self.knock = rInt(30,40);
            wizard.mana += 50;
            for (i = 0; i < 10; i++){
                var w = new plasma(self.x, self.y, self.direction, self.speed, self.damage,0);
                w.sc = 3;
                w.horiz = 10;
                parts.push(w);
            }
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
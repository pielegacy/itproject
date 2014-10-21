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
            var w = new air(self.x, self.y, self.direction, self.speed, self.damage);
            parts.push(w);
        }
        if (currentype == "Fire"){
            self.speed = 15;
            self.damage = 10;
            self.knock = 8;
            wizard.mana += 20;
            for (i = 0; i < 10; i++){
                var w = new fire(self.x, self.y, self.direction, self.speed, self.damage);
                parts.push(w);
            }
        }
        if (currentype == "Earth"){
            self.speed = 8;
            self.damage = 15;
            self.knock = 20;
            wizard.mana += 30;
            for (i = 0; i < 5; i++){
                var w = new earth(self.x, self.y, self.direction, self.speed, self.damage);
                parts.push(w);
            }
        }
        if (currentype == "Water"){
            self.speed = 12;
            self.damage = 4;
            self.knock = 10;
            wizard.mana += 20;
            for (i = 0; i < 5; i++){
                var w = new water(self.x, self.y, self.direction, self.speed, self.damage);
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

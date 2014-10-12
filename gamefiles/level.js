function mobloader(){
    var self = this;
    for (c = 0; c < 3; c++){
        var t = new enemy(rInt(10, 400), rInt(10,400));
        enemies.push(t);
    }
    self.updatemobs = function(){
        for (l = 0; l < enemies.length; l++){
            enemies[l].updatemob();
        }
    }
}
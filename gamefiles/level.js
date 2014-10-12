function mobloader(){
    var self = this;
    var counter = 0;
    var t = new enemy(rInt(10, 400), rInt(10,400));
    enemies.push(t);
    self.updatemobs = function(){
        counter ++;
        if (counter > 20){
            counter = 0;
            var t = new enemy(rInt(10, 400), rInt(10,400));
            enemies.push(t);
        }
        for (l = 0; l < enemies.length; l++){
            enemies[l].updatemob();
        }
    }
}
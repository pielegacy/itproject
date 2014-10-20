var wizard = new mainchar(200,200);
var enemies = [];
var enemysort = [0, 0, 0];
var expbundle = [];
var bloods = [];
var waters = [];
var wateronscreen = false;
var mobs = new mobloader(enemysort);
function updategame(){
    document.getElementById("title").innerHTML = waters.length;
    for (e = 0; e < expbundle.length; e++){
        expbundle[e].updateexp();
    }
	wizard.updatechar();
    mobs.updatemobs();
    for (p = 0; p < particles.length; p++){
        particles[p].updateparticle();
    }
    for (b = 0; b < bloods.length; b++){
        bloods[b].updateblood();
    }
    wateronscreen = false;
    for (w = 0; w < waters.length; w++){
        if (waters[w].active){
            wateronscreen = true;
        }
        waters[w].updatewater();
    }
    if (wateronscreen == false){
        waters = [];
    }
    
}

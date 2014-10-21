var wizard = new mainchar(200,200);
var enemies = [];
var enemysort = [0, 0, 0];
var expbundle = [];
var bloods = [];
var parts = [];
var wateronscreen = false;
var mobs = new mobloader(enemysort);
function updategame(){
    document.getElementById("title").innerHTML = parts.length;
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
    onscreen = false;
    for (w = 0; w < parts.length; w++){
        if (parts[w].active){
            onscreen = true;
        }
        parts[w].updatepart();
    }
    if (onscreen == false){
        parts = [];
    }
    
}

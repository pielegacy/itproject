var wizard = new mainchar(50, 370);
var enemies = [];
var enemysort = [1, 5, 10];
var expbundle = [];
var bloods = [];
var mobs = new mobloader(enemysort);
function updategame(){
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
}

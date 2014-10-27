var enemies = [];
var enemysort = [0, 0, 0];
var expbundle = [];
var bloods = [];
var parts = [];
var running = false;
var wateronscreen = false;
var mobs = new mobloader(enemysort);
var wizardlist = [];
var currentwiz = 0;
for (m = 0; m < 3; m++){
    var wiz = new mainchar(200,200);
    wizardlist.push(wiz);
}
var wizard = wizardlist[currentwiz];
function updategame(){ 
    for (e = 0; e < expbundle.length; e++){
        expbundle[e].updateexp();
    }
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
    wizard.updatechar();
    if (wizard.c.active == false){
        running = false;
        currentwiz += 1;
        if (currentwiz < wizardlist.length){
            wizard = wizardlist[currentwiz];
        } else {
            document.getElementById("title").innerHTML = "Game Over";
        }
    }
    
}

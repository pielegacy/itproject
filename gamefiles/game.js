var wizard = new mainchar(1, 50, 370);
var enemies = [];
var mobs = new mobloader(10);
function updategame(){
	wizard.updatechar();
    mobs.updatemobs();
}

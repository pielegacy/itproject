var wizard = new mainchar(1, 50, 370);
var enemies = [];
var enemysort = [1, 5, 10];
var mobs = new mobloader(enemysort);
function updategame(){
	wizard.updatechar();
    mobs.updatemobs();
}

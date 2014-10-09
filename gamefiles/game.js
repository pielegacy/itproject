function updategame(){
	//inst.updateinstance();
	wizard.updatechar();
    enem.updatemob();
   
    for (i = 0; i < things; i++){
        things[i].updaterect();
    }
}
var wizard = new mainchar(1, 50, 370);
var enem= new enemy(150, 150);
//var inst = new instance(10, wizard);
var things = [];

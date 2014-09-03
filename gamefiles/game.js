function updategame(){
	inst.updateinstance();
	wizard.updatechar();
}
var wizard = new mainchar(1, 50, 370);
var inst = new instance(10, wizard);
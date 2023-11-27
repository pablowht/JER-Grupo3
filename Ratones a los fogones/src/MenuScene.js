class MenuScene extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload(){
        this.load.image('BotonPrueba','ASSETS/UI/MENUSCENE/BotonPrueba.png');
    }
    create(){
    let BotonPrueba = this.add.image(445,445,'BotonPrueba');
        this.add.text(20,20,"Loading time...");
        //this.scene.start("Game");
        BotonPrueba.setInteractive();
        BotonPrueba.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            console.log("boton pulsado")
            this.scene.start("Game")
        });
            //this.scene.start("Game");

    }
    update(){

    }
   // clickHandler(BotonPrueba){
    //    this.scene.start("Game");
    //}
}
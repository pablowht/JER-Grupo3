class CreditsScene extends Phaser.Scene {
    constructor() {
        super("Creditos");
    }
    preload(){

    }
    create(){
        this.add.image(0,0,'Fondo_Creditos').setOrigin(0, 0);
        this.add.image(950,650,'Nombres');
        this.add.image(950,150,'Titulo');
        //this.add.text(20,20,"PANTALLA DE CREDITOS");

        let BotonVolver = this.add.image(150,150,'Flecha');
        BotonVolver.setInteractive();

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            //console.log("boton volver creditos");
            this.scene.start("Menu")
        });
    }
    update(){

    }
}
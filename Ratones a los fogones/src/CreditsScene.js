class CreditsScene extends Phaser.Scene {
    constructor() {
        super("Creditos");
    }
    preload(){
        this.load.image('Fondo','ASSETS/INTERFACES/Interfaces_FondoRallado.png');
        this.load.image('Flecha_volver','ASSETS/INTERFACES/Interfaces_Botón_Retroceso.png');
        this.load.image('Nombres','ASSETS/INTERFACES/Credits/Nombres.png');
        this.load.image('Titulo','ASSETS/INTERFACES/Credits/Titulo_Creditos.png')
    }
    create(){
        this.add.image(0,0,'Fondo').setOrigin(0, 0);
        this.add.image(950,650,'Nombres');
        this.add.image(950,150,'Titulo');
        this.add.text(20,20,"PANTALLA DE CREDITOS");

        let BotonVolver = this.add.image(150,150,'Flecha_volver');
        BotonVolver.setInteractive();

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            //console.log("boton volver creditos");
            this.scene.start("Menu")
        });
    }
    update(){

    }
}
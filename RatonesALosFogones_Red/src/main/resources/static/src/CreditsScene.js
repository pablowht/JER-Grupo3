class CreditsScene extends Phaser.Scene {
    constructor() {
        super("Creditos");
    }

    preload(){}

    create(){
        this.add.image(0,0,'Fondo_Creditos').setOrigin(0, 0);
        this.add.image(950,650,'Nombres');
        this.add.image(950,150,'Titulo');
        this.add.image(1410,530,'RatonM');
        this.add.image(300,650,'RatonB');
        this.add.image(1440,840 ,'RatonG');

        let BotonVolver = this.add.image(150,150,'Flecha');
        BotonVolver.setInteractive();

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("Menu")
        });
    }
}
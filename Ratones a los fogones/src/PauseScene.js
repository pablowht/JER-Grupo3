
class PauseScene extends Phaser.Scene {
    constructor() {
        super("Pause");
    }
    preload(){ }
    create(){

        console.log("PANTALLA AJUSTES");
        //PAUSA
        this.add.image(0, 0, 'FondoPausa').setOrigin(0, 0);
        let BotonContinuar=this.add.image(753, 960, 'BotonContinuar');
        BotonContinuar.setInteractive();
        let BotonSalir=this.add.image(1167, 960, 'BotonSalir');
        BotonSalir.setInteractive();
        let BotonSonido=this.add.image(960,810,'BotonSonido');

        BotonSonido.setInteractive();
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        BotonContinuar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            console.log("boton pulsado")
            this.scene.resume("Game");
            this.scene.stop();
        });

        BotonSalir.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            console.log("Boton Menu");
            this.scene.start("Creditos");
            //this.scene.stop();

        });
    }
    update(){

        if (this.esc.isDown) {
            this.scene.resume("Game");
            this.scene.stop();
        }
    }
}

class PauseScene extends Phaser.Scene {
    constructor() {
        super("Pause");
    }
    preload(){}

    isPaused;

    init(data){
        this.isPaused=data.isPaused;
    }
    create(){

        console.log("PANTALLA AJUSTES");
        //PAUSA
        this.add.image(0, 0, 'FondoPausa').setOrigin(0, 0);

        let BotonContinuar=this.add.image(753, 960, 'BotonContinuar');
        if(!this.isPaused){ BotonContinuar.setVisible(false); BotonContinuar.disableInteractive(); }
        if(this.isPaused){ BotonContinuar.setVisible(true); BotonContinuar.setInteractive(); }

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
            if(!this.isPaused) {
                this.scene.start("Menu");
            }else{
                this.scene.start('Menu');
                this.scene.stop('Game');
                this.scene.stop('PlayerSelection');
                this.scene.sleep();

            }

        });

    }
    update(){

      /*  if (this.esc.isDown) {
            this.scene.resume("Game");
            this.scene.stop();
        }*/
    }

}
class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    preload(){
        this.load.image('Fondo','ASSETS/INTERFACES/LevelEnd/Fondo_FinDeNivel.png');
        this.load.image('Boton_Salir','ASSETS/INTERFACES/LevelEnd/Boton_Salir.png');
        this.load.image('RatónGanador','ASSETS/INTERFACES/LevelEnd/RatonBlanco_Winner.png');
        this.load.image('RatónPerdedor','ASSETS/INTERFACES/LevelEnd/RatonBlanco_Loser.png');

        this.load.image('TextoGana1', 'ASSETS/INTERFACES/LevelEnd/TextoGanar_Player1.png');
        this.load.image('TextoGana2', 'ASSETS/INTERFACES/LevelEnd/TextoGanar_Player2.png');

        this.load.image('TextoPierde1', 'ASSETS/INTERFACES/LevelEnd/TextoPerder_Player1.png');
        this.load.image('TextoPierde2', 'ASSETS/INTERFACES/LevelEnd/TextoPerder_Player2.png');

    }
    create(){
        this.add.image(0,0,'Fondo').setOrigin(0, 0);
        this.add.image(500,300,'RatónGanador');
        this.add.image(700,200,'RatónPerdedor');
        let BotonSalir = this.add.image(1400,750,'Boton_Salir');
        BotonSalir.setInteractive();

        BotonSalir.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            //console.log("boton volver creditos");
            this.scene.start("Menu")
        });

        //Al tocar la meta se pausa el juego durante segundo y medio y luego salta está escena
        // con el nombre de playerx gana
    }
    update(){

    }
}
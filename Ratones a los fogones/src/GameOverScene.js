class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    preload(){
        this.load.image('Fondo','ASSETS/INTERFACES/LevelEnd/Fondo_FinDeNivel.png');
        this.load.image('Boton_Salir','ASSETS/INTERFACES/LevelEnd/Boton_Salir.png');
        this.load.image('RatónGanadorB','ASSETS/INTERFACES/LevelEnd/RatonBlanco_Winner.png');
        this.load.image('RatónPerdedorB','ASSETS/INTERFACES/LevelEnd/RatonBlanco_Loser.png');
        this.load.image('RatónGanadorM','ASSETS/INTERFACES/LevelEnd/RatonMarron_Winner.png');
        this.load.image('RatónPerdedorM','ASSETS/INTERFACES/LevelEnd/RatonMarron_Loser.png');
        this.load.image('RatónGanadorG','ASSETS/INTERFACES/LevelEnd/RatonGris_Winner.png');
        this.load.image('RatónPerdedorG','ASSETS/INTERFACES/LevelEnd/RatonGris_Loser.png');

        this.load.image('TextoGana1', 'ASSETS/INTERFACES/LevelEnd/TextoGanar_Player1.png');
        this.load.image('TextoGana2', 'ASSETS/INTERFACES/LevelEnd/TextoGanar_Player2.png');

        this.load.image('TextoPierde1', 'ASSETS/INTERFACES/LevelEnd/TextoPerder_Player1.png');
        this.load.image('TextoPierde2', 'ASSETS/INTERFACES/LevelEnd/TextoPerder_Player2.png');

    }
    create(){
        this.add.image(0,0,'Fondo').setOrigin(0, 0);
        //Se cambia el color del raton dependiendo del escogido en la escenal player selection
        this.add.image(470,600,'RatónGanadorB');
        this.add.image(1050,800,'RatónPerdedorB');
        //Se cambia el color del raton dependiendo del escogido en la escenal player selection
        this.add.image(1350,260,'TextoGana1');
        this.add.image(1350,360,'TextoPierde2');

        let BotonSalir = this.add.image(1600,900,'Boton_Salir');
        BotonSalir.setInteractive();

        BotonSalir.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            //console.log("boton volver creditos");
            this.scene.start("Menu")
        });

        //Al tocar la meta se pausa el juego durante segundo y medio y luego salta está escena
        //con el nombre de playerx gana y el nombre de playerx pierde
    }
    update(){

    }
}
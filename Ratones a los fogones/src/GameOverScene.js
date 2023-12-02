class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOver");


    }
    colorRaton1;
    colorRaton2;
    ganador1;
    ganador2;

    init(data){
        this.colorRaton1 = data.colorRaton1;
        this.colorRaton2 = data.colorRaton2;
        this.raton1 = data.raton1;
        this.raton2 = data.raton2;
    }
    preload()
    {


    }
    create(){
        this.add.image(0,0,'Fondo_GameOver').setOrigin(0, 0);
        if(PlayerSelectionScene.player1Won===true){ //En caso de que pierda el jugador 1
            console.log("GANA 1");
            console.log(this.colorRaton1);
            console.log(this.colorRaton2);
            if(this.colorRaton1 === 'raton_blanco'){
                console.log(this.raton1);
                this.add.image(470,600,'RatónGanadorB');
            }
            else if(this.colorRaton1 === 'raton_marron'){
                this.add.image(470,600,'RatónGanadorM');
            }
            else{
                this.add.image(470,600,'RatónGanadorG');
            }
            this.add.image(1350,260,'TextoGana1');
            if(this.colorRaton2 === 'raton_blanco'){
                this.add.image(1050,800,'RatónPerdedorB');
            }
            else if(this.colorRaton2 === 'raton_marron'){
                this.add.image(1050,800,'RatónPerdedorM');
            }
            else{
                this.add.image(1050,800,'RatónPerdedorG');
            }
            this.add.image(1350,360,'TextoPierde2');
        }
        else{   //En caso de que pierda el jugador 2
            console.log("GANA 2");
            if(this.colorRaton2 === 'raton_blanco'){
                this.add.image(470,600,'RatónGanadorB');
            }
            else if(this.colorRaton2 === 'raton_marron'){
                this.add.image(470,600,'RatónGanadorM');
            }
            else{
                this.add.image(470,600,'RatónGanadorG');
            }
            this.add.image(1350,260,'TextoGana2');
            if(this.colorRaton1 === 'raton_blanco'){
                this.add.image(1050,800,'RatónPerdedorB');
            }
            else if(this.colorRaton1 === 'raton_marron'){
                this.add.image(1050,800,'RatónPerdedorM');
            }
            else{
                this.add.image(1050,800,'RatónPerdedorG');
            }
            this.add.image(1350,360,'TextoPierde1');
        }
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
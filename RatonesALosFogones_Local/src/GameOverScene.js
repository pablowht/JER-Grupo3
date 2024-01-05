class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    colorRaton1;
    colorRaton2;
    ganador1;
    ganador2;

    init(data){
        this.dataObj = data;
    }

    create(){

        this.input.keyboard.disableGlobalCapture();

        this.colorRaton1 = this.dataObj.raton1;
        this.colorRaton2 = this.dataObj.raton2;
        this.ganador1 = this.dataObj.ganador1;
        this.ganador2 = this.dataObj.ganador2;

        this.sound.stopAll();
        this.sound.play('GameEndSound');

        this.add.image(0,0,'FondoGameOver').setOrigin(0, 0);
        this.add.image(1315,180,'RecuadroTextos')

        if(this.ganador1){ //En caso de que gane el jugador 1
            //GANADOR
            if(this.colorRaton1 === 'raton_blanco'){
                this.add.image(470,560,'RatónGanadorB');
            }
            else if(this.colorRaton1 === 'raton_marron'){
                this.add.image(470,560,'RatónGanadorM');
            }
            else if(this.colorRaton1 === 'raton_gris'){
                this.add.image(470,560,'RatónGanadorG');
            }
            this.add.image(1315,110,'TextoGana1');
            //PERDEDOR
            if(this.colorRaton2 === 'raton_blanco'){
                this.add.image(1050,760,'RatónPerdedorB');
            }
            else if(this.colorRaton2 === 'raton_marron'){
                this.add.image(1050,760,'RatónPerdedorM');
            }
            else if (this.colorRaton2 === 'raton_gris'){
                this.add.image(1050,760,'RatónPerdedorG');
            }
            this.add.image(1315,210,'TextoPierde2');
        }
        else{   //En caso de que gane el jugador 2
            //GANADOR
            if(this.colorRaton2 === 'raton_blanco'){
                this.add.image(470,560,'RatónGanadorB');
            }
            else if(this.colorRaton2 === 'raton_marron'){
                this.add.image(470,560,'RatónGanadorM');
            }
            else if(this.colorRaton2 === 'raton_gris'){
                this.add.image(470,560,'RatónGanadorG');
            }
            this.add.image(1315,110,'TextoGana2');
            //PERDEDOR
            if(this.colorRaton1 === 'raton_blanco'){
                this.add.image(1050,760,'RatónPerdedorB');
            }
            else if(this.colorRaton1 === 'raton_marron'){
                this.add.image(1050,760,'RatónPerdedorM');
            }
            else if(this.colorRaton1 === 'raton_gris'){
                this.add.image(1050,760,'RatónPerdedorG');
            }
            this.add.image(1315,210,'TextoPierde1');
        }

        let BotonMenu = this.add.image(991.5,430,'Boton_Menu');
        BotonMenu.setInteractive({ cursor: 'pointer' });

        BotonMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.sleep('GameOver');
            this.scene.start('Menu');
        });

        let BotonNiveles = this.add.image(1346.5,430,'Boton_Niveles');
        BotonNiveles.setInteractive({ cursor: 'pointer' });

        BotonNiveles.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.sleep('GameOver');
            this.scene.start('LevelSelection');
        });

        this.sound.play('MenuMusic',{loop:true});
    }
}



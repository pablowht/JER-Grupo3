class MenuScene extends Phaser.Scene{
    constructor(){
        super("Menu");
    }

    preload(){
        this.load.image('Fondo_Menu','ASSETS/INTERFACES/Menu/Fondo_Menu.png');
        this.load.image('BOTON_AJUSTES','ASSETS/INTERFACES/Menu/BOTON_AJUSTES.png');
        this.load.image('BOTON_CREDITOS','ASSETS/INTERFACES/Menu/BOTON_CREDITOS .png');
        this.load.image('BOTON_JUGAR','ASSETS/INTERFACES/Menu/BOTON_JUGAR.png');
        this.load.image('BOTON_JUGAR2','ASSETS/INTERFACES/Menu/BOTON_JUGAR.png');

        //Pantalla de carga
        this.load.image('Fondo_Loading', 'ASSETS/INTERFACES/Loading/Fondo_ConBarraCargando.png');
        this.load.image('Barra_Loading', 'ASSETS/INTERFACES/Loading/BarraLoading_Barra.png');
    }
    create(){

        this.add.image(0,0,'Fondo_Menu').setOrigin(0, 0);
        let BotonJugar = this.add.image(990,540,'BOTON_JUGAR');
        BotonJugar.setInteractive();

        let BotonCreditos = this.add.image(990,680,'BOTON_CREDITOS');
        BotonCreditos.setInteractive();

        let BotonAjustes = this.add.image(990,820,'BOTON_AJUSTES');
        BotonAjustes.setInteractive();

        let BotonJugar2 = this.add.image(100,540,'BOTON_JUGAR2');
        BotonJugar2.setInteractive();

        BotonJugar2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            console.log("boton pulsadoa")
            this.scene.start("GameOver") //Niveles
            //Cuando este selector de nivel, poner que al jugar vaya antes a "Niveles"
        });

        //CAMBIO DE ESCENA DEL MENU A LA ESCENA IN-GAME
        BotonJugar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            console.log("boton pulsado")
            this.scene.start("Loading") //Niveles
            //Cuando este selector de nivel, poner que al jugar vaya antes a "Niveles"
        });

        //CAMBIO DE ESCENA DEL MENU A CREDITOS
        BotonCreditos.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            console.log("boton pulsado")
            this.scene.start("Creditos")
        });

        //CAMBIO DE ESCENA DEL MENU A AJUSTES
        BotonAjustes.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            console.log("boton pulsado")
            this.scene.start("Pause")

        });


    }
    update(){

    }

}
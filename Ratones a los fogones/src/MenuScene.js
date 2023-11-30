class MenuScene extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload(){
        this.load.image('Fondo_Menu','ASSETS/INTERFACES/Menu/Fondo_Menu.png');
        this.load.image('BOTON_AJUSTES','ASSETS/INTERFACES/Menu/BOTON_AJUSTES.png');
        this.load.image('BOTON_CREDITOS','ASSETS/INTERFACES/Menu/BOTON_CREDITOS .png');
        this.load.image('BOTON_JUGAR','ASSETS/INTERFACES/Menu/BOTON_JUGAR.png');



    }
    create(){
        this.add.text(20,20,"Loading time...");

        this.add.image(960,540,'Fondo_Menu');
        let BotonJugar = this.add.image(990,540,'BOTON_JUGAR');
        BotonJugar.setInteractive();

        let BotonCreditos = this.add.image(990,680,'BOTON_CREDITOS');
        BotonCreditos.setInteractive();

        let BotonAjustes = this.add.image(990,820,'BOTON_AJUSTES');
        BotonAjustes.setInteractive();


        //CAMBIO DE ESCENA DEL MENU A LA ESCENA IN-GAME
        BotonJugar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            console.log("boton pulsado")
            this.scene.start("Game")
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
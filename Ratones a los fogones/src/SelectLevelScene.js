class SelectLevelScene extends Phaser.Scene {
    constructor() {
        super("Niveles");
    }
    preload(){
        this.load.image('Fondo','ASSETS/INTERFACES/Interfaces_FondoRallado.png');
        this.load.image('Flecha_volver','ASSETS/INTERFACES/Interfaces_Botón_Retroceso.png');
        this.load.image('Titulo','ASSETS/INTERFACES/LevelSelection/Titulo_Seleccion_Niveles.png');
        this.load.image('Boton1','ASSETS/INTERFACES/LevelSelection/Boton_Nivel_1.png');
        //this.load.image('Boton2','ASSETS/INTERFACES/LevelSelection/Boton_Nivel_2.png');
        //this.load.image('Boton3','ASSETS/INTERFACES/LevelSelection/Boton_Nivel_3.png');
        //this.load.image('Simbolo1','ASSETS/INTERFACES/LevelSelection/Simbolo_Nivel_1.png');
        //this.load.image('Simbolo2','ASSETS/INTERFACES/LevelSelection/Simbolo_Nivel_2.png');
        //this.load.image('Simbolo3','ASSETS/INTERFACES/LevelSelection/Simbolo_Nivel_3.png');
    }
    create(){
        this.add.image(0,0,'Fondo').setOrigin(0, 0);
        this.add.image(950,150,'Titulo');
        this.add.text(20,20,"PANTALLA DE SELECCION DE NIVEL");

        let Boton1 = this.add.image(150,150,'Boton1');
        Boton1.setInteractive();

        Boton1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            //console.log("boton volver creditos");
            this.scene.start("Game")
        });
    }
    update(){

    }
}
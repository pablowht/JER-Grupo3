class SelectLevelScene extends Phaser.Scene {
    constructor() {
        super("LevelSelection");
    }
    preload(){
        this.load.image('Fondo','ASSETS/INTERFACES/Interfaces_FondoRallado.png');
        this.load.image('Flecha_volver','ASSETS/INTERFACES/Interfaces_Botón_Retroceso.png');
        this.load.image('Titulo','ASSETS/INTERFACES/LevelSelection/Titulo_Seleccion_Niveles.png');
        this.load.image('Boton1','ASSETS/INTERFACES/LevelSelection/Boton_Nivel_1.png');
    }
    create(){
        this.add.image(0,0,'Fondo').setOrigin(0, 0);
        this.add.image(950,150,'Titulo');
        this.add.text(20,20,"PANTALLA DE SELECCION DE NIVEL");

        let BotonNivel1 = this.add.image(150,150,'Boton1');
        BotonNivel1.setInteractive();

        BotonNivel1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.scene.start("Game")
        });
    }
    update(){

    }
}
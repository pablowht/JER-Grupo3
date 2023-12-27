class SelectLevelScene extends Phaser.Scene {
    constructor() {
        super('LevelSelection');
    }
    preload(){
        this.load.image('Titulo','ASSETS/INTERFACES/LevelSelection/Titulo_Seleccion_Niveles.png');
        this.load.image('Boton1','ASSETS/INTERFACES/LevelSelection/Boton_Nivel_1.png');
    }
    create(){
        this.add.image(0,0,'Fondo').setOrigin(0, 0);
        this.add.image(950,150,'Titulo');
        this.add.text(20,20,"PANTALLA DE SELECCION DE NIVEL");

        let BotonVolver = this.add.image(150,100,'Flecha');
        BotonVolver.setInteractive();

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("Menu");
        });

        let BotonNivel1 = this.add.image(150,150,'Boton1');
        BotonNivel1.setInteractive();

        BotonNivel1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('LevelOne')
        });

        let BotonNivel2 = this.add.image(150,150,'Boton2');
        BotonNivel2.setInteractive();

        BotonNivel2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('LevelTwo')
        });
    }
    update(){

    }
}
class SelectLevelScene extends Phaser.Scene {
    constructor() {
        super("LevelSelection");
    }
    preload(){

    }
    create(){
        this.add.image(0,0,'FondoSeleccionNiveles').setOrigin(0, 0);

        let BotonNivel1 = this.add.image(150,150,'BotonN1');
        BotonNivel1.setInteractive();

        BotonNivel1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.scene.start("Game")
        });
        let BotonNivel2 = this.add.image(650,150,'BotonN2');
        BotonNivel2.setInteractive();

        BotonNivel2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.scene.start("Game")
        });
    }
    update(){

    }
}
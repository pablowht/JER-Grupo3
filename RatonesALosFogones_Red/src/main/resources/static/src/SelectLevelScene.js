class SelectLevelScene extends Phaser.Scene {
    constructor() {
        super('LevelSelection');
    }
	init(data){
		this.user = data.user;
		this.password = data.password;
		this.raton1 = data.colorRaton1;
		this.raton2 = data.colorRaton2;

	}
	
    preload(){
    }
    
    create(){
        this.add.image(0,0,'FondoSeleccionNiveles').setOrigin(0, 0);

        let BotonVolver = this.add.image(150,100,'Flecha');
        BotonVolver.setInteractive();

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("Menu");
        });

        let BotonNivel1 = this.add.image(550,850,'BotonN1');
        BotonNivel1.setInteractive();

        BotonNivel1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.scene.start("LevelTwo")
        });

        let BotonNivel2 = this.add.image(1150,850,'BotonN2');
        BotonNivel2.setInteractive();

        BotonNivel2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.scene.start("LevelOne")
        });
    }
    update(){

    }

}
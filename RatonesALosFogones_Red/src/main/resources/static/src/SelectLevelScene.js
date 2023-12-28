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
    
    create(){

        this.add.image(0,0,'FondoSeleccionNiveles').setOrigin(0, 0);

        let Meme1 = this.add.image(1470,795,'MemeN1').setInteractive();
        let Meme2 = this.add.image(452,530,'MemeN2').setInteractive();
        Meme1.setVisible(false);
        Meme2.setVisible(false);

        let BotonVolver = this.add.image(150,150,'Flecha');
        BotonVolver.setInteractive();

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('Menu');
        });

        let BotonNivel1 = this.add.image(960.5,529.5,'BotonN1');
        BotonNivel1.setInteractive();

        let BotonNivel2 = this.add.image(960.5,795.5,'BotonN2');
        BotonNivel2.setInteractive();

        BotonNivel1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('LevelOne')
        });

        BotonNivel2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('LevelTwo')
        });

        Meme1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            //this.sound.play('InteractSound');
            Meme1.setVisible(true);
        });

        Meme1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            Meme1.setVisible(false);
        });

        Meme2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            //this.sound.play('InteractSound');
            Meme2.setVisible(true);
        });

        Meme2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            Meme2.setVisible(false);
        });
    }
}
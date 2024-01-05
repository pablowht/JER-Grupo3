
class PauseScene extends Phaser.Scene {
    constructor() {
        super("Pause");
    }
    preload(){}

    isPaused;
    muted;
    level;

    init(data){
        this.isPaused=data.isPaused;
        this.levelNumber = data.level;
    }
    create(){
        //FONDO
        this.add.image(0, 0, 'FondoPausa').setOrigin(0, 0);

        //BOTONES
        let BotonContinuar = this.add.image(753, 960, 'BotonContinuar');
        if(!this.isPaused){ BotonContinuar.setVisible(false); BotonContinuar.disableInteractive(); }
        if(this.isPaused){ BotonContinuar.setVisible(true); BotonContinuar.setInteractive(); }

        let BotonSalir=this.add.image(1167, 960, 'BotonSalir');
        BotonSalir.setInteractive({ cursor: 'pointer' })
        let BotonSonido=this.add.image(960,810,'BotonSonido');
        BotonSonido.setInteractive({ cursor: 'pointer' });

        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        BotonContinuar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            //this.scene.resume("");
            this.CheckLevel()
            this.scene.resume(this.level);
            this.scene.sleep();
        });

        BotonSalir.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(!this.isPaused) {
                this.scene.start("Menu");
            }else{
                this.sound.stopAll();
                this.sound.play('MenuMusic');
                this.scene.start('Menu');
                this.scene.stop('Game');
            }
        });

        BotonSonido.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(!this.muted) {
                this.BotonSonido = this.add.image(960,810,'BotonMute');
                this.sound.setMute(true);
                this.muted = !this.muted;}
            else {
                this.BotonSonido = this.add.image(960,810,'BotonSonido');
                this.sound.setMute(false);
                this.muted = !this.muted;
            }
        });


    }
    CheckLevel(){
        if(this.levelNumber === 1){
            this.level = 'LevelOne';
        } else if(this.levelNumber === 2){
            this.level = 'LevelTwo';
        }
    }

}
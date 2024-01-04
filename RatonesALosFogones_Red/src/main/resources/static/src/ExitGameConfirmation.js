class ExitGameConfirmation extends Phaser.Scene {
    constructor() {
        super("ExitGameConfirmation");
    }

    level;

    init(data) {
        this.levelExit = data.levelExit;
        this.isPaused= data.isPaused;
    }

    create() {
        this.add.image(0, 0, 'FondoSalir').setOrigin(0, 0);
        let botonAceptar = this.add.image(700, 860, 'BotonAceptar');
        botonAceptar.setInteractive({cursor: 'pointer'});
        let botonCancelar = this.add.image(1250, 860, 'BotonCancelar');
        botonCancelar.setInteractive({cursor: 'pointer'});
        botonAceptar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            //this.sound.play('InteractSound');
            this.sound.stopAll();
            this.sound.play('MenuMusic');
            this.CheckLevel();
            this.scene.start('Menu');
            //this.CheckLevel();
            this.scene.stop(this.level);

        });
        botonCancelar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.CheckLevel();
            this.scene.start('Pause',{isPaused: this.isPaused,levelNumber:this.levelExit });
            
        });

    }

    CheckLevel() {
        if (this.levelExit === 1) {
            this.level = 'LevelOne';
        } else if (this.levelExit === 2) {
            this.level = 'LevelTwo';
        }
    }
}
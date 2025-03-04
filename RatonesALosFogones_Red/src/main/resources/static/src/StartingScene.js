class StartingScene extends Phaser.Scene {

    constructor() {
        super("StartScene");
    }
    preload() {
        this.load.image('CompanyBackground', '../assets/INTERFACES/CompanyBackground.png');
        //Pantalla de carga
        this.load.image('Fondo_Loading', '../assets/INTERFACES/Loading/Fondo_ConBarraCargando.png');
        this.load.image('Barra_Loading', '../assets/INTERFACES/Loading/BarraLoading_Barra.png');
    }

    create() {
        this.add.image(0,0, 'CompanyBackground').setOrigin(0,0);
    }

    update(){
        this.input.keyboard.on('keydown', event => {
            this.scene.start("Loading");
        });
        this.input.on('pointerdown', event => {
            this.scene.start("Loading");
        });
    }
}
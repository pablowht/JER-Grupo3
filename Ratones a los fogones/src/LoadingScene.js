class LoadingScene extends Phaser.Scene {
    constructor() {
        super("Loading");
    }

    preload() {
        console.log("Precargando")
        let background = this.add.image(0,0,'Fondo_Loading').setOrigin(0,0);
        let progressBar = this.add.image(960,497,'Barra_Loading');
        this.load.on('progress', function (value) {
            let ancho = progressBar.width * value;
            progressBar.setCrop(0 ,0, ancho, progressBar.height);
            console.log("Cargando")
        });
        this.load.on('complete', function () {
            this.scene.start("Game");
            //progressBar.destroy();
            //background.destroy();
            console.log("HECHO")
        });
    }


}
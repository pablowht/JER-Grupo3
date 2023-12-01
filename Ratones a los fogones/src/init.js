
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

        width: 1920,
        height: 1080,

        zoom: 1,
    },
    //autoRound: false,
    autoResize: true,
    //COSAS DE LA ESCENA
    scene:[GameOverScene,MenuScene,LoadingScene,GameScene,CreditsScene,PauseScene, PlayerSelectionScene], //escena inicial
    //FISICAS
    physics:{ 
        default: 'arcade',
        arcade: {
            debug:false,
            //gravity: {y: 500 }
            //He quitado la gravedad a la fisica porque si no el suelo se cae
        }
    },


};
var game = new Phaser.Game(config);
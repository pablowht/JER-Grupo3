
var config = {
    type: Phaser.AUTO,
    //width: 230, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel
    //height: 350, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel

    //364
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,

        // Or put game size here
        width: 1920,
        height: 1080,

        // Minimum size
       /* min: {
            width: 800,
            height: 600
        },
        // Or set minimum size like these

        // Maximum size
        max: {
            width: 1920,
            height: 1080
        },

        */
        // Or set maximum size like these

        zoom: 1,  // Size of game canvas = game size * zoom
    },
    //autoRound: false,
    autoResize: true,
    //COSAS DE LA ESCENA
    scene:[MenuScene,GameScene,CreditsScene,PauseScene], //escena inicial
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
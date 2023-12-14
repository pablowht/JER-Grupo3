
var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1900,
        height: 1060
    },
    autoResize: true,
    //ESCENAS
    scene:[StartingScene, MenuScene, LoginScene, LoadingScene, PlayerSelectionScene, GameScene, CreditsScene, PauseScene, GameOverScene],
    //FISICAS
    physics:{ 
        default: 'arcade',
        arcade: {
            debug:false
        }
    }
};

var game = new Phaser.Game(config);
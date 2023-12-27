
var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1900,
        height: 1060
    },
    parent: juego,
    dom: {
        createContainer: true,
    },
    autoResize: true,
    //ESCENAS
    scene:[StartingScene, MenuScene, LoginScene, LoadingScene, PlayerSelectionScene, SelectLevelScene, GameScene, CreditsScene, PauseScene, GameOverScene],
    //FISICAS
    physics:{ 
        default: 'arcade',
        arcade: {
            debug:false
        }
    }
};

var game = new Phaser.Game(config);
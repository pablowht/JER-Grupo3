var config = {
    type: Phaser.AUTO,
    gameTitle: "Ratones a los Fogones",
    fullscreenTarget: "juego",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    parent: "juego",
    dom: {
        createContainer: true,
    },
    autoResize: true,
    //ESCENAS
    scene:[StartingScene, MenuScene, LoadingScene, PlayerSelectionScene, SelectLevelScene, LevelOne, LevelTwo, CreditsScene, PauseScene, GameOverScene],
    //FISICAS
    physics:{
        default: 'arcade',
        arcade: {
            debug:false
        }
    }
};

var game = new Phaser.Game(config);

var config = {
    type: Phaser.AUTO,
    gameTitle: "Ratones a los Fogones",
    fullscreenTarget: "juego",
    //pixelArt: true,
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
    scene:[StartingScene, MenuScene, LoginCreateScene, LoginScene, CreateAccountScene, UserScene, ChangePasswordScene, DeleteUserScene, LoadingScene, Lobby, PlayerSelectionScene, SelectLevelScene, LevelOne, LevelTwo, CreditsScene, PauseScene, GameOverScene,ExitGameConfirmation],
    //FISICAS
    physics:{ 
        default: 'arcade',
        arcade: {
            debug:false
        }
    }
};

var game = new Phaser.Game(config);
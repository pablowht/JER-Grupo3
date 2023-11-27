var config = {
    type: Phaser.AUTO,
    width: 230, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel
    height: 350, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel
    //364
    autoResize: true,

    //FISICAS
    physics:{
        default: 'arcade',
        arcade: {
            debug:false,
            //gravity: {y: 500 }
            //He quitado la gravedad a la fisica porque si no el suelo se cae
        }
    },

    //COSAS DE LA ESCENA
    scene: GameScene //escecna inicial
};
game = new Phaser.Game(config);
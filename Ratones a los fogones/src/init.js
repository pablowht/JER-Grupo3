var config = {
    type: Phaser.AUTO,
    width: 800, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel
    height: 600, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel

    //COSAS DE LA ESCENA
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//variables:
var game = new Phaser.Game(config);
var player1;

function preload(){
    this.load.image('tile_pared', 'assets/tiles/Tiles_Pared.png');
    this.load.image('mapa_recto_1600x182', 'assets/tiles/Tiles_mapa_recto_1600x182.png');
    this.load.spritesheet('raton_player_1','assets/ratones/Raton_Base_WALK_RIGHT_20x30.png',{ frameWidth: 20, frameHeight: 30 } );
}

function create(){

    this.add.image(400,300,'tile_pared');

    player1 = this.add.sprite(100, 450, 'raton_player_1'); //crea el sprite del player, como se ha creado a partir de físicas tiene un cuerpo de física dinámica por defecto

}

function update(){

}
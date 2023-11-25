var config = {
    type: Phaser.AUTO,
    width: 1600, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel
    height: 364, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel

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
    this.load.image('mapa', 'assets/tiles/mapa_recto_1600x182.png');
    this.load.spritesheet('raton_player_1','assets/ratones/Raton_Base_WALK_RIGHT_20x30.png',{ frameWidth: 20, frameHeight: 30 } );
}

function create(){
    this.add.image(0,0,'mapa').setScale(2);
    player1 = this.add.sprite(90, 145, 'raton_player_1').setScale(3); //crea el sprite del player, como se ha creado a partir de físicas tiene un cuerpo de física dinámica por defecto

}

function update(){

}
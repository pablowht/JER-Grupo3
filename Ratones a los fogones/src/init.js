var config = {
    type: Phaser.AUTO,
    width: 1600, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel
    height: 364, //hay que cambiar el tamaño de acuerdo al tamaño TOTAL del nivel
    autoResize: true,

    //FISICAS
    physics:{
        default: 'arcade',
        arcade: {
            debug:false,
            gravity: {y: 500 }
        }
    },

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
var player2;
var velocidad = 100;
const alturaSalto = -200;

function preload(){
    this.load.image('tile_pared', 'assets/tiles/Tiles_Pared.png');
    this.load.image('mapa', 'assets/tiles/mapa_recto_1600x182.png');
    this.load.spritesheet('raton_gris','ASSETS/RATONES/SpriteSheets/Raton_Gris.png',{ frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('raton_blanco','ASSETS/RATONES/SpriteSheets/Raton_Blanco.png',{ frameWidth: 32, frameHeight: 32 } );
    this.load.spritesheet('raton_marron','ASSETS/RATONES/SpriteSheets/Raton_Marron.png',{ frameWidth: 32, frameHeight: 32 } );
}

function create(){
    //MAPA
    this.add.image(0,0,'mapa');
    //CONTROL TECLAS
    cursors = this.input.keyboard.createCursorKeys();
    izqFlecha = cursors.left;
    drcFlecha = cursors.right;
    upFlecha = cursors.up;
    downFlecha = cursors.down;

    izqA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    drcD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    upW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    downS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


    //JUGADORES
    //Aqui iria la funcion de cambiar el raton para cada personaje
    var colorRaton1 = 'raton_gris';
    var colorRaton2 = 'raton_blanco';

    //PLAYER 1
    player1 = this.physics.add.sprite(90, 145, colorRaton1, 0);
    player1.setCollideWorldBounds(true);
    //this.physics.add.collider(player1, walkable);

    //Animaciones
    this.anims.create({
        key: 'idle1',
        frames: this.anims.generateFrameNumbers(colorRaton1, { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'walk1',
        frames: this.anims.generateFrameNumbers(colorRaton1, { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'jump1',
        frames: this.anims.generateFrameNumbers(colorRaton1, { start: 7, end: 8 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'down1',
        frames: this.anims.generateFrameNumbers(colorRaton1, { start: 9, end: 10 }),
        frameRate: 5
    });
    this.anims.create({
        key: 'hurt1',
        frames: this.anims.generateFrameNumbers(colorRaton1, 11 ),
        frameRate: 10
    });

    //PLAYER 2
    player2 = this.physics.add.sprite(150, 145, colorRaton2, 0);
    player2.setCollideWorldBounds(true);
    //this.physics.add.collider(player1, walkable);

    //Animaciones
    this.anims.create({
        key: 'idle2',
        frames: this.anims.generateFrameNumbers(colorRaton2, { start: 0, end: 2 }),
        frameRate: 5,
        repeat: -1
    });
    this.anims.create({
        key: 'walk2',
        frames: this.anims.generateFrameNumbers(colorRaton2, { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'jump2',
        frames: this.anims.generateFrameNumbers(colorRaton2, { start: 7, end: 8 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'down2',
        frames: this.anims.generateFrameNumbers(colorRaton2, { start: 9, end: 10 }),
        frameRate: 10
    });
    this.anims.create({
        key: 'hurt2',
        frames: this.anims.generateFrameNumbers(colorRaton2, 11 ),
        frameRate: 10
    });



}

function update(){
    //Controles de los jugadores
    movementControlsP1();
    movementControlsP2();
}

function movementControlsP1(){
    //CONTROLES MOVIMIENTO PLAYER 1
    if (izqA.isDown)
    {
        player1.setVelocityX(-velocidad);
        player1.anims.play('walk1', true);
        player1.flipX = true;
    }
    else if (drcD.isDown)
    {
        player1.setVelocityX(velocidad);
        player1.anims.play('walk1', true);
        player1.flipX = false;
    }
    else
    {
        player1.setVelocityX(0);
        player1.anims.play('idle1', true);
    }
    if (upW.isDown)
    {
        //&& player1.body.touching.down
        player1.setVelocityY(alturaSalto);
        player1.anims.play('jump1', true);
    }
    if (downS.isDown)
    {
        player1.anims.play('down1', true);
    }
}
function movementControlsP2(){
    //CONTROLES MOVIMIENTO PLAYER 2
    if (izqFlecha.isDown)
    {
        player2.setVelocityX(-velocidad);
        player2.anims.play('walk2', true);
        player2.flipX = true;
    }
    else if (drcFlecha.isDown)
    {
        player2.setVelocityX(velocidad);
        player2.anims.play('walk2', true);
        player2.flipX = false;
    }
    else
    {
        player2.setVelocityX(0);
        player2.anims.play('idle2', true);
    }
    if (upFlecha.isDown)
    {
        //&& player2.body.touching.down
        player2.setVelocityY(alturaSalto);
        player2.anims.play('jump2', true);
    }
    if (downFlecha.isDown)
    {
        player2.anims.play('down2', true);
    }
}
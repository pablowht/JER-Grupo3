class PlayerClass {

    constructor(_playerNumber, _x, _y, _velocity, _jumpAmount) {
        this.playerNumber = _playerNumber;
        this.x = _x;
        this.y = _y;
        this.velocity = _velocity;
        this.jumpAmount = _jumpAmount;

    }

    assignControls(_escena){
        if(this.playerNumber == '1'){
            this.flechaIzquierda = _escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.flechaDerecha = _escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.flechaArriba = _escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.flechaAbajo = _escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        }
        else if(this.playerNumber == '2') {
            this.flechaDerecha = _escena.input.keyboard.createCursorKeys().right;
            this.flechaIzquierda = _escena.input.keyboard.createCursorKeys().left;
            this.flechaArriba = _escena.input.keyboard.createCursorKeys().up;
            this.flechaAbajo = _escena.input.keyboard.createCursorKeys().down;
        }
    }
    loadSpriteSheets(escena){
        escena.load.spritesheet('raton_gris','ASSETS/RATONES/SpriteSheets/Raton_Gris.png',{ frameWidth: 32, frameHeight: 32 } );
        escena.load.spritesheet('raton_blanco','ASSETS/RATONES/SpriteSheets/Raton_Blanco.png',{ frameWidth: 32, frameHeight: 32 } );
        escena.load.spritesheet('raton_marron','ASSETS/RATONES/SpriteSheets/Raton_Marron.png',{ frameWidth: 32, frameHeight: 32 } );
    }
    createAnimsPlayer(escena, color){
        //Animaciones
        escena.anims.create({
            key: 'idle'+this.playerNumber,
            frames: escena.anims.generateFrameNumbers(color, { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

        escena.anims.create({
            key: 'walk'+this.playerNumber,
            frames: escena.anims.generateFrameNumbers(color, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        escena.anims.create({
            key: 'jump'+this.playerNumber,
            frames: escena.anims.generateFrameNumbers(color, { start: 7, end: 8 }),
            frameRate: 10
        });
        escena.anims.create({
            key: 'down'+this.playerNumber,
            frames: escena.anims.generateFrameNumbers(color, { start: 9, end: 10 }),
            frameRate: 5
        });
        escena.anims.create({
            key: 'hurt'+this.playerNumber,
            frames: escena.anims.generateFrameNumbers(color, 11 ),
            frameRate: 10
        });
    }
}
class GameScene extends Phaser.Scene
{
    //variables:
//Crear grupo de walkable donde poner todas las plataformas
    walkable;

    player1;
    player2;
    velocidad = 100;
    alturaSalto = -200;
    camera;

    preload(){
    //this.load.image('sueloMapa', 'assets/tiles/Tope_mapa_1600x128.png');
        this.load.image('sueloMapa', 'assets/tiles/Tope_suelo_1600x6.png');
        this.load.image('paredMapa', 'assets/tiles/Tope_paredes_324x122.png')
        this.load.image('tile_pared', 'assets/tiles/Tiles_Pared.png');
        this.load.image('mapa', 'assets/tiles/mapa_V2_1600x310.png');
        this.load.spritesheet('raton_gris','ASSETS/RATONES/SpriteSheets/Raton_Gris.png',{ frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('raton_blanco','ASSETS/RATONES/SpriteSheets/Raton_Blanco.png',{ frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('raton_marron','ASSETS/RATONES/SpriteSheets/Raton_Marron.png',{ frameWidth: 32, frameHeight: 32 } );
    }
    create(){
        //camera = this.cameras.main;
        //camera.setBounds(0,0,1600,380);
        this.camera = new CameraMovement(this);
        //MAPA
        this.add.image(800,210,'mapa');
        this.walkable = this.physics.add.sprite(800,360,'sueloMapa');
        //walkable = this.physics.add.sprite(352,300, 'paredMapa' )
        this.walkable.setImmovable();

        //CONTROL TECLAS
        this.cursors = this.input.keyboard.createCursorKeys();
        this.izqFlecha = this.cursors.left;
        this.drcFlecha = this.cursors.right;
        this.upFlecha = this.cursors.up;
        this.downFlecha = this.cursors.down;

        this.izqA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.drcD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.upW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


        //JUGADORES
        //Aqui iria la funcion de cambiar el raton para cada personaje
        this.colorRaton1 = 'raton_gris';
        this.colorRaton2 = 'raton_blanco';

        //PLAYER 1
        this.player1 = this.physics.add.sprite(90, 145, this.colorRaton1, 0);
        this.player1.setCollideWorldBounds(true);
        this.player1.body.setGravityY(500);
        this.physics.add.collider(this.player1, this.walkable);

        //Animaciones
        this.anims.create({
            key: 'idle1',
            frames: this.anims.generateFrameNumbers(this.colorRaton1, { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'walk1',
            frames: this.anims.generateFrameNumbers(this.colorRaton1, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump1',
            frames: this.anims.generateFrameNumbers(this.colorRaton1, { start: 7, end: 8 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'down1',
            frames: this.anims.generateFrameNumbers(this.colorRaton1, { start: 9, end: 10 }),
            frameRate: 5
        });
        this.anims.create({
            key: 'hurt1',
            frames: this.anims.generateFrameNumbers(this.colorRaton1, 11 ),
            frameRate: 10
        });

        //PLAYER 2
        this.player2 = this.physics.add.sprite(150, 145, this.colorRaton2, 0);
        this.player2.setCollideWorldBounds(true);
        this.player2.body.setGravityY(500);
        this.physics.add.collider(this.player2, this.walkable);

        //Animaciones
        this.anims.create({
            key: 'idle2',
            frames: this.anims.generateFrameNumbers(this.colorRaton2, { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'walk2',
            frames: this.anims.generateFrameNumbers(this.colorRaton2, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jump2',
            frames: this.anims.generateFrameNumbers(this.colorRaton2, { start: 7, end: 8 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'down2',
            frames: this.anims.generateFrameNumbers(this.colorRaton2, { start: 9, end: 10 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'hurt2',
            frames: this.anims.generateFrameNumbers(this.colorRaton2, 11 ),
            frameRate: 10
        });
    }
    update(){
        this.camera.moveCameraFunction();
        this.physics.world.bounds.centerX = this.camera.getScrollCam() + config.width/2;

        //camera.scrollX += 0.5;

        //Controles de los jugadores
        this.movementControlsP1();
        this.movementControlsP2();
    }
    movementControlsP1(){
    //CONTROLES MOVIMIENTO PLAYER 1
    if (this.izqA.isDown)
    {
        this.player1.setVelocityX(-this.velocidad);
        this.player1.anims.play('walk1', true);
        this.player1.flipX = true;
    }
    else if (this.drcD.isDown)
    {
        this.player1.setVelocityX(this.velocidad);
        this.player1.anims.play('walk1', true);
        this.player1.flipX = false;
    }
    else
    {
        this.player1.setVelocityX(0);
        this.player1.anims.play('idle1', true);
    }
    if (this.upW.isDown)
    {
        //&& player1.body.touching.down
        this.player1.setVelocityY(this.alturaSalto);
        this.player1.anims.play('jump1', true);
    }
    if (this.downS.isDown)
    {
        this.player1.anims.play('down1', true);
    }
}
    movementControlsP2(){
    //CONTROLES MOVIMIENTO PLAYER 2
    if (this.izqFlecha.isDown)
    {
        this.player2.setVelocityX(-this.velocidad);
        this.player2.anims.play('walk2', true);
        this.player2.flipX = true;
    }
    else if (this.drcFlecha.isDown)
    {
        this.player2.setVelocityX(this.velocidad);
        this.player2.anims.play('walk2', true);
        this.player2.flipX = false;
    }
    else
    {
        this.player2.setVelocityX(0);
        this.player2.anims.play('idle2', true);
    }
    if (this.upFlecha.isDown)
    {
        //&& player2.body.touching.down
        this.player2.setVelocityY(this.alturaSalto);
        this.player2.anims.play('jump2', true);
    }
    if (this.downFlecha.isDown)
    {
        this.player2.anims.play('down2', true);
    }
}

}
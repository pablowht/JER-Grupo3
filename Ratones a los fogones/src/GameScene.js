class GameScene extends Phaser.Scene
{

    constructor(){
        super("Game");
    }
    //variables:
    //Crear grupo de walkable donde poner todas las plataformas
    walkable;
    platforms;
    player1;
    player2;
    velocidad1 = 100;
    velocidad2 = 100;
    alturaSalto = -200;
    powerupAma;
    powerupAz;
    powerupRoj;
    obstaculos;
    obstFogon;
    //TIMED EVENT
    //timedEvent;


    //camera;

    preload(){
        this.load.image('techoMapa', 'assets/tiles/MAPAS/Tope_techo_1600x27.png');
        this.load.image('sueloMapa1', 'assets/tiles/MAPAS/Tope_Suelo_M1_1600x6.png');
        this.load.image('paredesMapa1', 'assets/tiles/MAPAS/Tope_paredes_324x122.png');
        this.load.image('sueloMapa2', 'assets/tiles/MAPAS/Tope_Suelo_M2_1202x6.png');
        this.load.image('paredMapa2', 'assets/tiles/MAPAS/Tope_Suelo_M2_610x44.png');
        this.load.image('sueloMapa2N2', 'assets/tiles/MAPAS/Tope_Suelo_M2_3_212x53.png');
        this.load.image('sueloMapa2N3', 'assets/tiles/MAPAS/Tope_Suelo_M2_3_404x91.png');

        this.load.image('sueloMapa3', 'assets/tiles/MAPAS/Tope_Suelo_M3.1_1091x6.png');
        this.load.image('sueloMapa3N1', 'assets/tiles/MAPAS/Tope_Suelo_M3.2_193x75.png');
        this.load.image('sueloMapa3N2', 'assets/tiles/MAPAS/Tope_Suelo_M3.3_322x59.png');

        //this.load.image('tile_pared', 'assets/tiles/Tiles_Pared.png');
        this.load.image('mapa3', 'assets/tiles/MAPAS/mapa3_V4_1600x310.png');
        this.load.image('mapa2', 'assets/tiles/MAPAS/mapa2_V4_1600x310.png');
        this.load.image('mapa1', 'assets/tiles/MAPAS/mapa1_V4_1600x310.png');

        //PLATAFORMAS
        this.load.image('armarioBajo1', 'assets/tiles/ARMARIOS_BAJOS/Tiles_Armario_2Puertas.png');
        this.load.image('armarioBajo2', 'assets/tiles/ARMARIOS_BAJOS/Tiles_Armario_3Cajones.png');
        this.load.image('armarioBajo3', 'assets/tiles/ARMARIOS_BAJOS/Tiles_Armario_CajonPuerta.png');
        this.load.image('armarioAlto1', 'assets/tiles/ARMARIOS_ALTOS/Tiles_Armario_Alto_1Puerta.png');
        this.load.image('armarioAlto2', 'assets/tiles/ARMARIOS_ALTOS/Tiles_Armario_Alto_2Puertas.png');

        //PLAYERS
        this.load.spritesheet('raton_gris','ASSETS/RATONES/SpriteSheets/Raton_Gris.png',{ frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('raton_blanco','ASSETS/RATONES/SpriteSheets/Raton_Blanco.png',{ frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('raton_marron','ASSETS/RATONES/SpriteSheets/Raton_Marron.png',{ frameWidth: 32, frameHeight: 32 } );

        this.load.image('powerupAmarillo','assets/POWERUPS/QUESO/QuesoAmarillo_12x14.png');
        this.load.image('powerupAzul','assets/POWERUPS/QUESO/QuesoAzul_14x14.png');
        this.load.image('powerupRojo','assets/POWERUPS/QUESO/QuesoRojo_17x16t.png');

        //OBSTACULOS ESTATICOS NIVEL 1
        this.load.image('CascaraPlatano','ASSETS/OBSTACULOS/Cascara_Platano.png');
        this.load.image('TrampaRatones','ASSETS/OBSTACULOS/MouseTrapR_48x18.png');
        this.load.spritesheet('Fogon','ASSETS/OBSTACULOS/Fogon_25x55.png',{frameWidth:25,frameHeight:55});

    }
    create(){

        //camera = this.cameras.main;
        //camera.setBounds(0,0,1600,380);
        //this.camera = new CameraMovement(this);
        //MAPAS
        //this.walkable = this.physics.add.sprite(800,360,'sueloMapa');
        //this.walkable.setImmovable();
        //1
        this.add.image(800,155,'mapa1');// Y=210
        this.add.image(800,555,'mapa1'); //X=800 Y=525
        //2
        //this.add.image(800,155,'mapa2');
        //this.add.image(800,555,'mapa2');
        //3
       // this.add.image(800,155,'mapa3');
       // this.add.image(800,555,'mapa3');
        this.walkable = this.physics.add.staticGroup();
        this.platforms = this.physics.add.staticGroup();

        //OBSTACULOS
        this.obstaculos= this.physics.add.staticGroup();
        this.obstFogon = 'Fogon';
        //MAPA PLAYER1

        ////////////////////////////////////// FORMA MÁS EFICIENTE DE CREAR LOS MAPAS??? //////////////////////////////////////

        this.walkable.create(800,10,'techoMapa');
        //MAPA1

        this.walkable.create(353,240,'paredesMapa1');
        this.walkable.create(800,305,'sueloMapa1');
        //Colocar las plataformas
        this.platforms.create(155,270,'armarioBajo1').setScale(2).refreshBody();
        this.platforms.create(553,270,'armarioBajo2').setScale(2).refreshBody();
        this.platforms.create(900,270,'armarioBajo3').setScale(2).refreshBody();
        this.platforms.create(968,270,'armarioBajo2').setScale(2).refreshBody();

        this.platforms.create(1150,220,'armarioAlto1').setScale(2).refreshBody();
        this.platforms.create(1220,220,'armarioAlto1').setScale(2).refreshBody();

        //OBSTACULOS NINVEL 1 PLAYER 1
        this.obstaculos.create(400,170,'CascaraPlatano');
        this.obstaculos.create(1120,295,'CascaraPlatano');
        this.obstaculos.create(1370,295,'CascaraPlatano');
        this.obstaculos.create(280,170,'TrampaRatones');
        this.obstaculos.create(700,295,'TrampaRatones');
        this.obstaculos.create(1210,200,'CascaraPlatano');
        this.anims.create({
            key: 'fogon_apagado',
            frames: this.anims.generateFrameNumbers('Fogon', { start: 0, end: 1 }),
            frameRate: 5,

        });
        this.anims.create({
            key: 'fogon_encendido',
            frames: this.anims.generateFrameNumbers('Fogon', { start: 2, end: 11 }),
            frameRate: 5,

        });
        this.obstaculos.create(968,220,'Fogon');
        //this.timedEvent = this.time.addEvent({ delay: 2000, callback: encenderFogon, callbackScope: this });

/*
        //MAPA2
        this.walkable.create(1397,266,'sueloMapa2N3');
        this.walkable.create(680,247,'sueloMapa2N2');
        this.walkable.create(575,288,'paredMapa2');
        this.walkable.create(600,305,'sueloMapa2');
        //Colocar las plataformas
        this.platforms.create(1040,270,'armarioBajo2').setScale(2).refreshBody();

        this.platforms.create(170,220,'armarioAlto2').setScale(2).refreshBody();
        this.platforms.create(340,140,'armarioAlto2').setScale(2).refreshBody();
*/
 /*       //MAPA3
        this.walkable.create(1055,309,'sueloMapa3');
        this.walkable.create(417,274,'sueloMapa3N1');
        this.walkable.create(160,213,'sueloMapa3N2');
        //Colocar las plataformas
        this.platforms.create(553,270,'armarioBajo2').setScale(2).refreshBody();
        this.platforms.create(900,270,'armarioBajo2').setScale(2).refreshBody();
        this.platforms.create(968,270,'armarioBajo3').setScale(2).refreshBody();

        this.platforms.create(240,120,'armarioAlto1').setScale(2).refreshBody();
        this.platforms.create(310,120,'armarioAlto1').setScale(2).refreshBody();
        this.platforms.create(1130,220,'armarioAlto2').setScale(2).refreshBody();
*/
        //MAPA PLAYER2
        this.walkable.create(800,410,'techoMapa');
        //MAPA1

        this.walkable.create(353,640,'paredesMapa1');
        this.walkable.create(800,705,'sueloMapa1');
        //Colocar plataformas
        this.platforms.create(158,670,'armarioBajo1').setScale(2).refreshBody();
        this.platforms.create(553,670,'armarioBajo2').setScale(2).refreshBody();
        this.platforms.create(900,670,'armarioBajo3').setScale(2).refreshBody();
        this.platforms.create(968,670,'armarioBajo2').setScale(2).refreshBody();

        this.platforms.create(1150,620,'armarioAlto1').setScale(2).refreshBody();
        this.platforms.create(1220,620,'armarioAlto1').setScale(2).refreshBody();

        //MAPA2
        /*
        this.walkable.create(1397,662,'sueloMapa2N3');
        this.walkable.create(680,644,'sueloMapa2N2');
        this.walkable.create(575,686,'paredMapa2');
        this.walkable.create(600,705,'sueloMapa2');
        //Colocar plataformas
        this.platforms.create(1040,670,'armarioBajo2').setScale(2).refreshBody();

        this.platforms.create(170,610,'armarioAlto2').setScale(2).refreshBody();
        this.platforms.create(340,560,'armarioAlto2').setScale(2).refreshBody();
        */

       /* //MAPA3
        this.walkable.create(1055,709,'sueloMapa3');
        this.walkable.create(417,674,'sueloMapa3N1');
        this.walkable.create(160,613,'sueloMapa3N2');
        //Colocar las plataformas
        this.platforms.create(553,670,'armarioBajo2').setScale(2).refreshBody();
        this.platforms.create(900,670,'armarioBajo2').setScale(2).refreshBody();
        this.platforms.create(968,670,'armarioBajo3').setScale(2).refreshBody();

        this.platforms.create(240,520,'armarioAlto1').setScale(2).refreshBody();
        this.platforms.create(310,520,'armarioAlto1').setScale(2).refreshBody();
        this.platforms.create(1130,620,'armarioAlto2').setScale(2).refreshBody();
*/
        //OBSTACULOS ESTATICOS NIVEL 1 PLAYER 2
         this.obstaculos.create(400,570,'CascaraPlatano');
         this.obstaculos.create(1120,695,'CascaraPlatano');
         this.obstaculos.create(1370,695,'CascaraPlatano');
        this.obstaculos.create(280,570,'TrampaRatones');
        this.obstaculos.create(700,695,'TrampaRatones');
        this.obstaculos.create(1210,600,'CascaraPlatano');

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

        //Para pausa
        this.esc=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);


        //JUGADORES
        //Aqui iria la funcion de cambiar el raton para cada personaje
        this.colorRaton1 = 'raton_gris';
        this.colorRaton2 = 'raton_blanco';

        //PLAYER 1
        this.player1 = this.physics.add.sprite(90, 145, this.colorRaton1, 0);
        this.player1.setCollideWorldBounds(true);
        this.player1.body.setGravityY(500);
        this.physics.add.collider(this.player1, this.walkable);
        this.physics.add.collider(this.player1, this.platforms);

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
        this.player2 = this.physics.add.sprite(90, 450, this.colorRaton2, 0); //x = 150, y = 145
        this.player2.setCollideWorldBounds(true);
        this.player2.body.setGravityY(500);
        this.physics.add.collider(this.player2, this.walkable);
        this.physics.add.collider(this.player2, this.platforms);

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

        this.powerupAma = this.physics.add.group({ //creamos un grupo llamado stars
            //en este caso las estrellas son dinámicas
            key: 'powerupAmarillo',
            tipo: 1,//textura
            repeat: 1, //valor de repetición -> se repine n+1, es decir 12 veces en este caso
            setXY: { x: 650, y: 250, stepX: 0 } //para establecer la posición de los 12 elementos, stepX -> incremento
            //******muy importante el Step para el jueguito xd
        });
        this.powerupAz = this.physics.add.group({ //creamos un grupo llamado stars
            //en este caso las estrellas son dinámicas 
            key: 'powerupAzul', //textura
            repeat: 1, //valor de repetición -> se repine n+1, es decir 12 veces en este caso
            setXY: { x: 700, y: 250, stepX: 0 } //para establecer la posición de los 12 elementos, stepX -> incremento
            //******muy importante el Step para el jueguito xd
        });
        this.powerupRoj = this.physics.add.group({ //creamos un grupo llamado stars
            //en este caso las estrellas son dinámicas
            key: 'powerupRojo', //textura
            repeat: 1, //valor de repetición -> se repine n+1, es decir 12 veces en este caso
            setXY: { x: 750, y: 250, stepX: 0 } //para establecer la posición de los 12 elementos, stepX -> incremento
        });
        //this.powerupAma.tipo = 1;
        //this.powerupAz.tipo = 1;
        //this.powerupRoj.tipo = 1;
        //this.powerupAma.tipo = 1;
        //console.log(this.powerupAma.tipo);

        this.physics.add.overlap(this.player1, this.powerupAma, this.collectPowerUp, null, this);
        //this.powerupAma = this.physics.add.sprite(600,250,'powerupAmarillo');
        //this.powerupAz = this.physics.add.sprite(650,250,'powerupAzul');
        //this.powerupAz = this.powerupAz.addSprites(this);
        //this.powerupAma = this.powerupAma.addSprites(this);

    }
    update(){
        //this.camera.moveCameraFunction();
        //this.physics.world.bounds.centerX = this.camera.getScrollCam() + config.width/2;

        //camera.scrollX += 0.5;

        //Controles de los jugadores
        this.movementControlsP1();
        this.movementControlsP2();

        //this.timedEvent = this.time.addEvent({ delay: 2000, callback: this.encenderFogon, callbackScope: this });
        //this.controlFogon();
    }
    movementControlsP1(){
    //CONTROLES MOVIMIENTO PLAYER 1
    if (this.izqA.isDown)
    {
        this.player1.setVelocityX(-this.velocidad1);
        this.player1.anims.play('walk1', true);
        this.player1.flipX = true;
    }
    else if (this.drcD.isDown)
    {
        this.player1.setVelocityX(this.velocidad1);
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

    //para cambiar de in-game a ajustes
    if(this.esc.isDown)
    {
        this.scene.start("Pause");
    }

}
    movementControlsP2(){
    //CONTROLES MOVIMIENTO PLAYER 2
    if (this.izqFlecha.isDown)
    {
        this.player2.setVelocityX(-this.velocidad2);
        this.player2.anims.play('walk2', true);
        this.player2.flipX = true;
    }
    else if (this.drcFlecha.isDown)
    {
        this.player2.setVelocityX(this.velocidad2);
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

    //para cambiar de in-game a ajustes
    if(this.esc.isDown)
    {
        this.scene.start("Pause");
    }
}


    collectPowerUp (player, powerup){

        powerup.disableBody(true, true);
        console.log(powerup.tipo);
        //establecer según el tipo lo que sea
        if(powerup.tipo == 1){
            console.log("colison tipo 1");

            this.velocidad1 += 50;
            this.events.add(Phaser.Timer.SECOND*2, function(){
                this.velocidad1 -=50;
            });
        }
        else if(powerup.tipo == 2){
            console.log("colison tipo 2");

            this.velocidad2 -= 50;
            this.events.add(Phaser.Timer.SECOND*2, function(){
                this.velocidad2 +=50;
            });
        }
    }

    /*encenderFogon(){
        this.obstFogon.anims.play('fogon_encendido', true);
        this.obstFogon.anims.play('fogon_apagado', true);
    }

    controlFogon(){
        this.obstFogon.anims.play('fogon_apagado', true);
        let apagado = false;

       while(apagado != null) {
           if (apagado) {
               this.obstFogon.anims.play('fogon_encendido', true);
               apagado=true;
           } else {
               this.obstFogon.anims.play('fogon_apagado', true);
               let apagado = false;
           }
       }
    }*/


}
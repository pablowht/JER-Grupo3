class GameScene extends Phaser.Scene
{

    constructor(){
        super("Game");
    }
    //variables:
    //Crear grupo de walkable donde poner todas las plataformas
    walkable;
    platforms;
    player1 = new PlayerClass(1,90,145,100,-300);
    player2 = new PlayerClass(2,90,450,100,-300);
    powerupAma = new PowerupClass(1, 650,250);
    powerupAz = new PowerupClass(2, 700,250);
    powerupRoj = new PowerupClass(3, 750,250);
    obstaculos;
    obstFogon;
    //TIMED EVENT
    timedEvent;

    //camera;
    preloader() {
        let background = this.add.image(0,0,'Fondo_Loading').setOrigin(0,0);
        let progressBar = this.add.image(960,497,'Barra_Loading');
        this.load.on('progress', function (value) {
            let ancho = progressBar.width * value;
            progressBar.setCrop(0 ,0, ancho, progressBar.height);
        });
        this.load.on('complete', function () {
            progressBar.destroy();
            background.destroy();
        });
    }

    preload(){

        this.preloader();

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



        //OBSTACULOS ESTATICOS NIVEL 1
        this.load.image('CascaraPlatano','ASSETS/OBSTACULOS/Cascara_Platano.png');
        this.load.image('TrampaRatones','ASSETS/OBSTACULOS/MouseTrapR_48x18.png');
        this.load.spritesheet('Fogon','ASSETS/OBSTACULOS/Fogon_25x55.png',{frameWidth:25,frameHeight:55});

        //PLAYERS:
        this.player1.loadSpriteSheets(this);
        this.player2.loadSpriteSheets(this);
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

        //OBSTACULOS NIVEL 1 PLAYER 1
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
        this.obstFogon = this.add.sprite(968, 220, 'Fogon', 0);
        this.obstaculos.add(this.obstFogon);

        //MAPA PLAYER2
        this.walkable.create(800,410,'techoMapa');
        this.walkable.create(353,640,'paredesMapa1');
        this.walkable.create(800,705,'sueloMapa1');

        //Colocar plataformas
        this.platforms.create(158,670,'armarioBajo1').setScale(2).refreshBody();
        this.platforms.create(553,670,'armarioBajo2').setScale(2).refreshBody();
        this.platforms.create(900,670,'armarioBajo3').setScale(2).refreshBody();
        this.platforms.create(968,670,'armarioBajo2').setScale(2).refreshBody();
        this.platforms.create(1150,620,'armarioAlto1').setScale(2).refreshBody();
        this.platforms.create(1220,620,'armarioAlto1').setScale(2).refreshBody();

        //OBSTACULOS ESTATICOS NIVEL 1 PLAYER 2
        this.obstaculos.create(400,570,'CascaraPlatano');
        this.obstaculos.create(1120,695,'CascaraPlatano');
        this.obstaculos.create(1370,695,'CascaraPlatano');
        this.obstaculos.create(280,570,'TrampaRatones');
        this.obstaculos.create(700,695,'TrampaRatones');
        this.obstaculos.create(1210,600,'CascaraPlatano');

        //Inicialización de los jugadores
        this.player1.assignControls(this);
        this.player2.assignControls(this);

        //Color Ratones
        this.player1.color = 'raton_gris';
        this.player2.color = 'raton_blanco';

        //añadimos las animaciones
        this.player1.createAnimsPlayer(this, this.player1.color);
        this.player2.createAnimsPlayer(this, this.player2.color);

        //PLAYER 1
        this.player1.fisicas = this.physics.add.sprite(this.player1.x, this.player1.y, this.player1.color, 0); //x = 150, y = 145
        this.player1.fisicas.setCollideWorldBounds(true);
        this.player1.fisicas.body.setGravityY(500);
        this.physics.add.collider(this.player1.fisicas, this.walkable);
        this.physics.add.collider(this.player1.fisicas, this.platforms);

        //PLAYER 2
        this.player2.fisicas = this.physics.add.sprite(this.player2.x, this.player2.y, this.player2.color, 0); //x = 150, y = 145
        this.player2.fisicas.setCollideWorldBounds(true);
        this.player2.fisicas.body.setGravityY(500);
        this.physics.add.collider(this.player2.fisicas, this.walkable);
        this.physics.add.collider(this.player2.fisicas, this.platforms);

        //Para pausa
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.powerupAma.fisicas = this.physics.add.sprite(this.powerupAma.x,this.powerupAma.y,'powerupAmarillo');
        this.powerupAz.fisicas = this.physics.add.sprite(this.powerupAz.x,this.powerupAz.y,'powerupAzul');
        this.powerupRoj.fisicas = this.physics.add.sprite(this.powerupRoj.x,this.powerupRoj.y,'powerupRojo');

        this.physics.add.overlap(this.player1.fisicas.body, this.powerupAma.fisicas.body, this.collectPowerUp, null, this);
    }
    update(timeNum, timeDelta){
        //this.camera.moveCameraFunction();
        //this.physics.world.bounds.centerX = this.camera.getScrollCam() + config.width/2;

        //camera.scrollX += 0.5;

        this.movementControlsPlayer(this.player1);
        this.movementControlsPlayer(this.player2);
        //this.encenderFogon();

        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.encenderFogon, callbackScope: this });
        //this.timedEvent = this.time.addEvent({ delay: 3000, callback: this.apagarFogon, callbackScope: this });
        //this.controlFogon();
    }

    movementControlsPlayer(player) {
        //CONTROLES MOVIMIENTO PLAYER 1
        if (player.flechaIzquierda.isDown) {
            player.fisicas.setVelocityX(-player.velocity);
            player.fisicas.play('walk'+player.playerNumber, true);
            player.fisicas.flipX = true;
        } else if (player.flechaDerecha.isDown) {
            player.fisicas.setVelocityX(player.velocity);
            player.fisicas.play('walk'+player.playerNumber, true);
            player.fisicas.flipX = false;
        } else {
            player.fisicas.setVelocityX(0);
            player.fisicas.play('idle'+player.playerNumber, true);
        }
        if (player.flechaArriba.isDown && player.fisicas.body.touching.down) {
            player.fisicas.setVelocityY(player.jumpAmount);
            player.fisicas.play('jump'+player.playerNumber, true);
        }
        if (player.flechaAbajo.isDown) {
            player.fisicas.play('down'+player.playerNumber, true);
        }
        //para cambiar de in-game a ajustes
        if (this.esc.isDown) {
            this.scene.start("Pause");
        }
    }

    collectPowerUp (player, powerup){

        powerup.fisicas.disableBody(true, true);
        console.log(powerup.tipo);
        //establecer según el tipo lo que sea
        if(powerup.tipo == 1){
            console.log("colison tipo 1");

            player.velocity += 50;
            this.events.add(Phaser.Timer.SECOND*2, function(){
                player.velocity -=50;
            });
        }
        else if(powerup.tipo == 2){
            console.log("colison tipo 2");
            player.jumpAmount -= 100;
            this.events.add(Phaser.Timer.SECOND*2, function(){
                player.jumpAmount += 100;
            });
        }
    }
    encenderFogon(){
        this.obstFogon.anims.play('fogon_encendido', true);
        //this.obstFogon.anims.play('fogon_apagado', true);
    }
    //apagarFogon(){
    //    this.obstFogon.anims.play('fogon_apagado', true);
    //}

    /*
    controlFogon() {
        this.obstFogon.anims.play('fogon_apagado', true);
        let apagado = false;

        while (apagado != null) {
            if (apagado) {
                this.obstFogon.anims.play('fogon_encendido', true);
                apagado = true;
            } else {
                this.obstFogon.anims.play('fogon_apagado', true);
                let apagado = false;
            }
        }
    }
*/


}
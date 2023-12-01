class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    //variables:
    //Crear grupo de walkable donde poner todas las plataformas
    walkable;
    platforms;
    player1 = new PlayerClass(1, 90, 145, 100, -300, this);
    player2 = new PlayerClass(2, 90, 450, 100, -300, this);
    powerupAma = new PowerupClass(1, 650, 250, this);
    powerupAz = new PowerupClass(2, 700, 250, this);
    powerupRoj = new PowerupClass(3, 750, 250, this);
    obstaculos;
    obstFogon;
    preload() {
        //POWERUPS:
        this.powerupAma.loadImages();
        //PLAYERS:
        this.player1.loadSpriteSheets();
    }

    create() {
        //camera = this.cameras.main;
        //camera.setBounds(0,0,1600,380);
        //this.camera = new CameraMovement(this);

        //MAPAS
        //this.walkable = this.physics.add.sprite(800,360,'sueloMapa');
        //this.walkable.setImmovable();
        //1
        this.add.image(1600, 155, 'mapa1');  // X=800 Y=210
        this.add.image(1600, 555, 'mapa1'); //X=800 Y=525
        //2
        //this.add.image(800,155,'mapa2');
        //this.add.image(800,555,'mapa2');
        //3
        // this.add.image(800,155,'mapa3');
        // this.add.image(800,555,'mapa3');
        this.walkable = this.physics.add.staticGroup();
        this.platforms = this.physics.add.staticGroup();

        //OBSTACULOS
        this.obstaculos = this.physics.add.staticGroup();
        //MAPA PLAYER1

        ////////////////////////////////////// FORMA MÁS EFICIENTE DE CREAR LOS MAPAS??? //////////////////////////////////////
        this.walkable.create(1237, 64, 'techoMapa2');
        this.walkable.create(1600, 10, 'techoMapa');
        //MAPA1
        this.walkable.create(353, 240, 'paredesMapa1');
        this.walkable.create(2175,288,'paredMapa2');
        this.walkable.create(800, 305, 'sueloMapa1');
        this.walkable.create(2200,305,'sueloMapa2');
        this.walkable.create(2997,266,'sueloMapa2N3');
        this.walkable.create(2280,247,'sueloMapa2N2');
        //Colocar las plataformas
        this.platforms.create(155, 270, 'armarioBajo1');
        this.platforms.create(553, 270, 'armarioBajo2');
        this.platforms.create(900, 270, 'armarioBajo3');
        this.platforms.create(968, 270, 'armarioBajo6');
        this.platforms.create(1400, 270, 'armarioBajo1');
        this.platforms.create(1468, 270, 'armarioBajo2');


        this.platforms.create(620, 140, 'armarioAlto1');
        this.platforms.create(770, 190, 'armarioAlto1');
        this.platforms.create(890, 120, 'armarioAlto1');

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
        //OBSTACULOS NIVEL 1 PLAYER 1
        this.obstaculos.create(400, 170, 'CascaraPlatano');
        this.obstaculos.create(1120, 295, 'CascaraPlatano');
        this.obstaculos.create(280, 170, 'TrampaRatones');
        this.obstaculos.create(700, 295, 'TrampaRatones');
        this.obstaculos.create(1210, 200, 'CascaraPlatano');

        this.anims.create({
            key: 'fogon_apagado',
            frames: this.anims.generateFrameNumbers('Fogon', {start: 0, end: 1}),
            frameRate: 5,
        });
        this.anims.create({
            key: 'fogon_encendido',
            frames: this.anims.generateFrameNumbers('Fogon', {start: 2, end: 11}),
            frameRate: 5,

        });
      //  this.obstFogon = this.add.sprite(900, 220, 'Fogon', 0)
        // this.obstaculos.add(this.obstFogon);
        this.obstFogon2 = this.add.sprite(543, 220, 'Fogon', 0);
        this.obstFogon3 = this.add.sprite(565, 220, 'Fogon', 0);
        this.obstaculos.add(this.obstFogon2);
        this.obstaculos.add(this.obstFogon3);

        //MAPA PLAYER2
        this.walkable.create(800, 410, 'techoMapa');
        this.walkable.create(353, 640, 'paredesMapa1');
        this.walkable.create(800, 705, 'sueloMapa1');

        //Colocar plataformas
        this.platforms.create(158, 670, 'armarioBajo1');
        this.platforms.create(553, 670, 'armarioBajo2');
        this.platforms.create(900, 670, 'armarioBajo3');
        this.platforms.create(968, 670, 'armarioBajo2');
        this.platforms.create(1150, 620, 'armarioAlto1');
        this.platforms.create(1220, 620, 'armarioAlto1');

        //OBSTACULOS ESTATICOS NIVEL 1 PLAYER 2
        this.obstaculos.create(400, 570, 'CascaraPlatano');
        this.obstaculos.create(1120, 695, 'CascaraPlatano');
        this.obstaculos.create(1370, 695, 'CascaraPlatano');
        this.obstaculos.create(280, 570, 'TrampaRatones');
        this.obstaculos.create(700, 695, 'TrampaRatones');
        this.obstaculos.create(1210, 600, 'CascaraPlatano');

        //Inicialización de los jugadores
        this.player1.assignControls();
        this.player2.assignControls();

        //Color Ratones
        this.player1.color = 'raton_gris';
        this.player2.color = 'raton_blanco';

        //añadimos las animaciones
        this.player1.createAnimsPlayer(this.player1.color);
        this.player2.createAnimsPlayer(this.player2.color);

        //PLAYER 1
        this.player1.createPhysics();
        this.player1.establishColliderObj(this.walkable);
        this.player1.establishColliderObj(this.platforms);
        this.player1.establishColliderObstacles(this.obstaculos);

        //PLAYER 2
        this.player2.createPhysics();
        this.player2.establishColliderObj(this.walkable);
        this.player2.establishColliderObj(this.platforms);
        this.player2.establishColliderObstacles(this.obstaculos);

        //POWERUPS:
        this.powerupAma.createPhysics();
        this.powerupAz.createPhysics();
        this.powerupRoj.createPhysics();

        this.physics.add.overlap(this.player1.fisicas, this.powerupAma.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player1.fisicas, this.powerupAz.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player1.fisicas, this.powerupRoj.fisicas, this.collectPowerUp, null, this);
        //LO MISMO CON EL PLAYER DOS XD
        this.physics.add.overlap(this.player2.fisicas, this.powerupAma.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.powerupAz.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.powerupRoj.fisicas, this.collectPowerUp, null, this);
    }

    update(timeNum, timeDelta) {
        //this.camera.moveCameraFunction();
        //this.physics.world.bounds.centerX = this.camera.getScrollCam() + config.width/2;

        //camera.scrollX += 0.5;
        this.player1.update(timeNum, timeDelta);
        this.player2.update(timeNum, timeDelta);

        this.activateFogon(this.obstFogon2);
        this.activateFogon(this.obstFogon3);

        //Para pausa
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        if (this.esc.isDown) {
            this.scene.pause();
            this.scene.launch('Pause');
        }
    }

    collectPowerUp(player, powerup) {
        powerup.disableBody(true, true);
        if (player.texture.key === 1) {
            this.player1.gestionPowerUp(powerup);
        } else if (player.texture.key === 2) {
            this.player2.gestionPowerUp(powerup);
        }
    }

    activateFogon(obj){
        obj.anims.play('fogon_encendido', true);
    }

    hitAnyObstacle(player, obstacle){
        if (player.texture.key === 1) {
            this.player1.gestionCollision(obstacle);
        } else if (player.texture.key === 2) {
            this.player2.gestionCollision(obstacle);
        }
    }


}
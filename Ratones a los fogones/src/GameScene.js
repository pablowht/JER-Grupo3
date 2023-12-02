class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    //variables:
    //Crear grupo de walkable donde poner todas las plataformas
    walkable;
    platforms;
    isPaused;
    player1 = new PlayerClass(1, 90, 145, 100, -300, this);
    player2 = new PlayerClass(2, 90, 450, 100, -300, this);
    colorRaton1;
    colorRaton2;

    powerupAma = new PowerupClass(3, 650, 250, this);
    powerupAz = new PowerupClass(2, 700, 250, this);
    powerupRoj = new PowerupClass(1, 750, 250, this);
    obstaculos;

    meta;

    backgroundMusic;

    preload() {
        //POWERUPS:
        this.powerupAma.loadImages();
        //PLAYERS:
        this.player1.loadSpriteSheets();
    }

    init(data){
        this.colorRaton1 = data.colorRaton1;
        this.colorRaton2 = data.colorRaton2;
    }
    create() {
        // this.camera = this.cameras.main;
        //this.camera.setBounds(0,0,1600,380);
        //this.camera1 = new CameraMovement(this);
        //this.camera1.cam.setBounds(0,0,1920,1080);
        //this.camera1.cam.setZoom(1.5);
        //this.camera2 = new CameraMovement(this);
        //this.camera2.cam.setBounds(0,0,1920,1080);
        //this.camera2.cam.setZoom(1.5);
        //this.camara = this.cameras.main;

        //this.cameras.main.setBounds(-400,-100,1920,1080);
        //this.cameras.main.setSize(1920, 540);
        //this.cameras.main.setZoom(1.74,1.74);

        //this.cameras.add(-400,-100,1920,1080,false, 'camera1');
        //this.cameras.getCamera('camera1').setOrigin(-400,-100);
        //this.cameras.getCamera('camera1').setSize(1920,540);
        //this.cameras.getCamera('camera1').setZoom(1.74,1.74);

        this.physics.world.setBounds(0,0,3200,1080);
        this.cameras.main.setBounds(0,0,3600, 540);
        this.cameras.main.setZoom(1.74,1.74);

        this.cameras.add(0,0,3600,540,false, 'camera1');
        this.cameras.getCamera('camera1').setZoom(1.74,1.74);
        this.cameras.getCamera('camera1').setPosition(0,540);


        //this.cameras.main.setOrigin(-100,-100);

        //this.cameras.add(-400,560,1920,1080,false, 'camera2');
        //this.cameras.getCamera('camera2').setOrigin(-400,-100);
        //this.cameras.getCamera('camera2').setSize(1920,540);
        //this.cameras.getCamera('camera2').setZoom(1.74,1.74);
        //this.cameras.add(-400,560, 1920,1080,false,'camera2');
        //this.cameras.getCamera('camera2').setZoom(1.74,1.74);
        //this.cameras.getCamera('camera2').setSize(1920, 540);


        //MAPAS
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
        this.meta = this.physics.add.staticGroup();
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
        this.platforms.create(1100, 270, 'armarioBajo3');
        this.platforms.create(1168, 270, 'armarioBajo3');
        this.platforms.create(1300, 270, 'armarioBajo1');
        this.platforms.create(1368, 270, 'armarioBajo2');
        this.platforms.create(1600, 270, 'armarioBajo3');

        //this.meta.create(800,155,'Meta');


        this.platforms.create(620, 140, 'armarioAlto1');
        this.platforms.create(770, 190, 'armarioAlto1');
        this.platforms.create(890, 120, 'armarioAlto1');
        this.platforms.create(1700,140, 'armarioAlto1');
        this.platforms.create(1780,120, 'armarioAlto1');

        //Meta
        this.meta.create(800,155,'Meta');

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
        this.obstaculos.create(280, 170, 'TrampaRatones');
        this.obstaculos.create(700, 295, 'TrampaRatones');
        this.obstaculos.create(1315, 230, 'CascaraPlatano');

       this.anims.create({
            key: 'fogon_encendido',
            frames: this.anims.generateFrameNumbers('Fogon', {start: 2, end: 11}),
            frameRate: 5,

        });
        this.obstFogon2 = this.add.sprite(543, 220, 'Fogon', 0);
        this.obstFogon3 = this.add.sprite(565, 220, 'Fogon', 0);
        this.obstFogon4 = this.add.sprite(1020, 275, 'Fogon', 0);
        this.obstFogon5 = this.add.sprite(1045, 275, 'Fogon', 0);
        this.obstFogon6 = this.add.sprite(1220, 275, 'Fogon', 0);
        this.obstFogon7 = this.add.sprite(1245, 275, 'Fogon', 0);

        this.obstaculos.create(543, 220, 'Fogon');
        this.obstaculos.create(565, 220, 'Fogon');
        this.obstaculos.create(1020, 275, 'Fogon');
        this.obstaculos.create(1045, 275, 'Fogon');
        this.obstaculos.create(1220, 275, 'Fogon');
        this.obstaculos.create(1245, 275, 'Fogon');


        //MAPA PLAYER2
        this.walkable.create(1237, 464, 'techoMapa2');
        this.walkable.create(1600, 410, 'techoMapa');
        this.walkable.create(353, 640, 'paredesMapa1');
        this.walkable.create(2175,688,'paredMapa2');
        this.walkable.create(800, 705, 'sueloMapa1');
        this.walkable.create(2200,705,'sueloMapa2');
        this.walkable.create(2997,666,'sueloMapa2N3');
        this.walkable.create(2280,647,'sueloMapa2N2');

        //Colocar plataformas
        this.platforms.create(155, 670, 'armarioBajo1');
        this.platforms.create(553, 670, 'armarioBajo2');
        this.platforms.create(900, 670, 'armarioBajo3');
        this.platforms.create(968, 670, 'armarioBajo6');
        this.platforms.create(1100, 670, 'armarioBajo3');
        this.platforms.create(1168, 670, 'armarioBajo3');
        this.platforms.create(1300, 670, 'armarioBajo1');
        this.platforms.create(1368, 670, 'armarioBajo2');
        this.platforms.create(1600, 670, 'armarioBajo3');

        this.platforms.create(620, 540, 'armarioAlto1');
        this.platforms.create(770, 590, 'armarioAlto1');
        this.platforms.create(890, 520, 'armarioAlto1');
        this.platforms.create(1700,540, 'armarioAlto1');
        this.platforms.create(1780,520, 'armarioAlto1');

        //OBSTACULOS ESTATICOS NIVEL 1 PLAYER 2
        this.obstaculos.create(400, 570, 'CascaraPlatano');
        this.obstaculos.create(280, 570, 'TrampaRatones');
        this.obstaculos.create(700, 656, 'TrampaRatones');
        this.obstaculos.create(1315, 630, 'CascaraPlatano')
        this.obstFogon8 = this.add.sprite(543, 620, 'Fogon', 0);
        this.obstFogon9 = this.add.sprite(565, 620, 'Fogon', 0);
        this.obstFogon10 = this.add.sprite(1020, 675, 'Fogon', 0);
        this.obstFogon11= this.add.sprite(1045, 675, 'Fogon', 0);
        this.obstFogon12= this.add.sprite(1220, 675, 'Fogon', 0);
        this.obstFogon13= this.add.sprite(1245, 675, 'Fogon', 0);

        this.obstaculos.create(543, 620, 'Fogon');
        this.obstaculos.create(565, 620, 'Fogon');
        this.obstaculos.create(1020, 675, 'Fogon');
        this.obstaculos.create(1045, 675, 'Fogon');
        this.obstaculos.create(1220, 675, 'Fogon');
        this.obstaculos.create(1245, 675, 'Fogon');

        //Inicialización de los jugadores
        this.player1.assignControls();
        this.player2.assignControls();

        //Color Ratones
        this.player1.color = this.colorRaton1;
        this.player2.color = this.colorRaton2;

        //añadimos las animaciones
        this.player1.createAnimsPlayer(this.player1.color);
        this.player2.createAnimsPlayer(this.player2.color);

        //PLAYER 1
        this.player1.createPhysics();
        this.player1.createSounds();
        this.player1.establishColliderObj(this.walkable);
        this.player1.establishColliderObj(this.platforms);

        //PLAYER 2
        this.player2.createPhysics();
        this.player2.createSounds();
        this.player2.establishColliderObj(this.walkable);
        this.player2.establishColliderObj(this.platforms);

        //POWERUPS:
        this.powerupAma.createPhysics();
        this.powerupAz.createPhysics();
        this.powerupRoj.createPhysics();

        this.physics.add.overlap(this.player1.fisicas, this.powerupAma.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player1.fisicas, this.powerupAz.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player1.fisicas, this.powerupRoj.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.powerupAma.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.powerupAz.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.powerupRoj.fisicas, this.collectPowerUp, null, this);

        this.physics.add.overlap(this.player1.fisicas, this.obstaculos, this.hitAnyObstacle, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.obstaculos, this.hitAnyObstacle, null, this);
        this.cameras.main.startFollow(this.player1.fisicas, true, 0.09, 0.09);

        //META
        this.physics.add.overlap(this.player1.fisicas, this.meta, this.hitMeta, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.meta, this.hitMeta, null, this);

        //MUSICA
        this.backgroundMusic = this.sound.add('RaceMusic', {loop: true});
        this.backgroundMusic.play();
        this.backgroundMusic.volume = 0.2;

    }

    update(timeNum, timeDelta) {
        //this.camera1.moveCameraFunction();
        //this.camera2.moveCameraFunction();


        //this.camera.scrollX += 0.5;

        this.player1.update(timeNum, timeDelta);
        this.player2.update(timeNum, timeDelta);

        this.activateFogon(this.obstFogon2);
        this.activateFogon(this.obstFogon3);
        this.activateFogon(this.obstFogon4);
        this.activateFogon(this.obstFogon5);
        this.activateFogon(this.obstFogon6);
        this.activateFogon(this.obstFogon7);
        this.activateFogon(this.obstFogon8);
        this.activateFogon(this.obstFogon9);
        this.activateFogon(this.obstFogon10);
        this.activateFogon(this.obstFogon11);
        this.activateFogon(this.obstFogon12);
        this.activateFogon(this.obstFogon13);


        //Para pausa
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        if (this.esc.isDown) {
            this.scene.pause();
            this.scene.start('Pause',{isPaused:true});
        }
    }

    hitMeta(player, meta){
        //meta.disableBody(true,true);
        if (player.texture.key === 1) {
            this.player1.gestionCollision(meta);
            this.player1Won = true;
            this.EndGame();
        } else if (player.texture.key === 2) {
            this.player2.gestionCollision(meta);
            this.player2Won = true;
            this.EndGame();
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
        obstacle.disableBody(true,true);
        if (player.texture.key === 1) {
            this.player1.gestionCollision(obstacle);
        } else if (player.texture.key === 2) {
            this.player2.gestionCollision(obstacle);
        }
    }

    EndGame(){
        this.scene.start("GameOver", {colorRaton1: this.raton1, colorRaton2:this.raton2});
    }

}
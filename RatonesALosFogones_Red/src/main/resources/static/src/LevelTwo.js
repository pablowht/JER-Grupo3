class LevelTwo extends Phaser.Scene {
    constructor() {
        super("LevelTwo");
    }

    //variables:
    walkable;
    platforms;
    isPaused;
    player1 = new Player(1, 200, 100, 100, -300, this);
    player2 = new Player(2, 200, 450, 100, -300, this);
    colorRaton1;
    colorRaton2;
    camera;
    powerupAma = new Powerup(3, 1090, 230, this);
    powerupAz = new Powerup(2, 1543, 250, this);
    powerupRoj = new Powerup(1, 2760, 190, this);
    powerupAma2 = new Powerup(3, 1090, 630, this);
    powerupAz2 = new Powerup(2, 1543, 650, this);
    powerupRoj2 = new Powerup(1, 2760, 590, this);
    obstaculos;
    meta;
    backgroundMusic;
    barraDivisoria;
    velocity=-50;
    Cacerolas;
    esc;

    init(data) {
        this.colorRaton1 = data.colorRaton1;
        this.colorRaton2 = data.colorRaton2;
        this.user = data.user;
        this.password = data.password;
    }

    create() {
        this.camera = new CameraMovement(this);
        this.camera.cam.setZoom(1.2, 1.85);

        //MAPA
        this.add.image(1600, 155, 'mapa2');
        this.add.image(1600, 555, 'mapa2');

        this.walkable = this.physics.add.staticGroup();
        this.platforms = this.physics.add.staticGroup();
        this.meta = this.physics.add.staticGroup();

        //OBSTACULOS
        this.obstaculos = this.physics.add.staticGroup();
        //MAPA PLAYER1
        this.walkable.create(1600, 10, 'techoMapa_N2');
        this.walkable.create(2146, 67, 'techoMapa2_N2');

        //MAPA
        this.walkable.create(160,212, 'suelo1_N2');
        this.walkable.create(415, 274, 'suelo2_N2');
        this.walkable.create(1656, 308, 'suelo3_N2');
        this.walkable.create(1239, 247, 'suelo4_N2'); 
        this.walkable.create(2997, 266, 'suelo5_N2');

        //Colocar las plataformas
		//Colocados
        this.platforms.create(555, 230, 'armarioAlto1');
        this.platforms.create(655, 230, 'armarioAlto2');
        this.platforms.create(720, 230, 'armarioAlto2');
        this.platforms.create(820, 170, 'armarioAlto1');
        this.platforms.create(1030, 150, 'armarioBajo1');
 		this.platforms.create(1100, 150, 'armarioBajo2');
 		this.platforms.create(1870, 270, 'armarioBajo2');
 		this.platforms.create(2515, 270, 'armarioBajo2');
 		this.platforms.create(2635, 270, 'armarioBajo1');
 		this.platforms.create(2755, 270, 'armarioBajo2');
 		
 		//Por colocar
        this.platforms.create(1185, 100, 'armarioAlto1');
        this.platforms.create(1250, 100, 'armarioAlto1');
        this.platforms.create(1380, 100, 'armarioAlto1');
        this.platforms.create(1510, 100, 'armarioAlto1');
        this.platforms.create(1640, 100, 'armarioAlto1');
        this.platforms.create(1770, 130, 'armarioAlto1');
        //this.platforms.create(1840, 210, 'armarioAlto1');
        //this.platforms.create(1770, 225, 'armarioAlto1');
        //this.platforms.create(1910, 225, 'armarioAlto1');


        //Meta
        this.meta.create(3100, 120, 'Meta');
        this.meta.create(3100, 520, 'Meta');

        //OBSTACULOS NIVEL 1 PLAYER 1
        this.obstaculos.create(400, 170, 'CascaraPlatano');
        this.obstaculos.create(280, 170, 'TrampaRatones');
        this.obstaculos.create(700, 295, 'TrampaRatones');
        this.obstaculos.create(1845, 103, 'CascaraPlatano');
        this.obstaculos.create(2050, 125, 'CascaraPlatano');
        this.obstaculos.create(1278, 235, 'CascaraPlatano');
        this.obstaculos.create(1970, 251, 'CascaraPlatano');
        this.obstaculos.create(2100, 251, 'CascaraPlatano');
        this.obstaculos.create(889, 295, 'TrampaRatones');
        this.obstaculos.create(2898, 210, 'CascaraPlatano');
        this.obstaculos.create(2282, 210, 'TrampaRatones');
        this.obstaculos.create(1660, 290, 'TrampaRatones');

        //OBSTACULOS MOVIBLES NIVEL 2 PLAYER 1
        this.Cacerolas = this.physics.add.group({
            allowGravity:false,
            bounceX:1,
            bounceY:1,
            collideWorldBounds: false,
            velocityY:-100
        });
        this.Cacerolas.create(1960,220,'Cacerola');
        this.Cacerolas.create(2060,200,'Cacerola');
        this.Cacerolas.create(2160,220,'Cacerola');
        this.Cacerolas.create(2260,200,'Cacerola');
        this.Cacerolas.create(2360,220,'Cacerola');
        this.physics.add.collider(this.Cacerolas,this.walkable);

        ////////////////////////////////////////////////

        this.anims.create({
            key: 'fogon_encendido',
            frames: this.anims.generateFrameNumbers('Fogon', {start: 2, end: 11}),
            frameRate: 5,
        });
      /*  this.anims.create({
            key: 'trampa_cerrada',
            frames: this.anims.generateFrameNumbers('TrampaOso', {start: 1, end: 1}),
            frameRate: 5,
        });*/

        this.obstFogon2 = this.add.sprite(543, 220, 'Fogon', 0);
        this.obstFogon3 = this.add.sprite(565, 220, 'Fogon', 0);
        this.obstFogon4 = this.add.sprite(1130, 275, 'Fogon', 0);
        this.obstFogon5 = this.add.sprite(1155, 275, 'Fogon', 0);
        this.obstFogon6 = this.add.sprite(1330, 275, 'Fogon', 0);
        this.obstFogon7 = this.add.sprite(1355, 275, 'Fogon', 0);
        this.obstFogon14 = this.add.sprite(2560, 275, 'Fogon', 0);
        this.obstFogon15 = this.add.sprite(2585, 275, 'Fogon', 0);
        this.obstFogon16 = this.add.sprite(2685, 275, 'Fogon', 0);
        this.obstFogon17 = this.add.sprite(2710, 275, 'Fogon', 0);

        this.obstaculos.create(543, 220, 'Fogon');
        this.obstaculos.create(565, 220, 'Fogon');
        this.obstaculos.create(1130, 275, 'Fogon');
        this.obstaculos.create(1155, 275, 'Fogon');
        this.obstaculos.create(1330, 275, 'Fogon');
        this.obstaculos.create(2560, 275, 'Fogon');
        this.obstaculos.create(2585, 275, 'Fogon');
        this.obstaculos.create(2685, 275, 'Fogon');
        this.obstaculos.create(2710, 275, 'Fogon');

        //this.obstOso1 = this.add.sprite(400,170,'Trampa0s0',0);
        //this.obstaculos.create(400,170,'TrampaOso');
        //MAPA PLAYER2
        //SEGURO QUE HAY QUE MODIFICAR LOS VALORES  (colocar primero el 1 y luego añadir 400 en y)

        this.walkable.create(160, 612, 'suelo1_N2');
        this.walkable.create(415, 674, 'suelo2_N2');
        this.walkable.create(1656, 708, 'suelo3_N2');
        this.walkable.create(1239, 647, 'suelo4_N2'); 
        this.walkable.create(2997, 666, 'suelo5_N2');

        //Colocar plataformas

        this.platforms.create(155, 670, 'armarioAlto1');


        //OBSTACULOS ESTATICOS NIVEL 1 PLAYER 2

        this.obstaculos.create(400, 570, 'CascaraPlatano');
        this.obstaculos.create(280, 570, 'TrampaRatones');
        this.obstaculos.create(700, 695, 'TrampaRatones');

        this.obstaculos.create(1845, 503, 'CascaraPlatano');
        this.obstaculos.create(2050, 525, 'CascaraPlatano');
        this.obstaculos.create(1278, 635, 'CascaraPlatano');

        this.obstaculos.create(1970, 651, 'CascaraPlatano');
        this.obstaculos.create(2100, 651, 'CascaraPlatano');
        this.obstaculos.create(889, 695, 'TrampaRatones');
        this.obstaculos.create(2898, 610, 'CascaraPlatano');
        this.obstaculos.create(2282, 610, 'TrampaRatones');
        this.obstaculos.create(1660, 690, 'TrampaRatones');


        this.obstFogon8 = this.add.sprite(543, 620, 'Fogon', 0);
        this.obstFogon9 = this.add.sprite(565, 620, 'Fogon', 0);
        this.obstFogon10 = this.add.sprite(1130, 675, 'Fogon', 0);
        this.obstFogon11 = this.add.sprite(1155, 675, 'Fogon', 0);
        this.obstFogon12 = this.add.sprite(1330, 675, 'Fogon', 0);
        this.obstFogon13 = this.add.sprite(1355, 675, 'Fogon', 0);
        this.obstFogon18 = this.add.sprite(2560, 675, 'Fogon', 0);
        this.obstFogon19 = this.add.sprite(2585, 675, 'Fogon', 0);
        this.obstFogon20 = this.add.sprite(2685, 675, 'Fogon', 0);
        this.obstFogon21 = this.add.sprite(2710, 675, 'Fogon', 0);

        this.obstaculos.create(543, 620, 'Fogon');
        this.obstaculos.create(565, 620, 'Fogon');
        this.obstaculos.create(1130, 675, 'Fogon');
        this.obstaculos.create(1155, 675, 'Fogon');
        this.obstaculos.create(1330, 675, 'Fogon');
        this.obstaculos.create(2560, 675, 'Fogon');
        this.obstaculos.create(2585, 675, 'Fogon');
        this.obstaculos.create(2685, 675, 'Fogon');
        this.obstaculos.create(2710, 675, 'Fogon');

        //OBSTACULOS DINAMICOS PLAYER 2
        /*this.Cacerolas2.push(this.add.image(400,570,'Cacerola'));
        this.Cacerolas2.push(this.add.image(400,570,'Cacerola'));
        this.Cacerolas2.push(this.add.image(400,570,'Cacerola'));
        this.Cacerolas2.push(this.add.image(400,570,'Cacerola'));
    */
        //this.Cacerolas.create(400,570,'Cacerola');
        //Carteles Ratones
        this.add.image(340, 70, 'Raton1Ingame').setScale(0.4);
        this.add.image(340, 470, 'Raton2Ingame').setScale(0.4);

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
        this.player1.establishColliderObj(this.walkable);
        this.player1.establishColliderObj(this.platforms);

        //PLAYER 2
        this.player2.createPhysics();
        this.player2.establishColliderObj(this.walkable);
        this.player2.establishColliderObj(this.platforms);

        //POWERUPS:
        this.powerupAma.createPhysics();
        this.powerupAz.createPhysics();
        this.powerupRoj.createPhysics();
        this.powerupAma2.createPhysics();
        this.powerupAz2.createPhysics();
        this.powerupRoj2.createPhysics();
        this.physics.add.overlap(this.player1.fisicas, this.powerupAma.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player1.fisicas, this.powerupAz.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player1.fisicas, this.powerupRoj.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.powerupAma2.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.powerupAz2.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.powerupRoj2.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(this.player1.fisicas, this.obstaculos, this.hitAnyObstacle, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.obstaculos, this.hitAnyObstacle, null, this);
        this.physics.add.overlap(this.player1.fisicas, this.Cacerolas, this.hitAnyObstacle, null, this);
        //META
        this.physics.add.overlap(this.player1.fisicas, this.meta, this.hitMeta, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.meta, this.hitMeta, null, this);

        //INTERFAZ
        this.barraDivisoria = this.add.image(0, 310, 'BarraDivisoria').setOrigin(0);

        //MUSICA
        this.backgroundMusic = this.sound.add('RaceMusic', {loop: true});
        this.game.sound.stopAll();
        this.backgroundMusic.play();
        this.backgroundMusic.setVolume(0.2);

        this.player1.fisicas.setScale(1.25);
        this.player2.fisicas.setScale(1.25);

        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }

    update(timeNum, timeDelta) {

        this.camera.moveCameraFunction();
        this.physics.world.setBounds(this.camera.getScrollCam() + 324, 0, 3200, 1080);

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
        this.activateFogon(this.obstFogon14);
        this.activateFogon(this.obstFogon15);
        this.activateFogon(this.obstFogon16);
        this.activateFogon(this.obstFogon17);
        this.activateFogon(this.obstFogon18);
        this.activateFogon(this.obstFogon19);
        this.activateFogon(this.obstFogon20);
        this.activateFogon(this.obstFogon21);
       // this.activateTrampaOso(this.obstOso1);

        //OBSTACULOS DINÁMICOS
        //Phaser.Actions.IncY(this.Cacerolas1,-1,-0.025);



        //Para pausa
        if (this.esc.isDown) {
            this.sound.play('InteractSound');
            this.scene.pause();
            this.scene.launch('Pause', {isPaused: true});
        }
    }
   /* changeVelocity(Cacerolas,walkable){
        let velocity=-50
        console.log("dentro de changeVelocity");

    velocity=velocity*(-1);
    this.Cacerolas.setVelocityY(velocity);
    }*/s
    hitMeta(player, meta) {
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
        this.sound.play('PowerUpGrabSound');
        powerup.disableBody(true, true);
        if (player.texture.key === 1) {
            this.player1.gestionPowerUp(powerup);
        } else if (player.texture.key === 2) {
            this.player2.gestionPowerUp(powerup);
        }

    }

    activateFogon(obj) {
        obj.anims.play('fogon_encendido', true);
    }
    activateTrampaOso(obj){
        obj.anims.play('trampa_cerrada',true);
    }

    hitAnyObstacle(player, obstacle) {
        this.sound.play('HurtSound');
        obstacle.disableBody(true, true);
        if (player.texture.key === 1) {
            this.player1.gestionCollision(obstacle);
        } else if (player.texture.key === 2) {
            this.player2.gestionCollision(obstacle);
        }
    }

    EndGame() {
        console.log("level2: user: "+this.user);

        this.scene.start("GameOver", {
            raton1: this.colorRaton1, 
            raton2:this.colorRaton2, 
            ganador1:this.player1Won, 
            ganador2:this.player2Won, 
            user: this.user, 
            password:this.password
        });
    }

}
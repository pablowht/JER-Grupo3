class LevelOne extends Phaser.Scene {
    constructor() {
        super("LevelOne");
    }

    //variables:
    walkable;
    platforms;
    isPaused;
    level;
    player1 = new Player(1, 200, 100, 100, -300, this);
    player2 = new Player(2, 200, 450, 100, -300, this);
    colorRaton1;
    colorRaton2;
    camera;
    powerupAma = new Powerup(3, 1040, 200, this);
    powerupAz = new Powerup(2, 1543, 250, this);
    powerupRoj = new Powerup(1, 2760, 190, this);
    powerupAma2 = new Powerup(3, 1040, 600, this);
    powerupAz2 = new Powerup(2, 1543, 650, this);
    powerupRoj2 = new Powerup(1, 2760, 590, this);
    obstaculos;
    meta;
    backgroundMusic;
    barraDivisoria;
    esc;

    preload() { }

    init(data){
        this.dataObj = data;
    }

    create() {

        this.input.keyboard.disableGlobalCapture();

        this.colorRaton1 = this.dataObj.colorRaton1;
        this.colorRaton2 = this.dataObj.colorRaton2;
        this.user = this.dataObj.user;
        this.activePrevUsersNumber = 0;

        this.camera = new CameraMovement(this);
        this.camera.cam.setZoom(1.2,1.85);

        //MAPA
        this.add.image(1600, 155, 'mapa1');
        this.add.image(1600, 555, 'mapa1');
        this.walkable = this.physics.add.staticGroup();
        this.platforms = this.physics.add.staticGroup();
        this.meta = this.physics.add.staticGroup();

        //OBSTACULOS
        this.obstaculos = this.physics.add.staticGroup();
        //MAPA PLAYER1
        this.walkable.create(1600, 10, 'techoMapa');
        this.walkable.create(1237, 64, 'techoMapa2');

        //MAPA
        this.walkable.create(353, 240, 'paredesMapa1');
        this.walkable.create(2175,288,'paredMapa2');
        this.walkable.create(800, 305, 'sueloMapa1');
        this.walkable.create(2200,305,'sueloMapa2');
        this.walkable.create(2997,266,'sueloMapa2N3');
        this.walkable.create(2280,247,'sueloMapa2N2');
        //Colocar las plataformas
        this.platforms.create(155, 270, 'armarioBajo1');
        this.platforms.create(553, 270, 'armarioBajo2');
        this.platforms.create(1010, 270, 'armarioBajo1');
        this.platforms.create(1078, 270, 'armarioBajo2');
        this.platforms.create(1210, 270, 'armarioBajo3');
        this.platforms.create(1278, 270, 'armarioBajo3');
        this.platforms.create(1410, 270, 'armarioBajo1');
        this.platforms.create(1478, 270, 'armarioBajo2');
        this.platforms.create(1600, 270, 'armarioBajo3');
        this.platforms.create(620, 140, 'armarioAlto1');
        this.platforms.create(770, 190, 'armarioAlto1');
        this.platforms.create(890, 120, 'armarioAlto1');
        this.platforms.create(1700,140, 'armarioAlto1');
        this.platforms.create(1780,120, 'armarioAlto1');
        this.platforms.create(1850,120, 'armarioAlto1');
        this.platforms.create(1970,140, 'armarioAlto1');
        this.platforms.create(2040,140, 'armarioAlto1');
        this.platforms.create(2110,140, 'armarioAlto1');
        this.platforms.create(2472,160, 'armarioAlto1');
        this.platforms.create(2580,140, 'armarioAlto1');
        this.platforms.create(2510,270, 'armarioBajo3');
        this.platforms.create(2635,270, 'armarioBajo3');
        this.platforms.create(2760,270, 'armarioBajo3');

        //Meta
        this.meta.create(3100,120,'Meta');
        this.meta.create(3100,520,'Meta');

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
        this.obstaculos.create(2898, 210 , 'CascaraPlatano');
        this.obstaculos.create(2282, 210, 'TrampaRatones');
        this.obstaculos.create(1660, 290, 'TrampaRatones');

       this.anims.create({
            key: 'fogon_encendido',
            frames: this.anims.generateFrameNumbers('Fogon', {start: 2, end: 11}),
            frameRate: 5,
        });

        this.obstFogon2 = this.add.sprite(543, 220, 'Fogon', 0);
        this.obstFogon3 = this.add.sprite(565, 220, 'Fogon', 0);
        this.obstFogon4 = this.add.sprite(1130, 275, 'Fogon', 0);
        this.obstFogon5 = this.add.sprite(1155, 275, 'Fogon', 0);
        this.obstFogon6 = this.add.sprite(1330, 275, 'Fogon', 0);
        this.obstFogon7 = this.add.sprite(1355, 275, 'Fogon', 0);
        this.obstFogon14 = this.add.sprite(2560, 275, 'Fogon', 0);
        this.obstFogon15= this.add.sprite(2585, 275, 'Fogon', 0);
        this.obstFogon16 = this.add.sprite(2685, 275, 'Fogon', 0);
        this.obstFogon17= this.add.sprite(2710, 275, 'Fogon', 0);

        this.obstaculos.create(543, 220, 'Fogon');
        this.obstaculos.create(565, 220, 'Fogon');
        this.obstaculos.create(1130, 275, 'Fogon');
        this.obstaculos.create(1155, 275, 'Fogon');
        this.obstaculos.create(1330, 275, 'Fogon');
        this.obstaculos.create(2560, 275, 'Fogon');
        this.obstaculos.create(2585, 275, 'Fogon');
        this.obstaculos.create(2685, 275, 'Fogon');
        this.obstaculos.create(2710, 275, 'Fogon');

        //MAPA PLAYER2
        this.walkable.create(1600, 410, 'techoMapa');
        this.walkable.create(1237, 464, 'techoMapa2');

        this.walkable.create(353, 640, 'paredesMapa1');
        this.walkable.create(2175,688,'paredMapa2');
        this.walkable.create(800, 705, 'sueloMapa1');
        this.walkable.create(2200,705,'sueloMapa2');
        this.walkable.create(2997,666,'sueloMapa2N3');
        this.walkable.create(2280,647,'sueloMapa2N2');

        //Colocar plataformas
        this.platforms.create(155, 670, 'armarioBajo1');
        this.platforms.create(553, 670, 'armarioBajo2');
        this.platforms.create(1010, 670, 'armarioBajo1');
        this.platforms.create(1078, 670, 'armarioBajo2');
        this.platforms.create(1210, 670, 'armarioBajo3');
        this.platforms.create(1278, 670, 'armarioBajo3');
        this.platforms.create(1410, 670, 'armarioBajo1');
        this.platforms.create(1478, 670, 'armarioBajo2');
        this.platforms.create(1600, 670, 'armarioBajo3');
        this.platforms.create(620, 540, 'armarioAlto1');
        this.platforms.create(770, 590, 'armarioAlto1');
        this.platforms.create(890, 520, 'armarioAlto1');
        this.platforms.create(1700,540, 'armarioAlto1');
        this.platforms.create(1780,520, 'armarioAlto1');
        this.platforms.create(1850,520, 'armarioAlto1');
        this.platforms.create(1970,540, 'armarioAlto1');
        this.platforms.create(2040,540, 'armarioAlto1');
        this.platforms.create(2110,540, 'armarioAlto1');
        this.platforms.create(2472,560, 'armarioAlto1');
        this.platforms.create(2580,540, 'armarioAlto1');
        this.platforms.create(2510,670, 'armarioBajo3');
        this.platforms.create(2635,670, 'armarioBajo3');
        this.platforms.create(2760,670, 'armarioBajo3');


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
        this.obstaculos.create(2898, 610 , 'CascaraPlatano');
        this.obstaculos.create(2282, 610, 'TrampaRatones');
        this.obstaculos.create(1660, 690, 'TrampaRatones');


        this.obstFogon8 = this.add.sprite(543, 620, 'Fogon', 0);
        this.obstFogon9 = this.add.sprite(565, 620, 'Fogon', 0);
        this.obstFogon10 = this.add.sprite(1130, 675, 'Fogon', 0);
        this.obstFogon11 = this.add.sprite(1155, 675, 'Fogon', 0);
        this.obstFogon12= this.add.sprite(1330, 675, 'Fogon', 0);
        this.obstFogon13= this.add.sprite(1355, 675, 'Fogon', 0);
        this.obstFogon18 = this.add.sprite(2560, 675, 'Fogon', 0);
        this.obstFogon19= this.add.sprite(2585, 675, 'Fogon', 0);
        this.obstFogon20 = this.add.sprite(2685, 675, 'Fogon', 0);
        this.obstFogon21= this.add.sprite(2710, 675, 'Fogon', 0);

        this.obstaculos.create(543, 620, 'Fogon');
        this.obstaculos.create(565, 620, 'Fogon');
        this.obstaculos.create(1130, 675, 'Fogon');
        this.obstaculos.create(1155, 675, 'Fogon');
        this.obstaculos.create(1330, 675, 'Fogon');
        this.obstaculos.create(2560, 675, 'Fogon');
        this.obstaculos.create(2585, 675, 'Fogon');
        this.obstaculos.create(2685, 675, 'Fogon');
        this.obstaculos.create(2710, 675, 'Fogon');

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

        //META
        this.physics.add.overlap(this.player1.fisicas, this.meta, this.hitMeta, null, this);
        this.physics.add.overlap(this.player2.fisicas, this.meta, this.hitMeta, null, this);

        //INTERFAZ
        this.barraDivisoria = this.add.image(0,310, 'BarraDivisoria').setOrigin(0);

        //MUSICA
        this.backgroundMusic = this.sound.add('RaceMusic', {loop: true});
        this.game.sound.stopAll();
        this.backgroundMusic.play();
        this.backgroundMusic.setVolume(0.2);
        
        this.player1.fisicas.setScale(1.25);
        this.player2.fisicas.setScale(1.25);

        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        window.addEventListener('beforeunload', () =>
        {
            deleteActiveUser(this.user);
        });

        this.textActiveUsers = this.add.text(117, 935, 'Usuarios activos login: ' + this.activeUsers , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });

        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);
    }

    update(timeNum, timeDelta) {

        this.camera.moveCameraFunction();
        this.physics.world.setBounds(this.camera.getScrollCam()+324,0,3200,1080);

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

        //Para pausa
        if (this.esc.isDown) {
            this.sound.play('InteractSound');
            this.scene.pause();
            this.scene.launch('Pause',{isPaused:true, level:1});
        }

        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsers);
    }

    hitMeta(player, meta){
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

    activateFogon(obj){
        obj.anims.play('fogon_encendido', true);
    }

    hitAnyObstacle(player, obstacle){
        this.sound.play('HurtSound');
        obstacle.disableBody(true,true);
        if (player.texture.key === 1) {
            this.player1.gestionCollision(obstacle);
        } else if (player.texture.key === 2) {
            this.player2.gestionCollision(obstacle);
        }
    }

    EndGame(){
        this.scene.start("GameOver", {
			raton1: this.colorRaton1, 
			raton2:this.colorRaton2, 
			ganador1:this.player1Won, 
			ganador2:this.player2Won, 
			user: this.user,
            activeUsers: this.activeUsersNumber,
            activePrevUsers: this.activePrevUsersNumber
		});
    }
    updateActiveUsers()
    {

        if(this.activePrevUsersNumber !== this.activeUsersNumber)
        {
            if(this.activePrevUsersNumber < this.activeUsersNumber){
                console.log("Se ha conectado alguien. El número actual de usuarios es: " + this.activeUsersNumber);
            }else if(this.activePrevUsersNumber > this.activeUsersNumber){
                console.log("Alguien se ha desconectado. El número actual de usuarios es: " + this.activeUsersNumber);
            }
            this.activePrevUsersNumber = this.activeUsersNumber;
        }

    }

    deleteActiveUser(user)
    {
        $.ajax({
            method: "DELETE",
            url: url + "activeUsers/" + user,
            data: user,
            success : function () {
                console.log("User removed");
            },
            error : function () {
                console.log("Failed to delete");
                console.log("The URL was:\n" + url + "users/" + user)
            }
        });
    }

    getActiveUsers()
    {
        $.ajax({
            method: 'GET',
            url: url + "activeUsersNum",
        }).done((data)=> {
            this.assignValue(data);
        })
    }

    assignValue(data){
        this.activeUsersNumber = data;
    }
}
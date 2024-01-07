var id;
var connection;
var player1;
var player2;
var player1Won;
var player2Won;
var colorRaton1;
var colorRaton2;
var moveLeft1;
var moveRight1;
var nomove1;
var jump1;
var down1;
var moveLeft2;
var moveRight2;
var nomove2;
var jump2;
var down2;

var pausa1;
var pausa2;

class LevelTwo extends Phaser.Scene {
    constructor() {
        super("LevelTwo");
    }

    //variables:
    walkable;
    platforms;

    camera;
    powerupAma = new Powerup(3, 2390, 220, this);
  
    powerupRoj = new Powerup(1, 2760, 190, this);
    powerupRoj3 = new Powerup(1, 600, 190, this);
    powerupRoj5 = new Powerup(1, 1035, 115, this);
    powerupAma2 = new Powerup(3, 2390, 620, this);
    powerupRoj2 = new Powerup(1, 2760, 590, this);
    powerupRoj4 = new Powerup(1, 600, 590, this);
    powerupRoj6 = new Powerup(1, 1035, 515, this);
    obstaculos;
    meta;
    backgroundMusic;
    barraDivisoria;
    velocity=-50;
    Cacerolas;
    esc;

    init(data) {
        this.dataObj = data;
    }

    create() {
		colorRaton1 = this.dataObj.colorRaton1;
        colorRaton2 = this.dataObj.colorRaton2;
		playerReady = false;
        rivalReady = false;
        player1Won = false;
        player2Won = false;
        isSocketOpen = false;
        id = this.dataObj.id;
    	connection = this.dataObj.connection;
    	this.url= window.location.href;
    	
    	////
		player1 = new Player(1, 200, 100, 100, -300, this);
    	player2 = new Player(2, 200, 450, 100, -300, this);
        this.input.keyboard.disableGlobalCapture();

        this.user = this.dataObj.user;
        this.activePrevUsersNumber = 0;

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

        //MUEBLES PLAYER 1
        this.platforms.create(360,200, 'armarioBajo2');
        this.platforms.create(420, 100, 'armarioAlto1');
        this.platforms.create(510, 95, 'armarioAlto2');
        this.platforms.create(580, 95, 'armarioAlto2');
        this.platforms.create(650, 95, 'armarioAlto2');
        this.platforms.create(720, 95, 'armarioAlto2');
        this.platforms.create(555, 230, 'armarioAlto1');
        this.platforms.create(695, 270, 'armarioBajo2');
        this.platforms.create(760, 270, 'armarioBajo2');
        this.platforms.create(820, 185, 'armarioAlto1');
        this.platforms.create(955, 150, 'armarioBajo3');
        this.platforms.create(1030, 150, 'armarioBajo1');
 		this.platforms.create(1100, 150, 'armarioBajo2');
        this.platforms.create(1185, 120, 'armarioAlto1');
        this.platforms.create(1250, 120, 'armarioAlto1');
        this.platforms.create(1380, 120, 'armarioAlto1');
        this.platforms.create(1510, 120, 'armarioAlto1');
        this.platforms.create(1640, 120, 'armarioAlto1');
        this.platforms.create(1680, 220, 'armarioAlto1');
        this.platforms.create(1770, 130, 'armarioAlto1');
        this.platforms.create(1860, 220, 'armarioAlto1');
 		this.platforms.create(2515, 270, 'armarioBajo2');
        this.platforms.create(2400, 170, 'armarioAlto1');
 		this.platforms.create(2635, 270, 'armarioBajo1');
        this.platforms.create(2495, 90, 'armarioAlto1');
        this.platforms.create(2565, 95, 'armarioAlto2');
        this.platforms.create(2635, 90, 'armarioAlto1');
        this.platforms.create(2705, 95, 'armarioAlto2');
        this.platforms.create(2775, 90, 'armarioAlto1');
 		this.platforms.create(2755, 270, 'armarioBajo2');

        //Meta
        this.meta.create(3100, 120, 'Meta');
        this.meta.create(3100, 520, 'Meta');

        //OBSTACULOS PLAYER 1
        this.obstaculos.create(260, 170, 'TrampaRatones');
        this.obstaculos.create(480, 215, 'CascaraPlatano');
        this.obstaculos.create(730, 230, 'CascaraPlatano');
        //this.obstaculos.create(1035, 115, 'CascaraPlatano');
        this.obstaculos.create(1330, 170, 'TrampaRatones');
        this.obstaculos.create(1445, 170, 'TrampaRatones');
        this.obstaculos.create(1750, 290, 'CascaraPlatano');
        this.obstaculos.create(2410, 290, 'TrampaRatones');

        //OBSTACULOS MOVIBLES  PLAYER 1
        this.Cacerolas = this.physics.add.group({
            allowGravity:false,
            bounceX:1,
            bounceY:1,
            collideWorldBounds: false,
            velocityY:-100
        });
        this.Cacerolas.create(1950,250,'Cacerola');
        this.Cacerolas.create(2050,200,'Cacerola');
        this.Cacerolas.create(2150,250,'Cacerola');
        this.Cacerolas.create(2250,200,'Cacerola');
        this.Cacerolas.create(2350,220,'Cacerola');
        this.Cacerolas.create(2870,215,'Cacerola');
        this.Cacerolas.create(2960,150,'Cacerola');
        this.Cacerolas.create(3050,120,'Cacerola');

        this.physics.add.collider(this.Cacerolas,this.walkable);

        ////////////////////////////////////////////////

        this.anims.create({
            key: 'fogon_encendido',
            frames: this.anims.generateFrameNumbers('Fogon', {start: 2, end: 11}),
            frameRate: 5,
        });


        this.obstFogon14 = this.add.sprite(2560, 275, 'Fogon', 0);
        this.obstFogon15 = this.add.sprite(2585, 275, 'Fogon', 0);
        this.obstFogon16 = this.add.sprite(2685, 275, 'Fogon', 0);
        this.obstFogon17 = this.add.sprite(2710, 275, 'Fogon', 0);


        this.obstaculos.create(2560, 275, 'Fogon');
        this.obstaculos.create(2585, 275, 'Fogon');
        this.obstaculos.create(2685, 275, 'Fogon');
        this.obstaculos.create(2710, 275, 'Fogon');

        //MAPA PLAYER2

        this.walkable.create(1600, 410, 'techoMapa_N2');
        this.walkable.create(2146, 467, 'techoMapa2_N2');

        this.walkable.create(160, 612, 'suelo1_N2');
        this.walkable.create(415, 674, 'suelo2_N2');
        this.walkable.create(1656, 708, 'suelo3_N2');
        this.walkable.create(1239, 647, 'suelo4_N2'); 
        this.walkable.create(2997, 666, 'suelo5_N2');

        //MUEBLES PLAYER 2

        this.platforms.create(360,600, 'armarioBajo2');
        this.platforms.create(420, 500, 'armarioAlto1');
        this.platforms.create(510, 495, 'armarioAlto2');
        this.platforms.create(580, 495, 'armarioAlto2');
        this.platforms.create(650, 495, 'armarioAlto2');
        this.platforms.create(720, 495, 'armarioAlto2');
        this.platforms.create(555, 630, 'armarioAlto1');
        this.platforms.create(695, 670, 'armarioBajo2');
        this.platforms.create(760, 670, 'armarioBajo2');
        this.platforms.create(820, 585, 'armarioAlto1');
        this.platforms.create(955, 550, 'armarioBajo3');
        this.platforms.create(1030, 550, 'armarioBajo1');
        this.platforms.create(1100, 550, 'armarioBajo2');
        this.platforms.create(1185, 520, 'armarioAlto1');
        this.platforms.create(1250, 520, 'armarioAlto1');
        this.platforms.create(1380, 520, 'armarioAlto1');
        this.platforms.create(1510, 520, 'armarioAlto1');
        this.platforms.create(1640, 520, 'armarioAlto1');
        this.platforms.create(1680, 620, 'armarioAlto1');
        this.platforms.create(1770, 530, 'armarioAlto1');
        this.platforms.create(1860, 620, 'armarioAlto1');
        this.platforms.create(2515, 670, 'armarioBajo2');
        this.platforms.create(2400, 570, 'armarioAlto1');
        this.platforms.create(2635, 670, 'armarioBajo1');
        this.platforms.create(2495, 490, 'armarioAlto1');
        this.platforms.create(2565, 495, 'armarioAlto2');
        this.platforms.create(2635, 490, 'armarioAlto1');
        this.platforms.create(2705, 495, 'armarioAlto2');
        this.platforms.create(2775, 490, 'armarioAlto1');
        this.platforms.create(2755, 670, 'armarioBajo2');

        this.obstaculos.create(260, 570, 'TrampaRatones');
        this.obstaculos.create(480, 615, 'CascaraPlatano');
        this.obstaculos.create(730, 630, 'CascaraPlatano');

        this.obstaculos.create(1330, 570, 'TrampaRatones');
        this.obstaculos.create(1445, 570, 'TrampaRatones');
        this.obstaculos.create(1750, 690, 'CascaraPlatano');
        this.obstaculos.create(2410, 690, 'TrampaRatones');
        
        this.Cacerolas.create(1950,650,'Cacerola');
        this.Cacerolas.create(2050,600,'Cacerola');
        this.Cacerolas.create(2150,650,'Cacerola');
        this.Cacerolas.create(2250,600,'Cacerola');
        this.Cacerolas.create(2350,650,'Cacerola');
        this.Cacerolas.create(2870,615,'Cacerola');
        this.Cacerolas.create(2960,550,'Cacerola');
        this.Cacerolas.create(3050,520,'Cacerola');

        this.obstFogon18 = this.add.sprite(2560, 675, 'Fogon', 0);
        this.obstFogon19 = this.add.sprite(2585, 675, 'Fogon', 0);
        this.obstFogon20 = this.add.sprite(2685, 675, 'Fogon', 0);
        this.obstFogon21 = this.add.sprite(2710, 675, 'Fogon', 0);


        this.obstaculos.create(2560, 675, 'Fogon');
        this.obstaculos.create(2585, 675, 'Fogon');
        this.obstaculos.create(2685, 675, 'Fogon');
        this.obstaculos.create(2710, 675, 'Fogon');

        //OBSTACULOS DINAMICOS PLAYER 2


        //Carteles Ratones
        this.add.image(240, 60, 'Raton1Ingame').setScale(0.4);
        this.add.image(240, 460, 'Raton2Ingame').setScale(0.4);

        //Inicialización de los jugadores
        player1.assignControls();
        player2.assignControls();

        //Color Ratones
        player1.color = colorRaton1;
        player2.color = colorRaton2;

        //añadimos las animaciones
        player1.createAnimsPlayer(player1.color);
        player2.createAnimsPlayer(player2.color);

        //PLAYER 1
        player1.createPhysics();
        player1.establishColliderObj(this.walkable);
        player1.establishColliderObj(this.platforms);

        //PLAYER 2
        player2.createPhysics();
        player2.establishColliderObj(this.walkable);
        player2.establishColliderObj(this.platforms);

        //POWERUPS:
        this.powerupAma.createPhysics();
        this.powerupRoj3.createPhysics();
        //this.powerupAz.createPhysics();
        this.powerupRoj.createPhysics();
        this.powerupAma2.createPhysics();
        this.powerupRoj4.createPhysics();
        //this.powerupAz2.createPhysics();
        this.powerupRoj2.createPhysics();
        this.powerupRoj5.createPhysics();
        this.powerupRoj6.createPhysics();
        this.physics.add.overlap(player1.fisicas, this.powerupAma.fisicas, this.collectPowerUp, null, this);
        //this.physics.add.overlap(player1.fisicas, this.powerupAz.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(player1.fisicas, this.powerupRoj.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(player1.fisicas, this.powerupRoj3.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(player2.fisicas, this.powerupRoj4.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(player1.fisicas, this.powerupRoj5.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(player2.fisicas, this.powerupRoj6.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(player2.fisicas, this.powerupAma2.fisicas, this.collectPowerUp, null, this);
     //   this.physics.add.overlap(player2.fisicas, this.powerupAz2.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(player2.fisicas, this.powerupRoj2.fisicas, this.collectPowerUp, null, this);
        this.physics.add.overlap(player1.fisicas, this.obstaculos, this.hitAnyObstacle, null, this);
        this.physics.add.overlap(player2.fisicas, this.obstaculos, this.hitAnyObstacle, null, this);
        this.physics.add.overlap(player1.fisicas, this.Cacerolas, this.hitAnyObstacle, null, this);
        this.physics.add.overlap(player2.fisicas, this.Cacerolas, this.hitAnyObstacle, null, this);
        //META
        this.physics.add.overlap(player1.fisicas, this.meta, this.hitMeta, null, this);
        this.physics.add.overlap(player2.fisicas, this.meta, this.hitMeta, null, this);

        //INTERFAZ
        this.barraDivisoria = this.add.image(0, 310, 'BarraDivisoria').setOrigin(0);

        //MUSICA
        this.backgroundMusic = this.sound.add('RaceMusic', {loop: true});
        this.game.sound.stopAll();
        this.backgroundMusic.play();
        this.backgroundMusic.setVolume(0.2);

        player1.fisicas.setScale(1.25);
        player2.fisicas.setScale(1.25);

        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        window.addEventListener('beforeunload', () =>
        {
            this.deleteActiveUser(this.user);
        });

        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);
        
        // ------------WEBSOCKETS--------------
        //Atributos de la conexión
        isSocketOpen = true;
        connection.onopen = function (){
            isSocketOpen = true;
            console.log("Socket abierto");
        }
        connection.onclose = function(){
            isSocketOpen = false;
            console.log("Closing socket."); 
        }

        connection.onmessage = function (message){
            //console.log("mensaje recibido");
            let msg = JSON.parse(message.data);
            if(id == 0)
            {
				player2.fisicas.setPosition(msg.positionX,msg.positionY);
				player2Won = msg.ganador;
                moveLeft2 = msg.left;
                moveRight2 = msg.right;
                down2 = msg.down;
                jump2 = msg.jump;
                nomove2 = msg.idle;
                pausa2 = msg.pausa;
            } else if (id == 1)
    		{
        		player1.fisicas.setPosition(msg.positionX,msg.positionY);
                moveLeft1 = msg.left;
                moveRight1 = msg.right;
                down1 = msg.down;
                jump1 = msg.jump;
                nomove1 = msg.idle;
        		player1Won = msg.ganador;
                pausa1 = msg.pausa;
            }
        }
        
        this.timedEventUpdateConnection = this.time.addEvent({  	
            delay: 13,
            callback: this.sendCharacterInfo,
            callbackScope: this,
            loop: true });

    }

    update(timeNum, timeDelta) {

        this.camera.moveCameraFunction();
        this.physics.world.setBounds(this.camera.getScrollCam() + 324, 0, 3200, 1080);

        //player1.update(timeNum, timeDelta);
        //player2.update(timeNum, timeDelta);
        
        this.activateFogon(this.obstFogon14);
        this.activateFogon(this.obstFogon15);
        this.activateFogon(this.obstFogon16);
        this.activateFogon(this.obstFogon17);
      	this.activateFogon(this.obstFogon18);
        this.activateFogon(this.obstFogon19);
        this.activateFogon(this.obstFogon20);
        this.activateFogon(this.obstFogon21);

        this.getActiveUsers();
        this.updateActiveUsers();
        //this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);

        if(id == 0 && !player1Won && !player2Won) player1.update(timeNum, timeDelta);
        if(id == 1 && !player1Won && !player2Won) player2.update(timeNum, timeDelta);

        if(id == 0){
            if(moveRight2){
                player2.fisicas.play('walk'+2, true);
                player2.fisicas.flipX = false;
            } else if(moveLeft2){
                player2.fisicas.play('walk'+2, true);
                player2.fisicas.flipX = true;
            } else if(nomove2){
                player2.fisicas.play('idle'+2, true);
            } else if(down2){
                player2.fisicas.play('down'+2, true);
            } else if(jump2){
                player2.fisicas.play('jump'+2, true);
            }
        }
        if(id == 1){
            if(moveRight1){
                player1.fisicas.play('walk'+1, true);
                player1.fisicas.flipX = false;
            } else if(moveLeft1){
                player1.fisicas.play('walk'+1, true);
                player1.fisicas.flipX = true;
            } else if(nomove1){
                player1.fisicas.play('idle'+1, true);
            } else if(down1){
                player1.fisicas.play('down'+1, true);
            } else if(jump1){
                player1.fisicas.play('jump'+1, true);
            }
        }
        if(this.activeUsersNumber == 1) this.userDisconected();
    }

    hitMeta(player, meta){
        if (player.texture.key === 1) {
            player1.gestionCollision(meta);
            player1Won = true;
			this.sendCharacterInfo();
            this.countdownFunction();
        } else if (player.texture.key === 2) {
            player2.gestionCollision(meta);
            player2Won = true;
			this.sendCharacterInfo();
            this.countdownFunction();
        }
    }

    collectPowerUp(player, powerup) {
        this.sound.play('PowerUpGrabSound');
        powerup.disableBody(true, true);
        if (player.texture.key === 1) {
            player1.gestionPowerUp(powerup);
        } else if (player.texture.key === 2) {
            player2.gestionPowerUp(powerup);
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
            player1.gestionCollision(obstacle);
        } else if (player.texture.key === 2) {
            player2.gestionCollision(obstacle);
        }
    }

    EndGame() {
        this.scene.start("GameOver", {
            raton1: colorRaton1, 
            raton2:colorRaton2, 
            ganador1:player1Won, 
            ganador2:player2Won, 
            user: this.user
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
		id = null;
		connection = false;
        connection.close();
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

    userDisconected(){
        console.log("usuario desconectado...");
        this.add.image(0,0, 'Fondo_Desconexion').setOrigin(0,0);
        id = null;
        p1Ready = false;
        p2Ready = false;
        raton2 = false;
        raton1 = false;
        this.time.delayedCall(2000, () => {this.StartPlaying('Menu');}, [], this);
    }
    
    sendCharacterInfo()
    {
        let message;
		if(id == 0){
			message = {
                left: player1.left,
                right: player1.right,
                jump: player1.jump,
                down: player1.down,
                idle: player1.idle,
                positionX: player1.fisicas.x,
                positionY: player1.fisicas.y,
                id: id,
                color: raton1,
                ganador: player1Won,
                pausa: pausa1
        	}
        } else if(id == 1){
			message = {
                left: player2.left,
                right: player2.right,
                jump: player2.jump,
                down: player2.down,
                idle: player2.idle,
                positionX: player2.fisicas.x,
                positionY: player2.fisicas.y,
                id: id,
                color: raton2,
                ganador: player2Won,
                pausa: pausa2
            }
		}
            		       
        if(isSocketOpen && this.activeUsersNumber >= 2)
        {
            connection.send(JSON.stringify(message))
        }
    }
    
    countdownFunction()
    {
		this.time.delayedCall(3000, () => {this.StartPlaying('GameOver');}, [], this);
    }
    
    StartPlaying(escena){
		isSocketOpen = false;
        connection.onclose();
    	this.scene.start(escena, {
				raton1: colorRaton1, 
				raton2: colorRaton2, 
				ganador1: player1Won, 
				ganador2: player2Won, 
				user: this.user
		});
  	}
}
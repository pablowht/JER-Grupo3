var id;
var connection;
var isSocketOpen = false;
var turno1;
var turno2;
var p1Ready;
var p2Ready;
var BotonP1Listo;
var BotonP2Listo;
var RatonGrande1 = false;
var RatonGrande2 = false;
var RatonGrande1W;
var RatonGrande2W;
var playerDisconected;
var rivalDisconected;
var raton1;
var raton2;
var raton1Selection;
var raton2Selection;
var textoEsperandoMucho;
var coorBx;
var coorBy;
var coorGx;
var coorGy;
var coorMx;
var coorMy;


class PlayerSelectionScene extends Phaser.Scene {
    constructor(numRaton) {
        super("PlayerSelection");
    }

    boton1Pulsado;
    boton2Pulsado;
    ratonGElegido;
    ratonBElegido;
    ratonMElegido;
    raton1;
	raton2;

	init(data)
    {
		this.dataObj = data;
	}
	
    create(){

        this.user = this.dataObj.user;
        this.activePrevUsersNumber = 0;
        id = this.dataObj.id;
        connection = this.dataObj.connection;
        playerDisconected = false;
        rivalDisconected = false;

        //Se reinician las variables para que si se vuelve a entrar después de una partida los valores estén correctos
        this.ReiniciarVariables();
        coorBx = 1200;
        coorBy = 530;
        coorGx = 866;
        coorGy = 265;
        coorMx = 866;
        coorMy = 800;

        RatonGrande1 = false;
        RatonGrande2 = false;
        
        //FONDO
        this.add.image(0,0,'FondoCustom').setOrigin(0, 0);

        //BOTONES
        BotonP1Listo = this.add.image(300,870,'BotonP1Listo');
        BotonP1Listo.setInteractive({ cursor: 'pointer' });

        BotonP2Listo = this.add.image(1630,870,'BotonP2Listo');
        BotonP2Listo.setInteractive({ cursor: 'pointer' });

        //let BotonVolver = this.add.image(150,100,'Flecha');
        //BotonVolver.setInteractive({ cursor: 'pointer' });

        let BotonRatonGris = this.add.image(866,265,'BotonRatonGris');
        BotonRatonGris.setInteractive({ cursor: 'pointer' });
        let BotonRatonBlanco = this.add.image(1200,530,'BotonRatonBlanco');
        BotonRatonBlanco.setInteractive({ cursor: 'pointer' });
        let BotonRatonMarron = this.add.image(866,800,'BotonRatonMarron');
        BotonRatonMarron.setInteractive({ cursor: 'pointer' });

        //BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
        //    this.sound.play('InteractSound');
        //    this.scene.start('Menu');
        //});

        BotonP1Listo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(raton1 !== undefined && this.boton1Pulsado && id == 0){
                BotonP1Listo = this.add.image(300,870,'Boton1ListoPressed');
                p1Ready = true;
                this.sendCharacterInfo();
            }
        });

        BotonP2Listo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(raton2 !== undefined && this.boton2Pulsado && id == 1){
                BotonP2Listo = this.add.image(1630,870,'Boton2ListoPressed');
                p2Ready = true;
                this.sendCharacterInfo();
            }
        });
        
        BotonRatonBlanco.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.boton1Pulsado && !p1Ready && id == 0){
                //raton1Selection.destroy();
                //RatonGrande1.destroy();
                //this.player1CleanSelec()
                this.boton1Pulsado = false;
                this.ratonBElegido = false;
                this.ratonMElegido = false;
                this.ratonGElegido = false;
                return;
            }
            if(this.boton2Pulsado && !p2Ready && id == 1){
                //raton2Selection.destroy();
                //RatonGrande2.destroy();
                //this.player2CleanSelec()
                this.boton2Pulsado = false;
                return;
            }

            if(!p1Ready && !this.boton1Pulsado && id == 0){
                raton1 = 1;
                RatonGrande1W = 1;
                //RatonGrande1 = this.add.image(300,510,'RatonBlancoGrande');
                //raton1Selection = this.add.image(1200,530,'Boton1RatonSeleccionado');

                this.player1SelecBlanco();
                this.boton1Pulsado = true;
                this.ratonBElegido = true;

            }
            if(p1Ready && !p2Ready && !this.ratonBElegido && id == 1){
                raton2 = 1
                RatonGrande2W = 1;

                //RatonGrande2 = this.add.image(1625,510,'RatonBlancoGrande');
                //raton2Selection = this.add.image(1200,530,'Boton2RatonSeleccionado');

                this.player2SelecBlanco();
                this.boton2Pulsado = true;
            }
        });

        BotonRatonMarron.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.boton1Pulsado && !p1Ready && id == 0){
                //raton1Selection.destroy();
                //RatonGrande1.destroy();
                //this.player1CleanSelec();
                this.boton1Pulsado = false;
                this.ratonBElegido = false;
                this.ratonMElegido = false;
                this.ratonGElegido = false;

                return;
            }
            if(this.boton2Pulsado && !p2Ready && id == 1){
                this.boton2Pulsado = false;

                //raton2Selection.destroy();
                //RatonGrande2.destroy();
                //this.player2CleanSelec();
                return;
            }

            if(!p1Ready && id == 0){
                raton1 = 2;
                RatonGrande1W = 2;
                //RatonGrande1 = this.add.image(300,510,'RatonMarronGrande');
                //raton1Selection = this.add.image(866,800,'Boton1RatonSeleccionado');

                this.boton1Pulsado = true;
                this.ratonMElegido = true;
                this.player1SelecMarron();

            }
            if(p1Ready && !p2Ready && !this.ratonMElegido && id == 1){
                raton2 = 2;
                RatonGrande2W = 2;

                //RatonGrande2 = this.add.image(1625,510,'RatonMarronGrande');
                //raton1Selection = this.add.image(866,800,'Boton2RatonSeleccionado');

                this.boton2Pulsado = true;
                this.player2SelecMarron()
            }
        });

        BotonRatonGris.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.boton1Pulsado && !p1Ready && id == 0){
                //raton1Selection.destroy();
                //RatonGrande1.destroy();
                this.boton1Pulsado = false;
                this.ratonBElegido = false;
                this.ratonMElegido = false;
                this.ratonGElegido = false;
                //this.player1CleanSelec()

                return;
            }
            if(this.boton2Pulsado && !p2Ready && id == 1){
                this.boton2Pulsado = false;
                //raton2Selection.destroy();
                //RatonGrande2.destroy();
                //this.player2CleanSelec()
                return;
            }

            if(!p1Ready && id == 0){
                raton1 = 0;
                RatonGrande1W = 0;
                //RatonGrande1 = this.add.image(300,510,'RatonGrisGrande');
                //raton1Selection = this.add.image(866,265,'Boton1RatonSeleccionado');

                this.boton1Pulsado = true;
                this.ratonGElegido = true;

                this.player1SelecGris()
            }
            if(p1Ready && !p2Ready && !this.ratonGElegido && id == 1){
                raton2 = 0
                RatonGrande2W = 0;
                //RatonGrande2 = this.add.image(1625,510,'RatonGrisGrande');
                //raton1Selection = this.add.image(866,265,'Boton2RatonSeleccionado');

                this.boton2Pulsado = true;
                this.player2SelecGris()
	        }
        });

        
        //TURNO JUGADORES
        turno1 = this.add.image(296.5,175.5,'Turno1');
        turno1.setVisible(false);
        turno2 = this.add.image(1628,175.5,'Turno2');
        turno2.setVisible(false);
		
		playerDisconected = false;
		rivalDisconected = false;
        window.addEventListener('beforeunload', () =>
        {
			playerDisconected = true;
            this.deleteActiveUser(this.user);
       });

        this.add.image(960, 1005, 'Recuadro_UsuariosActivos');
        this.textActiveUsers = this.add.text(780, 980, 'Usuarios activos: ' + this.activeUsersNumber , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });

        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);
        
        
        //WEBSOCKETS:
        isSocketOpen = true;
        connection.onopen = function () {
            console.log("Socket abierto")
            isSocketOpen = true;
        }

        connection.onclose = function () {
			//this.deleteActiveUser(this.user);
            console.log("Socket cerrado")
            isSocketOpen = false;
        }

        connection.onmessage = function (message) {
            let msg = JSON.parse(message.data);
            //console.log("boton raton seleccionado: " + msg.ratonGrande)
			//console.log("raton grande: " + msg.ratonGrande)
			//console.log("color: "+msg.color);
			
            //updatePlayerInfo(msg);
            if (id == 0)
    		{
				if(msg.color == 0) raton2 = "raton_gris";
				if(msg.color == 1) raton2 = "raton_blanco";
				if(msg.color == 2) raton2 = "raton_marron";
				RatonGrande2W = msg.ratonGrande;
       			p2Ready = msg.ratonReady;

       		} else if(id == 1){
				   
				if(msg.color == 0) raton1 = "raton_gris";
				if(msg.color == 1) raton1 = "raton_blanco";
				if(msg.color == 2) raton1 = "raton_marron";
				RatonGrande1W = msg.ratonGrande;
       			p1Ready = msg.ratonReady;
			}
        }
        
        this.timedEventUpdateConnection = this.time.addEvent({  	
            delay: 13,
            callback: this.sendCharacterInfo,
            callbackScope: this,
            loop: true
        });

        textoEsperandoMucho = this.add.image(1618, 1002.5, 'TextoEsperandoMucho').setVisible(false);
    }

    update(time, delta)
    {
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);

        if(id == 0)
        {
            BotonP2Listo.disableInteractive();

        } else if(id == 1)
        {
            //desactivar los elementos de selección del player 1:
            BotonP1Listo.disableInteractive();
        }
        
        //MENSAJES DE TURNO POR JUGADOR:
        if(!p1Ready && !p2Ready){
			turno1.setVisible(true);
        	turno2.setVisible(false);
		} else if(p1Ready && !p2Ready){
			turno2.setVisible(true);
        	turno1.setVisible(false);
		} else if(p1Ready && p2Ready){
			turno2.setVisible(false);
            textoEsperandoMucho.setVisible(true);
      		this.time.delayedCall(1000, () => {this.StartPlaying('LevelSelection');}, [], this);
		}
		
		if(RatonGrande2W == 0){
			this.player2SelecGris()
		} else if(RatonGrande2W == 1){
            this.player2SelecBlanco()
		} else if(RatonGrande2W == 2){
			this.player2SelecMarron()
		}
		
		if(RatonGrande1W == 0){
			this.player1SelecGris()
		} else if(RatonGrande1W == 1){
            this.player1SelecBlanco()
		} else if(RatonGrande1W == 2){
			this.player1SelecMarron()
		}
		
		if(p1Ready){ 
			BotonP1Listo = this.add.image(300,870,'Boton1ListoPressed');
			if(RatonGrande1W == 1)this.ratonBElegido = true;
            if(RatonGrande1W == 2)this.ratonMElegido = true;
            if(RatonGrande1W == 0)this.ratonGElegido = true;
        }
        
		if(p2Ready) BotonP2Listo = this.add.image(1630,870,'Boton2ListoPressed');	
		
		if(this.activeUsersNumber == 1) this.userDisconected();
    }
    
    player1SelecBlanco(){
		RatonGrande1 = this.add.image(300,510,'RatonBlancoGrande');
        //raton1Selection.destroy();
        raton1Selection = this.add.image(coorBx,coorBy,'Boton1RatonSeleccionado');
	}
	player2SelecBlanco(){
		//raton2Selection = false;
        //RatonGrande2 = false;
		RatonGrande2 = this.add.image(1625,510,'RatonBlancoGrande');
        //raton2Selection.destroy();
        raton2Selection = this.add.image(coorBx,coorBy,'Boton2RatonSeleccionado');
	}
	
	player1SelecMarron(){
		RatonGrande1 = this.add.image(300,510,'RatonMarronGrande');
        //raton1Selection.destroy();
        raton1Selection = this.add.image(coorMx,coorMy,'Boton1RatonSeleccionado');
	}
	player2SelecMarron(){
		RatonGrande2 = this.add.image(1625,510,'RatonMarronGrande');
        //raton2Selection.destroy();
        raton2Selection = this.add.image(coorMx,coorMy,'Boton2RatonSeleccionado');
	}
	
	player1SelecGris(){
		RatonGrande1 = this.add.image(300,510,'RatonGrisGrande');
        //raton1Selection.destroy();
        raton1Selection = this.add.image(coorGx,coorGy,'Boton1RatonSeleccionado');
	}
	player2SelecGris(){
		RatonGrande2 = this.add.image(1625,510,'RatonGrisGrande');
        //raton2Selection.destroy();
        raton2Selection = this.add.image(coorGx,coorGy,'Boton2RatonSeleccionado');
	}
	
	player1CleanSelec(){
		raton1Selection.setVisible(false);
        RatonGrande1.setVisible(false);
	}
	
	player2CleanSelec(){
		raton2Selection.setVisible(false);
        RatonGrande2.setVisible(false);
	}

    ReiniciarVariables(){
        p1Ready = false;
        p2Ready = false;
        
        RatonGrande1 = false;
        RatonGrande2 = false;
        raton1Selection = null;
        raton2Selection = null;
		
        this.boton1Pulsado = false;
        this.boton2Pulsado = false;
        this.ratonGElegido = false;
        this.ratonBElegido = false;
        this.ratonMElegido = false;
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

    sendCharacterInfo()
    {
        let message;

        if(id == 0)
        {
            message = {
                id: id,
                ratonReady: p1Ready,
                ratonGrande: RatonGrande1W,
                color: raton1,
            }
        }
        else if (id == 1)
        {
            message = {
                id: id,
                ratonReady: p2Ready,
                ratonGrande: RatonGrande2W,
                color: raton2,
            }
        }
        if(isSocketOpen && this.activeUsersNumber >= 2)
        {
            connection.send(JSON.stringify(message))
        }
    }
    
    StartPlaying(escena){
		p1Ready = false;
		p2Ready = false;

		if(id == 0){
			if(raton1 == 0) raton1 = "raton_gris";
			if(raton1 == 1) raton1 = "raton_blanco";
			if(raton1 == 2) raton1 = "raton_marron";
		} else if(id == 1){
			if(raton2 == 0) raton2 = "raton_gris";
			if(raton2 == 1) raton2 = "raton_blanco";
			if(raton2 == 2) raton2 = "raton_marron";
		}
		
		console.log("color raton 1: "+ raton1);
		console.log("color raton 2: "+ raton2);
        this.scene.start(escena, {colorRaton1: raton1, colorRaton2: raton2, user : this.user, id: id, connection: connection});
    }
    
    userDisconected(){
        console.log("usuario desconectado...");
        this.add.image(0,0, 'Fondo_Desconexion').setOrigin(0,0);
        id = null;
        p1Ready = false;
        p2Ready = false;
        raton2 = false;
        raton1 = false;
        playerDisconected = false;
        rivalDisconected = false;
        this.time.delayedCall(2000, () => {this.StartPlaying('Menu');}, [], this);
        
    }
}
var id;
var scene;
var characters1;
var characters2;
var connection;
var isSocketOpen = false;
var bothReady = false;
var player1Type;
var player2Type;
var turno1;
var turno2;
var pj1;
var pj2;
var Boton1RatonSelected;
var Boton2RatonSelected;
var p1Ready;
var p2Ready;

class PlayerSelectionScene extends Phaser.Scene {
    constructor(numRaton) {
        super("PlayerSelection");
    }
    preload() {}

    RatonGrande1;
    RatonGrande2;
    boton1Pulsado;
    boton2Pulsado;
    ratonGElegido;
    ratonBElegido;
    ratonMElegido;
    raton1;
	raton2;

	init(data){

		this.dataObj = data;
	}
	
    create(){
        this.user = this.dataObj.user;
        this.activePrevUsersNumber = 0;
        id = this.dataObj.id;
        connection = this.dataObj.connection;

        //Se reinician las variables para que si se vuelve a entrar después de una partida los valores estén correctos
        this.ReiniciarVariables();

        //FONDO
        this.add.image(0,0,'FondoCustom').setOrigin(0, 0);

        //BOTONES
        let BotonP1Listo = this.add.image(300,870,'BotonP1Listo');
        BotonP1Listo.setInteractive({ cursor: 'pointer' });

        let BotonP2Listo = this.add.image(1630,870,'BotonP2Listo');
        BotonP2Listo.setInteractive({ cursor: 'pointer' });

        let BotonVolver = this.add.image(150,100,'Flecha');
        BotonVolver.setInteractive({ cursor: 'pointer' });

        let BotonRatonGris = this.add.image(866,265,'BotonRatonGris');
        BotonRatonGris.setInteractive({ cursor: 'pointer' });
        let BotonRatonBlanco = this.add.image(1200,530,'BotonRatonBlanco');
        BotonRatonBlanco.setInteractive({ cursor: 'pointer' });
        let BotonRatonMarron = this.add.image(866,800,'BotonRatonMarron');
        BotonRatonMarron.setInteractive({ cursor: 'pointer' });

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('Menu');
        });

        BotonP1Listo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.raton1 !== undefined && this.boton1Pulsado){
                this.BotonP1Listo = this.add.image(300,870,'Boton1ListoPressed');
                p1Ready = true;
            }
        });

        BotonP2Listo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.raton2 !== undefined && this.boton2Pulsado){
                this.BotonP2Listo = this.add.image(1630,870,'Boton2ListoPressed');
                p2Ready = true;
                this.scene.start('LevelSelection', {colorRaton1: this.raton1, colorRaton2:this.raton2, user: this.user});
            }
        });
        
        BotonRatonBlanco.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.boton1Pulsado && !p1Ready){
                Boton1RatonSelected.destroy();
                this.RatonGrande1.destroy();
                this.boton1Pulsado = false;
                this.ratonBElegido = false;
                this.ratonMElegido = false;
                this.ratonGElegido = false;
                return;
            }
            if(this.boton2Pulsado && !p2Ready){
                Boton2RatonSelected.destroy();
                this.RatonGrande2.destroy();
                this.boton2Pulsado = false;
                return;
            }

            if(!p1Ready && !this.boton1Pulsado){
                this.raton1 = "raton_blanco";
                this.RatonGrande1 = this.add.image(300,510,'RatonBlancoGrande');
                Boton1RatonSelected = this.add.image(1200,530,'Boton1RatonSeleccionado');
                this.boton1Pulsado = true;
                this.ratonBElegido = true;
            }
            if(p1Ready && !p2Ready && !this.ratonBElegido){
                this.raton2 = "raton_blanco"
                this.RatonGrande2 = this.add.image(1625,510,'RatonBlancoGrande');
                Boton2RatonSelected = this.add.image(1200,530,'Boton2RatonSeleccionado');
                this.boton2Pulsado = true;
            }
        });

        BotonRatonMarron.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.boton1Pulsado && !p1Ready){
                Boton1RatonSelected.destroy();
                this.RatonGrande1.destroy();
                this.boton1Pulsado = false;
                this.ratonBElegido = false;
                this.ratonMElegido = false;
                this.ratonGElegido = false;
                return;
            }
            if(this.boton2Pulsado && !p2Ready){
                Boton2RatonSelected.destroy();
                this.RatonGrande2.destroy();
                this.boton2Pulsado = false;
                return;
            }

            if(!p1Ready){
                this.raton1 = "raton_marron";
                this.RatonGrande1 = this.add.image(300,510,'RatonMarronGrande');
                Boton1RatonSelected = this.add.image(866,800,'Boton1RatonSeleccionado');
                this.boton1Pulsado = true;
                this.ratonMElegido = true;
            }
            if(p1Ready && !p2Ready && !this.ratonMElegido){
                this.raton2 = "raton_marron";
                this.RatonGrande2 = this.add.image(1625,510,'RatonMarronGrande');
                Boton2RatonSelected = this.add.image(866,800,'Boton2RatonSeleccionado');
                this.boton2Pulsado = true;
            }
        });

        BotonRatonGris.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.boton1Pulsado && !p1Ready){
                Boton1RatonSelected.destroy();
                this.RatonGrande1.destroy();
                this.boton1Pulsado = false;
                this.ratonBElegido = false;
                this.ratonMElegido = false;
                this.ratonGElegido = false;
                return;
            }
            if(this.boton2Pulsado && !p2Ready){
                Boton2RatonSelected.destroy();
                this.RatonGrande2.destroy();
                this.boton2Pulsado = false;
                return;
            }

            if(!p1Ready){
                this.raton1 = "raton_gris";
                this.RatonGrande1 = this.add.image(300,510,'RatonGrisGrande');
                Boton1RatonSelected = this.add.image(866,265,'Boton1RatonSeleccionado');
                this.boton1Pulsado = true;
                this.ratonGElegido = true;
            }
            if(p1Ready && !p2Ready && !this.ratonGElegido){
                this.raton2 = "raton_gris"
                this.RatonGrande2 = this.add.image(1625,510,'RatonGrisGrande');
                Boton2RatonSelected = this.add.image(866,265,'Boton2RatonSeleccionado');
                this.boton2Pulsado = true;
            }
        });
        
        //TURNO JUGADORES
        turno1 = this.add.image(296.5,175.5,'Turno1');
        turno1.setVisible(false);
        turno2 = this.add.image(1628,175.5,'Turno1');
        turno2.setVisible(false);

        window.addEventListener('beforeunload', () =>
        {
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
        connection.onopen = function (){
            console.log("Socket abierto")
            isSocketOpen = true;
        }

        connection.onclose = function (){
			//this.deleteActiveUser(this.user);
            console.log("Socket cerrado")
            isSocketOpen = false;
        }

        connection.onmessage = function (message){
            let msg = JSON.parse(message.data);
            updatePlayerInfo(msg);
        }
        this.timedEventUpdateConnection = this.time.addEvent({
            delay: 13,
            callback: this.sendCharacterInfo,
            callbackScope: this,
            loop: true });
    }

    update(time, delta)
    {
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);

        if(id == 0)
        {
            player1Type = this.raton1;
        } else if(id == 1)
        {
            player2Type = this.raton2;
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
		}
    }

    ReiniciarVariables(){
        p1Ready = false;
        p2Ready = false;
        Boton1RatonSelected = false;
        Boton2RatonSelected = false;
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
                ratonSeleccionado: Boton1RatonSelected,
                type: player1Type,
                	//visibleCharacter: runes[0].currentCharacter.visible,
                //skin: this.raton1,       ------------------> LO MISMO QUE EL TIPO
                	//text: runes[0].currentText.frame.name,
                	//ready: p2Ready,
            }
        }
        else if (id == 1)
        {
            //runes[0].currentCharacter = characters2;
            message = {
                id: id,
                ratonReady: p2Ready,
                ratonSeleccionado: Boton2RatonSelected,
                type: player2Type,
                	//visibleCharacter: runes[0].currentCharacter.visible,
                //skin: this.raton2,       ------------------> LO MISMO QUE EL TIPO
                	//text: runes[0].currentText.frame.name,
                	//ready: p2Ready,
            }
        }
        if(isSocketOpen)
        {
            connection.send(JSON.stringify(message))
        }
    }
}

function updatePlayerInfo(data)
{
    if (id == 0)
    {
        //characters2.setFrame(data.frameCharacter);
        //characters2.setVisible(data.visibleCharacter);
        
		Boton2RatonSelected = data.ratonSeleccionado
        player2Type = data.type;
        p2Ready = data.ready;
    } else if (id == 1)
    {
        //characters1.setFrame(data.frameCharacter);
        //characters1.setVisible(data.visibleCharacter);
        
        Boton1RatonSelected = data.ratonSeleccionado
        player1Type = data.type;
        p1Ready = data.ready;
    }
}




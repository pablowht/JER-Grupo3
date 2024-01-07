var isSocketOpen;
var rivalReady;
var playerReady;
var id;
var connection;
var esperandoRespuesta;

class Lobby extends Phaser.Scene {

    constructor() {
        super('Lobby');
    }

    init(data)
    {
        this.dataObj = data;
    }

    TextoBuscando;
    TextoEncontrado;
    TextoRaton1;
    TextoRaton2;
    BotonJugar;
    JugarPresionado;
    
    create(){
        //DATA
        this.activePrevUsersNumber = 0;
        this.maxUsersReady = 2;
        this.url= window.location.href;
        this.user = this.dataObj.user;
		rivalReady = false;
		playerReady = false;
		id = null;

        //VISUALES
        this.add.image(0,0,'Fondo_Lobby').setOrigin(0, 0);

        this.TextoRaton1 = this.add.image(960.5,390,'Raton1Ingame').setVisible(false);
        this.TextoRaton2 = this.add.image(960.5,390,'Raton2Ingame').setVisible(false);

        this.TextoBuscando = this.add.image(960.5,875,'Texto_Buscando').setVisible(false);
        this.tweens.add({
            targets: this.TextoBuscando,
            alpha: 0.2,
            duration: 1400,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });
        
        esperandoRespuesta = this.add.image(960.5,875, 'Texto_EsperandoRespuesta').setVisible(false);
        this.tweens.add({
            targets: esperandoRespuesta,
            alpha: 0.2,
            duration: 1400,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });

        this.TextoEncontrado = this.add.image(960,822,'Texto_Encontrado').setVisible(false);

        //BOTONES
        let BotonVolver = this.add.image(150,150,'Flecha');
        BotonVolver.setInteractive({ cursor: 'pointer' });

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('Menu');
            playerReady = false;
            rivalReady = false;
            id = null;
            
            //this.userDisconected();
        });

        this.BotonJugar = this.add.image(960.5,940.5,'BOTON_JUGAR').setVisible(false);
        this.BotonJugar.setInteractive({ cursor: 'pointer' });

        this.JugarPresionado = this.add.image(960.5,940.5, 'Jugar_Presionado').setVisible(false);

        this.BotonJugar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            playerReady = true;
            this.BotonJugar.setVisible(false);
            this.JugarPresionado.setVisible(true);
            this.BotonJugar.disableInteractive(true);
        });

        //CHAT para evitar errores
        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);

        //ActiveUsers
        this.add.image(289, 960, 'Recuadro_UsuariosActivos');
        this.textActiveUsers = this.add.text(117, 935, 'Usuarios activos: ' + this.activeUsersNumber , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });

        window.addEventListener('beforeunload', () =>
        {
            this.deleteActiveUser(this.user);
            //this.userDisconected();
        });

        // ------------WEBSOCKETS--------------
        // console.log(this.url);
        this.wsURL = this.url.replace("http://", "");

        if(connection == null || connection == undefined)
        {
            console.log("estableciendo conexión con WS...");
            connection = new WebSocket("ws://"+ this.wsURL + "echo");
        }
        // console.log("Ws URL: \n" + this.wsURL + "echo");

        //Atributos de la conexión
        connection.onopen = function (){
            isSocketOpen = true;
            console.log("Socket abierto");
        }
        connection.onclose = function(){
            //this.deleteActiveUser(this.user);
            isSocketOpen = false;
            console.log("Closing socket.");
            
            //this.userDisconected();
        }

        connection.onmessage = function (message){
            //console.log("mensaje recibido");
            let msg = JSON.parse(message.data);
            rivalReady = msg.ratonReady;

            //updatePlayerInfo(msg.ratonReady);
        }

        this.timedEventUpdateConnection = this.time.addEvent({
            delay: 13,
            callback: this.sendCharacterInfo,
            callbackScope: this,
            loop: true });
    }

    update()
    {
		//console.log("abierto???"+isSocketOpen)
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);

        //NUMERO RATON
        if(this.activeUsersNumber == 1)
        {
            id = 0;
            this.TextoRaton2.setVisible(false);
            this.TextoRaton1.setVisible(true);

        } else if (this.activeUsersNumber == 2 && id == null)
        {
            id = 1;
            this.TextoRaton1.setVisible(false);
            this.TextoRaton2.setVisible(true);
        }

        if (this.activeUsersNumber < 2)
        {
            this.TextoBuscando.setVisible(true);
            this.TextoEncontrado.setVisible(false);
            this.BotonJugar.setVisible(false);
            this.JugarPresionado.setVisible(false);
        }
        if(this.activeUsersNumber == 2 && !playerReady){
            this.TextoBuscando.setVisible(false);
            this.TextoEncontrado.setVisible(true);
            this.BotonJugar.setVisible(true);
        }

        if(this.activeUsersNumber == this.maxUsersReady)
        {
            if(playerReady && rivalReady)
            {
                this.TextoEncontrado.setVisible(false);
                this.TextoBuscando.setVisible(false);
				esperandoRespuesta.setVisible(true);
                this.countdownFunction();
            }
        }
        
        if(playerReady || rivalReady) 
        {
			this.TextoEncontrado.setVisible(false);
			this.TextoBuscando.setVisible(false);
			esperandoRespuesta.setVisible(true);
		}
    }

    sendCharacterInfo() {
        let message;
        message = {
            ratonReady: playerReady
        }
        // console.log(message);
        if (isSocketOpen && this.activeUsersNumber == 2) {
            connection.send(JSON.stringify(message))
        }
    }

    updateActiveUsers()
    {
        if(this.activePrevUsersNumber !== this.activeUsersNumber)
        {
            if(this.activePrevUsersNumber < this.activeUsersNumber){
                console.log("Se ha conectado alguien. El número actual de usuarios es: " + this.activeUsersNumber);
            }else if(this.activePrevUsersNumber > this.activeUsersNumber){
                rivalReady = false;
                console.log("Alguien se ha desconectado. El número actual de usuarios es: " + this.activeUsersNumber);
            }
            this.activePrevUsersNumber = this.activeUsersNumber;
        }
    }

    countdownFunction()
    {
		playerReady = false;
		rivalReady = false;
		this.time.delayedCall(3000, () => {this.StartPlaying('PlayerSelection');}, [], this);
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

    userDisconected(){
        this.add.image(0,0, 'Fondo_Desconexion').setOrigin(0,0);
        id = null;
        playerReady = false;
        //rivalReady = false;
        this.time.delayedCall(3000, () => {this.StartPlaying('Menu');}, [], this);
    }

    StartPlaying(escena){
        this.scene.start(escena, {colorRaton1: this.raton1, colorRaton2:this.raton2, user : this.user, id: id, connection: connection});
    }
}


/*function updatePlayerInfo(data)
{
	console.log("holaaaaaaa????????????????????")
    console.log("Rival listo actualizar data: " + data);
    rivalReady = data;
}*/
    
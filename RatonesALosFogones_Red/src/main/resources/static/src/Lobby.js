var  isSocketOpen;

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


    create(){
        //DATA
        this.activePrevUsersNumber = 0;
        this.maxUsersReady = 2;
        this.url= window.location.href;
        this.user = this.dataObj.user;
        this.playerReady = false;
        this.rivalReady = false;
        this.countdown = 5;
        this.rivalOut = false;

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

        this.TextoEncontrado = this.add.image(960,822,'Texto_Encontrado').setVisible(false);

        //BOTONES
        let BotonVolver = this.add.image(150,150,'Flecha');
        BotonVolver.setInteractive({ cursor: 'pointer' });

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('Menu');
            this.rivalReady = false;
            this.id = null;
            // this.rivalDisconnect(this.user);
        });

        this.BotonJugar = this.add.image(960.5,936.5,'BOTON_JUGAR').setVisible(false);
        this.BotonJugar.setInteractive({ cursor: 'pointer' });

        this.BotonJugar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.playerReady = true;
            this.BotonJugar.setVisible(false);

            // if(this.playerReady && this.rivalReady)
            // {
            //     console.log("pasando a la siguiente pantalla");
            //     // this.scene.start('PlayerSelection', {user: this.user, activeUsers: this.activeUsersNumber, activePrevUsers: this.activePrevUsersNumber});
            // }
            if(this.countdown <=0){
                console.log("pulsando al boton");
                this.scene.start('PlayerSelection', {user: this.user, activeUsers: this.activeUsersNumber, activePrevUsers: this.activePrevUsersNumber});
            }
            this.sendCharacterInfo();
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
            // this.deleteActiveUser(this.user);
            this.rivalDisconnect(this.user);
        });

        // ------------WEBSOCKETS--------------
        // console.log(this.url);
        this.wsURL = this.url.replace("http://", "");

        if(this.connection == null || this.connection == undefined)
        {
            console.log("estableciendo conexión con WS...");
            this.connection = new WebSocket("ws://"+ this.wsURL + "echo");
            this.dataObj.connection = this.connection;
        }
        // console.log("Ws URL: \n" + this.wsURL + "echo");

        //Atributos de la conexión
        this.connection.onopen = function (){
            isSocketOpen = true;
            console.log("Socket abierto");
        }
        this.connection.onclose = function(){
            this.deleteActiveUser(this.user);
            isSocketOpen = false;
            console.log("Closing socket.");
        }

        this.connection.onmessage = function (message){
            console.log("mensaje recibido");
            let msg = JSON.parse(message.data);
            this.updatePlayerInfo(msg);
        }

        this.timedEventUpdateConnection = this.time.addEvent({
            delay: 13,
            callback: this.sendCharacterInfo,
            callbackScope: this,
            loop: true });

        this.countDownText = this.add.text(900, 250, 'Ambos readys!', {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });
        this.countDownText.setVisible(false);
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
            this.id = 0;
            this.TextoRaton1.setVisible(true);

        } else if (this.activeUsersNumber == 2 && this.id == null)
        {
            this.id = 1;
            this.TextoRaton2.setVisible(true);
        }

        if (this.activeUsersNumber < 2)
        {
            this.TextoBuscando.setVisible(true);
            this.TextoEncontrado.setVisible(false);
            this.BotonJugar.setVisible(false);
        }
        if(this.activeUsersNumber == 2){
            this.TextoBuscando.setVisible(false);
            this.TextoEncontrado.setVisible(true);
            this.BotonJugar.setVisible(true);
        }

        if(this.activeUsersNumber == this.maxUsersReady)
        {
            //console.log("player ready: "+this.playerReady)
            //console.log("rival ready: "+this.rivalReady)
            if(this.playerReady && this.rivalReady)
            {
                console.log("ambos jugadores están listos\nComienza la cuenta atrás");
                this.countdownFunction();
            }
        }
    }

    sendCharacterInfo()
    {
        let message;
        message = {
            ratonReady: this.playerReady,
        }
        // console.log(message);
        if(isSocketOpen && (this.activeUsersNumber == 2))
        {
            console.log("sending message");
            this.connection.send(JSON.stringify(message))
        }
    }

    rivalDisconnect()
    {
            this.deleteActiveUser(this.user);
            //alert.setVisible(true); -> PONER ALERTA CORRECTA DE USUARIO DESCONECTADO
            //FALTA TEMPORIZADOR PARA QUE TE LLEVE A LA PANTALLA DE INICIO/LOBBY
    }

    updatePlayerInfo(data)
    {
        // console.log("Rival listo: " + data.ratonReady);
        this.rivalReady = data.ratonReady;
    }

    updateActiveUsers()
    {
        if(this.activePrevUsersNumber !== this.activeUsersNumber)
        {
            if(this.activePrevUsersNumber < this.activeUsersNumber){
                console.log("Se ha conectado alguien. El número actual de usuarios es: " + this.activeUsersNumber);
            }else if(this.activePrevUsersNumber > this.activeUsersNumber){
                // this.rivalOut = true;
                this.rivalReady = false;//??

                console.log("Alguien se ha desconectado. El número actual de usuarios es: " + this.activeUsersNumber);
            }
            this.activePrevUsersNumber = this.activeUsersNumber;
        }
    }

    countdownFunction()
    {
        console.log(this.playerReady);
        console.log(this.rivalReady);
        while(this.countdown >= 0) {
            console.log("countdown: "+this.countdown);
            this.countDownText.setVisible(true);
            this.countdown--;
            this.countDownText.add.text(this.countdown.toString());
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
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
        this.usersReady = 0;
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
        });

        this.BotonJugar = this.add.image(960.5,936.5,'BOTON_JUGAR').setVisible(false);
        this.BotonJugar.setInteractive({ cursor: 'pointer' });

        this.BotonJugar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.playerReady = true;
            // if(this.playerReady && this.rivalReady)
            // {
            //     console.log("pasando a la siguiente pantalla");
            //     this.scene.start('PlayerSelection', {user: this.user, activeUsers: this.activeUsersNumber, activePrevUsers: this.activePrevUsersNumber});
            // }
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
            this.deleteActiveUser(user);
        });

        // ------------WEBSOCKETS--------------
        // console.log(this.url);
        this.wsURL = this.url.replace("http://", "");

        if(this.connection == null || this.connection == undefined)
        {
            this.connection = new WebSocket("ws://"+ wsURL + "echo");
            this.dataObj.connection = this.connection;
        }
        // console.log("Ws URL: \n" + wsURL + "echo");

        //Atributos de la conexión

        this.connection.onopen = function (){
            this.isSocketOpen = true;
            console.log("Socket abierto");
        }
        this.connection.onclose = function(){
            this.deleteActiveUser(this.user);
            this.isSocketOpen = false;
            console.log("Closing socket.");
        }

        this.connection.onmessage = function (message){
            let msg = JSON.parse(message.data);
            //updatePlayerInfo(msg);
        }

        // timedEventUpdateConnection = this.time.addEvent({
        //     delay: 13,
        //     callback: this.sendCharacterInfo,
        //     callbackScope: this,
        //     loop: true });
        //
        // this.outEvent = this.time.addEvent({delay: 1000, callback: rivalDisconnect, callbackScope: this, loop: true});
        // alert = this.add.image(0, 0, 'outWindow').setOrigin(0, 0);
        // alert.setVisible(false);
    }

    update()
    {
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);

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

        // if(this.activeUsersNumber == this.maxUsersReady)
        // {
        //     this.usersReady++;
        //     if(this.playerReady && this.rivalReady)
        //     {
        //         stateText.setPosition(357, 889);
        //         stateText.setFrame(2);
        //     }
        // }

        // if(this.usersReady === 1)
        // {
        //     confirm_button.setVisible(true);
        //     stateText.setPosition(357, 804);
        //     stateText.setFrame(1);
        // }

        // if (countdown <= 0)
        // {
        //     this.dataObj.playerId = id;
        //     console.log("ID: " + id);
        //     this.scene.start("onlineCharacterSelector", this.dataObj);
        // }
        //
        // if(outCount <= 0)
        // {
        //     this.scene.start('mainMenu');
        // }
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
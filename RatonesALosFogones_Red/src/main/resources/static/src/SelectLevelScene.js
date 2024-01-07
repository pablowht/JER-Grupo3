var id;
var connection;
var BotonNivel1;
var BotonNivel2;
var levelSelect;
var esperandoRespuesta;
var tutorial;

class SelectLevelScene extends Phaser.Scene {
    constructor() {
        super('LevelSelection');
    }

	init(data){
		this.dataObj = data;
    }

    //time;

    create(){
        this.raton1 = this.dataObj.colorRaton1;
        this.raton2 = this.dataObj.colorRaton2;
        this.user = this.dataObj.user;
        this.url= window.location.href;
        this.activePrevUsersNumber = 0;
        id = this.dataObj.id;
        connection = this.dataObj.connection;
        levelSelect = -1;

        this.add.image(0,0,'FondoSeleccionNiveles').setOrigin(0, 0);

        let Meme1Boton = this.add.image(1470,795,'BotonCubiertos').setInteractive();
        let Meme2Boton = this.add.image(452,530,'BotonCubiertos').setInteractive();
        let Meme1 = this.add.image(1470,795,'MemeN1').setVisible(false);
        let Meme2 = this.add.image(452,530,'MemeN2').setVisible(false);

        //let BotonVolver = this.add.image(150,150,'Flecha');
        //BotonVolver.setInteractive({ cursor: 'pointer' });

        //BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
        //    this.sound.play('InteractSound');
        //    this.scene.start('Menu');
        //});

        BotonNivel1 = this.add.image(960.5,529.5,'BotonN1');
        BotonNivel1.setInteractive({ cursor: 'pointer' });

        BotonNivel2 = this.add.image(960.5,795.5,'BotonN2');
        BotonNivel2.setInteractive({ cursor: 'pointer' });

        BotonNivel1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            //this.add.image(0,0, 'PlayersReady').setOrigin(0,0);
            levelSelect = 1;
            
            
            let message;
       		message = {
            	nivelSelec: levelSelect
        	}
        	if (isSocketOpen && this.activeUsersNumber >= 2) {
            	connection.send(JSON.stringify(message))
       		}


            //this.time.delayedCall(7000, this.StartPlaying('LevelOne'), [], this);
            
            
            //this.time.delayedCall(3000, () => {this.StartPlaying('LevelOne');}, [], this);
            
            
            //Usamos (() => {}) Para asegurarnos de que cumple el this
            

        });

        //this.add.image(0,0, 'PlayersReady').setOrigin(0,0);
        //this.time.delayedCall(2000, this.StartPlaying, [], this);


        BotonNivel2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            //this.add.image(0,0, 'PlayersReady').setOrigin(0,0);
            //this.time.delayedCall(7000, this.StartPlaying('LevelTwo'), [], this);
            levelSelect = 2;
            let message;
       		message = {
            	nivelSelec: levelSelect
        	}
        	if (isSocketOpen && this.activeUsersNumber >= 2) {
            	connection.send(JSON.stringify(message))
       		}

            //this.time.delayedCall(3000, () => {this.StartPlaying('LevelTwo');}, [], this);
        });


        Meme1Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            //this.sound.play('InteractSound');
            Meme1.setVisible(true);
        });

        Meme1Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            //this.sound.play('InteractSound');
            Meme1.setVisible(false);
        });

        Meme2Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            //this.sound.play('InteractSound');
            Meme2.setVisible(true);
        });

        Meme2Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            //this.sound.play('InteractSound');
            Meme2.setVisible(false);
        });

        var alaboActivo = false;
        var imagenProfe = this.add.image(360.5,930,'AlaboProfes').setVisible(false);

        Meme2Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(!alaboActivo){
                imagenProfe.setVisible(true);
                alaboActivo = !alaboActivo;
            } else{
                imagenProfe.setVisible(false);
                alaboActivo = !alaboActivo;
            }

        });

        Meme1Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(!alaboActivo){
                imagenProfe.setVisible(true);
                alaboActivo = !alaboActivo;
            } else{
                imagenProfe.setVisible(false);
                alaboActivo = !alaboActivo;
            }
        });

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

        this.add.image(960.5, 379.5, 'TextoRaton1Elige');


        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);
        
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
            isSocketOpen = false;
            console.log("Closing socket."); 
        }

        connection.onmessage = function (message){
            //console.log("mensaje recibido");
            let msg = JSON.parse(message.data);
            if(id == 1) levelSelect = msg.nivelSelec;
            //console.log("nivel seleccionado: "+msg.nivelSelec);
        }

        tutorial = this.add.image(0,0, 'PlayersReady').setOrigin(0,0).setVisible(false);
        esperandoRespuesta = this.add.image(960,977, 'Texto_EsperandoRespuesta').setVisible(false);
        this.tweens.add({
            targets: esperandoRespuesta,
            alpha: 0.2,
            duration: 1400,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });
    }
    
    StartPlaying(escena){
        this.scene.start(escena, {colorRaton1: this.raton1, colorRaton2:this.raton2, user : this.user, id: id, connection: connection});
    }

    update(){
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);
        
        if(id == 1){
			BotonNivel1.disableInteractive();
			BotonNivel2.disableInteractive();
		}
	
		if(levelSelect > 0){
            tutorial.setVisible(true);
            esperandoRespuesta.setVisible(true);
        }
		if(levelSelect == 1)	this.time.delayedCall(3000, () => {this.StartPlaying('LevelOne');}, [], this);		
		if(levelSelect == 2)	this.time.delayedCall(3000, () => {this.StartPlaying('LevelTwo');}, [], this);

        if(this.activeUsersNumber == 1) this.userDisconected();
			
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
    
    countdownFunction(level)
    {
		if(level == 1){
			//this.time.delayedCall(3000, () => {this.StartPlaying('LevelOne');}, [], this);
			this.StartPlaying('LevelOne');
		} else if(level == 2){
			this.StartPlaying('LevelTwo');
		}
		levelSelect = -1;
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
        console.log("usuario desconectado...");
        this.add.image(0,0, 'Fondo_Desconexion').setOrigin(0,0);
        id = null;
        p1Ready = false;
        p2Ready = false;
        raton2 = false;
        raton1 = false;
        this.time.delayedCall(2000, () => {this.StartPlaying('Menu');}, [], this);
    }
}
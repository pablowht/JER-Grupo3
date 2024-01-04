$(document).ready(function(){
    console.log('DOM cargado (CHAT)')
});

var user;

class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    colorRaton1;
    colorRaton2;
    ganador1;
    ganador2;
    gameOverOn;

    init(data){
        this.dataObj = data;
    }
    preload() { }

    create(){

        this.input.keyboard.disableGlobalCapture();
        this.activePrevUsersNumber = 0;

        user = this.dataObj.user;
        this.colorRaton1 = this.dataObj.raton1;
        this.colorRaton2 = this.dataObj.raton2;
        this.ganador1 = this.dataObj.ganador1;
        this.ganador2 = this.dataObj.ganador2;
        this.activePrevUsersNumber = 0;

        this.sound.stopAll();
        this.sound.play('GameEndSound');

        this.gameOverOn = true;


        this.add.image(0,0,'FondoGameOver').setOrigin(0, 0);
        this.add.image(1315,180,'RecuadroTextos')
        if(this.ganador1){ //En caso de que gane el jugador 1
            //GANADOR
            if(this.colorRaton1 === 'raton_blanco'){
                this.add.image(470,560,'RatónGanadorB');
            }
            else if(this.colorRaton1 === 'raton_marron'){
                this.add.image(470,560,'RatónGanadorM');
            }
            else if(this.colorRaton1 === 'raton_gris'){
                this.add.image(470,560,'RatónGanadorG');
            }
            this.add.image(1315,110,'TextoGana1');
            //PERDEDOR
            if(this.colorRaton2 === 'raton_blanco'){
                this.add.image(1050,760,'RatónPerdedorB');
            }
            else if(this.colorRaton2 === 'raton_marron'){
                this.add.image(1050,760,'RatónPerdedorM');
            }
            else if (this.colorRaton2 === 'raton_gris'){
                this.add.image(1050,760,'RatónPerdedorG');
            }
            this.add.image(1315,210,'TextoPierde2');
        }
        else{   //En caso de que gane el jugador 2
            //GANADOR
            if(this.colorRaton2 === 'raton_blanco'){
                this.add.image(470,560,'RatónGanadorB');
            }
            else if(this.colorRaton2 === 'raton_marron'){
                this.add.image(470,560,'RatónGanadorM');
            }
            else if(this.colorRaton2 === 'raton_gris'){
                this.add.image(470,560,'RatónGanadorG');
            }
            this.add.image(1315,110,'TextoGana2');
            //PERDEDOR
            if(this.colorRaton1 === 'raton_blanco'){
                this.add.image(1050,760,'RatónPerdedorB');
            }
            else if(this.colorRaton1 === 'raton_marron'){
                this.add.image(1050,760,'RatónPerdedorM');
            }
            else if(this.colorRaton1 === 'raton_gris'){
                this.add.image(1050,760,'RatónPerdedorG');
            }
            this.add.image(1315,210,'TextoPierde1');
        }

        let BotonMenu = this.add.image(991.5,400,'Boton_Menu');
        BotonMenu.setInteractive({ cursor: 'pointer' });

        BotonMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.gameOverOn = false;
            this.scene.sleep('GameOver');
            this.scene.start('Menu');
        });

        //let BotonNiveles = this.add.image(1346.5,400,'Boton_Niveles');
        //BotonNiveles.setInteractive({ cursor: 'pointer' });

        //BotonNiveles.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
        //    this.sound.play('InteractSound');
        //    this.gameOverOn = false;
        //    this.scene.sleep('GameOver');
        //    this.scene.start('LevelSelection');
        //});

        this.sound.play('MenuMusic',{loop:true});
        //Al tocar la meta se pausa el juego durante segundo y medio y luego salta está escena
        //con el nombre de playerx gana y el nombre de playerx pierde
        
        //CHAT
        var chat = this.add.dom(1420, 820).createFromCache('chat_html');

        this.add.image(1580, 750, 'Cuadro_Chat');

        var botonEnviar = chat.getChildByName('botonEnviarMsj');
        var recuadroEscribir = chat.getChildByName('cuadro-escribir');

        chat.addListener('click');
        chat.on('click', function(){
            if(event.target.name  === 'botonEnviarMsj')
            {
                if (recuadroEscribir.value !== "") {
                    sendMessage(user, recuadroEscribir.value);
                    recuadroEscribir.value = "";
                }
            }
        });
        window.addEventListener('beforeunload', () =>
        {
            this.deleteActiveUser(user);
        });

        this.textActiveUsers = this.add.text(117, 935, 'Usuarios activos: ' + this.activeUsersNumber , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });

        if(this.gameOverOn){
            setInterval (getMessage, 500);
        }

	}

    update(){
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);

        if(!this.gameOverOn){
            this.gameOverOn = true;
        }
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
		function sendMessage(user, message)
		{
            console.log("estas en la función sendMessage\nel user es: "+user + "\tel mensaje es: "+message)
			$.ajax({
				method: "POST",
				async: false,
				headers: {
					'Accept': 'application/json',
					'Content-type' : 'application/json'	
				},
				url: url + "chat",
				data: JSON.stringify( { user: "&#128001; " + user, message: "" + message } ),
				dataType: "json"
			})
			getMessage();
		}

		function getMessage() {
            for (let i = 0; i < 7; i++) {
                $.ajax({
                    method: "GET",
                    url: url + "chat/" + i.toString()
                })
                    .done((data, textStatus, jqXHR) => {
                        if (data != "") document.getElementById("mensaje" + i.toString()).innerHTML = data;
                    })
                    .fail((data, textStatus, jqXHR) => {
                        console.log("Problem with Chat Message");
                    });
            }
        }

    

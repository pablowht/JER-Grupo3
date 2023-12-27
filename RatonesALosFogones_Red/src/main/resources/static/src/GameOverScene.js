$(document).ready(function(){
    console.log('DOM cargado (CHAT)')
});

class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }
    colorRaton1;
    colorRaton2;
    ganador1;
    ganador2;

    init(data){
        this.colorRaton1 = data.raton1;
        this.colorRaton2 = data.raton2;
        this.ganador1 = data.ganador1;
        this.ganador2 = data.ganador2;
        this.user = data.user;
        this.password = data.password;
    }
    preload() { }

    create(){

        this.sound.stopAll();
        this.sound.play('GameEndSound');


        this.add.image(0,0,'FondoGameOver').setOrigin(0, 0);
        this.add.image(1315,220,'RecuadroTextos')
        if(this.ganador1){ //En caso de que gane el jugador 1
            //GANADOR
            if(this.raton1 === 'raton_blanco'){
                this.add.image(470,600,'RatónGanadorB');
            }
            else if(this.raton1 === 'raton_marron'){
                this.add.image(470,600,'RatónGanadorM');
            }
            else if(this.raton1 === 'raton_gris'){
                this.add.image(470,600,'RatónGanadorG');
            }
            //PERDEDOR
            this.add.image(1315,150,'TextoGana1');
            if(this.raton2 === 'raton_blanco'){
                this.add.image(1050,800,'RatónPerdedorB');
            }
            else if(this.raton2 === 'raton_marron'){
                this.add.image(1050,800,'RatónPerdedorM');
            }
            else if (this.raton2 === 'raton_gris'){
                this.add.image(1050,800,'RatónPerdedorG');
            }
            this.add.image(1315,250,'TextoPierde2');
        }
        else{   //En caso de que gane el jugador 2
            //GANADOR
            if(this.raton2 === 'raton_blanco'){
                this.add.image(470,600,'RatónGanadorB');
            }
            else if(this.raton2 === 'raton_marron'){
                this.add.image(470,600,'RatónGanadorM');
            }
            else if(this.raton2 === 'raton_gris'){
                this.add.image(470,600,'RatónGanadorG');
            }
            this.add.image(1315,150,'TextoGana2');
            //PERDEDOR
            if(this.raton1 === 'raton_blanco'){
                this.add.image(1050,800,'RatónPerdedorB');
            }
            else if(this.raton1 === 'raton_marron'){
                this.add.image(1050,800,'RatónPerdedorM');
            }
            else if(this.raton1 === 'raton_gris'){
                this.add.image(1050,800,'RatónPerdedorG');
            }
            this.add.image(1315,250,'TextoPierde1');
        }
        let BotonMenu = this.add.image(1020,465,'Boton_Menu');
        BotonMenu.setInteractive();

        BotonMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('Menu');
        });

        this.sound.play('MenuMusic',{loop:true});
        //Al tocar la meta se pausa el juego durante segundo y medio y luego salta está escena
        //con el nombre de playerx gana y el nombre de playerx pierde
        
        

        //CHAT
        var chat = this.add.dom(1420, 820).createFromCache('chat_html');

        this.add.image(1580, 750, 'Cuadro_Chat');

        var botonEnviar = chat.getChildByName('botonEnviarMsj');
        var recuadroEscribir = chat.getChildByName('cuadro-escribir');

		 botonEnviar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if (recuadroEscribir.value !== "") {
                console.log("mensaje a enviar: " + recuadroEscribir.value + "\tdel user: "+this.user);
				sendMessage(this.user, recuadroEscribir.value);
                recuadroEscribir.value = "";
			}
		});	
	}
}
		function sendMessage(user, message)
		{
            console.log("estas en la función sendMessage\nel user es: "+user + "\tel mensaje es: "+message)
			$.ajax({
				type: "POST",
				async:false,
				headers: {
					'Accept': 'application/json',
					'Content-type' : 'application/json'	
				},
				url: url + "chat",
				data: JSON.stringify( { user: "- " + user, message: "" + message } ),
				dataType: "json" 
			})
			getMessage();
		}

		function getMessage() {
			for (let i = 0; i < 7; i++) {
				$.ajax({
					method: "GET",
					url: url + "chat/" + i.toString()
				}).done(function(data){
					if(data != "")
						document.getElementById("message"+i.toString()).innerHTML = data;
				})
			}
		}
		

    

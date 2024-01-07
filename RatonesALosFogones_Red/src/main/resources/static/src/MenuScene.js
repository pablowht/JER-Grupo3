$(document).ready(function(){
    console.log('DOM cargado (MENÚ)')
});

var url;
var user;
var password;
var BotonJugar;
var CocinaLena;

class MenuScene extends Phaser.Scene{

    constructor(){
        super("Menu");
    }

    preload(){
        this.backgroundMusic = this.sound.add('MenuMusic', {loop: true});
    }

    init(data)
    {
        this.dataObj = data;
    }

    backgroundMusic;

    create(){
        this.activePrevUsersNumber = 0;

        url= window.location.href;
        this.user = this.dataObj.user;

        //variables y funciones menú
        this.add.image(0,0,'Fondo_Menu').setOrigin(0, 0);
        BotonJugar = this.add.image(990,540,'BOTON_JUGAR');
        BotonJugar.setInteractive({ cursor: 'pointer' });

        let BotonCreditos = this.add.image(990,680,'BOTON_CREDITOS');
        BotonCreditos.setInteractive({ cursor: 'pointer' });

        let BotonAjustes = this.add.image(990,820,'BOTON_AJUSTES');
        BotonAjustes.setInteractive({ cursor: 'pointer' });

        let BotonUsuario = this.add.image(1750,100,'BOTON_USUARIO');
        BotonUsuario.setInteractive({ cursor: 'pointer' });

        //CAMBIO DE ESCENA DEL MENU A LA ESCENA IN-GAME
        BotonJugar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('Lobby', {user: this.user}); //Niveles
           //this.scene.start('PlayerSelection', {user: this.user, activeUsers: this.activeUsersNumber, activePrevUsers: this.activePrevUsersNumber});
            //Cuando este selector de nivel, poner que al jugar vaya antes a "Niveles"
        });

        //CAMBIO DE ESCENA DEL MENU A CREDITOS
        BotonCreditos.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("Creditos")
        });

        //CAMBIO DE ESCENA DEL MENU A AJUSTES
        BotonAjustes.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("Pause", {isPaused:false});
        });

        //CAMBIO DE ESCENA DEL MENU A USUARIO
        BotonUsuario.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("UserScene", {user: this.user});
        });

        this.textActiveUsers = this.add.text(117, 935, 'Usuarios activos: ' + this.activeUsersNumber , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });

        window.addEventListener('beforeunload', () =>
        {
            this.deleteActiveUser(user);
        });

        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);
        
        this.JugarPresionado = this.add.image(990,540, 'Jugar_Presionado').setVisible(false);
        this.CocinaLlena = this.add.image(0,0, 'CocinaLlena').setOrigin(0,0).setVisible(false);

    }

    update()
    {
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);
        
        if(this.activeUsersNumber > 2){ //el juego se centra en 2 jugadores
            BotonJugar.setVisible(false);
            this.JugarPresionado.setVisible(true);
            this.CocinaLlena.setVisible(true);
            BotonJugar.disableInteractive(true);
            this.time.delayedCall(3000, () => {this.hideCocina();}, [], this);
		}
		else if(this.activeUsersNumber <= 2){
            this.JugarPresionado.setVisible(false);
			BotonJugar.setVisible(true);
	        BotonJugar.setInteractive({ cursor: 'pointer' });
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

    hideCocina(){
        this.CocinaLlena.setVisible(false);
    }
}



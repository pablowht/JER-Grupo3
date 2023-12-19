$(document).ready(function(){
    console.log('DOM cargado (MENÚ)')
});

var url;
let activeUsersNumber;
let activePrevUsersNumber;
let textActiveUsers;

var user;
var password;

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
        //variables usuarios activos:
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
        url= window.location.href;
		user = this.dataObj.user;
		password = this.dataObj.password;
		console.log("estas en la clase menu: user: "+user + "\tpassword:" + password)
        //variables y funciones menú
        this.add.image(0,0,'Fondo_Menu').setOrigin(0, 0);
        let BotonJugar = this.add.image(990,540,'BOTON_JUGAR');
        BotonJugar.setInteractive();

        let BotonCreditos = this.add.image(990,680,'BOTON_CREDITOS');
        BotonCreditos.setInteractive();

        let BotonAjustes = this.add.image(990,820,'BOTON_AJUSTES');
        BotonAjustes.setInteractive();

        let BotonUsuario = this.add.image(1750,100,'BOTON_USUARIO');
        BotonUsuario.setInteractive();

        //CAMBIO DE ESCENA DEL MENU A LA ESCENA IN-GAME
        BotonJugar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('PlayerSelection'); //Niveles
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
            this.scene.start("UserScene", {user: user, password: password});
        });

        textActiveUsers = this.add.text(117, 920, 'Usuarios activos login: ' + activeUsersNumber , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });

        //COMPLETARLO
        window.addEventListener('beforeunload', () => 
        {
			console.log("se cerró la ventana")
            deleteActiveUser(user);
        });

    }

    musicControl(){
        //La siguiente condicional no funciona correctamente porque isPlaying lo toma como
        //parámetro de anims aunque en la documentación ponga que sirve también para music
        if(!this.backgroundMusic.isPlaying){
            this.sound.stopAll();
            this.backgroundMusic.play();
        }
    }

    update(time, delta)
    {
        getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + activeUsersNumber);
    }
}

//métodos para peticiones AJAX:
function updateActiveUsers(){

    if(activePrevUsersNumber != activeUsersNumber)
    {
        if(activePrevUsersNumber < activeUsersNumber){
            console.log("Se ha conectado alguien. El número actual de usuarios es: " + activeUsersNumber);
        }else if(activePrevUsersNumber > activeUsersNumber){
            console.log("Alguien se ha desconectado. El número actual de usuarios es: " + activeUsersNumber);
        }
        activePrevUsersNumber = activeUsersNumber;
    }

}

function deleteActiveUser(user) {
	console.log("user funcion deleteActive: " + user);
    $.ajax({
        method: "DELETE",
        url: url + "activeUsers/" + user,
        data: user,
        success : function () {
            console.log("User removed");
        },
        error : function () {
            console.log("Failed to delete");
            console.log("The URL was:\n" + url + "users/"+username)
        }
    });
}

function getActiveUsers() {
    $.ajax({
        url: url + "activeUsersNum",
        method: 'GET',
        dataType: 'json'
    }).done(function (data) {
        activeUsersNumber = data;
    });
}

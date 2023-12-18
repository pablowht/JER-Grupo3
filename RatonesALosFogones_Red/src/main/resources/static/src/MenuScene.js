$(document).ready(function(){
    console.log('DOM cargado (MENÚ)')
});

var url;
let activeUsersNumber;
let activePrevUsersNumber;
let textActiveUsers;


class MenuScene extends Phaser.Scene{

    constructor(){
        super("Menu");
    }

    preload(){
        this.backgroundMusic = this.sound.add('MenuMusic', {loop: true});
    }

    backgroundMusic;

    create(){
        //variables usuarios activos:
        activeUsersNumber = 0;
        activePrevUsersNumber = 0;
        url= window.location.href;

        //variables y funciones menú
        this.add.image(0,0,'Fondo_Menu').setOrigin(0, 0);
        let BotonJugar = this.add.image(990,540,'BOTON_JUGAR');
        BotonJugar.setInteractive();

        let BotonCreditos = this.add.image(990,680,'BOTON_CREDITOS');
        BotonCreditos.setInteractive();

        let BotonAjustes = this.add.image(990,820,'BOTON_AJUSTES');
        BotonAjustes.setInteractive();

        let BotonUsuario = this.add.image(1800,20,'BOTON_USUARIO');
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
            this.scene.start("UserScene");
        });

        textActiveUsers = this.add.text(50, 850, 'Usuarios activos login: ' + activeUsersNumber , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: '#e82138'
        });

        //COMPLETARLO
        // window.addEventListener('beforeunload', () =>
        // {
        //     deleteActiveUser(this.data.user);
        // });

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
    $.ajax({
        method: "DELETE",
        url: url + "activeUsers/" + user,
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

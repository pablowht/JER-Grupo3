$(document).ready(function(){
    console.log('DOM cargado (USER SCENE)')
});

var url;
var infoDataUser;
var infoDataPassword;

class UserScene extends Phaser.Scene {
    constructor() {
        super("UserScene");
    }

    init(data){
        this.dataObj = data;
    }

    create() {
        var canChange = false;
        url = window.location.href;
        this.activePrevUsersNumber = 0;

        infoDataUser = this.dataObj.user;

        this.add.image(0, 0, 'Fondo_Liso').setOrigin(0, 0);

        this.usernameText = this.add.text(960, 340, infoDataUser,
            {
                fontFamily: 'Lexend',
                font: (100).toString() + "px Lexend",
                color: 'e49804'
            }).setOrigin(0.5, 0.5);

        let BotonChangePassword = this.add.image(700, 730, 'Boton_ChangePassword');
        BotonChangePassword.setInteractive({ cursor: 'pointer' });

        BotonChangePassword.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            console.log("valor infoData dentro de changepassword: " + infoDataUser);
            this.scene.start('ChangePassword', {user: infoDataUser, password: infoDataPassword});
        });

        let BotonReturn = this.add.image(150, 150, 'Flecha');
        BotonReturn.setInteractive({ cursor: 'pointer' });

        BotonReturn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            this.scene.start('Menu');
        });

        let BotonEliminar = this.add.image(1248, 730, 'Boton_Eliminar');
        BotonEliminar.setInteractive({ cursor: 'pointer' });

        BotonEliminar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            console.log("valor infoData dentro de changepassword: " + infoDataUser);
            this.scene.start('DeleteUser', {user: infoDataUser, password: infoDataPassword});
        });

        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);

        this.add.image(960, 935, 'Recuadro_UsuariosActivos');
        this.textActiveUsers = this.add.text(800, 919.5, 'Usuarios activos: ' + this.activeUsersNumber , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });

        window.addEventListener('beforeunload', () =>
        {
            this.deleteActiveUser(user);
        });
    }

    update()
    {
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);
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
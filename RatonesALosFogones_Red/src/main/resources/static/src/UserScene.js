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

        infoDataUser = this.dataObj.user;
        infoDataPassword = this.dataObj.password;
        console.log("info data user: " +  infoDataUser);
        console.log("info data pass: " +  infoDataPassword);


        this.add.image(0, 0, 'Fondo_Liso').setOrigin(0, 0);

        this.usernameText = this.add.text(960, 340, infoDataUser,
            {
                fontFamily: 'Lexend',
                font: (100).toString() + "px Lexend",
                color: 'e49804'
            }).setOrigin(0.5, 0.5);

        let BotonChangePassword = this.add.image(700, 730, 'Boton_ChangePassword');
        BotonChangePassword.setInteractive();

        BotonChangePassword.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            console.log("valor infoData dentro de changepassword: " + infoDataUser);
            this.scene.start('ChangePassword', {user: infoDataUser, password: infoDataPassword});
        });

        let BotonReturn = this.add.image(150, 150, 'Flecha');
        BotonReturn.setInteractive();

        BotonReturn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            this.scene.start('Menu');
        });

        let BotonEliminar = this.add.image(1248, 730, 'Boton_Eliminar');
        BotonEliminar.setInteractive();

        BotonEliminar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            console.log("valor infoData dentro de changepassword: " + infoDataUser);
            this.scene.start('DeleteUser', {user: infoDataUser, password: infoDataPassword});
        });
    }
}
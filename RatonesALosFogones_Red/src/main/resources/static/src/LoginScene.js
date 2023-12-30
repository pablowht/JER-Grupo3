$(document).ready(function(){
    console.log('DOM cargado (LOGIN)')
});
class LoginScene extends Phaser.Scene{
	
    constructor(){
        super('LoginScene');
    }
    create() {

        var url = window.location.href;
        this.add.image(0, 0, 'Fondo_Login').setOrigin(0, 0);

        var formulario = this.add.dom(720, 615).createFromCache('login_form');

        var user = formulario.getChildByName('username');
        var password = formulario.getChildByName('password');

        var loginCompleto = false;


        this.emptyText = this.add.text(50, 600, 'RELLENE LOS CAMPOS', {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: '#e82138'
        })
        this.emptyText.setVisible(false);

        let BotonAcceder = this.add.image(960, 960, 'Boton_Acceder');
        BotonAcceder.setInteractive();

        let BotonReturn = this.add.image(150, 150, 'Flecha');
        BotonReturn.setInteractive();

        BotonReturn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            this.scene.start('LoginCreate');
        });

        BotonAcceder.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            if (user.value !== "" && password.value !== "") {
                this.emptyText.setVisible(false);
                var userURL = user.value;
                $.ajax({
                    method: "POST",
                    async: false,
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: url + 'usersLogin',
                    data: JSON.stringify({user: "" + userURL}),
                    dataType: "json"
                }).done(function (value) {
                    loginCompleto = true;
                });

                if (loginCompleto) {
                    this.scene.stop();
                    this.scene.start('Menu', {
                        user: user.value,
                        password: password.value,
                        activeUsers: this.activeUsersNumber,
                        activePrevUsers: this.activePrevUsersNumber
                    });
                }
                if (!loginCompleto) {
                    this.wrongPasswordText = this.add.text(50, 590, 'USUARIO O CONTRASEÑA \nERRÓNEOS', {
                        fontFamily: 'Lexend',
                        font: (40).toString() + "px Lexend",
                        color: '#e82138',
                        boundsAlignH: "center",
                        boundsAlignV: "middle"
                    });
                    this.time.delayedCall(3000, () => this.wrongPasswordText.setVisible(false));
                }
            }
        });
    }
}

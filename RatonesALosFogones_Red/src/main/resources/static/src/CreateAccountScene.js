$(document).ready(function(){
    console.log('DOM cargado (CREATE ACCOUNT)')
});
class CreateAccountScene extends Phaser.Scene{

    constructor(){
        super('CreateAccountScene');
    }
    create() {
        var url = window.location.href;

        this.add.image(0, 0, 'Fondo_Create').setOrigin(0, 0);

        var formulario = this.add.dom(720, 615).createFromCache('login_form');

        var user = formulario.getChildByName('username');
        var password = formulario.getChildByName('password');


        let BotonCrearCuenta = this.add.image(960, 960, 'Boton_Crear');
        BotonCrearCuenta.setInteractive();

        let BotonReturn = this.add.image(150, 150, 'Flecha');
        BotonReturn.setInteractive();

        BotonReturn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            this.scene.start('LoginCreate');
        });

        //CAMBIO DE ESCENA DEL LOGIN AL MENÚ
        BotonCrearCuenta.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            if (user.value !== "" && password.value !== "") {
                $.ajax({
                    type: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: url + 'user',
                    data: JSON.stringify({user: "" + user.value, password: "" + password.value}),
                })
                .done((data, textStatus, jqXHR) => {
                    this.success(user.value, password.value);
                    console.log(textStatus+" "+ jqXHR.status);
                    console.log(jqXHR.statusCode());
                })
                .fail((data, textStatus, jqXHR) =>
                {
                    this.messageError();
                    console.log(textStatus+" "+jqXHR.status);
                    console.log("User already Exists");
                });
            }
        });
    }
    messageError(){
        this.wrongPasswordText = this.add.text(50, 590, 'USUARIO YA EXISTENTE', {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: '#e82138',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        });
        this.time.delayedCall(3000, () => this.wrongPasswordText.setVisible(false));
    }

    success(user,password){
        this.scene.stop();
        this.scene.start('Menu', {
            user: user,
            password: password
        });
    }
}

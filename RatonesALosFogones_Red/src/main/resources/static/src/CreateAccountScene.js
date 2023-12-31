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

        var usuarioCreado = false;

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
                    async: false,
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: url + 'users',
                    data: JSON.stringify({user: "" + user.value, password: "" + password.value}),
                    dataType: "json",
                    success: function (valor) {
                        usuarioCreado = valor;
                    }
                })
                .done((data, textStatus, jqXHR) => {
                    console.log(textStatus+" "+ jqXHR.status);
                    console.log(data);
                    console.log(jqXHR.statusCode())
                })
                .fail((data, textStatus, jqXHR) =>
                {
                    usuarioCreado = false;
                    console.log(textStatus+" "+jqXHR.status);
                    console.log("User already Exists");
                });

                if(usuarioCreado === true)
                {
                    this.scene.stop();
                    this.scene.start('Menu', {user: user.value, password: password.value});
                }
                if (!usuarioCreado) {
                    this.emptyText = this.add.text(40, 590, 'EL USUARIO YA EXISTE', {
                        fontFamily: 'Lexend',
                        font: (40).toString() + "px Lexend",
                        color: '#e82138'
                    })
                }
            }
        });
    }
}

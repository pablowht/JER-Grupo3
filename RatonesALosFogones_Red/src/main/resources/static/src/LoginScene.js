$(document).ready(function(){
    console.log('DOM cargado (LOGIN)')
});

class LoginScene extends Phaser.Scene{
    constructor(){
        super("LoginScene");

        this.usuario = 'Ratoncito';
    }


    create(){

        this.add.image(0,0,'Fondo_Login').setOrigin(0, 0);

        var formulario = this.add.dom(750, 800).createFromCache('login_form');

        var user = this.add.dom(750,800).createFromHTML('login-user');
        var password = this.add.dom(750,900).createFromHTML('login-password');
        //var user = formulario.getChildByID('login-user');
        //var password = formulario.getChildByID('login-password');

        var textWrongPassword = this.add.text(750, 100, '');
        var loginCompleto = false;

        let BotonAcceder = this.add.image(960,960,'Boton_Acceder');
        BotonAcceder.setInteractive();

        //CAMBIO DE ESCENA DEL LOGIN AL MENÚ
        BotonAcceder.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if (user.value !== "" && password.value !== "") {
                /*$.ajax({
                    type: "POST",
                    async: false,
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: url + "users",
                    data: JSON.stringify({username: "" + user.value, password: "" + password.value}),
                    dataType: "json",
                    success: function (valor) { // returned variable to check if we can change the scene
                        loginCompleto = valor;
                    }
                }).done(function (item) {
                    console.log("Usuario creado: " + JSON.stringify({username: "" + user.value, password: "" + password.value}));
                })*/

                // Starts the next scene
                if (loginCompleto) { // if we access with an existing user and correct password or create a new one we can change the scene
                    this.scene.start('Menu');
                } else { // if the given password doesn't match the one of the existing user, we can't change the scene
                    textWrongPassword.setColor('e82138');
                    textWrongPassword.setText('CONTRASEÑA INCORRECTA'); //
                }
            }
        });

        this.BotonAcceder.on('pointerover', function (){
            this.setScale(1.2, 1.2);
        });

        this.BotonAcceder.on('pointerout', function (){
            this.setScale(1, 1);
        })

    }

}
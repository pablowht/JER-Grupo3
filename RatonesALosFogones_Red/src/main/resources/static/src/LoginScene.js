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

        var formulario = this.add.dom(720, 615).createFromCache('login_form');

        //var user = this.add.dom(750,800).createFromHTML('login-user');
        //var password = this.add.dom(750,900).createFromHTML('login-password');
        var username = formulario.getChildByName('username');
        var password = formulario.getChildByName('password');

        //var textWrongPassword = this.add.text(900, 850, '');
        var loginCompleto = false;

        let BotonAcceder = this.add.image(960,960,'Boton_Acceder');
        BotonAcceder.setInteractive();

        //CAMBIO DE ESCENA DEL LOGIN AL MENÚ
        BotonAcceder.on('pointerdown', () => {
            this.sound.play('InteractSound');
            if (username.value !== "" && password.value !== "") {
                $.ajax({
                    type: "POST",
                    async: false,
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: "/src/main/java/com/example/demo",
                    data: JSON.stringify({username: "" + username.value, password: "" + password.value}),
                    dataType: "json",
                    success: function (valor) { // returned variable to check if we can change the scene
                        loginCompleto = valor;
                    }
                }).done(function (item) {
                    console.log("Usuario creado: " + JSON.stringify({username: "" + username.value, password: "" + password.value}));
                })

                // Starts the next scene
                if (loginCompleto) { // if we access with an existing user and correct password or create a new one we can change the scene
                    this.scene.start('Menu');
                } else { // if the given password doesn't match the one of the existing user, we can't change the scene
                    //textWrongPassword.setColor('#e82138');
                    //textWrongPassword.setFontFamily('Lexend')
                    //textWrongPassword.setText('CONTRASEÑA INCORRECTA'); //
                    this.textWrongPassword = this.add.text(850, 850, 'CONTRASEÑA INCORRECTA', {
                        fontFamily: 'Lexend',
                        font: (40).toString() + "px Lexend",
                        color: '#e82138'
                    })
                    console.log('AQUI ESTOY: ' + formulario.x + " , " + formulario.y);
                }
            }
            this.scene.start('Menu');
        });

    }

}
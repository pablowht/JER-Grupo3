$(document).ready(function(){
    console.log('DOM cargado (LOGIN)')
});


class LoginScene extends Phaser.Scene{
	
    constructor(){
        super("LoginScene");
    }

    create(){
	    var url= window.location.href;
        this.add.image(0,0,'Fondo_Login').setOrigin(0, 0);

        var formulario = this.add.dom(720, 615).createFromCache('login_form');

        //var user = this.add.dom(750,800).createFromHTML('login-user');
        //var password = this.add.dom(750,900).createFromHTML('login-password');
        var user = formulario.getChildByName('username');
        var password = formulario.getChildByName('password');

        //var textWrongPassword = this.add.text(900, 850, '');
        var loginCompleto = false;

        let BotonAcceder = this.add.image(960,960,'Boton_Acceder');
        BotonAcceder.setInteractive();

        //CAMBIO DE ESCENA DEL LOGIN AL MENÚ
        BotonAcceder.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
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
                        loginCompleto = valor;
                    }
                }).done(function (item) {
                    console.log("Usuario creado: " + JSON.stringify({user: "" + user.value, password: "" + password.value}));
                })

				if(!loginCompleto){
                    this.textWrongPassword = this.add.text(850, 850, 'CONTRASEÑA INCORRECTA', {
                        fontFamily: 'Lexend',
                        font: (40).toString() + "px Lexend",
                        color: '#e82138'
                    })
				}
                else{ 
					this.scene.stop();
                    this.scene.start('Menu', {user: user.value, password: password.value});
                } 
                 
            }
        });
    }
}
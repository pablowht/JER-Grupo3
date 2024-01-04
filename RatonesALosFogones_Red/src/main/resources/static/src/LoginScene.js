$(document).ready(function(){
    console.log('DOM cargado (LOGIN)')
});
class LoginScene extends Phaser.Scene{
	
    constructor(){
        super('LoginScene');
    }
    create() {

        this.input.keyboard.disableGlobalCapture();

        var url = window.location.href;
        this.add.image(0, 0, 'Fondo_Login').setOrigin(0, 0);

        var formulario = this.add.dom(720, 615).createFromCache('login_form');

        var user = formulario.getChildByName('username');
        var password = formulario.getChildByName('password');

        this.emptyText = this.add.text(50, 600, 'RELLENE LOS CAMPOS', {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: '#e82138'
        })
        this.emptyText.setVisible(false);

        let BotonAcceder = this.add.image(960, 960, 'Boton_Acceder');
        BotonAcceder.setInteractive({ cursor: 'pointer' });

        let BotonReturn = this.add.image(150, 150, 'Flecha');
        BotonReturn.setInteractive({ cursor: 'pointer' });

        BotonReturn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            this.scene.start('LoginCreate');
        });

        BotonAcceder.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            if (user.value !== "" && password.value !== "") {
                this.user = user.value;
                this.password = password.value;
                this.emptyText.setVisible(false);
                $.ajax({
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: url + 'usersLogin',
                    data: JSON.stringify({user: "" + this.user, password:"" + this.password}),
                })
                .done((data, textStatus, jqXHR) =>
                {
                    console.log(textStatus+" "+ jqXHR.status);
                    console.log(jqXHR.statusCode());
                    this.success(this.user);
                })
                .fail((data, textStatus, jqXHR) =>
                {
					this.messageError();
                    console.log("User or Password Not Found");
                });
            }
        });

        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);
    }
    
    messageError(){
		this.wrongPasswordText = this.add.text(50, 590, 'USUARIO O CONTRASEÑA \nERRÓNEOS', {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: '#e82138',
            align: 'center'
        });
        this.time.delayedCall(3000, () => this.wrongPasswordText.setVisible(false));
	}
	
	 success(user){
		this.scene.stop();
        this.scene.start('Menu', {
            user: user,
        });
	}
}

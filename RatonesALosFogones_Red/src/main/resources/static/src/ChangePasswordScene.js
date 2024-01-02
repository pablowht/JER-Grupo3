$(document).ready(function(){
    console.log('DOM cargado (CHANGE PASSWORD)')
});

var url;
var infoDataUser;
var infoDataPassword;


class ChangePasswordScene extends Phaser.Scene {
    constructor() {
        super("ChangePassword");
    }

	init(data){
		this.dataObj = data;
	}



    create() {

        this.input.keyboard.disableGlobalCapture();

        url = window.location.href;

		infoDataUser = this.dataObj.user;
		infoDataPassword = this.dataObj.password;
		console.log("info data user: " +  infoDataUser);
				console.log("info data pass: " +  infoDataPassword);
		
        this.add.image(0, 0, 'Fondo_ChangePassword').setOrigin(0, 0);

        var changePassword_html = this.add.dom(720, 615).createFromCache('changePassword_html');

        var user = changePassword_html.getChildByName('username');
        var new_password = changePassword_html.getChildByName('new-password');


        let BotonConfirmar = this.add.image(960, 960, 'Boton_Confirmar');
        BotonConfirmar.setInteractive({ cursor: 'pointer' });

        let BotonReturnMenu = this.add.image(150, 150, 'Flecha');
        BotonReturnMenu.setInteractive({ cursor: 'pointer' });


        BotonConfirmar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {         
            if (user.value !== "" && new_password.value !== "") {
                $.ajax({
                    type: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: url + 'users/' + user.value,
                    data: JSON.stringify({user: user.value, password: new_password.value})
                })
                .done((data, textStatus, jqXHR) => {
                    this.success();
                    console.log(textStatus+" "+ jqXHR.status);
                    console.log(jqXHR.statusCode());
                })
                .fail((data, textStatus, jqXHR) =>
                {
                    this.messageError();
                    console.log(textStatus+" "+jqXHR.status);
                    console.log("User Password is the same that last");
                });
            }
            this.sound.play('InteractSound');
        });

        BotonReturnMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            this.scene.start('UserScene');
        });
    }
    messageError(){
        this.errorPassword = this.add.text(100, 800, 'CONTRASEÑA NO VÁLIDA', {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: '#e82138'
        })
        this.time.delayedCall(2000, () => this.errorPassword.setVisible(false));
    }

    success(){
        this.changedPassword = this.add.text(100, 800, 'CONTRASEÑA CAMBIADA', {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: '#5701d9'
        })
        this.time.delayedCall(2000, () => this.changedPassword.setVisible(false));
    }
}
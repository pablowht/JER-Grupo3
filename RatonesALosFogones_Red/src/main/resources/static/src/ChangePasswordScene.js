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
        var canChange = false;
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
        BotonConfirmar.setInteractive();

        let BotonReturnMenu = this.add.image(150, 150, 'Flecha');
        BotonReturnMenu.setInteractive();


        BotonConfirmar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {         
            if (user.value !== "" && new_password.value !== "") {
                $.ajax({
                    type: "PUT",
                    dataType: "json",
                    async: false,
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: url + 'users/' + user.value,
                    data: JSON.stringify({user: user.value, password: new_password.value})
                }).done(function (item) {
                    console.log("Contraseña cambiada: " + JSON.stringify({
                        user: "" + user.value,
                        password: "" + new_password.value
                    }));
                    canChange = true;
                })
            }
            if(!canChange){
				this.add.text(200, 800, 'CAMPO NO VÁLIDO', {
                     fontFamily: 'Lexend',
                     font: (40).toString() + "px Lexend",
                     color: '#e82138'
                })
			}
			if(canChange){
				    this.sound.play('InteractSound');
                    this.scene.start('UserScene');
			}
        });

        BotonReturnMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            this.scene.start("UserScene");
        });

    }
}
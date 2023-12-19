$(document).ready(function(){
    console.log('DOM cargado (CHANGE PASSWORD)')
});

var url;

class ChangePasswordScene extends Phaser.Scene{
    constructor(){
        super("UserScene");
    }


    create(){
		var canChange = false;
        url= window.location.href;
        
        this.add.image(0,0,'Fondo_ChangePassword').setOrigin(0, 0);

        var changePassword_html = this.add.dom(720, 615).createFromCache('changePassword_html');

        var user = changePassword_html.getChildByName('username');
        var new_password = changePassword_html.getChildByName('new-password');

        let BotonConfirmar = this.add.image(960,960,'Boton_Confirmar');
        BotonConfirmar.setInteractive();

        let BotonReturnMenu = this.add.image(150,150,'Flecha');
        BotonReturnMenu.setInteractive();

        BotonConfirmar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            console.log("valor url de la petición ajaz put: " + url + 'users/' + user.value);
            console.log("nombre usuario:" + user.value);
            console.log("nueva contraseña:" + new_password.value);
            console.log("data enviada:" + JSON.stringify({"user" : user.value, "password": new_password.value}))

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
                    data: JSON.stringify({user : user.value, password: new_password.value})
                }).done(function (item) {
                    console.log("Contraseña cambiada: " + JSON.stringify({user: "" + user.value, password: "" + new_password.value}));
                   	canChange = true;
                })
            }
            if(canChange == true){
				 this.scene.stop();
                 this.scene.start('Menu');
			}
        });

        BotonReturnMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("Menu");
        });

    }
}
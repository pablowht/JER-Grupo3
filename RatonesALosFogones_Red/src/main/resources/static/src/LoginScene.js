$(document).ready(function(){
    console.log('DOM cargado (LOGIN)')
});


class LoginScene extends Phaser.Scene{
	
    constructor(){
        super('LoginScene');
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
        var errorPassword = false;
        
        this.emptyText = this.add.text(50, 600, 'RELLENE LOS CAMPOS', {
          	fontFamily: 'Lexend',
         	font: (40).toString() + "px Lexend",
   			color: '#e82138'
    	})
    	this.emptyText.setVisible(false);

        let BotonAcceder = this.add.image(960,960,'Boton_Acceder');
        BotonAcceder.setInteractive();

        let BotonReturn = this.add.image(150, 150, 'Flecha');
        BotonReturn.setInteractive();

        BotonReturn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            this.sound.play('InteractSound');
            this.scene.start('LoginCreate');
        });

        //CAMBIO DE ESCENA DEL LOGIN AL MENÚ
        BotonAcceder.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if (user.value !== "" && password.value !== "") {
				this.emptyText.setVisible(false);
                $.ajax({
                    method: "GET",
                    async: false,
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    url: url + 'users/' + user.value,
                    data: JSON.stringify({user: "" + user.value, password: "" + password.value}),
                    dataType: "json",
                    success: function (valor) {
                        loginCompleto = valor;
                        errorPassword = !value;
                    }
                }).done( function(value) {
                    console.log("Usuario encontrado: " + JSON.stringify({user: "" + user.value, password: "" + password.value}));
                    
                }).fail( function( jqXHR, textStatus, errorThrown ) {
                    if (jqXHR.status === 0) {
                        alert('Not connect: Verify Network.');
                    } else if (jqXHR.status === 404) {
                        alert('Requested page not found [404]');
                    } else if (jqXHR.status === 500) {
                        alert('Internal Server Error [500].');
                    } else if (textStatus === 'parsererror') {
                        alert('Requested JSON parse failed.');
                    } else if (textStatus === 'timeout') {
                        alert('Time out error.');
                    } else if (textStatus === 'abort') {
                        alert('Ajax request aborted.');
                    } else {
                        //errorPassword = true;
                    }
                });

				
				if(loginCompleto){
					this.scene.stop();
                    this.scene.start('Menu', {user: user.value, password: password.value});
				}
				if(errorPassword){
					this.wrongPasswordText = this.add.text(50, 800, 'CONTRASEÑA INCORRECTA', {
                            fontFamily: 'Lexend',
                            font: (40).toString() + "px Lexend",
                            color: '#e82138'
                     });
				}
                 
            }else{
				this.emptyText.setVisible(true);
			}
        });
    }
}

function changeScene(){

}
$(document).ready(function(){
    console.log('DOM cargado (DELETE USER)')
});
class DeleteUserScene extends Phaser.Scene{
    constructor(){
        super("DeleteUser");
    }
    create(){
        var canChange = false;

       // url= window.location.href;
        this.add.image(0,0,'Fondo_Eliminar').setOrigin(0,0);
        let BotonVolver =  this.add.image(700,860,'Boton_Volver');
        BotonVolver.setInteractive();
        let BotonDelete =  this.add.image(1250,860,'Boton_Delete');
        BotonDelete.setInteractive();

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=> {
            this.sound.play('InteractSound');
            this.scene.start('UserScene');
        });

       /* BotonDelete.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
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
        BotonConfirmar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>
        {
            this.sound.play('InteractSound');
            this.scene.start()
        });

        BotonReturnMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("Menu");
        });*/

    }

}
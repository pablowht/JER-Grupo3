$(document).ready(function(){
    console.log('DOM cargado (DELETE USER)')
});

var user;

class DeleteUserScene extends Phaser.Scene{
	
    constructor(){
        super("DeleteUser");
    }
    
    init(data){
		this.dataObj = data;
	}
	
    create(){
		console.log("data recibida en delete user scene: " + this.dataObj.user)
        var canChange = false;
        user = this.dataObj.user;

       // url= window.location.href;
        this.add.image(0,0,'Fondo_Eliminar').setOrigin(0,0);
        let BotonVolver =  this.add.image(700,860,'Boton_Volver');
        BotonVolver.setInteractive({ cursor: 'pointer' });
        let BotonDelete =  this.add.image(1250,860,'Boton_Delete');
        BotonDelete.setInteractive({ cursor: 'pointer' });

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=> {
            this.sound.play('InteractSound');
            this.scene.start('UserScene');
        });

       BotonDelete.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
			console.log("tu cuenta se va a eliminar");

            $.ajax({
        		method: "DELETE",
        		url: url + "users/" + user,
        		data: user,
        		success : function () {
        		    console.log("User removed");
        		},
        		error : function () {
        		    console.log("Failed to delete");
        		    console.log("The URL was:\n" + url + "users/" + user)
        		}
    		});
    		$.ajax({
        		method: "DELETE",
        		url: url + "activeUsers/" + user,
        		data: user,
        		success : function () {
					canChange = true;
        		    console.log("User removed");
        		},
        		error : function () {
        		    console.log("Failed to delete");
        		    console.log("The URL was:\n" + url + "users/" + user)
        		}
    		});
    		this.sound.play('InteractSound');
            	this.scene.start('LoginCreate');
    		//if (canChange == true) {
            	//this.scene.stop();
            	
            	
         	//}
       });
    }

}
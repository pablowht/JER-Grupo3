class LoginScene extends Phaser.Scene{
    constructor(){
        super("LoginScene");
    }


    create(){
        this.add.image(0,0,'Fondo_Login').setOrigin(0, 0);
        let BotonAcceder = this.add.image(960,960,'Boton_Acceder');
        BotonAcceder.setInteractive();

        //CAMBIO DE ESCENA DEL MENU A LA ESCENA IN-GAME
        BotonAcceder.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('Menu');
        });

    }

}
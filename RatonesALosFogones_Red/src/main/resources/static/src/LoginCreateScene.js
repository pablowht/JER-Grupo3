class LoginCreateScene extends Phaser.Scene{

    constructor(){
        super('LoginCreate');
    }

    create(){

        this.add.image(0,0,'Fondo_LoginCreate').setOrigin(0, 0);
        let BotonCrearCuenta = this.add.image(960,783,'Boton_CrearCuenta');
        BotonCrearCuenta.setInteractive();
        let BotonIniciar = this.add.image(960,611,'Boton_Iniciar');
        BotonIniciar.setInteractive();

        BotonCrearCuenta.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('CreateAccountScene',{activeUsers:activeUsersNumber, activePrevUsers: activePrevUsersNumber});
        });

        BotonIniciar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('LoginScene',{activeUsers: activeUsersNumber, activePrevUsers: activePrevUsersNumber});
        });

    }
}
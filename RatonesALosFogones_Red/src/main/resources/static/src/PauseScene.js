
class PauseScene extends Phaser.Scene {
    constructor() {
        super("Pause");
    }
    preload(){}

    isPaused;
    muted;
    level;

    init(data){
        this.isPaused=data.isPaused;
        this.levelNumber = data.level;
    }
    create(){
        this.activePrevUsersNumber = 0;

        //FONDO
        this.add.image(0, 0, 'FondoPausa').setOrigin(0, 0);

        //BOTONES
        let BotonContinuar = this.add.image(753, 960, 'BotonContinuar');
        if(!this.isPaused){ BotonContinuar.setVisible(false); BotonContinuar.disableInteractive(); }
        if(this.isPaused){ BotonContinuar.setVisible(true); BotonContinuar.setInteractive({ cursor: 'pointer' }); }

        let BotonSalir=this.add.image(1167, 960, 'BotonSalir');
        BotonSalir.setInteractive({ cursor: 'pointer' })
        let BotonSonido=this.add.image(960,810,'BotonSonido');
        BotonSonido.setInteractive({ cursor: 'pointer' });

        //confirmacion de salir
        let imgConfirmar= this.add.image(0, 0, 'FondoSalir').setOrigin(0, 0);
        imgConfirmar.setVisible(false) ;
        let botonAceptar = this.add.image(700, 860, 'BotonAceptar');
        //
        botonAceptar.setVisible(false);
        let botonCancelar = this.add.image(1250, 860, 'BotonCancelar');
        //
        botonCancelar.setVisible(false);


        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        BotonContinuar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.CheckLevel()
            this.scene.resume(this.level);
            this.scene.sleep();
        });

        BotonSalir.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(!this.isPaused) {
                this.scene.start("Menu");
            }else{

                imgConfirmar.setVisible(true);
                botonAceptar.setVisible(true);
                botonCancelar.setVisible(true);
                botonAceptar.setInteractive({cursor: 'pointer'});
                botonCancelar.setInteractive({cursor: 'pointer'});
            }
        });
        botonAceptar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.stopAll();
            this.sound.play('MenuMusic');
            this.CheckLevel();
            this.scene.stop(this.level);
            this.scene.start('Menu')
        });
        botonCancelar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=> {
            imgConfirmar.setVisible(false);
            botonAceptar.setVisible(false);
            botonCancelar.setVisible(false);
            botonAceptar.disableInteractive();

        });


        BotonSonido.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(!this.muted) {
                this.BotonSonido = this.add.image(960,810,'BotonMute');
                this.sound.setMute(true);
                this.muted = !this.muted;}
            else {
                this.BotonSonido = this.add.image(960,810,'BotonSonido');
                this.sound.setMute(false);
                this.muted = !this.muted;
            }
        });

        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);

        this.add.image(289, 960, 'Recuadro_UsuariosActivos');
        this.textActiveUsers = this.add.text(117, 935, 'Usuarios activos: ' + this.activeUsersNumber , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });



        window.addEventListener('beforeunload', () =>
        {
            this.deleteActiveUser(user);
        });

    }

    update()
    {
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);
        if(this.activeUsersNumber == 1) this.userDisconected();
    }

    CheckLevel(){
        if(this.levelNumber === 1){
            this.level = 'LevelOne';
        } else if(this.levelNumber === 2){
            this.level = 'LevelTwo';
        }
    }

    updateActiveUsers()
    {

        if(this.activePrevUsersNumber !== this.activeUsersNumber)
        {
            if(this.activePrevUsersNumber < this.activeUsersNumber){
                console.log("Se ha conectado alguien. El número actual de usuarios es: " + this.activeUsersNumber);
            }else if(this.activePrevUsersNumber > this.activeUsersNumber){
                console.log("Alguien se ha desconectado. El número actual de usuarios es: " + this.activeUsersNumber);
            }
            this.activePrevUsersNumber = this.activeUsersNumber;
        }

    }

    deleteActiveUser(user)
    {
        $.ajax({
            method: "DELETE",
            url: url + "activeUsers/" + user,
            data: user,
            success : function () {
                console.log("User removed");
            },
            error : function () {
                console.log("Failed to delete");
                console.log("The URL was:\n" + url + "users/" + user)
            }
        });
    }

    getActiveUsers()
    {
        $.ajax({
            method: 'GET',
            url: url + "activeUsersNum",
        }).done((data)=> {
            this.assignValue(data);
        })
    }

    assignValue(data){
        this.activeUsersNumber = data;
    }

    userDisconected(){
        console.log("usuario desconectado...");
        this.add.image(0,0, 'Fondo_Desconexion').setOrigin(0,0);
        id = null;
        p1Ready = false;
        p2Ready = false;
        raton2 = false;
        raton1 = false;
        this.time.delayedCall(2000, () => {this.StartPlaying('Menu');}, [], this);
    }
}
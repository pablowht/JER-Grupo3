class SelectLevelScene extends Phaser.Scene {
    constructor() {
        super('LevelSelection');
    }

	init(data){
		this.dataObj = data;
    }

    //time;

    create(){
        this.raton1 = this.dataObj.colorRaton1;
        this.raton2 = this.dataObj.colorRaton2;
        this.user = this.dataObj.user;
        this.activePrevUsersNumber = 0;

        this.add.image(0,0,'FondoSeleccionNiveles').setOrigin(0, 0);

        let Meme1Boton = this.add.image(1470,795,'BotonCubiertos').setInteractive();
        let Meme2Boton = this.add.image(452,530,'BotonCubiertos').setInteractive();
        let Meme1 = this.add.image(1470,795,'MemeN1').setVisible(false);
        let Meme2 = this.add.image(452,530,'MemeN2').setVisible(false);

        let BotonVolver = this.add.image(150,150,'Flecha');
        BotonVolver.setInteractive({ cursor: 'pointer' });

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('Menu');
        });

        let BotonNivel1 = this.add.image(960.5,529.5,'BotonN1');
        BotonNivel1.setInteractive({ cursor: 'pointer' });

        let BotonNivel2 = this.add.image(960.5,795.5,'BotonN2');
        BotonNivel2.setInteractive({ cursor: 'pointer' });

        BotonNivel1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.add.image(0,0, 'PlayersReady').setOrigin(0,0);
            this.time.delayedCall(7000, this.StartPlaying('LevelOne'), [], this);
        });

        BotonNivel2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.add.image(0,0, 'PlayersReady').setOrigin(0,0);
            this.time.delayedCall(7000, this.StartPlaying('LevelTwo'), [], this);
        });


        Meme1Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            //this.sound.play('InteractSound');
            Meme1.setVisible(true);
        });

        Meme1Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            //this.sound.play('InteractSound');
            Meme1.setVisible(false);
        });

        Meme2Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
            //this.sound.play('InteractSound');
            Meme2.setVisible(true);
        });

        Meme2Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
            //this.sound.play('InteractSound');
            Meme2.setVisible(false);
        });

        var alaboActivo = false;
        var imagenProfe = this.add.image(360.5,930,'AlaboProfes').setVisible(false);

        Meme2Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(!alaboActivo){
                imagenProfe.setVisible(true);
                alaboActivo = !alaboActivo;
            } else{
                imagenProfe.setVisible(false);
                alaboActivo = !alaboActivo;
            }

        });

        Meme1Boton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(!alaboActivo){
                imagenProfe.setVisible(true);
                alaboActivo = !alaboActivo;
            } else{
                imagenProfe.setVisible(false);
                alaboActivo = !alaboActivo;
            }
        });



        window.addEventListener('beforeunload', () =>
        {
            this.deleteActiveUser(this.user);
        });

        this.add.image(960, 1005, 'Recuadro_UsuariosActivos');
        this.textActiveUsers = this.add.text(800, 939.5, 'Usuarios activos: ' + this.activeUsersNumber , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });


        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);
    }

    StartPlaying(level){
        this.scene.start(level, {colorRaton1: this.raton1, colorRaton2:this.raton2, user : this.user});
    }

    update(){
        this.getActiveUsers();
        this.updateActiveUsers();
        this.textActiveUsers.setText('Usuarios activos: ' + this.activeUsersNumber);
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
}
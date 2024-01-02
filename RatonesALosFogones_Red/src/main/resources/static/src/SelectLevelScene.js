class SelectLevelScene extends Phaser.Scene {
    constructor() {
        super('LevelSelection');
    }

	init(data){
		this.dataObj = data;
    }

    create(){
        this.raton1 = this.dataObj.colorRaton1;
        this.raton2 = this.dataObj.colorRaton2;
        this.user = this.dataObj.user;
        this.activeUsers = 0;
        this.activeUsersPrev = 0;

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

        window.addEventListener('beforeunload', () =>
        {
            deleteActiveUser(this.user);
        });

        textActiveUsers = this.add.text(117, 935, 'Usuarios activos login: ' + this.activeUsers , {
            fontFamily: 'Lexend',
            font: (40).toString() + "px Lexend",
            color: 'black'
        });
    }

    StartPlaying(level){
        this.scene.start(level, {colorRaton1: this.raton1, colorRaton2:this.raton2, user : this.user,  activeUsers: this.activeUsersNumber, activePrevUsers: this.activePrevUsersNumber});
    }

    update(){
        getActiveUsers();
        updateActiveUsers();
        textActiveUsers.setText('Usuarios activos: ' + this.activeUsers);
    }
}

function updateActiveUsers(){

    if(this.activeUsersPrev !== this.activeUsers)
    {
        if(this.activeUsersPrev < this.activeUsers){
            console.log("Se ha conectado alguien. El número actual de usuarios es: " + this.activeUsers);
        }else if(this.activeUsersPrev > this.activeUsers){
            console.log("Alguien se ha desconectado. El número actual de usuarios es: " + this.activeUsers);
        }
        this.activeUsersPrev = this.activeUsers;
    }

}

function deleteActiveUser(user) {
    console.log("user funcion deleteActive: " + user);
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

function getActiveUsers() {
    $.ajax({
        url: url + "activeUsersNum",
        method: 'GET',
    }).done(function (data) {
        this.activeUsers = data;
    });
}
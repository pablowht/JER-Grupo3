class Lobby extends Phaser.Scene {

    constructor() {
        super('Lobby');
    }

    init(data)
    {
        this.dataObj = data;
    }

    TextoBuscando;
    TextoEncontrado;
    TextoRaton1;
    TextoRaton2;

    create(){

        //DATA
        this.activePrevUsersNumber = 0;

        url= window.location.href;
        this.user = this.dataObj.user;
        console.log("user: "+this.user)

        //VISUALES
        this.add.image(0,0,'Fondo_Lobby').setOrigin(0, 0);

        this.TextoRaton1 = this.add.image(960.5,390,'Raton1Ingame').setVisible(false);
        this.TextoRaton2 = this.add.image(960.5,390,'Raton2Ingame').setVisible(false);

        this.TextoBuscando = this.add.image(960.5,875,'Texto_Buscando');
        this.tweens.add({
            targets: this.TextoBuscando,
            alpha: 0.2,
            duration: 1400,
            ease: 'Sine.easeOut',
            yoyo: true,
            repeat: -1
        });

        this.TextoEncontrado = this.add.image(960,822,'Texto_Encontrado').setVisible(false);

        //BOTONES
        let BotonVolver = this.add.image(150,150,'Flecha');
        BotonVolver.setInteractive({ cursor: 'pointer' });

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('Menu');
        });

        let BotonJugar = this.add.image(960.5,936.5,'BOTON_JUGAR').setVisible(true);
        BotonJugar.setInteractive({ cursor: 'pointer' });

        BotonJugar.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start('PlayerSelection', {user: this.user, activeUsers: this.activeUsersNumber, activePrevUsers: this.activePrevUsersNumber});
        });

        //NUMERO RATON
        //if(activeUsersNumber === 1)
        //{
        //    id = 0;
        //    playerText.setFrame(0);
        //} else if (activeUsersNumber === 2 && id==null)
        //{
        //    id = 1;
        //    playerText.setFrame(1);
        //}


        //CHAT para evitar errores
        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);

        //ActiveUsers
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
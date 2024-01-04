class CreditsScene extends Phaser.Scene {
    constructor() {
        super("Creditos");
    }

    preload(){}

    create(){
        this.activePrevUsersNumber = 0;

        this.add.image(0,0,'Fondo_Creditos').setOrigin(0, 0);
        this.add.image(950,650,'Nombres');
        this.add.image(950,150,'Titulo');
        this.add.image(1410,530,'RatonM');
        this.add.image(300,650,'RatonB');
        this.add.image(1440,840 ,'RatonG');

        let BotonVolver = this.add.image(150,150,'Flecha');
        BotonVolver.setInteractive({ cursor: 'pointer' });

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("Menu")
        });

        var chat = this.add.dom(1420, 820).createFromCache('chat_html');
        chat.setVisible(false);

        this.textActiveUsers = this.add.text(117, 935, 'Usuarios activos login: ' + this.activeUsersNumber , {
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
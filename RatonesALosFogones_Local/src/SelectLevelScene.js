class SelectLevelScene extends Phaser.Scene {
    constructor() {
        super("LevelSelection");
    }
    init(data){
        this.dataObj = data;
    }
    preload(){

    }
    create(){
        this.raton1 = this.dataObj.colorRaton1;
        this.raton2 = this.dataObj.colorRaton2;

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
        BotonNivel1.setInteractive();

        BotonNivel1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.add.image(0,0, 'PlayersReady').setOrigin(0,0);
            //this.time.delayedCall(7000, this.StartPlaying('LevelOne'),[], this);
            this.time.delayedCall(7000, () => {this.StartPlaying('LevelOne');}, [], this);
            //By using an arrow function (() => { ... }), you ensure that the context (this) is preserved when the function is executed after the delay
        });
        let BotonNivel2 = this.add.image(960.5,795.5,'BotonN2');
        BotonNivel2.setInteractive();

        BotonNivel2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.add.image(0,0, 'PlayersReady').setOrigin(0,0);
            this.time.delayedCall(7000, () => {this.StartPlaying('LevelTwo');}, [], this);
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


    }
    StartPlaying(level){
        this.scene.start(level, {colorRaton1: this.raton1, colorRaton2:this.raton2});
    }

    update(){

    }
}
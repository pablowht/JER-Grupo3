
class PlayerSelectionScene extends Phaser.Scene {


    constructor(numRaton) {
        super("PlayerSelection");
    }
    preload() {}

    p1Ready;
    p2Ready;
    raton1;
    raton2;
    Boton1RatonSelected;
    Boton2RatonSelected;
    RatonGrande1;
    RatonGrande2;
    boton1Pulsado;
    boton2Pulsado;
    ratonGElegido;
    ratonBElegido;
    ratonMElegido;


    create(){
        //Se reinician las variables para que si se vuelve a entrar después de una partida los valores estén correctos
        this.ReiniciarVariables();

        //FONDO
        this.add.image(0,0,'FondoCustom').setOrigin(0, 0);

        //BOTONES
        let BotonP1Listo = this.add.image(300,870,'BotonP1Listo');
        BotonP1Listo.setInteractive();

        let BotonP2Listo = this.add.image(1630,870,'BotonP2Listo');
        BotonP2Listo.setInteractive();

        let BotonVolver = this.add.image(150,100,'Flecha');
        BotonVolver.setInteractive();

        let BotonRatonGris = this.add.image(866,265,'BotonRatonGris');
        BotonRatonGris.setInteractive();
        let BotonRatonBlanco = this.add.image(1200,530,'BotonRatonBlanco');
        BotonRatonBlanco.setInteractive();
        let BotonRatonMarron = this.add.image(866,800,'BotonRatonMarron');
        BotonRatonMarron.setInteractive();

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            this.scene.start("Menu");
        });

        BotonP1Listo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.raton1 !== undefined && this.boton1Pulsado){
                this.BotonP1Listo = this.add.image(300,870,'Boton1ListoPressed');
                this.p1Ready = true;
            }
        });

        BotonP2Listo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.raton2 !== undefined && this.boton2Pulsado){
                this.BotonP2Listo = this.add.image(31630,870,'Boton2ListoPressed');
                this.p2Ready = true;
                this.add.image(0,0, 'PlayersReady').setOrigin(0,0);
                this.time.delayedCall(7000, this.StartPlaying, [], this);
            }
        });
        
        BotonRatonBlanco.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.boton1Pulsado && !this.p1Ready){
                this.Boton1RatonSelected.destroy();
                this.RatonGrande1.destroy();
                this.boton1Pulsado = false;
                this.ratonBElegido = false;
                this.ratonMElegido = false;
                this.ratonGElegido = false;
                return;
            }
            if(this.boton2Pulsado && !this.p2Ready){
                this.Boton2RatonSelected.destroy();
                this.RatonGrande2.destroy();
                this.boton2Pulsado = false;
                return;
            }

            if(!this.p1Ready && !this.boton1Pulsado){
                this.raton1 = "raton_blanco";
                this.RatonGrande1 = this.add.image(300,510,'RatonBlancoGrande');
                this.Boton1RatonSelected = this.add.image(1200,530,'Boton1RatonSeleccionado');
                this.boton1Pulsado = true;
                this.ratonBElegido = true;
            }
            if(this.p1Ready && !this.p2Ready && !this.ratonBElegido){
                this.raton2 = "raton_blanco"
                this.RatonGrande2 = this.add.image(1625,510,'RatonBlancoGrande');
                this.Boton2RatonSelected = this.add.image(1200,530,'Boton2RatonSeleccionado');
                this.boton2Pulsado = true;
            }
        });

        BotonRatonMarron.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.boton1Pulsado && !this.p1Ready){
                this.Boton1RatonSelected.destroy();
                this.RatonGrande1.destroy();
                this.boton1Pulsado = false;
                this.ratonBElegido = false;
                this.ratonMElegido = false;
                this.ratonGElegido = false;
                return;
            }
            if(this.boton2Pulsado && !this.p2Ready){
                this.Boton2RatonSelected.destroy();
                this.RatonGrande2.destroy();
                this.boton2Pulsado = false;
                return;
            }

            if(!this.p1Ready){
                this.raton1 = "raton_marron";
                this.RatonGrande1 = this.add.image(300,510,'RatonMarronGrande');
                this.Boton1RatonSelected = this.add.image(866,800,'Boton1RatonSeleccionado');
                this.boton1Pulsado = true;
                this.ratonMElegido = true;
            }
            if(this.p1Ready && !this.p2Ready && !this.ratonMElegido){
                this.raton2 = "raton_marron";
                this.RatonGrande2 = this.add.image(1625,510,'RatonMarronGrande');
                this.Boton2RatonSelected = this.add.image(866,800,'Boton2RatonSeleccionado');
                this.boton2Pulsado = true;
            }
        });

        BotonRatonGris.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.sound.play('InteractSound');
            if(this.boton1Pulsado && !this.p1Ready){
                this.Boton1RatonSelected.destroy();
                this.RatonGrande1.destroy();
                this.boton1Pulsado = false;
                this.ratonBElegido = false;
                this.ratonMElegido = false;
                this.ratonGElegido = false;
                return;
            }
            if(this.boton2Pulsado && !this.p2Ready){
                this.Boton2RatonSelected.destroy();
                this.RatonGrande2.destroy();
                this.boton2Pulsado = false;
                return;
            }

            if(!this.p1Ready){
                this.raton1 = "raton_gris";
                this.RatonGrande1 = this.add.image(300,510,'RatonGrisGrande');
                this.Boton1RatonSelected = this.add.image(866,265,'Boton1RatonSeleccionado');
                this.boton1Pulsado = true;
                this.ratonGElegido = true;
            }
            if(this.p1Ready && !this.p2Ready && !this.ratonGElegido){
                this.raton2 = "raton_gris"
                this.RatonGrande2 = this.add.image(1625,510,'RatonGrisGrande');
                this.Boton2RatonSelected = this.add.image(866,265,'Boton2RatonSeleccionado');
                this.boton2Pulsado = true;
            }
        });

    }

    StartPlaying(){
        this.scene.start("Game", {colorRaton1: this.raton1, colorRaton2:this.raton2});
    }

    ReiniciarVariables(){
        this.p1Ready = false;
        this.p2Ready = false;
        this.Boton1RatonSelected = false;
        this.Boton2RatonSelected = false;
        this.boton1Pulsado = false;
        this.boton2Pulsado = false;
        this.ratonGElegido = false;
        this.ratonBElegido = false;
        this.ratonMElegido = false;
    }

}
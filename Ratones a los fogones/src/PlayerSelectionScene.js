class PlayerSelectionScene extends Phaser.Scene {

    constructor() {
        super("PlayerSelection");
    }
    preload() {}

    p1Ready = false;
    p2Ready= false;
    raton1;
    raton2;

    create(){
        this.add.image(0,0,'FondoCustom').setOrigin(0, 0);

        let BotonP1Listo = this.add.image(300,870,'BotonP1Listo');
        BotonP1Listo.setInteractive();

        let BotonP2Listo = this.add.image(1630,870,'BotonP2Listo');
        BotonP2Listo.setInteractive();

        let BotonVolver = this.add.image(150,100,'Flecha_volver');
        BotonVolver.setInteractive();

        let BotonRatonGris = this.add.image(866,265,'BotonRatonGris');
        BotonRatonGris.setInteractive();
        let BotonRatonBlanco = this.add.image(1200,530,'BotonRatonBlanco');
        BotonRatonBlanco.setInteractive();
        let BotonRatonMarron = this.add.image(866,800,'BotonRatonMarron');
        BotonRatonMarron.setInteractive();

        BotonVolver.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            //console.log("boton volver creditos");
            this.scene.start("Menu")
        });

        BotonP1Listo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            if(this.raton1 !== undefined){
                this.p1Ready = true;
                //this.scene.start("Game")
            }
        });

        BotonP2Listo.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            if(this.raton2 !== undefined){
                this.p2Ready = true;
                this.scene.start("Game")
            }
        });


        BotonRatonBlanco.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            if(!this.p1Ready){
                this.raton1 = "raton_blanco";
                this.add.image(300,510,'RatonBlancoGrande');
                BotonRatonBlanco = this.add.image(1200,530,'Boton1RatonSeleccionado');
            }
            if(this.p1Ready && !this.p2Ready){
                this.raton2 = "raton_blanco"
                this.add.image(1625,510,'RatonBlancoGrande');
                BotonRatonBlanco = this.add.image(1200,530,'Boton2RatonSeleccionado');
            }

            //this.add.image(300,510,'RatonBlancoGrande');
            //this.add.image(1625,510,'RatonBlancoGrande');
            //console.log("boton volver creditos");
            //this.scene.start("Menu")
        });
        BotonRatonMarron.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.add.image(300,510,'RatonMarronGrande');
            this.add.image(1625,510,'RatonMarronGrande');
            //console.log("boton volver creditos");
            //this.scene.start("Menu")
        });
        BotonRatonGris.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,()=>{
            this.add.image(300,510,'RatonGrisGrande');
            this.add.image(1625,510,'RatonGrisGrande');
            //console.log("boton volver creditos");
            //this.scene.start("Menu")
        });

    }
    update(){

        if(this.p1Ready && this.p2Ready){
            //this.scene.launch("Game");
        }
    }
}
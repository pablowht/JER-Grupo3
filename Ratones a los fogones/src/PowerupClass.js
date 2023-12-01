class PowerupClass {

    constructor(_tipo, _x, _y, _scene) {
        this.tipo = _tipo;
        this.x = _x;
        this.y = _y;
        this.scene = _scene
    }
    loadImages(){
        this.scene.load.image('powerupAmarillo','assets/POWERUPS/QUESO/QuesoAmarillo_12x14.png');
        this.scene.load.image('powerupAzul','assets/POWERUPS/QUESO/QuesoAzul_14x14.png');
        this.scene.load.image('powerupRojo','assets/POWERUPS/QUESO/QuesoRojo_17x16t.png');
    }
    createPhysics(){
        if(this.tipo === 1){
            this.fisicas = this.scene.physics.add.sprite(this.x,this.y,'powerupAmarillo');
            this.fisicas.texture.key = this.tipo;
        }
        else if(this.tipo === 2){
            this.fisicas = this.scene.physics.add.sprite(this.x,this.y,'powerupAzul');
            this.fisicas.texture.key = this.tipo;
        }
        else if(this.tipo === 3) {
            this.fisicas = this.scene.physics.add.sprite(this.x,this.y,'powerupRojo');
            this.fisicas.texture.key = this.tipo;
        }
    }
}
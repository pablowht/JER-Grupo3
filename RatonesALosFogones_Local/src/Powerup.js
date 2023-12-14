class Powerup {

    constructor(_tipo, _x, _y, _scene) {
        this.tipo = _tipo;
        this.x = _x;
        this.y = _y;
        this.scene = _scene
    }

    createPhysics(){
        if(this.tipo === 1){
            this.fisicas = this.scene.physics.add.sprite(this.x,this.y,'powerupRojo');//aumenta la velocidad
            this.fisicas.texture.key = this.tipo;
        }
        else if(this.tipo === 2){
            this.fisicas = this.scene.physics.add.sprite(this.x,this.y,'powerupAzul');//aumenta el salto
            this.fisicas.texture.key = this.tipo;
        }
        else if(this.tipo === 3) {
            this.fisicas = this.scene.physics.add.sprite(this.x,this.y,'powerupAmarillo');//inmunidad ante obstaculos
            this.fisicas.texture.key = this.tipo;
        }
    }
}
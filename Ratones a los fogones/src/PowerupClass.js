class PowerupClass {

    constructor(_tipo, _x, _y) {
        this.tipo = _tipo;
        this.x = _x;
        this.y = _y;
    }
    loadImages(escena){
        if(this.tipo === 1) escena.load.image('powerupAmarillo','assets/POWERUPS/QUESO/QuesoAmarillo_12x14.png');
        if(this.tipo === 2) escena.load.image('powerupAzul','assets/POWERUPS/QUESO/QuesoAzul_14x14.png');
        if(this.tipo === 3) escena.load.image('powerupRojo','assets/POWERUPS/QUESO/QuesoRojo_17x16t.png');
    }
    addSprites(escena){
        if(this.tipo === 1){
            escena.add.image(this.x, this.y, 'powerupAmarillo');
        }
        else if(this.tipo === 2){
            escena.add.image( this.x, this.y, 'powerupAzul');
        }
        else if(this._tipo === 3) {
            escena.add.image( this.x, this.y, 'powerupRojo',);
        }
    }
}
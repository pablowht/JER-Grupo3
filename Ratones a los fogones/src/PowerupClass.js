class PowerupClass{
    constructor(tipo, x, y) {
        this._tipo = tipo;
        this._x = x;
        this._y =y;
    }
    loadImages(escena){
        console.log("loading imgs");
        if(this._tipo === 1) escena.load.image('powerupAmarillo','assets/POWERUPS/QUESO/QuesoAmarillo_12x14.png');
        if(this._tipo === 2) escena.load.image('powerupAzul','assets/POWERUPS/QUESO/QuesoAzul_14x14.png');
        if(this._tipo === 3) escena.load.image('powerupRojo','assets/POWERUPS/QUESO/QuesoRojo_17x16t.png');
    }

    addSprites(escena){
        console.log("tipo"+this._tipo);

        if(this._tipo == 1){
            console.log("locating img amarilla");
            //escena.add.image(this._x, this._y, 'powerupAmarillo');
            return escena.physics.add.sprite(this._x,this._y,'powerupAmarillo');
        }
        else if(this._tipo == 2){
            console.log("locating img azul");
            //escena.add.image( this._x, this._y, 'powerupAzul');
            return escena.physics.add.sprite(this._x,this._y,'powerupAzul');
        }
        else if(this._tipo == 3) {
            //escena.add.image( this._x, this._y, 'powerupRojo',);
            return escena.physics.add.sprite(this._x,this._y,'powerupRojo');
        }
    }



    //this.physics.add.overlap(player, stars, collectStar, null, this);//para saber si el personaje superpone alguna estrella -> que la recolecta,
}
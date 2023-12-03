class PlayerClass {

    constructor(_playerNumber, _x, _y, _velocity, _jumpAmount, _scene) {
        this.playerNumber = _playerNumber;
        this.x = _x;
        this.y = _y;
        this.velocity = _velocity;
        this.jumpAmount = _jumpAmount;
        this.scene = _scene;
        this.colliderObstaculosPlayer = null;
        this.isRecolected = false;
        this.powerUpRecolectedType = null;
        this.timedEvent = null;
        this.color = null;
        this.initialVelocity = _velocity;
        this.wasCollided = false;
        this.fisicas = null;
    }

    assignControls(){
        if(this.playerNumber == 1){
            this.flechaIzquierda = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.flechaDerecha = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.flechaArriba = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.flechaAbajo = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        }
        else if(this.playerNumber == 2) {
            this.flechaDerecha = this.scene.input.keyboard.createCursorKeys().right;
            this.flechaIzquierda = this.scene.input.keyboard.createCursorKeys().left;
            this.flechaArriba = this.scene.input.keyboard.createCursorKeys().up;
            this.flechaAbajo = this.scene.input.keyboard.createCursorKeys().down;
        }
    }

    loadSpriteSheets(){
        this.scene.load.spritesheet('raton_gris','ASSETS/RATONES/SpriteSheets/Raton_Gris.png',{ frameWidth: 32, frameHeight: 32 } );
        this.scene.load.spritesheet('raton_blanco','ASSETS/RATONES/SpriteSheets/Raton_Blanco.png',{ frameWidth: 32, frameHeight: 32 } );
        this.scene.load.spritesheet('raton_marron','ASSETS/RATONES/SpriteSheets/Raton_Marron.png',{ frameWidth: 32, frameHeight: 32 } );
    }

    createAnimsPlayer(){
        //Animaciones
        this.scene.anims.create({
            key: 'idle'+this.playerNumber,
            frames: this.scene.anims.generateFrameNumbers(this.color, { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'walk'+this.playerNumber,
            frames: this.scene.anims.generateFrameNumbers(this.color, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'jump'+this.playerNumber,
            frames: this.scene.anims.generateFrameNumbers(this.color, { start: 7, end: 8 }),
            frameRate: 10
        });
        this.scene.anims.create({
            key: 'down'+this.playerNumber,
            frames: this.scene.anims.generateFrameNumbers(this.color, { start: 9, end: 10 }),
            frameRate: 5
        });
        this.scene.anims.create({
            key: 'hurt'+this.playerNumber,
            frames: this.scene.anims.generateFrameNumbers(this.color, 11 ),
            frameRate: 10
        });
    }

    createPhysics(){
        this.fisicas = this.scene.physics.add.sprite(this.x, this.y, this.color, 0); 
        this.fisicas.setCollideWorldBounds(true);
        this.fisicas.body.setGravityY(500);
        this.fisicas.texture.key = this.playerNumber;
    }

    establishColliderObj(obj){
        this.scene.physics.add.collider(this.fisicas, obj);
    }

    establishColliderObstacles(obj){
        this.colliderObstaculosPlayer = this.scene.physics.add.collider(this.fisicas, obj);
        this.obstaculos = obj;
    }

    movementControlsPlayer() {
        //CONTROLES MOVIMIENTO PLAYER 1
        if (this.flechaIzquierda.isDown) {
            this.fisicas.setVelocityX(-this.velocity);
            this.fisicas.play('walk'+this.playerNumber, true);
            this.fisicas.flipX = true;
        } else if (this.flechaDerecha.isDown) {
            this.fisicas.setVelocityX(this.velocity);
            this.fisicas.play('walk'+this.playerNumber, true);
            this.fisicas.flipX = false;
        } else {
            this.fisicas.setVelocityX(0);
            this.fisicas.play('idle'+this.playerNumber, true);
        }
        if (this.flechaArriba.isDown && this.fisicas.body.touching.down) {
            this.fisicas.setVelocityY(this.jumpAmount);
            this.fisicas.play('jump'+this.playerNumber, true);
        }
        if (this.flechaAbajo.isDown) {
            this.fisicas.play('down'+this.playerNumber, true);
        }
    }

    update(time, delta){
        this.movementControlsPlayer();

        if(this.isRecolected === true){

            this.timedEvent += delta;
            if(this.timedEvent >= 5000){
                this.removePowerUp();
                this.timedEvent = 0;
            }
        }

        if(this.wasCollided === true){
            this.timedEvent += delta;
            if(this.timedEvent >= 2000){
                this.removePenaltization();
                this.timedEvent = 0;
            }
        }
    }

    gestionPowerUp(obj){
        this.isRecolected = true;
        this.powerUpRecolectedType = obj.texture.key;
        if(obj.texture.key === 1) {
            this.fisicas.setTint(0xFF9728);
            this.velocity += 50;
        }
        else if(obj.texture.key === 2) {
            this.fisicas.setTint(0x1FBBFF);
            this.jumpAmount -= 100;
        }
        else {
            this.fisicas.setTint(0xFFF51F);
            this.scene.physics.world.removeCollider(this.colliderObstaculosPlayer);
        }
    }

    removePowerUp(){
        this.scene.sound.play('PowerUpGoneSound');
        this.isRecolected = false;
        this.fisicas.clearTint();
        if(this.powerUpRecolectedType === 1) {
            this.velocity -= 50;
            console.log("velocity of")
        }
        else if(this.powerUpRecolectedType === 2) {
            this.jumpAmount += 100;
            console.log("jump of")
        }
        else {
            this.establishColliderObstacles(this.obstaculos);
            console.log("obstacles of")
        }
    }

    gestionCollision(obj){
        this.fisicas.setTint(0xC71E1E );
        this.velocity -= 15;
        this.wasCollided = true;
    }

    removePenaltization(){
        this.fisicas.clearTint();
        this.velocity = this.initialVelocity;
        this.wasCollided = false;
    }
}
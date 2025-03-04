class LoadingScene extends Phaser.Scene {

    constructor() {
        super("Loading");
    }
    preload() {

        //FONDO Y BARRA QUE MUESTRAN LA CARGA DE LOS ASSETS
        this.add.image(0,0,'Fondo_Loading').setOrigin(0,0);
        let progressBar = this.add.image(960,497,'Barra_Loading');

        this.load.on('progress', function (value) {
            progressBar.setCrop(0 ,0, progressBar.width * value, progressBar.height);
        });

        //Menu Seleccion de Nivel
        this.load.image('FondoSeleccionNiveles', '../assets/INTERFACES/LevelSelection/LevelSelection_Fondo.png');
        this.load.image('BotonN1', '../assets/INTERFACES/LevelSelection/Boton_Nivel_1.png');
        this.load.image('BotonN2', '../assets/INTERFACES/LevelSelection/Boton_Nivel_2.png');
        this.load.image('MemeN1', '../assets/INTERFACES/LevelSelection/Meme_Guiso_1470_795.png');
        this.load.image('MemeN2', '../assets/INTERFACES/LevelSelection/Meme_Ratita_452_530.png');
        this.load.image('BotonCubiertos', '../assets/INTERFACES/LevelSelection/Cubiertos.png');
        this.load.image('AlaboProfes', '../assets/INTERFACES/LevelSelection/AlaboProfes.png');

        //Menu de Inicio
        this.load.image('Fondo_Menu','../assets/INTERFACES/Menu/Fondo_Menu.png');
        this.load.image('BOTON_AJUSTES','../assets/INTERFACES/Menu/BOTON_AJUSTES.png');
        this.load.image('BOTON_CREDITOS','../assets/INTERFACES/Menu/BOTON_CREDITOS .png');
        this.load.image('BOTON_JUGAR','../assets/INTERFACES/Menu/BOTON_JUGAR.png');
        this.load.image('BOTON_USUARIO','../assets/INTERFACES/Menu/BOTON_USUARIO.png');

        //Menu de Pausa
        this.load.image('FondoPausa', '../assets/INTERFACES/Pause/FONDOPAUSA.png');
        this.load.image('BotonSalir', '../assets/INTERFACES/Pause/BOTON_SALIR.png');
        this.load.image('BotonContinuar', '../assets/INTERFACES/Pause/BOTON_CONTINUAR.png');
        this.load.image('BotonSonido','../assets/INTERFACES/Pause/BOTON_SONIDO.png');
        this.load.image('BotonMute','../assets/INTERFACES/Pause/BOTON_MUTE.png');

        //InGame
        this.load.image('BarraDivisoria', '../assets/INTERFACES/InGame/BarraDivisoriaMorada.png');
        this.load.image('Raton1Ingame', '../assets/INTERFACES/InGame/Raton1_Ingame.png');
        this.load.image('Raton2Ingame', '../assets/INTERFACES/InGame/Raton2_Ingame.png');
        //Level Two
        this.load.image('Cacerola','../assets/obstaculos/Cacerola.png');

        //GameOver
        this.load.image('FondoGameOver','../assets/INTERFACES/LevelEnd/Fondo_FinDeNivel.png');
        this.load.image('Boton_Menu','../assets/INTERFACES/LevelEnd/BOTON_MENU.png');
        this.load.image('Boton_Niveles','../assets/INTERFACES/LevelEnd/Boton_Niveles.png');
        this.load.image('RatónGanadorB','../assets/INTERFACES/LevelEnd/RatonBlanco_Winner.png');
        this.load.image('RatónPerdedorB','../assets/INTERFACES/LevelEnd/RatonBlanco_Loser.png');
        this.load.image('RatónGanadorM','../assets/INTERFACES/LevelEnd/RatonMarron_Winner.png');
        this.load.image('RatónPerdedorM','../assets/INTERFACES/LevelEnd/RatonMarron_Loser.png');
        this.load.image('RatónGanadorG','../assets/INTERFACES/LevelEnd/RatonGris_Winner.png');
        this.load.image('RatónPerdedorG','../assets/INTERFACES/LevelEnd/RatonGris_Loser.png');
        this.load.image('RecuadroTextos','../assets/INTERFACES/LevelEnd/Recuadro_JugadoresGanadores.png');

        this.load.image('TextoGana1', '../assets/INTERFACES/LevelEnd/TextoGanar_Player1.png');
        this.load.image('TextoGana2', '../assets/INTERFACES/LevelEnd/TextoGanar_Player2.png');

        this.load.image('TextoPierde1', '../assets/INTERFACES/LevelEnd/TextoPerder_Player1.png');
        this.load.image('TextoPierde2', '../assets/INTERFACES/LevelEnd/TextoPerder_Player2.png');

        //Creditos
        this.load.image('Fondo_Creditos','../assets/INTERFACES/Interfaces_FondoRallado.png');
        this.load.image('Flecha','../assets/INTERFACES/Interfaces_Botón_Retroceso.png');
        this.load.image('Nombres','../assets/INTERFACES/Credits/Nombres.png');
        this.load.image('Titulo','../assets/INTERFACES/Credits/Titulo_Creditos.png');
        this.load.image('RatonB','../assets/INTERFACES/Credits/Cabeza_RatonBlanco.png');
        this.load.image('RatonM','../assets/INTERFACES/Credits/Cabeza_RatonMarron.png');
        this.load.image('RatonG','../assets/INTERFACES/Credits/Cabeza_RatonGris.png');

        //RATONES
        this.load.spritesheet('raton_gris','../assets/RATONES/SpriteSheets/Raton_Gris.png',{ frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('raton_blanco','../assets/RATONES/SpriteSheets/Raton_Blanco.png',{ frameWidth: 32, frameHeight: 32 } );
        this.load.spritesheet('raton_marron','../assets/RATONES/SpriteSheets/Raton_Marron.png',{ frameWidth: 32, frameHeight: 32 } );

        //POWERUPS
        this.load.image('powerupAmarillo','../assets/POWERUPS/QUESO/QuesoAmarillo_12x14.png');
        this.load.image('powerupAzul','../assets/POWERUPS/QUESO/QuesoAzul_14x14.png');
        this.load.image('powerupRojo','../assets/POWERUPS/QUESO/QuesoRojo_17x16t.png');

        //Personalizacion de personajes
        this.load.image('FondoCustom', '../assets/INTERFACES/PlayerSelection/Fondo_SeleccionPersonaje.png');
        this.load.image('BotonP1Listo', '../assets/INTERFACES/PlayerSelection/Boton_P1_Listo.png');
        this.load.image('BotonP2Listo', '../assets/INTERFACES/PlayerSelection/Boton_P2_Listo.png');
        this.load.image('BotonRatonBlanco', '../assets/INTERFACES/PlayerSelection/Boton_RatonBlanco.png');
        this.load.image('BotonRatonGris', '../assets/INTERFACES/PlayerSelection/Boton_RatonGris.png');
        this.load.image('BotonRatonMarron', '../assets/INTERFACES/PlayerSelection/Boton_RatonMarron.png');
        this.load.image('RatonBlancoGrande', '../assets/INTERFACES/PlayerSelection/RatonBlanco_Grande.png');
        this.load.image('RatonGrisGrande', '../assets/INTERFACES/PlayerSelection/RatonGris_Grande.png');
        this.load.image('RatonMarronGrande', '../assets/INTERFACES/PlayerSelection/RatonMarron_Grande.png');
        this.load.image('Boton1RatonSeleccionado', '../assets/INTERFACES/PlayerSelection/Boton1_RatonSeleccionado.png');
        this.load.image('Boton2RatonSeleccionado', '../assets/INTERFACES/PlayerSelection/Boton2_RatonSeleccionado.png');
        this.load.image('Boton1ListoPressed', '../assets/INTERFACES/PlayerSelection/BotonP_P1_Listo.png');
        this.load.image('Boton2ListoPressed', '../assets/INTERFACES/PlayerSelection/BotonP_P2_Listo.png');
        this.load.image('PlayersReady', '../assets/INTERFACES/PlayersReadyBackground.png');

        //Mapa Nivel1
        this.load.image('techoMapa', '../assets/TILES/MAPAS/Nivel1/Tope_techo_3200x27.png');
        this.load.image('techoMapa2', '../assets/TILES/MAPAS/Nivel1/Tope_techo_444x129.png');
        this.load.image('sueloMapa1', '../assets/TILES/MAPAS/Nivel1/Tope_Suelo_M1_1600x6.png');
        this.load.image('paredesMapa1', '../assets/TILES/MAPAS/Nivel1/Tope_paredes_324x122.png');
        this.load.image('sueloMapa2', '../assets/TILES/MAPAS/Nivel1/Tope_Suelo_M2_1202x6.png');
        this.load.image('paredMapa2', '../assets/TILES/MAPAS/Nivel1/Tope_Suelo_M2_610x44.png');
        this.load.image('sueloMapa2N2', '../assets/TILES/MAPAS/Nivel1/Tope_Suelo_M2_3_212x53.png');
        this.load.image('sueloMapa2N3', '../assets/TILES/MAPAS/Nivel1/Tope_Suelo_M2_3_404x91.png');

        //Mapa Nivel2
        this.load.image('mapa2', '../assets/TILES/MAPAS/Nivel2/Mapa_N2.png');
        this.load.image('techoMapa_N2', '../assets/TILES/MAPAS/Nivel2/Techo_N2_1.png');
        this.load.image('techoMapa2_N2', '../assets/TILES/MAPAS/Nivel2/Techo_N2_2.png');
        this.load.image('suelo1_N2', '../assets/TILES/MAPAS/Nivel2/Colision_N2_1.png');
        this.load.image('suelo2_N2', '../assets/TILES/MAPAS/Nivel2/Colision_N2_1.5.png');
        this.load.image('suelo3_N2', '../assets/TILES/MAPAS/Nivel2/Colision_N2_2.png');
        this.load.image('suelo4_N2', '../assets/TILES/MAPAS/Nivel2/Colision_N2_3.png');
        this.load.image('suelo5_N2', '../assets/TILES/MAPAS/Nivel2/Colision_N2_4.png');

        //Meta
        this.load.image('Meta', '../assets/TILES/MAPAS/Meta_N1_39x199.png');

        this.load.image('sueloMapa3', '../assets/TILES/MAPAS/Nivel1/Tope_Suelo_M3.1_1091x6.png');
        this.load.image('sueloMapa3N1', '../assets/TILES/MAPAS/Nivel1/Tope_Suelo_M3.2_193x75.png');
        this.load.image('sueloMapa3N2', '../assets/TILES/MAPAS/Nivel1/Tope_Suelo_M3.3_322x59.png');
        this.load.image('mapa1', '../assets/TILES/MAPAS/Nivel1/mapa1y2_V2_3200x310.png');

        //PLATAFORMAS
        this.load.image('armarioBajo1', '../assets/TILES/ARMARIOS_BAJOS/Tiles_Armario_2Puertas_2.png');
        this.load.image('armarioBajo2', '../assets/TILES/ARMARIOS_BAJOS/Tiles_Armario_3Cajones_2.png');
        this.load.image('armarioBajo3', '../assets/TILES/ARMARIOS_BAJOS/Tiles_Armario_CajonPuerta_2.png');
        this.load.image('armarioBajo4', '../assets/TILES/ARMARIOS_BAJOS/Tiles_Armario_2Cajones_2.png');
        this.load.image('armarioBajo5', '../assets/TILES/ARMARIOS_BAJOS/Tiles_Armario_Puerta_2.png');
        this.load.image('armarioBajo6', '../assets/TILES/ARMARIOS_BAJOS/Tiles_Armario_PuertaTablaCortar_2.png');

        this.load.image('armarioAlto1', '../assets/TILES/ARMARIOS_ALTOS/Tiles_Armario_Alto_1Puerta_2.png');
        this.load.image('armarioAlto2', '../assets/TILES/ARMARIOS_ALTOS/Tiles_Armario_Alto_2Puertas_2.png');

        //OBSTACULOS ESTATICOS NIVEL 1
        this.load.image('CascaraPlatano', '../assets/obstaculos/Cascara_Platano.png');
        this.load.image('TrampaRatones', '../assets/obstaculos/MouseTrapR_48x18.png');
        this.load.spritesheet('Fogon', '../assets/obstaculos/Fogon_25x55.png', {frameWidth: 25, frameHeight: 55});

        //MUSICA
        this.load.audio('RaceMusic', ['../assets/AUDIO/Race_Music.ogg', '/ASSETS/AUDIO/Race_Music.mp3']);
        this.load.audio('MenuMusic', ['../assets/AUDIO/Menu_Music.ogg', '/ASSETS/AUDIO/Menu_Music.mp3']);
        this.load.audio('InteractSound', '../assets/AUDIO/Interact_Sound.ogg');
        this.load.audio('HurtSound', '../assets/AUDIO/Hurt_Sound.ogg');
        this.load.audio('PowerUpGoneSound', '../assets/AUDIO/PowerUp_Gone.ogg');
        this.load.audio('PowerUpGrabSound', '../assets/AUDIO/PowerUp_Grab.ogg');
        this.load.audio('GameEndSound', '../assets/AUDIO/GameEnd_Sound.ogg');
    }

    create(){
        this.sound.play('MenuMusic', {loop:true});
        this.scene.start('Menu');
    }
}
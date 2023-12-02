class LoadingScene extends Phaser.Scene {

    constructor() {
        super("Loading");
    }
    preload() {
        let background = this.add.image(0,0,'Fondo_Loading').setOrigin(0,0);
        let progressBar = this.add.image(960,497,'Barra_Loading');

        this.load.on('progress', function (value) {
            console.log("Cargando");
            progressBar.setCrop(0 ,0, progressBar.width * value, progressBar.height);
        });

        //Menu de Inicio
        this.load.image('Fondo_Menu','ASSETS/INTERFACES/Menu/Fondo_Menu.png');
        this.load.image('BOTON_AJUSTES','ASSETS/INTERFACES/Menu/BOTON_AJUSTES.png');
        this.load.image('BOTON_CREDITOS','ASSETS/INTERFACES/Menu/BOTON_CREDITOS .png');
        this.load.image('BOTON_JUGAR','ASSETS/INTERFACES/Menu/BOTON_JUGAR.png');

        //Menu de Pausa
        this.load.image('FondoPausa', 'ASSETS/INTERFACES/Pause/FONDOPAUSA.png');
        this.load.image('BotonSalir', 'ASSETS/INTERFACES/Pause/BOTON_SALIR.png');
        this.load.image('BotonContinuar', 'ASSETS/INTERFACES/Pause/BOTON_CONTINUAR.png');
        this.load.image('BotonSonido','ASSETS/INTERFACES/Pause/BOTON_SONIDO.png');
        this.load.image('BotonMute','ASSETS/INTERFACES/Pause/BOTON_MUTE.png');

        //GameOver
        this.load.image('FondoGameOver','ASSETS/INTERFACES/LevelEnd/Fondo_FinDeNivel.png');
        this.load.image('Boton_Salir','ASSETS/INTERFACES/LevelEnd/Boton_Salir.png');
        this.load.image('RatónGanadorB','ASSETS/INTERFACES/LevelEnd/RatonBlanco_Winner.png');
        this.load.image('RatónPerdedorB','ASSETS/INTERFACES/LevelEnd/RatonBlanco_Loser.png');
        this.load.image('RatónGanadorM','ASSETS/INTERFACES/LevelEnd/RatonMarron_Winner.png');
        this.load.image('RatónPerdedorM','ASSETS/INTERFACES/LevelEnd/RatonMarron_Loser.png');
        this.load.image('RatónGanadorG','ASSETS/INTERFACES/LevelEnd/RatonGris_Winner.png');
        this.load.image('RatónPerdedorG','ASSETS/INTERFACES/LevelEnd/RatonGris_Loser.png');

        this.load.image('TextoGana1', 'ASSETS/INTERFACES/LevelEnd/TextoGanar_Player1.png');
        this.load.image('TextoGana2', 'ASSETS/INTERFACES/LevelEnd/TextoGanar_Player2.png');

        this.load.image('TextoPierde1', 'ASSETS/INTERFACES/LevelEnd/TextoPerder_Player1.png');
        this.load.image('TextoPierde2', 'ASSETS/INTERFACES/LevelEnd/TextoPerder_Player2.png');

        //Creditos
        this.load.image('Fondo_Creditos','ASSETS/INTERFACES/Interfaces_FondoRallado.png');
        this.load.image('Flecha','ASSETS/INTERFACES/Interfaces_Botón_Retroceso.png');
        this.load.image('Nombres','ASSETS/INTERFACES/Credits/Nombres.png');
        this.load.image('Titulo','ASSETS/INTERFACES/Credits/Titulo_Creditos.png')

        //Personalizacion de personajes
        this.load.image('FondoCustom', 'ASSETS/INTERFACES/PlayerSelection/Fondo_SeleccionPersonaje.png');
        this.load.image('BotonP1Listo', 'ASSETS/INTERFACES/PlayerSelection/Boton_P1_Listo.png');
        this.load.image('BotonP2Listo', 'ASSETS/INTERFACES/PlayerSelection/Boton_P2_Listo.png');
        this.load.image('BotonRatonBlanco', 'ASSETS/INTERFACES/PlayerSelection/Boton_RatonBlanco.png');
        this.load.image('BotonRatonGris', 'ASSETS/INTERFACES/PlayerSelection/Boton_RatonGris.png');
        this.load.image('BotonRatonMarron', 'ASSETS/INTERFACES/PlayerSelection/Boton_RatonMarron.png');
        this.load.image('RatonBlancoGrande', 'ASSETS/INTERFACES/PlayerSelection/RatonBlanco_Grande.png');
        this.load.image('RatonGrisGrande', 'ASSETS/INTERFACES/PlayerSelection/RatonGris_Grande.png');
        this.load.image('RatonMarronGrande', 'ASSETS/INTERFACES/PlayerSelection/RatonMarron_Grande.png');
        this.load.image('Boton1RatonSeleccionado', 'ASSETS/INTERFACES/PlayerSelection/Boton1_RatonSeleccionado.png');
        this.load.image('Boton2RatonSeleccionado', 'ASSETS/INTERFACES/PlayerSelection/Boton2_RatonSeleccionado.png');
        this.load.image('Boton1ListoPressed', 'ASSETS/INTERFACES/PlayerSelection/BotonP_P1_Listo.png');
        this.load.image('Boton2ListoPressed', 'ASSETS/INTERFACES/PlayerSelection/BotonP_P2_Listo.png');
        this.load.image('PlayersReady', 'ASSETS/INTERFACES/PlayersReadyBackground.png');

        //Mapa
        this.load.image('techoMapa', 'assets/tiles/MAPAS/Tope_techo_3200x27.png');
        this.load.image('techoMapa2', 'assets/tiles/MAPAS/Tope_techo_444x129.png');
        this.load.image('sueloMapa1', 'assets/tiles/MAPAS/Tope_Suelo_M1_1600x6.png');
        this.load.image('paredesMapa1', 'assets/tiles/MAPAS/Tope_paredes_324x122.png');
        this.load.image('sueloMapa2', 'assets/tiles/MAPAS/Tope_Suelo_M2_1202x6.png');
        this.load.image('paredMapa2', 'assets/tiles/MAPAS/Tope_Suelo_M2_610x44.png');
        this.load.image('sueloMapa2N2', 'assets/tiles/MAPAS/Tope_Suelo_M2_3_212x53.png');
        this.load.image('sueloMapa2N3', 'assets/tiles/MAPAS/Tope_Suelo_M2_3_404x91.png');
        //Meta
        this.load.image('Meta', 'ASSETS/TILES/MAPAS/Meta_N1_39x199.png');


        this.load.image('sueloMapa3', 'assets/tiles/MAPAS/Tope_Suelo_M3.1_1091x6.png');
        this.load.image('sueloMapa3N1', 'assets/tiles/MAPAS/Tope_Suelo_M3.2_193x75.png');
        this.load.image('sueloMapa3N2', 'assets/tiles/MAPAS/Tope_Suelo_M3.3_322x59.png');

        //this.load.image('tile_pared', 'assets/tiles/Tiles_Pared.png');
        //this.load.image('mapa3', 'assets/tiles/MAPAS/mapa3_V4_1600x310.png');
        //this.load.image('mapa2', 'assets/tiles/MAPAS/mapa2_V4_1600x310.png');
        //this.load.image('mapa1', 'assets/tiles/MAPAS/mapa1_V4_1600x310.png');
        this.load.image('mapa1', 'assets/tiles/MAPAS/mapa1y2_V2_3200x310.png');

        //PLATAFORMAS
        this.load.image('armarioBajo1', 'assets/tiles/ARMARIOS_BAJOS/Tiles_Armario_2Puertas_2.png');
        this.load.image('armarioBajo2', 'assets/tiles/ARMARIOS_BAJOS/Tiles_Armario_3Cajones_2.png');
        this.load.image('armarioBajo3', 'assets/tiles/ARMARIOS_BAJOS/Tiles_Armario_CajonPuerta_2.png');
        this.load.image('armarioBajo4', 'assets/tiles/ARMARIOS_BAJOS/Tiles_Armario_2Cajones_2.png');
        this.load.image('armarioBajo5', 'assets/tiles/ARMARIOS_BAJOS/Tiles_Armario_Puerta_2.png');
        this.load.image('armarioBajo6', 'assets/tiles/ARMARIOS_BAJOS/Tiles_Armario_PuertaTablaCortar_2.png');

        this.load.image('armarioAlto1', 'assets/tiles/ARMARIOS_ALTOS/Tiles_Armario_Alto_1Puerta_2.png');
        this.load.image('armarioAlto2', 'assets/tiles/ARMARIOS_ALTOS/Tiles_Armario_Alto_2Puertas_2.png');

        //OBSTACULOS ESTATICOS NIVEL 1
        this.load.image('CascaraPlatano', 'ASSETS/OBSTACULOS/Cascara_Platano.png');
        this.load.image('TrampaRatones', 'ASSETS/OBSTACULOS/MouseTrapR_48x18.png');
        this.load.spritesheet('Fogon', 'ASSETS/OBSTACULOS/Fogon_25x55.png', {frameWidth: 25, frameHeight: 55});

        //MUSICA
        this.load.audio('RaceMusic', ['/ASSETS/AUDIO/Race_Music.ogg', '/ASSETS/AUDIO/Race_Music.mp3']);
        this.load.audio('MenuMusic', ['/ASSETS/AUDIO/Menu_Music.ogg', '/ASSETS/AUDIO/Menu_Music.mp3']);
        this.load.audio('InteractSound', '/ASSETS/AUDIO/Interact_Sound.ogg');
        this.load.audio('HurtSound', '/ASSETS/AUDIO/Hurt_Sound.ogg');
        this.load.audio('PowerUpGoneSound', '/ASSETS/AUDIO/PowerUp_Gone.ogg');
        this.load.audio('PowerUpGrabSound', '/ASSETS/AUDIO/PowerUp_Grab.ogg');
    }

    create(){
        this.scene.start("Menu");
    }


}
## Ratones a los fogones
### Repositorio de GitHub para la asignatura de Juegos en Red del grupo 3. Curso 2023-24.
___
• **Nombre del juego**: Ratones a los fogones  
• **Descripción de la temática del juego**: Ratones a los fogones es un juego de carreras con plataformas en el que dos ratones deberán competir por ser el primero en salir de la cocina.  
• **Integrantes del equipo de desarrollo**:   
- Pablo García Núñez   
Correo Institucional: p.garcian.2021@alumnos.urjc.es  
Cuenta de GitHub: https://github.com/pablowht  
- Laura Méndez García-Brioles  
Correo Institucional: l.mendez.2021@alumnos.urjc.es  
Cuenta de GitHub: https://github.com/lmendez00  
- Paula Alejandra Peralbo Avilés  
Correo Institucional: pa.peralbo.2021@alumnos.urjc.es  
Cuenta de GitHub: https://github.com/uapli    
- Isabel Villoria López  
Correo Institucional: i.villoria.2021@alumnos.urjc.es  
Cuenta de GitHub: https://github.com/isita12345
___
### Instrucciones para la ejecución del juego ###    
Para levantar el servidor: 
1. Extraer el código fuente del .zip
2. Copiar la ruta del archivo .jar
3. Abrir la consola (Windows + R y dentro cmd)
4. Escribir 'cd' + la ruta anteriormente copiada
5. Escribir 'java -jar RatonesALosFogones_Spring-0.0.1-SNAPSHOT.jar'

Para ejecutarlo: 
1. Abrir nuevamente la consola y escribir 'ipconfig'
2. Obtener la Dirección IPv4 y copiarla
3. Ir al navegador que se prefiera, copiar la IP del servidor, y seguidamente escribir ':8080'

___
### Documento del Diseño del Videojuego ###
___
### Cambios ###  
Cambios con respecto a versiones anteriores:
Versión Fase 2:
1. Referencias de juegos similares
2. Cambio de imágenes de las interfaces por las definitivas
3. Imágenes de los objetos incluidas
4. Actualizaciones de cambios en las mecánicas de los niveles
Versión Fase 3:
5. Actualizaciones de las interfaces para incluir las nuevas funcionalidades
6. Login, cambiar contraseña, eliminar cuenta y usuarios activos
7. Creación de un servidor con Spring
8. Funcionalidades con API Rest
___
### Introducción ###  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/6fd14212-b270-4b98-8996-3d5124b252ef">
 <br><br>
</p>

**Ratones a los fogones** es un videojuego para PC de modalidad multijugador, en concreto de dos jugadores, e implementará en el lado del servidor Java con SpringBoot y en el lado del cliente JavaScript con el framework Phaser 3. Este escrito tiene como objetivo principal plasmar los elementos que debe incluir **Ratones a los fogones** y servir de carta de presentación en caso de buscar colaboradores en un futuro.

**1. Concepto del juego**  
**Ratones a los fogones** es un videojuego de dos jugadores en el que cada uno controla un pequeño ratón antropomórfico que debe salir de la cocina antes de ser atrapado. Ambos competirán para ser el primero en llegar a la puerta, esquivando por el camino todo tipo de obstáculos e intentando huir antes de que se acabe el tiempo.

**2. Características principales**  
Las características principales del juego son:  
*	Competición: **Ratones a los fogones** principalmente se centra en la competitividad que se crea al jugar a un juego multijugador contra un amigo.  
*	Simpleza: El estilo de **Ratones a los fogones** es llamativo y la historia simple, para que el jugador se centre en el objetivo del juego sin tener distracciones.   
*	Fluidez: El movimiento del personaje debe ser agradable para el jugador, ya que un manejo complicado puede ser molesto a la hora de jugar un juego competitivo.  
*	Dificultad: **Ratones a los fogones** consta de 3 niveles, a cada cual con un mayor nivel de dificultad.  
  
**3. Género**  
El género principal de Ratones a los fogones es de plataformas. En este género los jugadores avanzan por el escenario evitando obstáculos de cualquier forma (saltando, agachándose, etc.).  
Al género plataformas se añade el de juegos de carreras, donde el principal objetivo es alcanzar la meta antes que el contrincante. De esta forma, mezclando los dos géneros, se consigue un juego competitivo y multijugador, donde la forma de alcanzar el objetivo es esquivando obstáculos.  
**4. Propósito y público objetivo**  
El principal objetivo de Ratones a los fogones es ofrecer un entretenimiento en pareja para desconectar y pasar un rato divertido. No busca tener un gran trasfondo o mensaje detrás, sino ofrecer un momento de distracción para pasarlo entre amigos.  
Ratones a los fogones está dirigido a jugadores de un amplio rango de edades sin demasiado tiempo que poder dedicar al ocio en el día a día. Es por ello por lo que se apuesta por un sistema de partidas cortas y recompensas rápidas, incentivando la rejugabilidad y una competición sana entre amigos. Alienta a poder jugar de forma esporádica en los tiempos libres.  
**5. Jugabilidad**  
Ratones a los fogones está formado por tres niveles con diferente complejidad. La principal motivación es salir el primero de la cocina, esquivando obstáculos y, perjudicando al otro jugador mediante power-ups. Para que sea posible se encuentran diferentes elementos:  
1.	Movilidad: cada personaje será controlado por un jugador. Los movimientos que se pueden realizar son: desplazamiento lateral, salto y agacharse. De esta manera se esquivarán los obstáculos y/o se cogerán los power-ups.  
2.	Obstáculos: objetos que el jugador debe esquivar. Si no se hace, el personaje se ralentizará obteniendo una desventaja frente a su contrincante. Además, habrá dos tipos de obstáculos: estáticos y dinámicos. 
3.	Power-ups: tendrán una posición fija en cada nivel. La finalidad de estos es beneficiarse o perjudicar al adversario.
 
**6. Estilo Visual y Referencias**  
Ratones a los fogones es un juego de estilo simple y pixel art parecido a juegos antiguos de aventura gráfica. La idea detrás de este estilo es la creación de un juego llamativo, con personajes y escenarios sencillos y de estilo caricaturesco. Se han tomado inspiraciones de juegos multijugador familiares propios de la Wii como el Wii Sports Resort y el Wii Party.
  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/997cd59e-c215-4892-a6c0-84f944679334">
  <br><br>
  <b>Ilustración 1. Ejemplo de referencias. "Wii Sports" y "Wii Party" </b>
 <br><br>
</p>

**7. Alcance**  
El objetivo principal es desarrollar un videojuego que se pueda actualizar incluyendo más niveles, nuevos power-ups (intercambiar la posición de ambos jugadores...) y modos de juegos. En esta primera versión se desarrollará una unidad básica ampliable en vistas de futuro.  
___

### Mecánicas de juego ###
En este apartado se profundizará acerca de las mecánicas de *Ratones a los fogones*, como es: jugabilidad, con especial atención a las acciones que podrá hacer el jugador en la partida; el flujo de juego y la curva de dificultad. Se especificarán los controles, al igual que el movimiento y las físicas empleadas y, por último, se profundizará en los personajes y en los diferentes objetos.  
**1. Jugabilidad**  
*Ratones a los fogones* consta en primera instancia de tres niveles que se desarrollan en el mismo lugar, la cocina, pero cada uno se caracteriza por la dificultad y por los objetos nuevos que aparecen.  
La mecánica principal se basa en evitar los diferentes objetos que van a aparecer en la escena, saltando o agachándose. Otra de las mecánicas es coger objetos (power-ups) para conseguir una ventaja.  
**2.	Flujo de juego y curva de dificultad**
El desarrollo de una partida de *Ratones a los fogones* empieza en la pantalla de inicio. Aquí se podrán ver los créditos, ajustes y controles, y dos opciones para jugar online o en local.  Una vez dado a jugar, se dejará customizar el personaje y una vez terminado, se dará paso a la elección de nivel. Según se pase de nivel la velocidad de cada jugador irá en aumento para aumentar al mismo tiempo la dificultad.    
* Nivel 1: únicamente aparecerán obstáculos estáticos que se deberán saltar o pasar por debajo y los diferentes power-ups.   
* Nivel 2: se mantienen los obstáculos estáticos y aparecen los primeros power-ups que cruzan la pantalla de derecha a izquierda, permitiendo al jugador recogerlos.  
* Nivel 3: se añade a todo lo anterior obstáculos dinámicos que se moverán de manera vertical y se deberá saltar o pasar por debajo según sea más conveniente.
Finalmente, cuando uno de los dos llegue a la meta se da paso a la pantalla de fin de nivel, donde se mostrará el ganador y se dará a elegir si pasar al siguiente nivel o regresar a la pantalla de inicio.  
De esta manera la curva de dificultad quedaría de la siguiente manera:  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/f1cc9b0f-d8ad-40fd-be5d-802127f61e3c">
  <br><br>
</p>

**3. Movimiento y físicas**  
  **i.	Interacción con objetos**  
Dentro del escenario se encuentran los obstáculos y los power-ups, pero la interacción con ambos es diferente. Si el jugador se topa con un obstáculo, el movimiento del personaje se ralentiza temporalmente. Mientras que, si se topa contra un power-up dará pie a la acción correspondiente del mismo.  
  **ii.	Controles**  
1.	Jugador 1:  
  *	Movimiento lateral: teclas A, D.  
  *	Salto: W.  
  *	Agacharse: S.  
2.	Jugador 2:  
  *	Movimiento lateral: flecha izquierda y derecha.  
  *	Salto: flecha arriba.  
  *	Agacharse: flecha abajo.  

**4.	Personajes**  
Ambos ratones tienen las mismas mecánicas, pero con diferentes controles. La única diferencia es el color que pueda tener, a libre elección del jugador.  
**5.	Objetos**  
Un eje fundamental de Ratones a los fogones son los objetos, los cuales se dividen en tres categorías: obstáculos estáticos, obstáculos dinámicos y power-ups.  
Los obstáculos tomarán el papel de la dificultad del nivel que se esté ejecutando, alterando sus efectos y sus velocidades dependiendo del momento. Se tomará la forma de enseñanza de refuerzo negativo, en concreto condicionamiento de evitación, por la cual el jugador tiene más probabilidades de no repetir las acciones que conlleven problemas negativos. Cuando el jugador colisione con alguno de estos obstáculos recibirá una penalización en su velocidad de movimiento, pues su personaje quedará aturdido y su contrincante podrá tomarle la delantera.  
El movimiento de dichos objetos podrá ser nulo, dice ser que estarán en puntos fijos del escenario y el jugador deberá evitar caer en ellos. Estos serán de menor dificultad, pues su evitación es más sencilla. Variarán entre trampas para ratones, fuego, charcos de agua, ralladores, cáscaras de plátano, ollas y sartenes calientes y demás.  
Los obstáculos dinámicos aumentarán la dificultad de la partida y podrán desplazarse vertical y horizontalmente. Sus diseños variarán entre cuchillos, tenedores, batidoras, rodillos, hornos que se abren y se cierran y otras alternativas parecidas.  
Para los objetos que generen un condicionamiento de recompensa, los power-ups variarán entre efectos positivos para el propio jugador o negativos para el adversario. En cuanto a los primeros, variarán entre un aumento de la velocidad del jugador e inmunidad por unos segundos. Los efectos negativos para el adversario se compondrán de congelación y reducción del campo de visión, ambos de forma momentánea.
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/c0ff999f-6a0e-4824-8657-d5594f3dfddd">
  <br><br>
</p>

___

### Interfaces ###
Las interfaces que se han incluido quedan definidas a continuación.

**1. Diagrama de flujo**  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100694175/2f118418-d1ca-4f28-826f-707aa12094d3">
  <br><br>
  <b>Ilustración 2. Diagrama de flujo</b>
 <br><br>
</p>

**2. UML**  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100694175/5710d01f-90a0-401e-b55a-3696e9c114bc">
  <br><br>
  <b>Ilustración 3. UML</b>
 <br><br>
</p>

**3. Pantalla de Inicio**  
La interfaz del inicio es sencilla con el logo de la empresa y un pequeño texto que incita al jugador a hacer click para iniciar el juego. 
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/3d13c1e1-0595-4647-9cd3-e31968bb43ce">
   <br><br>
  <b>Ilustración 4. Pantalla de inicio</b>
  <br><br>
</p>

**4. Pantalla de Carga**  
La pantalla de carga simplemente tendrá una barra de color amarillo y un pequeño texto que mostrará el progreso entre pantallas.  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/df1286bf-5032-4103-913b-35720ace6c6b">
  <br><br>
  <b>Ilustración 5. Interfaz de Carga</b>
 <br><br>
</p>

**5. Pantalla de Inicio de Sesión**  
La pantalla de login tiene dos campos de texto para introducir el usuario y la contraseña, y un simple botón de acceder.  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/f7ec3f37-4cb5-4b13-85d6-4a60ec30ef04">
  <br><br>
  <b>Ilustración 6. Interfaz de Login</b>
 <br><br>
</p>
  
**6. Menú Principal**  
La interfaz del menú principal muestra los botones básicos de jugar y ajustes (que en un futuro se añadirá la opción de local u online), y de los créditos.  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/3b6b35b5-630b-43e4-9156-533b71e054e6">
   <br><br>
  <b>Ilustración 7. Menú Principal</b>
  <br><br>
</p>

**7. Pantalla de Usuario**  
La pantalla de la cuenta del usuario permite cambiar la contraseña y eliminar la cuenta.  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/e2c24615-f14d-4b84-9f27-5d25a28ce3d0">
  <br><br>
  <b>Ilustración 8. Interfaz de Usuario</b>
 <br><br>
</p>

**8. Pantalla de Confirmar Eliminar Cuenta**  
Esta interfaz incluye un simple texto para ofrecerle al jugador la opción de no eliminar la cuenta con un botón de confirmar y otro de volver.  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/9983411f-3c9e-4576-b37d-f7972666f5a8">
  <br><br>
  <b>Ilustración 9. Interfaz de Eliminar Cuenta</b>
 <br><br>
</p>

**9. Selección de Ratón**  
Después de elegir el modo de juego que se prefiere, se pasará a la selección del perfil de los jugadores 1 y 2. Los dos personajes que representarán a cada jugador serán ratones con distintos colores. Cuando el jugador esté listo, pulsará el botón LISTO, y proseguirá a la pantalla de niveles.   
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/139124884/c335edcb-beed-4cd8-af64-a5b80f5973f4">
  <br><br>
  <b>Ilustración 10. Menú de Selección de Ratón</b>
 <br><br>
</p>

**10. Selección de Nivel**  
La pantalla de selección de nivel tiene un estilo minimalista, dando lugar a elegir entre 3 niveles diferentes. Para esta fase no se ha implementado.  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/139124884/df003123-fbad-4c43-b8a6-487ffc3433b7">
  <br><br>
  <b>Ilustración 11. Menú de Selección de Nivel</b>
 <br><br>
</p>

**11. Menú de pausa, ajustes y controles**  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/139124884/dd7f0118-4bed-4e0c-a127-91f97354d793">
  <br><br>
  <b>Ilustración 12. Interfaz de Pausa, Ajustes y Controles</b>
 <br><br>
</p>

**12. Nivel**  
La interfaz in-game se basa en una pantalla dividida a la mitad horizontalmente donde el jugador 1 (el cual usará las teclas W, A, S, D) utilizará la pantalla de arriba, y el jugador 2 (mediante las teclas de las flechas) utilizará la de abajo. Cada jugador dispondrá de una barra arriba de su pantalla que mostrará el porcentaje de recorrido que han avanzado dentro del nivel y a ser posible un dibujo significativo del power up del que se esté haciendo uso.  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/a9e59464-c0db-40be-b0d7-2619d49f865c">
  <br><br>
  <b>Ilustración 13. Interfaz de Nivel</b>
 <br><br>
</p>

**13. Fin de Nivel**  
La pantalla de fin de nivel mostrará el ganador en el podio y las opciones de volver al menú principal o pasar al siguiente nivel.  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100694175/1cd669c4-816d-4f3f-96d8-60f3bfbb41a4">
  <br><br>
  <b>Ilustración 14. Interfaz de Fin de Nivel</b>
 <br><br>
</p>

**14. Créditos**    
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/139124884/2ee834df-e380-4d48-b39f-4bb26bc83340">
  <br><br>
  <b>Ilustración 15. Interfaz de Créditos</b>
 <br><br>
</p>

**15. ¡A correr!**  
Al iniciar el juego y probar varias veces, se descubrió que al terminar de elegir a los personajes el juego se iniciaba inmediatemente, debido a esto, se ha decidido añadir una nueva interfaz entre la selección de personaje y el juego en sí. Además se le ha incluído un pequeño tutorial visual para explicar el funcionamiento del juego.
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/aa3dfcf3-338f-4227-8891-9919f8b0b941">
  <br><br>
  <b>Ilustración 16. ¡A correr!</b>
 <br><br>
</p>

___

### Funcionalidades API REST ###
Mediante las siguientes implementaciones se consigue persistencia (pues los datos de los usuarios se guardan en un .txt), pudiendo guardar sus récords, cambiar la contraseña y borrar la cuenta si así se desea; conexión pues el servidor puede saber en todo momento los usuarios conectados mediante los usuarios activos y su información guardada en ficheros; e intercambio de información pues, aunque no se ha llegado a implementar un chat de momento, todos los usuarios pueden ver los usuarios que están conectados al servidor de forma simultánea. 
1. Inicio de sesión: se crea una cuenta para el usuario si no la tenía y se le loguea al usuario.
  * Métodos utilizados: POST 
4. Usuarios activos: muestra todos los usuarios conectados a la misma sesión del servidor. 
  * Métodos utilizados: GET, DELETE 
3. Eliminar cuenta: permite eliminar la cuenta del usuario que se acaba de loguear. 
  * Métodos utilizados: DELETE 
4. Cambio de contraseña: en una cuenta creada se permite cambiar la contraseña para iniciar sesión en otro momento.
  * Métodos utilizados: PUT 
___

### Arte ###
*Ratones a los fogones* debe tener un estilo amigable y caricaturesco. Los personajes son unos pequeños ratones que tratan de escapar de una cocina evitando trampas. Los colores en todo momento deben ser llamativos y acorde al escenario.  
**1.	Concept Art**  
*	Diseños orgánicos  
    - Personajes (modificaciones de color para diferenciar entre un jugador y otro)
  
<p align="center">
    <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/2ad65561-de7e-401d-917e-baba0af699ad">
    <br><br>
    <b>Ilustración 16. Ratones</b>
   <br><br>
</p>

*	Diseños inorgánicos  
    -	Trampas para ratones  
    -	Objetos de cocina (cuchillos, cacerolas, etc.)  
    -	Muebles  
    -	Fuego, charcos de agua, cáscaras de plátano

**2.	Audio**
La música y los efectos de sonido serán en .ogg.  
* Música:
    -	Menú principal, ajustes y créditos: Música alegre que invite a empezar una partida.  
    -	Pantalla final: Se mantienen la música del juego y se añade un pequeño efecto de sonido para que se note que el jugador ha tocado la meta. En un futuro se quiere cambiar por una música triunfal.  
    -	In-Game: Música competitiva. Los ratones deben escapar de la cocina, por lo que la música tiene que dar un sentimiento de urgencia.  
* Efectos de sonido:  
    -	Navegación por menú:al pasar el ratón por encima de alguna opción. Todavía no implementado.
    -	Selección de una opción:al hacer clic sobre uno de los botones de inicio. Todavía no implementado.
    -	Movimiento del personaje (saltar, agacharse, pisadas): volumen bajo para no molestar. Todavía no implementado.
    -	Golpe: al chocar con un obstáculo suena un pequeño efecto de sonido. Para mostrar al jugador que se ha chocado.
    -	Power-ups: al coger un power-up se escucha un efecto de sonido, y al perder el efecto del power up también se escucha un sonido diferente.
    -	Botones:  los botones en las interfaces de menu, selección, ajustes y fin de juego, presentan un efecto de sonido al pulsarlos.
 ___
### Referencias ###
* Figma Boceto Interfaces:  
 https://www.figma.com/file/EHHxC5EN9gM78CxVDQKwqt/interfaces-Ratones-aLosFogonestype=design&nodeid=0%3A1&mode=design&t=vvNZQHbM3PMg4PnY-1

* Estructura GDD:  dsaltares (2016). Sion Tower - GDD.
https://github.com/dsaltares/sion-tower/blob/master/doc/gdd/gdd.pdf

* Música Menú:
https://freesound.org/people/Electrobuz/sounds/137227/

* Efecto se desactiva el poder del power-up:
https://freesound.org/people/MATRIXXX_/sounds/523204/

* Efecto de recibe daño:
https://freesound.org/people/Prof.Mudkip/sounds/386862/

* Efecto de interacción con botones:
https://freesound.org/people/MATRIXXX_/sounds/657948/

* Música inGame:
https://www.youtube.com/watch?v=X2DOCUA6WTM
 ___





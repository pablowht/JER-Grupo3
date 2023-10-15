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
### Documento del Diseño del Videojuego ###
___
### Cambios ###  
Cambios con respecto a versiones anteriores:  
___
### Introducción ###  
*Ratones a los fogones* es un videojuego para PC de modalidad multijugador, en concreto de dos jugadores, e implementará en el lado del servidor Java con SpringBoot y en el lado del cliente JavaScript con el framework Phaser 3. Este escrito tiene como objetivo principal plasmar los elementos que debe incluir *Ratones a los fogones* y servir de carta de presentación en caso de buscar colaboradores en un futuro.   
**1. Concepto del juego**  
*Ratones a los fogones* es un videojuego de dos jugadores en el que cada uno controla una pequeña rata antropomórfica que debe salir de la cocina antes de ser atrapada. Ambas competirán para ser la primera en llegar a la puerta, esquivando por el camino todo tipo de obstáculos e intentando huir antes de que se acabe el tiempo.  
**2. Características principales**  
Las características principales del juego son:  
*	Competición: *Ratones a los fogones* principalmente se centra en la competitividad que se crea al jugar a un juego multijugador contra un amigo.  
*	Simpleza: El estilo de *Ratones a los fogones* es llamativo y la historia simple, para que el jugador se centre en el objetivo del juego sin tener distracciones.   
*	Fluidez: El movimiento del personaje debe ser agradable para el jugador, ya que un manejo complicado puede ser molesto a la hora de jugar un juego competitivo.  
*	Dificultad: *Ratones a los fogones* consta de 3 niveles, a cada cual con un mayor nivel de dificultad.  
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
3.	Power-ups: se generan proceduralmente. La finalidad de estos es beneficiarse o perjudicar al adversario.
 
**6. Estilo Visual**  
Ratones a los fogones es un juego de estilo simple y píxel art parecido a juegos antiguos de aventura gráfica. La idea detrás de este estilo es la creación de un juego llamativo, con personajes y escenarios sencillos y de estilo caricaturesco.
  
<p align="center">
  <img src="https://github.com/pablowht/JER-Grupo3/assets/100693446/da260a40-7264-4197-a19a-32299181c755">
  <br><br>
  <b>Ilustración 1. Ejemplo estilo visual. "Monkey Island"  </b>
</p>

**7. Alcance**  
El objetivo principal es desarrollar un videojuego que se pueda actualizar incluyendo más niveles, nuevos power-ups y modos de juegos. En esta primera versión se desarrollará una unidad básica ampliable en vistas de futuro.  
___

### Mecánicas de juego ###
En este apartado se profundizará acerca de las mecánicas de *Ratones a los fogones*, como es: jugabilidad, con especial atención a las acciones que podrá hacer el jugador en la partida; el flujo de juego y la curva de dificultad. Se especificarán los controles, al igual que el movimiento y las físicas empleadas y, por último, se profundizará en los personajes y en los diferentes objetos.  
**1. Jugabilidad**  
*Ratones a los fogones* consta de tres niveles que se desarrollan en el mismo lugar, la cocina, pero cada uno se caracteriza por la dificultad y por los objetos nuevos que aparecen.  
La mecánica principal se basa en evitar los diferentes objetos que van a aparecer en la escena, saltando o agachándose. Otra de las mecánicas es coger objetos (power-ups) para conseguir una ventaja.  
**2.	Flujo de juego y curva de dificultad**
El desarrollo de una partida de *Ratones a los fogones* empieza en la pantalla de inicio. Aquí se podrán ver los créditos, ajustes y controles, y dos opciones para jugar online o en local.  Una vez dado a jugar, se dejará customizar el personaje y una vez terminado, se dará paso a la elección de nivel.    
* Nivel 1: la cámara empezará a moverse obligando al jugador a hacerlo. Mientras se desarrolla únicamente aparecerán obstáculos estáticos que se deberán saltar o pasar por debajo.   
* Nivel 2: la cámara incrementa su velocidad. Se mantienen los obstáculos estáticos y aparecen los primeros power-ups que cruzan la pantalla de derecha a izquierda, permitiendo al jugador recogerlos.  
* Nivel 3: además de que la cámara aumente la velocidad de movimiento, se añade a todo lo anterior obstáculos dinámicos que se moverán de manera vertical y se deberá saltar o pasar por debajo según sea más conveniente. En el trayecto final del nivel, la cámara aumentará un poco más la velocidad.  
Finalmente, cuando uno de los dos llegue a la meta se da paso a la pantalla de fin de nivel, donde se mostrará el ganador y se dará a elegir si pasar al siguiente nivel o regresar a la pantalla de inicio.  
De esta manera la curva de dificultad quedaría de la siguiente manera:  
<p align="center">
  <img src="![image](https://github.com/pablowht/JER-Grupo3/assets/100693446/13dfcd20-a981-43aa-b5ab-65ea9162b40f)">
  <br><br>
</p>

**3. Movimiento y físicas**  
  **i.	Interacción con objetos**  
Dentro del escenario se encuentra los obstáculos y los power-ups, pero la interacción con ambos es diferente. Si el jugador se topa con un obstáculo, el movimiento del personaje se ralentiza dándose una colisión. Mientras que, si se topa contra un power-up, desaparecerá de la escena y dará pie a la acción correspondiente del mismo.  
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
___
### Interfaces ###
**1. Diagrama de flujo**  
<p align="center">
  <img src="![image](https://github.com/pablowht/JER-Grupo3/assets/100693446/807fb465-5d80-4d99-8ffe-ec1ebbd339a3)">
  <b>Ilustración 2. Diagrama de flujo</b>
  <br><br>
</p>
  
**2. Menú Principal**  
La interfaz del menú principal se inspira en la cubertería de un restaurante con un estilo minimalista, mostrando los botones básicos de elegir el modo de juego (local u online), y de los créditos.  
<p align="center">
  <img src="![image](https://github.com/pablowht/JER-Grupo3/assets/100693446/a79f9329-9a65-41cb-830f-7c463652913d)">
  <b>Ilustración 2. Diagrama de flujo</b>
  <br><br>
</p>








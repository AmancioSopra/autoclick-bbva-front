# Challenge BBVA PWA CookieClicker
Challenge de BBVA que consiste en una app web móvil progresiva del juego CookieClicker.
Este proyecto se generó con [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Instalación
-Descarga de proyecto y despliegue en modo local:
```
git clone https://github.com/AmancioSopra/autoclick-bbva-front.git
npm install
ng serve -o
```
-Despliegue con http-server para probar la PWA. Asegurarse de tener instalado http-server.

Instalación de http server:
  ```
  npm install -g http-server
  ```
  
 Despliegue con http-server
  ```
  npm run start-pwa
  ```
  ## Alojamiento
  Esta aplicación está alojada en: 
  https://autoclick-bbva-amancio.vercel.app/
  
  ## Funcionalidad
  La aplicación cuenta con dos vistas:
  
  - La primera vista `GamePageComponent`, cuenta con dos componentes:
  - `LoginUserComponent`: Login en el que se introduce el nombre del usuario con el que se va a jugar. Esto es un formulario reactivo y el campo username tiene un validador que valida que no esté vacío y que tenga más de 5 carácteres. Este componente registra o loguea al usuario dependiendo de si ha jugado anteriormente, con lo que podrá reanudar la partida anterior si se ingresa con el mismo nombre de usuario
  
![image](https://user-images.githubusercontent.com/91079719/195603765-6d36faa5-732a-4e98-b5ec-60a288c1f28a.png)

  - `RankingComponent`: Tabla en la cual se ve el ranking de los usuarios guardados en el localStorage, este componente se activa cuando se presiona el botón "Ver ranking". Este mismo botón también sirve para ir hacia atrás, dejando de ver el ranking y viendo de nuevo el `LoginUserComponent`

![image](https://user-images.githubusercontent.com/91079719/195603869-58ff2e43-4cd8-462f-b0d3-d74882861172.png)

En esta vista también hay un botón que permite cambiar el idioma de la página entre castellano e inglés, por defecto está puesta en castellano.
  
 - La segunda vista `GameComponent`, cuenta con un marcador que muestra la cantidad de clics ganados por el usuario, y la cantidad de autoclickers que ha comprado. Para ganar un clic, hay que presionar el botón Clic. Cuando el usuario tiene más de 4 clics, aparece un segundo botón que te permite comprar autoclickers. Este botón muestra también en tiempo real el coste de cada autoclicker, ya que va aumentando en función de los autoclickers comprados. Si el usuario no tiene suficientes clics para comprar un autoclicker, este botón saldrá desactivado. Los autoclickers sirven para ganar un clic automáticamente cada 100 milisegundos. Debajo de este botón también aparece un mensaje informativo informando de cuántos autoclickers podría comprar en este instante, o en su defecto, los que necesita para poder comprar. Por último, en la barra superior, aparece el nombre del usuario insertado en el componente `LoginUserComponent`, y un botón para salir del juego manteniendo los datos de la partida la próxima vez que el usuario ingrese al juego, ya que los datos se guardan en localStorage.

![image](https://user-images.githubusercontent.com/91079719/195604018-acab49ce-842d-4024-a663-13829d3db4e5.png)
## PWA
Se adjunta captura de Lightouse para comprobar que es PWA

![image](https://user-images.githubusercontent.com/91079719/195604642-a31004e4-18ad-480c-a6a8-9b8220d34bf5.png)


## Testing
Se adjunta captura de la cobertura de los tests ejecutando el comando ```ng test --no-watch --code-coverage```

![image](https://user-images.githubusercontent.com/91079719/195620574-5ba3a46e-0fff-4969-9a7f-a7b07c5524d2.png)

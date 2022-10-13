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
  
  ## Funcionalidad
  La aplicación cuenta con dos vistas:
  
  - La primera vista `LoginUserComponent`, cuenta con un login en el que se introduce el nombre del usuario con el que se va a jugar. Esto es un formulario reactivo y el campo username tiene un validador que valida que no esté vacío y que tenga más de 5 carácteres. Este componente registra o loguea al usuario dependiendo de si ha jugado anteriormente, con lo que podrá reanudar la partida anterior si se ingresa con el mismo nombre de usuario
  
![image](https://user-images.githubusercontent.com/91079719/195526313-51a60ce2-933c-424c-9685-912b0f4daa1a.png)
  
 - La segunda vista `GameComponent`, cuenta con un marcador que muestra la cantidad de clics ganados por el usuario, y la cantidad de autoclickers que ha comprado. Para ganar un clic, hay que presionar el botón Clic. Cuando el usuario tiene más de 4 clics, aparece un segundo botón que te permite comprar autoclickers. Este botón muestra también en tiempo real el coste de cada autoclicker, ya que va aumentando en función de los autoclickers comprados. Si el usuario no tiene suficientes clics para comprar un autoclicker, este botón saldrá desactivado. Los autoclickers sirven para ganar un clic automáticamente cada 100 milisegundos. Debajo de este botón también aparece un mensaje informativo informando de cuántos autoclickers podría comprar en este instante, o en su defecto, los que necesita para poder comprar. Por último, en la barra superior, aparece el nombre del usuario insertado en el componente `LoginUserComponent`, y un botón para salir del juego manteniendo los datos de la partida la próxima vez que el usuario ingrese al juego, ya que los datos se guardan en localStorage.

![image](https://user-images.githubusercontent.com/91079719/195526465-068db431-5ffe-436a-8702-39306d8e887f.png)





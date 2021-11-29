# Informe académico entrega 2
Fecha de entrega: 29-nov-2021

## Construcción

### Implementación de funciones principales (sin la necesidad de persistencia de datos)

Se realizó la implementación de las siguientes funciones principales:
* Regsitro de usuario
* Inicio de sesión
* CRUD Ingresos
* CRUD Gastos
* CRUD Transferencias
* CRUD Categorías
* CRUD Objetivos

También con la base de datos no relacional MongoDB se realizó la persistencia de datos.


### Configuración de plataforma tecnológica para desarrollo y producción

Para el correcto desarrollo del proyecto se utilizaron dos ramas separadas, una para producción (main) y otra para desarrollo (staging). 

El proceso de desarrollo se realizó de la siguiente forma:
Creación de rama para feature, bug, update, a partir de la rama de staging
Finalizados los cambios, se realizó merge de la rama creada en el punto 1 a la rama de staging
Luego para actualizar la rama de main, se realizó un merge de staging a main 

También para el desarrollo local, se instalaron las herramientas necesarias para el correcto desarrollo, estas herramientas fueron por ejemplo, MongoDB para la persistencia de datos, NodeJS que fue el runtime del proyecto y se utilizó NPM y YARN para la instalación de las dependencias del proyecto. A su vez, para el correcto desarrollo de la API se utilizó la herramienta de POSTMAN que permite de una forma simple hacer llamadas HTTP.

También se implementaron variables de entornos para el correcto desarrollo y puesta a producción del proyecto

Luego de tener una versión estable se realizó la configuración para tener un entorno de producción. 

Las herramientas utilizadas fueron:
* Netlify, que permite subir los archivos a la nube y permite conectar el repositorio de Github a su plataforma y configurar para que cada vez que se realice un nuevo merge a la rama de main, se realice un deploy. Este servicio fue utilizando para el frontend
* Heroku, al igual que Netlify te permite conectar un repositorio de Github y subir los cambios automáticamente, se utilizó esta plataforma para el backend ya que permitía correr Node para la API que se realizó.
* MongoDB Atlas, es una plataforma que te permite crear una base de datos MongoDB.

El entorno de producción se puede encontrar en:
* Frontend: https://mis-gastos-ort.netlify.app/ 
* Backend: https://mis-gastos-fis.herokuapp.com/ 

### Documentación del uso de librerías externas (package.json)

#### Frontend

| Librería          | Uso |
|-------------------|-----|
| @nuxtjs/auth      | Permite implementar autenticación al framework de Nuxt  | 
| @nuxtjs/axios     | Permite realizar llamadas HTTP en el framework de Nuxt  |
| @nuxtjs/dotenv    | Permite la utilización de variables de entornos en el framework de Nuxt  |
| @nuxtjs/toast     | Permite realizar notificaciones en el framework de Nuxt  |
| core-js           | Dependencia requerida para la utilización de babel. Permite la utilización de las nuevas features de JavaSscript  |
| nuxt              | Es la dependencia principal del proyecto, ya que es la que permite la utilización del framework.  |
| vuetify           | Es la librería que permite el uso de Material Design en Vue.  |
| @nuxtjs/vuetify   | Es la librería que permite la integración de Vuetify y Nuxt  |
| @vue/test-utils   | Ofrece herramientas para la realización de test en Vue  |
| babel-core        | Es la librería que se utiliza para compilar todo el código y que pueda ser utilizado en todos los navegadores  |
| babel-jest        | Es la librería que permite compilar todos los archivos para la realización de los test con Jest  |
| jest              | Es la librería para realizar los test en el sistema  |
| vue-jest          | Es la librería que permite realizar test de Jest en Vue  |

#### Frontend

| Librería                  | Uso |
|---------------------------|-----|
| cors                      | Es un package que permite hablitar determinadas configuraciones de CORS  | 
| dotenv                    | Es un package que permite cargar variables de entorno desde el código  |
| express                   | Es un framework para estructurar el proyecto en node  |
| express-async-handler     | Es un package que permite manejar excepciones en las rutas de express  |
| jsonwebtoken              | Es un package que permite generar un token asociado a cada usuario, al loguearse o registrarse  |
| mongoose                  | Es un package que permite realizar la conexión, lectura y escritura a una base de datos de mongo|
| bcryptjs                  | Es un package que permite la encriptación para las contraseñas |

<hr>

## Interfaz de usuario

### Interfaz de usuario web / mobile (responsive)

Para el desarrollo de la interfaz de usuario web y mobile se opto por la libreria de [Vuetify](https://vuetifyjs.com/), la cual nos permitio implementar con clases de CSS las buenas practicas en lo que es el desarrollo de plataformas responsives.

Se pueden observar algunas capturas de pantalla [aqui](../docs/interfaz)

### Página única con navegación entre secciones

Para la realizacion de una pagina unica con navegación entre seccion se opto por desarrollar la plataforma con el framework de [Nuxt](https://nuxtjs.org/), el cual tiene dos modos, el modo 'universal' que permite desarrollar aplicaciones web se generan del lado del servidor y del cliente y el modo 'spa' que solamente se genera del lado del cliente.

### Implementación: Material Design Web Components

Para la implementación de Material Design se utilizo la libreria de [Vuetify](https://vuetifyjs.com/) el cual tambien como [Material Design Web Components](https://www.npmjs.com/package//material-components-web) cuenta con componentes para ser usando y que tienen la estetica de Material Design.

### Aplicar un sistema de diseño y principios de usabilidad

<hr>

## Codificación

### IDE Visual Studio Code: configuración común del equipo

En nuestro caso, al tener el dominio y la interfaz en diferentes tecnologias, en algunos casos se utilizaron diferentes configuraciones del IDE. 

Extensiones Frontend:
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
* [change-case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case)
* [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
* [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)
* [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
* [vuetify-vscode](https://marketplace.visualstudio.com/items?itemName=vuetifyjs.vuetify-vscode)


En el caso de la Plataforma Mis Gastos, se utilizo el sistema de diseño creado por Google, [Material Design](https://material.io/design) y se tuvieron en cuenta los [principios de usabilidad](https://www.uup.es/10-principios-de-usabilidad/) a la hora de crear la interfaz para que se lo mas amigable para el usuario.

### Cumplimiento de estándar de accesibilidad WCAG

Para cumplir los estandares de accesibilidad, teniamos como [criterio de aceptación](https://github.com/ORT-FIS-202108/proyecto-grupo-2-mayer-tosar/issues/47) obtener un porcentaje de 90% en el test de [Google Lighthouse](https://developers.google.com/web/tools/lighthouse?hl=es)

### Seguir especificación de estilo

Ademas de seguir los estándares de Google ([HTML](https://google.github.io/styleguide/htmlcssguide.html#HTML), [CSS](https://google.github.io/styleguide/htmlcssguide.html#CSS). [JavaScript]()), también se siguieron los estándares de [Vue](https://es.vuejs.org/v2/style-guide/)

### Buenas prácticas de OOP: separación de lógica e interfaz

En caso de nuestra implementación para el desarrollo de la plataforma MisGastos, no utilizamos OOP, sino que, utilizamos el modelo de diseño de sofwtare de cliente-servidor. Esto nos permitio crear la logica del negocio en el backend y la interfaz en el frontend, que a sus efectos, nos permitio separar la logica de la interfaz.


Se tomaron en cuenta las siguientes especificaciones:

* Nombre de la app: MisGastos
* Colors primary: Deep Purple 700, secondary: Teal 700
* Font: Roboto
* Icons: filled

<hr>


## Test de sistema

### Realizar test de sistema en un entorno separado del desarrollo

Para realizar las prubas del sistema se tuvo en cuenta la integracion de componentes como crear una cuenta, crear un objetivo, crear una categoria, crear un ingreso para la cuenta creada, que a su vez tuviese una categoria y estuviese asociada a un objetivo.

Durante las pruebas los componentes desarrollados por separado pudieron integrarse al sistema, persistiendo la informacion correspondiente, demostrando que la integracion del cliente y servidor se comunican correctamente y permiten que el sistema funcione de foma integral.

Video con test de sistema integral: https://youtu.be/Nl8cKNEcoxY

### Ambiente de testing independiente del desarrollo

Para el correcto desarrollo del sistema, se tuvieron tres entornos:

Produccion:
* Frontend: https://mis-gastos-ort.netlify.app/
* Backend: https://mis-gastos-fis.herokuapp.com/

### Generar casos de prueba aplicando técnica partición equivalente

#### Prueba: Login

1. Variables de entrada
    * Email
    * Contraseña

2. Clases de Equivalencia

| Entrada/Variable | Clases Válidas | Clases Inválidas |
|------------------|----------------|------------------|
| Email            | Cumple con la expresion regular de email (1) | No cumple con la expresion regular de email (3)
| Contraseña       | > 8 caracteres alfanuméricos o no alfanuméricos (2)| < 8 caracteres alfanuméricos y no alfanuméricos (4) 

Expresion regular para verificacion de email:
```
/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
```

3. Casos de Prueba

| Caso de Prueba | Email | Contraseña | Resultado Esperado | Clases de Equivalencia cubiertas |
|----------------|-------|------------|--------------------|----------------------------------|
| CP 1 | hola@misgastos.com | Test1234 | Login Exitoso | 1 y 2 |
| CP 2 | hola@misgastos.com | Test123 | Mensaje de error | 1 y 4 |
| CP 3 | test@com | Test456789 | Mensaje de error | 2 y 3 |

Staging/Testing:
* Frontend: https://mis-gastos-testing.netlify.app/
* Backend: https://mis-gastos-testing.herokuapp.com/

Local ([Instalación](../install.md)):
* Frontend: http://localhost:3000
* Backend: http://localhost:5000

## Reporte de issues

Para realizar el reporte de issues utilizamos la herramienta issues de github la cual nos permitió aparte de reportar bugs, generar un flujo muy dinamico entre la creación de user stories que habiamos realizado en la primera etapa y nuevas tareas para la asignación de las mismas a los colaboradores.

Dentro de esta herramienta dividimos el flujo en tres columnas, To Do, In progress, Done, y etiquetamos las tareas con los correspondientes labels para tener una información general de cada tarea. A algunas de estas tareas se les asignó el branch correspondiente si era necesario crear una rama para la misma.

En total fueron generados 20 isssues en los cuales quedaron 2 para realizar en una siguiente etapa.
Cabe destacar que la mayoría de los incidentes tienen funcionalidades que estan contempladas verticalmente, esto significa que no fue dividida cada funcionalidad por frontend y backend, sino que dichas funcionalidades fueron pensadas para que los colaboradores cumplieran un rol mas orientado a full stack.

En cuanto a los bugs, si bien era una aplicacion de tamaño no muy grande, encontramos algunos bugs y los reportamos con la severidad (bloqueante, urgente, no critico, menor) y prioridad (alta, media, baja) correspondientes.

En total fueron reportados 2 bugs, habiendose corregido el 100% de los bugs reportados.

Tablero de issues: https://github.com/ORT-FIS-202108/proyecto-grupo-2-mayer-tosar/projects/1

## Reflexión

### Detalle del trabajo individual

_Reflexión Agustín_

Cuando nos planteamos en la primera etapa el alcance que le queríamos dar al proyecto sabíamos que éramos ambiciosos al querer implementar los features de cuentas, objetivos y categorías. Esto, sumado a la persistencia de datos a través de mongo, en el plazo que teníamos fue un gran desafío. 
 
Elegimos este camino por esto mismo, nos gusta sentirnos desafiados y siempre apostar a más. Pero apostar a ir más lejos también tuvo consecuencias, un ejemplo es no haber llegado a realizar a tiempo los tests unitarios con Jest, o también habernos salido un poco de alguno de los puntos que se planteaban en el obligatorio, ya que eran contrapuestos a la arquitectura que usamos. 
 
De todos modos considero que cumplimos con el objetivo que teníamos cuando comenzamos a pensar el sistema, que fue hacer un producto no sólo tuviese las funcionalidades básicas sino que también tenga un valor agregado. Quizás aprendimos en el proceso que la documentación y las pruebas llevan más tiempo de lo que estimamos, pero también me llevo como reflexión que con Joaquin nuevamente formamos un gran equipo y supimos superar nuestras propias expectativas.

_Rexlexión Joaquin_

En mi caso, lo que me correspondia realizar era la parte del cliente o frontend, en general fue una tarea sencilla porque ya me dedico al desarrollo de frontend, pero igualmente tuve un desafio porque no hay una correcta documenctcion para la integracion de Material Design para el framework de Nuxt por lo cual tuve que hacer una investigacion de que librerias podria utilizar, instalarlas y probar cual era la mas indicada. 

A su vez, logré constatar la importancia de detallar las User Stories, también que es muy importante la comunicación con el equipo de trabajo ya que al desarrollar por separado y luego integrarlo fue realmente facil debido a lo comunicación que se tuvo a la hora de desarrollar.

Aunque no se pudo hacer las pruebas unitarias, estoy más predisupesto a implementarla en los proyectos que integro ya que perimite que el equipo de trabajo pueda verificar que el código está funcionando correctamente y evitar errores que pueden ocurrir y que pueden ser muy difíciles de detectar.

### Técnicas aplicadas y aprendizajes

_Técnicas aplicadas_

* Pair Programming: Para la realizacion de la integracion del backend (dominio) y el frontend (interfaz), usamos la tecnica de pair programing para avanzar más rapido con la integración de ambos

* CI/CD: Continuous integration (CI) y continuous delivery (CD), aplicamos esta practica para la realizacion de los deploys, configurando el repositorio en las plataformas de Netlify y Heroku para la creacion de los ambientes de produccion y testing, nos permito ver los cambios de forma rapida, ya que al hacer cambios a las ramas de main o staging, automaticamente se realizaba un deploy y a los minutos ya podiamos ver los nuevos cambios en estos entornos.

_Aprendizajes_

Fue un excelente desafio para aplicar las mejores tecnicas, practicas y estandares que son utilizados en las empresas de software modernas. Nos logro dar una perspectiva más amplia de cómo se crea un proyecto desde cero y como se lleva a cabo todas las etapas del mismo. Realmente creemos que es una materia muy importante para la carrera porque te brinda todas las herramientas necesarias para insertarte en el mercado del desarrollo de sofware.  
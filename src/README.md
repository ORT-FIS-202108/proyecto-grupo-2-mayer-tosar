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
| dotenv                    | Es un package que permite cargar variables de entorno desde el codigo  |
| express                   | Es un framework para estructurar el proyecto en node  |
| express-async-handler     | Es un package que permite manejar excepciones en las rutas de express  |
| jsonwebtoken              | Es un package que permite generar un token asociado a cada usuario, al loguearse o registrarse  |
| mongoose                  | Es un package que permite realizar la conexion, lectura y escritura a una base de datos de mongo|
| bcryptjs                  | Es un package que permite la encriptacion para las contraseñas |

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

Buenas prácticas de OOP: separación de lógica e interfaz

En caso de nuestra implementación para el desarrollo de la plataforma MisGastos, no utilizamos OOP, sino que, utilizamos el modelo de diseño de sofwtare de cliente-servidor. Esto nos permitio crear la logica del negocio en el backend y la interfaz en el frontend, que a sus efectos, nos permitio separar la logica de la interfaz.


Se tomaron en cuenta las siguientes especificaciones:

* Nombre de la app: MisGastos
* Colors primary: Deep Purple 700, secondary: Teal 700
* Font: Roboto
* Icons: filled

<hr>

## Codificación

IDE Visual Studio Code: configuración común del equipo

Estándares de codificación Google (HTML, CSS, JavaScript)

Buenas prácticas de OOP: separación de lógica e interfaz

## Test de sistema

Para realizar las prubas del sistema se tuvo en cuenta la integracion de componentes como crear una cuenta, crear un objetivo, crear una categoria, crear un ingreso para la cuenta creada, que a su vez tuviese una categoria y estuviese asociada a un objetivo.

Durante las pruebas los componentes desarrollados por separado pudieron integrarse al sistema, persistiendo la informacion correspondiente, demostrando que la integracion del cliente y servidor se comunican correctamente y permiten que el sistema funcione de foma integral.

Video con test de sistema integral: https://youtu.be/Nl8cKNEcoxY

## Reporte de issues

Reportar issues (bugs, improvements, missing features) en GitHub 

Aplicar buenas prácticas de reporte de issues

Definir labels para tipos de issue y niveles de severidad

Dejar issues abiertos para correcciones o mejoras futuras

Sumarizar número de issues reportados por tipo

Realizar una evaluación global de la calidad

## Reflexión

Detalle del trabajo individual

Técnicas aplicadas y aprendizajes

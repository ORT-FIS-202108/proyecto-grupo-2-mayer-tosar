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

<!-- #### Backend TO DO -->

## Interfaz de usuario

Interfaz de usuario web / mobile (responsive)

Página única con navegación entre secciones

Implementación: Material Design Web Components

Aplicar un sistema de diseño y principios de usabilidad

Cumplimiento de estándar de accesibilidad WCAG

Seguir especificación de estilo

## Codificación

IDE Visual Studio Code: configuración común del equipo

Estándares de codificación Google (HTML, CSS, JavaScript)

Buenas prácticas de OOP: separación de lógica e interfaz

Análisis estático de código: mostrar reducción de problemas

## Test unitario

Test unitarios en Jest

100% cobertura en clases de dominio


| En la semana previa a la entrega se debe congelar el desarrollo (22-nov-2021).
A partir de este punto solo se realizan actividades de test de sistema, reporte de issues y generación del informe académico.

## Test de sistema

Realizar test de sistema en un entorno separado del desarrollo

Generar casos de prueba aplicando técnica partición equivalente

Detallar sesiones de prueba exploratoria

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

# Informe académico entrega 1
Fecha de entrega: 18-oct-2021

## Repositorio Git

### Creación y uso de repositorios locales y remotos

Para la creación y uso de repositorios usamos la herramienta de git. A su vez, también utilizamos el servicio de Github el cual nos ayuda a mantener nuestro código centralizado en un repositorio en la nube.

### Comandos Git ejecutados desde terminal y desde el IDE

Para trabajar con el sistema de versionado de git, utilizamos los siguientes comandos localmente:
- git clone
- git checkout
- git status
- git diff
- git log
- git add .
- git commit -m ""

También utilizamos los siguientes comandos para trabajar remotamente:
- git fetch
- git pull
- git push
- git merge

Las ramas al ser remotas fueron creadas desde la interfaz de Github.

## Versionado

### Buenas prácticas de versionado

Algunas de las buenas practicas que se implementaron en el proyecto fueron:

- Creación de ramas para actualizar la rama principal
- Nomenclatura específica para cada tipo de branch
    - feature/:nombre_funcionalidad: Se utiliza para la creación de nuevas funcionalidades.
    - bugfix/:nombre_problema: Se utiliza para resolver errores.
    - hotfix/:nombre_problema: Se utiliza para resolver errores en el entorno de producción.
- Creación de Pull Requests con Code Review para antes de realizar el merge
- Creación de tags para nuevos releases

### Uso de ramas separadas de 'main'

Para trabajar de forma colaborativa utilizamos el sistema de versionado de git, en donde "main" es la rama principal en la que se mergean los cambios, los cuales provienen unicamente desde la rama "staging".
En "staging" a su vez, se mergean las ramas en donde se implementan nuevos features o se aplican fixes, siendo estos modularizados en ramas individuales.

### Resumen de commits y evolución del proyecto

Para ver el historial de los commits y la evolucion del proyecto, Github permite observar el historial de todos los commits que se realizaron en una rama especifia.

Se dejara el link para la dos ramas principales pero se puede ver el historial en cualquier rama

- [Historial commits rama 'main'](https://github.com/ORT-FIS-202108/proyecto-grupo-2-mayer-tosar/commits/main)
- [Historial commits rama 'staging'](https://github.com/ORT-FIS-202108/proyecto-grupo-2-mayer-tosar/commits/staging)
  
## Elicitación

### Evidencia de actividades de investigación

Como indica Wiegers en el libro de Software Requirements, la naturaleza del desarrollo de requerimientos es cíclico entre tres aspectos importantes:

- Elicitación
- Análisis
- Especificación

Dentro de la etapa de elicitación podemos utilizar distintas técnicas dentro de un mismo proyecto que nos permitan encontrar la información para describir las funcionalidades que cumple cualquier sistema.

El utilizar técnicas que trabajan directamente con el usuario, nos facilita hacer un análisis de requerimientos más específico ya que al fin de cuentas, el sistema que se estará desarrollando terminará siendo esencialmente desarrollado para brindar una solución a los usuarios.

También es importante trabajar con técnicas que permitan a las personas involucradas en el desarrollo o gestión del proyecto, aportar requerimientos que puedan agregar valor al producto, complementando así las técnicas que se enfocan en el usuario final.

Presentamos entonces las diferentes técnicas que se mencionan en el libro:

__Entrevistas__

Esta es la mejor forma de encontrar lo que los usuarios esperan y necesitan del sistema de software que vayamos a desarrollar.

__Workshops__

Los workshops permiten a ambas partes a nutrirse de información, pudiendo así relevar requerimientos directamente de los usuarios finales.

__Focus Groups__

Un focus group como grupo representativo de usuarios, permite explorar las actitudes de los usuarios frente a la interacción de un producto, esto permite la posibilidad de testear, qué funcionalidades son intuitivas y agradables para el usuario y cuáles podrían mejorarse.

__Observaciones__

Al realizar entrevistas, workshops o focus groups como técnicas de elicitación, podemos relevar principalmente la información que los usuarios nos describen. Al realizar observaciones podemos relevar requerimientos que están implícitos en las descripciones que el usuario nos brinda.

__Cuestionarios__

Los cuestionarios son una forma que nos permite realizar consultas generalizadas a un gran grupo de usuarios. Estos no son caros pero suelen ser demasiado genéricos, por lo que es importante tener cuidado al relevar demasiada información únicamente de esta técnica.

__Analisis de interfaz de usuario__

El análisis de interfaz de usuario es una técnica de elicitación que permite descubrir los principales requerimientos funcionales. Permitirles a los usuarios interactuar con el sistema es la mejor forma de relevar requerimientos ya que involucra tambien en cierta forma algunas de las técnicas anteriormente mencionadas.
También a través de la ingeniería reversa de interfaces de productos similares podemos relevar información y requerimientos que nos serán útiles.

En base a las técnicas anteriormente presentadas, decidimos utilizar el análisis de interfaz de usuario ya que nos permite de forma concreta, relevar los requerimientos funcionales principales.
Al realizar el análisis sobre interfaces de aplicaciones, que son las más descargadas en las distintas tiendas de aplicaciones, buscamos encontrar también cuales son las funcionalidades de cada una de ellas que le agregan valor al producto para poder implementarlas en nuestro sistema.

### Referencias a fuentes de información

### Caracterización de usuarios: User Personas

### Modelo conceptual del problema

## Especificación

Definición de requerimientos funcionales y no funcionales

User Stories / Use Cases detallados

Bocetos de IU

## Validación y verificación

Verificar la especificación

Validar la solución con personas no involucradas en el proyecto

## Reflexión

Detalle del trabajo individual

Técnicas aplicadas y aprendizajes
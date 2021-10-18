# Informe académico entrega 1
Fecha de entrega: 18-oct-2021

## Repositorio Git

### Creación y uso de repositorios locales y remotos

Para la creación y uso de repositorios usamos la herramienta de git. A su vez, también utilizamos el servicio de Github el cual nos ayuda a mantener nuestro código centralizado en un repositorio en la nube.

### Comandos Git ejecutados desde terminal y desde el IDE

Para trabajar con el sistema de versionado de git, utilizamos los siguientes comandos localmente:
- ``git clone``
- ``git checkout``
- ``git status``
- ``git diff``
- ``git log``
- ``git add .``
- ``git commit -m descripcion_del_comentario``

También utilizamos los siguientes comandos para trabajar remotamente:
- ``git fetch``
- ``git pull``
- ``git push``
- ``git merge``

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

[Ir al análisis](./investigacion/README.md)

### Referencias a fuentes de información

Como fuente de referencia de información, se utilizó el podcast de [Neurona Financiera](https://neuronafinanciera.com/), el cual es un podcast que tiene como objetivo ayudar a que las personas no sufran estrés por dinero, en unos de los [capítulos](https://neuronafinanciera.com/169/) menciona las características que debe tener como mínimo una aplicación de gastos.

Las características que menciona son:
- Información alojada en la nube
- Cuentas multimonedas
- Definir varias cuentas
- Permitir hacer ajustes en caso de querer cambiar el saldo
- Definir conceptos de gastos e ingresos
- Construir un presupuesto, una aproximación futura de los gastos que voy a tener
- Análisis de los datos, exportar datos
- Gestión de tarjeta de créditos

### Caracterización de usuarios: User Personas

Luego del relevamiento de información realizado fueron identificados dos perfiles con personalidades definidas.

[Ir a los user personas](./userpersonas/README.md)

### Modelo conceptual del problema

[Ir al modelo conceptual](./modeloconceptual/README.md)

## Especificación

### Definición de requerimientos funcionales y no funcionales

__Requerimientos Funcionales__

- Los usuarios pueden crearse un perfil con su mail
- Los usuarios pueden ingresar con su mail
- Los usuarios pueden crear cuentas referenciando a sus cuentas bancarias, efectivo, etc.
- Los usuarios pueden crear un gasto y asignarlo a una cuenta
    - Los gastos pueden ser recurrentes
- Los usuarios pueden crear un ingreso y asignarlo a una cuenta
- Los usuarios pueden crear categorías para asignar a los gastos e ingresos
- Los usuarios pueden ver el balance mensual
- Los usuarios pueden crear objetivos en un periodo de tiempo
- Los usuarios pueden ajustar el saldo de las cuentas
- Los usuarios pueden tener cuentas en diferentes monedas
- Los usuarios deben poder actualizar el ingreso
- Los usuarios deben poder actualizar el gasto
- Los usuarios deben poder actualizar las categorías
- Los usuarios deben poder borrar un ingreso
- Los usuarios deben poder borrar un gasto
- Los usuarios deben poder borrar una categoría
- Los usuarios puede transferir montos entre cuentas
- Los usuarios deberán poder borrar una cuenta
- Los usuarios deberán poder borrar su perfil

__Requerimientos No Funcionales__

- El proyecto debe estar separado por una arquitectura de cliente-servidor para poder ser escalable
- El tiempo de respuesta de llamado al servidor no debe superar los 4s para ningún caso
- Todos los endpoints deben estar documentados en un documento de postman cons sus respectivos parámetros
- La aplicación será desarrollada en español
- El diseño de la aplicación debe ser intuitivo y brindar accesibilidad a todos los usuarios
- El servidor debe responder códigos de error con sus respectivos mensajes en el caso que corresponda
- El sistema debe pasar el test de accesibilidad de Google Lighthouse con más del 90%
- Las contraseñas deben estar encriptadas
- La aplicación funcionará correctamente en las últimas dos versiones de los navegadores más populares, Google Chrome, Mozilla Firefox y Safari.

### User Stories / Use Cases detallados

```
ID: #1	
Título: Registrar usuario 

Narrativa:
            Como usuario
            Quiero registrar un nuevo perfil
            Para acceder a mi cuenta, ver mis ingresos, gastos y objetivos

Criterios de aceptación:
- El email del usuario a registrar no debe coincidir con un usuario ya registrado
- La contraseña debe contener al menos 6 caracteres

Estimación: 20

Completa: -
```

```
ID: #2	
Título: Ingresar con usuario registrado

Narrativa:
    		Como usuario
	    	Quiero ingresar al sistema con mi perfil
            Para ver, crear y modificar mis ingresos, gastos y objetivos

Criterios de aceptación:
- El email del usuario debe estar registrado en el sistema
- El email y contraseña deben ser válidas y coincidir con las del usuario registrado

Estimación: 8

Completa: -
```

```
ID: #3	
Título: Crear una cuenta

Narrativa:
    		Como usuario
            Quiero crear una cuenta que puede o no, estar asociada a una cuenta bancaria
            Para agrupar los ingresos y gastos por cuenta

Criterios de aceptación:
- La cuenta debe aceptar una única moneda
- La cuenta debe tener un nombre
- Los usuarios pueden tener cuentas en diferentes monedas

Estimación: 8

Completa: -
```

```
ID: #4
Título: Crear un gasto

Narrativa:
    		Como usuario
            Quiero ingresar un nuevo gasto y asociarlo a una cuenta
            Para mantener agrupados los gastos por cuenta

Criterios de aceptación:
- El gasto debe tener un monto, fecha, categoría y asociarse a una cuenta
- El gasto debe poder ser recurrente (diario, mensual, anual)

Estimación: 20

Completa: -
```

```
ID: #5
Título: Crear un ingreso

Narrativa:
    		Como usuario
            Quiero agregar un nuevo ingreso y asociarlo a una cuenta
            Para mantener agrupados los ingresos por cuenta

Criterios de aceptación:
- El ingreso debe tener un monto, fecha, categoría y asociarse a una cuenta
- El ingreso debe poder ser recurrente (diario, mensual, anual)

Estimación: 20

Completa: -
```

```
ID: #6
Título: Crear una categoría

Narrativa:
    		Como usuario
            Quiero crear una nueva categoría
            Para mantener poder agrupados los ingresos y gastos categoria

Criterios de aceptación:
- La categoría debe contener un nombre
- El nombre debera contener al menos 1 caracter
- El nombre de la categoría no debe existir en el sistema para ese usuario

Estimación: 13

Completa: -
```

```
ID: #7
Título: Ver balance mensual

Narrativa:
    		Como usuario
            Quiero ver el balance mensual entre los ingresos y gastos
            Para conocer el estado de mis finanzas

Criterios de aceptación:
- El balance se tiene que mostrar con un listado de los ingresos y gastos divididos por categorías
- El balance debe mostrar el resultado de los gastos e ingresos

Estimación: 13
Completa: -
```

```
ID: #8
Título: Crear objetivos
Narrativa:
    		Como usuario
            Quiero crear objetivos a cumplir en un periodo de tiempo
            Para manejar mis ingresos y gastos y superar metas

Criterios de aceptación:
- Los objetivos deben tener un título, descripción y fecha límite y saldo

Estimación: 13

Completa: -
```

```
ID: #9
Título: Ajustar el saldo de una cuenta

Narrativa:
    		Como usuario
            Quiero poder ajustar el saldo de cualquiera de mis cuentas
            Para poder administrar mis cuentas

Criterios de aceptación:

Estimación: 8

Completa: -
```

```
ID: #10
Título: Actualizar ingreso

Narrativa:
    		Como usuario
            Quiero poder actualizar uno de los ingresos agregados anteriormente
            Para poder administrar mis ingresos

Criterios de aceptación:
- Se podrá modificar la fecha y el saldo

Estimación: 8

Completa: -
```

```
ID: #11
Título: Actualizar gasto

Narrativa:
    		Como usuario
            Quiero poder actualizar uno de los gastos agregados anteriormente
            Para poder administrar mis gastos

Criterios de aceptación:
- Se podrá modificar la fecha y el saldo

Estimación: 8

Completa: -
```

```
ID: #12
Título: Actualizar categoría

Narrativa:
    		Como usuario
            Quiero poder actualizar una categoría que haya creado anteriormente
            Para poder cambiar el nombre de una categoria

Criterios de aceptación:
- El nombre deberá contener al menos 1 caracter

Estimación: 8
Completa: -
```

```
ID: #13
Título: Eliminar ingreso

Narrativa:
    		Como usuario
            Quiero poder eliminar un ingreso que haya creado anteriormente
            Para modificar los ingresos de una cuenta

Criterios de aceptación:
- El ingreso debe existir para el usuario, para la cuenta creada
- Debe permitir eliminar solo el ingreso actual, o en el caso que sea recurrente todos los ingresos relacionados o solo los pendientes.

Estimación: 13

Completa: -
```

```
ID: #14
Título: Eliminar gasto

Narrativa:
    		Como usuario
            Quiero poder eliminar un gasto que haya sido creado anteriormente
            Para modificar los gastos de una cuenta

Criterios de aceptación:
- El gasto debe existir para el usuario, para la cuenta creada
- Debe permitir eliminar solo el gasto actual, o en el caso que sea recurrente todos los gastos relacionados o solo los pendientes.

Estimación: 13

Completa: -
```

```
ID: #15
Título: Eliminar una categoría

Narrativa:
    		Como usuario
            Quiero poder eliminar una categoria que haya sido creada anteriormente
            Para modificar las categorias creadas

Criterios de aceptación:
- La categoría debe existir para el usuario

Estimación: 8

Completa: -
```

```
ID: #16
Título: Transferir montos

Narrativa:
    		Como usuario
            Quiero poder transferir montos entre cuentas
            Para poder replicar la realidad, esto significa poder quitar un monto de una cuenta e ingresar ese monto en otra.

Criterios de aceptación:
- Las dos cuentas deben existir para el usuario
- Las dos cuentas deben tener la misma moneda
- Se debe poder quitar un monto mayor al saldo de una cuenta

Estimación: 13
Completa: -
```

```
ID: #17
Título: Eliminar cuenta

Narrativa:
    		Como usuario
            Quiero poder eliminar una cuenta
            Para poder administrar mis cuentas

Criterios de aceptación:
- Antes de eliminar una cuenta se debe solicitar una confirmación

Estimación: 5

Completa: -
```

```
ID: #18
Título: Eliminar perfil

Narrativa:
    		Como usuario
            Quiero poder eliminar mi perfil de usuario
            Para eliminar la información que generé de mis gastos

Criterios de aceptación:

Estimación: 5

Completa: -
```

```
ID: #19
Título: Tiempo de respuesta

Narrativa:
    		Como product owner
            Quiero que el tiempo de respuesta de cualquier llamado al servidor demore menos de 4 segundos
            Para optimizar la performance

Criterios de aceptación:

Estimación: 5

Completa: -
```

```
ID: #20
Título: Accesibilidad

Narrativa:
    		Como product owner
            Quiero que el sistema pase el test de Google Lighthouse con más del 90%
            Para optimizar la performance

Criterios de aceptación:

Estimación: 5

Completa: -
```

Bocetos de IU

[Ir a los bocetos](./bocetosiu/README.md)

## Validación y verificación

Verificar la especificación

Validar la solución con personas no involucradas en el proyecto

## Reflexión

Detalle del trabajo individual

### Técnicas aplicadas y aprendizajes

__Técnicas Aplicadas__

Pull Request: Realizamos Pull Request de Github para poder corregir las funcionalidad que hacíamos cada uno, esto nos permitió dar feedback sobre el trabajo realizado y a la vez evitar enviar errores a la rama principal. 

Miro: Utilizamos esta herramienta para realizar el Modelo Conceptual del Problema, la misma nos permitió crear “post-its” para plantear nuestras ideas del problema y relacionarlas unas con otras.

Balsamiq Wireframes: Para realizar el prototipo de la app utilizamos este software para prototipar ya que ofrece componentes y una interfaz amigable para realizar los prototipos.

Planning Poker: Para estimar las User Stories utilizamos la herramienta de Planning Poker la cual nos permite realizar una puntuación a cada tarea según nuestra percepción del problema.

__Aprendizajes__

Al haber realizado la presentación de git, pudimos profundizar conocimientos de ramas y resolución de conflictos y merges.

También consideramos que en base al obligatorio pudimos reforzar muchos conocimientos que se habían dado en clase como los métodos de relevamiento de requerimientos y user stories que son conceptos que en nuestros respectivos trabajos se utilizan y nos afectan directamente.

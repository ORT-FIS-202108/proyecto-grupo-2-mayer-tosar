## Instalación

* Descargar la ultima versión estable de Node.JS de https://nodejs.org/.
Instalar en la computadora de desarollo.
* Descargar la ultima versión estable de MongoDB de https://www.mongodb.com/es.
Instalar en la computadora de desarollo.

Abrir la terminal en la carpeta raíz del proyecto.
Ejecutar el comando `npm install` en las subcarpetas src/dominio y src/interfaz:
```
cd src 
cd dominio
npm install
cd ..
cd interfaz
npm install
```

Para el caso de correr el proyecto localmente no es necesario crear el archivo de .env porque por defecto toma las variables correspondientes para correr el proyecto localmente.

Para ejecutar la aplicación y acceder a la interfaz de usuario:

En una terminal, corremos el backend:
```
cd src
cd dominio
npm run start
```

En otra terminal, corremos el frontend:
```
cd src
cd interfaz
npm run start
```

Abrir en el navegador `http://localhost:3000`.
El backend por defecto corre en 'http://localhost:5000'
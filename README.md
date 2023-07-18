# Instrucciones de uso
- Ingresar a la ruta /server en la consola y hacer ```bash npm install``` para instalar todas las dependencias necesarias del servidor.

- Configurar un archivo .env que contenga la información tal y como dice en el archivo .env.example para conectarse a una base de datos en postgres que se debe llamar "erco".

- El script para ingresar todos datos a la base de datos se ejecuta al hacer un POST request a la dirección ```bash http://localhost:3000/projects/importCSV```

- Para obtener todos los resultados de la base de datos se debe hacer un GET request a la dirección ```bash http://localhost:3000/projects```

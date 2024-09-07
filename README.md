# Instalación del proyecto Frontend-Angular 18
Para poder usar el proyecto, se tiene como requisito tener instalado lo siguiente:

    NodeJS 20.11.1
    Angular CLI: 18.2.3

Una vez que se haya verificado que se tiene instalado lo anterior, será necesario descargar el repositorio o clonarlo.

Posterior a ello, para usar el proyecto se requiere que primero se ejecute el comando `composer install` esto instalará los paquetes necesarios para poder arrancar el proyecto.

Posterior a ello, se debe crear una base de datos con el nombre de tu preferencia y en el archivo `.env` se deberan colocar las credenciales para acceder a la base de datos y adiconal colocar el nombre de la base de datos.

Una vez realizado esto, se deberá ejecutar el comando `php artisan migrate:fresh --seed` para instalar las migraciones dentro de tu base de datos y adicional, crear los registros de prueba (son 5000 registros de prueba)

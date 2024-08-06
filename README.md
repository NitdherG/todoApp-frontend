# ATOM FE CHALLENGE TEMPLATE - ANGULAR

Este proyecto es una plantilla con lo necesario para comenzar a desarrollar el front-end de la aplicación de la prueba técnica de Atom. Se base en Angular con la versión 17.3.6.
Se ha realizado la instalación y configuración de varias dependencias necesarias para el desarrollo de la aplicación, como por ejemplo: Angular Material.

## Instrucciones

Siéntete libre de clonar este repositorio y utilizarlo como base para el desarrollo de la aplicación. Sigue las indicates de la prueba técnica para completar la aplicación y desarrolla como más te sientas cómodo.

De igual manera puedes documentar dentro de este archivo todo lo que deseas contar sobre tu desarrollo, como por ejemplo, decisiones de diseño, problemas encontrados, etc.

## Comentarios sobre el desarrollo

## Decisiones de Diseño

## Estructura de carpeta y archivos

La estructura va a estar definida por 3 carpetas principales core, features y shared.

src
└── app
    ├── core
    ├── features
    └── shared

- Angular 17: La aplicación está construida usando Angular 17, la última versión estable, para aprovechar las nuevas características y mejoras en el rendimiento.
  Angular Material: Se ha integrado Angular Material para ofrecer una experiencia de usuario consistente y moderna con componentes preconstruidos.
- Gestión del Estado:

Se utiliza la nueva característica implementada por angular llamada signals y el localstorage para la gestión del estado de la aplicación.

- Autenticación:

Se utiliza Firebase para la autenticación. La integración se realiza a través de @angular/fire, que facilita la conexión con los servicios de Firebase.
Estilo y Diseño:
Se utiliza un diseño simple pero a su vez muy conocido con un sistema de tablas aprovechando la libreria angular material, a su vez se agregó una paginación básica de modo a que la app sea escalable y no demore mucho la carga ya que en desarrollo demoraba un poco (por el plan utilizado)
Escalabilidad y Mantenimiento:

El proyecto está organizado para seguir buenas prácticas de desarrollo, lo que facilita su escalabilidad y mantenimiento. Esto incluye la utilización de módulos, componentes, servicios y directivas de manera estructurada.
Tecnologías Utilizadas
Angular: Framework de frontend para construir la aplicación web.
Angular Material: Biblioteca de componentes UI para Angular.
Firebase: Backend como servicio para autenticación y otras funcionalidades.
FontAwesome: Para iconografía en la aplicación.
Dependencias:

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

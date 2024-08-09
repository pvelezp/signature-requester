# Proyecto de Gestión de Incidencias

Este proyecto es una aplicación web construida con Next.js que permite visualizar, crear y actualizar incidencias. Utiliza la API de Trello para gestionar el estado de las incidencias y está estilizada con Tailwind CSS. La librería de componentes usada es Shadcn, y para las pruebas se emplea Jest junto con React Testing Library.

## Características

- **Visualización de Incidencias:** Muestra una tabla con incidencias, indicando su estado como "Hecho" o "Pendiente".
- **Creación de Incidencias:** Permite añadir nuevas incidencias.
- **Actualización de Incidencias:** Permite actualizar el estado de las incidencias.

## Tecnologías Utilizadas

- **Next.js:** Framework de React para aplicaciones web.
- **Shadcn:** Librería de componentes para la UI.
- **Tailwind CSS:** Framework de utilidades para el diseño.
- **Jest y React Testing Library:** Para pruebas unitarias y de integración.
- **Axios:** Para las solicitudes HTTP.
- **ESLint:** Para el análisis y la calidad del código.
- **API de Trello:** Para gestionar el estado y los datos de las incidencias.

## Instalación

1. Clona el repositorio:

git clone https://github.com/pvelezp/incidencias-app.git
Navega al directorio del proyecto:

Instala las dependencias:
npm install

Inicia el servidor de desarrollo:
npm run dev

La aplicación estará disponible en http://localhost:3000.

Pruebas
Para ejecutar las pruebas, usa el siguiente comando:
npm test

Esto ejecutará Jest junto con React Testing Library para verificar que todo funcione como se espera.

Uso de la API de Trello
El proyecto utiliza la API de Trello para gestionar las incidencias. Asegúrate de tener una clave API de Trello y configurar las variables de entorno adecuadas en un archivo .env.local para conectar tu aplicación con Trello.

Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request si encuentras algún problema o deseas agregar nuevas características.

Licencia
Este proyecto está licenciado bajo la Licencia MIT.

Este archivo `README.md` proporciona una visión general completa del proyecto, cubriendo las características, tecnologías, instalación, pruebas, y más. Asegúrate de reemplazar los valores de ejemplo (como el enlace del repositorio) con la información específica de tu proyecto.

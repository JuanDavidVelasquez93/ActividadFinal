# 3. Documentación técnica del sistema

## 3.1 Descripción técnica general

La aplicación fue desarrollada como una aplicación web local utilizando Angular. Está compuesta por una vista principal para la creación del pedido y una segunda vista para la consulta y gestión de pedidos creados.

El sistema utiliza almacenamiento temporal en el navegador para conservar los productos seleccionados durante la interacción del usuario. Además, los pedidos creados se almacenan localmente para poder consultarlos en la vista de pedidos.

## 3.2 Arquitectura funcional

La aplicación se organiza de manera simple en dos vistas principales:

| Vista | Propósito |
|---|---|
| Crear pedido | Permite seleccionar ingredientes, cantidades, unidad de medida, bebida y enviar el pedido. |
| Pedidos creados | Permite consultar los pedidos enviados y actualizar su estado. |

Flujo general del sistema:

```text
Usuario
  ↓
Selecciona ingredientes y bebida
  ↓
Agrega productos al carrito temporal
  ↓
Revisa o modifica el carrito
  ↓
Envía el pedido
  ↓
Consulta el pedido creado
  ↓
Actualiza estado: En preparación / Entregado
```

## 3.3 Tecnologías utilizadas

### Angular

Angular es el framework principal utilizado para construir la aplicación web. Se seleccionó porque permite crear interfaces dinámicas mediante componentes reutilizables, manejo de rutas, separación de responsabilidades y una estructura organizada del proyecto.

Justificación:

- Facilita la creación de aplicaciones web modernas.
- Permite trabajar con componentes independientes.
- Tiene soporte para pruebas unitarias.
- Mejora la organización del código.
- Es adecuado para proyectos escalables.

### TypeScript

TypeScript es el lenguaje utilizado junto con Angular. Permite trabajar con tipado estático, clases, interfaces y estructuras más robustas que JavaScript tradicional.

Justificación:

- Reduce errores durante el desarrollo.
- Facilita el mantenimiento del código.
- Permite definir modelos para productos, bebidas y pedidos.
- Mejora la legibilidad del proyecto.

### HTML

HTML se utiliza para construir la estructura visual de las páginas del sistema.

Justificación:

- Permite definir formularios, botones, listas, tablas y vistas.
- Es el estándar base para construir páginas web.
- Se integra directamente con los componentes de Angular.

### CSS

CSS se utiliza para definir la apariencia visual de la aplicación.

Justificación:

- Permite mejorar la experiencia de usuario.
- Facilita la organización visual del carrito y de los pedidos.
- Ayuda a presentar una interfaz clara, amigable y ordenada.

### LocalStorage

LocalStorage se utiliza para almacenar temporalmente información en el navegador, como los productos seleccionados y los pedidos creados.

Justificación:

- No requiere una base de datos externa.
- Permite ejecutar la aplicación localmente.
- Es suficiente para una versión inicial o prototipo académico.
- Conserva información incluso si se recarga la página.

### Node.js y npm

Node.js y npm se utilizan para instalar dependencias y ejecutar el proyecto Angular de manera local.

Justificación:

- Son necesarios para trabajar con Angular.
- Permiten instalar paquetes del proyecto.
- Facilitan la ejecución mediante comandos como `npm install` y `npm start`.


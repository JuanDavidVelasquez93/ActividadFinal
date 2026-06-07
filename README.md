# Bandeja Paisa App

Aplicación Angular local para crear pedidos de bandeja paisa, manejar un carrito temporal y consultar pedidos creados.

## Requisitos

- Node.js 18 o superior recomendado.
- Angular CLI. Si no lo tienes instalado globalmente, puedes ejecutar los comandos con `npx ng`.

## Instalación

```bash
npm install
```

## Ejecutar localmente

```bash
npm start
```

Abrir en el navegador:

```text
http://localhost:4200
```

## Compilar

```bash
npm run build
```

## Funcionalidades incluidas

- Vista para crear pedidos.
- Selección de ingredientes de la bandeja paisa.
- Selección por porción o por gramos.
- Ingreso manual de gramos.
- Carrito temporal persistido en `localStorage`.
- Edición de cantidad y unidad desde el carrito.
- Eliminación de productos del carrito.
- Selección de bebida.
- Botón para enviar pedido.
- Vista de pedidos creados.
- Detalle completo de ingredientes y bebida.
- Cambio de estado desde combo box: `En preparación` o `Entregado`.

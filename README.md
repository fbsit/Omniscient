# Omniscient Monorepo

Este repositorio contiene dos aplicaciones:

- `backend-omniscient`: API (NestJS) para gestionar Órdenes de Producción.
- `storefront-omniscient`: Frontend (Next.js) que consume la API y ofrece una UI.

## Requisitos

- Node.js 20+ (recomendado LTS)
- pnpm, yarn o npm (ejemplos usan `yarn`)

## Instalación

Instala dependencias en cada paquete:

```bash
# Backend
cd backend-omniscient
yarn install

# Frontend
cd ../storefront-omniscient
yarn install
```

## Ejecución en desarrollo

En dos terminales:

```bash
# Terminal 1: Backend (puerto 3001)
cd backend-omniscient
yarn backend:dev
```

```bash
# Terminal 2: Frontend (puerto 3000)
cd storefront-omniscient
yarn frontend:dev
```

El frontend está configurado para reenviar las rutas `/api/*` al backend en `http://localhost:3001/api/*` mediante un rewrite definido en `storefront-omniscient/next.config.ts`.

## Scripts útiles

Backend (`backend-omniscient/package.json`):
- `yarn backend:dev`: inicia Nest en watch en el puerto 3001.
- `yarn start`: inicia Nest (puerto por defecto 3000 si no se usa `backend:dev`).
- `yarn start:dev`: watch mode.
- `yarn build`: compila a `dist/`.
- `yarn test`, `yarn test:e2e`, `yarn test:cov`.

Frontend (`storefront-omniscient/package.json`):
- `yarn frontend:dev`: inicia Next en `http://localhost:3000`.
- `yarn dev`: también inicia el modo dev (Turbopack).
- `yarn build` y `yarn start` para producción.
- `yarn test` para unit tests (jsdom).

## API del Backend

Base URL: `http://localhost:3001/api`

- Estados válidos de una orden: `planned`, `scheduled`, `in_progress`, `completed`.

### Crear orden de producción

POST `/api/production-orders`

Body JSON:
```json
{
  "reference": "PO-0001",
  "product": "Widget A",
  "quantity": 100,
  "dueDate": "2025-12-31T00:00:00.000Z"
}
```

Respuesta 200:
```json
{
  "id": "uuid",
  "reference": "PO-0001",
  "product": "Widget A",
  "quantity": 100,
  "dueDate": "2025-12-31T00:00:00.000Z",
  "status": "planned",
  "createdAt": "2025-09-17T10:00:00.000Z"
}
```

Validaciones:
- `reference`: string no vacío
- `product`: string no vacío
- `quantity`: entero positivo
- `dueDate`: string ISO de fecha

### Listar órdenes de producción

GET `/api/production-orders`

Query opcional:
- `status`: filtra por estado (uno de `planned|scheduled|in_progress|completed`).

Ejemplos:
- `GET /api/production-orders`
- `GET /api/production-orders?status=planned`

Respuesta 200:
```json
[
  {
    "id": "uuid",
    "reference": "PO-0001",
    "product": "Widget A",
    "quantity": 100,
    "dueDate": "2025-12-31T00:00:00.000Z",
    "status": "planned",
    "createdAt": "2025-09-17T10:00:00.000Z"
  }
]
```

## Consumo desde el Frontend

El frontend usa `fetch` contra `/api/production-orders` y el rewrite lo envía al backend:
- Listar: `GET /api/production-orders`
- Crear: `POST /api/production-orders`

Código de ejemplo: `storefront-omniscient/app/lib/api.ts`.

## Testing

- Backend: `cd backend-omniscient && yarn test`
- Frontend: `cd storefront-omniscient && yarn test`

## Producción

Backend:
```bash
cd backend-omniscient
yarn build
yarn start:prod
```

Frontend:
```bash
cd storefront-omniscient
yarn build
yarn start
```

Asegúrate de exponer el backend bajo `/api` y ajustar el destino del rewrite del frontend si el backend no corre en `localhost:3001`.

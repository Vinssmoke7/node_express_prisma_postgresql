# Mi Backend - Node.js + Express + Prisma + PostgreSQL

API REST desarrollada con **Node.js**, **Express**, **Prisma ORM** y **PostgreSQL**, con autenticación mediante **JWT** y contraseñas encriptadas con **bcryptjs**. El proyecto está dockerizado para facilitar su despliegue.

---

## Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Base de Datos y Prisma](#-base-de-datos-y-prisma)
- [Docker](#-docker)
- [Endpoints de la API](#-endpoints-de-la-api)
- [Ejemplo de Uso](#-ejemplo-de-uso)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## ✨ Características

- 🔐 Autenticación con **JWT** (JSON Web Tokens).
- 🔒 Encriptación de contraseñas con **bcryptjs**.
- 🐘 Base de datos **PostgreSQL** gestionada con **Prisma ORM**.
- 🐳 Configuración con **Docker** y **docker-compose**.
- 🧩 Arquitectura modular por capas (routes, controllers, models, middlewares).
- 🌐 CORS habilitado.
- ⚙️ Manejo centralizado de errores.
- 🔄 Recarga automática en desarrollo con **nodemon**.

---

## 🛠 Tecnologías

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Node.js | >= 18 | Entorno de ejecución |
| Express | ^4.18.3 | Framework web |
| Prisma | ^5.10.0 | ORM para PostgreSQL |
| PostgreSQL | 15+ | Base de datos relacional |
| JWT | ^9.0.2 | Autenticación |
| bcryptjs | ^2.4.3 | Hash de contraseñas |
| dotenv | ^16.4.5 | Variables de entorno |
| cors | ^2.8.5 | Control de acceso HTTP |
| Docker | - | Contenedores |

---

## 📁 Estructura del Proyecto

```
.
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── prisma
│   ├── migrations
│   │   ├── 20260915131057_first
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── README.md
└── src
    ├── app.js
    ├── config
    │   └── db.js
    ├── controllers
    │   ├── auth.controller.js
    │   ├── pets.controller.js
    │   └── user.controller.js
    ├── index.js
    ├── middlewares
    │   ├── auth.middleware.js
    │   └── error.middleware.js
    ├── models
    │   ├── pet.model.js
    │   └── user.model.js
    └── routes
        ├── auth.routes.js
        ├── pets.routes.js
        └── user.routes.js
```

---

## ✅ Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (o usar Docker)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) (opcional, recomendado)

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd node_express_prisma_postgres
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (ver sección [Variables de Entorno](#-variables-de-entorno)).

### 4. Generar el cliente de Prisma

```bash
npm run prisma:generate
```

### 5. Ejecutar las migraciones

```bash
npm run prisma:migrate
```

### 6. Iniciar el servidor

```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado).

---

## 🔑 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Servidor
PORT=3000

# Base de datos PostgreSQL
DATABASE_URL="postgresql://usuario:password@localhost:5432/mi_backend?schema=public"

# JWT
JWT_SECRET=tu_clave_secreta_super_segura
JWT_EXPIRES_IN=1d
```

> ⚠️ **Importante:** Nunca subas el archivo `.env` a control de versiones. Añádelo a tu `.gitignore`.

---

## 📜 Scripts Disponibles

En el `package.json` se definen los siguientes scripts:

| Script | Comando | Descripción |
|--------|---------|-------------|
| `start` | `node src/index.js` | Inicia el servidor en producción |
| `dev` | `nodemon src/index.js` | Inicia el servidor en desarrollo con recarga automática |
| `prisma:generate` | `prisma generate` | Genera el cliente de Prisma |
| `prisma:migrate` | `prisma migrate dev` | Crea y aplica migraciones en desarrollo |

---

## 🗄 Base de Datos y Prisma

### Esquema

El esquema de la base de datos se encuentra en `prisma/schema.prisma`. Actualmente incluye los modelos:

- **User**: usuarios del sistema.
- **Pet**: mascotas asociadas a usuarios.

### Comandos útiles de Prisma

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear una nueva migración
npx prisma migrate dev --name nombre_migracion

# Aplicar migraciones en producción
npx prisma migrate deploy

# Abrir Prisma Studio (interfaz visual)
npx prisma studio

# Resetear la base de datos
npx prisma migrate reset
```

---

## 🐳 Docker

El proyecto incluye `Dockerfile` y `docker-compose.yml` para levantar la aplicación y la base de datos PostgreSQL en contenedores.

```bash
# Levantar todo
docker compose up --build

# En segundo plano
docker compose up -d --build

# Ver logs
docker compose logs -f api

# Entrar al contenedor de la API
docker compose exec api sh

# Conectarse a Postgres
docker compose exec postgres psql -U postgres -d curso_node_express

# Detener y eliminar contenedores (mantiene datos)
docker compose down

# Detener y borrar TODO (incluida la BD)
docker compose down -v
```

### Servicios definidos

- **app**: Aplicación Node.js (puerto `3000`).
- **db**: PostgreSQL (puerto `5432`).

> 💡 Si usas Docker, asegúrate de que `DATABASE_URL` apunte al servicio `db`, por ejemplo:
> ```
> DATABASE_URL="postgresql://postgres:postgres@db:5432/mi_backend?schema=public"
> ```

---

## 🌐 Endpoints de la API

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registrar nuevo usuario | ❌ |
| POST | `/api/auth/login` | Iniciar sesión y obtener token | ❌ |

### 👤 Usuarios (`/api/users`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/users` | Listar usuarios | ✅ |
| GET | `/api/users/:id` | Obtener usuario por ID | ✅ |
| PUT | `/api/users/:id` | Actualizar usuario | ✅ |
| DELETE | `/api/users/:id` | Eliminar usuario | ✅ |

### 🐶 Mascotas (`/api/pets`)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/api/pets` | Listar mascotas | ✅ |
| GET | `/api/pets/:id` | Obtener mascota por ID | ✅ |
| POST | `/api/pets` | Crear nueva mascota | ✅ |
| PUT | `/api/pets/:id` | Actualizar mascota | ✅ |
| DELETE | `/api/pets/:id` | Eliminar mascota | ✅ |

> 🔒 Los endpoints marcados con ✅ requieren un token JWT en el header:
> ```
> Authorization: Bearer <tu_token>
> ```

---

## 🧪 Ejemplo de Uso

### Registro de usuario

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@example.com","password":"123456"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@example.com","password":"123456"}'
```

### Crear mascota (autenticado)

```bash
curl -X POST http://localhost:3000/api/pets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TU_TOKEN>" \
  -d '{"name":"Firulais","species":"Perro","age":3}'
```
---

## 👨‍💻 Autor

Desarrollado con ❤️ por **[Ingeniero. Andres Godoy]**

- GitHub: [@andres.1dgm7](https://github.com/andres.1dgm7)
- Email: andres.1dgm7@gmail.com
# Simple App con Node + Nginx (Docker) y Postgres en Host

Este proyecto levanta una aplicación Node.js dentro de Docker, detrás de un proxy Nginx.  
La base de datos **NO corre en contenedor**, sino en la máquina host (local).

---

## 📦 Requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- Postgres instalado en tu máquina host:
  - **Usuario:** `postgres`
  - **Password:** `admin`
  - **Base de datos:** `admin`
  - **Puerto:** `5432`

---

## 📂 Estructura del proyecto

```

simple-app/
├── docker-compose.yml        # define servicios: app + nginx
├── Dockerfile                # build de la app Node
├── nginx.conf                # configuración de Nginx (archivo, no carpeta)
├── package.json
├── package-lock.json
├── dist/                     # build de tu app Node (código compilado)
│   └── src/
│       └── index.js
└── README.md                 # documentación del proyecto
```

---

## ⚙️ Configuración

### Dockerfile

Construye la app Node.js en Alpine:

```dockerfile
FROM node:20-alpine

WORKDIR /usr/local/app

COPY package*.json ./
RUN npm install --production

COPY dist ./dist

ENV PORT=3000

CMD ["node","./dist/src/index.js"]



```

docker-compose.yml
Define dos servicios: (Node) y (proxy).

```
version: "3.9"
services:
app:
build: .
container_name: node_app
expose: - "3000"
environment: - PORT=3000 - DB_NAME=admin - DB_USER=postgres - DB_PASS=admin - DB_HOST=host.docker.internal - DB_PORT=5432

nginx:
image: nginx:alpine
container_name: nginx_proxy
ports: - "80:80"
volumes: - ./nginx.conf:/etc/nginx/nginx.conf:ro
depends_on: - app
```

nginx.conf
Archivo mínimo de configuración para proxy inverso:

```
events {}

http {
  server {
    listen 80;

    location / {
      proxy_pass http://app:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }
  }
}
```

🚀 Levantar el proyecto

- Asegurate de que Postgres esté corriendo en tu máquina host con:

```
psql -U postgres -d admin
```

- Construí y levantá los contenedores:

```
docker-compose up --build
```

- Accedé a la app en:

```
http://localhost:80   #para usarlo desde ngnix
http://localhost:3000   #para usarlo desde docker
```

🔑 Variables de entorno

- PORT=3000 → puerto interno de la app Node.
- DB_NAME=admin → nombre de la base de datos.
- DB_USER=postgres → usuario de Postgres.
- DB_PASS=admin → contraseña de Postgres.
- DB_HOST=host.docker.internal → host de Postgres (máquina local).
- DB_PORT=5432 → puerto de Postgres.

📝 Notas

- host.docker.internal funciona en Docker Desktop (Windows/Mac/Linux).
- Si usás Docker en Linux nativo, podés correr con --network host y usar DB_HOST=localhost.
- Nginx escucha en el puerto 80 y reenvía las peticiones al servicio app en el puerto 3000.

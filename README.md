# 🚗 Sistema de plantas - nodejs y reactjs

## 📂 Estructura del Proyecto

Vista general de la organización del proyecto.

```  
📂 backend/                          # Contiene la API y lógica de negocio (nodejs)
│   📂 src/                          # Código fuente de la aplicación
│   │   index.js                      # Se encuentran todas las consultas y la conexion a la base de datos.
│   │   .gitignore                    # Configuración para archivos que no se deben subir al repositorio.
│   │   DockerFile                    # Configuración de docker para crear un contenedor
│   │   package.json                  # Dependencias del proyecto como nodejs, core, etc.
📂 frontend/                         # Contiene la presentación de la aplicación.
│   📂 src/                          # Código fuente de la aplicación
│   │   index.js                      # Raiz principal
│   │   .gitignore                    # Configuración para archivos que no se deben subir al repositorio.
│   │   DockerFile                    # Configuración de docker para crear un contenedor
│   │   package.json                  # Dependencias del proyecto como nodejs, core, etc.
📂 database/                         # Backup de la base de datos postgresql15
│   📄 README.md                      # Documentación del backend
📄  docker-compose.yml                # Archivo necesario para dockerizar la apliación se debe ejecutar docker compose up --build
📄 README.md                          # Documentación principal del proyecto
```

## ⚙️ Configuración

### 1️⃣ Backend (nodejs)
1. Entrar a la carpeta `backend`. 
2. Instalar dependencias:  
   ```bash
   npm install
   node index.js
   ```
### 2️⃣ Frontend  
1. Entrar a la carpeta `frontend`.  
2. Instalar dependencias:  
   ```bash
   npm install
   npm run dev
   ```
### 3️⃣ Base de datos
- Ejecutar el archivo `backup.sql` en postgresql15.

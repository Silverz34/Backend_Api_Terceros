# 1. Usamos una versión ligera de Node.js 
FROM node:20-alpine

# 2. Establecemos la carpeta de trabajo dentro del contenedor
WORKDIR /src

# 3. Copiamos solo los archivos de configuración de dependencias primero
COPY package*.json ./
COPY tsconfig.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos todo el resto de nuestro código fuente
COPY src/ ./src/

# 6. Compilamos el código TypeScript a JavaScript 
RUN npm run build

# 7. Exponemos el puerto que configuramos para nuestra API
EXPOSE 4000

# 8. Comando final para iniciar el servidor compilado
CMD ["npm", "start"]
# Usar una imagen de Node.js
FROM node:18

# Crear el directorio de trabajo
WORKDIR /app

# Copiar los archivos de la API
COPY package*.json ./
RUN npm install

COPY . .

# Exponer el puerto que usa tu API
EXPOSE 4000

CMD ["node", "server.js"]

# Usar una imagen de Node.js para construir el proyecto
FROM node:18 AS build

# Crear el directorio de trabajo
WORKDIR /app

# Copiar los archivos de Angular
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Usar una imagen de NGINX para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/dist/kanban /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

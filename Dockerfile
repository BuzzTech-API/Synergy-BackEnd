FROM node:20-alpine as backend

# Cria o diretório do app
WORKDIR /usr/src/app

# Copia  os arquivos para a pasta de trabalho (workdir)
COPY --chown=node:node ./nestjs .

# Instala as dependencias 
RUN npm install --quiet --no-optional --no-fund
RUN npm run build

RUN chown -R node:node /usr/src/app/dist

EXPOSE 5000
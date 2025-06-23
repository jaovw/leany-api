FROM node:18-alpine

# Diretório de trabalho na imagem
WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Compila o projeto (NestJS usa TypeScript)
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main.js"]

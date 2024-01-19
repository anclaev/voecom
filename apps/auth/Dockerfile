ARG node_version=18.16.0

# Stage 1: Установка зависимостей
FROM node:${node_version} AS deps

LABEL maintainer="anclaev<iahugo@yandex.ru>"
LABEL description="Voecom Auth"

WORKDIR /auth

COPY dist/apps/auth/package.json ./package.json
COPY prisma ./prisma
COPY apps/auth/entrypoint.sh ./entrypoint.sh

RUN yarn install
RUN yarn add -D prisma
RUN yarn prisma generate

# Stage 3: Запуск приложения
FROM node:${node_version} AS runtime

ENV NODE_ENV production
ENV API_PORT 3002

WORKDIR /home/user/voecom/auth

COPY --from=deps /auth/node_modules ./node_modules
COPY --from=deps /auth/package.json ./package.json
COPY --from=deps /auth/prisma ./prisma
COPY --from=deps /auth/entrypoint.sh ./entrypoint.sh

COPY dist/apps/auth/* .

RUN chown -R node:node .
RUN chmod +x ./entrypoint.sh

USER node

EXPOSE ${API_PORT}

ENTRYPOINT ["./entrypoint.sh"]

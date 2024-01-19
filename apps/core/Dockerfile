ARG node_version=18.16.0

# Stage 1: Установка зависимостей
FROM node:${node_version} AS deps

LABEL maintainer="anclaev<iahugo@yandex.ru>"
LABEL description="Voecom"

WORKDIR /core

COPY dist/apps/core/package.json ./package.json
COPY prisma ./prisma
COPY apps/core/entrypoint.sh ./entrypoint.sh

RUN yarn install
RUN yarn add -D prisma
RUN yarn prisma generate

# Stage 3: Запуск приложения
FROM node:${node_version} AS runtime

ENV NODE_ENV production
ENV API_PORT 3001

WORKDIR /home/user/voecom/core

COPY --from=deps /core/node_modules ./node_modules
COPY --from=deps /core/package.json ./package.json
COPY --from=deps /core/prisma ./prisma
COPY --from=deps /core/entrypoint.sh ./entrypoint.sh

COPY dist/apps/core/* .

RUN chown -R node:node .
RUN chmod +x ./entrypoint.sh

USER node

EXPOSE ${API_PORT}

ENTRYPOINT ["./entrypoint.sh"]

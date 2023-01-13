FROM node:19 as base

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY src ./src
COPY tsconfig.json ./tsconfig.json

RUN npm run build

FROM gcr.io/distroless/nodejs:18

COPY --from=base ./node_modules ./node_modules
COPY --from=base /build /build
COPY src/public build/src/public

EXPOSE 3000

CMD ["dist/src/server.js"]

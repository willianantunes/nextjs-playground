FROM node:12-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

# Next.JS requires devDependencies to build the project
RUN npm ci --only=production
RUN cp -R node_modules prod_node_modules

COPY . ./

RUN npm ci && npm run build

FROM node:12-alpine as main

WORKDIR /app

# Copy production node_modules
COPY --from=build /app/prod_node_modules ./node_modules
COPY --from=build /app/package.json ./
# Server-side
COPY --from=build /app/src ./src
# SPA
COPY --from=build /app/dist ./dist

CMD npm run start

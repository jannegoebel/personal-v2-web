# check=skip=SecretsUsedInArgOrEnv
# The skip is file-wide -- BuildKit has no per-instruction form -- so a future
# ARG or ENV that IS sensitive gets no warning either. Pass those with
# --secret and a mount rather than declaring them here.

# ---- build ----
# Keep the major version in sync with .nvmrc.
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Baked into the public bundle by design: the backend API is public and the
# key is an identifier, not a credential. Values differ per environment, so
# this image is environment-specific -- build one per target.
#
# Declared below `npm ci` on purpose: an ARG invalidates every layer under it,
# so hoisting these would reinstall all dependencies on any environment change.
ARG VITE_FRONTEND_URL
ARG VITE_BACKEND_URL
ARG VITE_BACKEND_KEY

# Checked before the source COPY, so a missing argument fails without waiting
# on the build. .env* is dockerignored, so these only ever come from
# --build-arg; a missing one would inline as the string `undefined` and fail
# silently in the browser. A trailing slash on the URL is fine -- both
# consumers normalise it.
RUN : "${VITE_FRONTEND_URL:?missing --build-arg VITE_FRONTEND_URL}"; \
    : "${VITE_BACKEND_URL:?missing --build-arg VITE_BACKEND_URL}"; \
    : "${VITE_BACKEND_KEY:?missing --build-arg VITE_BACKEND_KEY}"

COPY . .
RUN npm run build
# nginx serves whatever it is handed, so a broken build would otherwise ship
# as an empty document root and only surface as 404s behind the proxy.
RUN test -f dist/index.html || { echo "build produced no dist/index.html" >&2; exit 1; }

# ---- artifact ----
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/healthz || exit 1

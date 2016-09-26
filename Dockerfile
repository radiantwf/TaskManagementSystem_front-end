FROM nginx:latest

RUN set -x \
	&& apt-get update \
    && apt-get install -y --no-install-recommends \
    vim

RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /etc/nginx/conf.d/*

COPY ./dist /front_end

COPY server.conf /etc/nginx/conf.d/server.conf
COPY nginx.conf /etc/nginx/nginx.conf
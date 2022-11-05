FROM denoland/deno:alpine-1.25.0

EXPOSE 7777

WORKDIR /server

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--no-check", "index.js" ]
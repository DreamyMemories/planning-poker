FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:16

RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
RUN apt update
RUN export DEBIAN_FRONTEND=noninteractive
RUN apt install -y mongodb-mongosh
RUN if [ "$(dpkg --print-architecture)" = "amd64" ]; then apt install -y mongodb-database-tools; fi
RUN apt clean -y
RUN rm -rf /var/lib/apt/lists/*


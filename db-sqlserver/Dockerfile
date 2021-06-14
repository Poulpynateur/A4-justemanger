FROM mcr.microsoft.com/mssql/server:2017-CU17-ubuntu

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN chmod +x /usr/src/app/run-initialization.sh

CMD /bin/bash ./entrypoint.sh
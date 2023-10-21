FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=laravel


COPY banco.sql /docker-entrypoint-initdb.d/


EXPOSE 3306

CMD ["mysqld"]
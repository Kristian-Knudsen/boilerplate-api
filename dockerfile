# FOR DATABASE CONTAINER

FROM mysql

COPY ./init_db.sql /docker-entrypoint-initdb.d

ENV MYSQL_ROOT_PASSWORD=VERYSECRETROOTPASSWORD

CMD [ "--default-authentication-plugin=mysql_native_password" ]
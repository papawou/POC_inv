#!/bin/bash

sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/17/main/postgresql.conf
echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/17/main/pg_hba.conf

service postgresql start

psql --command="CREATE DATABASE $DB_NAME;"

cat > configure.sql << EOF
CREATE USER $DB_USERNAME WITH PASSWORD '$DB_USERPWD';
ALTER USER $DB_USERNAME WITH SUPERUSER;
EOF

psql --dbname=$DB_NAME --file="./configure.sql"

service postgresql stop

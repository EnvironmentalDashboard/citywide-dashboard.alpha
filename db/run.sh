#!/bin/bash

# Read our password from our secret file.
if [ -f "db.config" ]
then
	. db.config
else
	echo "db.config not found"
	exit 1
fi

# create cwd volume with `docker volume create cwd`
docker run -d -p 52000:27017 --restart always -v cwd:/var/lib/mongodb -e MONGO_INITDB_ROOT_USERNAME=$user -e MONGO_INITDB_ROOT_PASSWORD=$pass --name cwd-mongo mongo
# mongo -u "mongoadmin" -p "pass123"

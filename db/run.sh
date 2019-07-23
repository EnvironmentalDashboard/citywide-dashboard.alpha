#!/bin/bash

# Read our password from our secret file.
if [ -f "db.config" ]
then
	if [ -f "db.config" ]
	then
		. db.config
	fi
fi

# create cwd volume with `docker volume create cwd`
docker run -d -p 27017:27017 -v cwd:/var/lib/mongodb -e MONGO_INITDB_ROOT_USERNAME=$user -e MONGO_INITDB_ROOT_PASSWORD=$pass --name cwd-mongo mongo
# mongo -u "mongoadmin" -p "pass123"

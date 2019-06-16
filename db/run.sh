#!/bin/bash

# create cwd volume with `docker volume create cwd`
docker run -d -p 27017:27017 -v cwd:/var/lib/mongodb -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=pass123 --name cwd-mongo mongo
# mongo -u "mongoadmin" -p "pass123"

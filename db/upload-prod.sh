#!/bin/bash
#
# Note: this script assumes that you have already downloaded the production database.
# If you have not, please run `./download-prod.sh` first.

docker exec -i cwd-mongo sh -c 'mongo --quiet --eval "db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})"'
docker exec -i cwd-mongo sh -c 'mongorestore --archive --gzip' < ./prod/dump.gz

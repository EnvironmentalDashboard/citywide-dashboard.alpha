#! /bin/bash

parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
. "$parent_path/db.config"

temp=$(mktemp); docker exec cwd-mongo mongodump --uri=$cle_uri --gzip --archive > $temp; docker exec -i cwd-mongo sh -c 'mongo $qa_uri --quiet --eval "db.getMongo().getDBNames().forEach(function(i){db.getSiblingDB(i).dropDatabase()})"'; docker exec -i cwd-mongo sh -c 'mongorestore --uri=$qa_uri --archive --gzip' < $temp; rm $temp

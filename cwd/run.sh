#!/bin/bash

# API_URL needs to be set to the relevant / correct thing

# add this as an option to switch to using a different path
# -e "PATH_PREFIX=citywide-dashboard"
docker run -dit -p 42000:80 -v $(pwd):/usr/src/app --restart always -e "API_URL=localhost:3006" --link cwd-mongo:mongo --link cwd-be:backend --name cwd citywide-dashboard

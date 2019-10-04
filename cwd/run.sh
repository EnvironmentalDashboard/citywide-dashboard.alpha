#!/bin/bash

# add this as an option to switch to using a different path
# -e "PATH_PREFIX=citywide-dashboard"
docker run -dit -p 42000:80 -v $(pwd):/usr/src/app --restart always --link cwd-mongo:mongo --name cwd citywide-dashboard

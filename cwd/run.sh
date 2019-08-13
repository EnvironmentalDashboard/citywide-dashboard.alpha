#!/bin/bash

docker run -dit -p 42000:80 -v $(pwd):/usr/src/app -e APP_ENV=dev --restart always --name cwd citywide-dashboard

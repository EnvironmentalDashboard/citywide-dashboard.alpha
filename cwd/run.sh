#!/bin/bash

docker run -dit -p 42000:80 -v $(pwd):/usr/src/app --restart always --name cwd citywide-dashboard

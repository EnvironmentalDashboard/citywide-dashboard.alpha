#!/bin/bash

docker run -dit -p 32000:80 --restart always --name cwd citywide-dashboard

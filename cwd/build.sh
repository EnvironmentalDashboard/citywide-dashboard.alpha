#!/bin/bash

docker build --build-arg WEBPACK="npm run build-dev" -t citywide-dashboard .

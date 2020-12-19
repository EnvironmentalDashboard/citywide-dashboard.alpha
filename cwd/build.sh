#!/bin/bash

production_domain=communityhub.cloud
domain=`cut -f 2- -d . <<< $HOSTNAME`

if [ "$domain" = "$production_domain" ] || [ "$HOSTNAME" = "$production_domain" ]
then
  env=prod
else
  env=dev
fi

docker build  --build-arg APP_ENV=$env -t citywide-dashboard .

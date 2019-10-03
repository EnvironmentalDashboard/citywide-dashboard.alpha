#!/bin/bash

mongodump --uri="mongodb://clevelandCwdEditor:password123@159.89.232.129:52000/cleveland-cwd" --gzip --archive > prod/dump.gz

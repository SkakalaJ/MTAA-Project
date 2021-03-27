#! /bin/bash

WAIT_HOSTS="$POSTGRES_HOST:5432" wait-for || exit 1

if [ "$RUN_TYPE" == "api" ]; then
    npm run migrations:run || exit 1
    # npm run seeds:run || exit 1
fi

exec npm run start
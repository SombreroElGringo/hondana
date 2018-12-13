#!/bin/bash

DB=$1
COLLECTIONS=( authors books bookcases users )

for collection in "${COLLECTIONS[@]}"; do
    echo "Importing $DB/$collection ..."
    mongoimport -d $DB -c $collection --file .mongodb/seeds/$collection.json --jsonArray
done

#!/bin/bash

DB=$1
COLLECTIONS=( authors books bookcases users )

for collection in "${COLLECTIONS[@]}"; do
    echo "Drop $DB/$collection ..."
    mongo $DB --eval "db.$collection.drop()"
    echo "Importing $DB/$collection ..."
    mongoimport -d $DB -c $collection --file .mongodb/seeds/$collection.json --jsonArray
done

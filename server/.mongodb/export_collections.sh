#!/bin/bash

DB=$1
COLLECTIONS=$(mongo localhost:27017/$DB --quiet --eval "db.getCollectionNames()" | jq '. | join(" ")')

for COLLECTION in $COLLECTIONS; do
    collection=$(echo $COLLECTION | tr -d '"')
    echo "Exporting $DB/$collection ..."
    mongoexport -d $DB -c $collection -o $collection.json --jsonArray --pretty
done

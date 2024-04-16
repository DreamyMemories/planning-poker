#!/bin/bash
echo "sleeping for 10 seconds"
sleep 10

echo mongo_setup.sh time now: `date +"%T" `
mongosh --host mongo1:27017 <<EOF
  var cfg = {
    "_id": "rs0",
    "version": 1,
    "members": [
      {
        "_id": 0,
        "host": "mongo1:27017",
        "priority": 2
      },
      {
        "_id": 1,
        "host": "mongo2:27017",
        "priority": 0
      }
    ]
  };
  rs.initiate(cfg);
EOF

echo "sleeping for 10 seconds for repl config to apply"
sleep 10

echo "setting up intial db configuration"
mongosh --host mongo1:27017 ./config/init.js

echo "done"

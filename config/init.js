const dbName = "planning-poker";
const collection = 'planning-poker';

// create planning poker db
use(dbName);

// Create a new collection.
db.createCollection(collection);

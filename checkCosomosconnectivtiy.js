// cosmosdb_fetch_all.js
// Fully self-contained script to connect to Cosmos DB and list all documents from a container

import { CosmosClient } from '@azure/cosmos';

// 🔐 Hardcoded credentials and config
const COSMOS_ENDPOINT = 'https:/443/';
const COSMOS_KEY = '3BYnddEEs7O2y9hSfIpZLYWBouACDb3N0O5w==';
const COSMOS_DB = 'marrt';
const COSMOS_CONTAINER = 'azta';

// ✅ Initialize Cosmos client
const client = new CosmosClient({
  endpoint: COSMOS_ENDPOINT,
  key: COSMOS_KEY
});

// ✅ Reference database and container
const db = client.database(COSMOS_DB);
const container = db.container(COSMOS_CONTAINER);

// ✅ Fetch and print all documents
async function fetchAllDocuments() {
  try {
    // Confirm container is valid
    const { resource: containerInfo } = await container.read();
    console.log('✅ Connected to container:', containerInfo.id);

    const { resources } = await container.items
      .query('SELECT * FROM c')
      .fetchAll();

    console.log(`\n📦 Retrieved ${resources.length} documents.`);
    resources.forEach((doc, idx) => {
      console.log(`\n--- Document ${idx + 1} ---`);
      console.dir(doc, { depth: null });
    });
  } catch (err) {
    console.error('❌ Error connecting to Cosmos DB or fetching data:', err);
  }
}

fetchAllDocuments();

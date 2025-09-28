# MidKey
Authentication using midnight 

my-midkey-app/
├── docker-compose.yml         # Single file to run Keycloak & other services

├── compact-contract/          # Your Midnight ZK smart contract
│   ├── src/
│   │   └── Verifier.cts         # The main contract file written in Compact
│   └── compact.json             # Configuration for your contract

├── 📁 proof-server/              # Backend service that generates proofs
│   ├── index.js                 # Main server file (e.g., Node.js/Express)
│   ├── package.json
│   └── .env                     # Environment variables (secrets, URLs)

├── 📁 keycloak-provider/         # The custom Java code for Keycloak
│   ├── src/main/java/com/yourcompany/
│   │   └── MidnightIdentityProvider.java # The custom authentication logic
│   └── pom.xml                    # Maven project file for building the provider

└── 📁 frontend/                  # Your React user interface
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── LoginPage.js
    │   │   └── ProtectedPage.js
    │   ├── App.js
    │   └── index.js
    └── package.json
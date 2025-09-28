import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId } from '@midnight-ntwrk/zswap';
import express from 'express';

// --- CONFIGURATION ---
// Contract address from deployment
const CONTRACT_ADDRESS = '0xde848af7977698'; 

// This is the secret key that matches the one you used to deploy the contract.
// In a real app, the user would provide this, but we'll hardcode it for now.
const USER_SECRET_KEY = '19830@midkey'; 

const app = express();
const port = 3001; // Port for our proof server

// This is the main API endpoint that Keycloak and our frontend will call.
app.post('/generate-and-verify-proof', async (req, res) => {
  console.log('Received request to verify proof...');
  
  let wallet;
  try {
    // 1. CREATE A "SCRIPT WALLET" INSTANCE
    // This uses the WalletBuilder from the docs you found. It connects to the
    // testnet and our local proving server (which runs in Docker).
    console.log('Building wallet...');
    wallet = await WalletBuilder.build(
      'https://indexer.testnet-02.midnight.network/api/v1/graphql',
      'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws',
      'http://localhost:6300', // This is the default URL for the Compact proof server
      'https://rpc.testnet-02.midnight.network',
      '0000000000000000000000000000000000000000000000000000000000000000', // A generic seed for the script wallet
      NetworkId.TestNet
    );

    wallet.start();
    console.log('Wallet started and syncing...');

    // 2. PREPARE THE CONTRACT CALL
    // We are telling the wallet we want to call the `verify` circuit on our deployed contract.
    console.log(`Preparing to call 'verify' on contract: ${CONTRACT_ADDRESS}`);
    const callRecipe = await wallet.contractCall({
      contractAddress: CONTRACT_ADDRESS,
      circuitName: 'verify',
      args: [], // The 'verify' circuit has no public arguments
      witnesses: {
        // This is the most important part!
        // We are providing the implementation for the `witness secretKey()` in our contract.
        // The SDK will take this value and generate the ZK proof with it.
        secretKey: USER_SECRET_KEY,
      }
    });

    // 3. GENERATE THE PROOF AND SUBMIT THE TRANSACTION
    console.log('Generating proof...');
    const provenTx = await wallet.proveTransaction(callRecipe);

    console.log('Submitting transaction to the network...');
    const submittedTx = await wallet.submitTransaction(provenTx);
    
    console.log('Proof verified successfully! Transaction ID:', submittedTx);

    // If we reach here, the `assert` in the contract passed.
    res.status(200).json({ success: true, transactionId: submittedTx });

  } catch (error) {
    // If the `assert` in the contract fails, the transaction will fail, and we'll end up here.
    console.error('Proof verification failed:', error.message);
    res.status(400).json({ success: false, error: error.message });

  } finally {
    // 4. CLEAN UP
    // Always close the wallet connection.
    if (wallet) {
      await wallet.close();
      console.log('Wallet connection closed.');
    }
  }
});

app.listen(port, () => {
  console.log(`Proof server listening on http://localhost:${port}`);
});
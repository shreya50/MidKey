import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId } from '@midnight-ntwrk/zswap';
import { Mnemonic, PhraseSize } from '@midnight-ntwrk/wallet-sdk-hd';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Loading configuration from environment variables
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const USER_SECRET_KEY = process.env.SECRET_KEY;
const SERVER_SEED_PHRASE = process.env.SERVER_SEED_PHRASE;
const PROOF_SERVER_URL = process.env.PROOF_SERVER_URL;
const INDEXER_URL = process.env.INDEXER_URL;
const INDEXER_WS_URL = process.env.INDEXER_WS_URL;
const RPC_URL = process.env.RPC_URL;
const PORT = process.env.PORT || 3001;
const app = express();

// This is the main API endpoint that Keycloak will call. It performs the entire zero-knowledge proof verification flow.
app.post('/generate-and-verify-proof', async (req, res) => {
  console.log('Received request to verify proof...');

  let wallet;
  try {
    // Intiatlixzing the wallet for the server
    console.log('... Initializing server wallet from seed phrase...');
    // We convert our 12-word phrase into a hexadecimal seed that the WalletBuilder can use.
    const seed = Mnemonic.toSeed(SERVER_SEED_PHRASE, PhraseSize.S12);

    console.log('... Building wallet from seed...');
    wallet = await WalletBuilder.build(
      INDEXER_URL, // Public Indexer URL
      INDEXER_WS_URL, // Public Indexer WebSocket
      PROOF_SERVER_URL, // The local Midnight Proof Server (in Docker)
      RPC_URL, // Public RPC Node URL
      seed, // The seed for our server's wallet
      NetworkId.TestNet
    );

    await wallet.start();
    console.log('... Wallet started and syncing with the network.');

    // --- Step B: Prepare the Smart Contract Call ---
    console.log(`... Preparing to call the 'verify' function on contract: ${CONTRACT_ADDRESS}`);
    const callRecipe = await wallet.contractCall({
      contractAddress: CONTRACT_ADDRESS,
      circuitName: 'verify',
      args: [], // Our 'verify' function has no public arguments.
      witnesses: {
        // This is where we provide the private data. The SDK uses this to
        // generate the ZK proof without sending the secret to the blockchain.
        secretKey: USER_SECRET_KEY,
      }
    });

    // --- Step C: Generate the Proof and Submit the Transaction ---
    console.log('... Generating the zero-knowledge proof. This may take a moment...');
    const provenTx = await wallet.proveTransaction(callRecipe);

    console.log('... Submitting the proven transaction to the network...');
    const submittedTx = await wallet.submitTransaction(provenTx);
    
    console.log('SUCCESS! Proof verified on-chain. Transaction ID:', submittedTx);
    
    // If we get here, the 'assert' in our contract passed successfully.
    res.status(200).json({ success: true, transactionId: submittedTx });

  } catch (error) {
    // If the proof is wrong or the 'assert' fails, the transaction will be rejected,
    // and the code will jump to this error block.
    console.error('FAILED! Proof verification failed:', error.message);
    res.status(400).json({ success: false, error: error.message });

  } finally {
    // --- Step D: Clean Up ---
    // Always close the wallet connection to release resources.
    if (wallet) {
      await wallet.close();
      console.log('... Wallet connection closed.');
    }
  }
});

// A helper function that runs only once when the server starts.It initializes a temporary wallet just to print its public address,
// so you know where to send the tDUST tokens.
async function printServerWalletAddress() {
  console.log('Initializing server wallet to get its address...');
  const seed = Mnemonic.toSeed(SERVER_SEED_PHRASE, PhraseSize.S12);
  const tempWallet = await WalletBuilder.build(
    INDEXER_URL,
    INDEXER_WS_URL,
    PROOF_SERVER_URL,
    RPC_URL,
    seed,
    NetworkId.TestNet
  );
  
  const address = await tempWallet.getAddress();
  console.log("Midnight Proof Server Wallet");
  console.log(`Address: ${address}`);
  console.log("ACTION REQUIRED: Please send testnet tDUST to this address.");
  
  await tempWallet.close();

  // Start the main API server after printing the address.
  app.listen(PORT, () => {
    console.log(`API server is now listening on http://localhost:${PORT}`);
  });
}

// Start the application by calling our helper function.
printServerWalletAddress();
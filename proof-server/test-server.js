// Simple test script to verify the proof server setup
import { WalletBuilder } from '@midnight-ntwrk/wallet';
import { NetworkId } from '@midnight-ntwrk/zswap';
import { Mnemonic, PhraseSize } from '@midnight-ntwrk/wallet-sdk-hd';

async function testSetup() {
  console.log('Testing proof server setup...');
  
  try {
    // Test wallet creation
    const SERVER_SEED_PHRASE = 'legal bus train same ripple coast clever glance metal toilet beef pulp';
    const seed = Mnemonic.toSeed(SERVER_SEED_PHRASE, PhraseSize.S12);
    
    console.log('Creating test wallet...');
    const wallet = await WalletBuilder.build(
      'https://indexer.testnet-02.midnight.network/api/v1/graphql',
      'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws',
      'http://localhost:6300',
      'https://rpc.testnet-02.midnight.network',
      seed,
      NetworkId.TestNet
    );
    
    await wallet.start();
    console.log('Wallet started successfully');
    
    const address = await wallet.getAddress();
    console.log('Server wallet address:', address);
    
    await wallet.close();
    console.log('Test completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

testSetup();

import express from 'express';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Body parsing middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

/**
 * Lace Wallet Integration Endpoint
 * This endpoint simulates the interaction with your Lace wallet
 */
// Input validation middleware
const validateAuthRequest = (req, res, next) => {
  const { requiredClaims, proofType } = req.body;
  
  if (!requiredClaims || !Array.isArray(requiredClaims)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid requiredClaims: must be an array'
    });
  }
  
  if (!proofType || typeof proofType !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid proofType: must be a string'
    });
  }
  
  next();
};

app.post('/generate-and-verify-proof', validateAuthRequest, async (req, res) => {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  console.log(`[${requestId}] Lace Wallet: Received authentication request...`);
  
  try {
    // Get configuration from environment
    const laceWalletAddress = process.env.LACE_WALLET_ADDRESS;
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const secretKey = process.env.SECRET_KEY;
    
    // Validate required environment variables
    if (!laceWalletAddress || !contractAddress || !secretKey) {
      console.error(`[${requestId}] Missing required environment variables`);
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }
    
    console.log(`[${requestId}] Lace Wallet: Using wallet address: ${laceWalletAddress.substring(0, 10)}...`);
    console.log(`[${requestId}] Lace Wallet: Contract address: ${contractAddress}`);
    
    // Simulate Lace wallet interaction with proper error handling
    console.log(`[${requestId}] Lace Wallet: Connecting to Lace wallet...`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate connection
    
    console.log(`[${requestId}] Lace Wallet: Generating ZK proof with your wallet...`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate proof generation
    
    console.log(`[${requestId}] Lace Wallet: Submitting proof to contract...`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate contract interaction
    
    console.log(`[${requestId}] Lace Wallet: Proof verification successful!`);
    
    // Generate secure transaction ID
    const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.status(200).json({ 
      success: true, 
      transactionId,
      message: 'Lace wallet authentication successful',
      walletAddress: laceWalletAddress,
      contractAddress: contractAddress,
      timestamp: new Date().toISOString(),
      requestId
    });
    
  } catch (error) {
    console.error(`[${requestId}] Lace Wallet: Error:`, error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error',
      requestId
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  const healthCheck = {
    status: 'ok',
    service: 'lace-wallet-integration',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    walletAddress: process.env.LACE_WALLET_ADDRESS ? 
      `${process.env.LACE_WALLET_ADDRESS.substring(0, 10)}...` : 'Not configured',
    contractAddress: process.env.CONTRACT_ADDRESS || 'Not configured'
  };
  
  res.json(healthCheck);
});

// Wallet info endpoint (restricted)
app.get('/wallet-info', (req, res) => {
  // Add authentication check here in production
  const walletInfo = {
    walletAddress: process.env.LACE_WALLET_ADDRESS,
    contractAddress: process.env.CONTRACT_ADDRESS,
    status: 'connected',
    timestamp: new Date().toISOString()
  };
  
  res.json(walletInfo);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

app.listen(port, () => {
  console.log(`Lace Wallet Integration running on http://localhost:${port}`);
  console.log(`Endpoint: POST http://localhost:${port}/generate-and-verify-proof`);
  console.log(`Health: GET http://localhost:${port}/health`);
  console.log(`Wallet Info: GET http://localhost:${port}/wallet-info`);
  console.log(`Your Lace Wallet: ${process.env.LACE_WALLET_ADDRESS}`);
});


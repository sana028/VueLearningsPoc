import { initializeApp } from 'firebase-admin/app';
import { Storage } from '@google-cloud/storage';
// import * as serviceAccount from './serviceAccount.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
initializeApp({
  
});

// Initialize Google Cloud Storage with the same service account
const storage = new Storage({
  projectId: "fir-learnings-5cc16",
  keyFilename: "./serviceAccount.json"
});

async function setCors() {
  try {
    await storage.bucket("fir-learnings-5cc16.appspot.com").setCorsConfiguration([
      {
        origin: ['http://localhost:5173'],
        method: ['GET'],
        maxAgeSeconds: 3600
      }
    ]);
    console.log('CORS configuration set successfully');
  } catch (error) {
    console.error('Error setting CORS configuration:', error);
  }
}

setCors();

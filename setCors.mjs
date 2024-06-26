import { initializeApp, cert } from 'firebase-admin/app';
import { Storage } from '@google-cloud/storage';
// import * as serviceAccount from './serviceAccount.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert({
    "type": "service_account",
    "project_id": "fir-learnings-5cc16",
    "private_key_id": "ff9be2c8300acdbfbddf90ef314d4338997bbad9",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCbLbVqf1Ytobpe\n4qODFW53pOZFQmz1CS3dPY22Yh9x6oyJpljBFFnUC0QVxuejvstcCP1tAjHtkRU/\nMoUd8clzxUBuO/75J7s+0WGgIPrjM7gqnHQce8DoHUDwzKmY4vhr+hMvgWzh6JEK\nsV5jiF4/Uxov+DT5xyJ2b8rOlfeusvpF7cjEeGJ+q9+7NlyQBtnRd4XMPOlMRboL\nyb69Mb1I8DirZiHU/Z3QBcqJwJwwTh2PO1wd/kU9Jcf5YpAhgLyd1oFFhMAuJIJo\npk8uCqJgk/2lA9QiP4yv4nFJfhVHc3G3XeWtCLmAnKTO8LGacYDejL25wGM9wArU\nmEsMLiV1AgMBAAECggEAISH0T0Xa96lFascHVJC54m/h/r29F+Ca21cuL9fpkOAc\nm7NZ1ffrahvxsJikktDFCOSef6ztTiUhHTpDM+6RLdfa9u52dWpnT3VTW+ZOyz4a\nv3ZiUEaYHLdKS1/Xgl5L3nopqIYA4odOmLLgTW4reWfb+owLe51qHVGnQs7AcJtP\nFswM+qHfVOJPJX9n2q4IhxLZe7AX4lJTfO6URrWaE5ldkYtpo9jLiwE4574PsdTI\no0Fdks7ZzXQngkJ+u/tuYXiLv5jCy9ZhPNsje0yCBcedMizpwGY8p7LHCHe2XmFh\nImeCTD7elB7dzN7x4XrsQl6A3rtffZVMAz0LW8gpjQKBgQDS6raSQKOJm1O4mrSn\nhgzmV8fZQADWmnNmHhwPAgn4R3mQRao79/VF8rvmuXp05rDZ2Lp5KIf4Yw95ZS7i\nRB8y5eY5Hi3JwW955UrFPkl3AdK4Cro/4CADwNuEzezUSb7C819aztdvTe6zG8l2\nyaosnCVSXDiJ9Y19tcCg9Vnd7wKBgQC8WQSKT6ztsZtw1yu3A2RsYlXH+vHSb3sH\nO01lk6QDjVsxs7T/UzpMopEA8Iv6Gekt+lc7d1kNyLCD2JHXybFVYPKn+sObzJsI\n7fkf5DqfhNn9Gp+2chevdr+rkWqG0iHNVxwcxiG5YEMahTzginmeCYeTz5zrnUER\nBEJLUzFW2wKBgC7f1QV58h5x89BSKZYVl6ZVmeexbr5DAySNyoSXWmngUKb8pJHB\nULRj9tiXHhz+7AzuOrsUg+ty8Ix1LU9B/oEMUPceuuRc5g58I/rkFeWp9Q/L6oqp\nn9PVt7OzJFAlt4ySE/4VfBGTi1oo8cRBm11gsna0Yihe9zwZ+Z6MCJXnAoGAAVeV\nC7NDpTH1zJkL67LvfUI6IEGuhXRb6RJIG+gwbAIO20zPhl4+dRtXcy1DohWbLsOw\n6XCRRuLeNyJM77+1LsmRERddW3faxvaDJvIGZOqabw5IgxFPD+YFuaBApRNMQF1V\nivLyfJKuB7tZUrRJ55Fj0O7SzG8Dbq6cFlNSb68CgYEAn/o+p2Ya4nqMvIrHtn8S\nl1JFLs6wyOvpjFf64IMam43tu07dk02+9pkwF49mqPepe6asyWyW1hlB8ojcMdLV\nNgkaIrQYEw2nYxjgRaaTB136PMj9jr50dSPnjkLr8CgLrk6TKPVw1J0FjlZB7hNP\nYBUc063z1dKxMLdwoe7dQ28=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-v8p6m@fir-learnings-5cc16.iam.gserviceaccount.com",
    "client_id": "114970755767586303243",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-v8p6m%40fir-learnings-5cc16.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }),
  storageBucket: "fir-learnings-5cc16.appspot.com"
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

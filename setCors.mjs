import { initializeApp, cert } from 'firebase-admin/app';
import { Storage } from '@google-cloud/storage';
// import * as serviceAccount from './serviceAccount.json' assert { type: 'json' };

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert({
    "type": "service_account",
    "project_id": "fir-learnings-5cc16",
    "private_key_id": "01dd9522f2bba6b2d0d9ff5750fd3a1128e06087",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDvyEWSQ42gL/qn\n8b+bUxVflNhqYyRB9vUprtHLnGeMgbq1PsxWzzWRFBx75iSYGoDZBorE14rTiHRT\nk8nmTgNluttGTGN2CJuGrxG/aUz9mk+PMy/HW8u9uG87tb6e/prBrr2AvDVZCpdg\ndCCPEVobl8nyWUg4RsHcbZWzjxyF1iqu/Kt8cBHOpV/LckfLMSSdRhpzS+cExf9n\ndEXu79Z4tMTMGDt66VaNbMGDZvZw31JTbMNv4C/QLxYs7V9LCl2iHfdOLJeMnNfm\nTLl6dNgCDazGq6DRXxgJfxVWSI2dfWrA4iVPDHboWJz7e4AoyoNfTE+RDubPoIxq\nsIx3+9hpAgMBAAECggEATiq/B1XvUvOhJmOoP2Xf11dqD5B/TuPHe02qxdIYbZUS\n/SfaLEiDYWapfHiDoHQvYdCAp3fOoXPf3CkXDfWLpPu7pNidKerXbJog0oHs39WQ\nrxGUN0zFB/WaiWAPorxETfR9gXyZdYv+2ioxPQJ+mfUrF86kPPhQFWBCB5WVSklr\n7hnpE0zBzomh0rnkAe601gRijHYeNbppwMCqMyjIzXFgnIt4zfyw3HSUXqgF42U4\nTCqzJZiha/JhebBQ2e5y3oXv13Q7Sdni4uQBnEORXTM62ExMnpPGttXNRDxG255O\nASP7+lvPwQYYkgTlTW2tbFgLzrTxirTanCcbw6FjuwKBgQD922Ctl+sFBVLJ5BbY\n/ePlwdGAHvVNzN5ntqxRGONW4J6wIsZKTHWwoa00Ix8v9U1unIsEPZANHBuXCdjp\nhDT2hyl5oZPfhNxcEAFOtlXD6JOSYJCBZMDPVItwh20HuCCy6sGzbX6Hegw8x9bP\nQN+BZLsDC+tCR6lkChXAQGlUJwKBgQDxznoMmsmWqlrFciv6tjDhN6VpqhU/+wg4\nmfq4hjvORj/pM6tBZIv5cviuTqGmRMvuLrTwyFSd5ofjt54PgM3nczt+q4kE1krD\nzn7Kv6ZY7HtIaUqj7BVVJLG9JN+Sbk7jixGLDuSJk1yrvO1a4r3mwqI3ZFQBzpp/\n0cz5tKx47wKBgQCA886RgAlfnIuoiNfeVGJPFPyiE5fSdI5Jqu6vp2/ccu/JU3Dc\nzyg9mHNOd8Tg7L/vv0+S0N76+ds+Bz+Lp5/r108HPT/LnEb/8RVo8ZBxmxRTl//v\n6slSyISonfKRqEPb/wp0ZduPYD0VJwKEd1TR+uRQsN5J5fMzIThZV57powKBgQDC\nrsfrMBCQApZUk+i+0UMngSLnoO289oMW9zo6qLCsEjlQq639V1OvQhbgWCSj9o3u\nNaKuncwq2TmdaO+UcdLVvxwujzMhNts5LR8+Y/EtdTCJC2Tx95jxVTrZGz/56GAR\nqZ01RYdRENky2EiNvTLCAQCT8m4EinAv6x3KCeI29wKBgFSjsBO9D7++FbWHniQL\nolag3zfYuPjrEK8dI5VtfDd4yqcQ3GxBJEaXI/oJUjnVtQTN8GDx45HB3DPW4j1U\ngwJrT9a/HPIV4WyvYkoBumWojLFJLEADicpE3p30TrtW3CDzxK6OdHs46/kEz28H\nmjZ9X+ZIWNtz50PJPt98HR6l\n-----END PRIVATE KEY-----\n",
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
        origin: ['http://localhost:5174'],
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

declare namespace _default {
    export { db };
    export { auth };
}
export default _default;
declare const db: import("@firebase/firestore").Firestore;
declare const auth: import("@firebase/auth").Auth;

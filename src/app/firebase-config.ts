import { initializeApp } from "firebase/app";
import { environment } from "../environments/environment";

// Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: environment.apiKey,
        authDomain: "todoapp-fbc7d.firebaseapp.com",
        projectId: "todoapp-fbc7d",
        storageBucket: "todoapp-fbc7d.appspot.com",
        messagingSenderId: "911067566463",
        appId: "1:911067566463:web:36f8a404bf0e5bcba04a4a",
      };

      // Initialize Firebase
      export const app = initializeApp(firebaseConfig);

import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"todoapp-fbc7d","appId":"1:911067566463:web:36f8a404bf0e5bcba04a4a","storageBucket":"todoapp-fbc7d.appspot.com","locationId":"us-central","apiKey":"AIzaSyCvY0oi_ZPnhThLKE9yrbLhw8jqLD1620A","authDomain":"todoapp-fbc7d.firebaseapp.com","messagingSenderId":"911067566463"})), provideFirestore(() => getFirestore()), provideFunctions(() => getFunctions())]
};

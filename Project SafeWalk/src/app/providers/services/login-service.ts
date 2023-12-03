import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Platform } from "@ionic/angular";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { AppPagePath, AppStorageKey } from "src/app/models/enums/app-constant";
import { environment } from "./../../../environments/environment";
import { AccountService } from "./account-service";
import { LocalStorageService } from "./local-storage-service";



@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isWeb = false;
    firebase: any;
    userName: any;
    constructor(
        private userService: AccountService,
        private localStorageService: LocalStorageService,
        private platform: Platform,
        private router: Router,) {
        this.isWeb = !(this.platform.is('android') || this.platform.is('ios'));
        this.firebase = initializeApp(environment.firebase);
    }

    public async refreshToken() {
        const auth = getAuth(this.firebase);
        onAuthStateChanged(auth, async (currenUser: User | null) => {
            if (currenUser) {
                const idToken = await currenUser.getIdToken(true);
                console.log(idToken);
                await this.localStorageService.set(AppStorageKey.AccessToken, idToken);
            } else {
                await this.logout();
            }
        });
    }

    async logout() {
        await getAuth(this.firebase).signOut();
        await GoogleAuth.signOut().then(() => console.log('Signed Out')).catch((e) => { console.log('Signed Out') });
        this.userService.logout().then(async () => {
            this.router.navigateByUrl('/login');
        });
    }

    initialize() {
        if (this.isWeb) {
            GoogleAuth.initialize({ grantOfflineAccess: true });
        }
    }

    async loginViaGoogle() {
        try {
            const user = await GoogleAuth.signIn();
            if (user) {
                // Sign in with credential from the Google user.
                signInWithCredential(getAuth(this.firebase), GoogleAuthProvider.credential(user.authentication.idToken))
                    .then(async (s) => {
                        const access_token = await s.user.getIdToken();
                        await this.localStorageService.set(AppStorageKey.AccessToken, access_token);
                        await this.localStorageService.set(AppStorageKey.UserName, user.givenName);  // Store the user's name in local storage
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                this.userName = user.givenName;
                this.userService.login({ name: user.givenName, email: user.email, imageUrl: user.imageUrl });
                console.log('Logged in!', user.email);
                this.router.navigate(['/tabs']);
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async login() {
        try {
          // Sign in with Google
          const googleUser = await GoogleAuth.signIn();
      
          // Get the ID token from the Google Sign-In result
          const idToken = googleUser.authentication.idToken;
      
          // Create a credential object using the ID token
          const credential = GoogleAuthProvider.credential(idToken);
      
          // Sign in to Firebase with the credential
          const auth = getAuth(this.firebase);
          const firebaseUserCredential = await signInWithCredential(auth, credential);
      
          // Get the Firebase user from the Firebase user credential
          const firebaseUser = firebaseUserCredential.user;
      
          // Store the Firebase user's ID token in local storage
          await this.localStorageService.set(AppStorageKey.AccessToken, await firebaseUser.getIdToken());
      
          // Return the Firebase user
          return firebaseUser;
        } catch (error) {
          console.error('Error logging in', error);
          throw error;
        }
      }
}
import {Injectable} from '@angular/core';
import {Router} from '@angular/router'; 
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';
import * as fromApp from '../app.reducer';

@Injectable() 
export class AuthService{
    authChange = new Subject<boolean>(); 
    private isAuthenticated = false;  

    constructor(private router: Router, private auth: AngularFireAuth,
      
        private uiservice: UIService,
        private store: Store<{ui: fromApp.State}>
         ) {}

  

    registerUser(authData: AuthData){
        // this.uiservice.LoadingStateChanged.next(true); 
        this.store.dispatch({type: 'START_LOADING'});
       this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
       .then(result=>{
        // this.uiservice.LoadingStateChanged.next(false); 
        this.store.dispatch({type: 'STOP_LOADING'});
           this.authSuccessfully();
       })
       .catch(error=>{
        // this.uiservice.LoadingStateChanged.next(false); 
        this.store.dispatch({type: 'STOP_LOADING'});
           this.uiservice.showSnackbar(error.message, null, 3000 );
           
       });
       
    }
    login(authData: AuthData){
    //   this.uiservice.LoadingStateChanged.next(true);  
    this.store.dispatch({type: 'START_LOADING'});
     this.auth.signInWithEmailAndPassword(authData.email, authData.password)

     .then(result=>{
        // this.uiservice.LoadingStateChanged.next(false);
        this.store.dispatch({type: 'STOP_LOADING'});  
        this.authSuccessfully();
    })
    .catch(error=>{
        // this.uiservice.LoadingStateChanged.next(false);
        this.store.dispatch({type: 'STOP_LOADING'});    
        this.uiservice.showSnackbar(error.message, null, 3000 );
    });
    }
    logout(){
       
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated=false;
    }
    
    isAuth(){
        return this.isAuthenticated;
    }
    private authSuccessfully(){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);

    }
}
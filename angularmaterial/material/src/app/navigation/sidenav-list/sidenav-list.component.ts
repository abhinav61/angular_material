import { Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false ;
  authSubscription: Subscription;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authservice.authChange.subscribe(authStatus =>{
     this.isAuth = authStatus;
    });
  }
  onClose(){
    this.closeSidenav.emit();
  }
  onLogout(){
    this.onClose();
    this.authservice.logout(); 
    
  }
  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}

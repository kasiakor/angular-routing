import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { MessageService } from './messages/message.service';

import { slideInAnimation } from './app.animation';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  //add property to specify if the route is loading to turn the spinner on/off
  loading = true;

  //wrapper to messageService.isDisplayed, does not work for production as it is private 
  get isMessageDisplayed() : boolean {
    return this.messageService.isDisplayed;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService,
              private router: Router,
              private messageService : MessageService) {
                //routerEvent is a current event, execute the function when we receive the event
                router.events.subscribe((routerEvent: Event) => {
                  this.checkRouterEvent(routerEvent);
                });
               }
  checkRouterEvent(routerEvent: Event) {
    if (routerEvent instanceof  NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof  NavigationEnd || 
      routerEvent instanceof NavigationError || 
      routerEvent instanceof NavigationCancel) {
        this.loading = false;
      };
  }

  displayMessages(): void {
    this.router.navigate([ { outlets : { popup : ['messages']}}] );
    //import message service and add to the constructor, set the property
    this.messageService.isDisplayed = true;

  }

  hideMessages(): void {
    this.messageService.isDisplayed = false;

  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl("/welcome");
  }
}

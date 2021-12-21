import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';
 
const ROUTES = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'products',
    //add guards here for products module
      //canActivate: [AuthGuard],
    //when user clicks the products menu router will fetch the bundle containing this module
    loadChildren: () =>
    import('./products/product.module')
    //promised resolved, product module is compiled, route is merged, components template is displayed
    .then(m => m.ProductModule)
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES) 
            //,{ enableTracing: true })
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
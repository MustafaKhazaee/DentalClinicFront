import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationComponent } from './navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgMaterialMultilevelMenuModule, MultilevelMenuService } from 'ng-material-multilevel-menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { Translate } from '../core/translatePipe/translate.pipe';
import { CoreModule } from '../core/core.module';
@NgModule({
  declarations: [ NavigationComponent ],
  imports: [ CommonModule, MatSidenavModule, MatToolbarModule, NgMaterialMultilevelMenuModule, RouterModule, CoreModule,
    MatListModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule, MatCardModule, MatProgressBarModule ],
  providers: [ MultilevelMenuService, Translate ]
})
export class NavigationModule { }

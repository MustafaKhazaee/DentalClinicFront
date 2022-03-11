import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, pipe, Subject, Subscription } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ProgressDisplayService } from '../core/progressDisplay/progress-display.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { AppTextService } from '../core/appTextService/app-text.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  constructor (private router: Router, private progressBar: ProgressDisplayService, private appText: AppTextService,
    private breakpointObserver: BreakpointObserver, private authenticationService: AuthenticationService,
    ) {
    this.checkLoggedInUser();
  }
  Texts = this.appText.getAppTexts();
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());
  userDetails!: string;
  appDirection: any;
  appLang!: string;
  appFullScreen: boolean = false;
  showProgressBar: boolean = true;
  menuItemsDari = this.appText.getDariMenu();
  menuItemsEnglish = this.appText.getEnglishMenu();
  progressBarObservable!: Subscription;
  @ViewChild('globalProgressBar', {static: true}) globalProgressBar!: MatProgressBar;
  // @HostListener('window:keypress', ['$event'])
  // handleKeyboardEvents (event: KeyboardEvent) {
  //   console.log(event);
  // }
  ngOnInit () {
    this.setInitialAppDirection();
    const l = localStorage.getItem('lang');
    this.appLang = l ? l : 'en';
    if (!l)
      localStorage.setItem('lang', 'en');
    this.progressBarObservable = this.progressBar.progressbarStateChange.subscribe(r => this.showProgressBar = r);
    this.progressBar.showProgressbar();
  }
  logout = () => this.authenticationService.logout();
  fullScreenToggle () {
    this.appFullScreen = !this.appFullScreen;
    if (this.appFullScreen) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  }
  checkLoggedInUser () {
    if (!this.authenticationService.getCurrentUser().isLoggedIn) this.router.navigate(['/Login']);
    this.userDetails = `${this.authenticationService.getCurrentUser().firstName} ${this.authenticationService.getCurrentUser().lastName}`;
  }
  setInitialAppDirection(){
    this.appDirection = localStorage.getItem("AppDirection");
    if (this.appDirection === 'rtl' || this.appDirection === 'ltr')
      this.menuConfiguration.rtlLayout = this.appDirection === 'rtl';
    else {
      this.menuConfiguration.rtlLayout = false;
      localStorage.setItem("AppDirection", "ltr");
    }
    this.menuConfiguration = {...this.menuConfiguration};
  }
  changeLang (lang: string) {
    this.appLang = lang;
    localStorage.setItem('lang', lang);
  }
  changeAppDir () {
    this.appDirection = this.appDirection === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem("AppDirection", this.appDirection);
    this.menuConfiguration.rtlLayout = this.appDirection === 'rtl';
    this.menuConfiguration = {...this.menuConfiguration};
  }
  getMenuItems = () : MultilevelNodes[] => {
    if (this.appLang === 'en')
      return this.menuItemsEnglish;
    return this.menuItemsDari;
  }
  menuConfiguration = {
    paddingAtStart: true,
    interfaceWithRoute: true,
    listBackgroundColor: '#673ab7',
    fontColor: '#ffffff',
    backgroundColor: '#673ab7',
    selectedListFontColor: '#FFFF00',
    highlightOnSelect: true,
    collapseOnSelect: true,
    useDividers: true,
    rtlLayout: false
  };

  ngOnDestroy(): void {
    this.progressBarObservable.unsubscribe();
  }
}

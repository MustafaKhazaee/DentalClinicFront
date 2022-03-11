import { Injectable } from '@angular/core';
import { MultilevelNodes } from 'ng-material-multilevel-menu';
import { Menu } from './Menus';
import { Texts } from './Texts';
@Injectable({ providedIn: 'root' })
export class AppTextService {
  private Text = new Texts().Texts;
  private Menu = new Menu();
  constructor() {}
  getAppTexts = () => this.Text;
  getDariMenu = () : MultilevelNodes[] => this.Menu.DariMenu;
  getEnglishMenu = () : MultilevelNodes[] => this.Menu.EnglishMenu;
}

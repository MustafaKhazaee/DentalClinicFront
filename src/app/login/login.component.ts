import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppTextService } from '../core/appTextService/app-text.service';
import { AuthenticationService } from '../core/authentication/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor (private authenticationService: AuthenticationService, private appText: AppTextService) { }
  Texts = this.appText.getAppTexts();
  hide: boolean = true;
  progressBar: {state: boolean} = {state: false};
  loginForm = new FormGroup ({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });
  ngOnInit(): void { }
  hasError = (formControl: string, errorName: string) => this.loginForm.get(formControl)?.hasError(errorName);
  onSubmit = () => this.authenticationService.login(this.loginForm, this.progressBar);
  isLoggedOut = () => !this.authenticationService.getCurrentUser().isLoggedIn;
}

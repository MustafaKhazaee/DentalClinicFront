"use strict";(self.webpackChunkDentalClinic=self.webpackChunkDentalClinic||[]).push([[972],{6972:(S,d,e)=>{e.r(d),e.d(d,{LoginModule:()=>I});var s=e(888),p=e(5694),c=e(86),Z=e(9112),m=e(8167),f=e(138),T=e(9009),r=e(9133),h=e(6019),l=e(3886),t=e(3668),v=e(166),L=e(2782),A=e(4751);function C(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"username is required"),t.qZA())}function b(n,a){1&n&&(t.TgZ(0,"mat-error"),t._uU(1,"password is required"),t.qZA())}function U(n,a){1&n&&t._UZ(0,"mat-progress-bar",13)}const q=function(){return["/Dashboard"]},x=[{path:"",component:(()=>{class n{constructor(i,o){this.authenticationService=i,this.appText=o,this.Texts=this.appText.getAppTexts(),this.hide=!0,this.progressBar={state:!1},this.loginForm=new r.cw({username:new r.NI("",r.kI.required),password:new r.NI("",r.kI.required)}),this.hasError=(u,N)=>{var g;return null===(g=this.loginForm.get(u))||void 0===g?void 0:g.hasError(N)},this.onSubmit=()=>this.authenticationService.login(this.loginForm,this.progressBar),this.isLoggedOut=()=>!this.authenticationService.getCurrentUser().isLoggedIn}ngOnInit(){}}return n.\u0275fac=function(i){return new(i||n)(t.Y36(v.$),t.Y36(L.u))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],decls:43,vars:28,consts:[["mat-raised-button","","color","primary",1,"transitionButton",3,"disabled","routerLink"],[1,"container"],[3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","formControlName","username"],["type","button","mat-icon-button","","matSuffix",""],[4,"ngIf"],["matInput","","formControlName","password",3,"type"],["type","button","mat-icon-button","","matSuffix","",3,"click"],["inset",""],["type","reset","mat-raised-button","","color","accent",1,"transitionButton",3,"click"],["type","submit","mat-raised-button","","color","warn",1,"transitionButton",3,"disabled"],["mode","indeterminate",4,"ngIf"],["mode","indeterminate"]],template:function(i,o){1&i&&(t.TgZ(0,"button",0),t._uU(1),t.ALo(2,"Translate"),t.TgZ(3,"mat-icon"),t._uU(4,"dashboard"),t.qZA(),t.qZA(),t.TgZ(5,"mat-card",1),t.TgZ(6,"mat-card-title"),t._uU(7),t.ALo(8,"Translate"),t.qZA(),t.TgZ(9,"form",2),t.NdJ("ngSubmit",function(){return o.onSubmit()}),t.TgZ(10,"mat-card-content"),t.TgZ(11,"mat-form-field",3),t.TgZ(12,"mat-label"),t._uU(13),t.ALo(14,"Translate"),t.qZA(),t._UZ(15,"input",4),t.TgZ(16,"button",5),t.TgZ(17,"mat-icon"),t._uU(18,"person"),t.qZA(),t.qZA(),t.YNc(19,C,2,0,"mat-error",6),t.qZA(),t.TgZ(20,"mat-form-field",3),t.TgZ(21,"mat-label"),t._uU(22),t.ALo(23,"Translate"),t.qZA(),t._UZ(24,"input",7),t.TgZ(25,"button",8),t.NdJ("click",function(){return o.hide=!o.hide}),t.TgZ(26,"mat-icon"),t._uU(27),t.qZA(),t.qZA(),t.YNc(28,b,2,0,"mat-error",6),t.qZA(),t.qZA(),t._UZ(29,"mat-divider",9),t.TgZ(30,"mat-card-actions"),t.TgZ(31,"button",10),t.NdJ("click",function(){return o.progressBar.state=!1}),t._uU(32),t.ALo(33,"Translate"),t.TgZ(34,"mat-icon"),t._uU(35,"clear"),t.qZA(),t.qZA(),t.TgZ(36,"button",11),t._uU(37),t.ALo(38,"Translate"),t.TgZ(39,"mat-icon"),t._uU(40,"login"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(41,"mat-card-footer"),t.YNc(42,U,1,0,"mat-progress-bar",12),t.qZA(),t.qZA()),2&i&&(t.Q6J("disabled",o.isLoggedOut())("routerLink",t.DdM(27,q)),t.xp6(1),t.hij("",t.lcZ(2,15,o.Texts.Dashboard)," "),t.xp6(6),t.Oqu(t.lcZ(8,17,o.Texts.LoginPage)),t.xp6(2),t.Q6J("formGroup",o.loginForm),t.xp6(4),t.Oqu(t.lcZ(14,19,o.Texts.Username)),t.xp6(6),t.Q6J("ngIf",o.hasError("username","required")),t.xp6(3),t.Oqu(t.lcZ(23,21,o.Texts.Password)),t.xp6(2),t.Q6J("type",o.hide?"password":"text"),t.xp6(3),t.Oqu(o.hide?"visibility_off":"visibility_on"),t.xp6(1),t.Q6J("ngIf",o.hasError("password","required")),t.xp6(4),t.hij("",t.lcZ(33,23,o.Texts.Cancel)," "),t.xp6(4),t.Q6J("disabled",o.loginForm.invalid),t.xp6(1),t.hij("",t.lcZ(38,25,o.Texts.Login)," "),t.xp6(5),t.Q6J("ngIf",o.progressBar.state))},directives:[c.lW,l.rH,Z.Hw,s.a8,s.n5,r._Y,r.JL,r.sg,s.dn,m.KE,m.hX,f.Nt,r.Fj,r.JJ,r.u,m.R9,h.O5,p.d,s.hq,s.rt,m.TO,T.pW],pipes:[A.v],styles:[".container[_ngcontent-%COMP%]{margin:0 auto;width:250px;text-align:center;transform:translateY(-50%);top:45%}mat-card-title[_ngcontent-%COMP%]{margin:18px 0 30px!important}"]}),n})()}];let y=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[l.Bz.forChild(x)],l.Bz]}),n})();var J=e(8191);let I=(()=>{class n{}return n.\u0275fac=function(i){return new(i||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[s.QW,p.t,c.ot,Z.Ps,m.lN,f.c,T.Cv,r.UX,h.ez,y,J.I]]}),n})()}}]);
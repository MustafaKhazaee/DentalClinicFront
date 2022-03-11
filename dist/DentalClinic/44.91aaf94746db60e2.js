"use strict";(self.webpackChunkDentalClinic=self.webpackChunkDentalClinic||[]).push([[44],{8044:(ie,v,o)=>{o.r(v),o.d(v,{AppUserModule:()=>ae});var f=o(6019),x=o(3886),n=o(9133),d=o(5304),l=o(4753),c=o(9468),e=o(3668),b=o(4300),y=o(9966),C=o(2782),F=o(2215),u=o(888),h=o(8167),B=o(138),q=o(86),R=o(9112),N=o(6400),w=o(6731),D=o(514),I=o(5694),Y=o(4751);function L(s,i){if(1&s&&(e.TgZ(0,"mat-card-title"),e._uU(1),e.ALo(2,"Translate"),e.qZA()),2&s){const t=e.oxw();e.xp6(1),e.Oqu(e.lcZ(2,1,t.Texts.UserManagement))}}function O(s,i){1&s&&(e.TgZ(0,"mat-error"),e._uU(1,"Password is required"),e.qZA())}function M(s,i){1&s&&(e.TgZ(0,"mat-error"),e._uU(1,"Password must be at least 6 characters long"),e.qZA())}function E(s,i){if(1&s&&(e.TgZ(0,"mat-option",18),e._uU(1),e.qZA()),2&s){const t=i.$implicit;e.s9C("value",t.id),e.xp6(1),e.Oqu(t.roleName)}}function P(s,i){1&s&&e._UZ(0,"mat-divider",19)}function Q(s,i){if(1&s&&(e.TgZ(0,"button",20),e._uU(1),e.ALo(2,"Translate"),e.TgZ(3,"mat-icon"),e._uU(4,"clear"),e.qZA(),e.qZA()),2&s){const t=e.oxw();e.xp6(1),e.hij("",e.lcZ(2,1,t.Texts.Cancel)," ")}}function S(s,i){if(1&s&&(e.TgZ(0,"button",21),e._uU(1),e.ALo(2,"Translate"),e.TgZ(3,"mat-icon"),e._uU(4,"save"),e.qZA(),e.qZA()),2&s){const t=e.oxw();e.Q6J("disabled",!t.appUserForm.valid),e.xp6(1),e.hij("",e.lcZ(2,2,t.Texts.Save)," ")}}function _(s,i){if(1&s){const t=e.EpF();e.TgZ(0,"button",22),e.NdJ("click",function(){return e.CHM(t),e.oxw().submitEdit()}),e._uU(1),e.ALo(2,"Translate"),e.TgZ(3,"mat-icon"),e._uU(4,"save"),e.qZA(),e.qZA()}if(2&s){const t=e.oxw();e.Q6J("disabled",!t.appUserForm.valid),e.xp6(1),e.hij("",e.lcZ(2,2,t.Texts.Save)," ")}}function V(s,i){1&s&&(e.TgZ(0,"mat-card-footer"),e._uU(1," main card footer\n"),e.qZA())}let J=(()=>{class s{constructor(t,r,a,p,U,A,T){this.formBuilder=t,this.repository=r,this.snackBar=a,this.data=p,this.matDialogRef=U,this.appText=A,this.progressBarService=T,this.hide=!0,this.Texts=this.appText.getAppTexts(),this.appUserForm=this.formBuilder.group({userName:["",n.kI.required],password:["",[n.kI.required,n.kI.minLength(6)]],userType:["",n.kI.required],isLocked:[!1],roles:["",n.kI.required]}),this.r=[],this.myMap=["Employee","Doctor"],this.compareRoles=(m,g)=>this.editing&&-1!=this.r.indexOf(m),this.compareUserTypes=(m,g)=>this.editing&&this.myMap[m]==this.data.appUser.userType,this.passwordError=m=>{var g,Z;return!!(null===(g=this.appUserForm.get("password"))||void 0===g?void 0:g.errors)&&(null===(Z=this.appUserForm.get("password"))||void 0===Z?void 0:Z.errors)[m]},this.submitEdit=()=>{this.progressBarService.showProgressbar(),this.repository.AppUserRepository.editUser(this.appUserForm.value,this.data.id).pipe((0,l.U)(m=>{this.matDialogRef.close({event:"updated"})}),(0,c.q)(1)).subscribe()},this.repository.RoleRepository.getAllRoles().pipe((0,l.U)(m=>{this.roles=m}),(0,c.q)(1)).subscribe(),this.editing=p.appUser}ngOnInit(){if(this.data.appUser){this.appUserForm.controls.userName.patchValue(this.data.appUser.userName),this.appUserForm.controls.password.patchValue(this.data.appUser.password),this.appUserForm.controls.isLocked.patchValue(this.data.appUser.isLocked),this.appUserForm.controls.userType.patchValue(this.myMap.indexOf(this.data.appUser.userType)),this.appUserForm.controls.roles.patchValue(this.r);for(let t=0;t<this.data.appUser.appUserRoles.length;t++)this.r.push(this.data.appUser.appUserRoles[t].role.id)}setTimeout(()=>this.progressBarService.hideProgressbar())}submitForm(){this.progressBarService.showProgressbar(),this.repository.AppUserRepository.addUser(this.appUserForm.value).pipe((0,l.U)(t=>{201===t?(this.snackBar.open("User added succefully","OK",{duration:3e3}),document.querySelector("#clearAppUserForm").click(),this.appUserForm.controls.isLocked.patchValue(!1)):409===t&&this.snackBar.open("User already exists","OK",{duration:3e3}),this.progressBarService.hideProgressbar()}),(0,c.q)(1)).subscribe()}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(n.qu),e.Y36(b.b),e.Y36(y.ux),e.Y36(d.WI),e.Y36(d.so),e.Y36(C.u),e.Y36(F.v))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-app-user-form"]],decls:52,vars:35,consts:[[4,"ngIf"],[1,"form-container"],[3,"formGroup","submit"],[1,"flex-box-show"],["appearance","outline"],["matInput","","formControlName","userName"],["matInput","","formControlName","password",3,"type"],["type","button","mat-icon-button","","matSuffix","",3,"click"],["formControlName","userType",3,"compareWith"],["value","0"],["value","1"],["formControlName","isLocked","color","warn"],["formControlName","roles","multiple","",3,"compareWith"],[3,"value",4,"ngFor","ngForOf"],["inset","",4,"ngIf"],["id","clearAppUserForm","class","transitionButton","type","reset","mat-raised-button","","color","accent",4,"ngIf"],["type","submit","mat-raised-button","","class","submitButton transitionButton",3,"disabled",4,"ngIf"],["type","button","mat-raised-button","","class","submitButton transitionButton",3,"disabled","click",4,"ngIf"],[3,"value"],["inset",""],["id","clearAppUserForm","type","reset","mat-raised-button","","color","accent",1,"transitionButton"],["type","submit","mat-raised-button","",1,"submitButton","transitionButton",3,"disabled"],["type","button","mat-raised-button","",1,"submitButton","transitionButton",3,"disabled","click"]],template:function(t,r){1&t&&(e.YNc(0,L,3,3,"mat-card-title",0),e.TgZ(1,"div",1),e.TgZ(2,"mat-dialog-content"),e.TgZ(3,"form",2),e.NdJ("submit",function(){return r.submitForm()}),e.TgZ(4,"mat-card-content",3),e.TgZ(5,"mat-form-field",4),e.TgZ(6,"mat-label"),e._uU(7),e.ALo(8,"Translate"),e.qZA(),e._UZ(9,"input",5),e.TgZ(10,"mat-error"),e._uU(11,"Username is required"),e.qZA(),e.qZA(),e.TgZ(12,"mat-form-field",4),e.TgZ(13,"mat-label"),e._uU(14),e.ALo(15,"Translate"),e.qZA(),e._UZ(16,"input",6),e.TgZ(17,"button",7),e.NdJ("click",function(){return r.hide=!r.hide}),e.TgZ(18,"mat-icon"),e._uU(19),e.qZA(),e.qZA(),e.YNc(20,O,2,0,"mat-error",0),e.YNc(21,M,2,0,"mat-error",0),e.qZA(),e.TgZ(22,"mat-form-field",4),e.TgZ(23,"mat-label"),e._uU(24),e.ALo(25,"Translate"),e.qZA(),e.TgZ(26,"mat-select",8),e.TgZ(27,"mat-option",9),e._uU(28),e.ALo(29,"Translate"),e.qZA(),e.TgZ(30,"mat-option",10),e._uU(31),e.ALo(32,"Translate"),e.qZA(),e.qZA(),e.TgZ(33,"mat-error"),e._uU(34,"Must select a user type"),e.qZA(),e.qZA(),e.TgZ(35,"mat-slide-toggle",11),e._uU(36),e.ALo(37,"Translate"),e.qZA(),e.TgZ(38,"mat-form-field",4),e.TgZ(39,"mat-label"),e._uU(40),e.ALo(41,"Translate"),e.qZA(),e.TgZ(42,"mat-select",12),e.YNc(43,E,2,2,"mat-option",13),e.qZA(),e.TgZ(44,"mat-error"),e._uU(45,"Must select at least one role"),e.qZA(),e.qZA(),e.qZA(),e.YNc(46,P,1,0,"mat-divider",14),e.TgZ(47,"mat-card-actions"),e.YNc(48,Q,5,3,"button",15),e.YNc(49,S,5,4,"button",16),e.YNc(50,_,5,4,"button",17),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.YNc(51,V,2,0,"mat-card-footer",0)),2&t&&(e.Q6J("ngIf",!r.editing),e.xp6(3),e.Q6J("formGroup",r.appUserForm),e.xp6(4),e.Oqu(e.lcZ(8,21,r.Texts.Username)),e.xp6(7),e.Oqu(e.lcZ(15,23,r.Texts.Password)),e.xp6(2),e.Q6J("type",r.hide?"password":"text"),e.xp6(3),e.Oqu(r.hide?"visibility_off":"visibility_on"),e.xp6(1),e.Q6J("ngIf",r.passwordError("required")),e.xp6(1),e.Q6J("ngIf",r.passwordError("minlength")),e.xp6(3),e.Oqu(e.lcZ(25,25,r.Texts.UserType)),e.xp6(2),e.Q6J("compareWith",r.compareUserTypes),e.xp6(2),e.Oqu(e.lcZ(29,27,r.Texts.Employee)),e.xp6(3),e.Oqu(e.lcZ(32,29,r.Texts.Doctor)),e.xp6(5),e.Oqu(e.lcZ(37,31,r.Texts.Locked)),e.xp6(4),e.Oqu(e.lcZ(41,33,r.Texts.Roles)),e.xp6(2),e.Q6J("compareWith",r.compareRoles),e.xp6(1),e.Q6J("ngForOf",r.roles),e.xp6(3),e.Q6J("ngIf",!r.editing),e.xp6(2),e.Q6J("ngIf",!r.editing),e.xp6(1),e.Q6J("ngIf",!r.editing),e.xp6(1),e.Q6J("ngIf",r.editing),e.xp6(1),e.Q6J("ngIf",!r.editing))},directives:[f.O5,d.xY,n._Y,n.JL,n.sg,u.dn,h.KE,h.hX,B.Nt,n.Fj,n.JJ,n.u,h.TO,q.lW,h.R9,R.Hw,N.gD,w.ey,D.Rr,f.sg,u.hq,u.n5,I.d,u.rt],pipes:[Y.v],styles:[""]}),s})();var W=o(5077),j=o(9463),H=o(89),K=o(4408),k=o(166),G=o(4423);const X=["username"];function z(s,i){if(1&s){const t=e.EpF();e.TgZ(0,"app-table",5),e.NdJ("editRow",function(a){return e.CHM(t),e.oxw().editAppUser(a)})("deleteRow",function(a){return e.CHM(t),e.oxw().deleteAppUser(a)})("tablePaging",function(a){return e.CHM(t),e.oxw().handlePaging(a)})("rowDetails",function(a){return e.CHM(t),e.oxw().showDetails(a)}),e.qZA()}if(2&s){const t=e.oxw();e.Q6J("table",t.table)("excludedColumns",t.excludedColumns)("canDelete",t.canDelete)("canEdit",t.canEdit)}}const $=[{path:"",component:(()=>{class s{constructor(t,r,a,p,U,A){this.repository=t,this.dilaog=r,this.snackBar=a,this.appText=p,this.authenticationService=U,this.progressBarService=A,this.dataLoaded=!1,this.excludedColumns=["createdBy","appUserRoles","id","createdDate","lastModifiedBy","lastModifiedDate","password","salt"],this.Texts=this.appText.getAppTexts(),this.fetchData=()=>this.repository.AppUserRepository.getUsers(this.usernameSearchKey,this.pagingFilter).pipe((0,l.U)(T=>{this.table=T,this.dataLoaded=!0,this.progressBarService.hideProgressbar()}),(0,c.q)(1)).subscribe(),this.ngOnDestroy=()=>{this.userNameChangeEvent.unsubscribe()},this.canEdit=this.authenticationService.checkPermission("/EditAppUser"),this.canDelete=this.authenticationService.checkPermission("/DeleteAppUser")}ngOnInit(){this.progressBarService.showProgressbar(),this.userNameChangeEvent=(0,W.R)(this.username.nativeElement,"keyup").pipe((0,j.b)(1e3),(0,l.U)(t=>{this.usernameSearchKey=t.target.value.trim(),this.fetchData()})).subscribe(),this.fetchData()}editAppUser(t){"mustafa"===t.userName?this.snackBar.open("You cannot edit system admin!","Close",{duration:6e3}):this.dilaog.open(J,{width:"320px",data:{appUser:t,id:t.id}}).afterClosed().pipe((0,l.U)(a=>{a&&"updated"==a.event&&(this.fetchData(),this.snackBar.open("User updated succefully","OK",{duration:3e3}))}),(0,c.q)(1)).subscribe()}deleteAppUser(t){"mustafa"===t.userName?this.snackBar.open("You cannot delete system admin!","Close",{duration:6e3}):this.dilaog.open(H.F,{width:"300px",height:"150px",data:{message:"Are you sure you want to delete this user?"}}).afterClosed().pipe((0,l.U)(a=>{"delete"===a.event&&(this.progressBarService.showProgressbar(),this.repository.AppUserRepository.deleteUser(t.id).pipe((0,l.U)(p=>{this.fetchData(),this.snackBar.open("User deleted succefully","OK",{duration:3e3})}),(0,c.q)(1)).subscribe())}),(0,c.q)(1)).subscribe()}showDetails(t){this.dilaog.open(K.d,{width:"500px",height:"600px",data:{model:t}})}handlePaging(t){this.pagingFilter=t,this.fetchData()}}return s.\u0275fac=function(t){return new(t||s)(e.Y36(b.b),e.Y36(d.uw),e.Y36(y.ux),e.Y36(C.u),e.Y36(k.$),e.Y36(F.v))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-app-user"]],viewQuery:function(t,r){if(1&t&&e.Gf(X,7),2&t){let a;e.iGM(a=e.CRH())&&(r.username=a.first)}},decls:12,vars:7,consts:[[1,"searchBar"],["for","username"],["type","text",1,"searchBarInput"],["username",""],[3,"table","excludedColumns","canDelete","canEdit","editRow","deleteRow","tablePaging","rowDetails",4,"ngIf"],[3,"table","excludedColumns","canDelete","canEdit","editRow","deleteRow","tablePaging","rowDetails"]],template:function(t,r){1&t&&(e.TgZ(0,"mat-card-title"),e._uU(1),e.ALo(2,"Translate"),e.qZA(),e.TgZ(3,"div",0),e.TgZ(4,"label",1),e._uU(5),e.ALo(6,"Translate"),e._UZ(7,"input",2,3),e.qZA(),e.qZA(),e.YNc(9,z,1,4,"app-table",4),e.TgZ(10,"mat-card-footer"),e._uU(11," main card footer\n"),e.qZA()),2&t&&(e.xp6(1),e.Oqu(e.lcZ(2,3,r.Texts.UserManagement)),e.xp6(4),e.hij(" ",e.lcZ(6,5,r.Texts.Username)," : "),e.xp6(4),e.Q6J("ngIf",r.dataLoaded))},directives:[u.n5,f.O5,u.rt,G.a],pipes:[Y.v],styles:[""]}),s})()},{path:"AddAppUser",component:J}];let ee=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({imports:[[x.Bz.forChild($)],x.Bz]}),s})();var te=o(1548),se=o(9009),re=o(7735),oe=o(8191);let ae=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=e.oAB({type:s}),s.\u0275inj=e.cJS({providers:[{provide:d.so,useValue:{}},{provide:d.WI,useValue:{}}],imports:[[f.ez,ee,te.N6,u.QW,se.Cv,re.m,h.lN,R.Ps,I.t,B.c,q.ot,D.rP,N.LD,n.UX,d.Is,oe.I]]}),s})()}}]);
"use strict";(self.webpackChunkDentalClinic=self.webpackChunkDentalClinic||[]).push([[303],{303:(bt,F,s)=>{s.r(F),s.d(F,{VisitModule:()=>Zt});var f=s(6019),N=s(3886),l=s(4753),t=s(3668),J=s(6494),Y=s(4480),E=s(7130),Q=s(273),w=s(8260),U=s(166);let $=(()=>{class i{constructor(e){this.authenticationService=e,this.connect=!0,this.subject=new Q.x,this.invokeService=()=>this.cacheConnection.invoke("GetTodaysVisits").then(()=>console.log("GetTodaysVisits Invoked!")).catch(o=>console.log(o)),this.onReceiveUpdates=()=>this.subject.asObservable(),this.connectToCacheHub()}connectToCacheHub(){if(this.connect){let e={skipNegotiation:!0,transport:J.n.WebSockets},o=this.authenticationService.getCurrentUser().token;this.cacheConnection=(new Y.s).configureLogging(E.i.Information).withUrl(`${w.N.apiUrl}/liveBoardHub?token=${o}`,e).withAutomaticReconnect().build(),this.cacheConnection.start().then(()=>{console.log("Connected to live-board hub"),this.invokeService()}).catch(a=>console.error(a)),this.cacheConnection.on("updateVisitBoard",a=>{this.subject.next(a)}),this.connect=!1}}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(U.$))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var Z=s(2782),b=s(2215),O=s(4423);function H(i,n){if(1&i&&t._UZ(0,"app-table",1),2&i){const e=t.oxw();t.Q6J("table",e.table)("excludedColumns",e.excludedColumns)("showOpertions",!1)}}let j=(()=>{class i{constructor(e,o,a){this.visitBoardService=e,this.appText=o,this.progressBarService=a,this.Texts=this.appText.getAppTexts(),this.dataLoaded=!1,this.excludedColumns=["id","doctorId","patientId","createdBy","createdDate","priorityLevel","lastModifiedBy","lastModifiedDate","isDeleted","doctor","patient","operation","preOperationFee","postOperationFee","doneDate","description"],this.operations=["TakeOut","Fill","Orthodontics","Cleaning","Cover"],this.ngOnDestroy=()=>this.liveVisitBoard.unsubscribe()}ngOnInit(){this.liveVisitBoard=this.visitBoardService.onReceiveUpdates().pipe((0,l.U)(e=>{let o=e;o.list.forEach(a=>{a["Doctor Name"]=`${a.doctor.firstName} ${a.doctor.lastName}`,a["Patient Name"]=`${a.patient.firstName} ${a.patient.lastName}`,a["Operation Type"]=`${this.operations[a.operation]}`}),this.table=o,this.dataLoaded||(this.dataLoaded=!0)})).subscribe(),setTimeout(()=>this.progressBarService.hideProgressbar())}}return i.\u0275fac=function(e){return new(e||i)(t.Y36($),t.Y36(Z.u),t.Y36(b.v))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-visit-board"]],decls:1,vars:1,consts:[[3,"table","excludedColumns","showOpertions",4,"ngIf"],[3,"table","excludedColumns","showOpertions"]],template:function(e,o){1&e&&t.YNc(0,H,1,3,"app-table",0),2&e&&t.Q6J("ngIf",o.dataLoaded)},directives:[f.O5,O.a],styles:[""]}),i})();var r=s(9133),d=s(5304),m=s(9468),D=s(4300),q=s(9966),u=s(888),g=s(8167),B=s(6400),I=s(138),v=s(8727),G=s(6731),L=s(5694),S=s(86),R=s(9112),M=s(4751);function K(i,n){if(1&i&&(t.TgZ(0,"mat-card-title"),t._uU(1),t.ALo(2,"Translate"),t.qZA()),2&i){const e=t.oxw();t.xp6(1),t.Oqu(t.lcZ(2,1,e.Texts.VisitManagement))}}function W(i,n){if(1&i&&(t.TgZ(0,"mat-option",22),t._uU(1),t.qZA()),2&i){const e=n.$implicit;t.s9C("value",e.id),t.xp6(1),t.AsE("",e.firstName," ",e.lastName,"")}}function _(i,n){if(1&i&&(t.TgZ(0,"mat-option",22),t._uU(1),t.qZA()),2&i){const e=n.$implicit;t.s9C("value",e.id),t.xp6(1),t.lnq("",e.firstName," ",e.lastName," ",e.mobile,"")}}function k(i,n){if(1&i&&(t.TgZ(0,"mat-option",22),t._uU(1),t.ALo(2,"Translate"),t.qZA()),2&i){const e=n.$implicit;t.s9C("value",e.number),t.xp6(1),t.Oqu(t.lcZ(2,2,e.name))}}function X(i,n){if(1&i&&(t.TgZ(0,"mat-option",22),t._uU(1),t.ALo(2,"Translate"),t.qZA()),2&i){const e=n.$implicit;t.s9C("value",e.number),t.xp6(1),t.Oqu(t.lcZ(2,2,e.name))}}function z(i,n){1&i&&t._UZ(0,"mat-divider",23)}function tt(i,n){if(1&i&&(t.TgZ(0,"button",24),t._uU(1),t.ALo(2,"Translate"),t.TgZ(3,"mat-icon"),t._uU(4,"clear"),t.qZA(),t.qZA()),2&i){const e=t.oxw();t.xp6(1),t.hij("",t.lcZ(2,1,e.Texts.Cancel)," ")}}function et(i,n){if(1&i&&(t.TgZ(0,"button",25),t._uU(1),t.ALo(2,"Translate"),t.TgZ(3,"mat-icon"),t._uU(4,"save"),t.qZA(),t.qZA()),2&i){const e=t.oxw();t.Q6J("disabled",!e.visitForm.valid),t.xp6(1),t.hij("",t.lcZ(2,2,e.Texts.Save)," ")}}function it(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"button",26),t.NdJ("click",function(){return t.CHM(e),t.oxw().submitEdit()}),t._uU(1),t.ALo(2,"Translate"),t.TgZ(3,"mat-icon"),t._uU(4,"save"),t.qZA(),t.qZA()}if(2&i){const e=t.oxw();t.Q6J("disabled",!e.visitForm.valid),t.xp6(1),t.hij("",t.lcZ(2,2,e.Texts.Save)," ")}}function ot(i,n){1&i&&(t.TgZ(0,"mat-card-footer"),t._uU(1," main card footer\n"),t.qZA())}let P=(()=>{class i{constructor(e,o,a,c,C,A,V){this.formBuilder=e,this.repository=o,this.snackBar=a,this.data=c,this.matDialogRef=C,this.appText=A,this.progressBarService=V,this.Texts=this.appText.getAppTexts(),this.visitForm=this.formBuilder.group({doctorId:["",r.kI.required],patientId:["",r.kI.required],room:[],preOperationFee:["0"],postOperationFee:["0"],scheduleDate:[],doneDate:[],operation:["",r.kI.required],priorityLevel:["",r.kI.required],description:[""]}),this.operations=[{name:"TakeOut",number:0},{name:"Fill",number:1},{name:"Orthodontics",number:2},{name:"Cleaning",number:3},{name:"Cover",number:4}],this.priorities=[{name:"None",number:0},{name:"Low",number:1},{name:"Medium",number:2},{name:"High",number:3},{name:"Urgent",number:4}],this.compareOperation=(h,p)=>this.data.visit&&h==this.operations.filter(y=>y.name===this.data.visit.operation)[0].number,this.comparePriority=(h,p)=>this.data.visit&&h==this.priorities.filter(y=>y.name===this.data.visit.priorityLevel)[0].number,this.submitEdit=()=>{this.progressBarService.showProgressbar(),this.repository.VisitRepository.editVisit(this.visitForm.value,this.data.id).pipe((0,l.U)(h=>{this.matDialogRef.close({event:"updated"})}),(0,m.q)(1)).subscribe()},this.editing=c.visit}ngOnInit(){this.populateDropdowns(),this.editing&&(this.visitForm.controls.doctorId.setValue(this.data.visit.doctorId),this.visitForm.controls.patientId.setValue(this.data.visit.patientId),this.visitForm.controls.room.setValue(this.data.visit.room),this.visitForm.controls.preOperationFee.setValue(this.data.visit.preOperationFee),this.visitForm.controls.postOperationFee.setValue(this.data.visit.postOperationFee),this.visitForm.controls.scheduleDate.setValue(this.data.visit.scheduleDate),this.visitForm.controls.doneDate.setValue(this.data.visit.doneDate),this.visitForm.controls.description.setValue(this.data.visit.description),this.visitForm.controls.priorityLevel.setValue(this.priorities.filter(e=>e.name===this.data.visit.priorityLevel)[0].number),this.visitForm.controls.operation.setValue(this.operations.filter(e=>e.name===this.data.visit.operation)[0].number)),setTimeout(()=>this.progressBarService.hideProgressbar())}submitForm(){this.progressBarService.showProgressbar(),this.repository.VisitRepository.addVisit(this.visitForm.value).pipe((0,l.U)(e=>{201===e?(this.snackBar.open("Visit added succefully","OK",{duration:3e3}),document.querySelector("#clearVisitForm").click()):409===e&&this.snackBar.open("Visit already exists","OK",{duration:3e3}),this.progressBarService.hideProgressbar()}),(0,m.q)(1)).subscribe()}populateDropdowns(){this.repository.DoctorRepository.getAllDoctors().pipe((0,l.U)(e=>this.doctors=e),(0,m.q)(1)).subscribe(),this.repository.PatientRepository.getAllPatients().pipe((0,l.U)(e=>this.patients=e),(0,m.q)(1)).subscribe()}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(r.qu),t.Y36(D.b),t.Y36(q.ux),t.Y36(d.WI),t.Y36(d.so),t.Y36(Z.u),t.Y36(b.v))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-visit-form"]],decls:82,vars:45,consts:[[4,"ngIf"],[1,"form-container"],[3,"formGroup","submit"],[1,"flex-box-show"],["appearance","outline"],["formControlName","doctorId"],[3,"value",4,"ngFor","ngForOf"],["formControlName","patientId"],["matInput","","formControlName","room"],["matInput","","type","number","formControlName","preOperationFee"],["matInput","","type","number","formControlName","postOperationFee"],["matInput","","type","datetime-local","formControlName","scheduleDate"],["matInput","","formControlName","doneDate",3,"matDatepicker"],["matSuffix","",3,"for"],["myDatePicker",""],["formControlName","operation",3,"compareWith"],["formControlName","priorityLevel",3,"compareWith"],["matInput","","formControlName","description"],["inset","",4,"ngIf"],["id","clearVisitForm","class","transitionButton","type","reset","mat-raised-button","","color","accent",4,"ngIf"],["type","submit","mat-raised-button","","class","submitButton transitionButton",3,"disabled",4,"ngIf"],["type","button","mat-raised-button","","class","submitButton transitionButton",3,"disabled","click",4,"ngIf"],[3,"value"],["inset",""],["id","clearVisitForm","type","reset","mat-raised-button","","color","accent",1,"transitionButton"],["type","submit","mat-raised-button","",1,"submitButton","transitionButton",3,"disabled"],["type","button","mat-raised-button","",1,"submitButton","transitionButton",3,"disabled","click"]],template:function(e,o){if(1&e&&(t.YNc(0,K,3,3,"mat-card-title",0),t.TgZ(1,"div",1),t.TgZ(2,"mat-dialog-content"),t.TgZ(3,"form",2),t.NdJ("submit",function(){return o.submitForm()}),t.TgZ(4,"mat-card-content",3),t.TgZ(5,"mat-form-field",4),t.TgZ(6,"mat-label"),t._uU(7),t.ALo(8,"Translate"),t.qZA(),t.TgZ(9,"mat-select",5),t.YNc(10,W,2,3,"mat-option",6),t.qZA(),t.TgZ(11,"mat-error"),t._uU(12,"Doctor is Required"),t.qZA(),t.qZA(),t.TgZ(13,"mat-form-field",4),t.TgZ(14,"mat-label"),t._uU(15),t.ALo(16,"Translate"),t.qZA(),t.TgZ(17,"mat-select",7),t.YNc(18,_,2,4,"mat-option",6),t.qZA(),t.TgZ(19,"mat-error"),t._uU(20,"Patient is Required"),t.qZA(),t.qZA(),t.TgZ(21,"mat-form-field",4),t.TgZ(22,"mat-label"),t._uU(23),t.ALo(24,"Translate"),t.qZA(),t._UZ(25,"input",8),t.TgZ(26,"mat-error"),t._uU(27,"Room is required"),t.qZA(),t.qZA(),t.TgZ(28,"mat-form-field",4),t.TgZ(29,"mat-label"),t._uU(30),t.ALo(31,"Translate"),t.qZA(),t._UZ(32,"input",9),t.TgZ(33,"mat-error"),t._uU(34,"Fee is required"),t.qZA(),t.qZA(),t.TgZ(35,"mat-form-field",4),t.TgZ(36,"mat-label"),t._uU(37),t.ALo(38,"Translate"),t.qZA(),t._UZ(39,"input",10),t.TgZ(40,"mat-error"),t._uU(41,"Fee is required"),t.qZA(),t.qZA(),t.TgZ(42,"mat-form-field",4),t.TgZ(43,"mat-label"),t._uU(44),t.ALo(45,"Translate"),t.qZA(),t._UZ(46,"input",11),t.qZA(),t.TgZ(47,"mat-form-field",4),t.TgZ(48,"mat-label"),t._uU(49),t.ALo(50,"Translate"),t.qZA(),t._UZ(51,"input",12),t._UZ(52,"mat-datepicker-toggle",13),t._UZ(53,"mat-datepicker",null,14),t.qZA(),t.TgZ(55,"mat-form-field",4),t.TgZ(56,"mat-label"),t._uU(57),t.ALo(58,"Translate"),t.qZA(),t.TgZ(59,"mat-select",15),t.YNc(60,k,3,4,"mat-option",6),t.qZA(),t.TgZ(61,"mat-error"),t._uU(62,"Operation type is required"),t.qZA(),t.qZA(),t.TgZ(63,"mat-form-field",4),t.TgZ(64,"mat-label"),t._uU(65),t.ALo(66,"Translate"),t.qZA(),t.TgZ(67,"mat-select",16),t.YNc(68,X,3,4,"mat-option",6),t.qZA(),t.TgZ(69,"mat-error"),t._uU(70,"Priority level is required"),t.qZA(),t.qZA(),t.TgZ(71,"mat-form-field",4),t.TgZ(72,"mat-label"),t._uU(73),t.ALo(74,"Translate"),t.qZA(),t._UZ(75,"input",17),t.qZA(),t.qZA(),t.YNc(76,z,1,0,"mat-divider",18),t.TgZ(77,"mat-card-actions"),t.YNc(78,tt,5,3,"button",19),t.YNc(79,et,5,4,"button",20),t.YNc(80,it,5,4,"button",21),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.YNc(81,ot,2,0,"mat-card-footer",0)),2&e){const a=t.MAs(54);t.Q6J("ngIf",!o.editing),t.xp6(3),t.Q6J("formGroup",o.visitForm),t.xp6(4),t.Oqu(t.lcZ(8,25,o.Texts.Doctor)),t.xp6(3),t.Q6J("ngForOf",o.doctors),t.xp6(5),t.Oqu(t.lcZ(16,27,o.Texts.Patient)),t.xp6(3),t.Q6J("ngForOf",o.patients),t.xp6(5),t.Oqu(t.lcZ(24,29,o.Texts.Room)),t.xp6(7),t.Oqu(t.lcZ(31,31,o.Texts.PreOperationFee)),t.xp6(7),t.Oqu(t.lcZ(38,33,o.Texts.PostOperationFee)),t.xp6(7),t.Oqu(t.lcZ(45,35,o.Texts.ScheduleDate)),t.xp6(5),t.Oqu(t.lcZ(50,37,o.Texts.DoneDate)),t.xp6(2),t.Q6J("matDatepicker",a),t.xp6(1),t.Q6J("for",a),t.xp6(5),t.Oqu(t.lcZ(58,39,o.Texts.OperationType)),t.xp6(2),t.Q6J("compareWith",o.compareOperation),t.xp6(1),t.Q6J("ngForOf",o.operations),t.xp6(5),t.Oqu(t.lcZ(66,41,o.Texts.PriorityLevel)),t.xp6(2),t.Q6J("compareWith",o.comparePriority),t.xp6(1),t.Q6J("ngForOf",o.priorities),t.xp6(5),t.Oqu(t.lcZ(74,43,o.Texts.Description)),t.xp6(3),t.Q6J("ngIf",!o.editing),t.xp6(2),t.Q6J("ngIf",!o.editing),t.xp6(1),t.Q6J("ngIf",!o.editing),t.xp6(1),t.Q6J("ngIf",o.editing),t.xp6(1),t.Q6J("ngIf",!o.editing)}},directives:[f.O5,d.xY,r._Y,r.JL,r.sg,u.dn,g.KE,g.hX,B.gD,r.JJ,r.u,f.sg,g.TO,I.Nt,r.Fj,r.wV,v.hl,v.nW,g.R9,v.Mq,u.hq,u.n5,G.ey,L.d,S.lW,R.Hw,u.rt],pipes:[M.v],styles:[""]}),i})();var T=s(5077),x=s(9463),at=s(89),st=s(4408);const nt=["patientName"],rt=["patientMobile"],lt=["doctorName"];function pt(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"app-table",8),t.NdJ("editRow",function(a){return t.CHM(e),t.oxw().editVisit(a)})("deleteRow",function(a){return t.CHM(e),t.oxw().deleteVisit(a)})("tablePaging",function(a){return t.CHM(e),t.oxw().handlePaging(a)})("rowDetails",function(a){return t.CHM(e),t.oxw().showDetails(a)}),t.qZA()}if(2&i){const e=t.oxw();t.Q6J("table",e.table)("excludedColumns",e.excludedColumns)("canEdit",e.canEdit)("canDelete",e.canDelete)}}const ct=[{path:"",component:(()=>{class i{constructor(e,o,a,c,C,A){this.repository=e,this.dilaog=o,this.snackBar=a,this.appText=c,this.authenticationService=C,this.progressBarService=A,this.showPortal=!1,this.Texts=this.appText.getAppTexts(),this.dataLoaded=!1,this.excludedColumns=["id","patient","doctor","doctorId","patientId","createdBy","createdDate","lastModifiedBy","lastModifiedDate","isDeleted"],this.fetchData=()=>this.repository.VisitRepository.getVisits(this.patientNameSearchKey,this.patientMobileSearchKey,this.doctorNameSearchKey,this.pagingFilter).pipe((0,l.U)(V=>{let h=JSON.parse(JSON.stringify(V));h.list.forEach(p=>{p.patientMobile=p.patient.mobile,p.doctorName=`${p.doctor.firstName} ${p.doctor.lastName}`,p.patientName=`${p.patient.firstName} ${p.patient.lastName}`}),this.table=h,this.dataLoaded=!0,this.progressBarService.hideProgressbar()}),(0,m.q)(1)).subscribe(),this.canEdit=this.authenticationService.checkPermission("/EditVisit"),this.canDelete=this.authenticationService.checkPermission("/DeleteVisit")}ngOnInit(){this.progressBarService.showProgressbar(),this.setSearchInputListeners(),this.fetchData()}editVisit(e){this.dilaog.open(P,{width:"320px",data:{visit:e,id:e.id}}).afterClosed().pipe((0,l.U)(a=>{a&&"updated"==a.event&&(this.fetchData(),this.snackBar.open("Visit updated succefully","OK",{duration:3e3}))}),(0,m.q)(1)).subscribe()}deleteVisit(e){this.dilaog.open(at.F,{width:"300px",height:"150px",data:{message:"Are you sure you want to delete this visit?"}}).afterClosed().pipe((0,l.U)(a=>{"delete"===a.event&&(this.progressBarService.showProgressbar(),this.repository.VisitRepository.deleteVisit(e.id).pipe((0,l.U)(c=>{this.fetchData(),this.snackBar.open("Visit deleted succefully","OK",{duration:3e3})}),(0,m.q)(1)).subscribe())}),(0,m.q)(1)).subscribe()}showDetails(e){this.dilaog.open(st.d,{width:"500px",height:"600px",data:{model:e}})}handlePaging(e){this.pagingFilter=e,this.fetchData()}setSearchInputListeners(){this.patientNameChangeEvent=(0,T.R)(this.patientName.nativeElement,"keyup").pipe((0,x.b)(1e3),(0,l.U)(e=>{this.patientNameSearchKey=e.target.value.trim(),this.fetchData()})).subscribe(),this.patientMobileChangeEvent=(0,T.R)(this.patientMobile.nativeElement,"keyup").pipe((0,x.b)(1e3),(0,l.U)(e=>{this.patientMobileSearchKey=e.target.value.trim(),this.fetchData()})).subscribe(),this.doctorNameChangeEvent=(0,T.R)(this.doctorName.nativeElement,"keyup").pipe((0,x.b)(1e3),(0,l.U)(e=>{this.doctorNameSearchKey=e.target.value.trim(),this.fetchData()})).subscribe()}ngOnDestroy(){this.patientNameChangeEvent.unsubscribe(),this.patientMobileChangeEvent.unsubscribe(),this.doctorNameChangeEvent.unsubscribe()}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(D.b),t.Y36(d.uw),t.Y36(q.ux),t.Y36(Z.u),t.Y36(U.$),t.Y36(b.v))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-visit"]],viewQuery:function(e,o){if(1&e&&(t.Gf(nt,7),t.Gf(rt,7),t.Gf(lt,7)),2&e){let a;t.iGM(a=t.CRH())&&(o.patientName=a.first),t.iGM(a=t.CRH())&&(o.patientMobile=a.first),t.iGM(a=t.CRH())&&(o.doctorName=a.first)}},decls:22,vars:13,consts:[[1,"searchBar"],["for","username"],["type","text",1,"searchBarInput"],["patientName",""],["for","lastname"],["patientMobile",""],["doctorName",""],[3,"table","excludedColumns","canEdit","canDelete","editRow","deleteRow","tablePaging","rowDetails",4,"ngIf"],[3,"table","excludedColumns","canEdit","canDelete","editRow","deleteRow","tablePaging","rowDetails"]],template:function(e,o){1&e&&(t.TgZ(0,"mat-card-title"),t._uU(1),t.ALo(2,"Translate"),t.qZA(),t.TgZ(3,"div",0),t.TgZ(4,"label",1),t._uU(5),t.ALo(6,"Translate"),t._UZ(7,"input",2,3),t.qZA(),t.TgZ(9,"label",4),t._uU(10),t.ALo(11,"Translate"),t._UZ(12,"input",2,5),t.qZA(),t.TgZ(14,"label",4),t._uU(15),t.ALo(16,"Translate"),t._UZ(17,"input",2,6),t.qZA(),t.qZA(),t.YNc(19,pt,1,4,"app-table",7),t.TgZ(20,"mat-card-footer"),t._uU(21," main card footer\n"),t.qZA()),2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,5,o.Texts.VisitManagement)),t.xp6(4),t.hij(" ",t.lcZ(6,7,o.Texts.PatientName)," : "),t.xp6(5),t.hij(" ",t.lcZ(11,9,o.Texts.PatientMobile)," : "),t.xp6(5),t.hij(" ",t.lcZ(16,11,o.Texts.DoctorName)," : "),t.xp6(4),t.Q6J("ngIf",o.dataLoaded))},directives:[u.n5,f.O5,u.rt,O.a],pipes:[M.v],styles:[""]}),i})()},{path:"AddVisit",component:P},{path:"LiveVisit",component:j}];let mt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[N.Bz.forChild(ct)],N.Bz]}),i})();var dt=s(1548),ut=s(9009),ht=s(9859),ft=s(514),gt=s(7735),vt=s(8191);let Zt=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({providers:[{provide:d.so,useValue:{}},{provide:d.WI,useValue:{}}],imports:[[f.ez,mt,dt.N6,u.QW,ut.Cv,gt.m,g.lN,R.Ps,L.t,I.c,S.ot,ft.rP,B.LD,r.UX,d.Is,ht.Fk,v.FA,vt.I]]}),i})()}}]);
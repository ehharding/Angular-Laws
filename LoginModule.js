"use strict";(self.webpackChunkpocket_fic=self.webpackChunkpocket_fic||[]).push([[765],{5823:(R,u,e)=>{e.r(u),e.d(u,{LoginModule:()=>B});var c=e(8506),l=e(3402),h=e(9109),r=e(8665),p=e(8603),f=e(5613),d=e(507),g=e(2670),v=e(8208),t=e(4565);const y=[{path:"",component:(()=>{class n{constructor(o,i,a){this._router=o,this._snackBar=i,this._userService=a,this.mobileView=!1,this.loginFormGroup=new r.cw({userName:new r.NI("",r.kI.required),password:new r.NI("",r.kI.required)}),this._componentDestroyed$=new p.t(1)}_onResize(o,i=!1){this.mobileView=i?window.innerWidth<g.E.appConfiguration.constants.mobileViewThresholdWidthPX:o.innerWidth<g.E.appConfiguration.constants.mobileViewThresholdWidthPX}ngOnInit(){this._onResize(window,!0)}ngOnDestroy(){this._componentDestroyed$.next(!0),this._componentDestroyed$.complete()}login(){var i,o=this;this._userService.login$(this.loginFormGroup.value.userName,this.loginFormGroup.value.password).pipe((0,f.R)(this._componentDestroyed$)).subscribe({next:(i=(0,h.Z)(function*(a){o._snackBar.open("Log In Successful","OK",d.l),yield o._router.navigate([""])}),function(m){return i.apply(this,arguments)}),error:i=>{this._snackBar.open("Failed to Log In. Please Try Again.","OK",{...d.l,politeness:"assertive"})}})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(l.F0),t.Y36(c.ux),t.Y36(v.K))},n.\u0275cmp=t.Xpm({type:n,selectors:[["pf-login"]],hostBindings:function(o,i){1&o&&t.NdJ("resize",function(m){return i._onResize(m.target)},!1,t.Jf7)},decls:1,vars:0,template:function(o,i){1&o&&t._UZ(0,"main")},styles:[""],changeDetection:0}),n})()}];let L=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[l.Bz.forChild(y)],l.Bz]}),n})();var C=e(8816);let B=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[[c.ZX,L,C.m]]}),n})()}}]);
//# sourceMappingURL=LoginModule.js.map
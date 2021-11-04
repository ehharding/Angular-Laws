"use strict";(self.webpackChunkpocket_fic=self.webpackChunkpocket_fic||[]).push([[871],{6871:(we,M,s)=>{s.r(M),s.d(M,{ContributorsModule:()=>Pe});var Z=s(7752),c=s(8662),e=s(4001),E=s(8288),u=s(2871),g=s(3238),S=s(2270);let J=0;const _=new e.OlP("CdkAccordion");let L=(()=>{class n{constructor(){this._stateChanges=new g.x,this._openCloseAllActions=new g.x,this.id="cdk-accordion-"+J++,this._multi=!1}get multi(){return this._multi}set multi(t){this._multi=(0,u.Ig)(t)}openAll(){this._multi&&this._openCloseAllActions.next(!0)}closeAll(){this._openCloseAllActions.next(!1)}ngOnChanges(t){this._stateChanges.next(t)}ngOnDestroy(){this._stateChanges.complete(),this._openCloseAllActions.complete()}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=e.lG2({type:n,selectors:[["cdk-accordion"],["","cdkAccordion",""]],inputs:{multi:"multi"},exportAs:["cdkAccordion"],features:[e._Bn([{provide:_,useExisting:n}]),e.TTD]}),n})(),G=0,z=(()=>{class n{constructor(t,o,a){this.accordion=t,this._changeDetectorRef=o,this._expansionDispatcher=a,this._openCloseAllSubscription=S.w0.EMPTY,this.closed=new e.vpe,this.opened=new e.vpe,this.destroyed=new e.vpe,this.expandedChange=new e.vpe,this.id="cdk-accordion-child-"+G++,this._expanded=!1,this._disabled=!1,this._removeUniqueSelectionListener=()=>{},this._removeUniqueSelectionListener=a.listen((d,h)=>{this.accordion&&!this.accordion.multi&&this.accordion.id===h&&this.id!==d&&(this.expanded=!1)}),this.accordion&&(this._openCloseAllSubscription=this._subscribeToOpenCloseAllActions())}get expanded(){return this._expanded}set expanded(t){t=(0,u.Ig)(t),this._expanded!==t&&(this._expanded=t,this.expandedChange.emit(t),t?(this.opened.emit(),this._expansionDispatcher.notify(this.id,this.accordion?this.accordion.id:this.id)):this.closed.emit(),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled}set disabled(t){this._disabled=(0,u.Ig)(t)}ngOnDestroy(){this.opened.complete(),this.closed.complete(),this.destroyed.emit(),this.destroyed.complete(),this._removeUniqueSelectionListener(),this._openCloseAllSubscription.unsubscribe()}toggle(){this.disabled||(this.expanded=!this.expanded)}close(){this.disabled||(this.expanded=!1)}open(){this.disabled||(this.expanded=!0)}_subscribeToOpenCloseAllActions(){return this.accordion._openCloseAllActions.subscribe(t=>{this.disabled||(this.expanded=t)})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(_,12),e.Y36(e.sBO),e.Y36(E.A8))},n.\u0275dir=e.lG2({type:n,selectors:[["cdk-accordion-item"],["","cdkAccordionItem",""]],inputs:{expanded:"expanded",disabled:"disabled"},outputs:{closed:"closed",opened:"opened",destroyed:"destroyed",expandedChange:"expandedChange"},exportAs:["cdkAccordionItem"],features:[e._Bn([{provide:_,useValue:void 0}])]}),n})(),X=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({}),n})();var v=s(8252),m=s(8267),P=s(2157),w=s(2706),f=s(1607),H=s(2812),x=s(1569),K=s(7529),A=s(7926),I=s(6829),V=s(4163),W=s(3019),r=s(6755);const ee=["body"];function te(n,i){}const ne=[[["mat-expansion-panel-header"]],"*",[["mat-action-row"]]],oe=["mat-expansion-panel-header","*","mat-action-row"];function ie(n,i){if(1&n&&e._UZ(0,"span",2),2&n){const t=e.oxw();e.Q6J("@indicatorRotate",t._getExpandedState())}}const ae=[[["mat-panel-title"]],[["mat-panel-description"]],"*"],se=["mat-panel-title","mat-panel-description","*"],C=new e.OlP("MAT_ACCORDION"),D="225ms cubic-bezier(0.4,0.0,0.2,1)",O={indicatorRotate:(0,r.X$)("indicatorRotate",[(0,r.SB)("collapsed, void",(0,r.oB)({transform:"rotate(0deg)"})),(0,r.SB)("expanded",(0,r.oB)({transform:"rotate(180deg)"})),(0,r.eR)("expanded <=> collapsed, void => collapsed",(0,r.jt)(D))]),bodyExpansion:(0,r.X$)("bodyExpansion",[(0,r.SB)("collapsed, void",(0,r.oB)({height:"0px",visibility:"hidden"})),(0,r.SB)("expanded",(0,r.oB)({height:"*",visibility:"visible"})),(0,r.eR)("expanded <=> collapsed, void => collapsed",(0,r.jt)(D))])};let N=(()=>{class n{constructor(t){this._template=t}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(e.Rgc))},n.\u0275dir=e.lG2({type:n,selectors:[["ng-template","matExpansionPanelContent",""]]}),n})(),re=0;const F=new e.OlP("MAT_EXPANSION_PANEL_DEFAULT_OPTIONS");let B=(()=>{class n extends z{constructor(t,o,a,d,h,y,b){super(t,o,a),this._viewContainerRef=d,this._animationMode=y,this._hideToggle=!1,this.afterExpand=new e.vpe,this.afterCollapse=new e.vpe,this._inputChanges=new g.x,this._headerId="mat-expansion-panel-header-"+re++,this._bodyAnimationDone=new g.x,this.accordion=t,this._document=h,this._bodyAnimationDone.pipe((0,f.x)((p,l)=>p.fromState===l.fromState&&p.toState===l.toState)).subscribe(p=>{"void"!==p.fromState&&("expanded"===p.toState?this.afterExpand.emit():"collapsed"===p.toState&&this.afterCollapse.emit())}),b&&(this.hideToggle=b.hideToggle)}get hideToggle(){return this._hideToggle||this.accordion&&this.accordion.hideToggle}set hideToggle(t){this._hideToggle=(0,u.Ig)(t)}get togglePosition(){return this._togglePosition||this.accordion&&this.accordion.togglePosition}set togglePosition(t){this._togglePosition=t}_hasSpacing(){return!!this.accordion&&this.expanded&&"default"===this.accordion.displayMode}_getExpandedState(){return this.expanded?"expanded":"collapsed"}toggle(){this.expanded=!this.expanded}close(){this.expanded=!1}open(){this.expanded=!0}ngAfterContentInit(){this._lazyContent&&this.opened.pipe((0,H.O)(null),(0,x.h)(()=>this.expanded&&!this._portal),(0,K.q)(1)).subscribe(()=>{this._portal=new v.UE(this._lazyContent._template,this._viewContainerRef)})}ngOnChanges(t){this._inputChanges.next(t)}ngOnDestroy(){super.ngOnDestroy(),this._bodyAnimationDone.complete(),this._inputChanges.complete()}_containsFocus(){if(this._body){const t=this._document.activeElement,o=this._body.nativeElement;return t===o||o.contains(t)}return!1}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(C,12),e.Y36(e.sBO),e.Y36(E.A8),e.Y36(e.s_b),e.Y36(m.K0),e.Y36(I.Qb,8),e.Y36(F,8))},n.\u0275cmp=e.Xpm({type:n,selectors:[["mat-expansion-panel"]],contentQueries:function(t,o,a){if(1&t&&e.Suo(a,N,5),2&t){let d;e.iGM(d=e.CRH())&&(o._lazyContent=d.first)}},viewQuery:function(t,o){if(1&t&&e.Gf(ee,5),2&t){let a;e.iGM(a=e.CRH())&&(o._body=a.first)}},hostAttrs:[1,"mat-expansion-panel"],hostVars:6,hostBindings:function(t,o){2&t&&e.ekj("mat-expanded",o.expanded)("_mat-animation-noopable","NoopAnimations"===o._animationMode)("mat-expansion-panel-spacing",o._hasSpacing())},inputs:{disabled:"disabled",expanded:"expanded",hideToggle:"hideToggle",togglePosition:"togglePosition"},outputs:{opened:"opened",closed:"closed",expandedChange:"expandedChange",afterExpand:"afterExpand",afterCollapse:"afterCollapse"},exportAs:["matExpansionPanel"],features:[e._Bn([{provide:C,useValue:void 0}]),e.qOj,e.TTD],ngContentSelectors:oe,decls:7,vars:4,consts:[["role","region",1,"mat-expansion-panel-content",3,"id"],["body",""],[1,"mat-expansion-panel-body"],[3,"cdkPortalOutlet"]],template:function(t,o){1&t&&(e.F$t(ne),e.Hsn(0),e.TgZ(1,"div",0,1),e.NdJ("@bodyExpansion.done",function(d){return o._bodyAnimationDone.next(d)}),e.TgZ(3,"div",2),e.Hsn(4,1),e.YNc(5,te,0,0,"ng-template",3),e.qZA(),e.Hsn(6,2),e.qZA()),2&t&&(e.xp6(1),e.Q6J("@bodyExpansion",o._getExpandedState())("id",o.id),e.uIk("aria-labelledby",o._headerId),e.xp6(4),e.Q6J("cdkPortalOutlet",o._portal))},directives:[v.Pl],styles:[".mat-expansion-panel{box-sizing:content-box;display:block;margin:0;border-radius:4px;overflow:hidden;transition:margin 225ms cubic-bezier(0.4, 0, 0.2, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);position:relative}.mat-accordion .mat-expansion-panel:not(.mat-expanded),.mat-accordion .mat-expansion-panel:not(.mat-expansion-panel-spacing){border-radius:0}.mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:4px;border-top-left-radius:4px}.mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:4px;border-bottom-left-radius:4px}.cdk-high-contrast-active .mat-expansion-panel{outline:solid 1px}.mat-expansion-panel.ng-animate-disabled,.ng-animate-disabled .mat-expansion-panel,.mat-expansion-panel._mat-animation-noopable{transition:none}.mat-expansion-panel-content{display:flex;flex-direction:column;overflow:visible}.mat-expansion-panel-body{padding:0 24px 16px}.mat-expansion-panel-spacing{margin:16px 0}.mat-accordion>.mat-expansion-panel-spacing:first-child,.mat-accordion>*:first-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-top:0}.mat-accordion>.mat-expansion-panel-spacing:last-child,.mat-accordion>*:last-child:not(.mat-expansion-panel) .mat-expansion-panel-spacing{margin-bottom:0}.mat-action-row{border-top-style:solid;border-top-width:1px;display:flex;flex-direction:row;justify-content:flex-end;padding:16px 8px 16px 24px}.mat-action-row button.mat-button-base,.mat-action-row button.mat-mdc-button-base{margin-left:8px}[dir=rtl] .mat-action-row button.mat-button-base,[dir=rtl] .mat-action-row button.mat-mdc-button-base{margin-left:0;margin-right:8px}\n"],encapsulation:2,data:{animation:[O.bodyExpansion]},changeDetection:0}),n})();class de{}const le=(0,P.sb)(de);let R=(()=>{class n extends le{constructor(t,o,a,d,h,y,b){super(),this.panel=t,this._element=o,this._focusMonitor=a,this._changeDetectorRef=d,this._animationMode=y,this._parentChangeSubscription=S.w0.EMPTY;const p=t.accordion?t.accordion._stateChanges.pipe((0,x.h)(l=>!(!l.hideToggle&&!l.togglePosition))):V.E;this.tabIndex=parseInt(b||"")||0,this._parentChangeSubscription=(0,W.T)(t.opened,t.closed,p,t._inputChanges.pipe((0,x.h)(l=>!!(l.hideToggle||l.disabled||l.togglePosition)))).subscribe(()=>this._changeDetectorRef.markForCheck()),t.closed.pipe((0,x.h)(()=>t._containsFocus())).subscribe(()=>a.focusVia(o,"program")),h&&(this.expandedHeight=h.expandedHeight,this.collapsedHeight=h.collapsedHeight)}get disabled(){return this.panel.disabled}_toggle(){this.disabled||this.panel.toggle()}_isExpanded(){return this.panel.expanded}_getExpandedState(){return this.panel._getExpandedState()}_getPanelId(){return this.panel.id}_getTogglePosition(){return this.panel.togglePosition}_showToggle(){return!this.panel.hideToggle&&!this.panel.disabled}_getHeaderHeight(){const t=this._isExpanded();return t&&this.expandedHeight?this.expandedHeight:!t&&this.collapsedHeight?this.collapsedHeight:null}_keydown(t){switch(t.keyCode){case A.L_:case A.K5:(0,A.Vb)(t)||(t.preventDefault(),this._toggle());break;default:return void(this.panel.accordion&&this.panel.accordion._handleHeaderKeydown(t))}}focus(t,o){t?this._focusMonitor.focusVia(this._element,t,o):this._element.nativeElement.focus(o)}ngAfterViewInit(){this._focusMonitor.monitor(this._element).subscribe(t=>{t&&this.panel.accordion&&this.panel.accordion._handleHeaderFocus(this)})}ngOnDestroy(){this._parentChangeSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._element)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(B,1),e.Y36(e.SBq),e.Y36(w.tE),e.Y36(e.sBO),e.Y36(F,8),e.Y36(I.Qb,8),e.$8M("tabindex"))},n.\u0275cmp=e.Xpm({type:n,selectors:[["mat-expansion-panel-header"]],hostAttrs:["role","button",1,"mat-expansion-panel-header","mat-focus-indicator"],hostVars:15,hostBindings:function(t,o){1&t&&e.NdJ("click",function(){return o._toggle()})("keydown",function(d){return o._keydown(d)}),2&t&&(e.uIk("id",o.panel._headerId)("tabindex",o.tabIndex)("aria-controls",o._getPanelId())("aria-expanded",o._isExpanded())("aria-disabled",o.panel.disabled),e.Udp("height",o._getHeaderHeight()),e.ekj("mat-expanded",o._isExpanded())("mat-expansion-toggle-indicator-after","after"===o._getTogglePosition())("mat-expansion-toggle-indicator-before","before"===o._getTogglePosition())("_mat-animation-noopable","NoopAnimations"===o._animationMode))},inputs:{tabIndex:"tabIndex",expandedHeight:"expandedHeight",collapsedHeight:"collapsedHeight"},features:[e.qOj],ngContentSelectors:se,decls:5,vars:1,consts:[[1,"mat-content"],["class","mat-expansion-indicator",4,"ngIf"],[1,"mat-expansion-indicator"]],template:function(t,o){1&t&&(e.F$t(ae),e.TgZ(0,"span",0),e.Hsn(1),e.Hsn(2,1),e.Hsn(3,2),e.qZA(),e.YNc(4,ie,1,1,"span",1)),2&t&&(e.xp6(4),e.Q6J("ngIf",o._showToggle()))},directives:[m.O5],styles:['.mat-expansion-panel-header{display:flex;flex-direction:row;align-items:center;padding:0 24px;border-radius:inherit;transition:height 225ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-expansion-panel-header._mat-animation-noopable{transition:none}.mat-expansion-panel-header:focus,.mat-expansion-panel-header:hover{outline:none}.mat-expansion-panel-header.mat-expanded:focus,.mat-expansion-panel-header.mat-expanded:hover{background:inherit}.mat-expansion-panel-header:not([aria-disabled=true]){cursor:pointer}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before{flex-direction:row-reverse}.mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 16px 0 0}[dir=rtl] .mat-expansion-panel-header.mat-expansion-toggle-indicator-before .mat-expansion-indicator{margin:0 0 0 16px}.mat-content{display:flex;flex:1;flex-direction:row;overflow:hidden}.mat-expansion-panel-header-title,.mat-expansion-panel-header-description{display:flex;flex-grow:1;margin-right:16px}[dir=rtl] .mat-expansion-panel-header-title,[dir=rtl] .mat-expansion-panel-header-description{margin-right:0;margin-left:16px}.mat-expansion-panel-header-description{flex-grow:2}.mat-expansion-indicator::after{border-style:solid;border-width:0 2px 2px 0;content:"";display:inline-block;padding:3px;transform:rotate(45deg);vertical-align:middle}.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-keyboard-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel .mat-expansion-panel-header.cdk-program-focused:not([aria-disabled=true])::before,.cdk-high-contrast-active .mat-expansion-panel:not(.mat-expanded) .mat-expansion-panel-header:hover:not([aria-disabled=true])::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;border:3px solid;border-radius:4px;content:""}.cdk-high-contrast-active .mat-expansion-panel-content{border-top:1px solid;border-top-left-radius:0;border-top-right-radius:0}\n'],encapsulation:2,data:{animation:[O.indicatorRotate]},changeDetection:0}),n})(),ce=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=e.lG2({type:n,selectors:[["mat-panel-description"]],hostAttrs:[1,"mat-expansion-panel-header-description"]}),n})(),pe=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275dir=e.lG2({type:n,selectors:[["mat-panel-title"]],hostAttrs:[1,"mat-expansion-panel-header-title"]}),n})(),he=(()=>{class n extends L{constructor(){super(...arguments),this._ownHeaders=new e.n_E,this._hideToggle=!1,this.displayMode="default",this.togglePosition="after"}get hideToggle(){return this._hideToggle}set hideToggle(t){this._hideToggle=(0,u.Ig)(t)}ngAfterContentInit(){this._headers.changes.pipe((0,H.O)(this._headers)).subscribe(t=>{this._ownHeaders.reset(t.filter(o=>o.panel.accordion===this)),this._ownHeaders.notifyOnChanges()}),this._keyManager=new w.Em(this._ownHeaders).withWrap().withHomeAndEnd()}_handleHeaderKeydown(t){this._keyManager.onKeydown(t)}_handleHeaderFocus(t){this._keyManager.updateActiveItem(t)}ngOnDestroy(){super.ngOnDestroy(),this._ownHeaders.destroy()}}return n.\u0275fac=function(){let i;return function(o){return(i||(i=e.n5z(n)))(o||n)}}(),n.\u0275dir=e.lG2({type:n,selectors:[["mat-accordion"]],contentQueries:function(t,o,a){if(1&t&&e.Suo(a,R,5),2&t){let d;e.iGM(d=e.CRH())&&(o._headers=d)}},hostAttrs:[1,"mat-accordion"],hostVars:2,hostBindings:function(t,o){2&t&&e.ekj("mat-accordion-multi",o.multi)},inputs:{multi:"multi",hideToggle:"hideToggle",displayMode:"displayMode",togglePosition:"togglePosition"},exportAs:["matAccordion"],features:[e._Bn([{provide:C,useExisting:n}]),e.qOj]}),n})(),ue=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[m.ez,P.BQ,X,v.eL]]}),n})();var k=s(3981),U=s(8852),$=s(7203),T=s(6213),me=s(9195),q=s(6567),ge=s(8970),fe=s(1731),Y=s(5347);const xe=[(0,r.X$)("hover",[(0,r.SB)("normalState",(0,r.oB)({transform:"translateX(0)"})),(0,r.SB)("shiftedState",(0,r.oB)({transform:"translateX(10px)"}))]),(0,r.X$)("openClose",[(0,r.SB)("visibleState",(0,r.oB)({opacity:1})),(0,r.SB)("invisibleState",(0,r.oB)({opacity:0})),(0,r.eR)("visibleState <=> invisibleState",[(0,r.jt)(`${Y.E.appConfiguration.constants.genericAnimationDurationMS}ms`)])])];var Q=s(8824),be=s(6781);let j=(()=>{class n{constructor(t){this._httpClient=t,this._allContributors$=new Q.X([]),this._contributorsFetchError$=new Q.X(void 0),this.fetchAllContributors()}fetchAllContributors(){this._httpClient.get(Y.E.appConfiguration.apiServer.paths.contributors.allContributors).pipe((0,f.x)()).subscribe({next:t=>{this._allContributors$.next(t),this._contributorsFetchError$.next(void 0)},error:t=>{this._contributorsFetchError$.next(t)}})}getAllContributors$(){return this._allContributors$.asObservable().pipe((0,f.x)())}getContributorsFetchError$(){return this._contributorsFetchError$.asObservable().pipe((0,f.x)())}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(be.eN))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"any"}),n})();function _e(n,i){if(1&n&&(e.TgZ(0,"a",24),e.TgZ(1,"button",25),e.TgZ(2,"mat-icon",22),e._uU(3,"contact_page"),e.qZA(),e.TgZ(4,"span"),e._uU(5,"RESUM\xc9"),e.qZA(),e.qZA(),e.qZA()),2&n){const t=e.oxw(2).$implicit;e.Q6J("href",t.resume,e.LSH)}}function ve(n,i){if(1&n&&(e.TgZ(0,"a",24),e.TgZ(1,"button",25),e._UZ(2,"img",26),e.TgZ(3,"span"),e._uU(4,"GITHUB"),e.qZA(),e.qZA(),e.qZA()),2&n){const t=e.oxw(2).$implicit;e.Q6J("href",t.gitHub,e.LSH)}}function Ae(n,i){if(1&n&&(e.TgZ(0,"a",24),e.TgZ(1,"button",25),e._UZ(2,"img",27),e.TgZ(3,"span"),e._uU(4,"LINKEDIN"),e.qZA(),e.qZA(),e.qZA()),2&n){const t=e.oxw(2).$implicit;e.Q6J("href",t.linkedIn,e.LSH)}}function Ce(n,i){if(1&n&&(e.TgZ(0,"div",12),e.TgZ(1,"mat-card",13),e.TgZ(2,"mat-card-header"),e._UZ(3,"img",14),e.TgZ(4,"mat-card-title"),e.TgZ(5,"strong"),e._uU(6),e.qZA(),e.qZA(),e.TgZ(7,"mat-card-subtitle"),e.TgZ(8,"div",15),e.TgZ(9,"div",16),e._uU(10),e.qZA(),e.TgZ(11,"div"),e.TgZ(12,"a",17),e.TgZ(13,"button",18),e.TgZ(14,"mat-icon",19),e._uU(15,"import_contacts"),e.qZA(),e.TgZ(16,"span"),e._uU(17,"VISIT POCKET FIC PROFILE"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(18,"mat-card-content"),e._uU(19),e.qZA(),e.TgZ(20,"mat-card-actions"),e.TgZ(21,"a",20),e.TgZ(22,"button",21),e.TgZ(23,"mat-icon",22),e._uU(24,"email"),e.qZA(),e.TgZ(25,"span"),e._uU(26,"E-MAIL"),e.qZA(),e.qZA(),e.qZA(),e.YNc(27,_e,6,1,"a",23),e.YNc(28,ve,5,1,"a",23),e.YNc(29,Ae,5,1,"a",23),e.qZA(),e.qZA(),e.qZA()),2&n){const t=e.oxw(),o=t.$implicit,a=t.index,d=e.oxw(2);e.xp6(3),e.hYB("alt","",o.firstName," ",o.lastName,"'s Avatar"),e.MGl("src","assets/avatars/",d.contributorNamesKebab[a],".jpg",e.LSH),e.xp6(3),e.AsE("",o.firstName," ",o.lastName,""),e.xp6(4),e.hij(" ",o.jobTitle," "),e.xp6(2),e.hYB("routerLink","/",d.AppRoute.Users,"/",o.id,""),e.xp6(1),e.Q6J("matTooltip",o.pocketFicUserName),e.xp6(6),e.Oqu(o.personalSummary),e.xp6(2),e.hYB("href","mailto:",o.email,"?subject=Subject&body=Hi%20",o.firstName,"",e.LSH),e.xp6(1),e.Q6J("matTooltip",o.email),e.xp6(5),e.Q6J("ngIf",o.resume),e.xp6(1),e.Q6J("ngIf",o.gitHub),e.xp6(1),e.Q6J("ngIf",o.linkedIn)}}function Te(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"mat-expansion-panel",8),e.NdJ("closed",function(){return e.CHM(t),e.oxw(2).panelOpen=!1})("opened",function(){return e.CHM(t),e.oxw(2).panelOpen=!0})("mouseenter",function(){return e.CHM(t),e.oxw(2).panelHovered=!0})("mouseleave",function(){return e.CHM(t),e.oxw(2).panelHovered=!1}),e.TgZ(1,"mat-expansion-panel-header"),e.TgZ(2,"mat-panel-title"),e.TgZ(3,"mat-icon",9),e._uU(4,"account_circle"),e.qZA(),e.TgZ(5,"span",10),e.TgZ(6,"strong"),e._uU(7),e.qZA(),e.qZA(),e.qZA(),e.TgZ(8,"mat-panel-description",10),e._uU(9),e.qZA(),e.qZA(),e.YNc(10,Ce,30,16,"ng-template",11),e.qZA()}if(2&n){const t=i.$implicit,o=i.index,a=e.oxw(2);e.Q6J("expanded",0===o),e.xp6(5),e.Q6J("@hover",a.panelHovered&&!a.panelOpen?"shiftedState":"normalState")("@openClose",a.panelOpen?"invisibleState":"visibleState"),e.xp6(2),e.AsE("",t.firstName," ",t.lastName,""),e.xp6(1),e.Q6J("@hover",a.panelHovered&&!a.panelOpen?"shiftedState":"normalState")("@openClose",a.panelOpen?"invisibleState":"visibleState"),e.xp6(1),e.hij(" ",t.jobTitle," ")}}function ye(n,i){if(1&n&&(e.TgZ(0,"mat-accordion",6),e.YNc(1,Te,11,8,"mat-expansion-panel",7),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.allContributors)}}function Me(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"div",28),e.TgZ(1,"div",15),e.TgZ(2,"h1",29),e.TgZ(3,"strong"),e._uU(4,"An Error Occurred Fetching the List of Contributors. Sorry About That!"),e.qZA(),e.TgZ(5,"mat-hint",30),e._uU(6),e.qZA(),e.qZA(),e.TgZ(7,"div"),e.TgZ(8,"button",31),e.NdJ("click",function(){return e.CHM(t),e.oxw().fetchAllContributors()}),e.TgZ(9,"mat-icon",22),e._uU(10,"refresh"),e.qZA(),e.TgZ(11,"span"),e._uU(12,"RETRY"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&n){const t=e.oxw();e.xp6(6),e.Oqu(t.contributorsFetchErrorInfo)}}const Ze=[{path:"",component:(()=>{class n{constructor(t,o){this._changeDetectorRef=t,this._contributorService=o,this.contributorNamesKebab=[],this.panelHovered=!1,this.panelOpen=!1,this.allContributors=[],this.contributorsFetchError=void 0,this.contributorsFetchErrorInfo=void 0,this.AppRoute=ge.FR,this._componentDestroyed$=new me.t(1)}ngOnInit(){this._contributorService.getAllContributors$().pipe((0,q.R)(this._componentDestroyed$)).subscribe({next:t=>{this.allContributors=t,this.contributorsFetchError=void 0,this.contributorsFetchErrorInfo=void 0;for(const o of t)this.contributorNamesKebab.push(`${o.firstName} ${o.lastName}`.toLowerCase().replace(" ","-"));this._changeDetectorRef.markForCheck()}}),this._contributorService.getContributorsFetchError$().pipe((0,q.R)(this._componentDestroyed$)).subscribe({next:t=>{t&&(this.contributorsFetchError=t,this.contributorsFetchErrorInfo=`HTTP ${t.status}: ${fe.cG.httpResponseCodes[t.status].httpStatusText}`),this._changeDetectorRef.markForCheck()}})}ngOnDestroy(){this._componentDestroyed$.next(!0),this._componentDestroyed$.complete()}fetchAllContributors(){this._contributorService.fetchAllContributors()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(e.sBO),e.Y36(j))},n.\u0275cmp=e.Xpm({type:n,selectors:[["pf-contributors"]],decls:13,vars:2,consts:[[1,"m-3","row"],[1,"mx-auto","pf-w-70"],[1,"fs-4","mt-2"],[1,"m-3"],["class","pf-headers-align",4,"ngIf"],["class","row",4,"ngIf"],[1,"pf-headers-align"],[3,"expanded","closed","opened","mouseenter","mouseleave",4,"ngFor","ngForOf"],[3,"expanded","closed","opened","mouseenter","mouseleave"],[1,"me-3"],[1,"pf-contributor-shift-animation"],["matExpansionPanelContent",""],[1,"d-flex","justify-content-center"],[1,"mat-elevation-z0"],["mat-card-avatar","",3,"alt","src"],[1,"col"],[1,"mb-2"],[3,"routerLink"],["mat-stroked-button","","matTooltipPosition","right",3,"matTooltip"],["color","primary",1,"me-2"],[3,"href"],["mat-button","",3,"matTooltip"],[1,"me-2"],["target","_blank",3,"href",4,"ngIf"],["target","_blank",3,"href"],["mat-button",""],["alt","GitHub Logo","src","assets/images/other-logos/github.svg",1,"me-2","pf-card-footer-logo"],["alt","LinkedIn Logo","src","assets/images/other-logos/linkedin.svg",1,"me-2","pf-card-footer-logo"],[1,"row"],[1,"fs-4","row"],[1,"fs-5"],["mat-raised-button","",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"header"),e.TgZ(1,"div",0),e.TgZ(2,"div",1),e.TgZ(3,"h1",2),e.TgZ(4,"strong"),e._uU(5,"Contributors"),e.qZA(),e.qZA(),e.TgZ(6,"p"),e._uU(7,"This page lists the current contributors to the project."),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(8,"main"),e.TgZ(9,"div",3),e.TgZ(10,"div",1),e.YNc(11,ye,2,1,"mat-accordion",4),e.YNc(12,Me,13,1,"div",5),e.qZA(),e.qZA(),e.qZA()),2&t&&(e.xp6(11),e.Q6J("ngIf",!o.contributorsFetchError),e.xp6(1),e.Q6J("ngIf",o.contributorsFetchError))},directives:[m.O5,he,m.sg,B,R,pe,U.Hw,ce,N,c.a8,c.dk,c.kc,c.n5,c.$j,T.yS,Z.lW,$.gM,c.dn,c.hq,k.bx],styles:[".pf-contributor-shift-animation[_ngcontent-%COMP%]{transition:all .25s ease-in-out}"],data:{animation:xe},changeDetection:0}),n})()}];let Ee=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[T.Bz.forChild(Ze)],T.Bz]}),n})();var Se=s(9247);let Pe=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({providers:[j],imports:[[Z.ot,c.QW,ue,k.lN,U.Ps,$.AV,Ee,Se.m]]}),n})()}}]);
//# sourceMappingURL=871.js.map
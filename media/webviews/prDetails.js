"use strict";(()=>{var D=globalThis,L=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),ee=new WeakMap,C=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=ee.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&ee.set(e,t))}return t}toString(){return this.cssText}},te=i=>new C(typeof i=="string"?i:i+"",void 0,V),k=(i,...t)=>{let e=i.length===1?i[0]:t.reduce((s,o,r)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[r+1],i[0]);return new C(e,i,V)},se=(i,t)=>{if(L)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),o=D.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}},F=L?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return te(e)})(i):i;var{is:ye,defineProperty:xe,getOwnPropertyDescriptor:_e,getOwnPropertyNames:we,getOwnPropertySymbols:Se,getPrototypeOf:Ae}=Object,f=globalThis,oe=f.trustedTypes,Ce=oe?oe.emptyScript:"",ke=f.reactiveElementPolyfillSupport,T=(i,t)=>i,j={toAttribute(i,t){switch(t){case Boolean:i=i?Ce:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},re=(i,t)=>!ye(i,t),ie={attribute:!0,type:String,converter:j,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ie){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&xe(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){let{get:o,set:r}=_e(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:o,set(a){let p=o?.call(this);r?.call(this,a),this.requestUpdate(t,p,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ie}static _$Ei(){if(this.hasOwnProperty(T("elementProperties")))return;let t=Ae(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(T("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(T("properties"))){let e=this.properties,s=[...we(e),...Se(e)];for(let o of s)this.createProperty(o,e[o])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let o of s)e.unshift(F(o))}else t!==void 0&&e.push(F(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return se(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:j).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){let r=s.getPropertyOptions(o),a=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:j;this._$Em=o;let p=a.fromAttribute(e,r.type);this[o]=p??this._$Ej?.get(o)??p,this._$Em=null}}requestUpdate(t,e,s,o=!1,r){if(t!==void 0){let a=this.constructor;if(o===!1&&(r=this[t]),s??(s=a.getPropertyOptions(t)),!((s.hasChanged??re)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:r},a){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),r!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,r]of this._$Ep)this[o]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[o,r]of s){let{wrapped:a}=r,p=this[o];a!==!0||this._$AL.has(o)||p===void 0||this.C(o,void 0,r,p)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[T("elementProperties")]=new Map,g[T("finalized")]=new Map,ke?.({ReactiveElement:g}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.2");var M=globalThis,ae=i=>i,I=M.trustedTypes,ne=I?I.createPolicy("lit-html",{createHTML:i=>i}):void 0,ue="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,me="?"+$,Te=`<${me}>`,_=document,P=()=>_.createComment(""),R=i=>i===null||typeof i!="object"&&typeof i!="function",G=Array.isArray,Ee=i=>G(i)||typeof i?.[Symbol.iterator]=="function",W=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,le=/>/g,y=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ce=/'/g,pe=/"/g,ve=/^(?:script|style|textarea|title)$/i,X=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),n=X(1),Ue=X(2),De=X(3),w=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),he=new WeakMap,x=_.createTreeWalker(_,129);function ge(i,t){if(!G(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return ne!==void 0?ne.createHTML(t):t}var Me=(i,t)=>{let e=i.length-1,s=[],o,r=t===2?"<svg>":t===3?"<math>":"",a=E;for(let p=0;p<e;p++){let l=i[p],h,u,c=-1,v=0;for(;v<l.length&&(a.lastIndex=v,u=a.exec(l),u!==null);)v=a.lastIndex,a===E?u[1]==="!--"?a=de:u[1]!==void 0?a=le:u[2]!==void 0?(ve.test(u[2])&&(o=RegExp("</"+u[2],"g")),a=y):u[3]!==void 0&&(a=y):a===y?u[0]===">"?(a=o??E,c=-1):u[1]===void 0?c=-2:(c=a.lastIndex-u[2].length,h=u[1],a=u[3]===void 0?y:u[3]==='"'?pe:ce):a===pe||a===ce?a=y:a===de||a===le?a=E:(a=y,o=void 0);let b=a===y&&i[p+1].startsWith("/>")?" ":"";r+=a===E?l+Te:c>=0?(s.push(h),l.slice(0,c)+ue+l.slice(c)+$+b):l+$+(c===-2?p:b)}return[ge(i,r+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},N=class i{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let r=0,a=0,p=t.length-1,l=this.parts,[h,u]=Me(t,e);if(this.el=i.createElement(h,s),x.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(o=x.nextNode())!==null&&l.length<p;){if(o.nodeType===1){if(o.hasAttributes())for(let c of o.getAttributeNames())if(c.endsWith(ue)){let v=u[a++],b=o.getAttribute(c).split($),U=/([.?@])?(.*)/.exec(v);l.push({type:1,index:r,name:U[2],strings:b,ctor:U[1]==="."?K:U[1]==="?"?J:U[1]==="@"?Q:A}),o.removeAttribute(c)}else c.startsWith($)&&(l.push({type:6,index:r}),o.removeAttribute(c));if(ve.test(o.tagName)){let c=o.textContent.split($),v=c.length-1;if(v>0){o.textContent=I?I.emptyScript:"";for(let b=0;b<v;b++)o.append(c[b],P()),x.nextNode(),l.push({type:2,index:++r});o.append(c[v],P())}}}else if(o.nodeType===8)if(o.data===me)l.push({type:2,index:r});else{let c=-1;for(;(c=o.data.indexOf($,c+1))!==-1;)l.push({type:7,index:r}),c+=$.length-1}r++}}static createElement(t,e){let s=_.createElement("template");return s.innerHTML=t,s}};function S(i,t,e=i,s){if(t===w)return t;let o=s!==void 0?e._$Co?.[s]:e._$Cl,r=R(t)?void 0:t._$litDirective$;return o?.constructor!==r&&(o?._$AO?.(!1),r===void 0?o=void 0:(o=new r(i),o._$AT(i,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=S(i,o._$AS(i,t.values),o,s)),t}var q=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??_).importNode(e,!0);x.currentNode=o;let r=x.nextNode(),a=0,p=0,l=s[0];for(;l!==void 0;){if(a===l.index){let h;l.type===2?h=new B(r,r.nextSibling,this,t):l.type===1?h=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(h=new Z(r,this,t)),this._$AV.push(h),l=s[++p]}a!==l?.index&&(r=x.nextNode(),a++)}return x.currentNode=_,o}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},B=class i{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),R(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ee(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(_.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=N.createElement(ge(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{let r=new q(o,this),a=r.u(this.options);r.p(e),this.T(a),this._$AH=r}}_$AC(t){let e=he.get(t.strings);return e===void 0&&he.set(t.strings,e=new N(t)),e}k(t){G(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,o=0;for(let r of t)o===e.length?e.push(s=new i(this.O(P()),this.O(P()),this,this.options)):s=e[o],s._$AI(r),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=ae(t).nextSibling;ae(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},A=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,r){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,o){let r=this.strings,a=!1;if(r===void 0)t=S(this,t,e,0),a=!R(t)||t!==this._$AH&&t!==w,a&&(this._$AH=t);else{let p=t,l,h;for(t=r[0],l=0;l<r.length-1;l++)h=S(this,p[s+l],e,l),h===w&&(h=this._$AH[l]),a||(a=!R(h)||h!==this._$AH[l]),h===d?t=d:t!==d&&(t+=(h??"")+r[l+1]),this._$AH[l]=h}a&&!o&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},K=class extends A{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},J=class extends A{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},Q=class extends A{constructor(t,e,s,o,r){super(t,e,s,o,r),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??d)===w)return;let s=this._$AH,o=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==d&&(s===d||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Z=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Pe=M.litHtmlPolyfillSupport;Pe?.(N,B),(M.litHtmlVersions??(M.litHtmlVersions=[])).push("3.3.2");var be=(i,t,e)=>{let s=e?.renderBefore??t,o=s._$litPart$;if(o===void 0){let r=e?.renderBefore??null;s._$litPart$=o=new B(t.insertBefore(P(),r),r,void 0,e??{})}return o._$AI(i),o};var z=globalThis,m=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=be(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};m._$litElement$=!0,m.finalized=!0,z.litElementHydrateSupport?.({LitElement:m});var Re=z.litElementPolyfillSupport;Re?.({LitElement:m});(z.litElementVersions??(z.litElementVersions=[])).push("4.2.2");var Y;function Ne(){return Y||(Y=acquireVsCodeApi()),Y}function fe(){let i=document.getElementById("adoext-data");if(!i?.textContent)throw new Error("Missing ADOExt webview data.");return JSON.parse(i.textContent)}function $e(i){Ne().postMessage(i)}var O=class extends m{constructor(){super(...arguments);this.builds=[];this.emptyLabel="No builds found."}render(){return this.builds.length===0?n`<p class="empty">${this.emptyLabel}</p>`:n`${this.builds.map(e=>this.renderBuild(e))}`}renderBuild(e){let s=[e.definitionName,e.requestedFor,e.startTime].filter(Boolean),o=this.statusClass(e.statusKind);return n`<div class="build-item">
            <span class="build-status ${o}">${e.statusLabel}</span>
            <span class="build-name" title=${e.buildNumber}>${e.buildNumber}</span>
            ${s.length>0?n`<span class="build-meta" title=${s.join(" - ")}>${s.join(" - ")}</span>`:d}
            ${e.id>0?n`<button type="button" @click=${()=>this.openBuild(e.id)}>Open</button>`:d}
        </div>`}statusClass(e){switch(e){case"succeeded":return"build-status-succeeded";case"failed":return"build-status-failed";case"inprogress":return"build-status-inprogress";default:return"build-status-other"}}openBuild(e){this.dispatchEvent(new CustomEvent("adoext-open-build",{bubbles:!0,composed:!0,detail:{buildId:e}}))}};O.properties={builds:{attribute:"builds-json",converter:{fromAttribute(e){if(!e)return[];try{let s=JSON.parse(e);return Array.isArray(s)?s:[]}catch{return[]}}}},emptyLabel:{attribute:"empty-label"}},O.styles=k`
        :host {
            display: block;
        }

        .empty {
            color: var(--vscode-descriptionForeground);
            font-style: italic;
        }

        .build-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 6px 10px;
            border: 1px solid var(--vscode-panel-border);
            border-radius: 4px;
            margin-bottom: 6px;
        }

        .build-status {
            font-size: 0.8em;
            font-weight: 600;
            padding: 2px 7px;
            border-radius: 10px;
            white-space: nowrap;
        }

        .build-status-succeeded {
            background: var(--vscode-charts-green);
            color: #fff;
        }

        .build-status-failed {
            background: var(--vscode-charts-red);
            color: #fff;
        }

        .build-status-inprogress {
            background: var(--vscode-charts-blue);
            color: #fff;
        }

        .build-status-other {
            background: var(--vscode-badge-background);
            color: var(--vscode-badge-foreground);
        }

        .build-name {
            flex: 1;
            min-width: 120px;
            font-size: 0.9em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .build-meta {
            font-size: 0.8em;
            color: var(--vscode-descriptionForeground);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        button {
            padding: 4px 10px;
            border-radius: 3px;
            border: 1px solid var(--vscode-button-border, transparent);
            cursor: pointer;
            font-family: var(--vscode-font-family);
            font-size: 0.85em;
            background: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
        }

        button:hover {
            background: var(--vscode-button-secondaryHoverBackground);
        }

        @media (max-width: 520px) {
            .build-item {
                align-items: flex-start;
                flex-direction: column;
                gap: 6px;
            }

            .build-name,
            .build-meta {
                min-width: 0;
                max-width: 100%;
                white-space: normal;
            }
        }
    `;customElements.define("ado-build-list",O);var H=class extends m{constructor(){super(...arguments);this.data=fe();this._modalMode=null;this._mergeStrategy=1;this._deleteSourceBranch=!0;this._transitionWorkItems=!0;this._mergeCommitMessage="";this.openCompleteModal=()=>{this._mergeCommitMessage=`Merged PR ${this.data.prId}: ${this.data.title}`,this._modalMode="complete"};this.openAutoCompleteModal=()=>{this._mergeCommitMessage=`Merged PR ${this.data.prId}: ${this.data.title}`,this._modalMode="autoComplete"};this.closeModal=()=>{this._modalMode=null};this.onOverlayClick=()=>{this.closeModal()};this.onMergeStrategyChange=e=>{this._mergeStrategy=Number(e.target.value)};this.onCommitMsgInput=e=>{this._mergeCommitMessage=e.target.value};this.onDeleteBranchChange=e=>{this._deleteSourceBranch=e.target.checked};this.onTransitionWiChange=e=>{this._transitionWorkItems=e.target.checked};this.confirmModal=()=>{let e={mergeStrategy:this._mergeStrategy,deleteSourceBranch:this._deleteSourceBranch,transitionWorkItems:this._transitionWorkItems,mergeCommitMessage:this._mergeCommitMessage};this._modalMode==="complete"?this.send({type:"completePr",...e}):this._modalMode==="autoComplete"&&this.send({type:"setAutoComplete",...e}),this._modalMode=null};this.toggleResolvedThreads=()=>{this.data={...this.data,showResolvedThreads:!this.data.showResolvedThreads},this.send({type:"setShowResolvedThreads",showResolved:this.data.showResolvedThreads})};this.addComment=()=>{let e=this.renderRoot.querySelector("#new-comment"),s=e?.value.trim();s&&(this.send({type:"addComment",content:s}),e&&(e.value=""))};this.onOpenBuild=e=>{let s=Number(e.detail?.buildId);Number.isFinite(s)&&s>0&&this.send({type:"openBuild",buildId:s})};this.openTestRun=e=>{Number.isFinite(e)&&e>0&&this.send({type:"openTestRun",runId:e})};this.copyFailureSummary=e=>{let s=e.failures??[];if(e.failedTests===0)return;let o=s.length>0?[`Test failures (${s.length}${s.length<e.failedTests?` of ${e.failedTests}`:""})`,...s.map(r=>{let a=[r.buildLabel,r.runName].filter(Boolean).join(" \xB7 "),p=r.errorMessageSnippet?`
  ${r.errorMessageSnippet.split(`
`)[0]}`:"";return`- ${r.testName}${a?` (${a})`:""}${p}`})]:[`Test failures (${e.failedTests})`,...e.runs.filter(r=>r.failedTests>0).map(r=>`- ${r.runName}: ${r.failedTests} failing test${r.failedTests===1?"":"s"}${r.buildLabel?` (${r.buildLabel})`:""}`)];this.send({type:"copyText",text:o.join(`
`)})}}render(){return n`<main class="shell">
            <div class="toolbar">
                <button class="btn-primary" @click=${()=>this.send({type:"openDiff"})}>View Diff</button>
                <div class="review-actions" role="group" aria-label="Review actions">
                    ${this.data.reviewActions.map(e=>n`<button class="btn-secondary" @click=${()=>this.send({type:"setVote",vote:e.vote})}>${e.label}</button>`)}
                </div>
                ${this.renderCompletionButtons()}
                <button class="btn-secondary" @click=${()=>this.send({type:"openInBrowser"})}>Open in Browser</button>
            </div>
            <h1>PR #${this.data.prId}: ${this.data.title}${this.data.isDraft?n`<span class="badge draft">Draft</span>`:d}</h1>
            <div class="meta"><strong>${this.data.author}</strong> opened on ${this.data.createdDate} · <code>${this.data.sourceBranch}</code> -> <code>${this.data.targetBranch}</code></div>
            <section class="section"><h2>Description</h2><pre class="description">${this.data.description}</pre></section>
            ${this.data.reviewers.length>0?n`<section class="section"><h2>Reviewers</h2><ul class="reviewers">${this.data.reviewers.map(e=>n`<li><span class="vote ${e.voteClass}">${e.voteLabel}</span>${e.displayName}</li>`)}</ul></section>`:d}
            ${this.renderRows("Branch Status",this.data.branchStatuses)}
            ${this.renderRows("Build & Policy Status",this.data.checks)}
            ${this.renderTestResults(this.data.testResults)}
            <section class="section"><h2>Builds</h2><ado-build-list .builds=${this.data.builds} empty-label="No builds found." @adoext-open-build=${this.onOpenBuild}></ado-build-list></section>
            <section class="section"><h2>Comment Threads</h2>${this.renderThreads()}</section>
            <section class="section"><h2>Add Comment</h2><div class="new-comment-form"><textarea id="new-comment" rows="3" placeholder="Write a comment..."></textarea><div><button class="btn-primary" @click=${this.addComment}>Add Comment</button></div></div></section>
            ${this._modalMode?this.renderModal():d}
        </main>`}renderTestResults(e){if(!e)return n`
                <section class="section">
                    <h2>Test Results</h2>
                    <p class="empty">No test results found.</p>
                </section>
            `;let s=e.failures??[],o=e.runs??[],r=o.some(a=>a.statusClass==="check-pending");return n`
            <section class="section">
                <h2>Test Results</h2>
                <div class="test-summary">
                    <span>Total: ${e.totalTests}</span>
                    <span>Passed: ${e.passedTests}</span>
                    <span>Failed: ${e.failedTests}</span>
                    <span>Skipped: ${e.skippedTests}</span>
                    ${e.durationLabel?n`<span>Duration: ${e.durationLabel}</span>`:d}
                </div>
                <div class="toolbar">
                    ${e.failedTests>0?n`<button class="btn-secondary" @click=${()=>this.copyFailureSummary(e)}>Copy Failure Summary</button>`:d}
                </div>
                ${o.length===0?n`<p class="empty">No test runs found.</p>`:n`
                        <ul class="test-run-list">
                            ${o.map(a=>n`
                                <li class="test-run">
                                    <span class="check-state ${a.statusClass} test-run-status">${a.statusLabel}</span>
                                    <span class="test-run-name">${a.runName}</span>
                                    <span class="test-counts">${a.passedTests}P / ${a.failedTests}F / ${a.skippedTests}S · ${a.totalTests} total${a.durationLabel?n` · ${a.durationLabel}`:d}</span>
                                    <button class="btn-secondary" @click=${()=>this.openTestRun(a.runId)}>Open Run</button>
                                    ${a.buildId?n`<button class="btn-secondary" @click=${()=>this.send({type:"openBuild",buildId:a.buildId})}>Open Build</button>`:d}
                                </li>
                            `)}
                        </ul>
                    `}
                ${e.failureDetailsNotice?n`<p class="test-note">${e.failureDetailsNotice}</p>`:d}
                ${e.failedTests===0?n`<p class="empty">${r?"No failing tests reported yet.":"No failing tests."}</p>`:s.length===0?n`<p class="empty">Failing tests were detected, but detailed failure records were unavailable.</p>`:n`
                        <h3>Failed Tests</h3>
                        <ul class="test-failure-list">
                            ${s.map(a=>n`
                                <li>
                                    <details class="test-failure">
                                        <summary>
                                            <span class="test-failure-name">${a.testName}</span>
                                            <span class="test-failure-meta">${a.buildLabel?`${a.buildLabel} \xB7 `:""}${a.runName}</span>
                                        </summary>
                                        <div class="test-failure-body">
                                            ${a.errorMessageSnippet?n`<h3>Error</h3><pre>${a.errorMessageSnippet}</pre>`:n`<p class="empty">No error message provided.</p>`}
                                            ${a.stackTraceSnippet?n`<h3>Stack Trace</h3><pre>${a.stackTraceSnippet}</pre>`:d}
                                            <div class="toolbar">
                                                <button class="btn-secondary" @click=${()=>this.openTestRun(a.runId)}>Open Run</button>
                                                ${a.buildId?n`<button class="btn-secondary" @click=${()=>this.send({type:"openBuild",buildId:a.buildId})}>Open Build</button>`:d}
                                            </div>
                                        </div>
                                    </details>
                                </li>
                            `)}
                        </ul>
                    `}
            </section>
        `}renderRows(e,s){return s.length===0?d:n`<section class="section"><h2>${e}</h2><ul class="checks-list">${s.map(o=>n`<li><span class="check-state ${o.badge.className}">${o.badge.label}</span><span class="check-name">${o.name}</span>${o.description?n`<span class="check-desc">${o.description}</span>`:d}</li>`)}</ul></section>`}renderThreads(){let e=this.data.threads.filter(o=>o.isResolved).length,s=this.data.showResolvedThreads?this.data.threads:this.data.threads.filter(o=>!o.isResolved);return n`
            <div class="toolbar">
                <button class="btn-secondary" @click=${this.toggleResolvedThreads}>
                    ${this.data.showResolvedThreads?"Hide resolved threads":`Show resolved threads (${e})`}
                </button>
            </div>
            ${s.length===0?n`<p class="empty">No comment threads.</p>`:n`${s.map(o=>this.renderThread(o))}`}
        `}renderThread(e){return n`<article class="thread ${e.isResolved?"resolved":""} ${e.isToolThread?"tool-thread":""}">
            <div class="thread-header">
                <div class="thread-meta">
                    <span class="thread-status">${e.statusLabel}</span>
                    ${e.isToolThread?n`<span class="bot-badge">Bot</span>`:d}
                </div>
                <button class="btn-secondary" @click=${()=>this.setThreadStatus(e)}>${e.isResolved?"Reopen":"Resolve"}</button>
            </div>
            ${e.comments.map(s=>this.renderComment(s))}
            ${this.renderReplySection(e)}
        </article>`}renderComment(e){return n`<div class="comment ${e.isTool?"tool":""}">
            <div class="comment-author">
                ${e.author}
                ${e.isTool?n`<span class="bot-badge">Bot</span>`:d}
            </div>
            <div class="comment-content">${e.content}</div>
        </div>`}renderReplySection(e){let s=n`<div class="reply-form">
            <textarea id="reply-${e.id}" rows="2" placeholder="Reply..."></textarea>
            <button class="btn-primary" @click=${()=>this.reply(e.id)}>Reply</button>
        </div>`;return e.isToolThread?n`<details class="reply-disclosure"><summary>Reply (expand)</summary>${s}</details>`:s}renderCompletionButtons(){return this.data.canComplete?this.data.autoCompleteSetBy?n`
                <button class="btn-secondary" @click=${()=>this.send({type:"cancelAutoComplete"})}>Cancel Auto-Complete</button>
            `:n`
            <button class="btn-primary" @click=${this.openCompleteModal} ?disabled=${this.data.hasConflicts||this.data.isDraft}>Complete</button>
            <button class="btn-secondary" @click=${this.openAutoCompleteModal} ?disabled=${this.data.isDraft}>Set Auto-Complete</button>
        `:d}renderModal(){let e=this._modalMode==="complete",s=e?"Complete Pull Request":"Set Auto-Complete",o=e?"Complete Merge":"Set Auto-Complete";return n`
            <div class="modal-overlay" @click=${this.onOverlayClick}>
                <div class="modal" @click=${r=>r.stopPropagation()}>
                    <h2>${s}</h2>
                    <div class="modal-field">
                        <label>Merge Type</label>
                        <select @change=${this.onMergeStrategyChange}>
                            <option value="1" ?selected=${this._mergeStrategy===1}>Merge (no fast-forward)</option>
                            <option value="2" ?selected=${this._mergeStrategy===2}>Squash commit</option>
                            <option value="3" ?selected=${this._mergeStrategy===3}>Rebase and fast-forward</option>
                            <option value="4" ?selected=${this._mergeStrategy===4}>Semi-linear merge (rebase + merge commit)</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label>Commit Message</label>
                        <textarea rows="3" .value=${this._mergeCommitMessage} @input=${this.onCommitMsgInput}></textarea>
                    </div>
                    <label class="modal-check">
                        <input type="checkbox" .checked=${this._deleteSourceBranch} @change=${this.onDeleteBranchChange}>
                        Delete source branch after merge
                    </label>
                    <label class="modal-check">
                        <input type="checkbox" .checked=${this._transitionWorkItems} @change=${this.onTransitionWiChange}>
                        Complete associated work items
                    </label>
                    ${this.data.associatedWorkItems.length>0?n`
                        <ul class="modal-wi-list">
                            ${this.data.associatedWorkItems.map(r=>n`<li>#${r.id}: ${r.title}</li>`)}
                        </ul>
                    `:d}
                    <div class="modal-actions">
                        <button class="btn-secondary" @click=${this.closeModal}>Cancel</button>
                        <button class="${"btn-primary"}" @click=${this.confirmModal}>${o}</button>
                    </div>
                </div>
            </div>
        `}reply(e){let s=this.renderRoot.querySelector(`#reply-${e}`),o=s?.value.trim();o&&(this.send({type:"reply",threadId:e,content:o}),s&&(s.value=""))}setThreadStatus(e){this.send({type:"setStatus",threadId:e.id,status:e.isResolved?1:2})}send(e){$e(e)}};H.properties={data:{state:!0},_modalMode:{state:!0},_mergeStrategy:{state:!0},_deleteSourceBranch:{state:!0},_transitionWorkItems:{state:!0},_mergeCommitMessage:{state:!0}},H.styles=k`
        :host {
            display: block;
            --tool-thread-textarea-min-height: 28px;
            --tool-thread-textarea-font-size: 0.9em;
        }
        * { box-sizing: border-box; }
        .shell { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editor-background); padding: 16px; min-height: 100vh; }
        h1 { font-size: 1.3em; margin: 0 0 4px; line-height: 1.35; }
        .meta { color: var(--vscode-descriptionForeground); font-size: 0.9em; margin-bottom: 12px; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 0.8em; margin-left: 6px; }
        .draft { background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); }
        .section { margin-bottom: 20px; }
        .section h2 { font-size: 1em; border-bottom: 1px solid var(--vscode-panel-border); padding-bottom: 4px; margin-bottom: 8px; }
        .toolbar { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; align-items: center; }
        .review-actions { display: flex; gap: 8px; align-items: center; }
        button { padding: 4px 10px; border-radius: 3px; border: 1px solid var(--vscode-button-border, transparent); cursor: pointer; font-family: inherit; font-size: 0.85em; }
        .btn-primary { background: var(--vscode-button-background); color: var(--vscode-button-foreground); }
        .btn-primary:hover { background: var(--vscode-button-hoverBackground); }
        .btn-secondary { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); }
        .btn-secondary:hover { background: var(--vscode-button-secondaryHoverBackground); }
        .reviewers, .checks-list { list-style: none; padding: 0; margin: 0; }
        .reviewers li { margin: 4px 0; display: flex; gap: 8px; align-items: center; }
        .vote { min-width: 112px; padding: 2px 6px; border-radius: 3px; font-size: 0.8em; text-align: center; border: 1px solid var(--vscode-panel-border); color: var(--vscode-descriptionForeground); }
        .vote-positive { color: var(--vscode-charts-green); border-color: var(--vscode-charts-green); }
        .vote-waiting { color: var(--vscode-charts-yellow); border-color: var(--vscode-charts-yellow); }
        .vote-negative { color: var(--vscode-charts-red); border-color: var(--vscode-charts-red); }
        .checks-list li { display: flex; align-items: center; gap: 8px; padding: 4px 0; border-bottom: 1px solid var(--vscode-panel-border); }
        .checks-list li:last-child { border-bottom: none; }
        .check-state { font-size: 0.8em; min-width: 80px; padding: 2px 6px; border-radius: 3px; text-align: center; border: 1px solid; }
        .check-success { color: var(--vscode-charts-green); border-color: var(--vscode-charts-green); }
        .check-failure { color: var(--vscode-charts-red); border-color: var(--vscode-charts-red); }
        .check-pending { color: var(--vscode-charts-yellow); border-color: var(--vscode-charts-yellow); }
        .check-neutral { color: var(--vscode-descriptionForeground); border-color: var(--vscode-panel-border); }
        .check-name { flex: 1; min-width: 120px; }
        .check-desc { color: var(--vscode-descriptionForeground); font-size: 0.85em; }
        .thread { border: 1px solid var(--vscode-panel-border); border-radius: 4px; margin-bottom: 10px; }
        .thread-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 6px 10px; background: var(--vscode-sideBarSectionHeader-background); border-radius: 4px 4px 0 0; }
        .thread-status { font-size: 0.8em; color: var(--vscode-descriptionForeground); }
        .thread-meta { display: flex; align-items: center; gap: 8px; }
        .resolved .thread-header { opacity: 0.7; }
        .tool-thread { border-style: dashed; opacity: 0.9; }
        .comment { padding: 8px 10px; border-bottom: 1px solid var(--vscode-panel-border); }
        .comment.tool { border-left: 3px solid var(--vscode-descriptionForeground); }
        .comment:last-child { border-bottom: none; }
        .comment-author { font-weight: bold; font-size: 0.85em; margin-bottom: 2px; display: flex; align-items: center; gap: 6px; }
        .bot-badge { display: inline-flex; align-items: center; border: 1px solid var(--vscode-panel-border); border-radius: 999px; padding: 0 6px; font-size: 0.75em; font-weight: normal; color: var(--vscode-descriptionForeground); }
        .comment-content, .description { white-space: pre-wrap; word-break: break-word; }
        .description { font-family: var(--vscode-editor-font-family); }
        .reply-form, .new-comment-form { padding: 8px 10px; display: flex; gap: 6px; }
        .reply-disclosure { padding: 8px 10px; }
        .reply-disclosure > summary { cursor: pointer; color: var(--vscode-descriptionForeground); font-size: 0.85em; }
        .reply-disclosure > .reply-form { padding: 8px 0 0; }
        .new-comment-form { padding: 0; flex-direction: column; }
        textarea { flex: 1; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); border-radius: 3px; padding: 4px 6px; font-family: inherit; font-size: inherit; resize: vertical; min-height: 32px; }
        .tool-thread textarea { min-height: var(--tool-thread-textarea-min-height); font-size: var(--tool-thread-textarea-font-size); }
        .empty { color: var(--vscode-descriptionForeground); font-style: italic; }
        .test-summary { display: flex; gap: 10px; flex-wrap: wrap; font-size: 0.85em; color: var(--vscode-descriptionForeground); margin-bottom: 8px; }
        .test-run-list, .test-failure-list { list-style: none; padding: 0; margin: 0; }
        .test-run { display: flex; gap: 8px; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--vscode-panel-border); }
        .test-run:last-child { border-bottom: none; }
        .test-run-status { min-width: 88px; }
        .test-run-name { flex: 1; min-width: 140px; }
        .test-counts { font-size: 0.85em; color: var(--vscode-descriptionForeground); white-space: nowrap; }
        .test-note { color: var(--vscode-descriptionForeground); font-size: 0.85em; margin: 0 0 8px; }
        .test-failure { border: 1px solid var(--vscode-panel-border); border-radius: 4px; margin-bottom: 8px; }
        .test-failure > summary { cursor: pointer; padding: 6px 10px; background: var(--vscode-sideBarSectionHeader-background); border-radius: 4px; display: flex; gap: 10px; align-items: center; }
        .test-failure-name { flex: 1; font-weight: 600; }
        .test-failure-meta { font-size: 0.85em; color: var(--vscode-descriptionForeground); }
        .test-failure-body { padding: 8px 10px; }
        .test-failure-body h3 { margin: 10px 0 6px; font-size: 0.9em; }
        .test-failure-body pre { margin: 0; white-space: pre-wrap; word-break: break-word; font-family: var(--vscode-editor-font-family); font-size: 0.85em; padding: 8px; border: 1px solid var(--vscode-panel-border); border-radius: 4px; background: var(--vscode-textBlockQuote-background, rgba(127,127,127,0.08)); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal { background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 6px; padding: 20px; width: min(480px, 90vw); max-height: 80vh; overflow-y: auto; box-shadow: 0 4px 24px rgba(0,0,0,0.3); }
        .modal h2 { margin: 0 0 16px; font-size: 1.1em; }
        .modal-field { margin-bottom: 12px; }
        .modal-field label { display: block; font-size: 0.85em; margin-bottom: 4px; color: var(--vscode-descriptionForeground); }
        .modal-field select, .modal-field textarea { width: 100%; background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); border-radius: 3px; padding: 6px 8px; font-family: inherit; font-size: inherit; }
        .modal-field textarea { resize: vertical; min-height: 60px; }
        .modal-check { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 0.9em; }
        .modal-check input[type="checkbox"] { margin: 0; }
        .modal-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
        .modal-wi-list { font-size: 0.85em; color: var(--vscode-descriptionForeground); margin: 4px 0 0 24px; list-style: disc; }
        .btn-danger { background: var(--vscode-inputValidation-errorBackground, #5a1d1d); color: var(--vscode-inputValidation-errorForeground, #f48771); border: 1px solid var(--vscode-inputValidation-errorBorder, #be1100); }
        .btn-danger:hover { opacity: 0.9; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
        @media (max-width: 620px) { .reply-form { flex-direction: column; } .checks-list li { align-items: flex-start; flex-direction: column; } }
    `;customElements.define("ado-pr-details-app",H);})();

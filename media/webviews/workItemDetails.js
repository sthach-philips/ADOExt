"use strict";(()=>{var R=globalThis,D=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,W=Symbol(),st=new WeakMap,E=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==W)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(D&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=st.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&st.set(e,t))}return t}toString(){return this.cssText}},it=r=>new E(typeof r=="string"?r:r+"",void 0,W),k=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new E(e,r,W)},rt=(r,t)=>{if(D)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=R.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},j=D?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return it(e)})(r):r;var{is:_t,defineProperty:At,getOwnPropertyDescriptor:wt,getOwnPropertyNames:St,getOwnPropertySymbols:Et,getPrototypeOf:kt}=Object,v=globalThis,ot=v.trustedTypes,Ct=ot?ot.emptyScript:"",Tt=v.reactiveElementPolyfillSupport,C=(r,t)=>r,F={toAttribute(r,t){switch(t){case Boolean:r=r?Ct:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},at=(r,t)=>!_t(r,t),nt={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:at};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),v.litPropertyMetadata??(v.litPropertyMetadata=new WeakMap);var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&At(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=wt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let l=i?.call(this);o?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??nt}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=kt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,s=[...St(e),...Et(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(j(i))}else t!==void 0&&e.push(j(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return rt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:F).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:F;this._$Em=i;let l=n.fromAttribute(e,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??(s=n.getPropertyOptions(t)),!((s.hasChanged??at)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[C("elementProperties")]=new Map,g[C("finalized")]=new Map,Tt?.({ReactiveElement:g}),(v.reactiveElementVersions??(v.reactiveElementVersions=[])).push("2.1.2");var P=globalThis,dt=r=>r,z=P.trustedTypes,lt=z?z.createPolicy("lit-html",{createHTML:r=>r}):void 0,ft="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,gt="?"+$,Pt=`<${gt}>`,_=document,N=()=>_.createComment(""),M=r=>r===null||typeof r!="object"&&typeof r!="function",Z=Array.isArray,Nt=r=>Z(r)||typeof r?.[Symbol.iterator]=="function",q=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ct=/-->/g,ht=/>/g,y=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),pt=/'/g,ut=/"/g,bt=/^(?:script|style|textarea|title)$/i,Y=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),h=Y(1),qt=Y(2),Kt=Y(3),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),mt=new WeakMap,x=_.createTreeWalker(_,129);function vt(r,t){if(!Z(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return lt!==void 0?lt.createHTML(t):t}var Mt=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=T;for(let l=0;l<e;l++){let a=r[l],p,u,c=-1,f=0;for(;f<a.length&&(n.lastIndex=f,u=n.exec(a),u!==null);)f=n.lastIndex,n===T?u[1]==="!--"?n=ct:u[1]!==void 0?n=ht:u[2]!==void 0?(bt.test(u[2])&&(i=RegExp("</"+u[2],"g")),n=y):u[3]!==void 0&&(n=y):n===y?u[0]===">"?(n=i??T,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,p=u[1],n=u[3]===void 0?y:u[3]==='"'?ut:pt):n===ut||n===pt?n=y:n===ct||n===ht?n=T:(n=y,i=void 0);let b=n===y&&r[l+1].startsWith("/>")?" ":"";o+=n===T?a+Pt:c>=0?(s.push(p),a.slice(0,c)+ft+a.slice(c)+$+b):a+$+(c===-2?l:b)}return[vt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},L=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[p,u]=Mt(t,e);if(this.el=r.createElement(p,s),x.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=x.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(ft)){let f=u[n++],b=i.getAttribute(c).split($),B=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:B[2],strings:b,ctor:B[1]==="."?J:B[1]==="?"?G:B[1]==="@"?Q:S}),i.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:o}),i.removeAttribute(c));if(bt.test(i.tagName)){let c=i.textContent.split($),f=c.length-1;if(f>0){i.textContent=z?z.emptyScript:"";for(let b=0;b<f;b++)i.append(c[b],N()),x.nextNode(),a.push({type:2,index:++o});i.append(c[f],N())}}}else if(i.nodeType===8)if(i.data===gt)a.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf($,c+1))!==-1;)a.push({type:7,index:o}),c+=$.length-1}o++}}static createElement(t,e){let s=_.createElement("template");return s.innerHTML=t,s}};function w(r,t,e=r,s){if(t===A)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=M(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=w(r,i._$AS(r,t.values),i,s)),t}var K=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??_).importNode(e,!0);x.currentNode=i;let o=x.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let p;a.type===2?p=new O(o,o.nextSibling,this,t):a.type===1?p=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(p=new X(o,this,t)),this._$AV.push(p),a=s[++l]}n!==a?.index&&(o=x.nextNode(),n++)}return x.currentNode=_,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},O=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),M(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&M(this._$AH)?this._$AA.nextSibling.data=t:this.T(_.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=L.createElement(vt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new K(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=mt.get(t.strings);return e===void 0&&mt.set(t.strings,e=new L(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(N()),this.O(N()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=dt(t).nextSibling;dt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=w(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==A,n&&(this._$AH=t);else{let l=t,a,p;for(t=o[0],a=0;a<o.length-1;a++)p=w(this,l[s+a],e,a),p===A&&(p=this._$AH[a]),n||(n=!M(p)||p!==this._$AH[a]),p===d?t=d:t!==d&&(t+=(p??"")+o[a+1]),this._$AH[a]=p}n&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends S{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}},G=class extends S{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}},Q=class extends S{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=w(this,t,e,0)??d)===A)return;let s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},X=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}};var Lt=P.litHtmlPolyfillSupport;Lt?.(L,O),(P.litHtmlVersions??(P.litHtmlVersions=[])).push("3.3.2");var $t=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new O(t.insertBefore(N(),o),o,void 0,e??{})}return i._$AI(r),i};var U=globalThis,m=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=$t(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return A}};m._$litElement$=!0,m.finalized=!0,U.litElementHydrateSupport?.({LitElement:m});var Ot=U.litElementPolyfillSupport;Ot?.({LitElement:m});(U.litElementVersions??(U.litElementVersions=[])).push("4.2.2");var tt;function Ut(){return tt||(tt=acquireVsCodeApi()),tt}function yt(){let r=document.getElementById("adoext-data");if(!r?.textContent)throw new Error("Missing ADOExt webview data.");return JSON.parse(r.textContent)}function xt(r){Ut().postMessage(r)}var H=class extends m{constructor(){super(...arguments);this.builds=[];this.emptyLabel="No builds found."}render(){return this.builds.length===0?h`<p class="empty">${this.emptyLabel}</p>`:h`${this.builds.map(e=>this.renderBuild(e))}`}renderBuild(e){let s=[e.definitionName,e.requestedFor,e.startTime].filter(Boolean),i=this.statusClass(e.statusKind);return h`<div class="build-item">
            <span class="build-status ${i}">${e.statusLabel}</span>
            <span class="build-name" title=${e.buildNumber}>${e.buildNumber}</span>
            ${s.length>0?h`<span class="build-meta" title=${s.join(" - ")}>${s.join(" - ")}</span>`:d}
            ${e.id>0?h`<button type="button" @click=${()=>this.openBuild(e.id)}>Open</button>`:d}
        </div>`}statusClass(e){switch(e){case"succeeded":return"build-status-succeeded";case"failed":return"build-status-failed";case"inprogress":return"build-status-inprogress";default:return"build-status-other"}}openBuild(e){this.dispatchEvent(new CustomEvent("adoext-open-build",{bubbles:!0,composed:!0,detail:{buildId:e}}))}};H.properties={builds:{attribute:"builds-json",converter:{fromAttribute(e){if(!e)return[];try{let s=JSON.parse(e);return Array.isArray(s)?s:[]}catch{return[]}}}},emptyLabel:{attribute:"empty-label"}},H.styles=k`
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
    `;customElements.define("ado-build-list",H);var V=class extends m{constructor(){super(...arguments);this.htmlText="";this.plainText=!1;this.emptyLabel=""}createRenderRoot(){return this}render(){return!this.htmlText&&this.emptyLabel?h`<em class="empty">${this.emptyLabel}</em>`:d}updated(){if(this.replaceChildren(),!this.htmlText){if(this.emptyLabel){let e=document.createElement("em");e.className="empty",e.textContent=this.emptyLabel,this.appendChild(e)}return}if(this.plainText){this.classList.add("plain-text"),this.textContent=this.htmlText;return}this.classList.remove("plain-text"),Rt(this.htmlText,this)}};V.properties={htmlText:{attribute:"html-text"},plainText:{type:Boolean,attribute:"plain-text"},emptyLabel:{attribute:"empty-label"}};customElements.define("ado-rich-text",V);var Ht=new Set(["p","br","div","span","b","strong","i","em","u","s","strike","sub","sup","ul","ol","li","h1","h2","h3","h4","h5","h6","a","code","pre","blockquote","table","thead","tbody","tr","td","th","img","figure","figcaption"]),It=new Set(["class"]),Bt={a:new Set(["href","title","target","rel"]),img:new Set(["src","alt","width","height"]),td:new Set(["colspan","rowspan","align"]),th:new Set(["colspan","rowspan","scope","align"]),ol:new Set(["type","start"])};function Rt(r,t){let s=new DOMParser().parseFromString(r,"text/html");for(let i of Array.from(s.body.childNodes)){let o=et(i);o&&t.appendChild(o)}}function et(r){if(r.nodeType===Node.TEXT_NODE)return document.createTextNode(r.textContent??"");if(r.nodeType!==Node.ELEMENT_NODE)return null;let t=r,e=t.tagName.toLowerCase();if(!Ht.has(e)){let i=document.createDocumentFragment();for(let o of Array.from(t.childNodes)){let n=et(o);n&&i.appendChild(n)}return i}let s=document.createElement(e);for(let i of Array.from(t.attributes)){let o=i.name.toLowerCase(),n=Bt[e];if(!It.has(o)&&!(n&&n.has(o)))continue;let l=i.value;o==="src"&&e==="img"&&(l=Dt(l)),!((o==="href"||o==="src")&&!zt(l))&&s.setAttribute(o,l)}e==="a"&&(s.setAttribute("target","_blank"),s.setAttribute("rel","noopener noreferrer"));for(let i of Array.from(t.childNodes)){let o=et(i);o&&s.appendChild(o)}return s}function Dt(r){if(!r)return"";let t=r.toLowerCase();return t.startsWith("https://")||t.startsWith("http://")||t.startsWith("data:")?r:r.startsWith("/")?`https://dev.azure.com${r}`:r}function zt(r){let t=r.trim().toLowerCase();if(t.startsWith("https://")||t.startsWith("http://")||t.startsWith("#")||t.startsWith("/"))return!0;if(t.startsWith("data:image/")){let e=t.search(/[;,]/);return(e>0?t.slice(0,e):t)!=="data:image/svg+xml"}return!1}var I=class extends m{constructor(){super(...arguments);this.data=yt();this.selectedState=this.data.state;this.onStateChanged=e=>{this.selectedState=e.target.value};this.updateState=()=>{this.selectedState&&this.send({type:"setState",state:this.selectedState})};this.addComment=()=>{let e=this.renderRoot.querySelector("#new-comment"),s=e?.value.trim();s&&(this.send({type:"addComment",content:s}),e&&(e.value=""))};this.onOpenBuild=e=>{let s=Number(e.detail?.buildId);Number.isFinite(s)&&s>0&&this.send({type:"openBuild",buildId:s})}}render(){let e=`--state-color: ${this.data.stateColor}`;return h`<main class="shell" style=${e}>
            <div class="toolbar">
                <button class="btn-secondary" @click=${()=>this.send({type:"openInBrowser"})}>Open in Browser</button>
                <button class="btn-primary" @click=${()=>this.send({type:"startWorking"})}>Start Working</button>
                <div class="state-edit"><select aria-label="Work item state" .value=${this.selectedState} @change=${this.onStateChanged}>${this.data.allowedStates.map(s=>h`<option value=${s}>${s}</option>`)}</select><button class="btn-primary" @click=${this.updateState}>Update State</button></div>
            </div>
            <h1>${this.data.workItemTypeIconUrl?h`<img class="type-icon" src=${this.data.workItemTypeIconUrl} alt="" />`:d}<span class="badge badge-type">${this.data.workItemType}</span><span class="badge badge-state">${this.data.state}</span>${this.data.priority!==void 0?h`<span class="badge priority-${this.data.priority}">P${this.data.priority}</span>`:d}#${this.data.id}: ${this.data.title}</h1>
            <section class="section"><table class="meta-table">${this.data.metaRows.map(s=>h`<tr><td class="meta-label">${s.label}</td><td>${s.value}</td></tr>`)}</table></section>
            <section class="section"><h2>Description</h2><div class="description"><ado-rich-text .htmlText=${this.data.descriptionHtml} empty-label="No description provided."></ado-rich-text></div></section>
            <section class="section"><h2>Linked Items (${this.data.linkedItems.length})</h2><div class="linked-items-list">${this.renderLinkedItems()}</div></section>
            <section class="section"><h2>Builds</h2><ado-build-list .builds=${this.data.builds} empty-label="No linked builds." @adoext-open-build=${this.onOpenBuild}></ado-build-list></section>
            <section class="section"><h2>Comments (${this.data.comments.length})</h2>${this.renderComments()}</section>
            <section class="section"><h2>Add Comment</h2><div class="new-comment-form"><textarea id="new-comment" rows="4" placeholder="Write a comment..."></textarea><div><button class="btn-primary" @click=${this.addComment}>Add Comment</button></div></div></section>
        </main>`}renderLinkedItems(){return this.data.linkedItems.length===0?h`<p class="empty">No linked branches, commits, or pull requests.</p>`:h`${this.data.linkedItems.map(e=>h`<button class="btn-secondary linked-item-btn" @click=${()=>this.openLinkedItem(e)}>${this.linkedIcon(e.type)} ${e.label}</button>`)}`}renderComments(){return this.data.comments.length===0?h`<p class="empty">No comments yet.</p>`:h`${this.data.comments.map(e=>h`<article class="comment"><div class="comment-header"><span class="comment-author">${e.author}</span><span class="comment-date">${e.date}</span></div><ado-rich-text .htmlText=${e.html} .plainText=${e.isPlainText}></ado-rich-text></article>`)}`}linkedIcon(e){switch(e){case"pr":return"PR";case"branch":return"Branch";case"commit":return"Commit"}}openLinkedItem(e){this.send({type:"openLinkedItem",url:e.webUrl})}send(e){xt(e)}};I.properties={data:{state:!0},selectedState:{state:!0}},I.styles=k`
        :host { display: block; }
        * { box-sizing: border-box; }
        .shell { font-family: var(--vscode-font-family); font-size: var(--vscode-font-size); color: var(--vscode-foreground); background: var(--vscode-editor-background); padding: 16px; min-height: 100vh; }
        h1 { font-size: 1.3em; margin: 0 0 4px; line-height: 1.35; }
        h2 { font-size: 1em; border-bottom: 1px solid var(--vscode-panel-border); padding-bottom: 4px; margin-bottom: 8px; }
        .toolbar { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; align-items: center; }
        .state-edit { display: flex; gap: 8px; align-items: center; }
        button { padding: 4px 12px; border-radius: 3px; border: 1px solid var(--vscode-button-border, transparent); cursor: pointer; font-family: inherit; font-size: 0.85em; }
        .btn-primary { background: var(--vscode-button-background); color: var(--vscode-button-foreground); }
        .btn-primary:hover { background: var(--vscode-button-hoverBackground); }
        .btn-secondary { background: var(--vscode-button-secondaryBackground); color: var(--vscode-button-secondaryForeground); }
        .btn-secondary:hover { background: var(--vscode-button-secondaryHoverBackground); }
        select { background: var(--vscode-dropdown-background); color: var(--vscode-dropdown-foreground); border: 1px solid var(--vscode-dropdown-border); border-radius: 3px; padding: 3px 22px 3px 6px; font-family: inherit; font-size: 0.85em; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 0.8em; font-weight: 600; margin-right: 6px; }
        .type-icon { width: 16px; height: 16px; vertical-align: text-bottom; margin-right: 6px; object-fit: contain; }
        .badge-type { background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); }
        .badge-state { background: color-mix(in srgb, var(--state-color) 14%, transparent); color: var(--state-color); border: 1px solid color-mix(in srgb, var(--state-color) 38%, transparent); }
        .priority-1 { background: #c84b3222; color: #c84b32; border: 1px solid #c84b3255; }
        .priority-2 { background: #e8a33522; color: #e8a335; border: 1px solid #e8a33555; }
        .priority-3 { background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); }
        .priority-4 { background: var(--vscode-badge-background); color: var(--vscode-descriptionForeground); }
        .section { margin-bottom: 20px; }
        .meta-table { border-collapse: collapse; margin-top: 8px; }
        .meta-table td { padding: 3px 12px 3px 0; vertical-align: top; }
        .meta-label { color: var(--vscode-descriptionForeground); font-size: 0.9em; white-space: nowrap; min-width: 110px; }
        .description { background: var(--vscode-textBlockQuote-background); border-left: 3px solid var(--vscode-textBlockQuote-border); padding: 10px 14px; border-radius: 0 4px 4px 0; line-height: 1.6; }
        ado-rich-text { word-break: break-word; line-height: 1.5; }
        ado-rich-text.plain-text { white-space: pre-wrap; }
        ado-rich-text p { margin: 0 0 8px; }
        ado-rich-text ul, ado-rich-text ol { padding-left: 24px; margin: 0 0 8px; }
        ado-rich-text table { border-collapse: collapse; margin-bottom: 8px; }
        ado-rich-text td, ado-rich-text th { border: 1px solid var(--vscode-panel-border); padding: 4px 8px; }
        ado-rich-text a { color: var(--vscode-textLink-foreground); }
        ado-rich-text a:hover { color: var(--vscode-textLink-activeForeground); }
        ado-rich-text img { max-width: 100%; }
        ado-rich-text pre, ado-rich-text code { background: var(--vscode-textCodeBlock-background); padding: 2px 4px; border-radius: 3px; font-family: var(--vscode-editor-font-family); }
        ado-rich-text pre { padding: 8px; overflow-x: auto; }
        .comment { border: 1px solid var(--vscode-panel-border); border-radius: 4px; margin-bottom: 10px; padding: 10px; }
        .comment-header { display: flex; justify-content: space-between; gap: 8px; margin-bottom: 6px; }
        .comment-author { font-weight: bold; font-size: 0.9em; }
        .comment-date { color: var(--vscode-descriptionForeground); font-size: 0.8em; }
        .new-comment-form { display: flex; flex-direction: column; gap: 6px; }
        textarea { background: var(--vscode-input-background); color: var(--vscode-input-foreground); border: 1px solid var(--vscode-input-border); border-radius: 3px; padding: 6px 8px; font-family: inherit; font-size: inherit; resize: vertical; min-height: 60px; width: 100%; }
        .empty { color: var(--vscode-descriptionForeground); font-style: italic; }
        .linked-items-list { display: flex; flex-wrap: wrap; gap: 6px; }
        .linked-item-btn { text-align: left; }
    `;customElements.define("ado-work-item-details-app",I);})();

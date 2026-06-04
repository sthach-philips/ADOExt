"use strict";(()=>{var O=globalThis,j=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,B=Symbol(),ee=new WeakMap,k=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==B)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(j&&e===void 0){let r=t!==void 0&&t.length===1;r&&(e=ee.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&ee.set(t,e))}return e}toString(){return this.cssText}},te=n=>new k(typeof n=="string"?n:n+"",void 0,B),E=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((r,s,i)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[i+1],n[0]);return new k(t,n,B)},re=(n,e)=>{if(j)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let r=document.createElement("style"),s=O.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=t.cssText,n.appendChild(r)}},L=j?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let r of e.cssRules)t+=r.cssText;return te(t)})(n):n;var{is:_e,defineProperty:Ae,getOwnPropertyDescriptor:Se,getOwnPropertyNames:ke,getOwnPropertySymbols:Ee,getPrototypeOf:Me}=Object,f=globalThis,se=f.trustedTypes,Pe=se?se.emptyScript:"",Ce=f.reactiveElementPolyfillSupport,M=(n,e)=>n,D={toAttribute(n,e){switch(e){case Boolean:n=n?Pe:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},ie=(n,e)=>!_e(n,e),ne={attribute:!0,type:String,converter:D,reflect:!1,useDefault:!1,hasChanged:ie};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ne){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(e,r,t);s!==void 0&&Ae(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){let{get:s,set:i}=Se(this.prototype,e)??{get(){return this[t]},set(o){this[t]=o}};return{get:s,set(o){let c=s?.call(this);i?.call(this,o),this.requestUpdate(e,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ne}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;let e=Me(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){let t=this.properties,r=[...ke(t),...Ee(t)];for(let s of r)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[r,s]of t)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[t,r]of this.elementProperties){let s=this._$Eu(t,r);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let s of r)t.unshift(L(s))}else e!==void 0&&t.push(L(e));return t}static _$Eu(e,t){let r=t.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let r of t.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return re(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,r){this._$AK(e,r)}_$ET(e,t){let r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:D).toAttribute(t,r.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,t){let r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),o=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:D;this._$Em=s;let c=o.fromAttribute(t,i.type);this[s]=c??this._$Ej?.get(s)??c,this._$Em=null}}requestUpdate(e,t,r,s=!1,i){if(e!==void 0){let o=this.constructor;if(s===!1&&(i=this[e]),r??(r=o.getPropertyOptions(e)),!((r.hasChanged??ie)(i,t)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,r))))return;this.C(e,t,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:r,reflect:s,wrapped:i},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??t??this[e]),i!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:o}=i,c=this[s];o!==!0||this._$AL.has(s)||c===void 0||this.C(s,void 0,i,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(t)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:"open"},v[M("elementProperties")]=new Map,v[M("finalized")]=new Map,Ce?.({ReactiveElement:v}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.2");var C=globalThis,oe=n=>n,R=C.trustedTypes,ae=R?R.createPolicy("lit-html",{createHTML:n=>n}):void 0,ue="$lit$",b=`lit$${Math.random().toFixed(9).slice(2)}$`,ge="?"+b,Ie=`<${ge}>`,w=document,I=()=>w.createComment(""),V=n=>n===null||typeof n!="object"&&typeof n!="function",Z=Array.isArray,Ve=n=>Z(n)||typeof n?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,le=/>/g,y=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ce=/'/g,pe=/"/g,ve=/^(?:script|style|textarea|title)$/i,Y=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),p=Y(1),qe=Y(2),Ke=Y(3),_=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),he=new WeakMap,x=w.createTreeWalker(w,129);function me(n,e){if(!Z(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ae!==void 0?ae.createHTML(e):e}var Te=(n,e)=>{let t=n.length-1,r=[],s,i=e===2?"<svg>":e===3?"<math>":"",o=P;for(let c=0;c<t;c++){let a=n[c],d,l,h=-1,g=0;for(;g<a.length&&(o.lastIndex=g,l=o.exec(a),l!==null);)g=o.lastIndex,o===P?l[1]==="!--"?o=de:l[1]!==void 0?o=le:l[2]!==void 0?(ve.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=y):l[3]!==void 0&&(o=y):o===y?l[0]===">"?(o=s??P,h=-1):l[1]===void 0?h=-2:(h=o.lastIndex-l[2].length,d=l[1],o=l[3]===void 0?y:l[3]==='"'?pe:ce):o===pe||o===ce?o=y:o===de||o===le?o=P:(o=y,s=void 0);let m=o===y&&n[c+1].startsWith("/>")?" ":"";i+=o===P?a+Ie:h>=0?(r.push(d),a.slice(0,h)+ue+a.slice(h)+b+m):a+b+(h===-2?c:m)}return[me(n,i+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},T=class n{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let i=0,o=0,c=e.length-1,a=this.parts,[d,l]=Te(e,t);if(this.el=n.createElement(d,r),x.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=x.nextNode())!==null&&a.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(ue)){let g=l[o++],m=s.getAttribute(h).split(b),H=/([.?@])?(.*)/.exec(g);a.push({type:1,index:i,name:H[2],strings:m,ctor:H[1]==="."?K:H[1]==="?"?W:H[1]==="@"?G:S}),s.removeAttribute(h)}else h.startsWith(b)&&(a.push({type:6,index:i}),s.removeAttribute(h));if(ve.test(s.tagName)){let h=s.textContent.split(b),g=h.length-1;if(g>0){s.textContent=R?R.emptyScript:"";for(let m=0;m<g;m++)s.append(h[m],I()),x.nextNode(),a.push({type:2,index:++i});s.append(h[g],I())}}}else if(s.nodeType===8)if(s.data===ge)a.push({type:2,index:i});else{let h=-1;for(;(h=s.data.indexOf(b,h+1))!==-1;)a.push({type:7,index:i}),h+=b.length-1}i++}}static createElement(e,t){let r=w.createElement("template");return r.innerHTML=e,r}};function A(n,e,t=n,r){if(e===_)return e;let s=r!==void 0?t._$Co?.[r]:t._$Cl,i=V(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(n),s._$AT(n,t,r)),r!==void 0?(t._$Co??(t._$Co=[]))[r]=s:t._$Cl=s),s!==void 0&&(e=A(n,s._$AS(n,e.values),s,r)),e}var q=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:r}=this._$AD,s=(e?.creationScope??w).importNode(t,!0);x.currentNode=s;let i=x.nextNode(),o=0,c=0,a=r[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new U(i,i.nextSibling,this,e):a.type===1?d=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(d=new J(i,this,e)),this._$AV.push(d),a=r[++c]}o!==a?.index&&(i=x.nextNode(),o++)}return x.currentNode=w,s}p(e){let t=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,t),t+=r.strings.length-2):r._$AI(e[t])),t++}},U=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,r,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=A(this,e,t),V(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==_&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ve(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&V(this._$AH)?this._$AA.nextSibling.data=e:this.T(w.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=T.createElement(me(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(t);else{let i=new q(s,this),o=i.u(this.options);i.p(t),this.T(o),this._$AH=i}}_$AC(e){let t=he.get(e.strings);return t===void 0&&he.set(e.strings,t=new T(e)),t}k(e){Z(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,r,s=0;for(let i of e)s===t.length?t.push(r=new n(this.O(I()),this.O(I()),this,this.options)):r=t[s],r._$AI(i),s++;s<t.length&&(this._$AR(r&&r._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let r=oe(e).nextSibling;oe(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},S=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,r,s,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=u}_$AI(e,t=this,r,s){let i=this.strings,o=!1;if(i===void 0)e=A(this,e,t,0),o=!V(e)||e!==this._$AH&&e!==_,o&&(this._$AH=e);else{let c=e,a,d;for(e=i[0],a=0;a<i.length-1;a++)d=A(this,c[r+a],t,a),d===_&&(d=this._$AH[a]),o||(o=!V(d)||d!==this._$AH[a]),d===u?e=u:e!==u&&(e+=(d??"")+i[a+1]),this._$AH[a]=d}o&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},K=class extends S{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},W=class extends S{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},G=class extends S{constructor(e,t,r,s,i){super(e,t,r,s,i),this.type=5}_$AI(e,t=this){if((e=A(this,e,t,0)??u)===_)return;let r=this._$AH,s=e===u&&r!==u||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==u&&(r===u||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},J=class{constructor(e,t,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){A(this,e)}};var Ue=C.litHtmlPolyfillSupport;Ue?.(T,U),(C.litHtmlVersions??(C.litHtmlVersions=[])).push("3.3.2");var fe=(n,e,t)=>{let r=t?.renderBefore??e,s=r._$litPart$;if(s===void 0){let i=t?.renderBefore??null;r._$litPart$=s=new U(e.insertBefore(I(),i),i,void 0,t??{})}return s._$AI(n),s};var z=globalThis,$=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;let e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=fe(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};$._$litElement$=!0,$.finalized=!0,z.litElementHydrateSupport?.({LitElement:$});var ze=z.litElementPolyfillSupport;ze?.({LitElement:$});(z.litElementVersions??(z.litElementVersions=[])).push("4.2.2");var be=E`
    :host {
        display: block;
        min-height: 100vh;
        color: var(--vscode-foreground);
        background: var(--vscode-editor-background);
        font-family: var(--vscode-font-family);
        font-size: var(--vscode-font-size);
    }

    .shell {
        padding: 16px;
    }

    h1 {
        margin: 0 0 4px;
        font-size: 1.3em;
        font-weight: 600;
    }

    h2 {
        font-size: 1em;
        border-bottom: 1px solid var(--vscode-panel-border);
        padding-bottom: 4px;
        margin: 0 0 8px;
    }

    .section {
        margin-bottom: 20px;
    }

    .toolbar {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
        flex-wrap: wrap;
        align-items: center;
    }

    button,
    select,
    textarea,
    input {
        font: inherit;
    }

    .btn {
        padding: 4px 10px;
        border-radius: 3px;
        border: 1px solid var(--vscode-button-border, transparent);
        cursor: pointer;
        font-size: 0.85em;
    }

    .btn-primary {
        background: var(--vscode-button-background);
        color: var(--vscode-button-foreground);
    }

    .btn-primary:hover {
        background: var(--vscode-button-hoverBackground);
    }

    .btn-secondary {
        background: var(--vscode-button-secondaryBackground);
        color: var(--vscode-button-secondaryForeground);
    }

    .btn-secondary:hover {
        background: var(--vscode-button-secondaryHoverBackground);
    }

    .btn-link {
        background: transparent;
        border: none;
        color: var(--vscode-textLink-foreground);
        padding: 0;
        cursor: pointer;
        text-align: left;
    }

    .btn-link:hover {
        color: var(--vscode-textLink-activeForeground);
        text-decoration: underline;
    }

    .empty {
        color: var(--vscode-descriptionForeground);
        font-style: italic;
    }

    .meta {
        color: var(--vscode-descriptionForeground);
        font-size: 0.9em;
    }

    .badge {
        display: inline-block;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.8em;
    }

    .reply-input {
        background: var(--vscode-input-background);
        color: var(--vscode-input-foreground);
        border: 1px solid var(--vscode-input-border);
        border-radius: 3px;
        padding: 6px 8px;
        resize: vertical;
        box-sizing: border-box;
    }

    select {
        background: var(--vscode-dropdown-background);
        color: var(--vscode-dropdown-foreground);
        border: 1px solid var(--vscode-dropdown-border);
        border-radius: 3px;
        padding: 3px 22px 3px 6px;
    }

    .check-state {
        font-size: 0.8em;
        min-width: 80px;
        padding: 2px 6px;
        border-radius: 3px;
        text-align: center;
        border: 1px solid;
    }

    .check-success { color: var(--vscode-charts-green); border-color: var(--vscode-charts-green); }
    .check-failure { color: var(--vscode-charts-red); border-color: var(--vscode-charts-red); }
    .check-pending { color: var(--vscode-charts-yellow); border-color: var(--vscode-charts-yellow); }
    .check-neutral { color: var(--vscode-descriptionForeground); border-color: var(--vscode-panel-border); }

    @media (max-width: 720px) {
        .shell {
            padding: 12px;
        }
    }
`;var Q;function Ne(){return Q||(Q=acquireVsCodeApi()),Q}function $e(){let n=document.getElementById("adoext-data");if(!n?.textContent)throw new Error("Missing ADOExt webview data.");return JSON.parse(n.textContent)}function ye(n){Ne().postMessage(n)}var xe=new Set(["epic","feature","user story","product backlog item","pbi","requirement","bug"]),N=class extends ${constructor(){super(...arguments);this.model=$e();this.filter="";this.sortMode="name";this.collapsed=new Set;this.expandAll=()=>{this.collapsed=new Set};this.collapseAll=()=>{let t=new Set;for(let r of this.model.scopes){let s=this.model.items.filter(i=>i.scopeKey===this.scopeKey(r));for(let i of s)t.add(`backlog-${r.organization}-${r.project}-${i.id}`);for(let i of s)i.iteration&&t.add(`sprint-${r.organization}-${r.project}-${i.iteration}`)}this.collapsed=t};this.onFilter=t=>{this.filter=t.target.value.trim()};this.onSort=t=>{this.sortMode=t.target.value==="date"?"date":"name"};this.clearFilter=()=>{this.filter=""}}render(){let t=this.model.kind==="backlog"||this.model.kind==="sprint";return p`<main class="shell">
            <div class="header"><div><h1>${this.model.title}</h1><div class="subtitle">${this.model.subtitle}</div></div><div class="toolbar">${t?p`<button class="btn btn-secondary" @click=${this.expandAll}>Expand all</button><button class="btn btn-secondary" @click=${this.collapseAll}>Collapse all</button>`:u}<button class="btn btn-primary" @click=${()=>this.send({type:"quickCreate"})}>+ New Item</button><button class="btn btn-secondary" @click=${()=>this.send({type:"refresh"})}>Refresh</button></div></div>
            <div class="filter-sort-controls"><label for="filter-input">Filter</label><input id="filter-input" type="text" placeholder="e.g. bug|critical" .value=${this.filter} @input=${this.onFilter}><label for="sort-select">Sort</label><select id="sort-select" .value=${this.sortMode} @change=${this.onSort}><option value="name">Name (A-Z)</option><option value="date">ID</option></select><button class="btn btn-small" @click=${this.clearFilter}>Clear</button></div>
            ${this.model.items.length===0?p`<p class="empty">No planning work items found.</p>`:this.model.scopes.map(r=>this.renderScope(r))}
        </main>`}renderScope(t){let r=this.sorted(this.model.items.filter(i=>i.scopeKey===this.scopeKey(t))).filter(i=>this.itemMatches(i)),s=this.model.kind==="backlog"?this.renderBacklog(t,r):this.model.kind==="board"?this.renderBoard(t,r):this.renderSprint(t,r);return p`<section class="scope"><h2 class="scope-title">${t.label} <span class="scope-count">${r.length}</span><button class="btn btn-primary btn-small scope-new-item" @click=${()=>this.send({type:"quickCreate",organization:t.organization,project:t.project})}>+ New Item</button></h2>${s}</section>`}renderBacklog(t,r){if(!r.length)return p`<p class="empty">No backlog items in this project.</p>`;let s=new Set(r.map(o=>o.id)),i=r.filter(o=>o.parentId===void 0||!s.has(o.parentId));return p`<div class="backlog" role="tree">${i.map(o=>this.renderBacklogItem(t,o,r,0,new Set))}</div>`}renderBacklogItem(t,r,s,i,o){if(o.has(r.id))return u;o.add(r.id);let c=this.sorted(s.filter(l=>l.parentId===r.id)),a=`backlog-${t.organization}-${t.project}-${r.id}`,d=this.collapsed.has(a);return p`${this.renderItemRow(r,i,c.length>0,a,d)}${c.length&&!d?p`<div role="group">${c.map(l=>this.renderBacklogItem(t,l,s,i+1,new Set(o)))}</div>`:u}`}renderBoard(t,r){if(!r.length)return p`<p class="empty">No board items in this project.</p>`;let s=Oe(r),i=this.boardLanes(r),o=`minmax(200px, 1.4fr) ${s.map(()=>"minmax(220px, 1fr)").join(" ")}`;return p`<div class="board-table" style=${`grid-template-columns:${o}`}><div class="board-cell lane-corner"></div>${s.map(c=>p`<div class="board-cell board-head">${c}</div>`)}${i.map(c=>p`${this.renderLaneHead(c.parent)}${s.map(a=>p`<div class="board-cell lane-cell">${c.cards.filter(d=>d.state===a).map(d=>this.renderCard(d))}</div>`)}`)}</div>`}renderSprint(t,r){if(!r.length)return p`<p class="empty">No sprint items in this project.</p>`;let s=new Map;for(let i of r){let o=i.iteration||"Unscheduled";s.set(o,[...s.get(o)??[],i])}return p`${[...s.entries()].sort((i,o)=>i[0].localeCompare(o[0])).map(([i,o])=>{let c=`sprint-${t.organization}-${t.project}-${i}`,a=this.collapsed.has(c),d=this.boardLanes(o,r);return p`<section class="sprint"><header class="sprint-head" role="button" tabindex="0" aria-expanded=${String(!a)} @click=${()=>this.toggle(c)} @keydown=${l=>this.toggleOnKey(l,c)}><h3><span class="chev ${a?"collapsed-chev":""}">v</span>${Re(i)}</h3><span class="meta">${o.length} item${o.length===1?"":"s"} · ${i}</span></header>${a?u:p`<div class="sprint-body">${d.map(l=>p`<div class="sprint-parent">${l.parent?this.renderSprintParent(l.parent):p`<div class="sprint-parent-header"><span class="title">Unparented</span><span class="meta">${l.cards.length}</span></div>`}${l.cards.length?l.cards.map(h=>this.renderSprintTask(h)):p`<div class="meta" style="padding-left:26px;">No child items.</div>`}</div>`)}</div>`}</section>`})}`}renderItemRow(t,r,s,i,o){return p`<div class="tree-row" role="treeitem" style=${`--depth:${r}`}><div class="title-line">${s?p`<button class="tree-twisty" type="button" aria-expanded=${String(!o)} aria-label=${`Toggle children of work item ${t.id}`} @click=${()=>this.toggle(i)}><span class="chev ${o?"collapsed-chev":""}">v</span></button>`:p`<span class="tree-twisty placeholder" aria-hidden="true"></span>`}${this.renderItemTitle(t)}${this.renderMetaActions(t,!0)}</div>${this.renderStateControl(t)}</div>`}renderCard(t){return p`<article class="card"><div class="card-title">${this.renderItemTitle(t)}</div>${this.renderMetaActions(t,!1)}<div class="card-footer">${this.renderStateControl(t)}</div></article>`}renderSprintTask(t){return p`<div class="sprint-task"><div class="title-line">${this.renderItemTitle(t)}${this.renderMetaActions(t,!0)}</div>${this.renderStateControl(t)}</div>`}renderSprintParent(t){return p`<div class="sprint-parent-header">${this.renderItemTitle(t)}${t.state?p`<span class="state-badge">${t.state}</span>`:u}</div>`}renderLaneHead(t){return t?p`<div class="board-cell lane-head"><div class="title-line">${this.renderItemTitle(t)}<span class="meta">${t.assignee}</span></div></div>`:p`<div class="board-cell lane-head"><div class="title-line"><span class="title">Unparented</span></div></div>`}renderItemTitle(t){return p`<span class="type ${t.typeClass}">${t.workItemType}</span><span class="id">#${t.id}</span><button class="btn-link" @click=${()=>this.send({type:"openWorkItem",id:t.id,organization:t.organization,project:t.project})}><span class="title">${t.title}</span></button>`}renderMetaActions(t,r){return p`${r?p`<span class="meta">·</span>`:u}<button class="btn-link meta-edit" title="Edit assignee" @click=${()=>this.send({type:"editAssignee",id:t.id,organization:t.organization,project:t.project})}>${t.assignee}</button><span class="meta">·</span><button class="btn-link meta-edit" title="Edit iteration" @click=${()=>this.send({type:"editIteration",id:t.id,organization:t.organization,project:t.project})}>${t.iterationLabel||"No iteration"}</button>`}renderStateControl(t){return p`<div class="state-control"><select aria-label=${`State for work item ${t.id}`}>${t.allowedStates.map(r=>p`<option value=${r} ?selected=${r===t.state}>${r}</option>`)}</select><button class="btn btn-primary" @click=${r=>this.saveState(r,t)}>Save</button></div>`}saveState(t,r){let s=t.currentTarget.closest(".state-control")?.querySelector("select");s?.value&&this.send({type:"setState",id:r.id,state:s.value,organization:r.organization,project:r.project})}boardLanes(t,r=t){let s=new Map(r.map(d=>[d.id,d])),i=new Map,o=[];for(let d of t){let l=je(d,s);l&&d.id!==l.id?(i.has(l.id)||i.set(l.id,{parent:l,cards:[]}),i.get(l.id).cards.push(d)):o.push(d)}let c=[...i.values()].sort((d,l)=>X(d.parent,l.parent)),a=o.filter(d=>!i.has(d.id));return a.length&&c.push({cards:a}),c}sorted(t){return[...t].sort(this.sortMode==="name"?He:X)}itemMatches(t){if(!this.filter)return!0;try{return new RegExp(this.filter,"i").test(`#${t.id} ${t.title} ${t.workItemType} ${t.state} ${t.assignee} ${t.iteration}`)}catch{return!0}}toggle(t){let r=new Set(this.collapsed);r.has(t)?r.delete(t):r.add(t),this.collapsed=r}toggleOnKey(t,r){t.key!=="Enter"&&t.key!==" "||(t.preventDefault(),this.toggle(r))}scopeKey(t){return`${t.organization}\0${t.project}`}send(t){ye(t)}};N.properties={model:{state:!0},filter:{state:!0},sortMode:{state:!0},collapsed:{state:!0}},N.styles=[be,E`
        h1 { font-size: 1.25rem; }
        .header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
        .subtitle { color: var(--vscode-descriptionForeground); margin-top: 4px; }
        .scope { margin: 0 0 22px; }
        .scope-title { font-size: 0.98rem; font-weight: 600; margin: 0 0 8px; color: var(--vscode-sideBarTitle-foreground); display: flex; align-items: center; gap: 8px; }
        .scope-count { color: var(--vscode-descriptionForeground); font-weight: 400; }
        .scope-new-item { margin-left: auto; }
        .filter-sort-controls { display: flex; gap: 10px; align-items: center; padding: 10px 12px; background: var(--vscode-editorGroupHeader-tabsBackground, var(--vscode-sideBar-background)); border-bottom: 1px solid var(--vscode-panel-border); flex-wrap: wrap; font-size: 0.9em; margin-bottom: 12px; }
        .filter-sort-controls label { color: var(--vscode-descriptionForeground); font-weight: 500; }
        .filter-sort-controls input { padding: 4px 8px; border: 1px solid var(--vscode-input-border); background: var(--vscode-input-background); color: var(--vscode-input-foreground); border-radius: 3px; min-width: 180px; }
        .backlog { border-top: 1px solid var(--vscode-panel-border); }
        .tree-row, .sprint-task { display: grid; grid-template-columns: minmax(280px, 1fr) auto; align-items: center; gap: 12px; min-height: 32px; border-bottom: 1px solid var(--vscode-panel-border); }
        .tree-row { padding: 3px 8px 3px calc(8px + var(--depth, 0) * 18px); }
        .sprint-task { padding: 3px 0 3px 26px; border-bottom-style: dotted; }
        .tree-row:hover, .card:hover { background: var(--vscode-list-hoverBackground); }
        .tree-twisty { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border: none; background: transparent; color: var(--vscode-foreground); cursor: pointer; padding: 0; margin-right: 2px; }
        .tree-twisty.placeholder { cursor: default; visibility: hidden; }
        .chev { display: inline-block; transition: transform 120ms ease; }
        .collapsed-chev { transform: rotate(-90deg); }
        .title-line { display: flex; align-items: center; gap: 6px; min-width: 0; flex-wrap: wrap; }
        .id { color: var(--vscode-descriptionForeground); font-variant-numeric: tabular-nums; }
        .type { white-space: nowrap; padding: 1px 6px; border-radius: 8px; font-size: 0.78em; color: var(--vscode-editor-background); background: var(--vscode-charts-blue); }
        .type.epic { background: var(--vscode-charts-purple, #8a2be2); }
        .type.feature { background: var(--vscode-charts-orange, #d9822b); }
        .type.user-story, .type.product-backlog-item, .type.pbi, .type.requirement { background: var(--vscode-charts-blue, #007acc); }
        .type.bug { background: var(--vscode-charts-red, #c4314b); }
        .type.task { background: var(--vscode-charts-yellow, #d7a416); color: #000; }
        .title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .state-badge { display: inline-block; padding: 1px 6px; border-radius: 8px; font-size: 0.78em; background: var(--vscode-badge-background); color: var(--vscode-badge-foreground); }
        .state-control { display: flex; align-items: center; gap: 6px; }
        .btn-small { padding: 2px 7px; font-size: 0.82em; }
        .meta-edit { color: var(--vscode-descriptionForeground); font-size: 0.85em; }
        .board-table { display: grid; gap: 1px; background: var(--vscode-panel-border); border: 1px solid var(--vscode-panel-border); border-radius: 4px; overflow: auto; }
        .board-cell { background: var(--vscode-sideBar-background); padding: 8px; min-height: 60px; }
        .board-head, .lane-head, .lane-corner { background: var(--vscode-editorGroupHeader-tabsBackground, var(--vscode-sideBar-background)); font-weight: 600; }
        .lane-cell { display: flex; flex-direction: column; gap: 6px; }
        .card { background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 4px; padding: 6px 8px; }
        .card-title { display: flex; gap: 6px; min-width: 0; margin-bottom: 4px; flex-wrap: wrap; }
        .card-title .title { white-space: normal; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 6px; }
        .sprint { margin-bottom: 18px; border: 1px solid var(--vscode-panel-border); border-radius: 4px; }
        .sprint-head { padding: 8px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px; background: var(--vscode-editorGroupHeader-tabsBackground, var(--vscode-sideBar-background)); border-bottom: 1px solid var(--vscode-panel-border); cursor: pointer; }
        .sprint-head h3 { margin: 0; font-size: 0.95rem; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .sprint-body { padding: 6px 0; }
        .sprint-parent { padding: 4px 10px; }
        .sprint-parent-header { display: flex; align-items: center; gap: 6px; padding: 4px 0; font-weight: 600; flex-wrap: wrap; }
        @media (max-width: 720px) { .tree-row, .sprint-task { grid-template-columns: 1fr; align-items: start; } .state-control { justify-content: flex-start; } .header { align-items: flex-start; flex-direction: column; } }
    `];function X(n,e){return n.id-e.id}function He(n,e){return n.title.localeCompare(e.title)||X(n,e)}function we(n){let e=n.toLowerCase();return e==="new"||e==="proposed"?10:e==="active"||e==="committed"||e==="in progress"?20:e==="resolved"?30:e==="closed"||e==="done"?40:100}function Oe(n){return[...new Set(n.map(e=>e.state||"Unknown"))].sort((e,t)=>we(e)-we(t)||e.localeCompare(t))}function je(n,e){if(xe.has(n.workItemType.toLowerCase()))return n;let t=n,r=new Set;for(;t&&!r.has(t.id);){if(r.add(t.id),t.parentId===void 0)return;let s=e.get(t.parentId);if(!s)return;if(xe.has(s.workItemType.toLowerCase()))return s;t=s}}function Re(n){let e=n.split("\\").filter(Boolean);return e.length?e[e.length-1]:n}customElements.define("ado-planning-app",N);})();

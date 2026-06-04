"use strict";(()=>{var B=globalThis,L=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),X=new WeakMap,x=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=X.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&X.set(e,t))}return t}toString(){return this.cssText}},Y=r=>new x(typeof r=="string"?r:r+"",void 0,j),z=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new x(e,r,j)},tt=(r,t)=>{if(L)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=B.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},V=L?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return Y(e)})(r):r;var{is:ft,defineProperty:_t,getOwnPropertyDescriptor:gt,getOwnPropertyNames:yt,getOwnPropertySymbols:vt,getPrototypeOf:At}=Object,f=globalThis,et=f.trustedTypes,bt=et?et.emptyScript:"",St=f.reactiveElementPolyfillSupport,C=(r,t)=>r,I={toAttribute(r,t){switch(t){case Boolean:r=r?bt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},it=(r,t)=>!ft(r,t),st={attribute:!0,type:String,converter:I,reflect:!1,useDefault:!1,hasChanged:it};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),f.litPropertyMetadata??(f.litPropertyMetadata=new WeakMap);var $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=st){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&_t(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=gt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let d=i?.call(this);o?.call(this,n),this.requestUpdate(t,d,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??st}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=At(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,s=[...yt(e),...vt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(V(i))}else t!==void 0&&e.push(V(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return tt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:I).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:I;this._$Em=i;let d=n.fromAttribute(e,o.type);this[i]=d??this._$Ej?.get(i)??d,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??(s=n.getPropertyOptions(t)),!((s.hasChanged??it)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,d=this[i];n!==!0||this._$AL.has(i)||d===void 0||this.C(i,void 0,o,d)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[C("elementProperties")]=new Map,$[C("finalized")]=new Map,St?.({ReactiveElement:$}),(f.reactiveElementVersions??(f.reactiveElementVersions=[])).push("2.1.2");var U=globalThis,rt=r=>r,D=U.trustedTypes,ot=D?D.createPolicy("lit-html",{createHTML:r=>r}):void 0,ct="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,pt="?"+_,Et=`<${pt}>`,A=document,M=()=>A.createComment(""),N=r=>r===null||typeof r!="object"&&typeof r!="function",G=Array.isArray,wt=r=>G(r)||typeof r?.[Symbol.iterator]=="function",q=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,at=/>/g,y=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ht=/'/g,lt=/"/g,ut=/^(?:script|style|textarea|title)$/i,Q=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),w=Q(1),Ht=Q(2),Tt=Q(3),b=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),dt=new WeakMap,v=A.createTreeWalker(A,129);function $t(r,t){if(!G(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(t):t}var xt=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=P;for(let d=0;d<e;d++){let a=r[d],c,p,h=-1,u=0;for(;u<a.length&&(n.lastIndex=u,p=n.exec(a),p!==null);)u=n.lastIndex,n===P?p[1]==="!--"?n=nt:p[1]!==void 0?n=at:p[2]!==void 0?(ut.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=y):p[3]!==void 0&&(n=y):n===y?p[0]===">"?(n=i??P,h=-1):p[1]===void 0?h=-2:(h=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?y:p[3]==='"'?lt:ht):n===lt||n===ht?n=y:n===nt||n===at?n=P:(n=y,i=void 0);let m=n===y&&r[d+1].startsWith("/>")?" ":"";o+=n===P?a+Et:h>=0?(s.push(c),a.slice(0,h)+ct+a.slice(h)+_+m):a+_+(h===-2?d:m)}return[$t(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},O=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,d=t.length-1,a=this.parts,[c,p]=xt(t,e);if(this.el=r.createElement(c,s),v.currentNode=this.el.content,e===2||e===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=v.nextNode())!==null&&a.length<d;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(ct)){let u=p[n++],m=i.getAttribute(h).split(_),k=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:k[2],strings:m,ctor:k[1]==="."?F:k[1]==="?"?K:k[1]==="@"?J:E}),i.removeAttribute(h)}else h.startsWith(_)&&(a.push({type:6,index:o}),i.removeAttribute(h));if(ut.test(i.tagName)){let h=i.textContent.split(_),u=h.length-1;if(u>0){i.textContent=D?D.emptyScript:"";for(let m=0;m<u;m++)i.append(h[m],M()),v.nextNode(),a.push({type:2,index:++o});i.append(h[u],M())}}}else if(i.nodeType===8)if(i.data===pt)a.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf(_,h+1))!==-1;)a.push({type:7,index:o}),h+=_.length-1}o++}}static createElement(t,e){let s=A.createElement("template");return s.innerHTML=t,s}};function S(r,t,e=r,s){if(t===b)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=N(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=S(r,i._$AS(r,t.values),i,s)),t}var W=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??A).importNode(e,!0);v.currentNode=i;let o=v.nextNode(),n=0,d=0,a=s[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new H(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new Z(o,this,t)),this._$AV.push(c),a=s[++d]}n!==a?.index&&(o=v.nextNode(),n++)}return v.currentNode=A,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},H=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),N(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(A.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=O.createElement($t(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new W(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=dt.get(t.strings);return e===void 0&&dt.set(t.strings,e=new O(t)),e}k(t){G(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=rt(t).nextSibling;rt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=l}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=S(this,t,e,0),n=!N(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{let d=t,a,c;for(t=o[0],a=0;a<o.length-1;a++)c=S(this,d[s+a],e,a),c===b&&(c=this._$AH[a]),n||(n=!N(c)||c!==this._$AH[a]),c===l?t=l:t!==l&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!i&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},F=class extends E{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}},K=class extends E{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}},J=class extends E{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??l)===b)return;let s=this._$AH,i=t===l&&s!==l||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==l&&(s===l||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Z=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Ct=U.litHtmlPolyfillSupport;Ct?.(O,H),(U.litHtmlVersions??(U.litHtmlVersions=[])).push("3.3.2");var mt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new H(t.insertBefore(M(),o),o,void 0,e??{})}return i._$AI(r),i};var T=globalThis,g=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};g._$litElement$=!0,g.finalized=!0,T.litElementHydrateSupport?.({LitElement:g});var Pt=T.litElementPolyfillSupport;Pt?.({LitElement:g});(T.litElementVersions??(T.litElementVersions=[])).push("4.2.2");var R=class extends g{constructor(){super(...arguments);this.builds=[];this.emptyLabel="No builds found."}render(){return this.builds.length===0?w`<p class="empty">${this.emptyLabel}</p>`:w`${this.builds.map(e=>this.renderBuild(e))}`}renderBuild(e){let s=[e.definitionName,e.requestedFor,e.startTime].filter(Boolean),i=this.statusClass(e.statusKind);return w`<div class="build-item">
            <span class="build-status ${i}">${e.statusLabel}</span>
            <span class="build-name" title=${e.buildNumber}>${e.buildNumber}</span>
            ${s.length>0?w`<span class="build-meta" title=${s.join(" - ")}>${s.join(" - ")}</span>`:l}
            ${e.id>0?w`<button type="button" @click=${()=>this.openBuild(e.id)}>Open</button>`:l}
        </div>`}statusClass(e){switch(e){case"succeeded":return"build-status-succeeded";case"failed":return"build-status-failed";case"inprogress":return"build-status-inprogress";default:return"build-status-other"}}openBuild(e){this.dispatchEvent(new CustomEvent("adoext-open-build",{bubbles:!0,composed:!0,detail:{buildId:e}}))}};R.properties={builds:{attribute:"builds-json",converter:{fromAttribute(e){if(!e)return[];try{let s=JSON.parse(e);return Array.isArray(s)?s:[]}catch{return[]}}}},emptyLabel:{attribute:"empty-label"}},R.styles=z`
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
    `;customElements.define("ado-build-list",R);})();

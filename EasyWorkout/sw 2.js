if(!self.define){let e,s={};const i=(i,l)=>(i=new URL(i+".js",l).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(l,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const o=e=>i(e,r),u={module:{uri:r},exports:t,require:o};s[r]=Promise.all(l.map((e=>u[e]||o(e)))).then((e=>(n(...e),t)))}}define(["./workbox-3494f737"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/HistoryView-1d9a0085.js",revision:null},{url:"assets/HistoryView-e2a11c2d.css",revision:null},{url:"assets/index-1e6a6ebd.js",revision:null},{url:"assets/index-b21248dd.css",revision:null},{url:"assets/listItem-6d93c5a1.css",revision:null},{url:"assets/listItem-fcb50a4c.js",revision:null},{url:"assets/logView-2fae6892.js",revision:null},{url:"assets/logView-6513f484.css",revision:null},{url:"index.html",revision:"4efe79d81d49bc49969c7cb8ba56e6e4"},{url:"registerSW.js",revision:"c58ebda9ae14f390bd56c4d4c4a2d403"},{url:"manifest.webmanifest",revision:"6657e5cd0fa6d293b5f352919ded0c6b"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));

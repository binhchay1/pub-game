!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.magazineBlocksUtils=t():e.magazineBlocksUtils=t()}(self,(()=>(()=>{"use strict";var e={d:(t,r)=>{for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{$:()=>r,$$:()=>o,domReady:()=>n,each:()=>u,find:()=>d,findAll:()=>s,getCookie:()=>y,observeElementInView:()=>i,on:()=>m,parseHTML:()=>c,setCookie:()=>f,siblings:()=>l,toArray:()=>a});const r=document.querySelector.bind(document),o=document.querySelectorAll.bind(document),n=e=>{"complete"===document.readyState||"interactive"===document.readyState?e():document.addEventListener("DOMContentLoaded",e)},l=e=>{var t;const o="string"==typeof e?r(e):e;return Array.from(null!==(t=o?.parentElement?.children)&&void 0!==t?t:[]).filter((e=>e!==o))},i=(e,t)=>{const r=new IntersectionObserver((o=>{o.forEach((o=>{o.isIntersecting&&(t(o.target,e),r.disconnect())}))}),{root:document,threshold:.5});r.observe(e)},c=(e,t=0)=>{let r=(new DOMParser).parseFromString(e,"text/html").body;for(;t>0;)t--,r=r.firstChild;return null===r&&(r=document.createDocumentFragment()),r},d=(e,t)=>{var r;return t?"string"==typeof e?null!==(r=document.querySelector(e)?.querySelector(t))&&void 0!==r?r:null:e.querySelector(t):d(document,e)},s=(e,t)=>t?"string"==typeof e?document.querySelectorAll(e):e.querySelectorAll(t):s(document,e),a=e=>Array.prototype.slice.call(e),u=(e,t)=>{if(Array.isArray(e))for(let r=0;r<e.length;r++)t(e[r],r);else for(let r in e)t(e[r],r)},m=(e,t,r,o)=>{t&&(Array.isArray(t)?u(t,(t=>t.addEventListener(e,r,o))):t.addEventListener(e,r,o))},y=e=>{const t=document.cookie.split(";");for(let r=0;r<t.length;r++){const o=t[r].trim();if(o.startsWith(e+"="))return o.substring(e.length+1)}return null},f=(e,t,r)=>{const o=new Date;o.setTime(o.getTime()+24*r*60*60*1e3),document.cookie=`${e}=${t};expires=${o.toUTCString()};path=/`};return t})()));
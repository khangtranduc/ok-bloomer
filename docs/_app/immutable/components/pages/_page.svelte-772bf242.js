import{S as K,i as M,s as Q,k as g,a as b,q as k,l as _,c as I,m as d,r as w,h as n,K as T,n as p,Q as y,C as F,b as Y,D as r,E as U,B as H,G as V}from"../../chunks/index-2d187d0f.js";import{d as z}from"../../chunks/store-42d7ccd0.js";import{g as L}from"../../chunks/navigation-96a2e2de.js";function R(l){let s,u,f,t,o,m,E,i,N,h,B,C,c,j,P,S,v,q,A;return{c(){s=g("img"),f=b(),t=g("div"),o=g("h1"),m=k("James Bong"),E=b(),i=g("p"),N=k("Your one stop shop for everything "),h=g("span"),B=k("weed"),C=b(),c=g("button"),j=g("span"),P=k("Explore our catalogs"),S=b(),v=g("iconify-icon"),this.h()},l(e){s=_(e,"IMG",{src:!0,alt:!0,class:!0}),f=I(e),t=_(e,"DIV",{class:!0});var a=d(t);o=_(a,"H1",{class:!0});var D=d(o);m=w(D,"James Bong"),D.forEach(n),E=I(a),i=_(a,"P",{class:!0});var O=d(i);N=w(O,"Your one stop shop for everything "),h=_(O,"SPAN",{class:!0});var G=d(h);B=w(G,"weed"),G.forEach(n),O.forEach(n),C=I(a),c=_(a,"BUTTON",{class:!0});var x=d(c);j=_(x,"SPAN",{});var J=d(j);P=w(J,"Explore our catalogs"),J.forEach(n),S=I(x),v=_(x,"ICONIFY-ICON",{icon:!0,width:!0}),d(v).forEach(n),x.forEach(n),a.forEach(n),this.h()},h(){T(s.src,u=l[2][l[0]])||p(s,"src",u),p(s,"alt",""),p(s,"class","svelte-jh4rxr"),y(s,"gray",l[1]),p(o,"class","gradient svelte-jh4rxr"),y(o,"gray-txt",l[1]),p(h,"class","gradient svelte-jh4rxr"),y(h,"gray-txt",l[1]),p(i,"class","svelte-jh4rxr"),F(v,"icon","lucide:arrow-right"),F(v,"width","25"),p(c,"class","svelte-jh4rxr"),p(t,"class","title svelte-jh4rxr")},m(e,a){Y(e,s,a),Y(e,f,a),Y(e,t,a),r(t,o),r(o,m),r(t,E),r(t,i),r(i,N),r(i,h),r(h,B),r(t,C),r(t,c),r(c,j),r(j,P),r(c,S),r(c,v),q||(A=U(c,"click",l[4]),q=!0)},p(e,[a]){a&1&&!T(s.src,u=e[2][e[0]])&&p(s,"src",u),a&2&&y(s,"gray",e[1]),a&2&&y(o,"gray-txt",e[1]),a&2&&y(h,"gray-txt",e[1])},i:H,o:H,d(e){e&&n(s),e&&n(f),e&&n(t),q=!1,A()}}}function W(l,s,u){let f,t;V(l,z,i=>u(3,t=i));const o=["/splashes/snoop-dogg-puffing.jpg","/splashes/person-smoking-marijuana-pipe.jpg"];let m=0;setInterval(()=>u(0,m=(m+1)%o.length),3e3);const E=()=>L("/search");return l.$$.update=()=>{l.$$.dirty&8&&u(1,f=t)},[m,f,o,t,E]}class ee extends K{constructor(s){super(),M(this,s,W,R,Q,{})}}export{ee as default};
import{S as z,i as G,s as L,k as m,a as b,q as T,l as p,m as v,c as C,r as y,h as g,n as $,b as D,D as d,u as Q,B as O,Q as R,C as J,f as M,d as K,t as P,w as U,x as W,I as X,y as Z,z as x,g as ee}from"../../../../chunks/index-feba7eca.js";function q(c,e,s){const r=c.slice();return r[1]=e[s],r}function A(c){let e;return{c(){e=m("iconify-icon"),this.h()},l(s){e=p(s,"ICONIFY-ICON",{icon:!0}),v(e).forEach(g),this.h()},h(){J(e,"icon","lucide:star")},m(s,r){D(s,e,r)},p:O,d(s){s&&g(e)}}}function B(c){let e;return{c(){e=m("iconify-icon"),this.h()},l(s){e=p(s,"ICONIFY-ICON",{icon:!0}),v(e).forEach(g),this.h()},h(){J(e,"icon","lucide:star-half")},m(s,r){D(s,e,r)},d(s){s&&g(e)}}}function te(c){let e,s,r=c[0]>Math.floor(c[0]),h,i,u,_={length:Math.floor(c[0])},f=[];for(let o=0;o<_.length;o+=1)f[o]=A(q(c,_,o));let a=r&&B();return{c(){e=m("div");for(let o=0;o<f.length;o+=1)f[o].c();s=b(),a&&a.c(),h=b(),i=m("span"),u=T(c[0]),this.h()},l(o){e=p(o,"DIV",{class:!0});var l=v(e);for(let n=0;n<f.length;n+=1)f[n].l(l);s=C(l),a&&a.l(l),h=C(l),i=p(l,"SPAN",{class:!0});var t=v(i);u=y(t,c[0]),t.forEach(g),l.forEach(g),this.h()},h(){$(i,"class","svelte-amjpj1"),$(e,"class","svelte-amjpj1")},m(o,l){D(o,e,l);for(let t=0;t<f.length;t+=1)f[t].m(e,null);d(e,s),a&&a.m(e,null),d(e,h),d(e,i),d(i,u)},p(o,[l]){if(l&1){_={length:Math.floor(o[0])};let t;for(t=0;t<_.length;t+=1){const n=q(o,_,t);f[t]?f[t].p(n,l):(f[t]=A(),f[t].c(),f[t].m(e,s))}for(;t<f.length;t+=1)f[t].d(1);f.length=_.length}l&1&&(r=o[0]>Math.floor(o[0])),r?a||(a=B(),a.c(),a.m(e,h)):a&&(a.d(1),a=null),l&1&&Q(u,o[0])},i:O,o:O,d(o){o&&g(e),R(f,o),a&&a.d()}}}function le(c,e,s){let{stars:r}=e;return c.$$set=h=>{"stars"in h&&s(0,r=h.stars)},[r]}class se extends z{constructor(e){super(),G(this,e,le,te,L,{stars:0})}}function F(c,e,s){const r=c.slice();return r[2]=e[s],r}function ae(c){let e,s,r=c[0].slug+"",h;return{c(){e=m("h1"),s=T("Search results for "),h=T(r)},l(i){e=p(i,"H1",{});var u=v(e);s=y(u,"Search results for "),h=y(u,r),u.forEach(g)},m(i,u){D(i,e,u),d(e,s),d(e,h)},p(i,u){u&1&&r!==(r=i[0].slug+"")&&Q(h,r)},d(i){i&&g(e)}}}function re(c){let e,s;return{c(){e=m("h1"),s=T("Our Products")},l(r){e=p(r,"H1",{});var h=v(e);s=y(h,"Our Products"),h.forEach(g)},m(r,h){D(r,e,h),d(e,s)},p:O,d(r){r&&g(e)}}}function Y(c){let e,s,r,h,i,u,_=c[2].name+"",f,a,o,l,t,n,k=c[2].price+"",N,j,S;return o=new se({props:{stars:c[2].ratings}}),{c(){e=m("article"),s=m("img"),h=b(),i=m("div"),u=m("h4"),f=T(_),a=b(),U(o.$$.fragment),l=b(),t=m("h4"),n=T("$"),N=T(k),j=b(),this.h()},l(E){e=p(E,"ARTICLE",{class:!0});var I=v(e);s=p(I,"IMG",{alt:!0,src:!0,class:!0}),h=C(I),i=p(I,"DIV",{class:!0});var w=v(i);u=p(w,"H4",{class:!0});var V=v(u);f=y(V,_),V.forEach(g),a=C(w),W(o.$$.fragment,w),l=C(w),t=p(w,"H4",{class:!0});var H=v(t);n=y(H,"$"),N=y(H,k),H.forEach(g),w.forEach(g),j=C(I),I.forEach(g),this.h()},h(){$(s,"alt",""),X(s.src,r=c[2].src)||$(s,"src",r),$(s,"class","svelte-1hc3wc4"),$(u,"class","svelte-1hc3wc4"),$(t,"class","gradient svelte-1hc3wc4"),$(i,"class","container svelte-1hc3wc4"),$(e,"class","svelte-1hc3wc4")},m(E,I){D(E,e,I),d(e,s),d(e,h),d(e,i),d(i,u),d(u,f),d(i,a),Z(o,i,null),d(i,l),d(i,t),d(t,n),d(t,N),d(e,j),S=!0},p:O,i(E){S||(M(o.$$.fragment,E),S=!0)},o(E){P(o.$$.fragment,E),S=!1},d(E){E&&g(e),x(o)}}}function ne(c){let e,s,r,h;function i(l,t){return l[0].slug===void 0?re:ae}let u=i(c),_=u(c),f=c[1],a=[];for(let l=0;l<f.length;l+=1)a[l]=Y(F(c,f,l));const o=l=>P(a[l],1,1,()=>{a[l]=null});return{c(){e=m("div"),_.c(),s=b(),r=m("div");for(let l=0;l<a.length;l+=1)a[l].c();this.h()},l(l){e=p(l,"DIV",{class:!0});var t=v(e);_.l(t),s=C(t),r=p(t,"DIV",{class:!0});var n=v(r);for(let k=0;k<a.length;k+=1)a[k].l(n);n.forEach(g),t.forEach(g),this.h()},h(){$(r,"class","flex svelte-1hc3wc4"),$(e,"class","container-fluid")},m(l,t){D(l,e,t),_.m(e,null),d(e,s),d(e,r);for(let n=0;n<a.length;n+=1)a[n].m(r,null);h=!0},p(l,[t]){if(u===(u=i(l))&&_?_.p(l,t):(_.d(1),_=u(l),_&&(_.c(),_.m(e,s))),t&2){f=l[1];let n;for(n=0;n<f.length;n+=1){const k=F(l,f,n);a[n]?(a[n].p(k,t),M(a[n],1)):(a[n]=Y(k),a[n].c(),M(a[n],1),a[n].m(r,null))}for(ee(),n=f.length;n<a.length;n+=1)o(n);K()}},i(l){if(!h){for(let t=0;t<f.length;t+=1)M(a[t]);h=!0}},o(l){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)P(a[t]);h=!1},d(l){l&&g(e),_.d(),R(a,l)}}}function ce(c,e,s){let{data:r}=e,h=[{name:"Cat Tail",src:"/seeds/cattail.png",price:225,ratings:4.3},{name:"Dog Tail",src:"/seeds/dogtail.png",price:250,ratings:4.9},{name:"Cat Tail",src:"/seeds/cattail.png",price:225,ratings:4.3},{name:"Dog Tail",src:"/seeds/dogtail.png",price:250,ratings:4.9},{name:"Cat Tail",src:"/seeds/cattail.png",price:225,ratings:4.3},{name:"Dog Tail",src:"/seeds/dogtail.png",price:250,ratings:4.9},{name:"Cat Tail",src:"/seeds/cattail.png",price:225,ratings:4.3},{name:"Dog Tail",src:"/seeds/dogtail.png",price:250,ratings:4.9},{name:"Cat Tail",src:"/seeds/cattail.png",price:225,ratings:4.3},{name:"Dog Tail",src:"/seeds/dogtail.png",price:250,ratings:4.9},{name:"Dog Tail",src:"/seeds/dogtail.png",price:250,ratings:4.9}];return c.$$set=i=>{"data"in i&&s(0,r=i.data)},[r,h]}class oe extends z{constructor(e){super(),G(this,e,ce,ne,L,{data:0})}}export{oe as default};
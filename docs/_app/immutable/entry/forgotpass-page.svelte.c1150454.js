import{S as M,i as z,s as G,k as s,q as y,a as P,l as n,m as _,r as L,h as u,c as N,n as a,b as J,D as e,F as D}from"../chunks/index.708f7bdc.js";function K(g){let r,t,i,v,T,U,q,c,x,o,E,A,d,B,m,C,p,I,h,j,b,O;return{c(){r=s("form"),t=s("article"),i=s("h1"),v=y("Login"),T=P(),U=s("hr"),q=P(),c=s("label"),x=y(`Email\r
            `),o=s("input"),A=P(),d=s("label"),B=y(`New Password\r
            `),m=s("input"),C=P(),p=s("label"),I=y(`Confirm New Password\r
            `),h=s("input"),j=P(),b=s("button"),O=y("Update Password"),this.h()},l(f){r=n(f,"FORM",{method:!0,action:!0,class:!0});var w=_(r);t=n(w,"ARTICLE",{class:!0});var l=_(t);i=n(l,"H1",{class:!0});var F=_(i);v=L(F,"Login"),F.forEach(u),T=N(l),U=n(l,"HR",{}),q=N(l),c=n(l,"LABEL",{for:!0});var R=_(c);x=L(R,`Email\r
            `),o=n(R,"INPUT",{type:!0,name:!0,placeholder:!0}),R.forEach(u),A=N(l),d=n(l,"LABEL",{for:!0});var S=_(d);B=L(S,`New Password\r
            `),m=n(S,"INPUT",{type:!0,name:!0,placeholder:!0}),S.forEach(u),C=N(l),p=n(l,"LABEL",{for:!0});var k=_(p);I=L(k,`Confirm New Password\r
            `),h=n(k,"INPUT",{type:!0,name:!0,placeholder:!0}),k.forEach(u),j=N(l),b=n(l,"BUTTON",{type:!0});var H=_(b);O=L(H,"Update Password"),H.forEach(u),l.forEach(u),w.forEach(u),this.h()},h(){a(i,"class","svelte-64084j"),a(o,"type","text"),a(o,"name","email"),a(o,"placeholder","elonmusk@gmail.com"),o.value=E=g[0].email??"",o.required=!0,a(c,"for","email"),a(m,"type","password"),a(m,"name","new"),a(m,"placeholder","••••••••"),m.required=!0,a(d,"for","new"),a(h,"type","password"),a(h,"name","confirm"),a(h,"placeholder","••••••••"),h.required=!0,a(p,"for","confirm"),a(b,"type","submit"),a(t,"class","container svelte-64084j"),a(r,"method","POST"),a(r,"action","?/reset"),a(r,"class","svelte-64084j")},m(f,w){J(f,r,w),e(r,t),e(t,i),e(i,v),e(t,T),e(t,U),e(t,q),e(t,c),e(c,x),e(c,o),e(t,A),e(t,d),e(d,B),e(d,m),e(t,C),e(t,p),e(p,I),e(p,h),e(t,j),e(t,b),e(b,O)},p(f,[w]){w&1&&E!==(E=f[0].email??"")&&o.value!==E&&(o.value=E)},i:D,o:D,d(f){f&&u(r)}}}function Q(g,r,t){let{data:i}=r;return g.$$set=v=>{"data"in v&&t(0,i=v.data)},[i]}class W extends M{constructor(r){super(),z(this,r,Q,K,G,{data:0})}}export{W as default};
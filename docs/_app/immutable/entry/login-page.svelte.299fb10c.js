import{S as ae,i as se,s as re,k as u,q as w,a as g,l as d,m as _,r as P,h as c,c as E,n as r,b as O,D as a,P as $,E as oe,F as x,o as ie}from"../chunks/index.708f7bdc.js";function ee(h){let t,e;return{c(){t=u("p"),e=w("Account not found!"),this.h()},l(l){t=d(l,"P",{class:!0});var s=_(t);e=P(s,"Account not found!"),s.forEach(c),this.h()},h(){r(t,"class","svelte-64084j")},m(l,s){O(l,t,s),a(t,e)},d(l){l&&c(t)}}}function te(h){let t,e;return{c(){t=u("p"),e=w("Invalid email format!"),this.h()},l(l){t=d(l,"P",{class:!0});var s=_(t);e=P(s,"Invalid email format!"),s.forEach(c),this.h()},h(){r(t,"class","svelte-64084j")},m(l,s){O(l,t,s),a(t,e)},d(l){l&&c(t)}}}function le(h){let t,e;return{c(){t=u("p"),e=w("Wrong password!"),this.h()},l(l){t=d(l,"P",{class:!0});var s=_(t);e=P(s,"Wrong password!"),s.forEach(c),this.h()},h(){r(t,"class","svelte-64084j")},m(l,s){O(l,t,s),a(t,e)},d(l){l&&c(t)}}}function ne(h){var Q,V,X;let t,e,l,s,I,j,R,F,S,B,y,U,m,C,L,H,v,M,A,W,D,b,z,N,G,K,i=((Q=h[0])==null?void 0:Q.credentials)&&ee(),n=((V=h[0])==null?void 0:V.mail_re)&&te(),f=((X=h[0])==null?void 0:X.password)&&le();return{c(){t=u("form"),e=u("article"),l=u("h1"),s=w("Login"),I=g(),j=u("hr"),R=g(),i&&i.c(),F=g(),n&&n.c(),S=g(),f&&f.c(),B=g(),y=u("label"),U=w(`Email\r
            `),m=u("input"),C=g(),L=u("label"),H=w(`Password\r
            `),v=u("input"),M=g(),A=u("button"),W=w("Login"),D=g(),b=u("a"),z=w("Forgot password 💀"),this.h()},l(p){t=d(p,"FORM",{method:!0,action:!0,class:!0});var k=_(t);e=d(k,"ARTICLE",{class:!0});var o=_(e);l=d(o,"H1",{class:!0});var q=_(l);s=P(q,"Login"),q.forEach(c),I=E(o),j=d(o,"HR",{}),R=E(o),i&&i.l(o),F=E(o),n&&n.l(o),S=E(o),f&&f.l(o),B=E(o),y=d(o,"LABEL",{for:!0});var T=_(y);U=P(T,`Email\r
            `),m=d(T,"INPUT",{type:!0,id:!0,name:!0,placeholder:!0}),T.forEach(c),C=E(o),L=d(o,"LABEL",{for:!0});var J=_(L);H=P(J,`Password\r
            `),v=d(J,"INPUT",{type:!0,id:!0,name:!0,placeholder:!0}),J.forEach(c),M=E(o),A=d(o,"BUTTON",{type:!0});var Y=_(A);W=P(Y,"Login"),Y.forEach(c),D=E(o),b=d(o,"A",{href:!0,class:!0});var Z=_(b);z=P(Z,"Forgot password 💀"),Z.forEach(c),o.forEach(c),k.forEach(c),this.h()},h(){r(l,"class","svelte-64084j"),r(m,"type","text"),r(m,"id","email"),r(m,"name","email"),r(m,"placeholder","elonmusk@gmail.com"),m.required=!0,r(y,"for","email"),r(v,"type","password"),r(v,"id","password"),r(v,"name","password"),r(v,"placeholder","••••••••"),v.required=!0,r(L,"for","password"),r(A,"type","submit"),r(b,"href",N=`/forgotpass?email=${h[1]}`),r(b,"class","svelte-64084j"),r(e,"class","container svelte-64084j"),r(t,"method","POST"),r(t,"action","?/login"),r(t,"class","svelte-64084j")},m(p,k){O(p,t,k),a(t,e),a(e,l),a(l,s),a(e,I),a(e,j),a(e,R),i&&i.m(e,null),a(e,F),n&&n.m(e,null),a(e,S),f&&f.m(e,null),a(e,B),a(e,y),a(y,U),a(y,m),$(m,h[1]),a(e,C),a(e,L),a(L,H),a(L,v),a(e,M),a(e,A),a(A,W),a(e,D),a(e,b),a(b,z),G||(K=oe(m,"input",h[2]),G=!0)},p(p,[k]){var o,q,T;(o=p[0])!=null&&o.credentials?i||(i=ee(),i.c(),i.m(e,F)):i&&(i.d(1),i=null),(q=p[0])!=null&&q.mail_re?n||(n=te(),n.c(),n.m(e,S)):n&&(n.d(1),n=null),(T=p[0])!=null&&T.password?f||(f=le(),f.c(),f.m(e,B)):f&&(f.d(1),f=null),k&2&&m.value!==p[1]&&$(m,p[1]),k&2&&N!==(N=`/forgotpass?email=${p[1]}`)&&r(b,"href",N)},i:x,o:x,d(p){p&&c(t),i&&i.d(),n&&n.d(),f&&f.d(),G=!1,K()}}}function fe(h,t,e){ie(()=>{sessionStorage.clear()});let{form:l}=t,s=(l==null?void 0:l.email)??"";function I(){s=this.value,e(1,s)}return h.$$set=j=>{"form"in j&&e(0,l=j.form)},[l,s,I]}class ue extends ae{constructor(t){super(),se(this,t,fe,ne,re,{form:0})}}export{ue as default};
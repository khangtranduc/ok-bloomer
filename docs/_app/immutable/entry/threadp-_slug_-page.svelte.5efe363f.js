import{S as ue,i as fe,s as ce,k as f,a as U,q as M,l as c,m as h,c as F,h as r,r as Y,n,p as de,C as oe,b as H,D as o,E as X,F as J,X as he,O as _e,W as Q,G as pe,H as ae}from"../chunks/index.708f7bdc.js";import{g as me}from"../chunks/navigation.9ada4443.js";import{p as ve}from"../chunks/stores.b1365436.js";function re(l,t,a){const _=l.slice();return _[20]=t[a],_[22]=a,_}function se(l){let t,a,_,u,b,v,i,p,y,m,w;return{c(){t=f("dialog"),a=f("article"),_=f("header"),u=f("a"),b=M(`\r
            Not signed in!`),v=M(`\r
        You must be `),i=f("a"),p=M("signed in"),y=M(" to write a new thread post."),this.h()},l(d){t=c(d,"DIALOG",{});var N=h(t);a=c(N,"ARTICLE",{});var k=h(a);_=c(k,"HEADER",{});var D=h(_);u=c(D,"A",{class:!0,href:!0});var I=h(u);I.forEach(r),b=Y(D,`\r
            Not signed in!`),D.forEach(r),v=Y(k,`\r
        You must be `),i=c(k,"A",{href:!0});var A=h(i);p=Y(A,"signed in"),A.forEach(r),y=Y(k," to write a new thread post."),k.forEach(r),N.forEach(r),this.h()},h(){n(u,"class","close"),n(u,"href","#"),n(i,"href","/login"),t.open=!0},m(d,N){H(d,t,N),o(t,a),o(a,_),o(_,u),o(_,b),o(a,v),o(a,i),o(i,p),o(a,y),m||(w=X(u,"click",l[13]),m=!0)},p:J,d(d){d&&r(t),m=!1,w()}}}function ie(l){let t,a,_,u,b,v,i,p,y,m,w,d,N,k,D;return{c(){t=f("dialog"),a=f("article"),_=f("header"),u=f("a"),b=M(`\r
            Write a Thread Post!`),v=U(),i=f("form"),p=f("input"),y=U(),m=f("textarea"),w=U(),d=f("button"),N=M("Post"),this.h()},l(I){t=c(I,"DIALOG",{});var A=h(t);a=c(A,"ARTICLE",{});var S=h(a);_=c(S,"HEADER",{});var G=h(_);u=c(G,"A",{class:!0,href:!0});var B=h(u);B.forEach(r),b=Y(G,`\r
            Write a Thread Post!`),G.forEach(r),v=F(S),i=c(S,"FORM",{method:!0,action:!0});var R=h(i);p=c(R,"INPUT",{type:!0,name:!0}),y=F(R),m=c(R,"TEXTAREA",{id:!0,name:!0,rows:!0,cols:!0,placeholder:!0,class:!0}),h(m).forEach(r),w=F(R),d=c(R,"BUTTON",{type:!0});var L=h(d);N=Y(L,"Post"),L.forEach(r),R.forEach(r),S.forEach(r),A.forEach(r),this.h()},h(){n(u,"class","close"),n(u,"href","#"),n(p,"type","hidden"),n(p,"name","thread_id"),p.value=l[4].thread_id,n(m,"id","text"),n(m,"name","text"),n(m,"rows","3"),n(m,"cols","50"),n(m,"placeholder","Type your post here..."),n(m,"class","svelte-s9671g"),n(d,"type","submit"),n(i,"method","POST"),n(i,"action","?/post"),t.open=!0},m(I,A){H(I,t,A),o(t,a),o(a,_),o(_,u),o(_,b),o(a,v),o(a,i),o(i,p),o(i,y),o(i,m),o(i,w),o(i,d),o(d,N),k||(D=X(u,"click",l[14]),k=!0)},p:J,d(I){I&&r(t),k=!1,D()}}}function ne(l){let t,a,_=l[20].text+"",u,b,v,i,p=l[6](l[20].timeStamp)+"",y,m,w,d,N,k=l[20].username+"",D,I,A,S,G;function B(){return l[15](l[20])}function R(){return l[16](l[20])}function L(){return l[17](l[22])}return{c(){t=f("div"),a=f("p"),u=M(_),b=U(),v=f("p"),i=f("span"),y=M(p),m=U(),w=f("span"),d=f("a"),N=M("@"),D=M(k),I=U(),A=f("hr"),this.h()},l(O){t=c(O,"DIV",{class:!0});var s=h(t);a=c(s,"P",{class:!0});var W=h(a);u=Y(W,_),W.forEach(r),b=F(s),v=c(s,"P",{class:!0});var q=h(v);i=c(q,"SPAN",{});var z=h(i);y=Y(z,p),z.forEach(r),m=F(q),w=c(q,"SPAN",{});var P=h(w);d=c(P,"A",{href:!0});var T=h(d);N=Y(T,"@"),D=Y(T,k),T.forEach(r),P.forEach(r),q.forEach(r),s.forEach(r),I=F(O),A=c(O,"HR",{}),this.h()},h(){n(a,"class","svelte-s9671g"),n(d,"href",`/window?uid=${l[20].uid}`),n(v,"class","svelte-s9671g"),n(t,"class","svelte-s9671g"),Q(t,"isOp",l[7]&&!l[20].solution),Q(t,"isOpSol",l[7]&&l[20].solution),Q(t,"solution",l[20].solution)},m(O,s){H(O,t,s),o(t,a),o(a,u),o(t,b),o(t,v),o(v,i),o(i,y),o(v,m),o(v,w),o(w,d),o(d,N),o(d,D),H(O,I,s),H(O,A,s),S||(G=[X(d,"click",B),X(d,"keydown",l[12]),X(t,"mouseenter",R),X(t,"click",L),X(t,"keydown",l[11])],S=!0)},p(O,s){l=O},d(O){O&&r(t),O&&r(I),O&&r(A),S=!1,pe(G)}}}function Ee(l){let t,a,_,u,b,v,i,p,y,m,w=l[4].title+"",d,N,k,D=l[6](l[4].timeStamp)+"",I,A,S,G,B,R,L,O,s,W,q,z,P=l[1]&&se(l),T=l[0]&&ie(l),j=l[5],C=[];for(let e=0;e<j.length;e+=1)C[e]=ne(re(l,j,e));return{c(){t=f("form"),a=f("input"),_=U(),u=f("input"),b=U(),P&&P.c(),v=U(),T&&T.c(),i=U(),p=f("main"),y=f("hgroup"),m=f("h1"),d=M(w),N=U(),k=f("h2"),I=M(D),A=U(),S=f("hgroup");for(let e=0;e<C.length;e+=1)C[e].c();G=U(),B=f("form"),R=f("button"),L=f("iconify-icon"),O=U(),s=f("button"),W=f("iconify-icon"),this.h()},l(e){t=c(e,"FORM",{style:!0,id:!0,action:!0,method:!0});var E=h(t);a=c(E,"INPUT",{type:!0,name:!0,id:!0}),_=F(E),u=c(E,"INPUT",{type:!0,name:!0,id:!0}),E.forEach(r),b=F(e),P&&P.l(e),v=F(e),T&&T.l(e),i=F(e),p=c(e,"MAIN",{class:!0});var g=h(p);y=c(g,"HGROUP",{});var V=h(y);m=c(V,"H1",{});var Z=h(m);d=Y(Z,w),Z.forEach(r),N=F(V),k=c(V,"H2",{});var $=h(k);I=Y($,D),$.forEach(r),V.forEach(r),A=F(g),S=c(g,"HGROUP",{});var x=h(S);for(let K=0;K<C.length;K+=1)C[K].l(x);x.forEach(r),g.forEach(r),G=F(e),B=c(e,"FORM",{action:!0});var ee=h(B);R=c(ee,"BUTTON",{class:!0,type:!0});var te=h(R);L=c(te,"ICONIFY-ICON",{icon:!0}),h(L).forEach(r),te.forEach(r),ee.forEach(r),O=F(e),s=c(e,"BUTTON",{class:!0});var le=h(s);W=c(le,"ICONIFY-ICON",{icon:!0}),h(W).forEach(r),le.forEach(r),this.h()},h(){n(a,"type","hidden"),n(a,"name","post_id"),n(a,"id","post_id"),a.value=l[2],n(u,"type","hidden"),n(u,"name","solution"),n(u,"id","solution"),u.value=l[3],de(t,"display","none"),n(t,"id","solve"),n(t,"action","?/solved"),n(t,"method","POST"),n(p,"class","container"),oe(L,"icon","lucide:arrow-left"),n(R,"class","exit svelte-s9671g"),n(R,"type","submit"),n(B,"action","\\thread"),oe(W,"icon","lucide:pencil"),n(s,"class","fab svelte-s9671g")},m(e,E){H(e,t,E),o(t,a),o(t,_),o(t,u),H(e,b,E),P&&P.m(e,E),H(e,v,E),T&&T.m(e,E),H(e,i,E),H(e,p,E),o(p,y),o(y,m),o(m,d),o(y,N),o(y,k),o(k,I),o(p,A),o(p,S);for(let g=0;g<C.length;g+=1)C[g]&&C[g].m(S,null);H(e,G,E),H(e,B,E),o(B,R),o(R,L),H(e,O,E),H(e,s,E),o(s,W),q||(z=X(s,"click",l[18]),q=!0)},p(e,[E]){if(E&4&&(a.value=e[2]),E&8&&(u.value=e[3]),e[1]?P?P.p(e,E):(P=se(e),P.c(),P.m(v.parentNode,v)):P&&(P.d(1),P=null),e[0]?T?T.p(e,E):(T=ie(e),T.c(),T.m(i.parentNode,i)):T&&(T.d(1),T=null),E&492){j=e[5];let g;for(g=0;g<j.length;g+=1){const V=re(e,j,g);C[g]?C[g].p(V,E):(C[g]=ne(V),C[g].c(),C[g].m(S,null))}for(;g<C.length;g+=1)C[g].d(1);C.length=j.length}},i:J,o:J,d(e){e&&r(t),e&&r(b),P&&P.d(e),e&&r(v),T&&T.d(e),e&&r(i),e&&r(p),he(C,e),e&&r(G),e&&r(B),e&&r(O),e&&r(s),q=!1,z()}}}function be(l,t,a){var O;let _;_e(l,ve,s=>a(19,_=s));let{data:u}=t,{form:b}=t,v=u.thread,i=u.threadPosts,p=!1,y=b==null?void 0:b.notloggedin;const m=s=>new Date(s).toDateString();let w=i[0].uid==((O=_.data.user)==null?void 0:O.uid),d=-1,N=1;const k=()=>{let s=document.getElementById("solve");w&&s&&s.submit()};function D(s){ae.call(this,l,s)}function I(s){ae.call(this,l,s)}const A=()=>{a(1,y=!1)},S=()=>a(0,p=!1),G=s=>me(`/window?uid=${s.uid}`),B=s=>{a(2,d=s.post_id),a(3,N=s.solution?0:1)},R=s=>{s!=0&&k()},L=()=>a(0,p=!0);return l.$$set=s=>{"data"in s&&a(9,u=s.data),"form"in s&&a(10,b=s.form)},[p,y,d,N,v,i,m,w,k,u,b,D,I,A,S,G,B,R,L]}class Oe extends ue{constructor(t){super(),fe(this,t,be,Ee,ce,{data:9,form:10})}}export{Oe as default};

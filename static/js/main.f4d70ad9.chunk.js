(this.webpackJsonpbasket=this.webpackJsonpbasket||[]).push([[0],{100:function(e,t,a){},101:function(e,t,a){},102:function(e,t,a){},103:function(e,t,a){},104:function(e,t,a){},105:function(e,t,a){},106:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(8),l=a.n(c),o=(a(90),a(28)),i=a(21),u=a(23),s=a(77),m=a(158),d=a(74),p=a.n(d),E=a(143),f=a(159),g=a(145),h=a(149),b=a(162),k=a(147),v=a(148),y=a(59),j=a.n(y),_=a(60),N=a.n(_),O=Object(E.a)({list:{width:220}});var w=function(e){var t=e.open,a=e.handleNavVisible,n=O();return r.a.createElement("div",null,r.a.createElement(r.a.Fragment,{key:"right"},r.a.createElement(f.a,{open:t,anchor:"right",onClose:function(){return a(!1)},onOpen:function(){return a(!0)}},r.a.createElement("div",{className:n.list,role:"presentation",onClick:function(){return a(!1)}},r.a.createElement(g.a,null,["Inbox","Starred","Send email","Drafts"].map((function(e,t){return r.a.createElement(b.a,{button:!0,key:e},r.a.createElement(k.a,null,t%2===0?r.a.createElement(j.a,null):r.a.createElement(N.a,null)),r.a.createElement(v.a,{primary:e}))}))),r.a.createElement(h.a,null),r.a.createElement(g.a,null,["All mail","Trash","Spam"].map((function(e,t){return r.a.createElement(b.a,{button:!0,key:e},r.a.createElement(k.a,null,t%2===0?r.a.createElement(j.a,null):r.a.createElement(N.a,null)),r.a.createElement(v.a,{primary:e}))})))))))},C=(a(95),a(52)),S=a(53),B=function(e){var t=e.basket,a=Object(n.useState)(!1),c=Object(i.a)(a,2),l=c[0],o=c[1];return r.a.createElement("header",null,r.a.createElement("div",{id:"header-in-center"},r.a.createElement("div",{className:"upper-header"},r.a.createElement(u.c,{exact:!0,to:"/"},r.a.createElement("img",{src:p.a,alt:"logo",id:"logo"})),r.a.createElement("div",{id:"upper-header-blank"}),r.a.createElement("div",{id:"shopping-cart-icon-wrap"},r.a.createElement("div",{id:"cart-counter"},t.length),r.a.createElement(u.c,{to:"/basket"},r.a.createElement(C.a,{icon:S.c,className:"shopping-cart-icon"}))),r.a.createElement("div",{id:"menu-bars-icon-wrap"},r.a.createElement(C.a,{icon:S.a,className:"menu-bars-icon",onClick:function(){o(!0)}}))),r.a.createElement("div",{className:"lower-header"},r.a.createElement("input",{type:"search",placeholder:"Enter product name..."}),r.a.createElement(C.a,{icon:S.b,className:"magnifier-icon"}))),r.a.createElement(w,{open:l,handleNavVisible:function(e){return o(e)}}))},q=a(9),x=a(160),A=(a(100),Object(E.a)((function(e){return{root:{"& > span":{display:"flex",justifyContent:"center"},"& > span::after":{content:"`{$comments}`",color:"#5f5f5f",fontSize:"0.7rem"}}}}))),F=function(e){var t=e.product,a=A(),n=6*Math.random();return r.a.createElement("div",{className:"product"},r.a.createElement("span",{className:"img-wrap"},r.a.createElement("img",{src:t.image,alt:""})),r.a.createElement(u.b,{to:"/product/".concat(t.id)},r.a.createElement("p",{className:"title"},t.title)),r.a.createElement("p",{className:"spacer"}),r.a.createElement("p",{className:a.root},r.a.createElement(x.a,{name:"half-rating",value:n,defaultValue:2.6,precision:.5,size:"small",readOnly:!0})),r.a.createElement("p",{className:"price"},"\xa3",t.price))},P=function(e){var t=e.productsList;return r.a.createElement("div",{className:"products"},t&&t.map((function(e){return r.a.createElement(F,{product:e,key:e.id})})))},I=a(65),L=a(151),R=a(161),Y=a(163),T=a(152),U=a(64),z=a.n(U),M=a(34),Q=a(108),V=a(150),D=a(153),G=function(e){var t=e.value,a=e.getCurrValue,n=function(e){if(t<2&&-1===e)return null;a(t+e)};return r.a.createElement("div",{className:"basket-quantity"},r.a.createElement("div",{className:"minus",onClick:function(){return n(-1)}},"-"),r.a.createElement("input",{className:"quantity",value:t,onChange:function(e){""===e.target.value?a(1):isNaN(e.target.value)||e.target.value<0?a(t):e.target.value>99?a(parseInt(99)):a(parseInt(e.target.value))},onFocus:function(e){return e.target.value=""}}),r.a.createElement("div",{className:"plus",onClick:function(){return n(1)}},"+"))},X=(a(101),a(102),Object(E.a)((function(e){return{root:{height:"40px",marginBottom:"13px"},backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"},dialogRoot:{"& .MuiPaper-root":{padding:"10px"}},dialogBut:{width:"100%",marginBottom:e.spacing(1),"& a":{color:"white"}}}}))),J=function(e){var t=e.propsRoute,a=e.basket,c=e.setBasket,l=t.match.params.id;console.log("props.route to : "),console.log(t);var s=X(),m=Object(n.useState)(1),d=Object(i.a)(m,2),p=d[0],E=d[1],f=Object(n.useState)([]),g=Object(i.a)(f,2),b=g[0],k=g[1],v=Object(n.useState)(!1),y=Object(i.a)(v,2),j=y[0],_=y[1];return Object(n.useEffect)((function(){fetch("https://fakestoreapi.com/products/"+l).then((function(e){if(e.ok)return e;throw Error(e.statusText)})).then((function(e){return e.json()})).then((function(e){return k(e)})).catch((function(e){return console.log(e)}))}),[l]),r.a.createElement(r.a.Fragment,null,0===b.length&&r.a.createElement(Q.a,{open:!0,className:s.backdrop},r.a.createElement(V.a,{color:"inherit"}),"Loading..."),0!==b.length&&r.a.createElement("div",null,r.a.createElement("p",{className:"product-card__back-link",onClick:function(){return t.history.goBack()}},"\u2190 Back to the list"),r.a.createElement(h.a,null),r.a.createElement("p",{className:"product-card__img-wrap"},r.a.createElement("img",{src:b.image,alt:""})),r.a.createElement("h3",null,b.title),r.a.createElement("span",{className:"product-card__price"},"\xa3",b.price),r.a.createElement("div",null,r.a.createElement(G,{value:p,getCurrValue:function(e){return E(e)}})),r.a.createElement(L.a,{className:s.root,fullWidth:!0,variant:"contained",color:"primary",onClick:function(){return function(e){if(a.find((function(t){return t.id===e.id}))){var t=e.quantity?parseInt(e.quantity,2)+p:p;c((function(a){var n=a.filter((function(t){return t.id!==e.id})),r=a.find((function(t){return t.id===e.id})).quantity;return[].concat(Object(I.a)(n),[Object(o.a)(Object(o.a)({},e),{},{quantity:r+t})])}))}else c((function(t){return[].concat(Object(I.a)(t),[Object(o.a)(Object(o.a)({},e),{},{quantity:p})])}));_(!0)}(b)}},"Add to basket"),r.a.createElement(L.a,{className:s.root,fullWidth:!0,variant:"contained",color:"secondary"},"Add to favorites"),r.a.createElement(R.a,null,r.a.createElement(Y.a,{expandIcon:r.a.createElement(z.a,null)},r.a.createElement(M.a,null,"Description:")),r.a.createElement(T.a,null,r.a.createElement(M.a,null,b.description))),r.a.createElement(R.a,null,r.a.createElement(Y.a,{expandIcon:r.a.createElement(z.a,null)},r.a.createElement(M.a,null,"Review:")),r.a.createElement(T.a,null,r.a.createElement(M.a,null,"feature available soon...")))),r.a.createElement(D.a,{className:s.dialogRoot,open:j},r.a.createElement("div",{className:"product-card__dialog__wrap"},r.a.createElement("div",{className:"product-card__dialog__img-wrap"},r.a.createElement("img",{src:b.image,alt:"img"})),r.a.createElement("div",{className:"product-card__dialog__text"},r.a.createElement("h4",null,"Added to the basket"),r.a.createElement("p",{className:"product-card__dialog__desc"},b.title),r.a.createElement("p",{className:"product-card__dialog__quant"},"Quantity: ",p))),r.a.createElement(u.b,{to:"/basket"},r.a.createElement(L.a,{className:s.dialogBut,variant:"contained",color:"primary"},"go to the basket")),r.a.createElement(L.a,{className:s.dialogBut,variant:"contained",color:"secondary",autoFocus:!0,onClick:function(){return t.history.goBack()}},"Back to shopping")))},W=(a(103),a(157)),H=a(155),K=a(156),$=a(154),Z=function(e){var t=e.basket,a=e.setBasket,c=e.currProdObj,l=(e.removeFromBasket,e.chanProdQuantInBask),o=Object(n.useState)(!1),u=Object(i.a)(o,2),s=u[0],m=u[1],d=function(e){var t=e.basket,a=e.setBasket,n=e.currProdObj;return r.a.createElement(D.a,{open:s,onClose:function(){return m(!1)},"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},r.a.createElement($.a,{id:"alert-dialog-title"},"Use Google's location service?"),r.a.createElement(H.a,null,r.a.createElement(K.a,{id:"alert-dialog-description"},"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.")),r.a.createElement(W.a,null,r.a.createElement(L.a,{onClick:function(){return function(e){var n=t.filter((function(t){return t.id!==e.id}));a(n)}(n)},color:"primary"},"Disagree"),r.a.createElement(L.a,{onClick:function(){return m(!1)},color:"primary",autoFocus:!0},"Agree")))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"product-in-basket"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("img",{src:c.image,alt:"pic"})),r.a.createElement("li",null,r.a.createElement("p",null,c.title),r.a.createElement("p",null,"Product code: ",c.id))),r.a.createElement(G,{value:c.quantity,getCurrValue:function(e){return l(c,e)}}),r.a.createElement("p",null,c.quantity&&"Quantity: ".concat(c.quantity)),r.a.createElement("button",{onClick:function(){return m(!0)}},"Romove"),r.a.createElement(h.a,null)),r.a.createElement(d,{openRemConf:s,setOpenRemConf:m,basket:t,setBasket:a,currProdObj:c}))},ee=function(e){var t=e.basket,a=e.setBasket,n=e.chanProdQuantInBask;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"basket-wrap"},r.a.createElement("div",{id:"basket-header"},r.a.createElement("p",{id:"basket-back-link"},"Continue shopping"),r.a.createElement("h2",null,"Your basket"),r.a.createElement("h4",null,"(",t.length," products)"),r.a.createElement(h.a,null),r.a.createElement("div",{id:"basket-products-list"},t.map((function(e){return r.a.createElement("div",{key:e.title},r.a.createElement(Z,{currProdObj:e,chanProdQuantInBask:n,basket:t,setBasket:a}))}))))))},te=function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement(q.c,null,r.a.createElement(q.a,{path:"/",exact:!0,render:function(){return r.a.createElement(P,e)}}),r.a.createElement(q.a,{path:"/basket",render:function(){return r.a.createElement(ee,e)}}),r.a.createElement(q.a,{path:"/product/:id",render:function(t){return r.a.createElement(J,Object.assign({},e,{propsRoute:t}))}}),r.a.createElement(q.a,{render:function(){return r.a.createElement("div",{style:{textAlign:"center"}},"Page not found")}})))},ae=(a(104),function(){return r.a.createElement("footer",null,"Copyright \xa9 2020 R.Sprengel")}),ne=(a(105),Object(s.a)({palette:{primary:{main:"#67a509"},secondary:{main:"#0277bd"}}}));var re=function(){var e=Object(n.useState)(""),t=Object(i.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)([{id:1,title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",price:109.95,description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",category:"men clothing",image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",quantity:2},{id:2,title:"Mens Casual Premium Slim Fit T-Shirts ",price:22.3,description:"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",category:"men clothing",image:"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",quantity:3},{id:3,title:"Mens Cotton Jacket",price:55.99,description:"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",category:"men clothing",image:"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",quantity:1},{id:4,title:"Mens Casual Slim Fit",price:15.99,description:"The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",category:"men clothing",image:"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",quantity:5}]),s=Object(i.a)(l,2),d=s[0],p=s[1];return Object(n.useEffect)((function(){fetch("https://fakestoreapi.com/products?limit=999").then((function(e){if(e.ok)return e;throw Error(e.statusText)})).then((function(e){return e.json()})).then((function(e){return c(e)})).catch((function(e){return console.log(e)}))}),[]),r.a.createElement(m.a,{theme:ne},r.a.createElement(u.a,{basename:"/eShop"},r.a.createElement("div",{className:"App"},r.a.createElement(B,{basket:d}),r.a.createElement("content",null,r.a.createElement(te,{productsList:a,basket:d,setBasket:p,chanProdQuantInBask:function(e,t){var a=d.map((function(a){return a.id===e.id?(a.quantity=t,Object(o.a)(Object(o.a)({},a),{},{"el.quantity":t})):a}));p(a)}})),r.a.createElement("footer",null,r.a.createElement(ae,null)))))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(re,null)),document.getElementById("root"))},74:function(e,t,a){e.exports=a.p+"static/media/logo.f8659509.png"},85:function(e,t,a){e.exports=a(106)},90:function(e,t,a){},95:function(e,t,a){}},[[85,1,2]]]);
//# sourceMappingURL=main.f4d70ad9.chunk.js.map
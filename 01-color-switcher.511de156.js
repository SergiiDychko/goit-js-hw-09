const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");function d(){const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;document.body.style.backgroundColor=`${e}`}let a;t.disabled=!0,e.addEventListener("click",(()=>{a=setInterval(d,1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(()=>{clearInterval(a),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.511de156.js.map

(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{17:function(e,t,n){e.exports=n(29)},22:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),l=n(15),r=n.n(l),i=n(7),u=(n(22),function(){return c.a.createElement("header",null,c.a.createElement("nav",null,c.a.createElement("ul",null,c.a.createElement("li",null,c.a.createElement(i.b,{to:"/signup"},"Sign Up")),c.a.createElement("li",null,c.a.createElement(i.b,{to:"/statistics"},"Statistics")))))}),o=n(1),s=n(8),m=function(e){e.userId;var t=e.taskId,n=e.taskTitle,l=e.signUps,r=Object(a.useState)(!0),i=Object(s.a)(r,2),u=i[0],o=i[1];Object(a.useEffect)((function(){var e=l.length>0?l[l.length-1]:null,t=parseInt(e);(isNaN(t)||-1===function(e){var t=new Date(Date.now());return e<new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()?-1:0}(t))&&o(!1)}),[t,l]);return c.a.createElement("div",null,c.a.createElement("div",null,n),c.a.createElement("div",null,c.a.createElement("input",{type:"checkbox",checked:u,readOnly:!0}),c.a.createElement("button",{onClick:function(){var e=new FormData;e.append("task_id",t),e.append("time_stamp",Date.now()),fetch("/api/tasks",{method:"PATCH",body:e}).then((function(e){return e.json()})).then((function(){o(!0)}))},disabled:u},"Sign Up!")))},d=function(e){var t=e.userName,n=e.userId,l=Object(a.useState)([]),r=Object(s.a)(l,2),i=r[0],u=r[1];return Object(a.useEffect)((function(){fetch("/api/tasks?userId=".concat(n)).then((function(e){return e.json()})).then((function(e){console.log("will set tasks",e),u(e)}))}),[n]),c.a.createElement("div",null,c.a.createElement("div",null,t),i.map((function(e){return c.a.createElement(m,{key:e._id,userId:n,taskId:e._id,taskTitle:e.title,signUps:e.sign_up})})))},f=function(){var e=Object(a.useState)([]),t=Object(s.a)(e,2),n=t[0],l=t[1];return Object(a.useEffect)((function(){fetch("/api/users").then((function(e){return e.json()})).then((function(e){l(e)}))}),[]),c.a.createElement("div",null,n.map((function(e){return c.a.createElement(d,{key:e._id,userName:e.name,userId:e._id})})))},p=function(){return c.a.createElement("div",null,"Coming soon...")},E=function(){return c.a.createElement("main",null,c.a.createElement(o.c,null,c.a.createElement(o.a,{exact:!0,path:"/",component:f}),c.a.createElement(o.a,{path:"/signup",component:f}),c.a.createElement(o.a,{path:"/statistics",component:p})))},h=(n(28),function(){return c.a.createElement("div",{className:"App"},c.a.createElement(u,null),c.a.createElement(E,null))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(i.a,null,c.a.createElement(c.a.StrictMode,null,c.a.createElement(h,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.ef6e3e0b.chunk.js.map
"use strict";(self.webpackChunkopensource=self.webpackChunkopensource||[]).push([[64],{4973:(e,t,n)=>{n.r(t),n.d(t,{default:()=>g});var r=n(8168),c=n(6540),a=n(53),o=n(5062),l=n(4586);const s=JSON.parse('[{"name":"CKibana","logoUrl":"projects/ckibana-new.svg","description":"Visualizing data in ClickHouse using native Kibana.","websiteUrl":"https://tongchengopensource.github.io/ckibana-docs/","githubUrl":"https://github.com/TongchengOpenSource/ckibana"},{"name":"Smart-doc","logoUrl":"","description":"Smart-doc is a java restful api document generation tool.","websiteUrl":"https://smart-doc-group.github.io/#/?id=smart-doc","githubUrl":"https://github.com/TongchengOpenSource/smart-doc"},{"name":"AppScan","logoUrl":"projects/AppScan.png","description":"Security Privacy Guardian (AppScan), a free enterprise-grade automated privacy detection tool.","websiteUrl":"https://github.com/TongchengOpenSource/AppScan/wiki","githubUrl":"https://github.com/TongchengOpenSource/AppScan"}]'),i={banner:"banner_wUZq",projectsList:"projectsList_SzhD"},p={projectItem:"projectItem_3aSd",projectLinks:"projectLinks_kekI"},u=JSON.parse('{"c":{"VY":"/home/"}}');function m(e){return c.createElement("section",{className:(0,a.A)(p.projectItem),style:{border:`0.8rem solid ${e.color}`}},c.createElement("div",null,c.createElement("h1",null,c.createElement("img",{src:u.c.VY+e.logoUrl||`${u.c.VY}/logos/logo.svg`})),c.createElement("hr",null),c.createElement("h3",{style:{textAlign:"left"}},e.name),c.createElement("p",null,e.description),c.createElement("div",{className:(0,a.A)(p.projectLinks)},c.createElement("a",{target:"_blank",href:e.githubUrl},"GitHub",c.createElement("span",null," >")),c.createElement("a",{target:"_blank",href:e.websiteUrl},"Website",c.createElement("span",null," >")))))}function g(){const{siteConfig:e}=(0,l.A)(),t=["#6e1981","#e18a3b","#4f6f46","#3271ae","#007175","#c82c3f","#662b1f","#2e59a7","#8f1d22","#602641"];s.forEach(((e,n)=>{e.color=t[n%t.length]}));const[n,p]=c.useState(s);return c.createElement(o.A,{description:"Open Source"},c.createElement("div",{className:(0,a.A)(i.banner)},c.createElement("div",null,c.createElement("h1",null,"Projects")),c.createElement("div",null,c.createElement("input",{onInput:e=>{const t=e.target.value.toLowerCase(),n=s.filter((e=>e.name.toLowerCase().includes(t)||e.description.toLowerCase().includes(t)));p(n)},autoFocus:!0,placeholder:"Search Projects"}))),c.createElement("main",{className:(0,a.A)(i.projectsList)},n.map(((e,t)=>c.createElement(m,(0,r.A)({key:t},e)))),0===n.length&&c.createElement("h1",null,"No projects found")),c.createElement("br",null),c.createElement("br",null))}}}]);
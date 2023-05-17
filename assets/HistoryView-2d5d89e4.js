import{_ as p,u as m,r as c,o as i,c as r,w as _,v as g,a,F as h,b as D,d,e as f,f as w}from"./index-fe239228.js";import{e as H,l as L}from"./listItem-b2956b0a.js";const v={name:"HistoryView",components:{exerciseLog:H,listItem:L},setup(){return{trainingData:m()}},data(){return{showHistory:!1,currentDay:"",searchInput:"",dateList:[]}},methods:{showHistoryPage(e){this.currentDay=e,this.showHistory=!0},deleteHistory(e){console.log("hi"),delete this.trainingData.history[e];let t=this.dateList.findIndex(n=>n.name==name);this.dateList.splice(t,1)}},computed:{filteredDates(){const e=this.searchInput.toLocaleLowerCase();return this.dateList.filter(t=>t.toLocaleLowerCase().includes(e))}},mounted(){this.dateList=Object.keys(this.trainingData.history)},beforeUpdate(){this.dateList=Object.keys(this.trainingData.history)}},x={key:0,class:"history-page"},I=a("header",{class:"history-header"},[a("h2",{class:"history-title"},"History")],-1),k={class:"history-wrapper"},V={class:"history-item"};function B(e,t,n,b,l,o){const u=c("listItem"),y=c("exerciseLog");return i(),r(h,null,[this.showHistory==!1?(i(),r("div",x,[I,_(a("input",{type:"text",class:"search-input","onUpdate:modelValue":t[0]||(t[0]=s=>l.searchInput=s),placeholder:"Search"},null,512),[[g,l.searchInput]]),a("div",k,[(i(!0),r(h,null,D(o.filteredDates,s=>(i(),r("div",V,[w(u,{class:"list-item",title:s,onShowDetailPage:o.showHistoryPage,onDeleteEntry:C=>o.deleteHistory(s)},null,8,["title","onShowDetailPage","onDeleteEntry"])]))),256))])])):d("",!0),this.showHistory?(i(),f(y,{key:1,fromHistory:!0,logTitle:this.currentDay,data:this.trainingData.history[this.currentDay],onBack:t[1]||(t[1]=s=>this.showHistory=!1)},null,8,["logTitle","data"])):d("",!0)],64)}const E=p(v,[["render",B]]);export{E as default};

import{e as L,l as m}from"./listItem-33c3518e.js";import{_ as f,u as w,r as d,o as i,c as a,w as _,v as D,a as l,F as h,b as E,d as u,e as y,f as I}from"./index-6ab8e3d5.js";const k={name:"LogView",components:{exerciseLog:L,listItem:m},setup(){return{trainingData:w()}},data(){return{exerciseList:[],searchInput:"",showInputField:!1,newExercise:"",showLog:!1,currentExercise:""}},methods:{showLogPage(e){this.currentExercise=e,this.showLog=!0},deleteLog(e){let t=this.exerciseList.findIndex(n=>n==e),c=this.trainingData.currentExercises.findIndex(n=>n.name==e);this.trainingData.currentExercises.splice(c,1),this.exerciseList.splice(t,1),delete this.trainingData.data[e]}},computed:{filteredExercises(){const e=this.searchInput.toLocaleLowerCase();return this.exerciseList.filter(t=>t.toLocaleLowerCase().includes(e))}},mounted(){this.exerciseList=Object.keys(this.trainingData.data),this.exerciseList.shift()},beforeUpdate(){this.exerciseList=Object.keys(this.trainingData.data),this.exerciseList.shift()}},v={key:0,class:"log-container"},V=l("h2",{class:"log-header"}," Logs ",-1),S={class:"exercise-item-container"};function B(e,t,c,n,r,o){const g=d("listItem"),p=d("exerciseLog");return i(),a(h,null,[r.showLog==!1?(i(),a("div",v,[V,_(l("input",{type:"text",class:"search-input","onUpdate:modelValue":t[0]||(t[0]=s=>r.searchInput=s),placeholder:"Search"},null,512),[[D,r.searchInput]]),l("div",S,[(i(!0),a(h,null,E(o.filteredExercises,s=>(i(),a("div",{key:s,class:"exercise-item",onClick:t[1]||(t[1]=(...x)=>e.handleSelection&&e.handleSelection(...x))},[I(g,{title:s,onDeleteEntry:o.deleteLog,onShowDetailPage:o.showLogPage},null,8,["title","onDeleteEntry","onShowDetailPage"])]))),128))])])):u("",!0),r.showLog?(i(),y(p,{key:1,fromHistory:!1,logTitle:this.currentExercise,data:this.trainingData.data[this.currentExercise],onBack:t[2]||(t[2]=s=>this.showLog=!1)},null,8,["logTitle","data"])):u("",!0)],64)}const P=f(k,[["render",B]]);export{P as default};

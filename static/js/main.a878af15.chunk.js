(this.webpackJsonptodolist=this.webpackJsonptodolist||[]).push([[0],{48:function(e,t,i){e.exports=i(85)},53:function(e,t,i){},54:function(e,t,i){},55:function(e,t,i){},79:function(e,t,i){},80:function(e,t,i){},81:function(e,t,i){},82:function(e,t,i){},83:function(e,t,i){},85:function(e,t,i){"use strict";i.r(t);var a=i(0),n=i.n(a),s=i(15),c=i.n(s),r=(i(53),i(54),i(14)),l=i(5),o={customButtonHolder:{display:"flex",flexDirection:"row"},buttonSpace:{marginRight:"1rem"},listStyle:{textAlign:"center ",background:"black",marginBotton:"8px",padding:"5px",color:"white",cursor:"pointer"},listSet:{position:"absolute",right:"12%",top:"10%",listStyle:"none"},menuListStyle:{textAlign:"left",paddingRight:"1rem",cursor:"pointer"},navStyle:{display:"grid",alignItems:"center",gridTemplateColumns:"60% 40%"},menuStyle:{display:"flex",listStyle:"none",paddingRight:"10px",justifyContent:"space-between"}},d=(i(55),function(){var e=Object(a.useState)(window.matchMedia("(max-width : 680px)").matches),t=Object(r.a)(e,2),i=t[0],s=t[1];return Object(a.useEffect)((function(){window.addEventListener("resize",(function(){s(window.matchMedia("(max-width : 680px)").matches)}))})),n.a.createElement("nav",{className:"tracker",style:o.navStyle},n.a.createElement(l.b,{to:{pathname:"/Activity-App/"}},n.a.createElement("strong",null,n.a.createElement("span",{className:"header"},"activity"))),i?n.a.createElement(be,null):n.a.createElement(ne,{style:o.menuStyle}))}),m=i(3),u=i(17),h=i(2),p={API_KEY:"034e4c1a00d9f959337a5f7b1cccd8eb",visible:!1,light:"Night",isPending:!1,givenCityName:"",weatherReport:{},weatherStatus:{},basicWeatherData:{},defaultCity:"Tampere"},b="CHANGE_LIGHT",v="HANDLE_CHANGE",O="CHANGE_WEATHER",j="TOGGLE_VISIBLE",y="REQUEST_WEATHER_FAILED",g="REQUEST_WEATHER_PENDING",f="REQUEST_WEATHER_SUCCESS",E=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v:var i=t.payload.target,a=i.value,n=i.name;return Object(h.a)(Object(h.a)({},e),{},Object(u.a)({},n,a));case O:t.payload.preventDefault();var s=e.givenCityName;return Object(h.a)(Object(h.a)({},e),{},{defaultCity:s,givenCityName:""});case j:return Object(h.a)(Object(h.a)({},e),{},{visible:!0});case b:return e.weatherStatus.icon.includes("d")?Object(h.a)(Object(h.a)({},e),{},{light:"Day"}):e.weatherStatus.icon.includes("n")?Object(h.a)(Object(h.a)({},e),{},{light:"Night"}):Object(h.a)(Object(h.a)({},e),{},{light:""});case g:return Object(h.a)(Object(h.a)({},e),{},{isPending:!0});case f:var c=t.payload.main,r=t.payload.weather[0];return Object(h.a)(Object(h.a)({},e),{},{weatherStatus:r,isPending:!1,basicWeatherData:c,weatherReport:t.payload});case y:return alert("City doesn't found"),Object(h.a)(Object(h.a)({},e),{},{isPending:!0});default:return e}},w=i(12),I=i(86),A={setId:"",setName:"",setCompleted:"",setValidTime:"",showModal:!1,notifiedItem:[],activitiesActive:[],activitiesNonActive:[],timeSet:(new Date).getHours()+":"+(new Date).getMinutes(),activities:[{id:Object(I.a)(),name:"Running",completed:!1,timeSet:60*Number("00:03".split(":")[0])+Number("00:03".split(":")[1])},{id:Object(I.a)(),name:"Cooking",completed:!0,timeSet:NaN},{id:Object(I.a)(),name:"Sleeping",completed:!1,timeSet:60*Number("00:05".split(":")[0])+Number("00:05".split(":")[1])}]},C="SET_DEFINED",k="TOGGLE_MODAL",N="HANDLE_CHANGE",S="ADD_ACTIVITIES",T="SORT_ACTIVITIES",D="UPDATE_ACTIVITY",z="DELETE_ACTIVITY",M="SORT_CHECK_ACTIVITY",x="SORT_ACTIVE_ACTIVITIES",_="SET_DECREAMENT_MINUTES",R="SET_ARCHRIVE_ACTIVITIES",F="SORT_NONACTIVE_ACTIVITIES",P=function(e,t){return e.activities.filter((function(e){return e.id!==t.payload}))},V=function(e,t){return e.activitiesActive.filter((function(e){return e.id!==t.payload}))},H=function(e,t){return e.activitiesNonActive.filter((function(e){return e.id!==t.payload}))},L=function(e,t,i,a){return e.activities.map((function(e){return e.id===t.id&&!1===e.completed&&(e.name=t.name,e.completed=t.completed,e.timeSet=i-a),e}))},W=function(e,t){return e.activities.map((function(e){return e.id===t.id&&!0===e.completed&&(e.name=t.name,e.completed=t.completed,e.timeSet=NaN),e}))},Y=function(e){var t=[];e.activities.map((function(e){return!0!==e.completed?t.push(Object(h.a)(Object(h.a)({},e),{},{timeSet:e.timeSet})):t}));var i=t.filter((function(e){return void 0!==e}));return i},B=function(e){var t=[];e.activities.map((function(e){return!0===e.completed?t.push(Object(h.a)({},e)):t}));var i=t.filter((function(e){return void 0!==e}));return i},G=function(e,t){var i=e.payload,a=i.destination,n=i.source;if(a){var s=Array.from(t.activitiesActive),c=s.splice(n.index,1),l=Object(r.a)(c,1)[0];return s.splice(a.index,0,l),Object(w.a)(s)}},U=function(e,t){if(e.payload.destination){var i=Array.from(t.activities),a=i.splice(e.payload.source.index,1),n=Object(r.a)(a,1)[0];return i.splice(e.payload.destination.index,0,n),Object(w.a)(i)}},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case N:var i=t.payload.target,a=i.value,n=i.name;return Object(h.a)(Object(h.a)({},e),{},Object(u.a)({},n,a));case x:return Object(h.a)(Object(h.a)({},e),{},{activitiesActive:Y(e)});case F:return Object(h.a)(Object(h.a)({},e),{},{activitiesNonActive:B(e)});case S:t.payload.preventDefault();var s=e.setName,c=e.timeSet,r=new Date,l=60*r.getHours()+r.getMinutes(),o=60*Number(c.split(":")[0])+Number(c.split(":")[1]);if(o>l){var d={id:Object(I.a)(),name:s,completed:!1,timeSet:o-l};return Object(h.a)(Object(h.a)({},e),{},{setName:"",timeSet:"",activities:[].concat(Object(w.a)(e.activities),[d])})}return alert("Please choose a upcoming time"),Object(h.a)({},e);case T:return Object(h.a)(Object(h.a)({},e),{},{activitiesActive:G(t,e)});case M:return Object(h.a)(Object(h.a)({},e),{},{activities:U(t,e)});case R:if(void 0!==e.activities&&void 0!==e.activities){var m,p,b=[];return e.activitiesActive.map((function(i){if(i.id===t.payload){var a={id:i.id,timeSet:NaN,name:i.name,completed:!0};return b.push(a)}return m=e.activities.map((function(e){return e.id===t.payload?{id:e.id,timeSet:NaN,name:e.name,completed:!0}:{id:e.id,name:e.name,timeSet:e.timeSet,completed:e.completed}})),p=m.filter((function(e){return!1===e.completed})),i})),Object(h.a)(Object(h.a)({},e),{},{activitiesNonActive:[].concat(b,Object(w.a)(e.activitiesNonActive)),activities:m,activitiesActive:p})}return Object(h.a)({},e);case _:var v=e.activitiesActive.map((function(e){return Object(h.a)(Object(h.a)({},e),{},{timeSet:e.timeSet-1})})),O=v.filter((function(e){return void 0!==e})),j=[].concat(Object(w.a)(v),Object(w.a)(e.activitiesNonActive)),y=[];v.map((function(e){return e.timeSet<=0?y.push(e):y}));var g=y.filter((function(e){return void 0!==e&&!1===e.completed}));return Object(h.a)(Object(h.a)({},e),{},{activities:j,activitiesActive:O,notifiedItem:g});case C:var f=e.activitiesNonActive;return Object(h.a)(Object(h.a)({},e),{},{activitiesActive:[],activities:f});case k:return Object(h.a)(Object(h.a)({},e),{},{setName:"",setId:t.payload.setId,showModal:t.payload.showModal,setCompleted:t.payload.setCompleted,setValidTime:t.payload.setValidTime});case D:var E=new Date,q=60*E.getHours()+E.getMinutes(),J=60*Number(e.timeSet.split(":")[0])+Number(e.timeSet.split(":")[1]),K=t.payload;return J&&""!==K.name&&""!==K.timeSet&&J>q?Object(h.a)(Object(h.a)({},e),{},{setId:"",setName:"",timeSet:"",setValidTime:0,showModal:!1,activities:L(e,K,J,q)}):J||""===K.name||""!==K.timeSet?(alert("Please choose a upcoming time"),Object(h.a)({},e)):Object(h.a)(Object(h.a)({},e),{},{setId:"",setName:"",timeSet:"",setValidTime:0,showModal:!1,activities:W(e,K)});case z:return Object(h.a)(Object(h.a)({},e),{},{activities:P(e,t),activitiesActive:V(e,t),activitiesNonActive:H(e,t)});default:return e}},J=function(e,t){return"https://api.openweathermap.org/data/2.5/weather?q=".concat(e,"&appid=").concat(t)},K=function(e){return{type:N,payload:e}},Q=function(e){return{type:k,payload:e}},X=i(33),$=i.n(X),Z=i(45),ee=i(46),te=i.n(ee),ie=Object(m.b)((function(e){var t=e.weather;return{isPending:t.isPending,defaultCity:t.defaultCity,givenCityName:t.givenCityName,weatherReport:t.weatherReport,weatherStatus:t.weatherStatus,basicWeatherData:t.basicWeatherData}}),(function(e){return{changeWeather:function(t){return e({type:O,payload:t})},handleWeatherChange:function(t){return e({type:v,payload:t})}}}))((function(e){var t=e.isPending,i=e.weatherReport,a=e.weatherStatus,s=e.givenCityName,c=e.changeWeather,r=e.basicWeatherData,l=e.handleWeatherChange,o=r.temp,d=r.temp_min,m=r.temp_max,u=r.humidity,h=r.pressure,p=r.feels_like,b=i.name;return n.a.createElement(n.a.Fragment,null,t?n.a.createElement("div",null,"Cannot fetch weather data"):n.a.createElement(n.a.Fragment,null,n.a.createElement("h3",null,"Weather in ",b," : ",(o-273).toFixed(2)," \xb0C"),n.a.createElement("div",null,"Feels like ",(p-273).toFixed(2)," \xb0C"),n.a.createElement("div",null,"Humidity ",u),n.a.createElement("div",null,"Pressure ",h),n.a.createElement("div",null,"Max temp ",(m-273).toFixed(2)," \xb0C"),n.a.createElement("div",null,"Min temp ",(d-273).toFixed(2)," \xb0C"),n.a.createElement("div",null,"Description: ",a.description),n.a.createElement(ce,{type:"text",name:"givenCityName",value:s,handleChange:l,label:"Check other cities weather",required:!0}),n.a.createElement(ve,{onClick:c},"Change")))})),ae=Object(m.b)((function(e){return{activitiesNonActive:e.activities.activitiesNonActive}}))((function(e){var t=e.activitiesNonActive;return n.a.createElement(n.a.Fragment,null,n.a.createElement("h3",null,"Archive"),n.a.createElement("div",null,t.map((function(e){return n.a.createElement("div",{key:e.id},e.completed?n.a.createElement("div",null,n.a.createElement("p",null,e.name," - task accomplised ")):null)}))))})),ne=function(e){var t=e.style;return n.a.createElement("ul",{style:t},n.a.createElement(l.b,{to:{pathname:"/Activity-App/"}},n.a.createElement("li",{style:o.menuListStyle},"Dashboard")),n.a.createElement(l.b,{to:{pathname:"/Activity-App/create"}},n.a.createElement("li",{style:o.menuListStyle},"Create Activities")),n.a.createElement(l.b,{to:{pathname:"/Activity-App/check"}},n.a.createElement("li",{style:o.menuListStyle},"Check all activities")))},se=i(26),ce=(i(79),function(e){var t=e.handleChange,i=e.label,a=Object(se.a)(e,["handleChange","label"]);return n.a.createElement("div",{className:"group"},n.a.createElement("input",Object.assign({className:"form-input",onChange:t},a)),i?n.a.createElement("label",{className:"".concat(a.value.length?"shrink":""," form-input-label")},i):null)}),re=i(18),le=i(19),oe=i(21),de=i(20),me=[{id:Object(I.a)(),descripion:"clear sky",listItems:[{id:Object(I.a)(),items:"Clear Sky outside"},{id:Object(I.a)(),items:"Go out and do your activity"}]},{id:Object(I.a)(),descripion:"broken clouds",listItems:[{id:Object(I.a)(),items:"Broken Clouds are visible"},{id:Object(I.a)(),items:"Might rain within half an hour"},{id:Object(I.a)(),items:"Make sure you take umbrella"}]},{id:Object(I.a)(),descripion:"few clouds",listItems:[{id:Object(I.a)(),items:"Few clouds outside"},{id:Object(I.a)(),items:"Not gonna rain within hour"},{id:Object(I.a)(),items:"So, you can do some activity"}]},{id:Object(I.a)(),descripion:"shower rain",listItems:[{id:Object(I.a)(),items:"Its raining like shower"},{id:Object(I.a)(),items:"Make sure you take umbrella"}]},{id:Object(I.a)(),descripion:"rain",listItems:[{id:Object(I.a)(),items:"Its raining outside"},{id:Object(I.a)(),items:"Make sure you take umbrella"}]},{id:Object(I.a)(),descripion:"thunderstorm",listItems:[{id:Object(I.a)(),items:"Its thunderstorm"},{id:Object(I.a)(),items:"Don't go outside! Just Don't"}]},{id:Object(I.a)(),descripion:"mist",listItems:[{id:Object(I.a)(),items:"Mist! an example of a dispersion"},{id:Object(I.a)(),items:"You might start your activity"}]},{id:Object(I.a)(),descripion:"thunderstorm with light rain",listItems:[{id:Object(I.a)(),items:"Its thunderstorm with light rain"},{id:Object(I.a)(),items:"Don't go outside. Just don't"}]},{id:Object(I.a)(),descripion:"thunderstorm with rain",listItems:[{id:Object(I.a)(),items:"Its thunderstorm with rain"},{id:Object(I.a)(),items:"Don't go outside! Just Don't"}]},{id:Object(I.a)(),descripion:"thunderstorm with heavy rain",listItems:[{id:Object(I.a)(),items:"Its thunderstorm with heavy rain"},{id:Object(I.a)(),items:"Don't go outside! Just Don't"}]},{id:Object(I.a)(),descripion:"light thunderstorm",listItems:[{id:Object(I.a)(),items:"Its light thunderstorm outside"},{id:Object(I.a)(),items:"Don't go outside. No activity outside"}]},{id:Object(I.a)(),descripion:"heavy thunderstorm",listItems:[{id:Object(I.a)(),items:"Its heavy thunderstorm outside"},{id:Object(I.a)(),items:"Don't go outside. Just don't"}]},{id:Object(I.a)(),descripion:"ragged thunderstorm",listItems:[{id:Object(I.a)(),items:"Its ragged thunderstorm outside"},{id:Object(I.a)(),items:"Don't go outside"}]},{id:Object(I.a)(),descripion:"thunderstorm with light drizzle",listItems:[{id:Object(I.a)(),items:"Its thunderstorm with light drizzle"},{id:Object(I.a)(),items:"Don't go outside. Just don't"}]},{id:Object(I.a)(),descripion:"thunderstorm with drizzle",listItems:[{id:Object(I.a)(),items:"Its thunderstorm with drizzle"},{id:Object(I.a)(),items:"Don't go outside. Just don't"}]},{id:Object(I.a)(),descripion:"thunderstorm with heavy drizzle",listItems:[{id:Object(I.a)(),items:"Its thunderstorm with heavy drizzle"},{id:Object(I.a)(),items:"Don't go outside. Just don't"}]},{id:Object(I.a)(),descripion:"light intensity drizzle",listItems:[{id:Object(I.a)(),items:"There's light intensity of drizzle outside"},{id:Object(I.a)(),items:"You can do activity"}]},{id:Object(I.a)(),descripion:"drizzle",listItems:[{id:Object(I.a)(),items:"Its drizzely outside"},{id:Object(I.a)(),items:"Walk carefully outside."}]},{id:Object(I.a)(),descripion:"heavy intensity drizzle",listItems:[{id:Object(I.a)(),items:"There's heavy intensity of drizzle outside"},{id:Object(I.a)(),items:"Make sure you have a good shoe while walking"}]},{id:Object(I.a)(),descripion:"light intensity drizzle rain",listItems:[{id:Object(I.a)(),items:"Its light intensity of drizzle with rain outside"},{id:Object(I.a)(),items:"You can go out if want"}]},{id:Object(I.a)(),descripion:"drizzle rain",listItems:[{id:Object(I.a)(),items:"Its just drizzling rain outside"},{id:Object(I.a)(),items:"Try to use mask while walking"}]},{id:Object(I.a)(),descripion:"heavy intensity drizzle rain",listItems:[{id:Object(I.a)(),items:"Its heavy intensity of drizzle with rain outside"},{id:Object(I.a)(),items:"Better not to go outside"}]},{id:Object(I.a)(),descripion:"shower rain and drizzle",listItems:[{id:Object(I.a)(),items:"Its drizzly with showely rain"},{id:Object(I.a)(),items:"Better not to go out"}]},{id:Object(I.a)(),descripion:"heavy shower rain and drizzle",listItems:[{id:Object(I.a)(),items:"Its drizzly with heavy showely rain"},{id:Object(I.a)(),items:"Make sure you have an umbrealla while outside"}]},{id:Object(I.a)(),descripion:"shower drizzle",listItems:[{id:Object(I.a)(),items:"Its shower drizzle outside"},{id:Object(I.a)(),items:"Can perform some activities"}]},{id:Object(I.a)(),descripion:"light rain",listItems:[{id:Object(I.a)(),items:"Its raning lightly"},{id:Object(I.a)(),items:"Take umbrella while doing activities"}]},{id:Object(I.a)(),descripion:"moderate rain",listItems:[{id:Object(I.a)(),items:"Its now raining moderately outside"},{id:Object(I.a)(),items:"Take umbrella while doing activities"}]},{id:Object(I.a)(),descripion:"heavy intensity rain",listItems:[{id:Object(I.a)(),items:"Its raining with heavy intensity"},{id:Object(I.a)(),items:"No need to go outside"}]},{id:Object(I.a)(),descripion:"very heavy rain",listItems:[{id:Object(I.a)(),items:"Its raining with heavy intensity"},{id:Object(I.a)(),items:"No need to go outside"}]},{id:Object(I.a)(),descripion:"extreme rain",listItems:[{id:Object(I.a)(),items:"Its extreamly raining outside"},{id:Object(I.a)(),items:"No need to go outside"}]},{id:Object(I.a)(),descripion:"freezing rain",listItems:[{id:Object(I.a)(),items:"Its freezing outside and alos raining"},{id:Object(I.a)(),items:"Take a good jacket and umbrella while outside"}]},{id:Object(I.a)(),descripion:"light intensity shower rain",listItems:[{id:Object(I.a)(),items:"Its showely rain with light intensity"},{id:Object(I.a)(),items:"Make sure you've your umbrella with you"}]},{id:Object(I.a)(),descripion:"shower rain",listItems:[{id:Object(I.a)(),items:"Its showerly raining outside"},{id:Object(I.a)(),items:"Make sure you've your umbrella with you"}]},{id:Object(I.a)(),descripion:"heavy intensity shower rain",listItems:[{id:Object(I.a)(),items:"There's shower rain with heavy intensity"},{id:Object(I.a)(),items:"Dont go out for activites"}]},{id:Object(I.a)(),descripion:"ragged shower rain",listItems:[{id:Object(I.a)(),items:"Its raggy showery and rainy outside"},{id:Object(I.a)(),items:"Take umbrealla while going out"}]},{id:Object(I.a)(),descripion:"light snow",listItems:[{id:Object(I.a)(),items:"Its light snow outside"},{id:Object(I.a)(),items:"You can go and do activities"}]},{id:Object(I.a)(),descripion:"snow",listItems:[{id:Object(I.a)(),items:"Theres good snow outside"},{id:Object(I.a)(),items:"You can go and play with the snows"}]},{id:Object(I.a)(),descripion:"heavy snow",listItems:[{id:Object(I.a)(),items:"Its heavy snow outside"},{id:Object(I.a)(),items:"You can go and play with the snows"}]},{id:Object(I.a)(),descripion:"sleet",listItems:[{id:Object(I.a)(),items:"Its quite sleety outside"},{id:Object(I.a)(),items:"Careful while doing activties outside"}]},{id:Object(I.a)(),descripion:"light shower sleet",listItems:[{id:Object(I.a)(),items:"There is light crystal ice outside"},{id:Object(I.a)(),items:"No need to use winter shoes so far"}]},{id:Object(I.a)(),descripion:"shower sleet",listItems:[{id:Object(I.a)(),items:"Ices are now a crustal outside"},{id:Object(I.a)(),items:"Make sure you have your windter shoes"}]},{id:Object(I.a)(),descripion:"light rain and snow",listItems:[{id:Object(I.a)(),items:"Its raining lightly with some snow"},{id:Object(I.a)(),items:"You can go out to do some activites"}]},{id:Object(I.a)(),descripion:"rain and snow",listItems:[{id:Object(I.a)(),items:"Its raining and slowing same time"},{id:Object(I.a)(),items:"Take a jacket and umbrella while outside"}]},{id:Object(I.a)(),descripion:"light shower snow",listItems:[{id:Object(I.a)(),items:"Its snowing very lightly outside"},{id:Object(I.a)(),items:"You surely can do snow activities"}]},{id:Object(I.a)(),descripion:"shower snow",listItems:[{id:Object(I.a)(),items:"Its shower snow outside"},{id:Object(I.a)(),items:"You surely can do snow activities"}]},{id:Object(I.a)(),descripion:"heavy shower snow",listItems:[{id:Object(I.a)(),items:"Heavy shower snow is now outside"},{id:Object(I.a)(),items:"Not appropiate to do activities outside"}]},{id:Object(I.a)(),descripion:"smoke",listItems:[{id:Object(I.a)(),items:"Its smoky outside"},{id:Object(I.a)(),items:"Try to use mask while walking"}]},{id:Object(I.a)(),descripion:"haze",listItems:[{id:Object(I.a)(),items:"Its hazzy outside"},{id:Object(I.a)(),items:"Try to use mask while walking"}]},{id:Object(I.a)(),descripion:"sand/ dust whirls",listItems:[{id:Object(I.a)(),items:"Its quite sandy outside"},{id:Object(I.a)(),items:"Try to use mask while walking"}]},{id:Object(I.a)(),descripion:"fog",listItems:[{id:Object(I.a)(),items:"Its quite foggy outside"},{id:Object(I.a)(),items:"Be casefull outside while walking"}]},{id:Object(I.a)(),descripion:"sand",listItems:[{id:Object(I.a)(),items:"Its really sandy outside"},{id:Object(I.a)(),items:"Protect you nose, mouth, eyes while outside"}]},{id:Object(I.a)(),descripion:"dust",listItems:[{id:Object(I.a)(),items:"Its really dusty outside"},{id:Object(I.a)(),items:"Better not to go outside"}]},{id:Object(I.a)(),descripion:"volcanic ash",listItems:[{id:Object(I.a)(),items:"Volcanic ash are coming out"},{id:Object(I.a)(),items:"Don't do activities near there"}]},{id:Object(I.a)(),descripion:"squalls",listItems:[{id:Object(I.a)(),items:"Sudden violent wind and storm may happend"},{id:Object(I.a)(),items:"No need to go outside"}]},{id:Object(I.a)(),descripion:"tornado",listItems:[{id:Object(I.a)(),items:"Tornonado is striking hard"},{id:Object(I.a)(),items:"Go some safe place as soon as possible"}]},{id:Object(I.a)(),descripion:"few clouds: 11-25%",listItems:[{id:Object(I.a)(),items:"Looks there is few clouds outside"},{id:Object(I.a)(),items:"You can start your activities"}]},{id:Object(I.a)(),descripion:"scattered clouds: 25-50%",listItems:[{id:Object(I.a)(),items:"Clouds are pretty scattered outside"},{id:Object(I.a)(),items:"Rain may happend within an hour"}]},{id:Object(I.a)(),descripion:"broken clouds: 51-84%",listItems:[{id:Object(I.a)(),items:"Its almost half overcast outside"},{id:Object(I.a)(),items:"Make sure to take an umbrella"}]},{id:Object(I.a)(),descripion:"overcast clouds: 85-100%",listItems:[{id:Object(I.a)(),items:"Its almost overcast outside"},{id:Object(I.a)(),items:"Make sure to take an umbrella"}]},{id:Object(I.a)(),descripion:"overcast clouds",listItems:[{id:Object(I.a)(),items:"Its overcast outside"},{id:Object(I.a)(),items:"Make sure to take an umbrella"}]}];var ue=function(e){var t=e.desc;return n.a.createElement(n.a.Fragment,null,me.map((function(e){var i=e.id,a=e.descripion,s=e.listItems;return n.a.createElement(n.a.Fragment,{key:i},t===a?n.a.createElement("ul",null,s.map((function(e){return n.a.createElement("li",{key:e.id},e.items)}))):null)})))},he=function(e){Object(oe.a)(i,e);var t=Object(de.a)(i);function i(){return Object(re.a)(this,i),t.apply(this,arguments)}return Object(le.a)(i,[{key:"componentDidMount",value:function(){var e=this;setTimeout((function(){e.props.toggleVisible()}),5e3)}},{key:"componentDidUpdate",value:function(e,t,i){e.weatherStatus.icon!==this.props.weatherStatus.icon&&this.props.toggleLight()}},{key:"render",value:function(){var e=this.props,t=e.visible,i=e.weatherStatus,a=e.light;return n.a.createElement(n.a.Fragment,null,void 0!==i.description?n.a.createElement(n.a.Fragment,null,n.a.createElement("h3",null,"Suggestions"),t?n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{style:{display:"flex",flexDirection:"row",alignItems:"center"}},n.a.createElement("img",{src:"http://openweathermap.org/img/wn/".concat(i.icon,"@2x.png"),alt:""}),n.a.createElement("h4",null,i.description),"("," ",i?n.a.createElement("h4",null," ",a," "):null,")"),n.a.createElement(ue,{desc:i.description.toLowerCase()})):n.a.createElement("p",null,"No suggestions at this moment")):null)}}]),i}(n.a.Component),pe=Object(m.b)((function(e){var t=e.weather;return{light:t.light,visible:t.visible,weatherStatus:t.weatherStatus}}),(function(e){return{toggleLight:function(){return e({type:b})},toggleVisible:function(){return e({type:j})}}}))(he),be=function(){var e=Object(a.useState)(!1),t=Object(r.a)(e,2),i=t[0],s=t[1];return n.a.createElement(n.a.Fragment,null,n.a.createElement(ve,{onClick:function(){s(!i)}},i?"X":"+"),i&&n.a.createElement(je,{style:o.listSet,setActive:s}))},ve=(i(80),function(e){var t=e.children,i=Object(se.a)(e,["children"]);return n.a.createElement("button",Object.assign({className:"custom-button"},i),t)}),Oe=Object(m.b)((function(e){return{notifiedItem:e.activities.notifiedItem}}))((function(e){var t=e.notifiedItem;return n.a.createElement(n.a.Fragment,null,n.a.createElement("h3",null,"Notifications"),0===t.length?n.a.createElement("p",null,"No notifications at this moment"):t.length>-1&&t.map((function(e){return void 0!==e?n.a.createElement("p",{key:e.id},"Your task ",e.name," has started now "):e})))})),je=function(e){var t=e.style,i=e.setActive;return n.a.createElement("ul",{style:t},n.a.createElement(l.b,{to:{pathname:"/Activity-App/"}},n.a.createElement("li",{style:o.listStyle,onClick:function(){return i(!1)}},"Dashboard")),n.a.createElement(l.b,{to:{pathname:"/Activity-App/create"}},n.a.createElement("li",{style:o.listStyle,onClick:function(){return i(!1)}},"Create Activities")),n.a.createElement(l.b,{to:{pathname:"/Activity-App/check"}},n.a.createElement("li",{style:o.listStyle,onClick:function(){return i(!1)}},"Check all activities")))},ye=i(13),ge=Object(m.b)((function(e){return{activitiesActive:e.activities.activitiesActive}}),(function(e){return{sortActivities:function(t){return e({type:T,payload:t})},setArchriveActivities:function(t){return e({type:R,payload:t})}}}))((function(e){var t=e.sortActivities,i=e.activitiesActive,a=e.setArchriveActivities;return n.a.createElement(ye.a,{onDragEnd:function(e){return t(e)}},n.a.createElement("h3",null,"Activities on process"),void 0!==i?n.a.createElement(n.a.Fragment,null,i.length>0?n.a.createElement(ye.c,{droppableId:"activities"},(function(e){return n.a.createElement("div",Object.assign({},e.droppableProps,{ref:e.innerRef}),i.map((function(e,t){var i=e.id,s=e.name,c=e.timeSet,r=e.completed;return n.a.createElement(ye.b,{key:i,index:t,draggableId:i},(function(e){return n.a.createElement("div",Object.assign({key:i,ref:e.innerRef},e.draggableProps,e.dragHandleProps),r?null:n.a.createElement("div",null,n.a.createElement("h4",null,s),c>=0?n.a.createElement("p",null,c," ",1===c||0===c?n.a.createElement("span",null,"minute"):n.a.createElement("span",null,"minutes")," ","to go"):n.a.createElement("p",null,"You are ",Math.abs(c)," ",1===Math.abs(c)?n.a.createElement("span",null,"minute"):n.a.createElement("span",null,"minutes")," ","late"),n.a.createElement(ve,{onClick:function(){return a(i)}},"Move to Archive")))}))})),e.placeholder)})):n.a.createElement(n.a.Fragment,null,n.a.createElement("h4",null,"No more active projects"),n.a.createElement(l.b,{to:{pathname:"/Activity-App/create"}},n.a.createElement(ve,null,"Add Activity")))):window.location.reload())})),fe=(i(81),function(e){var t=e.children,i=e.customClass,a=e.show,s=e.closeCallback;return n.a.createElement("div",{className:"modal ".concat(i),style:{display:a?"block":"none"}},n.a.createElement("div",{className:"overlay",onClick:s}),n.a.createElement("div",{className:"modal_content"},t,n.a.createElement("button",{title:"Close",className:"close_modal",onClick:s},n.a.createElement("i",{className:"fas fa-times"}))))});fe.defaultProps={children:n.a.createElement("div",null,"Empty Modal"),customClass:"",show:!1,closeCallback:function(){return!1}};var Ee=fe,we=Object(m.b)((function(e){var t=e.activities;return{setId:t.setId,timeSet:t.timeSet,setName:t.setName,showModal:t.showModal,setValidTime:t.setValidTime,setCompleted:t.setCompleted}}),(function(e){return{toggleModal:function(t){return e(Q(t))},handleUpdate:function(t){return e({type:D,payload:t})},handleChange:function(t){return e(K(t))}}}))((function(e){var t=e.setId,i=e.timeSet,a=e.setName,s=e.showModal,c=e.toggleModal,r=e.setCompleted,l=e.setValidTime,d=e.handleUpdate,m=e.handleChange;return n.a.createElement(Ee,{show:s,className:"setView",closeCallback:function(){return c({showModal:!s})},customClass:"custom_modal_class"},n.a.createElement(n.a.Fragment,null,n.a.createElement("div",null,n.a.createElement(ce,{type:"text",name:"setName",value:a,handleChange:m,label:"Change activity name",required:!0}),l?n.a.createElement(ce,{type:"time",name:"timeSet",value:i,handleChange:m,required:!0}):null,n.a.createElement("div",{style:o.customButtonHolder},n.a.createElement(ve,{style:o.buttonSpace,onClick:function(){return c({showModal:!s})}},"Close"),n.a.createElement(ve,{onClick:function(){return d({id:t,name:a,timeSet:i,completed:r})}},"Update")))))})),Ie=i(4),Ae=(i(82),function(e){Object(oe.a)(i,e);var t=Object(de.a)(i);function i(){var e;Object(re.a)(this,i);for(var a=arguments.length,n=new Array(a),s=0;s<a;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).getActiveActivities=function(){e.props.sortActiveActivities()},e.getNonActiveActivities=function(){e.props.sortNonActiveActivities()},e}return Object(le.a)(i,[{key:"componentDidMount",value:function(){var e=this;this.getActiveActivities(),this.getNonActiveActivities(),setInterval((function(){e.props.setDecrementMinutes()}),6e4),this.props.mountWeather(this.props.defaultCity,this.props.API_KEY)}},{key:"componentDidUpdate",value:function(e,t,i){typeof e.activities!==typeof this.props.activities&&this.props.setDefined(),e.defaultCity!==this.props.defaultCity&&this.props.mountWeather(this.props.defaultCity,this.props.API_KEY)}},{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("h1",null,"Daily Activities"),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"child-container-1"},n.a.createElement(ge,null)),n.a.createElement("div",{className:"child-container-2"},n.a.createElement("div",{className:"cc-1"},n.a.createElement(Oe,null)),n.a.createElement("div",{className:"cc-2"},n.a.createElement(pe,null)),n.a.createElement("div",{className:"cc-3"},n.a.createElement(ae,null))),n.a.createElement("div",{className:"child-container-3"},n.a.createElement(ie,null))))}}]),i}(n.a.Component)),Ce=Object(m.b)((function(e){var t=e.activities.activities,i=e.weather,a=i.defaultCity;return{API_KEY:i.API_KEY,activities:t,defaultCity:a}}),(function(e){return{setDefined:function(){return e({type:C})},setDecrementMinutes:function(){return e({type:_})},sortActiveActivities:function(){return e({type:x})},sortNonActiveActivities:function(){return e({type:F})},mountWeather:function(t,i){return e(function(e,t){return function(){var i=Object(Z.a)($.a.mark((function i(a){var n;return $.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return a({type:g}),i.prev=1,i.next=4,te.a.get(J(e,t));case 4:n=i.sent,a({type:f,payload:n.data}),i.next=11;break;case 8:i.prev=8,i.t0=i.catch(1),a({type:y,payload:i.t0});case 11:case"end":return i.stop()}}),i,null,[[1,8]])})));return function(e){return i.apply(this,arguments)}}()}(t,i))}}}))(Ae),ke={LineThrogh:{textDecoration:"line-through"},Container:{display:"flex",alignItems:"center"},listChildOne:{opacity:.5,width:"0.7rem",height:"0.7rem",background:"green",marginRight:"1rem",borderRadius:"50%"},listChildTwo:{opacity:.5,width:"0.7rem",height:"0.7rem",background:"red",marginRight:"1rem",borderRadius:"50%"},ButtonRoundStyle:{opacity:.65,width:"2rem",height:"2rem",display:"flex",cursor:"pointer",background:"white",marginRight:"1rem",borderRadius:"50%",alignItems:"center",justifyContent:"center",border:"1px solid rgba(128,128,128, 0.5)"}},Ne=(i(83),[{id:1,value:"Activity Name"},{id:2,value:"Status"},{id:3,value:"Time Remaining"},{id:4,value:"Edit"},{id:5,value:"Delete"}]),Se=Object(m.b)((function(e){var t=e.activities;return{showModal:t.showModal,activities:t.activities}}),(function(e){return{toggleModal:function(t){return e(Q(t))},deleteActivity:function(t){return e({type:z,payload:t})},sortCheckActivities:function(t){return e({type:M,payload:t})}}}))((function(e){var t=e.sortCheckActivities,i=e.deleteActivity,a=e.toggleModal,s=e.activities,c=e.showModal;return n.a.createElement(ye.a,{onDragEnd:function(e){return t(e)}},n.a.createElement("div",{className:"moveTable"},void 0!==s?n.a.createElement(n.a.Fragment,null,n.a.createElement("h2",null,"All activities - total ",s.length," rows"),n.a.createElement("table",null,n.a.createElement("thead",null,n.a.createElement("tr",null,Ne.map((function(e){var t=e.id,i=e.value;return n.a.createElement("th",{key:t},i)})))),s.length>0?n.a.createElement(ye.c,{droppableId:"activities"},(function(e){return n.a.createElement("tbody",Object.assign({},e.droppableProps,{ref:e.innerRef}),s.map((function(e,t){return n.a.createElement(ye.b,{key:e.id,index:t,draggableId:e.id},(function(t){return n.a.createElement("tr",Object.assign({key:e.id,ref:t.innerRef},t.draggableProps,t.dragHandleProps),e.completed?n.a.createElement("td",{style:ke.LineThrogh},e.name):n.a.createElement("td",null,e.name),n.a.createElement("td",null,e.completed?n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{style:ke.Container},n.a.createElement("div",{style:ke.listChildOne}),n.a.createElement("span",null,"Task accomplished"))):n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{style:ke.Container},n.a.createElement("div",{style:ke.listChildTwo}),n.a.createElement("span",null,"Task ongoing")))),n.a.createElement("td",null,e.timeSet?n.a.createElement(n.a.Fragment,null,e.timeSet>1?n.a.createElement("span",null,e.timeSet," minutes"):n.a.createElement("span",null,e.timeSet," minute")):n.a.createElement("span",null,"0 minute")),n.a.createElement("td",null,n.a.createElement("div",{style:ke.ButtonRoundStyle,onClick:function(){return a({setId:e.id,showModal:!c,setValidTime:e.timeSet,setCompleted:e.completed})}},n.a.createElement("i",{className:"fas fa-pen"})),n.a.createElement(we,null)),n.a.createElement("td",null,n.a.createElement("div",{style:ke.ButtonRoundStyle,onClick:function(){return i(e.id)}},n.a.createElement("i",{className:"fas fa-trash"}))))}))})),e.placeholder)})):null),0===s.length?n.a.createElement("div",null,n.a.createElement("p",null,"No activites yet."),n.a.createElement(l.b,{to:{pathname:"/Activity-App/create"}},n.a.createElement(ve,null,"Add Activity"))):null):window.location.reload()))})),Te=function(e){Object(oe.a)(i,e);var t=Object(de.a)(i);function i(){return Object(re.a)(this,i),t.apply(this,arguments)}return Object(le.a)(i,[{key:"render",value:function(){var e=this.props,t=e.handleChange,i=e.setName,a=e.timeSet,s=e.addActivities;return n.a.createElement("div",{className:"container"},n.a.createElement("div",null,n.a.createElement("h1",null,"Add an activities"),n.a.createElement(ce,{type:"text",name:"setName",value:i,handleChange:t,label:"Give a activity name",required:!0}),n.a.createElement(ce,{type:"time",name:"timeSet",value:a,handleChange:t,required:!0}),n.a.createElement(ve,{onClick:function(e){return s(e)}},"Add")))}}]),i}(n.a.Component),De=Object(m.b)((function(e){var t=e.activities;return{setName:t.setName,timeSet:t.timeSet}}),(function(e){return{handleChange:function(t){return e(K(t))},addActivities:function(t){return e({type:S,payload:t})}}}))(Te);var ze=function(){return n.a.createElement("div",{className:"App"},n.a.createElement(d,null),n.a.createElement(Ie.c,null,n.a.createElement(Ie.a,{exact:!0,path:"/Activity-App",component:Ce}),n.a.createElement(Ie.a,{exact:!0,path:"/Activity-App/check",component:Se}),n.a.createElement(Ie.a,{exact:!0,path:"/Activity-App/create",component:De})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Me=i(9),xe=(i(84),Object(Me.c)({activities:q,weather:E})),_e=i(47),Re=[];Re=Object(w.a)(Re);var Fe=Object(Me.e)(xe,Me.a.apply(void 0,[_e.a].concat(Object(w.a)(Re))));c.a.render(n.a.createElement(m.a,{store:Fe},n.a.createElement(l.a,null,n.a.createElement(ze,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[48,1,2]]]);
//# sourceMappingURL=main.a878af15.chunk.js.map
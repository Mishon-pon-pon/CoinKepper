!function(t){var e={};function a(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,a),o.l=!0,o.exports}a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=0)}([function(t,e,a){"use strict";function n(t,e){this.Name=t,this.CategoryId=e}function o(t,e,a){this.id=a,this.Value=t,this.CategoryId=e}a.r(e);const i=new Vue({el:"#CategoriesDivContent",data:{categories:[]}}),r=new Vue({el:"#historyOperationDivContent",data:{sums:[]}}),u=function(t){return fetch(t,{method:"GET"}).then(t=>t.json())},d=function(t,e){return fetch(t,{method:"POST",body:JSON.stringify(e),headers:{Accept:"application/json","Content-Type":"application/json"}}).then(t=>t.json())},l=function(t,e){return fetch(t+`/${e}`,{method:"DELETE"}).then(t=>t.json())};const c={dataCache:[],update:function(t){let e=[];for(var a=0;a<t.length;a++)t[a].input="input",0!==t[a].Value&&e.push({name:t[a].Name,y:t[a].Value});var n,o;i.categories=t,n="container",o=e,Highcharts.chart(n,{chart:{plotBackgroundColor:null,plotBorderWidth:null,plotShadow:!1,type:"pie"},title:{text:"Ваши траты в процентах к общей сумме"},tooltip:{pointFormat:"{series.name}: <b>{point.percentage:.1f}%</b>"},plotOptions:{pie:{allowPointSelect:!0,cursor:"pointer",dataLabels:{enabled:!0,style:{color:Highcharts.theme&&Highcharts.theme.contrastTextColor||"black"}}}},series:[{name:"Вы потратили",colorByPoint:!0,data:o}]})},load:function(t){u(t).then(t=>{if(t){for(var e=0;e<t.length;e++)this.dataCache.push(Object.assign(new n(t[e].Name,t[e].CategoryId),new o(t[e].Value,t[e].CategoryId)));this.update(this.dataCache)}})},save:function(t,e){d(t,e).then(t=>{this.dataCache.push(Object.assign(new n(e.Name,t.CategoryId),new o(0,t.CategoryId))),this.update(this.dataCache)})},delete:function(t,e){l(t,e).then(t=>{for(var e=0;e<this.dataCache.length;e++)this.dataCache[e].CategoryId==t&&(this.dataCache.splice(e,1),this.update(this.dataCache))})}},s={dataCache:[],update:function(t){this.dataCache=t,r.sums=this.dataCache},load:function(t,e){u(t+`/${e}`).then(t=>{this.update(t)})},save:function(t,e){d(t,e).then(t=>{t&&c.dataCache.forEach(e=>{e.CategoryId==t.CategoryId&&(e.Value+=t.Value)}),c.update(c.dataCache)})},delete:function(t,e){l(t,e).then(t=>{for(let e=0;e<this.dataCache.length;e++){if(this.dataCache[e].SumId==t.SumId){let t=this.dataCache[e].Value;this.dataCache.splice(e,1);for(let e=0;e<c.dataCache.length;e++)c.dataCache[e].CategoryId==this.dataCache[0].CategoryId&&(c.dataCache[e].Value-=t)}this.update(this.dataCache),c.update(c.dataCache)}}).catch(t=>{t&&console.log(t)})}};document.addEventListener("DOMContentLoaded",()=>{c.load("/category/exist")}),document.getElementById("addCategory").addEventListener("click",()=>{let t=document.getElementById("categoryName").value;c.save("/category/new",new n(t,null)),document.getElementById("categoryName").value=""}),document.getElementById("body").addEventListener("click",t=>{if(t.target.getAttribute("button_delete")){let e=t.target.getAttribute("button_delete");c.delete("/category/delete",e)}if(t.target.getAttribute("button_addSum")){let e=t.target.getAttribute("button_addSum"),a=document.getElementById("input"+e).value;a&&(s.save("/sum/new",new o(a,e)),document.getElementById("input"+e).value="")}if(t.target.getAttribute("button_getSumHistory")){let e=t.target.getAttribute("button_getSumHistory");s.load("/sum/category",e)}if(t.target.getAttribute("button_rowEdit")){let e=t.target.getAttribute("button_rowEdit");$('[button_rowEdit = "'+e+'"]').toggle("hiden"),$('[button_rowSave = "'+e+'"]').toggle("hiden");$('[editRow_spanDate = "'+e+'"]').text(),$('[editRow_spanValue = "'+e+'"]').text();$('[editRow_inputDate = "'+e+'"]').prop("disabled",!1),$('[editRow_inputValue = "'+e+'"]').prop("disabled",!1)}if(t.target.getAttribute("button_rowSave")){let e=t.target.getAttribute("button_rowSave");$('[button_rowEdit = "'+e+'"]').toggle("hiden"),$('[button_rowSave = "'+e+'"]').toggle("hiden"),$('[editRow_inputDate = "'+e+'"]').prop("disabled",!0),$('[editRow_inputValue = "'+e+'"]').prop("disabled",!0)}if(t.target.getAttribute("button_deleteSum")){let e=t.target.getAttribute("button_deleteSum");s.delete("/sum/delete",e)}})}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vd2VicGFjay9Nb2RlbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi93ZWJwYWNrL1ZpZXcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vd2VicGFjay9Sb3V0ZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3dlYnBhY2svQ29udHJvbGxlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi93ZWJwYWNrL1ZpZXcvaGlnaGNoYXJ0cy5qcyIsIndlYnBhY2s6Ly8vLi93ZWJwYWNrL2luZGV4LmpzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiQ2F0ZWdvcnkiLCJpZCIsInRoaXMiLCJOYW1lIiwiQ2F0ZWdvcnlJZCIsIlN1bSIsImNhdGVnb3J5SWQiLCJWYWx1ZSIsInZ1ZSIsIlZ1ZSIsImVsIiwiZGF0YSIsImNhdGVnb3JpZXMiLCJ2dWVIaXN0b3J5Iiwic3VtcyIsInJvdXRlcnMiLCJ1cmwiLCJmZXRjaCIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCJqc29uIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwiQ2F0ZWdvcnlDb250cm9sbGVyIiwiZGF0YUNhY2hlIiwidXBkYXRlIiwiaGlnaENoYXJ0RGF0YSIsImxlbmd0aCIsInB1c2giLCJ5IiwiZWxlbWVudElkIiwiY2hhcnREYXRhIiwiSGlnaGNoYXJ0cyIsImNoYXJ0IiwicGxvdEJhY2tncm91bmRDb2xvciIsInBsb3RCb3JkZXJXaWR0aCIsInBsb3RTaGFkb3ciLCJ0eXBlIiwidGl0bGUiLCJ0ZXh0IiwidG9vbHRpcCIsInBvaW50Rm9ybWF0IiwicGxvdE9wdGlvbnMiLCJwaWUiLCJhbGxvd1BvaW50U2VsZWN0IiwiY3Vyc29yIiwiZGF0YUxhYmVscyIsImVuYWJsZWQiLCJzdHlsZSIsImNvbG9yIiwidGhlbWUiLCJjb250cmFzdFRleHRDb2xvciIsInNlcmllcyIsImNvbG9yQnlQb2ludCIsImxvYWQiLCJhc3NpZ24iLCJzYXZlIiwibmV3Q2F0ZWdvcnkiLCJjYXRlZ29yeSIsImRlbGV0ZSIsInNwbGljZSIsIlN1bUNvbnRyb2xsZXIiLCJuZXdTdW0iLCJzdW0iLCJmb3JFYWNoIiwiaXRlbSIsIlN1bUlkIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJDYXRlZ29yeU5hbWUiLCJldmVudCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsIiQiLCJ0b2dnbGUiLCJwcm9wIl0sIm1hcHBpbmdzIjoiYUFDRSxJQUFJQSxFQUFtQixHQUd2QixTQUFTQyxFQUFvQkMsR0FHNUIsR0FBR0YsRUFBaUJFLEdBQ25CLE9BQU9GLEVBQWlCRSxHQUFVQyxRQUduQyxJQUFJQyxFQUFTSixFQUFpQkUsR0FBWSxDQUN6Q0csRUFBR0gsRUFDSEksR0FBRyxFQUNISCxRQUFTLElBVVYsT0FOQUksRUFBUUwsR0FBVU0sS0FBS0osRUFBT0QsUUFBU0MsRUFBUUEsRUFBT0QsUUFBU0YsR0FHL0RHLEVBQU9FLEdBQUksRUFHSkYsRUFBT0QsUUFLZkYsRUFBb0JRLEVBQUlGLEVBR3hCTixFQUFvQlMsRUFBSVYsRUFHeEJDLEVBQW9CVSxFQUFJLFNBQVNSLEVBQVNTLEVBQU1DLEdBQzNDWixFQUFvQmEsRUFB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WSxHQUM1REYsRUFBRSwwQkFBNEJaLEVBQVEsTUFBTWMsS0FBSyxZQUFZLEdBRWpFLEdBQUdMLEVBQU1DLE9BQU9DLGFBQWEsa0JBQW1CLENBQzVDLElBQUlYLEVBQVFTLEVBQU1DLE9BQU9DLGFBQWEsa0JBQ3RDQyxFQUFFLHNCQUF3QlosRUFBUSxNQUFNYSxPQUFPLFNBQy9DRCxFQUFFLHNCQUF3QlosRUFBUSxNQUFNYSxPQUFPLFNBSy9DRCxFQUFFLHlCQUEyQlosRUFBUSxNQUFNYyxLQUFLLFlBQVksR0FDNURGLEVBQUUsMEJBQTRCWixFQUFRLE1BQU1jLEtBQUssWUFBWSxHQUVqRSxHQUFHTCxFQUFNQyxPQUFPQyxhQUFhLG9CQUFxQixDQUM5QyxJQUFJWCxFQUFRUyxFQUFNQyxPQUFPQyxhQUFhLG9CQUN0Q2hCLEVBQWNGLE9BQU8sY0FBZU8iLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qbW9kZWwqL1xyXG5leHBvcnQgZnVuY3Rpb24gQ2F0ZWdvcnkobmFtZSwgaWQpIHtcclxuICAgIHRoaXMuTmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLkNhdGVnb3J5SWQgPSBpZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFN1bSh2YWx1ZSwgY2F0ZWdvcnlJZCwgaWQpIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMuVmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuQ2F0ZWdvcnlJZCA9IGNhdGVnb3J5SWQ7XHJcbn0iLCJcclxuLyp2aWV3Ki9cclxuZXhwb3J0IGNvbnN0IHZ1ZSA9IG5ldyBWdWUoe1xyXG4gICAgZWw6ICcjQ2F0ZWdvcmllc0RpdkNvbnRlbnQnLFxyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGNhdGVnb3JpZXM6IFtdXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IHZ1ZUhpc3RvcnkgPSBuZXcgVnVlKHtcclxuICAgIGVsOiAnI2hpc3RvcnlPcGVyYXRpb25EaXZDb250ZW50JyxcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBzdW1zOiBbXVxyXG4gICAgfVxyXG59KSIsIi8qIHJvdXRlcnMgKi9cclxuZXhwb3J0IGNvbnN0IHJvdXRlcnMgPSB7XHJcbiAgICBnZXQ6IGZ1bmN0aW9uICh1cmwpIHtcclxuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH0sXHJcbiAgICBwb3N0OiBmdW5jdGlvbiAodXJsLCBib2R5KSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH0sXHJcbiAgICBkZWxldGU6IGZ1bmN0aW9uICh1cmwsIGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCArIGAvJHtpZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURSdcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IENhdGVnb3J5LCBTdW0gfSBmcm9tIFwiLi4vTW9kZWxcIjtcclxuaW1wb3J0IHsgdnVlLCB2dWVIaXN0b3J5IH0gZnJvbSBcIi4uL1ZpZXcvaW5kZXhcIjtcclxuaW1wb3J0IHsgcm91dGVycyB9IGZyb20gXCIuLi9Sb3V0ZXJzXCI7XHJcbmltcG9ydCB7IGhpZ2hDaGFydCB9IGZyb20gXCIuLi9WaWV3L2hpZ2hjaGFydHNcIjtcclxuXHJcbi8qY29udHJvbGxlcnMqL1xyXG5cclxuLyogQ2F0ZWdvcnlDb250cm9sbGVyICovXHJcbmV4cG9ydCBjb25zdCBDYXRlZ29yeUNvbnRyb2xsZXIgPSB7XHJcbiAgICBkYXRhQ2FjaGU6IFtdLFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGxldCBoaWdoQ2hhcnREYXRhID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhdGFbaV1bJ2lucHV0J10gPSAnaW5wdXQnO1xyXG4gICAgICAgICAgICBpZiAoZGF0YVtpXS5WYWx1ZSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgaGlnaENoYXJ0RGF0YS5wdXNoKHsgbmFtZTogZGF0YVtpXS5OYW1lLCB5OiBkYXRhW2ldLlZhbHVlIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdnVlLmNhdGVnb3JpZXMgPSBkYXRhO1xyXG4gICAgICAgIGhpZ2hDaGFydCgnY29udGFpbmVyJywgaGlnaENoYXJ0RGF0YSk7XHJcbiAgICB9LFxyXG4gICAgbG9hZDogZnVuY3Rpb24gKHVybCkge1xyXG4gICAgICAgIHJvdXRlcnMuZ2V0KHVybClcclxuICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcmllcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2F0ZWdvcmllcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2F0ZWdvcmllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFDYWNoZS5wdXNoKE9iamVjdC5hc3NpZ24obmV3IENhdGVnb3J5KGNhdGVnb3JpZXNbaV0uTmFtZSwgY2F0ZWdvcmllc1tpXS5DYXRlZ29yeUlkKSwgbmV3IFN1bShjYXRlZ29yaWVzW2ldLlZhbHVlLCBjYXRlZ29yaWVzW2ldLkNhdGVnb3J5SWQpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKHRoaXMuZGF0YUNhY2hlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2F2ZTogZnVuY3Rpb24gKHVybCwgbmV3Q2F0ZWdvcnkpIHtcclxuICAgICAgICByb3V0ZXJzLnBvc3QodXJsLCBuZXdDYXRlZ29yeSlcclxuICAgICAgICAgICAgLnRoZW4oY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2FjaGUucHVzaChPYmplY3QuYXNzaWduKG5ldyBDYXRlZ29yeShuZXdDYXRlZ29yeS5OYW1lLCBjYXRlZ29yeS5DYXRlZ29yeUlkKSwgbmV3IFN1bSgwLCBjYXRlZ29yeS5DYXRlZ29yeUlkKSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUodGhpcy5kYXRhQ2FjaGUpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZTogZnVuY3Rpb24gKHVybCwgaWQpIHtcclxuICAgICAgICByb3V0ZXJzLmRlbGV0ZSh1cmwsIGlkKVxyXG4gICAgICAgICAgICAudGhlbihpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YUNhY2hlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YUNhY2hlW2ldLkNhdGVnb3J5SWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2FjaGUuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLmRhdGFDYWNoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG4vKiBTdW1Db250cm9sbGVyICovXHJcbmV4cG9ydCBjb25zdCBTdW1Db250cm9sbGVyID0ge1xyXG4gICAgZGF0YUNhY2hlOiBbXSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGFDYWNoZSA9IGRhdGE7XHJcbiAgICAgICAgdnVlSGlzdG9yeS5zdW1zID0gdGhpcy5kYXRhQ2FjaGU7XHJcbiAgICB9LFxyXG4gICAgbG9hZDogZnVuY3Rpb24gKHVybCwgaWQpIHtcclxuICAgICAgICByb3V0ZXJzLmdldCh1cmwgKyBgLyR7aWR9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKHJlcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIHNhdmU6IGZ1bmN0aW9uICh1cmwsIG5ld1N1bSkge1xyXG4gICAgICAgIHJvdXRlcnMucG9zdCh1cmwsIG5ld1N1bSlcclxuICAgICAgICAgICAgLnRoZW4oc3VtID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzdW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBDYXRlZ29yeUNvbnRyb2xsZXIuZGF0YUNhY2hlLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLkNhdGVnb3J5SWQgPT0gc3VtLkNhdGVnb3J5SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uVmFsdWUgKz0gc3VtLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBDYXRlZ29yeUNvbnRyb2xsZXIudXBkYXRlKENhdGVnb3J5Q29udHJvbGxlci5kYXRhQ2FjaGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBkZWxldGU6IGZ1bmN0aW9uICh1cmwsIGlkKSB7XHJcbiAgICAgICAgcm91dGVycy5kZWxldGUodXJsLCBpZClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhQ2FjaGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhQ2FjaGVbaV0uU3VtSWQgPT0gcmVzLlN1bUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBWYWx1ZSA9IHRoaXMuZGF0YUNhY2hlW2ldLlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFDYWNoZS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgQ2F0ZWdvcnlDb250cm9sbGVyLmRhdGFDYWNoZS5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKENhdGVnb3J5Q29udHJvbGxlci5kYXRhQ2FjaGVbbl0uQ2F0ZWdvcnlJZCA9PSB0aGlzLmRhdGFDYWNoZVswXS5DYXRlZ29yeUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2F0ZWdvcnlDb250cm9sbGVyLmRhdGFDYWNoZVtuXS5WYWx1ZSAtPSBWYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSh0aGlzLmRhdGFDYWNoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgQ2F0ZWdvcnlDb250cm9sbGVyLnVwZGF0ZShDYXRlZ29yeUNvbnRyb2xsZXIuZGF0YUNhY2hlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7IGlmIChlcnIpIGNvbnNvbGUubG9nKGVycikgfSk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZnVuY3Rpb24gaGlnaENoYXJ0KGVsZW1lbnRJZCwgY2hhcnREYXRhKSB7XHJcbiAgICBkZWJ1Z2dlcjtcclxuICAgIHJldHVybiBIaWdoY2hhcnRzLmNoYXJ0KGVsZW1lbnRJZCwge1xyXG4gICAgICAgIGNoYXJ0OiB7XHJcbiAgICAgICAgICAgIHBsb3RCYWNrZ3JvdW5kQ29sb3I6IG51bGwsXHJcbiAgICAgICAgICAgIHBsb3RCb3JkZXJXaWR0aDogbnVsbCxcclxuICAgICAgICAgICAgcGxvdFNoYWRvdzogZmFsc2UsXHJcbiAgICAgICAgICAgIHR5cGU6ICdwaWUnXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0aXRsZToge1xyXG4gICAgICAgICAgICB0ZXh0OiAn0JLQsNGI0Lgg0YLRgNCw0YLRiyDQsiDQv9GA0L7RhtC10L3RgtCw0YUg0Log0L7QsdGJ0LXQuSDRgdGD0LzQvNC1J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9vbHRpcDoge1xyXG4gICAgICAgICAgICBwb2ludEZvcm1hdDogJ3tzZXJpZXMubmFtZX06IDxiPntwb2ludC5wZXJjZW50YWdlOi4xZn0lPC9iPidcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsb3RPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIHBpZToge1xyXG4gICAgICAgICAgICAgICAgYWxsb3dQb2ludFNlbGVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgZGF0YUxhYmVsczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IChIaWdoY2hhcnRzLnRoZW1lICYmIEhpZ2hjaGFydHMudGhlbWUuY29udHJhc3RUZXh0Q29sb3IpIHx8ICdibGFjaydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNlcmllczogW3tcclxuICAgICAgICAgICAgbmFtZTogJ9CS0Ysg0L/QvtGC0YDQsNGC0LjQu9C4JyxcclxuICAgICAgICAgICAgY29sb3JCeVBvaW50OiB0cnVlLFxyXG4gICAgICAgICAgICBkYXRhOiBjaGFydERhdGFcclxuICAgICAgICB9XVxyXG4gICAgfSk7XHJcbn0iLCJpbXBvcnQgeyBDYXRlZ29yeUNvbnRyb2xsZXIsIFN1bUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9Db250cm9sbGVyXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5LCBTdW0gfSBmcm9tIFwiLi9Nb2RlbFwiO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgQ2F0ZWdvcnlDb250cm9sbGVyLmxvYWQoJy9jYXRlZ29yeS9leGlzdCcpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGRDYXRlZ29yeScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgbGV0IENhdGVnb3J5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXRlZ29yeU5hbWUnKS52YWx1ZTtcclxuICAgIENhdGVnb3J5Q29udHJvbGxlci5zYXZlKCcvY2F0ZWdvcnkvbmV3JywgbmV3IENhdGVnb3J5KENhdGVnb3J5TmFtZSwgbnVsbCkpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhdGVnb3J5TmFtZScpLnZhbHVlID0gJyc7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvZHknKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdidXR0b25fZGVsZXRlJykpIHtcclxuICAgICAgICBsZXQgQ2F0ZWdvcnlJZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2J1dHRvbl9kZWxldGUnKTtcclxuICAgICAgICBDYXRlZ29yeUNvbnRyb2xsZXIuZGVsZXRlKCcvY2F0ZWdvcnkvZGVsZXRlJywgQ2F0ZWdvcnlJZCk7XHJcbiAgICB9XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYnV0dG9uX2FkZFN1bScpKSB7XHJcbiAgICAgICAgbGV0IENhdGVnb3J5SWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdidXR0b25fYWRkU3VtJyk7XHJcbiAgICAgICAgbGV0IFZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0JyArIENhdGVnb3J5SWQpLnZhbHVlO1xyXG4gICAgICAgIGlmKFZhbHVlKSB7XHJcbiAgICAgICAgICAgIFN1bUNvbnRyb2xsZXIuc2F2ZSgnL3N1bS9uZXcnLCBuZXcgU3VtKFZhbHVlLCBDYXRlZ29yeUlkKSlcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0JyArIENhdGVnb3J5SWQpLnZhbHVlID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYnV0dG9uX2dldFN1bUhpc3RvcnknKSkge1xyXG4gICAgICAgIGxldCBDYXRlZ29yeUlkID0gZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYnV0dG9uX2dldFN1bUhpc3RvcnknKTtcclxuICAgICAgICBTdW1Db250cm9sbGVyLmxvYWQoJy9zdW0vY2F0ZWdvcnknLCBDYXRlZ29yeUlkKTtcclxuICAgIH1cclxuICAgIGlmKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2J1dHRvbl9yb3dFZGl0JykpIHtcclxuICAgICAgICBsZXQgU3VtSWQgPSBldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdidXR0b25fcm93RWRpdCcpO1xyXG4gICAgICAgICQoJ1tidXR0b25fcm93RWRpdCA9IFwiJyArIFN1bUlkICsgJ1wiXScpLnRvZ2dsZSgnaGlkZW4nKTtcclxuICAgICAgICAkKCdbYnV0dG9uX3Jvd1NhdmUgPSBcIicgKyBTdW1JZCArICdcIl0nKS50b2dnbGUoJ2hpZGVuJyk7XHJcbiAgICAgICAgLy8gJCgnW2VkaXRSb3dfc3BhbkRhdGUgPSBcIicgKyBTdW1JZCArICdcIl0nKS50b2dnbGUoJ2hpZGVuJyk7XHJcbiAgICAgICAgLy8gJCgnW2VkaXRSb3dfc3BhblZhbHVlID0gXCInICsgU3VtSWQgKyAnXCJdJykudG9nZ2xlKCdoaWRlbicpO1xyXG4gICAgICAgIC8vICQoJ1tlZGl0Um93X2lucHV0RGF0ZSA9IFwiJyArIFN1bUlkICsgJ1wiXScpLnRvZ2dsZSgnaGlkZW4nKTtcclxuICAgICAgICAvLyAkKCdbZWRpdFJvd19pbnB1dFZhbHVlID0gXCInICsgU3VtSWQgKyAnXCJdJykudG9nZ2xlKCdoaWRlbicpO1xyXG4gICAgICAgIGxldCBkYXRlID0gICQoJ1tlZGl0Um93X3NwYW5EYXRlID0gXCInICsgU3VtSWQgKyAnXCJdJykudGV4dCgpO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9ICQoJ1tlZGl0Um93X3NwYW5WYWx1ZSA9IFwiJyArIFN1bUlkICsgJ1wiXScpLnRleHQoKTtcclxuICAgICAgICAvLyAkKCdbZWRpdFJvd19pbnB1dERhdGUgPSBcIicgKyBTdW1JZCArICdcIl0nKS52YWwoZGF0ZSk7XHJcbiAgICAgICAgLy8gJCgnW2VkaXRSb3dfaW5wdXRWYWx1ZSA9IFwiJyArIFN1bUlkICsgJ1wiXScpLnZhbCh2YWx1ZSk7XHJcbiAgICAgICAgJCgnW2VkaXRSb3dfaW5wdXREYXRlID0gXCInICsgU3VtSWQgKyAnXCJdJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgJCgnW2VkaXRSb3dfaW5wdXRWYWx1ZSA9IFwiJyArIFN1bUlkICsgJ1wiXScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgaWYoZXZlbnQudGFyZ2V0LmdldEF0dHJpYnV0ZSgnYnV0dG9uX3Jvd1NhdmUnKSkge1xyXG4gICAgICAgIGxldCBTdW1JZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2J1dHRvbl9yb3dTYXZlJyk7XHJcbiAgICAgICAgJCgnW2J1dHRvbl9yb3dFZGl0ID0gXCInICsgU3VtSWQgKyAnXCJdJykudG9nZ2xlKCdoaWRlbicpO1xyXG4gICAgICAgICQoJ1tidXR0b25fcm93U2F2ZSA9IFwiJyArIFN1bUlkICsgJ1wiXScpLnRvZ2dsZSgnaGlkZW4nKTtcclxuICAgICAgICAvLyAkKCdbZWRpdFJvd19zcGFuRGF0ZSA9IFwiJyArIFN1bUlkICsgJ1wiXScpLnRvZ2dsZSgnaGlkZW4nKTtcclxuICAgICAgICAvLyAkKCdbZWRpdFJvd19zcGFuVmFsdWUgPSBcIicgKyBTdW1JZCArICdcIl0nKS50b2dnbGUoJ2hpZGVuJyk7XHJcbiAgICAgICAgLy8gJCgnW2VkaXRSb3dfaW5wdXREYXRlID0gXCInICsgU3VtSWQgKyAnXCJdJykudG9nZ2xlKCdoaWRlbicpO1xyXG4gICAgICAgIC8vICQoJ1tlZGl0Um93X2lucHV0VmFsdWUgPSBcIicgKyBTdW1JZCArICdcIl0nKS50b2dnbGUoJ2hpZGVuJyk7XHJcbiAgICAgICAgJCgnW2VkaXRSb3dfaW5wdXREYXRlID0gXCInICsgU3VtSWQgKyAnXCJdJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAkKCdbZWRpdFJvd19pbnB1dFZhbHVlID0gXCInICsgU3VtSWQgKyAnXCJdJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgIH1cclxuICAgIGlmKGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2J1dHRvbl9kZWxldGVTdW0nKSkge1xyXG4gICAgICAgIGxldCBTdW1JZCA9IGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2J1dHRvbl9kZWxldGVTdW0nKTtcclxuICAgICAgICBTdW1Db250cm9sbGVyLmRlbGV0ZSgnL3N1bS9kZWxldGUnLCBTdW1JZCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==
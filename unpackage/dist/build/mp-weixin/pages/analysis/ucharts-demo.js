(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/analysis/ucharts-demo"],{"46a9":function(e,t,a){"use strict";a.r(t);var i=a("dfb0"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,function(){return i[e]})}(o);t["default"]=n.a},"78fa":function(e,t,a){},"843e":function(e,t,a){"use strict";a.r(t);var i=a("8e03"),n=a("46a9");for(var o in n)"default"!==o&&function(e){a.d(t,e,function(){return n[e]})}(o);a("d795");var r=a("2877"),u=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,null,null);t["default"]=u.exports},"8e03":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},n=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return n})},d795:function(e,t,a){"use strict";var i=a("78fa"),n=a.n(i);n.a},dfb0:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,n=r(a("0f71")),o=a("7d4f");function r(e){return e&&e.__esModule?e:{default:e}}var u=null,s={data:function(){return{cWidth:"",cHeight:"",pixelRatio:1,serverData:""}},mounted:function(){i=this,this.cWidth=e.upx2px(750),this.cHeight=e.upx2px(500),this.getServerData()},methods:{getServerData:function(){console.log(o.demoData.data);var e={categories:[],series:[]};e.categories=o.demoData.data.ColumnB.categories,e.series=o.demoData.data.ColumnB.series,i.textarea=JSON.stringify(o.demoData.data.ColumnB),i.showColumn("canvasColumn",e)},showColumn:function(e,t){u=new n.default({$this:i,canvasId:e,type:"column",legend:!0,fontSize:11,background:"#FFFFFF",pixelRatio:i.pixelRatio,animation:!0,categories:t.categories,series:t.series,xAxis:{disableGrid:!0},yAxis:{},dataLabel:!0,width:i.cWidth*i.pixelRatio,height:i.cHeight*i.pixelRatio,extra:{column:{width:i.cWidth*i.pixelRatio*.45/t.categories.length}}})},changeData:function(){u.updateData({series:i.serverData.ColumnB.series,categories:i.serverData.ColumnB.categories})}}};t.default=s}).call(this,a("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/analysis/ucharts-demo-create-component',
    {
        'pages/analysis/ucharts-demo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("843e"))
        })
    },
    [['pages/analysis/ucharts-demo-create-component']]
]);                
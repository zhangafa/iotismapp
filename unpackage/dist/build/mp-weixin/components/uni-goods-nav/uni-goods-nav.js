(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-goods-nav/uni-goods-nav"],{"091e":function(n,t,o){"use strict";o.r(t);var u=o("d9a7"),e=o.n(u);for(var i in u)"default"!==i&&function(n){o.d(t,n,function(){return u[n]})}(i);t["default"]=e.a},"67e6":function(n,t,o){"use strict";o.r(t);var u=o("c7d4"),e=o("091e");for(var i in e)"default"!==i&&function(n){o.d(t,n,function(){return e[n]})}(i);o("6b8a");var c=o("2877"),a=Object(c["a"])(e["default"],u["a"],u["b"],!1,null,null,null);t["default"]=a.exports},"6b8a":function(n,t,o){"use strict";var u=o("b83f"),e=o.n(u);e.a},b83f:function(n,t,o){},c7d4:function(n,t,o){"use strict";var u=function(){var n=this,t=n.$createElement;n._self._c},e=[];o.d(t,"a",function(){return u}),o.d(t,"b",function(){return e})},d9a7:function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={name:"UniGoodsNav",props:{options:{type:Array,default:function(){return[{icon:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png",text:"店铺"},{icon:"https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png",text:"购物车"}]}},buttonGroup:{type:Array,default:function(){return[{text:"加入购物车",backgroundColor:"#ff0000",color:"#fff"},{text:"立即购买",backgroundColor:"#ffa200",color:"#fff"}]}},fill:{type:Boolean,default:!1}},methods:{onClick:function(n,t){this.$emit("click",{index:n,content:t})},buttonClick:function(t,o){n.report&&n.report(o.text,o.text),this.$emit("buttonClick",{index:t,content:o})}}};t.default=o}).call(this,o("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-goods-nav/uni-goods-nav-create-component',
    {
        'components/uni-goods-nav/uni-goods-nav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("67e6"))
        })
    },
    [['components/uni-goods-nav/uni-goods-nav-create-component']]
]);                
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"0395":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(n("66fd")),r=n("2f62");function u(t){return t&&t.__esModule?t:{default:t}}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){i(t,e,n[e])})}return t}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var c={computed:(0,r.mapGetters)(["user"]),onLaunch:function(){this.initSystem(),this.autoLogin()},methods:a({},(0,r.mapMutations)(["login"]),{appUpgrade:function(t){},autoLogin:function(){var e=this;if(this.user&&this.user.phoneno&&this.user.password){var n=[this.user.phoneno,this.user.password];t.showLoading({title:"自动登录中..."}),this.$api.login(n).then(function(n){e.login(e.user),t.hideLoading(),t.reLaunch({url:"/pages/index/index"})})}else t.reLaunch({url:"/pages/login/login"})},initSystem:function(){var e=this;t.getSystemInfo({success:function(t){e.appUpgrade(t.platform),o.default.prototype.StatusBar=t.statusBarHeight;var n=wx.getMenuButtonBoundingClientRect();o.default.prototype.Custom=n,o.default.prototype.CustomBar=n.bottom+n.top-t.statusBarHeight}})}})};e.default=c}).call(this,n("543d")["default"])},"2a87":function(t,e,n){"use strict";(function(t){n("e9d6"),n("921b");var e=a(n("66fd")),o=a(n("8715")),r=a(n("8bd3")),u=a(n("630e"));function a(t){return t&&t.__esModule?t:{default:t}}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),o.forEach(function(e){c(t,e,n[e])})}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.default.prototype.$store=r.default,e.default.prototype.$api=u.default,e.default.config.productionTip=!1,o.default.mpType="app";var f=new e.default(i({store:r.default},o.default));t(f).$mount()}).call(this,n("543d")["createApp"])},"3bc4":function(t,e,n){"use strict";var o=n("ce28"),r=n.n(o);r.a},8715:function(t,e,n){"use strict";n.r(e);var o=n("a700");for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);n("3bc4");var u,a,i=n("2877"),c=Object(i["a"])(o["default"],u,a,!1,null,null,null);e["default"]=c.exports},a700:function(t,e,n){"use strict";n.r(e);var o=n("0395"),r=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);e["default"]=r.a},ce28:function(t,e,n){}},[["2a87","common/runtime","common/vendor"]]]);
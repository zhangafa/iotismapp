<script>
	import Vue from 'vue'
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		computed: mapGetters(['user']),
		onLaunch: function() {
			this.initSystem()
			this.autoLogin()
		},
		methods: {
			...mapMutations(['login']),
			/* app整包更新检测 */
			appUpgrade(platform) {
				if (platform !== 'android') {
					return
				}
				//#ifdef APP-PLUS
				plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
					let params = {
						appid: plus.runtime.appid,
						version: wgtinfo.versionCode,
						platform: platform
					}
					this.$minApi.findUpgradeApp(params).then(appRes => {
						if (appRes.appid) {
							uni.showModal({
								title: "下载更新提示",
								content: appRes.note,
								showCancel: false,
								confirmText: '确定',
								success: sucRes => {
									if (sucRes.confirm) {
										plus.runtime.openURL(appRes.url)
										// uni.downloadFile({
										//     url: appRes.url,
										//     success: res => {}
										// })
									}
								}
							})
						}
					})
				})
				//#endif
			},
			/* 自动登录 */
			autoLogin() {
				// 判断本地是否有账号信息，如果有，就自动重新登录
				if (this.user && this.user.phoneno && this.user.password) {
					const params = [this.user.phoneno,this.user.password]
					uni.showLoading({
						title: '自动登录中...'
					})
					this.$api.login(params).then((res) => {
						this.login(this.user);
						return this.$api.getAllDicts(null)
					}).then(res => {
						uni.hideLoading()
						uni.reLaunch({
							url: '/pages/index/index'
						});
					})
				} else {
					// 如果本地没有账号信息，就提示用户必须登录
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			},
			//初始化系统
			initSystem() {
				const self = this
				uni.getSystemInfo({
					success: function(e) {
						// app整包更新检测
						self.appUpgrade(e.platform)

						// #ifndef MP
						Vue.prototype.StatusBar = e.statusBarHeight;
						
						if (e.platform == 'android') {
							Vue.prototype.CustomBar = e.statusBarHeight + 50;
						} else {
							Vue.prototype.CustomBar = e.statusBarHeight + 45;
						};
						// #endif

						// #ifdef MP-WEIXIN
						Vue.prototype.StatusBar = e.statusBarHeight;
						let custom = wx.getMenuButtonBoundingClientRect();
						Vue.prototype.Custom = custom;
						Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
						// #endif		

						// #ifdef MP-ALIPAY
						Vue.prototype.StatusBar = e.statusBarHeight;
						Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
						// #endif
					}
				})
			}
		}
	}
</script>

<style>
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import "./common/css/uni.css";

	/* colouui样式 */
	@import "./colorui/main.css";
	@import "./colorui/icon.css";

	/* 阿里字体样式 */
	@import "./common/css/iconfont.css";

	/* 自定义通用样式 */
	@import "./common/css/common.css";
</style>

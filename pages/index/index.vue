<template>
	<view>
		<uni-nav-bar :fixed="true" color="#333333" background-color="#4364F7" :border="false">
			<view class="input-view">
				<uni-icons type="search" size="22" color="#666666" />
				<input v-model="searchVal" confirm-type="search" class="input" type="text" placeholder="搜索工单/告警" @confirm="search">
				<uni-icons :color="'#999999'" v-if="searchVal!==''" class="icon-clear" type="clear" size="22" @click="clear" />
			</view>
		</uni-nav-bar>

		<uni-nav-bar :fixed="true" color="#333333" background-color="#4364F7" :border="false">
			<scroll-view scroll-x scroll-with-animation :scroll-left="scrollLeft" style="z-index: 9999;">
				<view class="tui-tabs-view tui-tabs-relative" style="height:80rpx;padding:0 30rpx;background:#FFFFFF;top:auto">
					<view v-for="(item, index) in tabbar" :key="index" class="tui-tabs-item" style="width:50%" @tap.stop="swichNav(index)">
						<view class="tui-tabs-title" :class="{'tui-tabs-active':currentTab==index,'tui-tabs-disabled':item.disabled}"
						 :style="{color:currentTab==index?'#5677fc':'#666',fontSize:'28rpx',lineHeight:'28rpx',fontWeight:false && currentTab==index?'bold':'normal'}">{{item.name}}</view>
					</view>
					<view class="tui-tabs-slider" :style="{transform:'translateX('+scrollLeft+'px)',width:'68rpx',height:'6rpx',bottom:'0rpx',background:'#5677fc'}"></view>
				</view>
			</scroll-view>
		</uni-nav-bar>

		<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab" :style="{height:winHeight+'px'}">
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<audit-order ref="auditOrderRef"></audit-order>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="scoll-y">
					<audit-alert ref="auditAlertRef"></audit-alert>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import auditAlert from './alert/audit-alert'
	import auditOrder from './order/audit-order'

	export default {
		components: {
			uniIcons,
			uniNavBar,
			auditAlert,
			auditOrder
		},
		data() {
			return {
				bgColor: '#FFFFFF',
				tabbar: [{
					name: '待处理工单'
				}, {
					name: '待处理告警'
				}],
				winHeight: "", // 窗口高度
				currentTab: 0, // 预设当前项的值
				scrollLeft: 0, // tab标题的滚动条位置
				searchVal: ''
			}
		},
		onLoad() {
			//高度自适应
			uni.getSystemInfo({
				success: res => {
					this.winHeight = res.windowHeight
					this.winWidth = res.windowWidth
					this.checkCor()
				}
			})
		},
		onShow(e) {
			let pages = getCurrentPages()
			let currPage = pages[pages.length - 1]
			if (currPage.isDoRefresh === true) {
				currPage.isDoRefresh = false
				this.search()
			}
		},
		methods: {
			// swichNav(e) {
			// 	this.currentTab = e.index
			// },
			// 滚动切换标签样式
			switchTab(e) {
				this.currentTab = e.detail.current
				this.checkCor()
			},
			// 判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCorSwitchTab() {
				if (this.currentTab > 3) {
					// 这里距离按实际计算
					this.scrollLeft = 300
				} else {
					this.scrollLeft = 0
				}
			},
			checkCor() {
				let tabsNum = this.tabbar.length
				let padding = this.winWidth / 750 * 30
				let width = this.winWidth - padding * 2
				let left = (width / tabsNum - (this.winWidth / 750 * 68)) / 2 + padding
				let scrollLeft = left
				if (this.currentTab > 0) {
					scrollLeft = scrollLeft + (width / tabsNum) * this.currentTab
				}
				this.scrollLeft = scrollLeft
			},
			// 点击标题切换当前页时改变样式
			swichNav(index) {
				let item = this.tabbar[index]
				if (item && item.disabled) return
				if (this.currentTab == index) {
					return false
				} else {
					this.currentTab = Number(index)
				}
			},
			search() {
				if (this.currentTab == 0) {
					this.$refs.auditOrderRef.queryByName(this.searchVal)
				} else if (this.currentTab == 1) {
					this.$refs.auditAlertRef.queryByName(this.searchVal)
				}
			},
			clear() {
				this.searchVal = ''
				this.search()
			}
		}
	}
</script>

<style>
	/* tab start */
	.tui-tabs-view {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 9999;
	}

	.tui-tabs-relative {
		position: relative;
	}

	.tui-tabs-fixed {
		position: fixed;
		left: 0;
	}

	.tui-tabs-fixed::before,
	.tui-tabs-relative::before {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tui-unlined::before {
		border-bottom: 0 !important
	}

	.tui-tabs-item {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-tabs-disabled {
		opacity: .6;
	}

	.tui-tabs-title {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		z-index: 2;
	}

	.tui-tabs-active {
		transition: all 0.15s ease-in-out;
	}

	.tui-tabs-slider {
		border-radius: 40rpx;
		position: absolute;
		left: 0;
		transition: all 0.15s ease-in-out;
		z-index: 0;
	}

	/* tab end */
</style>

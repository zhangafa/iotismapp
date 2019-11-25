<!-- 工单流程明细 -->
<template>
	<view>
		<view class="place-detail">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>工单信息
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">工单名称</view>
					<view class="flex-item-70">{{item.ticketTitle}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">问题描述</view>
					<view class="flex-item-70">{{item.desc}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white" v-if="opinionList && opinionList.length > 0">
				<view class="uni-flex uni-row">
					<view class="uni-timeline">
						<view v-for="(opinion,opIndex) in opinionList" :key="opinion.id" class="uni-timeline-item" :class="opIndex===0?'uni-timeline-first-item':(opIndex===(item.opinionList.length-1)?'uni-timeline-last-item':'')">
							<view class="uni-timeline-item-keynode">{{formatDate(opinion.executeTime)}}</view>
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<view>
									{{`${opinion.ticketTask.senderName}`}}
								</view>
								<view>
									<uni-tag :inverted="true" size="small" :text="formatTaskStatus(opinion.ticketTask.taskStatus).text" :type="formatTaskStatus(opinion.status).color"
									 :circle="false"></uni-tag>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
		<audit-idea ref="popupAuditIdeaRef" :isPass="isPass" @updateQuery="updateQuery"></audit-idea>
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import auditIdea from '@/pages/index/audit-idea.vue'
	import {
		filePreview,
		formatTaskStatus
	} from '@/common/utils/index.js'
	import {
		formatDate
	} from '@/common/utils/datetime.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			uniGoodsNav,
			uniTag,
			uniIcons,
			auditIdea
		},
		computed: {
			...mapState([
				'selectOrder'
			])
		},
		data() {
			return {
				isPass: false,
				item: {},
				options: [],
				buttonGroup: [{
						text: '返回',
						backgroundColor: '#333',
						color: '#fff'
					},
					{
						text: '执行',
						backgroundColor: '#39b54a',
						color: '#fff'
					}
				],
				opinionList: []
			}
		},
		onLoad(options) {
			try {
				if (options.data == this.selectOrder.id) {
					this.item = this.selectOrder
					this.getTicketHistory(this.item.ticketNo)
				}
			} catch (e) {
				this.item = {}
			}
		},
		methods: {
			formatDate,
			filePreview,
			formatTaskStatus,
			getTicketHistory(ticketNo) {
				this.$api.getByTicketNo(ticketNo).then(res => {
					this.opinionList = res.data
				})
			},
			onClick(e) {
				// uni.showToast({
				// 	title: `点击${e.content.text}`,
				// 	icon: 'none'
				// })
				if (e.content.text === '调整') {
					uni.navigateTo({
						url: '/pages/index/project/adjust-project?data=' + JSON.stringify(this.item)
					})
				}
			},
			buttonClick(e) {
				if (e.index === 0) {
					uni.navigateBack({
						delta: 1
					})
				} else if (e.index === 1) {
					uni.navigateTo({
						url: '/pages/index/order/adjust-order?data=' + this.item.id
					})
				}
			},
			updateQuery() {
				// 更新数据
				let pages = getCurrentPages()
				// let currPage = pages[pages.length - 1]; //当前页面
				let prevPage = pages[pages.length - 2] //上一个页面
				prevPage.isDoRefresh = true
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			}
		}
	}
</script>

<style>
	.place-detail {
		/* margin: 27rpx 20rpx 104rpx 20rpx; */
		padding-bottom: 104rpx;
	}

	/* .place-detail .uni-row {
		margin: 5rpx 0;
	} */
</style>

<template>
	<view style="margin-bottom: 100rpx">
		<mescroll-uni :down="downOption" @emptyclick="downCallback" @down="downCallback" :up="upOption" @up="upCallback"
		 :fixed="false" @init="mescrollInit">
			<view class="mycard">
				<view v-for="item in cardList" :key="item.id" class="card-item">
					<uni-card is-full :title="item.taskConfigName" is-shadow note="true" :extra="item.createTime" :thumbnail="`/static/order/${formatProjectType(item.taskConfigName)}`"
					 @tapHeader="clickCard(item)">
						<view class="audit-card-content">
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">工单名称</view>
								<view class="flex-item-80">{{item.ticketTitle}}</view>
							</view>

							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">工单编号</view>
								<view class="flex-item-80">{{item.ticketNo}}</view>
							</view>

							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">问题描述</view>
								<view class="flex-item-80">{{item.desc}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">地址</view>
								<view class="flex-item-80">{{item.addr}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">发送人</view>
								<view class="flex-item-80">{{item.senderName}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">当前状态</view>
								<view class="flex-item-80">
									<uni-tag size="small" :text="formatTaskStatus(item.taskStatus).text" :type="formatTaskStatus(item.taskStatus).color"
									 :circle="true"></uni-tag>
								</view>
							</view>

							<!--
							<view class="uni-flex uni-row">
								<view class="flex-item-20">附件</view>
								<view class="flex-item-80">
									<view v-for="atta in item.attachment" :key="atta.url" @tap="filePreview(atta)">
										<uni-icons color="#007aff" type="paperclip" size="22"></uni-icons><text>{{atta.name}}</text>
									</view>
								</view>
							</view>
							-->
						</view>

						<template v-slot:footer>
							<view class="footer-box">
								<view class="iconfont icontongguo my-iconfont text-green" @tap="clickCard(item)">执行</view>
								<!-- <view class="iconfont iconweibiaoti522 my-iconfont text-red" @tap="unPassClick(item)">关闭</view> -->
								<view class="iconfont icon-history my-iconfont text-blue" @tap="detailClick(item)">执行历史</view>
							</view>
						</template>
					</uni-card>
				</view>
			</view>
		</mescroll-uni>
		<audit-idea ref="popupAuditIdeaRef" :isPass="isPass" :isPaddingBottom="true" @updateQuery="updateQuery"></audit-idea>
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import uniCard from "@/components/uni-card/uni-card"
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import auditIdea from '@/pages/index/audit-idea.vue'
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	import {
		filePreview,
		formatTaskStatus,
		formatProjectType
	} from '@/common/utils/index.js'
	import {
		formatDate,
		formatDateDay
	} from '@/common/utils/datetime.js'
	export default {
		components: {
			MescrollUni,
			uniCard,
			uniTag,
			uniIcons,
			auditIdea
		},
		computed: {
			...mapState([
				'hasLogin',
				'categoryList',
				'categoryDic',
				'projectList',
				'projectDic',
				'userDic',
				'userList',
				'selectOrder'
			]),
			...mapGetters(['user'])
		},
		data() {
			return {
				mescroll: null,
				isPass: false,
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: false, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					},
					toTop: {
						src: '/static/img/backtop.png'
					},
					textNoMore: '没有更多数据了'
				},
				// 列表数据
				cardList: []
			}
		},
		mounted() {
			if (this.user && this.hasLogin) {
				this.initData()
			}
		},
		methods: {
			...mapMutations([
				'setProject',
				'setCategory',
				'setUser',
				'setSelectOrder',
				'setAlertDefinitions'
			]),
			formatDate,
			formatDateDay,
			filePreview,
			formatTaskStatus,
			formatProjectType,
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				// 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
				this.mescroll = mescroll
			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
				//没有上拉的方法
				//mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				if (this.user && this.hasLogin) {
					this.getTicketTasksByStatus('10').then(res => {
						mescroll.endDownScroll()
					})
				}

			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				if (!this.user || !this.hasLogin) {
					mescroll.endErr()
					return
				}

				// // 此时mescroll会携带page的参数:
				// let pageNum = mescroll.num // 页码, 默认从1开始
				// let pageSize = mescroll.size // 页长, 默认每页10条

				// this.$minApi.pageQueryProjectTodo({}, pageNum, pageSize).then(res => {
				// 	// 接口返回的当前页数据列表 (数组)
				// 	let curPageData = res.rows
				// 	// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
				// 	let totalPage = res.totalPageCount
				// 	// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
				// 	let totalSize = res.total
				// 	// 接口返回的是否有下一页 (true/false)
				// 	let hasNext = res.hasNextPage

				// 	if (mescroll.num == 1) this.cardList = [] //如果是第一页需手动置空列表
				// 	this.cardList = this.cardList.concat(curPageData) //追加新数据

				// 	// 成功隐藏下拉加载状态
				// 	// 方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 	mescroll.endByPage(curPageData.length, totalPage)
				// 	this.$nextTick(() => {
				// 		mescroll.endSuccess(curPageData.length)
				// 	})
				// }).catch(() => {
				// 	// 失败隐藏下拉加载状态
				// 	mescroll.endErr()
				// })
			},
			clickCard(item) {
				this.setSelectOrder(item)
				uni.navigateTo({
					url: '/pages/index/order/adjust-order?data=' + item.id
				})
			},
			adjustClick(item) {
				this.setSelectOrder(item)
				uni.navigateTo({
					url: '/pages/index/order/detail-order?data=' + item.id
				})
			},
			passClick(item) {
				this.setSelectOrder(item)
				this.isPass = true
				this.$refs.popupAuditIdeaRef.$refs.share.open()
			},
			unPassClick(item) {
				this.setSelectOrder(item)
				this.isPass = false
				this.$refs.popupAuditIdeaRef.$refs.share.open()
			},
			initData() {
				uni.showLoading({
					title: '正在初始化数据...'
				})
				this.getTicketCategorys({}).then(res => {
					let _categoryDic = {};
					res.forEach(function(item) {
						_categoryDic[item.workflowId] = item
					})
					this.setCategory([res, _categoryDic])
					return this.findProjectsByCondition({})
				}).then(res => {
					let _projectDic = {}
					res.forEach(function(item) {
						_projectDic[item.id] = item
					})
					this.setProject([res, _projectDic])
					return this.queryUserByCondition({})
				}).then(res => {
					let _userDic = {}
					res.forEach(function(item) {
						_userDic[item.id] = item
					})
					this.setUser([res, _userDic])
					return this.findAlertDefinitions({})
				}).then(res => {
					let _alertDefDic = {}
					res.forEach(function(item) {
						_alertDefDic[item.id] = item
					})
					this.setAlertDefinitions([res,_alertDefDic])
					this.getTicketTasksByStatus('10')
				})
			},
			getTicketCategorys() {
				//获得工单定义
				return new Promise((resolve, reject) => {
					this.$api.getTicketCategorys([]).then(res => {
						resolve(res.data)
					})
				})
			},
			findProjectsByCondition(params) {
				//获得项目
				return new Promise((resolve, reject) => {
					this.$api.findProjectsByCondition(params).then(res => {
						resolve(res.data)
					})
				})
			},
			queryUserByCondition(params) {
				//获得用户
				return new Promise((resolve, reject) => {
					this.$api.queryUserByCondition(params).then(res => {
						resolve(res.data)
					})
				})
			},
			findAlertDefinitions(params) {
				//获得告警定义
				return new Promise((resolve, reject) => {
					this.$api.findAlertDefinitions(params).then(res => {
						resolve(res.data)
					})
				})
			},
			getTicketTasksByStatus(params) {
				uni.showLoading({
					title: '正在查询数据...'
				})
				//获得我的任务
				return new Promise((resolve, reject) => {
					this.$api.getTicketTasksByStatus(params).then(res => {
						let _cardlist = [];
						res.data.forEach(item => {
							let domainAry = item.domainPath.split('/')
							let project = this.projectDic[domainAry[domainAry.length - 2]]
							let category = this.categoryDic[item.processDefinitionId]
							let card = { ...item
							}
							card.desc = item.variables ? item.variables.userResponse : '无'
							card.addr = project ? project.values.standardAddress : '无'
							card.createTime = this.formatDate(item.sendTime)

							_cardlist.push(card)
						})
						this.cardList = _cardlist
						uni.hideLoading()
						resolve(_cardlist)
					})
				})
			},
			queryByName(name) {
				uni.showLoading({
					title: '正在查询数据...'
				})
				//获得
				this.$api.getTicketTasksByStatus([]).then(res => {
					this.cardList
					uni.hideLoading()
				})
			},
			updateQuery() {
				// 无效
				// if (this.mescroll !== null) {
				// 	this.downCallback(this.mescroll)
				// }
				this.queryByName('')
			}
		}
	}
</script>

<style>
	.mescroll-totop {
		opacity: 1 !important;
	}
</style>

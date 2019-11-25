<!-- 项目查询 -->
<template>
	<view>
		<mescroll-uni :down="downOption" @emptyclick="downCallback" @down="downCallback" :up="upOption" @up="upCallback"
		 :fixed="false">
			<view class="mycard">
				<view v-for="item in cardList" :key="item.id" class="card-item">
					<uni-card is-full :title="item.label" is-shadow note="true" :extra="item.createTime" :thumbnail="`/static/img/project/${formatProjectType(item.projectType)}`"
					 @tapHeader="clickCard(item)">
						<view class="audit-card-content">
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">设备名称</view>
								<view class="flex-item-80">{{item.label}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">设备模板</view>
								<view class="flex-item-80">{{item.modelId}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">设备模板</view>
								<view class="flex-item-80">{{item.projectId}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">所在区域</view>
								<view class="flex-item-80">{{item.area}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">运行状态</view>
								<view class="flex-item-80">
									<uni-tag size="small" :text="formatAuditStatus(item.auditStatus).text" :type="formatAuditStatus(item.auditStatus).color"
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
								<view class="iconfont icontongguo my-iconfont text-green" @tap="passClick(item)">详情</view>
								<view class="iconfont iconweibiaoti522 my-iconfont text-green" @tap="unPassClick(item)">数据</view>
							</view>
						</template>
					</uni-card>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import uniCard from "@/components/uni-card/uni-card"
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import {
		mapState,
		mapGetters
	} from 'vuex'
	import {
		getRandomArrayElements,
		filePreview,
		formatAuditStatus,
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
			uniIcons
		},
		computed: {
			...mapState(['hasLogin']),
			...mapGetters(['user'])
		},
		data() {
			return {
				mescroll: null,
				isPass: false,
				selectedProject: {},
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
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
				cardList: [],
				params: [{
						"orCondition": "",
						"conditionField": ["sn", "label"],
					},
					{
						"start": 0,
						"length": 10,
						"sort": "createTime",
						"sortType": "desc",
						"statCount": true
					}
				],
				total:0
			}
		},
		methods: {
			formatDate,
			formatDateDay,
			filePreview,
			formatAuditStatus,
			formatProjectType,
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				// 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
				this.mescroll = mescroll
			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
				mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				if (!this.user || !this.hasLogin) {
					mescroll.endErr()
					return
				}

				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				this.params[1].start = pageNum * pageSize;
				this.params[1].statCount = pageNum > 1 ? false : true
				this.getDevicesByConditionWithPage(this.params).then(res => {
					let curPageData = res[0]
					// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
					let totalSize = res[1] == -1 ? this.total : res[1]
					this.total = totalSize;
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					let totalPage = Math.ceil(totalSize / pageSize)

					// 接口返回的是否有下一页 (true/false)
					let hasNext = res.hasNextPage

					if (mescroll.num == 1) this.cardList = [] //如果是第一页需手动置空列表
					this.cardList = this.cardList.concat(curPageData) //追加新数据

					// 成功隐藏下拉加载状态
					// 方法一(推荐): 后台接口有返回列表的总页数 totalPage
					mescroll.endByPage(curPageData.length, totalPage)
					this.$nextTick(() => {
						mescroll.endSuccess(curPageData.length)
					})
				}).catch(() => {
					// 失败隐藏下拉加载状态
					mescroll.endErr()
				})
			},
			clickCard(item) {
				uni.navigateTo({
					url: '/pages/project/project-detail?data=' + JSON.stringify(item)
				})
			},
			getDevicesByConditionWithPage(params) {
				//获得我的任务
				return new Promise((resolve, reject) => {
					this.$api.getDevicesByConditionWithPage(params).then(res => {
						let _cardlist = []
						let _total = res.data.total
						res.data.data.forEach(item => {
							// let domainAry = item.domainPath.split('/')
							// let project = this.projectDic[domainAry[domainAry.length - 2]]
							// let category = this.categoryDic[item.processDefinitionId]
							let card = {
								id: item.id,
								label: item.label,
								modelId: item.modelId,
								projectId: item.projectId,
								managedStatus: item.managedStatus,
								createTime: this.formatDate(item.createTime),
								modifyTime: this.formatDate(item.modifyTime),
								severity: item.severity,
								onlineStatus: item.onlineStatus,
								attachment: []
							}
							_cardlist.push(card)
						})
						resolve([_cardlist,_total])
					})
				})
			},
			queryByName(name) {
				uni.showLoading({
					title: '正在查询数据...'
				})
				/**
				 * todo: api请求查询项目待办
				 */
				setTimeout(() => {
					this.cardList = getRandomArrayElements(this.cardList, 1)
					uni.hideLoading()
				}, 3000)
			},
			updateQuery() {
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

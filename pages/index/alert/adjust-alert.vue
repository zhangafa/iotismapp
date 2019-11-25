<template>
	<view>
		<view class="place-detail">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>告警信息
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">告警名称</view>
					<view class="flex-item-70">{{alertItem.title}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">告警内容</view>
					<view class="flex-item-70">{{alertItem.message}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">告警设备</view>
					<view class="flex-item-70">{{alertItem.devName}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">最近告警时间</view>
					<view class="flex-item-70">{{alertItem.updateTime}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">告警次数</view>
					<view class="flex-item-70">{{alertItem.count}}</view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>工单信息
				</view>
			</view>
		</view>
		<form>
			<view class="cu-form-group">
				<view class="title">工单名称</view>
				<input class="uni-input" v-model="actionItem.title">
			</view>
			<view class="cu-form-group">
				<view class="title">工单紧急度</view>
				<picker @change="priorityPickerChange" :value="priorityCodeIndex" range-key='label' :range="priorityCodeList">
					<view class="picker">
						{{priorityCodeList[priorityCodeIndex]?priorityCodeList[priorityCodeIndex].label:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">工单类型</view>
				<picker @change="typePickerChange" :value="typeIndex" range-key='label' :range="typeList">
					<view class="picker">
						{{typeList[typeIndex]?typeList[typeIndex].label:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">工单流程</view>
				<picker @change="flowPickerChange" :value="flowIndex" range-key='name' :range="processTypeList">
					<view class="picker">
						{{processTypeList[flowIndex]?processTypeList[flowIndex].name:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">工单内容</view>
				<textarea maxlength="-1" v-model='actionItem.message'></textarea>
			</view>
		</form>
		<view class="place-detail">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>流程信息
				</view>
			</view>
		</view>
		<form-componets :list="attributeList" :showBtn="true" @save="saveClick"></form-componets>
		<!--
		<view class="flex">
			<view class="flex-sub margin-sm">
				<button class="cu-btn block shadow bg-white margin-tb-sm lg" @tap="cancelClick">取消</button>
			</view>
			<view class="flex-sub margin-sm">
				<button class="cu-btn block shadow bg-blue margin-tb-sm lg" @tap="saveClick">确认</button>
			</view>
		</view>
		-->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import FormComponets from "@/components/form-componets.vue"
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'
	
	import http from '@/common/vmeitime-http/interface.js'
	var graceChecker = require("@/common/utils/graceChecker.js")
	export default {
		components: {
			robbyImageUpload,
			FormComponets
		},
		computed: {
			...mapState([
				'selectAlert',
				'myDicts',
				'categoryList',
				'alertDefList'
			]),
			typeList: function() {
				return this.myDicts['ticketCategory']
			},
			processTypeList: function() {
				let key = this.actionItem.category
				return this.categoryList.filter(function(item) {
					return item.category == key
				});
			}
		},
		onLoad(options) {
			try {
				if (options.data == this.selectAlert.id) {
					this.alertItem = this.selectAlert
				}
			} catch (e) {
				this.alertItem = {}
			}
		},
		data() {
			return {
				actionItem: {
					title: '',
					priorityCode: 0,
					category: '',
					ticketCategoryId: null,
					message: '',
					faultId: '',
					deviceId: '',
					values: ''
				},
				alertItem: {},
				typeIndex: -1,
				flowIndex: -1,
				priorityCodeIndex: -1,
				priorityCodeList: [{
						id: 0,
						label: '低',
						value: 0
					},
					{
						id: 1,
						label: '中',
						value: 200
					},
					{
						id: 2,
						label: '高',
						value: 200
					}
				],
				
				attributeList: [],
				formRule: [],
				relationDic: {}
			}
		},

		methods: {
			...mapMutations([
				'setselectAlert'
			]),
			priorityPickerChange(e) {
				this.priorityCodeIndex = e.detail.value
				this.actionItem.priorityCode = this.priorityCodeList[this.priorityCodeIndex].value
			},
			typePickerChange(e) {
				this.typeIndex = e.detail.value
				this.actionItem.category = this.typeList[this.typeIndex].valueCode
				this.attributeList = []
				this.actionItem.ticketCategoryId = 0
			},
			flowPickerChange(e) {
				this.flowIndex = e.detail.value
				let flow = this.processTypeList[this.flowIndex]
				if (!flow) return
				this.actionItem.ticketCategoryId = flow.id
				flow.startAttributeDefinitions.forEach(item => {
					if (item.dataType == 'select') {
						item.rangeAry = item.dynamicValue ? item.dynamicValue : JSON.parse(item.selectValue)
						item.selectLabel = '请选择'
					}
					if (item.relation) {
						item.isRelation = false
					}
				})
				this.attributeList = flow.startAttributeDefinitions;
			},
			
			
			cancelClick() {
				uni.navigateBack({
					delta: 1
				})
			},

			// 跳转上一页并刷新
			updateQuery() {
				// 更新数据
				let pages = getCurrentPages()
				// let currPage = pages[pages.length - 1]; //当前页面
				let prevPage = pages[pages.length - 2] //上一个页面
				prevPage.isDoRefresh = true
				setTimeout(() => {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}, 1000)
			},

			saveClick(e) {
				if (!this.alertItem && !this.alertItem.id) {
					uni.showToast({
						title: '请选择一个待处理工单！',
						icon: 'none'
					})
					return
				}
				let checkRes = null;
				if (!this.actionItem.title) {
					checkRes = {error:'工单名称不能为空'}
				} else if (!this.actionItem.category) {
					checkRes = {error:'请选择一个工单类型'}
				} else if (!this.actionItem.priorityCode) {
					checkRes = {error:'请选择一个工单紧急度'}
				} else if (!this.actionItem.ticketCategoryId) {
					checkRes = {error:'请选择一个工单流程'}
				}
				if (!checkRes) {
					this.actionItem.deviceId = this.alertItem.nodeId
					this.actionItem.values = e.values
					this.actionItem.values.modelID = this.alertItem.nodeTypeList[this.alertItem.nodeTypeList.length-1]
					this.alertDefList.forEach(alertdef => {
						if (alertdef.id == this.alertItem.alertCode) {
							this.actionItem.faultId = alertdef.faultId
						}
					})
					
					let tmp ={
						actionType: "forward",
						alertIds: [this.alertItem.alertId],
						severity: 0,
						target: "EOMS://auttest/auttest"
					}
					uni.showLoading({
						title: '正在提交数据...'
					})
					this.$api.sendForwardAction([tmp,this.actionItem]).then(res => {
						uni.hideLoading()
						uni.showToast({
							title: '处理成功！',
							icon: 'success'
						})
						this.updateQuery()
					})
				} else {
					uni.showToast({
						title: checkRes.error,
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	.place-detail {
		/* margin: 27rpx 20rpx 104rpx 20rpx; */
		padding-bottom: 0rpx;
	}

	.placeholder {
		color: #8c8c8c;
		line-height: 84rpx;
		font-size: 31rpx;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		text-align: right;
	}

	.my-uni-input {
		line-height: 84rpx;
		font-size: 31rpx;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		width: 100%;
		text-align: right;
	}

	.cu-form-group .time-content {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		-ms-flex: 1;
		flex: 1;
		padding-right: 33rpx;
		overflow: hidden;
		position: relative;
	}

	.cu-form-group .time-content::after {
		font-family: cuIcon;
		display: block;
		content: "\E6A3";
		position: absolute;
		font-size: 31rpx;
		color: #8799a3;
		line-height: 84rpx;
		width: 50rpx;
		text-align: center;
		top: 0;
		bottom: 0;
		right: -16rpx;
		margin: auto;
	}
</style>

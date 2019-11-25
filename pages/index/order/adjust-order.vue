<template>
	<view>
		<view class="place-detail">
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>
					工单信息
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">工单名称</view>
					<view class="flex-item-70">{{ projectItem.ticketTitle }}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">问题描述</view>
					<view class="flex-item-70">{{ projectItem.desc }}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">发送人</view>
					<view class="flex-item-70">{{ projectItem.senderName }}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs bg-white">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">地址</view>
					<view class="flex-item-70">{{ projectItem.addr }}</view>
				</view>
			</view>
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="cuIcon-title text-blue"></text>
					工单操作
				</view>
			</view>
		</view>

		<form-componets :list="attributeList" :showBtn="true" @save="saveClick"></form-componets>
	</view>
</template>

<script>
import FormComponets from '@/components/form-componets.vue';

import { mapState, mapMutations } from 'vuex';
import { getQueryString } from '@/common/utils/index.js';

import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
import http from '@/common/vmeitime-http/interface.js';

export default {
	components: {
		robbyImageUpload,
		FormComponets
	},
	computed: {
		...mapState(['selectOrder'])
	},
	onLoad(options) {
		try {
			if (options.data == this.selectOrder.id) {
				this.projectItem = this.selectOrder;
				if (this.projectItem.templateURL) {
					let tempAry = [];
					let urlAry = this.projectItem.templateURL.split('?');
					this.queryPartEtlId = this.getQueryString('queryPartEtlId', urlAry[1]);
					this.createOrderEtlId = this.getQueryString('createOrderEtlId', urlAry[1]);
					this.queryCustomerEtlId = this.getQueryString('queryCustomerEtlId', urlAry[1]);

					if (this.projectItem.taskConfigName == '配件下单') {
						tempAry.push(
							this.createAttrDef({
								dataType: 'select',
								label: 'warranty',
								name: '保修状态',
								rangeAry: [{ value: 'Within', label: '保内', code: 0 }, { value: 'Outside', label: '保外', code: 1 }],
								selectLabel : '请选择'
							})
						);
						tempAry.push(
							this.createAttrDef({
								dataType: 'ERPCustomer',
								label: 'customer',
								name: '选择客户',
								etlId: this.queryCustomerEtlId
							})
						);
						tempAry.push(
							this.createAttrDef({
								dataType: 'ERPDepartment',
								label: 'departmentCode',
								name: '选择部门',
								etlId: 444861596508690
							})
						);
						tempAry.push(
							this.createAttrDef({
								dataType: 'ERPBomMaster',
								label: 'masterCode',
								name: '选择机型',
								etlId: 444861596508689,
								required: ''
							})
						);
						tempAry.push(
							this.createAttrDef({
								dataType: 'ERPBomParts',
								label: 'partCode',
								name: '选择配件',
								etlId: this.queryPartEtlId,
								required: ''
							})
						);
						tempAry.push(
							this.createAttrDef({
								dataType: 'ERPPartList',
								name: ''
							})
						);
					}
					this.projectItem.attributeDefinitions = tempAry;
				}
				this.projectItem.attributeDefinitions.forEach(item => {
					if (item.dataType == 'select') {
						if (!item.rangeAry) {
							item.rangeAry = item.dynamicValue ? item.dynamicValue : JSON.parse(item.selectValue);
						}
						item.selectLabel = '请选择';
					}
					if (item.relation) {
						item.isRelation = false;
					}
				});
				this.attributeList = this.projectItem.attributeDefinitions;
			}
		} catch (e) {
			this.projectItem = {};
		}
	},
	data() {
		return {
			queryBomMasterEtlId: '444861596508689',
			queryPartEtlId: null,
			createOrderEtlId: null,
			queryCustomerEtlId: null,
			attributeList: [],
			projectItem: {},
			formRule: [],
			relationDic: {},
			enableDel: true,
			enableAdd: true,
			enableDrag: false,
			limitNumber: 8,
			imageData: [],
			serverUrl: http.config.baseUrl + 'api/rest/upload/resourceFileUIService/uploadResourceFile',
			formData: {
				resourceId: 100,
				type: encodeURIComponent('ticket')
			},
			header: {
				cookie: http.config.header.cookie
			}
		};
	},

	methods: {
		...mapMutations(['setSelectOrder']),
		getQueryString,
		deleteImage: function(e) {
			console.log(e);
		},
		addImage: function(e) {
			console.log(e);
		},
		// 时间日期选择start
		showApplyTime() {
			this.$refs.applyDateTimeRef.show();
		},
		showCreateTime() {
			this.$refs.createDateTimeRef.show();
		},
		getApplyTime(e) {
			this.projectItem.applyTime = e.result;
		},
		getCreateTime(e) {
			this.projectItem.createTime = e.result;
		},
		// 时间日期选择end
		createAttrDef(param) {
			let temp = {
				dataType: 'select',
				label: 'dispatch',
				lineNumber: 'two',
				lookStatus: 'edit',
				name: '名称',
				relation: '',
				reorder: '',
				required: 'yes',
				selectExpression: '',
				selectValue: []
			};
			temp = { ...temp, ...param };
			return temp;
		},

		// 跳转上一页并刷新
		updateQuery() {
			// 更新数据
			let pages = getCurrentPages();
			// let currPage = pages[pages.length - 1]; //当前页面
			let prevPage = pages[pages.length - 2]; //上一个页面
			prevPage.isDoRefresh = true;
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/index/index'
				});
			}, 1000);
		},
		saveClick(e) {
			if (!this.projectItem && !this.projectItem.id) {
				uni.showToast({
					title: '请选择一个待处理工单！',
					icon: 'none'
				});
				return;
			}
			let tmp = { ...this.projectItem };
			// 把参数放到values里
			tmp.values = e.values;
			tmp.taskStatus = 200;
			uni.showLoading({
				title: '正在提交数据...'
			});

			this.$api.doTask(tmp).then(res => {
				uni.hideLoading();
				uni.showToast({
					title: '处理成功！',
					icon: 'success'
				});
				this.updateQuery();
			});
		}
	}
};
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
	content: '\E6A3';
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

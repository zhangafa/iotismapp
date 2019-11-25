<template>
	<view>
		<form>
			<view v-for="item in attributeList" :key="item.id" v-show="!item.relation || item.isRelation" class="cu-form-group">
				<view class="title" v-if="item.name">{{ item.name }}</view>
				<picker v-if="item.dataType == 'select'" :data-index="item.label" @change="pickerChange" range-key="label" :range="item.rangeAry">
					<view class="picker">{{ item.selectLabel }}</view>
				</picker>
				<!--支持图片上传服务器：选择图片后，组件会自动上传到指定地址，并更新组件中保存的图片地址为服务器地址-->
				<robby-image-upload
					v-if="item.dataType == 'uploader'"
					v-model="imageData"
					@delete="deleteImage"
					@add="addImage"
					:form-data="formData"
					:header="header"
					:server-url="serverUrl"
					:enable-drag="enableDrag"
					:enable-del="enableDel"
					:enable-add="enableAdd"
					:limit="limitNumber"
				></robby-image-upload>
				<textarea
					v-if="item.dataType == 'textarea'"
					maxlength="-1"
					:key="item.id"
					:data-index="item.label"
					v-show="!item.relation || item.isRelation"
					@input="textChange"
				></textarea>
				<view v-if="item.dataType == 'ERPCustomer'" style="width: 70%">
					<xfl-select 
					:queryParams="item.etlId" 
					:valuekey="'Name'"
					:list="customerList" 
					:clearable="true" 
					:showItemNum="5" 
					:isCanInput="true" 
					:style_Container="listBoxStyle" 
					:placeholder = "'输入客户名或客户编码'" 
					@change="xflSelectChange" 
					@confirm="xflSelectSearch"
					>
					</xfl-select>
				</view>
				<view v-if="item.dataType == 'ERPBomMaster'" style="width: 70%">
					<xfl-select 
					:queryParams="item.etlId" 
					:list="bomMasterList" 
					:clearable="true" 
					:showItemNum="5" 
					:valuekey="'Name'"
					:isCanInput="true" 
					:style_Container="listBoxStyle" 
					:placeholder = "'输入机型编码'" 
					@change="xflSelectChange" 
					@confirm="xflSelectSearch"
					>
					</xfl-select>
				</view>
				<view v-if="item.dataType == 'ERPBomParts'" style="width: 70%">
					<xfl-select 
					:queryParams="item.etlId" 
					:list="bomPartsList" 
					:clearable="true" 
					:valuekey="'Name'"
					:showItemNum="5" 
					:isCanInput="true" 
					:style_Container="listBoxStyle" 
					:placeholder = "'输入机型编码'" 
					@change="xflSelectChange" 
					@confirm="xflSelectSearch"
					>
					</xfl-select>
				</view>
				<view v-if="item.dataType == 'ERPDepartment'" style="width: 70%">
					<xfl-select 
					:queryParams="item.etlId" 
					:list="departmentList" 
					:valuekey="'Name'"
					:clearable="true" 
					:showItemNum="5" 
					:isCanInput="true" 
					:style_Container="listBoxStyle" 
					:placeholder = "'输入部门名称'" 
					@change="xflSelectChange" 
					@confirm="xflSelectSearch"
					>
					</xfl-select>
				</view>
				<scroll-view v-if="item.dataType == 'ERPPartList'" :scroll-y="modalName==null" class="page" :class="modalName!=null?'show':''">
					<view class="cu-list menu-avatar">
						<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in 4" :key="index"
						 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
							<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
							<view class="content">
								<view class="text-grey">文晓港</view>
								<view class="text-gray text-sm">
									<text class="cuIcon-infofill text-red  margin-right-xs"></text> 消息未送达</view>
							</view>
							<view class="action">
								<view class="text-grey text-xs">22:20</view>
								<view class="cu-tag round bg-grey sm">5</view>
							</view>
							<view class="move">
								<view class="bg-grey">置顶</view>
								<view class="bg-red">删除</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<!--
			<view class="cu-form-group">
				<view class="title">立项时间</view>
				<view class="time-content" @tap="showApplyTime">
					<view class="my-uni-input" v-if="projectItem.applyTime">{{projectItem.applyTime}}</view>
					<view v-else class="placeholder">{{placeholder}} </view>
				</view>
				<tui-datetime ref="applyDateTimeRef" :type="1" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor"
				 :color="color" :setDateTime="projectItem.applyTime" @confirm="getApplyTime"></tui-datetime>
			</view>
			
			<view class="cu-form-group">
				<view class="title">创建时间</view>
				<view class="time-content" @tap="showCreateTime">
					<view class="my-uni-input" v-if="projectItem.createTime">{{projectItem.createTime}}</view>
					<view v-else class="placeholder">{{placeholder}} </view>
				</view>
				<tui-datetime ref="createDateTimeRef" :type="1" :startYear="startYear" :endYear="endYear" :cancelColor="cancelColor"
				 :color="color" :setDateTime="projectItem.createTime" @confirm="getCreateTime"></tui-datetime>
			</view>
			
			<view class="cu-form-group">
				<view class="title">所在区域</view>
				<picker @change="areaPickerChange" v-model="areaIndex" :value="areaIndex" :range="areaList">
					<view class="picker">
						{{areaIndex>-1?areaList[areaIndex]:'请选择所在区域'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">项目地址</view>
				<picker @change="addrPickerChange" v-model="addrIndex" :value="addrIndex" :range="addrList">
					<view class="picker">
						{{addrIndex>-1?addrList[addrIndex]:'请选择项目地址'}}
					</view>
				</picker>
			</view>
			-->
		</form>

		<view class="flex" v-if="showBtn">
			<view class="flex-sub margin-sm"><button class="cu-btn block shadow bg-white margin-tb-sm lg" @tap="cancelClick">取消</button></view>
			<view class="flex-sub margin-sm"><button class="cu-btn block shadow bg-blue margin-tb-sm lg" @tap="saveClick">确认</button></view>
		</view>
	</view>
</template>

<script>
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
import http from '@/common/vmeitime-http/interface.js';
import xflSelect from '@/components/xfl-select/xfl-select.vue';
import { checkString } from '@/common/utils/index.js';
var graceChecker = require('@/common/utils/graceChecker.js');
export default {
	name: 'FormComponets',
	components: {
		robbyImageUpload,
		xflSelect
	},
	props: {
		list: Array,
		showBtn: Boolean
	},
	model: {
		prop: 'value',
		event: 'input'
	},
	data() {
		return {
			customerList: [],
			bomPartsList: [],
			departmentList: [],
			bomMasterList: [],
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
			},
			listBoxStyle: `height: 30px; font-size: 12px;`,
			modalName: null,
		};
	},
	computed: {
		attributeList() {
			return this.list;
		}
	},
	methods: {
		checkString,
		pickerChange(e) {
			let dataindex = e.currentTarget.dataset.index;
			this.attributeList.forEach(item => {
				if (item.label == dataindex) {
					let rangeObj = item.rangeAry[Number(e.detail.value)];
					item.selectLabel = rangeObj.label; //设置到显示
					item[item.label] = rangeObj.value || rangeObj.label; //设置value到key
					this.relationDic[item.label] = item[item.label];
				}
				//查看是否有选中的指标
				if (item.relation) {
					let relationAry = item.relation.split(':');
					if (this.relationDic[relationAry[0]] == relationAry[1]) {
						item.isRelation = true;
					} else if (item.label != relationAry[0]) {
						item.isRelation = false;
					}
				}
			});
			this.$forceUpdate();
		},
		textChange(e) {
			let dataindex = e.currentTarget.dataset.index;
			let value = e.detail.value;
			this.relationDic[dataindex] = value;
		},
		xflSelectChange({newVal, oldVal, index, orignItem}){
			console.log(newVal, oldVal, index, orignItem);
		},
		xflSelectSearch(e) {
			let etlId = e.currentTarget.dataset.index;
			let params = {}
			if (etlId == "351692822650000") { //查询客户
				if (this.checkString(e.detail.value,0)) {
					params.name = e.detail.value
				} else {
					params.code = e.detail.value
					params.name = e.detail.value
				}
			} else if (etlId == "444861596508689") { //查询机型
				params.code = e.detail.value
			} else if (etlId == "318300627950000") { //查询备件
				params.type = "Code"
				params.code = ''
				params.typeValue = e.detail.value
			} else if (etlId == "444861596508690") { //查询部门
				params.name = e.detail.value
			}
			this.executeJob([etlId,params]).then(res => {
				let listdata = JSON.parse(res)
				if (etlId == "351692822650000") {
					this.customerList = listdata
				} else if (etlId == "444861596508689") {
					this.bomMasterList = listdata
				} else if (etlId == "318300627950000") {
					this.bomPartsList = listdata
				} else if (etlId == "444861596508690") {
					this.departmentList = listdata
				}
			})
		},
		cancelClick() {
			uni.navigateBack({
				delta: 1
			});
		},
		saveClick() {
			let checkObj = {};
			this.attributeList.forEach(item => {
				checkObj[item.label] = this.relationDic[item.label];
				if (item.required == 'yes' && (!item.relation || (item.relation && item.isRelation))) {
					this.formRule.push({
						name: item.label,
						checkType: 'notnull',
						checkRule: '',
						errorMsg: '请选择' + item.name
					});
				}
			});

			let checkRes = graceChecker.check(checkObj, this.formRule);
			if (checkRes) {
				let tmp = {
					values: this.relationDic
				};
				this.$emit('save', tmp);
			} else {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}
		},
		executeJob(params) {
			//获得ERP里的返回内容接口
			return new Promise((resolve, reject) => {
				this.$api.executeJob(params).then(res => {
					resolve(res.data)
				})
			})
		},
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX
		},
		
		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
		},
		
		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target
			} else {
				this.modalName = null
			}
			this.listTouchDirection = null
		}
	}
};
</script>
<style></style>

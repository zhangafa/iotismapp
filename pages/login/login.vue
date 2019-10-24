<template>
	<view class="content">
		<view class="header">
			<image src="/static/login/logo.png"></image>
		</view>
		
		<view class="list">
			<view class="list-call">
				<image class="img" src="/static/login/1.png"></image>
				<input class="biaoti" v-model="phoneno" type="text" maxlength="20" placeholder="登录名/手机号/邮箱" />
			</view>
			<view class="list-call">
				<image class="img" src="/static/login/2.png"></image>
				<input class="biaoti" v-model="password" type="text" maxlength="32" placeholder="密码" password="true" />
			</view>
			
		</view>
		
		<view class="dlbutton" hover-class="dlbutton-hover" @tap="bindLogin()">
			<text>登录</text>
		</view>
		
		<view class="xieyi">
			<navigator url="forget" open-type="navigate">忘记密码</navigator>
			<text>|</text>
			<navigator url="reg" open-type="navigate">注册账户</navigator>
		</view>
	</view>
</template>

<script>
	import service from '../../common/service.js';
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	export default {
		onLoad(){},
		data() {
			return {
				phoneno:'psdemo2',
				password:'1qa2ws'
			};
		},
		methods: {
			...mapMutations(['login']),
		    bindLogin() {
				if (this.phoneno.length < 6) {
				     uni.showToast({
				        icon: 'none',
				        title: '账号最短为 6 个字符'
				    });
				    return;
				}
		        if (this.password.length < 6) {
		            uni.showToast({
		                icon: 'none',
		                title: '密码最短为 6 个字符'
		            });
		            return;
		        }
				this.$api.login([this.phoneno,this.password]).then((res)=>{
					this.toMain(res);
				})
		    },
			toMain(userName) {
			    this.login(userName);
			    /**
			     * 强制登录时使用reLaunch方式跳转过来
			     * 返回首页也使用reLaunch方式
			     */
			    uni.reLaunch({
			        url: '../index/index',
			    });
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
	}
	.header {
		width:161upx;
		height:161upx;
		background:rgba(63,205,235,1);
		box-shadow:0upx 12upx 13upx 0upx rgba(63,205,235,0.47);
		border-radius:50%;
		margin-top: 30upx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161upx;
		height:161upx;
		border-radius:50%;
	}
	
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}
	.list-call{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230,230,230,1);
	}
	.list-call .img{
		width: 40upx;
		height: 40upx;
	}
	.list-call .biaoti{
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.dlbutton {
		color: #FFFFFF;
		font-size: 34upx;
		width:470upx;
		height:100upx;
		background:linear-gradient(-90deg,rgba(63,205,235,1),rgba(188,226,158,1));
		box-shadow:0upx 0upx 13upx 0upx rgba(164,217,228,0.2);
		border-radius:50upx;
		line-height: 100upx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-top: 100upx;
	}
	.dlbutton-hover {
		background:linear-gradient(-90deg,rgba(63,205,235,0.9),rgba(188,226,158,0.9));
	}
	.xieyi{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		margin-top: 80upx;
		color: #FFA800;
		text-align: center;
		height: 40upx;
		line-height: 40upx;
	}
	.xieyi text{
		font-size: 24upx;
		margin-left: 15upx;
		margin-right: 15upx;
	}
</style>

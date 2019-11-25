import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		user: null,
		categoryList: [],
		categoryDic: {},
		projectList: [],
		projectDic: {},
		userList: [],
		userDic: {},
		selectOrder: {},
		selectAlert: {},
		myDicts: {},
		alertDefDic: {},
		alertDefList: []
	},
	mutations: {
		login(state, userInfo) {
			uni.setStorageSync('_user', JSON.stringify(userInfo));
			state.user = userInfo;
			state.hasLogin = true;
		},
		logout(state) {
			uni.setStorageSync('_user', '');
			state.user = null;
			state.hasLogin = false;
		},
		setProject(state, value) {
			state.projectList = value[0]
			state.projectDic = value[1]
		},
		setCategory(state, value) {
			state.categoryList = value[0]
			state.categoryDic = value[1]
		},
		setUser(state, value) {
			state.userList = value[0]
			state.userDic = value[1]
		},
		setSelectOrder(state, value) {
			state.selectOrder = value
		},
		setSelectAlert(state, value) {
			state.selectAlert = value
		},
		setDicts(state, value) {
			state.myDicts = value
		},
		setAlertDefinitions(state, value) {
			state.alertDefList = value[0]
			state.alertDefDic = value[1]
		}
	},
	getters: {
		user: state => {
			if (state.user) {
				return state.user
			}
			return uni.getStorageSync('_user')
		}
	}
})

export default store

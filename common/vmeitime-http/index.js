import http from './interface'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */
// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
export const test = (data) => {
	/* http.config.baseUrl = "http://localhost:8080/api/"
	//设置请求前拦截器
	http.interceptor.request = (config) => {
		config.header = {
			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
		}
	} */
	//设置请求结束后拦截器
	http.interceptor.response = (response) => {
		console.log('个性化response....')
		//判断返回状态 执行相应操作
		return response;
	}
    return http.request({
		baseUrl: 'https://unidemo.dcloud.net.cn/',
        url: 'ajax/echo/text?name=uni-app',
		dataType: 'text',
        data
    })
}

export const login = (data) => {
	http.interceptor.response = (response) => {
		// #ifdef H5 || MP-WEIXIN
		if (response.cookies) {
			http.config.header.cookie = response.cookies[0]
		}
		if (response.header['Set-Cookie']) {
			http.config.header.cookie = response.header['Set-Cookie']
		}
		// #endif 
		http.interceptor.response = "";
		return response
	}
	return http.request({
	    url: 'api/rest/post/userLoginUIService/login',
	    data
	})
}

export const getTicketCategorys = (data) => {
	return http.request({
	    url: 'api/rest/post/ticketCategoryService/getTicketCategorys',
		data
	})
}

export const getTicketTasksByStatus = (data) => {
	return http.request({
	    url: 'api/rest/post/ticketTaskService/getTicketTasksByStatus',
		data
	})
}

export const findProjectsByCondition = (data) => {
	return http.request({
	    url: 'api/rest/post/projectUIService/findProjectsByCondition',
		data
	})
}

export const getAlertByPage = (data) => {
	return http.request({
	    url: 'api/rest/post/alertQueryFlexService/getAlertByPage',
		data
	})
}

export const getDevicesByConditionWithPage = (data) => {
	return http.request({
	    url: 'api/rest/post/resourceUIService/getDevicesByConditionWithPage',
		data
	})
}

export const queryUserByCondition = (data) => {
	return http.request({
	    url: 'api/rest/post/userUIService/queryUserByCondition',
		data
	})
}

export const doTask = (data) => {
	return http.request({
	    url: 'api/rest/post/ticketTaskService/doTask',
		data
	})
}

export const getByTicketNo = (data) => {
	return http.request({
	    url: 'api/rest/post/ticketLogService/getByTicketNo',
		data
	})
}

export const getAllDicts = (data) => {
	return http.request({
	    url: 'api/rest/post/dictionaryService/getAllDicts',
		data
	})
}

export const sendForwardAction = (data) => {
	return http.request({
	    url: 'api/rest/post/alertManageFlexService/sendForwardAction',
		data
	})
}

export const findAlertDefinitions = (data) => {
	return http.request({
	    url: 'api/rest/post/resourceUIService/findAlertDefinitions',
		data
	})
}

export const executeJob = (data) => {
	return http.request({
	    url: 'api/rest/post/etlUIService/executeJob',
		data
	})
}

// 默认全部导出  import api from '@/common/vmeitime-http/'
export default {
	test,
    login,
	getTicketCategorys,
	getTicketTasksByStatus,
	findProjectsByCondition,
	getAlertByPage,
	getDevicesByConditionWithPage,
	queryUserByCondition,
	doTask,
	getByTicketNo,
	getAllDicts,
	sendForwardAction,
	findAlertDefinitions,
	executeJob
}
/**
 * 随机从数据中选取n项元素
 */
export const getRandomArrayElements = (arr, count) => {
	var shuffled = arr.slice(0),
		i = arr.length,
		min = i - count,
		temp, index
	while (i-- > min) {
		index = Math.floor((i + 1) * Math.random())
		temp = shuffled[index]
		shuffled[index] = shuffled[i]
		shuffled[i] = temp
	}
	return shuffled.slice(min)
}

export const formatArr = (segmentType, sep = '/') => {
	let result = ''
	if (segmentType) {
		try {
			const segmentArr = JSON.parse(segmentType)
			segmentArr.forEach(item => {
				result += item + sep
			})
		} catch (error) {
			return segmentType
		}
	}
	if (result) {
		let len = sep.length > 1 ? 2 : 1
		result = result.substring(0, result.length - len)
	}
	return result
}

export const formatProjectType = pt => {
	if (!pt) {
		return ''
	}
	if (pt.indexOf('配件下单') !== -1) {
		return 'L2.svg'
	} else if (pt.indexOf('确认签收') !== -1) {
		return 'L3.svg'
	} else if (pt.indexOf('设备档案更新') !== -1) {
		return 'L5.svg'
	} else if (pt.indexOf('服务经理判断') !== -1) {
		return 'L0.svg'
	} else if (pt.indexOf('服务工程师确认') !== -1) {
		return 'L1.svg'
	} else if (pt.indexOf('现场解决') !== -1) {
		return 'L4.svg'
	}
	return ''
}

// 格式化附件json字符串
export const formatJsonStr = attaJsonStr => {
	if (attaJsonStr && attaJsonStr.length > 0) {
		try {
			return JSON.parse(attaJsonStr)
		} catch (e) {
			return []
		}
	}
	return []
}

export const formatTaskStatus = status => {
	let text = ''
	let color = ''
	switch (status) {
		case 10:
			;
			(() => {
				text = '待处理'
				color = 'primary'
			})()
			break
		case 100:
			;
			(() => {
				text = '处理中'
				color = 'error'
			})()
			break
		case 200:
			;
			(() => {
				text = '已完成'
				color = 'success'
			})()
			break
		default:
			;
			(() => {
				text = '其他'
				color = 'warning'
			})()
			break
	}
	return {
		color,
		text
	}
}

export const formatSeverityStatus = status => {
	let text = ''
	let color = ''
	switch (status) {
		case 1:
			;
			(() => {
				text = '警告'
				color = 'primary'
			})()
			break
		case 2:
			;
			(() => {
				text = '次要'
				color = 'warning'
			})()
			break
		case 3:
			;
			(() => {
				text = '重要'
				color = 'warning'
			})()
			break
		default:
			;
			(() => {
				text = '严重'
				color = 'danger'
			})()
			break
	}
	return {
		color,
		text
	}
}
export const formatAlertStatus = status => {
	let text = ''
	let color = ''
	switch (status) {
		case 0:
			;
			(() => {
				text = '新产生'
				color = 'primary'
			})()
			break
		case 5:
			;
			(() => {
				text = '已确定'
				color = 'success'
			})()
			break
		case 10:
			;
			(() => {
				text = '处理中'
				color = 'warning'
			})()
			break
		default:
			;
			(() => {
				text = '已解决'
				color = 'default'
			})()
			break
	}
	return {
		color,
		text
	}
}
export const formatAuditStatus = status => {
	let text = ''
	let color = ''
	switch (status) {
		case '-1':
			;
			(() => {
				text = '未提交'
				color = 'primary'
			})()
			break
		case '0':
			;
			(() => {
				text = '不通过'
				color = 'error'
			})()
			break
		case '1':
			;
			(() => {
				text = '通过'
				color = 'success'
			})()
			break
		default:
			;
			(() => {
				text = '待审核'
				color = 'warning'
			})()
			break
	}
	return {
		color,
		text
	}
}

/**
 * 附件预览
 * @param {Object} atta附件{name:'',url:''}
 */
export const filePreview = atta => {
	let name = atta.name
	let url = atta.url
	// 判断文件类型
	if (url && typeof url === 'string') {
		let index = url.lastIndexOf('.')
		let suffix = url.substring(index + 1)
		if (suffix) {
			suffix = suffix.toLowerCase()
			switch (suffix) {
				case 'pdf':
				case 'doc':
				case 'docx':
				case 'xls':
				case 'xlsx':
				case 'ppt':
				case 'pptx':
					// 转换为pdf进行预览
					uni.navigateTo({
						url: '/pages/file/file-preview?name=' + name + '&url=' + url
					})
					break
				case 'jpg':
				case 'jpeg':
				case 'png':
				case 'bmp':
				case 'gif':
					// 预览图片
					uni.previewImage({
						urls: [url],
						longPressActions: {
							itemList: ['发送给朋友', '保存图片', '收藏'],
							success: function(data) {
								console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							},
							fail: function(err) {
								console.log(err.errMsg);
							}
						}
					})
					break
			}
		}
	}
}

//获取URL问号后的参数值
export const getQueryString = (key,url) => {
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    var r = url.match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

export const checkString = (str,flg) => {
	if (flg == 0) {
		var pattern = new RegExp("[\u4E00-\u9FA5]+");
		if(pattern.test(str)){
			return true
		}
	} else if (flg == 1) {
		//验证是否是英文
		var pattern2 = new RegExp("[A-Za-z]+");
		if(pattern2.test(str2)){
			return true
		}
	} else if (flg == 2) {
		//验证是否是数字
		var pattern3 = new RegExp("[0-9]+");
		if(pattern3.test(str3)){
			return true
		}
	}
	return false
}

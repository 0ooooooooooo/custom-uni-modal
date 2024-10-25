var erroNum = true;
let http = (api, requestData = {}, _this) => {
	const payload = {};
	const headerInfo = {};
	
	return uni.request({
		url: api, //接口请求url
		data: payload, // 传输数据给后台
		//自定义请求头信息
		header: headerInfo,
		method: "POST"
	}).then(res => {
		let {
			code,
			data,
			msg
		} = res[1].data;
		// code为0，接口调用成功；否则把后台错误抛出
		if (code === 0) {
			return { data: data, code: 0 };
		} else {
			if (requestErrorData[code] && erroNum) {
				erroNum = false
				if (code === '回到首页') {
					uni.reLaunch({ url: '/pages/index/index' });
				} else {
					console.log(requestErrorData[code]);
					_this && _this.$showModel({
						// ...Todo
					});
				}
			}
			setTimeout(() => {
				erroNum = true
			}, 2 * 1000);
			return {
				data: { 
					...res[1].data,
					...data, 
					errorCode: code
				},
				code: '-1'
			};
		}
	}).catch(catErro => {
		console.log(catErro, 'catErro')
	});
};
export default http;

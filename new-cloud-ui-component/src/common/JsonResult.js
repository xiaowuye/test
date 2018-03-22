

export default {
	value(s, successHandler, errorHandler) {
		var json = s;

		try {
			if (typeof s == "string") {
				json = JSON.parse(s);
				
			} else if (s.responseText!= undefined) {
				s = s.responseText;
				json = JSON.parse(s);

			}

		} catch(e) {
			json = {success:false, errCode:999999, message:"请求错误."+s};
		}

		if (json.success && (typeof json.success == "boolean" || typeof json.success == "number")) {
			if (successHandler) {
				
				return successHandler(json.value);
			}

			return json.value;
		}

		if (json.errCode == -1 || json.errCode == -2) { //UNAUTHENTICATED_ERROR_CODE 未登录错误code / UNAUTHORIZED_ERROR_CODE 未授权错误
			top.location.href = json.message;
			return;
		}
		if (errorHandler) {
			return errorHandler(json.message, json.errCode, json.value);
		}
		return json.message;
	},

	promise(s) {
		var json = s;
		try {
			if (typeof s == "string") {
				json = JSON.parse(s);
			} else if (s.responseText != undefined) {
				s = s.responseText;
				json = JSON.parse(s);
			}
		} catch(e) {
			json = {success:false, errCode:999999, message:"请求错误."+s};
		}

		if (json.success && (typeof json.success == "boolean" || typeof json.success == "number")) {
			return new Promise((resolve, reject) => resolve(json.value));
		}

		if (json.errCode == -1 || json.errCode == -2) { //UNAUTHENTICATED_ERROR_CODE 未登录错误code / UNAUTHORIZED_ERROR_CODE 未授权错误
			top.location.href = json.message;
			return new Promise((resolve, reject) => reject());
		}

		return new Promise((resolve, reject) => reject(json.message, json.errCode, json.value));
	}
}

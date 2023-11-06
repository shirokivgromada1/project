export const BASE_URLS = {
	AUTH: "/authentication",
	DATA: "/data",
}

export const AUTH_ENDPOINTS = {
	REGISTER: `${BASE_URLS.AUTH}/register`,
	SEND_OTP: `${BASE_URLS.AUTH}/send-otp`,
	VERIFY_OTP: `${BASE_URLS.AUTH}/verify-otp`,
	SIGN_UP: `${BASE_URLS.AUTH}/sign-up`,
	SIGN_IN: `${BASE_URLS.AUTH}/login`,
	RESET_PASSWORD: `${BASE_URLS.AUTH}/reset-password`,
	PHONE_UPDATE: `${BASE_URLS.AUTH}/phone-update`,
	VERIFY_PHONE: `${BASE_URLS.AUTH}/verify-phone`,
	VERIFY_REFRESH_TOKEN: `${BASE_URLS.AUTH}/verify-refresh-token`,
	ME: `${BASE_URLS.AUTH}/me`,
	LOGOUT: `${BASE_URLS.AUTH}/logout`,
	EXIST_PHONE: `${BASE_URLS.AUTH}/exist-phone`,
	CAN_PASSWORD_UPDATE: `${BASE_URLS.AUTH}/can-password-update`,
	CAN_PHONE_UPDATE: `${BASE_URLS.AUTH}/can-phone-update`,
	PASSWORD_UPDATE: `${BASE_URLS.AUTH}/password-update`,
	LOCALITY_UPDATE: `${BASE_URLS.AUTH}/locality-update`,
	STATUS_UPDATE: `${BASE_URLS.AUTH}/status-update`,
	VIBER: `${BASE_URLS.AUTH}/viber`,
}

export const DATA_ENDPOINTS = {
	LIST_VILLAGES: `${BASE_URLS.DATA}/villages`,
	LIST_STATUSES: `${BASE_URLS.DATA}/statuses`,
}

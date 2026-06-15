/** 正则校验函数 */

/** 用户名：4-16位，字母/数字/下划线 */
export function validateUsername(username: string): boolean {
  return /^\w{4,16}$/.test(username);
}

/** 密码：≥6位，必须包含字母和数字 */
export function validatePassword(password: string): boolean {
  return /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password);
}

/** 手机号 */
export function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone);
}

/** 邮箱 */
export function validateEmail(email: string): boolean {
  return /^[\w.-]+@[\w.-]+\.\w+$/.test(email);
}

/** 校验提示信息 */
export const validatorMessages = {
  username: '用户名需4-16位，只能包含字母、数字、下划线',
  password: '密码需至少6位，必须包含字母和数字',
  confirmPassword: '两次输入的密码不一致',
  phone: '请输入正确的手机号',
  email: '请输入正确的邮箱地址',
};

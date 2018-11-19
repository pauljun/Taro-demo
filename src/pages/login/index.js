import Taro from '@tarojs/taro'
import {
	View,
	Button,
	Form,
	Input
} from '@tarojs/components'
import request from '../../request'
import LoginBg from '../../assets/loginbg.png'

import './index.scss'

class LoginView extends Taro.Component {
	state = {
		err: '',
		passwordError: '',
		nameTltShow: false,
		pwdTltShow: false
	}
	config = {
		navigationBarTitleText: '',
		navigationBarBackgroundColor: '#446FE9',
		navigationStyle: 'custom'
	}
	formSubmit = e => {
		const options = e.currentTarget.value
		if(!options.loginName){
			return this.setState({
				err: '请输入用户名'
			})
		}
		if(!options.userPwd){
			return this.setState({
				passwordError: '请输入密码'
			})
		}
		Taro.showLoading({
			title: '登录中...',
			mask: true
		})
		this.setState({
			err: '',
			passwordError: ''
		})
		request(
			'user/login',
			'post',
			options,
		).then(res => {
			if (res.code !== 200) {
				Taro.hideLoading()
				return this.setState({
					err: res.message
				})
			}

			Taro.setStorage({
				key: 'token',
				data: res.result,
				success: () => {
					// Taro.redirectTo({url: '/pages/index/index'})
					this.getUserInfo()
				}
			})
		})
	}

	/**获取用户信息 */
	getUserInfo = () => {
		request('user/queryUserPrivileges', 'get').then(res => {
			Taro.hideLoading()
			Taro.setStorage({
				key: 'userInfo',
				data: res.result.userInfo,
				success: () => {
					Taro.redirectTo({ url: '/pages/index/index' })
				}
			})
		})
	}

	nameFocus = () => {
		this.setState({
			nameTltShow: true
		})
	}
	pwdFocus = () => {
		this.setState({
			pwdTltShow: true
		})
	}
	render() {
		const {
			nameTltShow,
			pwdTltShow,
			err,
			passwordError,
		} = this.state
		return (
			<View className="login-wrapper" style={{ backgroundImage: `url(${LoginBg})` }}>
				<View className='title'>
					用户登录
				</View>
				<View className='content'>
					<View className='form'>
						<Form
							onSubmit={this.formSubmit}
						>
							<View className='item'>
								{nameTltShow && <View className='t'>
									账号
								</View>}
								<Input
									placeholder='请输入用户名'
									placeholderClass='pdc'
									name='loginName'
									onFocus={this.nameFocus}
								/>
								<View className='err'>
									<Text>{err}</Text>
								</View>
							</View>
							<View className='item'>
								{pwdTltShow && <View className='t'>
									密码
								</View>}				
								<Input
									type='password'
									placeholderClass='pdc'
									name='userPwd'
									onFocus={this.pwdFocus}
									placeholder='请输入密码'
								/>
								<View className='err'>
									<Text>{passwordError}</Text>
								</View>
							</View>
							<Button
								formType="submit"
							>
								登录
							</Button>
						</Form>
					</View>
				</View>
			</View>
		)
	}
}

export default LoginView
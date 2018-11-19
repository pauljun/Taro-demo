import Taro from '@tarojs/taro'
import {
    View,
    Image,
    Button,
    Navigator
} from '@tarojs/components'
import './index.scss'
import homeBg from '../../assets/home_bg.png'

class view extends Taro.Component {
    state = {
        token: ''
    }
    config = {
        navigationBarTitleText: "",
        navigationBarBackgroundColor: '#3b5eef',
        navigationBarTextStyle: '#fff',
    }
    componentDidMount() {
        var token = Taro.getStorageSync('token')
        this.setState({
            token
        })
    }
    render() {
        return (
            <View className='home-wrapper'>
                <View className='title'>
                    你好,
                    <View>欢迎来到羚机移动</View>
                </View>
                {this.state.token ?
                    <Navigator
                        open-type='redirect'
                        url='/pages/index/index'
                    >
                        进入
                    </Navigator> :
                    <Navigator
                        open-type='redirect'
                        url='/pages/login/index'
                    >
                        登录
                    </Navigator>
                }
                <Image src={homeBg} />
            </View>
        )
    }
}

export default view
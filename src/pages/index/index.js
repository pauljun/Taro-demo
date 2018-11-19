import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  ScrollView,
  Image,
  Navigator
} from '@tarojs/components'
import request from '../../request'
import FooterView from '../../components/Footer/index'
import outDefault from '../../assets/bg.png'
import robotDefault from '../../assets/robotLogo.png'
import './index.scss'

class Index extends Component {
  state = {
    list: [],
    userInfo: {}
  }

  config = {
    navigationBarTitleText: "机器人列表"
  }

  loginOut = () => {
    Taro.clearStorageSync()
    Taro.redirectTo({ url: '/pages/login/index' })
  }

  componentWillMount(){
    const userInfo = Taro.getStorageSync('userInfo')
    request('robot/list', 'POST', {}).then(res => {
      if(res.code === 200){
        this.setState({
          list: res.result,
          userInfo
        })
      }
    })
  }

  getCls = value => {
    if(value >= 80){
      return 'power-icon'
    }
    if(value > 20 && value < 80){
      return 'power-icon low'
    }
    if(value <= 20){
      return 'power-icon red'
    }
  }

  getTime = temp => {
    let samp = temp.replace('T', ' ')
    samp = samp.split('.')[0]
    return samp
  }

  render() {
    const {
      userInfo,
      list
    } = this.state
    return (
      <View className='home-wrapper'>
        <ScrollView
          className='list'
          scroll-y
        >
          <View className='wrapper'>
            <View className='title'>
              欢迎您,{userInfo.realName}
              <Text className='line'>|</Text>
              <Text 
                className='login-out'
                onClick={this.loginOut}
              >
                退出
              </Text>
            </View>
            {list.map((v, k) =>
              <View
                key={k}
                className='item'
              >
                <Navigator 
                  url={`/pages/Living/index?id=${v.robotCode}`}
                >
                  <Image
                      src={outDefault}
                      className='big-url'
                      model='aspectFill'
                  />
                </Navigator>
                <View className='nav-t'>
                  <Image
                    src={v.robotUrl || robotDefault}
                    className='robot-url'
                  />
                  {/* <Image 
                    src={kmUrl}
                    className='km'
                  />
                  <View className={v.robotStatuses.selfStatus.status}>
                    {v.robotStatuses.selfStatus.status === 'online' ? '在线' : '离线'}
                  </View> */}
                </View>
                <View
                  className='content'
                >
                  <View className='name'>
                    <Text>{v.robotName}</Text>
                    {v.robotStatuses && v.robotStatuses.power && 
                      <View className='power'>
                        <View className={this.getCls(v.robotStatuses.power.selfPower)}>
                          <View style={{width: `${v.robotStatuses.power.selfPower}%`}}></View>
                        </View>
                        {v.robotStatuses.power.selfPower}%
                      </View>
                    }
                  </View>
                  <View className='nav'>
                    <Text>
                      运行时间
                  </Text>
                    {v.robotStatuses.power.gatherTime || ''}
                  </View>
                  <View className='nav'>
                    <Text>
                      设备地点
                  </Text>
                    {v.detailAddress}
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        <FooterView type={1} />
      </View>
    )
  }
}

export default Index

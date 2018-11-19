import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'

import Index from './pages/index/index.js'


import './app.scss'

class App extends Component {
  config = {
    pages: [
      'pages/Home/index',
      'pages/login/index',
      'pages/index/index',
      'pages/Task/index',
      'pages/Detail/index',
      'pages/Living/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '羚机移动',
      navigationBarTextStyle: 'black',
    }
  }

  componentWillMount(){

  }

  componentDidMount () {
    var token = Taro.getStorageSync('token')
    if(token){
      Taro.redirectTo({
        url: '/pages/index/index'
      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

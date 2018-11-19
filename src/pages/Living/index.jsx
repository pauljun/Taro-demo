import Taro, { Component } from '@tarojs/taro'
import {
  View,
  LivePlayer,
  CoverView,
  CoverImage
} from '@tarojs/components'
import './style/index.scss'
import request from '../../request'
import ControlsView from './Control'
import VideoView from './components/Video.jsx'
import LivePlayerView from './components/LivePlayer.jsx'

const hlsUrl = 'http://jxsr-api.antelopecloud.cn/v2/'

class Living extends Component {
  state = {
    token: '',
    devicesList: [],
    active: '1',
    rtmpUrl: '',
  }
  config = {
    navigationBarTitleText: "查看视频"
  }
  componentWillMount() {
    const params = this.$router.params
    request('robot/devices', 'post', {
      robotCode: params.id
    }).then(res => {
      this.setState({
        devicesList: res.result.devicesList
      }, () => this.getCameraHls())
    })
  }
  /**根据摄像头获取流地址 */
  getCameraHls = () => {
    const {
      active,
      devicesList
    } = this.state
    const item = devicesList.filter(v => v.extJson.deviceCode === active)[0]
    if(!item.manufacturerDeviceId){
      this.setState({
        rtmpUrl: item.extJson.url
      })
      return 
    }
    request(`device/token/getLyTokenByCameraId/${item.manufacturerDeviceId}`, 'get').then(result => {
      this.setState({
        hls: `${hlsUrl}${item.manufacturerDeviceId}/live.m3u8?client_token=${result.result}`,
        rtmpUrl: '',
      })
    })
  }
  /**切换摄像头 */
  onSelectCamera(active) {
    this.setState({
      active
    }, () => this.getCameraHls())
  }
  render() {
    const {
      hls,
      active,
      devicesList,
      rtmpUrl,
    } = this.state
    let temp = null
    if(!rtmpUrl && !hls){
      temp = <View className='nav'>
        {/* <View className='init'>加载中</View> */}
      </View>
    }else{
      temp = 
      <View className='nav'>
        {rtmpUrl ? 
          <LivePlayerView
            list={devicesList}
            active={active}
            url={rtmpUrl}
            onSelectCamera={this.onSelectCamera}
          /> :
          <VideoView 
            url={hls} 
            list={devicesList}
            active={active}
            onSelectCamera={this.onSelectCamera}
          />
        }
      </View>
    }
    return (
      <View className='live-wrapper'>
        {temp}
        <ControlsView
          cameraId={this.$router.params.id}
          canvasRefs={this.crefs}
          onGetImageData={this.getImageData}
        />
      </View>
    )
  }
}

export default Living

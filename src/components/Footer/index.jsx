import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Navigator
} from '@tarojs/components'
import VideoUrl from '../../assets/video.png'
import VideoDefaultUrl from '../../assets/video_active.png'
import TaskUrl from '../../assets/task.png'
import TaskDefaultUrl from '../../assets/task_active.png'
import './index.scss'

class Footer extends Component {
  componentDidHide() { }

  propTypes = {
    type: PropTypes.Number
  }

  render() {
    const type = this.props.type
    return (
      <View className='footer-wrapper'>
        <Navigator
          url='/pages/index/index'
          open-type="redirect"
        >
          <Image src={type === 2 ? VideoUrl : VideoDefaultUrl} />
          <View>视频查看</View>
        </Navigator>
        <Navigator
          url='/pages/Task/index'
          open-type="redirect"
        >
          <Image src={type === 1 ? TaskUrl : TaskDefaultUrl} />
          <View>老板管家</View>
        </Navigator>
      </View>
    )
  }
}

export default Footer

import Taro, { Component } from '@tarojs/taro'
import {
  View
} from '@tarojs/components'
import './index.scss'

class Footer extends Component {
  render() {
    return (
      <View className={this.props.visable ? 'modal-wrapper' : 'modal-hidden'}>
        {this.props.children}
      </View>
    )
  }
}

export default Footer

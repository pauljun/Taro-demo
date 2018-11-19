import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Swiper,
  SwiperItem,
  Image
} from '@tarojs/components'
import './index.scss'

class Footer extends Component {
  render() {
    return (
      <View className='image-list-wrapper'>
        <Swiper current={this.props.current}>
            {this.props.data.map(v => 
                <SwiperItem key={v.id}>
                    <View className='item'>
                        <Image src={v.scenePath} model='aspectFill' />
                    </View>
                </SwiperItem>    
            )}
        </Swiper>
      </View>
    )
  }
}

export default Footer

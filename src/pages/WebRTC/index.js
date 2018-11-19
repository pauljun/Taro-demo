import Taro, { Component } from '@tarojs/taro'
import {
    View,
    WebView
} from '@tarojs/components'
import './index.scss'
class view extends Component {
    bindload = e => {
        alert('加载成功')
    }
    binderror = e => {
        alert('加载失败')
    }
    render(){
        return (
            <View>
                <WebView src='http://localhost:3000/' />
                {/* <WebView 
                    src='http://rmstest.topvdn.com:3000'
                    bindload={this.bindload}
                    binderror={this.binderror}
                ></WebView> */}
            </View>
        )
    }
}

export default view
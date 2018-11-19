import Taro from '@tarojs/taro'
import {
    LivePlayer,
    View,
    CoverImage
} from '@tarojs/components'
import fullIcon from '../../../assets/full.png'
import VideoTools from './VideoTools.jsx'
import '../style/VideoLivePlayer.scss'

const errCode = {
    2001: '加载中...',
    2103: '连接失败，正在重新连接...',
    2301: '经多次重连失败，放弃重连'
}

class view extends Taro.Component {
    state = {
        loading: '获取视频数据中...'
    }
    onStateChange = e => {
        let err = errCode[e.detail.code]
        if(!err){
            return 
        }
        this.setState({
            loading: e.detail.code === 2004 ? '' : err
        })
    }
    full = () => {
        console.log(this.LivePlayerContext)
        this.LivePlayerContext.stop()
        this.LivePlayerContext.requestFullScreen({
            direction: 90,
            success: () => {
                console.log('成功')
            },
            fail: () => {
                console.log('失败')
            },
            complete: () => {
                console.log('完成')
            }
        })
    }
    componentDidMount() {
        this.LivePlayerContext = Taro.createLivePlayerContext('live-player')
    }
    render() {
        const {
            url,
            list,
            active,
            onSelectCamera
        } = this.props
        const {
            loading
        } = this.state
        return (
            <View className='video-wrapper'>
                <LivePlayer
                    // src="rtmp://rtmp7.public.topvdn.cn/live/537067527"
                    //   src='http://58.49.28.186:58262/live/223456112901000001/0.flv'
                    src={url}
                    mode="live"
                    object-fit="fillCrop"
                    autoplay
                    orientation='horizontal'
                    id='live-player'
                    onStateChange={this.onStateChange}
                >
                    <CoverImage
                        src={fullIcon}
                        className='full-icon'
                        onClick={this.full}
                    />
                    {loading && <CoverView className='status'>
                        {loading}
                    </CoverView>}
                    <VideoTools
                        list={list}
                        onSelectCamera={onSelectCamera}
                        active={active}
                    />
                </LivePlayer>
            </View>
        )
    }
}

export default view
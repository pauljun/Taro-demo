import Taro from '@tarojs/taro'
import {
    Video,
    View,
    CoverView
} from '@tarojs/components'
import VideoTools from './VideoTools.jsx'
import '../style/VideoLivePlayer.scss'

const ErrCode = {
    'MEDIA_ERR_NETWORK': '加载失败',
    'MEDIA_ERR_DECODE': '解码失败',
    'MEDIA_ERR_SRC_NOT_SUPPORTED': '不支持的流格式'
}   

class view extends Taro.Component {
    state = {
        loading: '获取视频数据中...'
    }
    onError = e => {
        this.setState({
            loading: ErrCode[e.detail.errMsg]
        })
    }
    play = e => {
        this.setState({
            loading: ''
        })
    }
    bindwaiting = e => {
        this.setState({
            loading: '缓冲中...'
        })
    }
    bindtimeupdate = e => {
        if(this.state.loading){
            this.setState({
                loading: ''
            })
        }
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
                <Video
                    src={url}
                    autoplay
                    objectFit='fill'
                    onError={this.onError}
                    show-play-btn={false}
                    show-center-play-btn={false}
                    show-progress={false}
                    onPlay={this.play}
                    onWaiting={this.bindwaiting}
                    onTimeupdate={this.bindtimeupdate}
                >
                    <VideoTools
                        list={list}
                        onSelectCamera={onSelectCamera}
                        active={active}
                    />
                    {loading && <CoverView className='status'>
                        {loading}
                    </CoverView>}
                </Video>
            </View>
        )
    }
}

export default view
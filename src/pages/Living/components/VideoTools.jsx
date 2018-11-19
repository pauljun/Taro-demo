import Taro from '@tarojs/taro'
import {
    CoverImage,
    CoverView,
    Text
} from '@tarojs/components'
import cameraIcon from '../../../assets/camera.png'
import '../style/VideoTools.scss'
const direction = [
    {
      value: '1',
      label: '前'
    },
    {
      value: '2',
      label: '后'
    },
    {
      value: '3',
      label: '左'
    }, {
      value: '4',
      label: '右'
    }
  ]
  
  const getDirectionByValue = value => {
    return direction.filter(v => v.value === value)[0]
  }

class view extends Taro.Component {
    state = {
        visable: false
    }
    /**切换摄像头 */
    selectCamera(active) {
        this.setState({
            visable: false
        }, () => {
            this.props.onSelectCamera(active)
        })
    }
    changeCamera = () => {
        this.setState({
            visable: !this.state.visable
        })
    }
    render() {
        const {
            visable
        } = this.state
        const {
            active,
            list
        } = this.props
        return (
            <CoverView className='control'>
                {list && list.length && list.length !== 1 && 
                <CoverView
                    className='n'
                    onClick={this.changeCamera}
                >
                    <CoverImage src={cameraIcon} />
                    <CoverView>{getDirectionByValue(active).label}摄像头</CoverView>
                </CoverView >}
                {
                    visable &&
                    <CoverView className='sel'>
                        {list && list.length && list.length !== 1 && list.map(v =>
                            <CoverView
                                key={v.id}
                                code={v.extJson.deviceCode}
                                className={active === v.extJson.deviceCode ? 'f active' : 'f'}
                                onClick={this.selectCamera.bind(this, v.extJson.deviceCode)}
                            >
                                {getDirectionByValue(v.extJson.deviceCode).label}
                            </CoverView >
                        )}
                    </CoverView >
                }
            </CoverView>
        )
    }
}
view.defaultProps={
    list: []
}

export default view
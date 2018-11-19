import Taro, { Component } from '@tarojs/taro'
import {
    View,
    Image,
} from '@tarojs/components'
import './style/control.scss'
import request from '../../request'

import sosUrl from '../../assets/control/sos.png'
import fitUrl from '../../assets/control/fit.png'
import stopUrl from '../../assets/control/stop.png'
import chartUrl from '../../assets/control/chart.png'

class Controls extends Component {
    state = {
        status: false,
        sosStatus: false
    }
    control(type) {
        Taro.showNavigationBarLoading()
        let options = {}
        const {
            status,
            sosStatus
        } = this.state
        if (type === 1) {
            options = {
                cmdRecharge: {
                    rechargeControl: 2,
                    rechargeThresholdValue: 25
                }
            }
        }
        if (type === 2) {
            options = {
                cmdEmergency: {
                    control: status ? 1 : 0,
                    mode: 1
                }
            }
        }
        if (type === 3) {
            options = {
                cmdAlarm: {
                    alarmControl: sosStatus ? 2 : 1
                }
            }
        }
        request('robot/control', 'post', {
            msgType: 'MT_MSG_CMD_CONTROL_REQ',
            robotCode: this.props.cameraId,
            cmds: options
        }).then(res => {
            if (res.code === 200) {
                Taro.showToast({
                    title: '执行成功',
                    icon: 'success'
                })
                if (type === 2) {
                    this.setState({
                        status: !status
                    })
                }
                if (type === 3) {
                    this.setState({
                        sosStatus: !sosStatus
                    })
                }
            } else {
                Taro.showToast({
                    title: '执行失败',
                    icon: 'none'
                })
            }
            setTimeout(() => {
                Taro.hideToast()
                Taro.hideNavigationBarLoading()
            }, 3000)
        })
    }
    /**查看全景图 */
    queryMap = () => {
        if (this.mapUrl) {
            this.previewImage()
            return
        }
        request('robot/queryCurrentMap', 'post', {
            robotCode: this.props.cameraId
        }).then(res => {
            if (res.code === 200) {
                this.mapUrl = res.result.pngUrl
                this.previewImage()
            } else {
                Taro.showToast({
                    title: '获取地图失败',
                    icon: 'none'
                })
            }
        })
    }
    /**查看地图 */
    previewImage = () => {
        Taro.previewImage({
            urls: [this.mapUrl]
        })
    }
    render() {
        const {
            status,
            sosStatus,
        } = this.state
        return (
            <View className='living-tools'>
                <View
                    className='item'
                    onClick={this.control.bind(this, 1)}
                >
                    <Image src={fitUrl} />
                    <View>充电</View>
                </View>
                <View
                    className={status ? 'item active' : 'item'}
                    onClick={this.control.bind(this, 2)}
                >
                    <Image src={stopUrl} />
                    <View>{status ? '启动' : '急停'}</View>
                </View>
                <View
                    className='item'
                    onClick={this.queryMap}
                >
                    <Image src={chartUrl} />
                    <View>地图</View>
                </View>
                <View
                    className={sosStatus ? 'item active' : 'item'}
                    onClick={this.control.bind(this, 3)}
                >
                    <Image src={sosUrl} />
                    <View>SOS</View>
                </View>
            </View>
        )
    }
}

export default Controls

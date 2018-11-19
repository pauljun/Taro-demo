import Taro, { Component } from '@tarojs/taro'
import {
    View,
    Button,
    Text,
    Image,
    ScrollView
} from '@tarojs/components'
import './index.scss'
import request from '../../request'
import Modal from '../../components/Modal/index'
import closeIcon from '../../assets/close.png'
import ImageFull from '../../components/ImageFull/index'
import util from '../../util'

class Detail extends Component {
    pageNum = 1
    isNoMore = false
    state = {
        captureList: [],
        mapUrl: '',
        visable: false,
        statistics: {
            fail: 0,
            success: 0
        },
        imgVisable: false,
        imgCurrent: 0,
        pageNum: 1
    }
    config = {
        navigationBarTitleText: "任务详情"
    }
    componentWillMount() {
        const params = this.$router.params
        request('statistics/taskstatus', 'post', {
            jobCode: params.jobCode
        }).then(res => {
            this.setState({
                statistics: {
                    fail: res.result.filter(v => v.taskName === 'FAIL')[0] ? res.result.filter(v => v.taskName === 'FAIL')[0].id : 0,
                    success: res.result.filter(v => v.taskName === 'SUCCESS')[0] ? res.result.filter(v => v.taskName === 'SUCCESS')[0].id : 0
                }
            })
        })
        this.getCaptureList()
    }
    /**获取抓拍图片 */
    getCaptureList = () => {
        const params = this.$router.params
        request('alarm/historytasks', 'post', {
            jobCode: params.jobCode,
            pageNum: this.pageNum,
            pageSize: 20,
            robotCode: params.robotCode
        }).then(res => {
            const list = res.result.captureList || []
            if(list.length < 20){
                this.isNoMore = true
            }
            this.pageNum ++
            this.setState({
                captureList: this.state.captureList.concat(list)
            })
        })
    }
    /**查看地图 */
    getMapUrl = () => {
        const params = this.$router.params
        if(this.state.mapUrl){
            this.previewImage()
            return
        }
        request('robot/queryCurrentMap', 'post', {
            robotCode: params.robotCode
        }).then(res => {
            this.setState({
                mapUrl: res.result.pngUrl,
                // visable: true
            }, () => this.previewImage())
        })
    }
    /**查看地图 */
    previewImage = () => {
        Taro.previewImage({
            urls: [this.state.mapUrl]
        })
    }
    cancel = () => {
        this.setState({
            visable: false
        })
    }
    lookList = index => {
        Taro.previewImage({
            urls: this.state.captureList.map(v => v.scenePath),
            current: index
        })
    }
    scroll = () => {
        if(this.isNoMore){
            return
        }
        this.getCaptureList()
    }
    render() {
        const params = this.$router.params
        const {
            captureList,
            mapUrl,
            visable,
            statistics,
            imgCurrent
        } = this.state
        return (
            <View className='task-detail-wrapper'>
                <ScrollView
                    className='scroll'
                    scrollY={true}
                    lowerThreshold={10}
                    onScrollToLower={this.scroll}
                >
                    <View className='title'>任务信息</View>
                    <View className='detail'>
                        <View className='item'>
                            <Text>任务名</Text>
                            {params.name}
                        </View>
                        <View className='item'>
                            <Text>任务日期</Text>
                            {util(params.beginDate, false)} ~ {util(params.endDate, false)}
                        </View>
                        <View className='item'>
                            <Text>执行时间</Text>
                            {params.beginTime} ~ {params.endTime}
                            <Button
                                onClick={this.getMapUrl}
                            >
                                查看地图
                            </Button>
                        </View>
                    </View>
                    <View className='count'>
                        <View className='item'>
                            <Text>{statistics.fail + statistics.success}</Text>
                            <View>执行总数</View>
                        </View>
                        <View className='item'>
                            <Text>{statistics.success}</Text>
                            <View>执行成功</View>
                        </View>
                        <View className='item'>
                            <Text>{statistics.fail}</Text>
                            <View>执行失败</View>
                        </View>
                    </View>
                    <View className='title'>抓拍信息</View>
                    <View className='capture'>
                        {captureList.map((v,index) =>                     
                            <View key={v.id} className='item'>
                                <View className='content'>
                                    <View className='name'>{v.positionName}</View>
                                    <View className='time'>{util(v.captureTime)}</View>
                                </View>
                                <View className='image' onClick={this.lookList.bind(this, index)}>
                                    <Image src={v.scenePath} model='aspectFill' />
                                </View>
                                <View className='desc'>
                                    <Text>备注：</Text>
                                    {v.positionDesc}
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
                <Modal
                    visable={visable}
                >
                    <View className='map-container'>
                        <Image className='image' src={mapUrl} />
                        <View className='close'>
                            <Image onClick={this.cancel} src={closeIcon} />
                        </View>
                    </View>
                </Modal>

                {imgVisable && <ImageFull data={captureList} current={imgCurrent} />}
            </View>
        )
    }
}

export default Detail

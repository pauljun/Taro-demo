import Taro, { Component } from '@tarojs/taro'
import {
    View,
    Swiper,
    SwiperItem,
    Navigator
} from '@tarojs/components'
import FooterView from '../../components/Footer/index'
import request from '../../request'
import './index.scss'

class Living extends Component {
    state = {
        data: [],
        nightData: [],
        type: 0
    }
    config = {
        navigationBarTitleText: "老板管家"
    }
    componentDidShow() {
        request('robot/getRobotTasks', 'post', {
            taskType: '115501'
        }).then(res => {
            if(res.code === 200){
                this.setState({
                    data: res.result
                })
            }
        })
        request('robot/getRobotTasks', 'post', {
            taskType: '115502'
        }).then(res => {
            if(res.code === 200){
                this.setState({
                    nightData: res.result || []
                })
            }
        })
    }

    onChange = e => {
        this.setState({
            type: e.detail.current
        })
    }
    setCurrent = type => {
        this.setState({type})
    }
    /**获取任务状态 */
    getTaskStatus = status => {
        switch(status){
            case 'SUCCESS':
                return {
                    name:'已完成',
                    cls: 's'
                }
            case 'FAIL':
            return {
                name:'出错',
                cls: 'f'
            }
            default:
            return {
                name:'未执行',
                cls: 'n'
            }
        }
    }
    /**任务列表组件 */
    getListItem = v => {
        
    }
    render() {
        const {
            data,
            nightData,
            type
        } = this.state
        return (
            <View className='working-wrapper'>
                <View className='task-nav-wrapper'>
                    <View 
                        className={type === 0 ? 'active' : ''}
                        onClick={this.setCurrent.bind(this,0)}
                    >
                        上班查岗
                    </View>
                    <View className='line'>|</View>
                    <View 
                        className={type === 1 ? 'active' : ''}
                        onClick={this.setCurrent.bind(this,1)}
                    >
                        夜间巡逻
                    </View>
                </View>
                <Swiper
                    onChange={this.onChange}
                    className='swiper'
                    current={type}
                >
                    <SwiperItem>
                        <View className='list'>
                            {data.length ? data.map(v =>
                                <View className='item' key={v.id}>
                                    <Navigator
                                        url={`/pages/Detail/index?id=${v.id}&jobCode=${v.scheduleCode}&robotCode=${v.robotCode}&name=${v.scheduleName}&beginDate=${v.beginDate}&endDate=${v.endDate}&beginTime=${v.beginTime}&endTime=${v.endTime}`}
                                        className='name'
                                    >
                                        {v.scheduleName}
                                        <Text className={this.getTaskStatus(v.result).cls}>{this.getTaskStatus(v.result).name}</Text>
                                    </Navigator>
                                </View>
                            ) : <View className='no-data'>暂无上班查岗任务</View>}
                        </View>
                    </SwiperItem>
                    <SwiperItem>
                        <View className='list'>
                            {nightData.length ? nightData.map(v =>
                                <View className='item' key={v.id}>
                                    <Navigator
                                        url={`/pages/Detail/index?id=${v.id}&jobCode=${v.scheduleCode}&robotCode=${v.robotCode}&name=${v.scheduleName}&beginDate=${v.beginDate}&endDate=${v.endDate}&beginTime=${v.beginTime}&endTime=${v.endTime}`}
                                        className='name'
                                    >
                                        {v.scheduleName}
                                        <Text className={this.getTaskStatus(v.result).cls}>{this.getTaskStatus(v.result).name}</Text>
                                    </Navigator>
                                </View>
                            ) : <View className='no-data'>暂无夜间巡逻任务</View>}
                        </View>
                    </SwiperItem>
                </Swiper>
                <FooterView type={2} />
            </View>
        )
    }
}

export default Living

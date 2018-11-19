import Taro from '@tarojs/taro'

const api = 'https://rmstest.topvdn.com:9988/api/'
// const api = 'http://58.49.28.186:58281/'
// const api = 'http://192.168.100.181:9091/'
export default (url, method = 'GET', data) => {
    Taro.showNavigationBarLoading()
    var token = Taro.getStorageSync('token')
    return new Promise((resolve,inject) => Taro.request({
        url:api + url,
        data,
        method,
        dataType: 'json',
        header: {
            authorization: token || ''
        },
        success(res){
            if(res.data.code === 407 || !res.data){
                Taro.redirectTo({
                    url: '/pages/login/index'
                })
                inject()
            }else{
                resolve(res.data)
            }
            setTimeout(() => {
                Taro.hideNavigationBarLoading()
            }, 300);
        }
    }))
}
import qcloud from '../../vendor/wafer2-client-sdk/index';
import config from '../../config';
import util from '../../utils/util';

const addTask = {
    data:{
        date: '2018-09-01',
        time: '09:00',
        title:'',
        showLoaction:false,
        detail:'',
        shareTicket:''
    },
    onLoad(){
        wx.showShareMenu({
            withShareTicket: true,
            success:r=>{
                console.log(r);
            }
        });
        wx.getShareInfo({
            shareTicket:1234567,
            success:(e,d,i)=>{
                console.log(e);
                console.log(d);
                console.log(i);
            }
        });
    },
    bindDateChange(e){
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
          date: e.detail.value
        });
    },
    bindTimeChange(e){
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
          time: e.detail.value
        });
    },
    getLocationChange(e){
        this.setData({
            showLoaction: e.detail.value
        });
    },
    formSubmit(e){
        // this.setData({
        //    title: e.detail.value.title,
        //    detail: e.detail.value.detail
        // });
        console.log(this.data);
        this.saveData();
    },
    saveData(){
        qcloud.request({
            url: `${config.service.host}/weapp/demo`,
            login: true,
            data: this.data,
            success (result) {
                util.showSuccess('请求成功完成')
                // that.setData({
                //     requestResult: JSON.stringify(result.data)
                // })
            },
            fail (error) {
                util.showModel('请求失败', error);
                console.log('request fail', error);
            }
        })
    },
    onShareAppMessage(res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
        }
        return {
          title: '自定义转发标题',
          path: '/page/user?id=123',
          success: function(res) {
            // 转发成功
            this.setData({shareTicket:res.shareTickets.pop()});
            //this.saveData();
          },
          fail: function(res) {
            // 转发失败
          }
        }
    }
}
Page(addTask);
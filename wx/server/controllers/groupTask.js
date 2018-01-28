const debug = require('debug')('saveGroupTask');
const taskDbService = require('../services/TaskDbService');
const util = require('../utilities/checkUtility');

const groupTask = {
    async get(ctx,next){
        let queryTaskId = ctx.request.query.taskId?ctx.request.query.taskId:1;
        let taskEntity = await taskDbService.getTask(queryTaskId);
        let {title,detail,create_by,is_single,req_location,req_name,end_time,create_time} = taskEntity;
        let endTime = end_time?end_time.getTime()>1514736000000 ? end_time:null:null;
        ctx.state.data = {title,detail,taskId:queryTaskId,isSingle:is_single,reqLocation:req_location,endTime:endTime,createTime:create_time};
    },
    async post(ctx, next){
        let checked = !util.checkLogin(ctx) && !util.checkNotNull(ctx,['title']);
        if(!checked) return;
        debug('%s: %O', 'Req:', ctx.request.body);
        let reqTask = {...ctx.request.body};
        //console.log(ctx.state.$wxInfo);
        let task = await taskDbService.saveTask(ctx.state.$wxInfo.userinfo,reqTask);
        ctx.state.data = task;
    }
}
module.exports = groupTask;
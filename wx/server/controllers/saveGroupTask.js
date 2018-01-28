const debug = require('debug')('saveGroupTask');
const taskDbService = require('../services/TaskDbService');
const util = require('../utilities/checkUtility');

const saveGroupTask = {
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
module.exports = saveGroupTask;
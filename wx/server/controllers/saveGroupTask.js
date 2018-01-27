const debug = require('debug')('saveGroupTask');
const taskDbService = require('../services/TaskDbService');

const util = {
    checkLogin(ctx){
        if(ctx.state.$wxInfo.loginState !== 1){
            ctx.state.code=-1;
            return;
        }
    }
}


const saveGroupTask = {
    async post(ctx, next){
        util.checkLogin(ctx);
        debug('%s: %O', 'Req:', ctx.request.body);
        let reqTask = {...ctx.request.body};
        //console.log(ctx.state.$wxInfo);
        let task = await taskDbService.saveTask(ctx.state.$wxInfo.userinfo,reqTask);
        ctx.state.data = task;
    }
}
module.exports = saveGroupTask;
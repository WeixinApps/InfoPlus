const { mysql } = require('../qcloud');
const uuidGenerator = require('uuid/v4')
const shortid = require('shortid');
const moment = require('moment')
const debug = require('debug')('TaskDbService');

const TaskDbService ={
    getTask(taskId,groupId,shareTicket){
        let task_id = taskId;
        return mysql('cGroupTask').where({task_id})
        .then(res=>{
            if(!res[0]) return {};
            return res[0];
        })
        .catch(e => {
            debug('%s: %O', 'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB', e)
            throw new Error(`${'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB'}\n${e}`)
        })
    },
    saveTask(userInfo,task){
        let task_id = task.id ? task.id: shortid.generate();//uuidGenerator();
        const create_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const update_time = create_time;
        const create_by = userInfo.openId;
        const title = task.title;
        const detail = task.detail;
        const is_single = task.isSingle;
        const req_location = task.showLocation;
        const req_name = task.reqName;
        const end_time = task.endTime;
        const entity = {
            create_by,update_time,title,detail,is_single,req_location,req_name,end_time
        };

        return mysql('cGroupTask').count('task_id as hasTask').where({
            task_id
        })
        .then(res => {
            // 如果存在用户则更新
            if (res[0].hasTask) {
                return mysql('cGroupTask').update(entity).where({
                    task_id
                });
            } else {
                return mysql('cGroupTask').insert({...entity,create_time,task_id});
            }
        })
        .then(() => ({
            taskId: task_id,
            nickName:userInfo.nickName,
            title:title
        }))
        .catch(e => {
            debug('%s: %O', 'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB', e)
            throw new Error(`${'ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB'}\n${e}`)
        })
    },
    saveTaskShare(userInfo,taskId,shareTicket,groupId){
        const create_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const update_time = create_time;

    }
}

module.exports = TaskDbService;
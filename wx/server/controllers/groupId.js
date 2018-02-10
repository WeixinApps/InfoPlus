const debug = require('debug')('saveGroupId');
const taskDbService = require('../services/TaskDbService');
const userDbService = require('../services/UserDbService');
const util = require('../utilities/checkUtility');
const aesDecrypt = require('../utilities/aesDecrypt');

const groupId = {

    async post(ctx, next){
        let checked = !util.checkLogin(ctx) && !util.checkNotNull(ctx,['taskId']);
        if(!checked) return;
        debug('%s: %O', 'Req:', ctx.request.body);
        let openId = ctx.state.$wxInfo.userinfo.openId;
        let {session_key} = await userDbService.getUserInfo(openId);
        let {shareTicket,iv,encryptedData} = {...ctx.request.body};
        let decryptedData;
        try {
            decryptedData = aesDecrypt(session_key, iv, encryptedData);
            decryptedData = JSON.parse(decryptedData);
            let groupId = decryptedData.openGId;
        } catch (e) {
            debug('Auth: %s: %o', "ERRORS.ERR_IN_DECRYPT_DATA", e);
            throw new Error(`${"ERRORS.ERR_IN_DECRYPT_DATA"}\n${e}`);
        }



        ctx.state.data = decryptedData;
    }
}
module.exports = groupId;
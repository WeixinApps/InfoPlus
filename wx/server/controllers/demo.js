const demo = {
    async get(ctx, next){
        ctx.state.data = {
            msg:'Hello World2'
        }
    },
    async post(ctx, next){

    }
}
module.exports = demo;
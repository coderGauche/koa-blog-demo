const errorTypes=require('../constants/error-types')
const errorHandle = (error,ctx) => {
    console.log(error);
    let status,message;
    switch(error.message){
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status=400; //参数穿错误，错误请求
            message="用户名不能为空";
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status=409; //参数穿错误，错误请求
            message="用户名已存在";
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status=400; //参数穿错误，错误请求
            message="用户不存在";
            break;
        case errorTypes.PASSWORD_IS_INCORRENT:
            status=400; //参数穿错误，错误请求
            message="密码有误";
            break;
        case errorTypes.UNAUTHORIZATION:
            status=400; //参数穿错误，错误请求
            message="无效的token~";
            break;
        case errorTypes.UNPERMISSION:
            status=400; //参数穿错误，错误请求
            message="您不具备操作的权限~";
            break;
        default:
            status=404; //参数穿错误，错误请求
            message="NOT FOUND";

    }
    ctx.status = status;
    ctx.body =message;
}
module.exports = errorHandle 
import request from '@/utils/request'

// 声音推送 保存
export function voiceState(params){
    return request ({
        url:request.adornUrl("/manage/sys/user/isSendPolice"),
        methods: "get",
        params: request.adornParams(params)
    })
}
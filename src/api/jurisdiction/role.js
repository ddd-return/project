import request from '@/utils/request'

export function getTableData(params){
    return request ({
        url:request.adornUrl("/manage/sys/role/page"),
        method: "get",
        params: request.adornParams(params)
    })
}
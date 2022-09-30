import request from '@/utils/request'

export function getTableData(params){
    return request ({
        url:request.adornUrl("/manage/manufacturingCorporation/listAll"),
        method: "get",
        params: request.adornParams(params)
    })
}



export function postTableUpdate(data){

    return request ({
        url:request.adornUrl("/manage/manufacturingCorporation/update"),
        method: "post",
        data: request.adornData(data)
    })
}

export function postTableAdd(data) {
    return request({
        url:request.adornUrl("/manage/manufacturingCorporation/add"),
        method: "post",
        data: request.adornData(data)
    })
}


export function postTabledelete(data) {
    return request({
        url:request.adornUrl("/manage/manufacturingCorporation/delete"),
        method: "post",
        data: request.adornData(data)
    })
}


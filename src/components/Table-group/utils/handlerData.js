import { _IsDate } from './judge'



export const _Clone = source => {
  let target
  if (typeof source === 'object' && source !== null && !_IsDate(source)) {
    target = Array.isArray(source) ? [] : {}
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (typeof source[key] !== 'object') {
          target[key] = source[key]
        } else {
          target[key] = _Clone(source[key])
        }
      }
    }
  } else {
    target = source
  }
  return target
}

export const _ToMoney = num => {
  num = Number(num).toFixed(2)
  num = parseFloat(num)
  num = num.toLocaleString()
  return num
}

export const _DataTypeChange = (data, sign = ',') => {
  if (data) {
    return Array.isArray(data) ? data : data.split(sign)
  }
  return []
}

export const _HandlerToLowerCase = val =>
  val.replace(/([A-Z])/g, '-$1').toLowerCase()

export const _GetConfigItemData = (data, prop) => {
  for (const val of data) {
    if (val.prop === prop) return val
  }
  return null
}



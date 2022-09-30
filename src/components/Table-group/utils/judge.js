// export const _DataTypeJudge = data => Object.prototype.toString.call(data)

/**
 * 判断数据的类型 handler
 *
 */
export const _IsDataType = (obj, type) => {
  const str = Object.prototype.toString
    .call(obj)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase()

  if (type) return str === type
  return str
}

/** 环境判断 */
export const _IsDev = process.env.NODE_ENV === 'development'

/**
 * 判断是否是Object
 *
 * @param {*} param
 * @returns {boolean}
 */
export const _IsObject = param => _IsDataType(param, 'object')

/**
 * 判断是否是Null
 *
 * @param {*} param
 * @returns {boolean}
 */
export const _IsNull = param => _IsDataType(param, 'null')

/**
 * 判断是否是fucntion
 *
 * @param {*} param
 * @returns {boolean}
 */
export const _IsFunction = param => _IsDataType(param, 'function')

/**
 * 判断是否是 boolean
 *
 * @param {*} param
 * @returns {boolean}
 */
export const _IsBoolean = param => _IsDataType(param, 'boolean')

/**
 * 判断是否是 number
 *
 * @param {*} param
 * @returns {boolean}
 */
export const _IsNumber = param => _IsDataType(param, 'number')

/**
 * 判断是否是 string
 *
 * @param {*} param
 * @returns {boolean}
 */
export const _IsString = param => _IsDataType(param, 'string')

/**
 * 判断是否是 date
 *
 * @param {*} param
 * @returns { boolean }
 */
export const _IsDate = (param) => _IsDataType(param, 'date')

/**
 * 判断数据是否为空
 *
 * @param {any} data 判断数据
 * @param {any[]} [ignore=[]] ignore 忽略固定值
 * @returns {boolean}
 */
export const _DataIsEmpty = (data, ignore = []) => {
  if (ignore.includes(data)) return true
  let flag = false
  if (_IsObject(data)) {
    flag = Boolean(Object.keys(data).length)
    if (ignore.includes(JSON.stringify(data))) return true
  } else if (Array.isArray(data)) {
    flag = Boolean(data.length)
    if (ignore.includes(JSON.stringify(data))) return true
  } else {
    flag = Boolean(data)
  }
  return flag
}

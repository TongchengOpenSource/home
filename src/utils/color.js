//import md5 from 'md5'

// import _ from "lodash";

/**
 * 导出公共方法
 */
export default {
    generateRangeColorArr(startColor,endColor,arrNum){
        startColor = startColor.split("#")[1]
        endColor = endColor.split("#")[1]
        let startNum = parseInt(startColor,16)
        let endNum = parseInt(endColor,16)
        let average = Math.abs((startNum - endNum)/arrNum)
        let arr = []
        if(startNum>endNum){
            for(let i=0;i<arrNum;i++){
                arr.push(`#${(startNum - i*average).toString(16).split('.')[0]}`)
            }
        }else{
            for(let i=0;i<arrNum;i++){
                arr.push(`#${(endNum - i*startNum).toString(16).split('.')[0]}`)
            }
        }
        return arr
    },
    gradientColor(startColor, endColor, count, step) {
        let startRGB = this.colorToRgb(startColor), //转换为rgb数组模式
            startR = startRGB[0],
            startG = startRGB[1],
            startB = startRGB[2]

        let endRGB = this.colorToRgb(endColor),
            endR = endRGB[0],
            endG = endRGB[1],
            endB = endRGB[2]

        let sR = (endR - startR) / step, //总差值
            sG = (endG - startG) / step,
            sB = (endB - startB) / step

        let generateRStr = (r, g, b) => {
            return 'rgb(' + parseInt(r) + ',' + parseInt(g) + ',' + parseInt(b) + ')'
        }

        let colorArr = []
        for (let i = 0; i < step; i++) {
            // 计算每一步的rgb值
            if (count % 2 !== 0 && i == 0) {
                colorArr.push(generateRStr(startR, startG, startB))
            } else if (count % 2 !== 0 && i == step - 1) {
                colorArr.push(generateRStr(endR, endG, endB))
            } else {
                colorArr.push(generateRStr(sR * i + startR, sG * i + startG, sB * i + startB))
            }
        }
        return colorArr
    },
    colorToRgb(hexColor) {
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        let sColor = hexColor.toLowerCase()
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = "#"
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                }
                sColor = sColorNew
            }
            //处理六位的颜色值
            let sColorChange = []
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)))
            }
            return sColorChange
        } else {
            return sColor
        }
    },
    multipleGradientColor(colorArr = [], count = 5) {
        if(count==0)return []
        let arr = [],
            cLen = colorArr.length
        if (count === 1) return [colorArr[0]]
        if (count === 2) return [colorArr[0], colorArr[cLen - 1]]

        let devid = Math.ceil(count / (cLen - 1)) // 每两个渐变色产生的颜色个数
        for (let i = 0, len = cLen - 1; i < len; i++) {
            arr.push(...this.gradientColor(colorArr[i], colorArr[i + 1], count, devid))
        }
        let removeLen = arr.length - count
        if(removeLen > 0) { // 移除多余 count 的颜色
            for (let j = removeLen; j > 0; j --) {
                arr.splice(j * devid, 1)
            }
        }

        return arr
    },
    /**
     * json转换为GET请求URL拼接的格式
     * @param json
     * @returns {string}
     */
    jsonToQueryString: (json) => {
        json = json || {}
        return '?' +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    },
    jsonToHrefString: (json) => {
        return '/' +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(json[key])
            }).join('/');
    },
    getQueryString: (name) => {
        let reg = `(^|&)${name}=([^&]*)(&|$)`
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    /**
     * @desc 转换json为graphql请求格式
     * @param type 操作类型
     * @param method 请求方法
     * @param queryJson 请求对象
     * @param resp 请求返回格式
     * @return {string} 请求格式字符串
     */
    jsonToGraphQLQueryString: function (type, method, queryJson, resp) {
        let getQueryStrByJsonObj = function (obj) {
            return Object.keys(obj).map(function (key) {
                let getValueStr = function (value) {
                    let type = typeof value;
                    let rtnObj = {
                        "string": function () {
                            return '"' + value + '"'
                        },
                        "object": function () {
                            if (value instanceof Array) {
                                return JSON.stringify(value);
                            } else {
                                return "{" + getQueryStrByJsonObj(value) + "}"
                            }
                        },
                        "number": function () {
                            return value;
                        }
                    };
                    return (rtnObj[type] || function () {
                    })();
                };
                return (key + ':' + getValueStr(obj[key]));
            }).join(',');
        };

        let queryStr = getQueryStrByJsonObj(queryJson);
        queryStr = queryStr === "" ? "" : "(" + queryStr + ")";

        return `${type}{
					${method}${queryStr}{
						${resp}
					}
				}`
    },
    getUrlParams: function () {
        let pram = window.location.search.substr(1);
        pram = pram.split("&");
        let params = {};
        for (let index in pram) {
            let arr = pram[index].split("=");
            params[decodeURIComponent(arr[0])] = decodeURIComponent(arr[1]);
        }
        return params
    },
    format: function (date, format) {
        if (typeof date == 'string') {
            date = this.parseDate(date);
        } else {
            date = new Date(date);
        }
        let o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };

        let w = [
            ['日', '一', '二', '三', '四', '五', '六'],
            ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        ];
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(w+)/.test(format)) {
            format = format.replace(RegExp.$1, w[RegExp.$1.length - 1][date.getDay()]);
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },
    parseDate: function (date) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
    },
    /**
     * 生成签名并在签名中添加salt
     * @param paraStr
     * @returns {*}
     //  */
    // getSign: (paraStr) => {
    // 	let salt = "oooooo100234~^jksdsvfbdfb^''sdfsk fsdf";
    // 	let str = paraStr + salt;
    // 	return md5(str)
    // }
};

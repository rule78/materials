/*eslint-disable*/
const helper = {
    /*
     * 日期格式化
     * date: 时间, fmt: yyyy-MM-dd hh-mm-ss
     * */
    dateFormate(date, fmt){
      let usedDate = new Date(date);
      let o = {
        "M+": usedDate.getMonth() + 1, //月份
        "d+": usedDate.getDate(), //日
        "h+": usedDate.getHours(), //小时
        "m+": usedDate.getMinutes(), //分
        "s+": usedDate.getSeconds(), //秒
        "q+": Math.floor((usedDate.getMonth() + 3) / 3), //季度
        "S": usedDate.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (usedDate.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    },
    // /*
    //  * 去除搜索条件中的null、空字符串、-1
    //  * */
    // filterNullObj(obj) {
    //   let tempObj = {};
    //   for (let item in obj) {
    //     if (item && obj[item] !== null && obj[item] !== '' && obj[item] !== -1) {
    //       tempObj[item] = obj[item];
    //     }
    //   }
  
    //   return tempObj;
    // },
  
    // 修复浮点数精度问题
    priceHandle: {
      add(a, b) {
        let c, d, e;
        try {
          c = a.toString().split(".")[1].length;
        } catch (f) {
          c = 0;
        }
        try {
          d = b.toString().split(".")[1].length;
        } catch (f) {
          d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
      },
      sub(a, b) {
        let c, d, e;
        try {
          c = a.toString().split(".")[1].length;
        } catch (f) {
          c = 0;
        }
        try {
          d = b.toString().split(".")[1].length;
        } catch (f) {
          d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
      },
      mul(a, b) {
        let c = 0,
          d = a.toString(),
          e = b.toString();
        try {
          c += d.split(".")[1].length;
        } catch (f) {
        }
        try {
          c += e.split(".")[1].length;
        } catch (f) {
        }
        return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
      },
      div(a, b) {
        let c, d, e = 0,
          f = 0;
        try {
          e = a.toString().split(".")[1].length;
        } catch (g) {
        }
        try {
          f = b.toString().split(".")[1].length;
        } catch (g) {
        }
        return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
      },
    },
  
  };
  
  export default helper;
  
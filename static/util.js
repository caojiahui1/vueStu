/**
* 浏览器类型
*/
var browser = {

	test : function(a){
		if(navigator.userAgent.indexOf('MSIE 6.0')>0){ //IE6.0
			return  /^ie6$/.test(a);
		}

		if(navigator.userAgent.indexOf('MSIE 7.0')>0){//IE7.0
			return /^ie7$/.test(a);
		}

		if(navigator.userAgent.indexOf('MSIE 8.0')>0){//IE8.0
			return /^ie8$/.test(a);
		}
	},

	isIE6 : function(){
		return this.test('ie6');
	},

	isIE7 : function(){
		return this.test('ie7');
	}

};
/**
 * 工具类
 */
var util ={

	array : {

		remove : function(arr , val) {
            
            var index = arr.indexOf(val);
        
            if (index > -1) {
                arr.splice(index, 1);
            }

        }

    },



	//验证手机
	checkMobile :function(v){

		return /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/.test(v);

	},
	//处理手机号 加星号
	dealMobile : function(phone){
		if(phone.length != 11){
			return phone;
		}
		return phone.substr(0, 3)+'*****'+phone.substr(8); 
	},
	//邮箱
	checkMail:function(v){
		return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
	},
	//特殊字符
	checkStrValid: function(str) {
		var pattern = new RegExp("[%#$^&*|\\[\\]<>/]");

		return pattern.test(str);
	},
	//文本域替换回车
	replace : function(v){
		return v.replace(/(\r|\n)/g,'<br/>');
	},
	//随机串
	nonceStr:function(){

		var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	    var maxPos = $chars.length;

	    var noceStr = "";
	    for (i = 0; i < 32; i++) {
    		noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
	    }

	    return noceStr;
	},
	//时间戳
	timeStamp:function(){
	    var timestamp=new Date().getTime();
	    var times1 = parseInt(parseInt(timestamp));
	    var timestampstring = times1.toString();//一定要转换字符串
	    return timestampstring;
	},
	//倒计时
	timer : function(date,ele_id){

		if(typeof date == 'string'){
			date = date.split(/-|:| /);
			date = new Date(date[0],date[1]-1,date[2],date[3],date[4],date[5]);
		}

		var ts = (date) - (new Date());//计算剩余的毫秒数
		var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数
		var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数
		var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数
		var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数
		dd = util.checkTime(dd);
		hh = util.checkTime(hh);
		mm = util.checkTime(mm);
		ss = util.checkTime(ss);
		document.getElementById(ele_id).innerHTML = dd + "天" + hh + "时" + mm + "分" + ss + "秒";
		setInterval("timer()",1000);
	},
	checkTime :function(i){  
       if (i < 10) {  
           i = "0" + i;  
        }  
       return i;  
    },

	/**
	     * 时间格式化 返回格式化的时间
	     * @param date {object}  可选参数，要格式化的data对象，没有则为当前时间
	     * @param fomat {string} 格式化字符串，例如：'YYYY年MM月DD日 hh时mm分ss秒 星期' 'YYYY/MM/DD week' (中文为星期，英文为week)
	     * @return {string} 返回格式化的字符串
	     * 
	     * 例子:
	     * formatDate(new Date("january 01,2012"));
	     * formatDate(new Date());
	     * formatDate('YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY-MM-DD week');
	     * formatDate(new Date("january 01,2012"),'YYYY年MM月DD日 hh时mm分ss秒 星期 YYYY/MM/DD week');
	     * 
	     * 格式：   
	     *    YYYY：4位年,如1993
	　　 *　　YY：2位年,如93
	　　 *　　MM：月份
	　　 *　　DD：日期
	　　 *　　hh：小时
	　　 *　　mm：分钟
	　　 *　　ss：秒钟
	　　 *　　星期：星期，返回如 星期二
	　　 *　　周：返回如 周二
	　　 *　　week：英文星期全称，返回如 Saturday
	　　 *　　www：三位英文星期，返回如 Sat
	     */
		formatDate :function (date, format) {

			if(typeof date == 'string'){
				date = date.split(/-|:| /);
				date = new Date(date[0],date[1]-1,date[2],date[3] || '00',date[4] || '00',date[5] || '00');
			}
			
			function addZero(str,length){
		   	 return new Array(length-(''+str).length+1).join("0") + str;
			}

	        if (arguments.length < 2 && !date.getTime) {
	            format = date;
	            date = new Date();
	        }
	        typeof format != 'string' && (format = 'YYYY年MM月DD日 hh时mm分ss秒');
	        var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
	        return format.replace(/YYYY|YY|MM|DD|hh|mm|ss|星期|周|www|week/g, function(a) {
	            switch (a) {
	            case "YYYY": return date.getFullYear();
	            case "YY": return (date.getFullYear()+"").slice(2);
	            case "MM": return addZero(date.getMonth() + 1,2);
	            case "DD": return addZero(date.getDate(),2);
	            case "hh": return addZero(date.getHours(),2);
	            case "mm": return addZero(date.getMinutes(),2);
	            case "ss": return addZero(date.getSeconds(),2);
	            case "星期": return "星期" + week[date.getDay() + 7];
	            case "周": return "周" +  week[date.getDay() + 7];
	            case "week": return week[date.getDay()];
	            case "www": return week[date.getDay()].slice(0,3);
	            }
	        });
	    },
	    //格式化时间
	    formatTime : function(time){
	    	var date = new Date;

	    	var year = date.getYear();

    		if(typeof time == 'string'){
				time = time.split(/-|:| /);
				time = new Date(time[0],time[1]-1,time[2],time[3],time[4],time[5]);
			}

	    	if(time.getYear() == year){
	    		return util.formatDate(time,'MM-DD hh:mm');
	    	}else{
	    		return util.formatDate(time,'YYYY-MM-DD hh:mm');	
	    	}
	    },
	     //格式化月份
	    formatMonth : function(time){
	    	var date = new Date;

	    	var year = date.getYear();

    		if(typeof time == 'string'){
				time = time.split(/-|:| /);
				time = new Date(time[0],time[1]-1,time[2],time[3],time[4],time[5]);
			}

	    	if(time.getYear() == year){
	    		if(time.getMonth() == date.getMonth()){
	    			return '本月';
	    		}
	    		return util.formatDate(time,'MM');
	    	}else{
	    		return util.formatDate(time,'YYYY-MM');	
	    	}
	    },
	 //保留1位小数   
    //功能：将浮点数四舍五入，取小数点后1位  
    toDecimal1 : function(x) {  
        var f = parseFloat(x);  
        if (isNaN(f)) {  
            return;  
        }  
        f = Math.round(x*10)/10;  
        return f;  
    } , 

    //强制保留2位小数，如：2，会在2后面补上0.即2.0  
    toDecimal2 : function(x) {  
        var f = parseFloat(x);  
        if (isNaN(f)) {  
            return false;  
        }  
        var f = Math.round(x*100)/100;  
        var s = f.toString();  
        var rs = s.indexOf('.');  
        if (rs < 0) {  
            rs = s.length;  
            s += '.';  
        }  
        while (s.length <= rs + 1) {  
            s += '0';  
        }  
        return s;  
    },
    toDecimal : function(number,digits){
		var tmpNumber = 0;
		
		var strNumber = number.toString();
		var ind = strNumber.indexOf('\.');
		
		if(digits == 0){
			if(ind > 0 && strNumber.length > ind + 2){
				tmpNumber = strNumber.substring(0,ind);
			}else{
				tmpNumber = number;
			}
		}else{
			if(ind > 0 && strNumber.length > ind + 2){
				tmpNumber = strNumber.substring(0,ind + digits + 1);
			}else{
				tmpNumber =  number;
			}
		}
		return tmpNumber;
	},
	//本地存储	
	// store : (function () {
	// 	var api               = {},
	// 		win               = window,
	// 		doc               = win.document,
	// 		localStorageName  = 'localStorage',
	// 		globalStorageName = 'globalStorage',
	// 		storage;

	//     	api.set    = function (key, value) {};
	//     	api.get    = function (key)        {};
	//     	api.remove = function (key)        {};
	//     	api.clear  = function ()           {};

 //    if (localStorageName in win && win[localStorageName]) {
	//     storage    = win[localStorageName];
	//     api.set    = function (key, val) { storage.setItem(key, val); };
	//     api.get    = function (key)      { return storage.getItem(key); };
	//     api.remove = function (key)      { storage.removeItem(key); };
	//     api.clear  = function ()         { storage.clear(); };

 //    } else if (globalStorageName in win && win[globalStorageName]) {
	//     storage    = win[globalStorageName][win.location.hostname];
	//     api.set    = function (key, val) { storage[key] = val; };
	//     api.get    = function (key)      { return storage[key] && storage[key].value; };
	//     api.remove = function (key)      { delete storage[key]; };
	//     api.clear  = function ()         { for (var key in storage ) { delete storage[key]; } };
 //    } else if (doc.documentElement.addBehavior) {
	// function getStorage() {
 //        if (storage) { return storage }
 //        storage = doc.body.appendChild(doc.createElement('div'));
 //        storage.style.display = 'none';
 //        // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
 //        // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
 //        storage.addBehavior('#default#userData');
 //        storage.load(localStorageName);
 //        return storage;
 //    }
 //    api.set = function (key, val) {
 //        var storage = getStorage();
 //        storage.setAttribute(key, val);
 //        storage.save(localStorageName);
 //    };
 //    api.get = function (key) {
 //        var storage = getStorage();
 //        return storage.getAttribute(key);
 //    };
 //    api.remove = function (key) {
 //        var storage = getStorage();
 //        storage.removeAttribute(key);
 //        storage.save(localStorageName);
 //    }
 //    api.clear = function () {
 //        var storage = getStorage();
 //        var attributes = storage.XMLDocument.documentElement.attributes;;
 //        storage.load(localStorageName);
 //        for (var i=0, attr; attr = attributes[i]; i++) {
 //            storage.removeAttribute(attr.name);
 //        }
 //        storage.save(localStorageName);
 //    }
	//     }
	//     return api;
	// })(),
	jsonToString: function(O) {
		var string = [];
		var isArray = function(a) {
			var string = [];
			for (var i = 0; i < a.length; i++) {
				string.push(util.jsonToString(a[i]));
			}
			return string.join(",");
		};
		var isObject = function(obj) {
			var string = [];
			for (var p in obj) {
				if (obj.hasOwnProperty(p) && p != "prototype") {
					string.push("\"" + p + "\":" + util.jsonToString(obj[p]));
				}
			}
			return string.join(",");
		};

		if (O instanceof Function) {
			string.push(O);
		} else {
			if (O instanceof Array) {
				string.push("[" + isArray(O) + "]");
			} else {
				if (typeof O == "object") {
					if (O == null)
						string.push('null');
					else if (O == '')
						string.push('');
					else if (!O)
						string.push('false');
					else
						string.push("{" + isObject(O) + "}");
				} else if (typeof O == "string") {
						string.push("\"" + O + "\"");
				} else 	if (typeof O == "number" && isFinite(O)) {
						string.push(O);
				} else if (typeof O == 'boolean') {
					if (!O)
						string.push('false');
					else
						string.push('true');
				}else if(typeof O == 'undefined'){
					string.push("\"\"");
				}
			}
		}
		return string.join(",");
	},
	getWidth: function(a) {
		var b;
		return 640 > a ? b = 640 : a >= 640 && a <= 960 ? b = 960 : (b = 960), b
	},
	loadAssetsFile : function (filename, filetype){ 
		if (filetype=="js"){ //判断文件类型 
		  var fileref=document.createElement('script')//创建标签 
		  fileref.setAttribute("type","text/javascript")//定义属性type的值为text/javascript 
		  fileref.setAttribute("src", filename)//文件的地址 
		}else if (filetype=="css"){ //判断文件类型 
		  var fileref=document.createElement("link") 
		  fileref.setAttribute("rel", "stylesheet") 
		  fileref.setAttribute("type", "text/css")  
		  fileref.setAttribute("href", filename) 
		} 
		if (typeof fileref!="undefined") {
			document.getElementsByTagName("body")[0].appendChild(fileref); 
		}
	},
	loadImg : function (url, callback, error) {
	    var width, height, intervalId, check, div,
		    img = new Image(),
		    body = document.body;
    	img.src = url;
	    // 从缓存中读取
	    if (img.complete) {
    		return callback(img.width, img.height);
	    };
	    // 加载完毕后方式获取
	    img.onload = function () {
		    callback(img.width, img.height);
		    img.onload = img.onerror = null;
	    };
	    // 图片加载错误
	    img.onerror = function () {
		    error && error();
	    };
	},
	//验证字符串是否为空
	isEmpty:function(str){
		return (typeof str== 'undefined' || str==null || (typeof str=='string' && str.replace(/^\s|\s$/g,'') =='') || str == 'null');
	},
	hideRealname:function(str) {
		if(typeof str== 'undefined' || str==null || str == 'null') return " ";
		if(str.length == 11) {
			var hstr =str.substr(3,4);
            return str.replace(hstr,"****");
		} else if(str.length == 2) {
			return str.substr(0,1) + "*";
		} else {
			return str.substr(0,1) + "**";
		}
	},

	isNotEmpty:function(v){
		return !util.isEmpty(v);
	},
	//持久存储
	store :(function(){
		try{
			window.localStorage.setItem('_localStorage_support_',1);
			return  window.localStorage;
		}catch(e){
			
			return {
			    getItem: function (sKey) {
			      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
			      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
			    },
			    key: function (nKeyId) {
			      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
			    },
			    setItem: function (sKey, sValue) {
			      if(!sKey) { return; }
			      document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT;path=/";
			      this.length = document.cookie?document.cookie.match(/\=/g).length:0;
			    },
			    length: 0,
			    removeItem: function (sKey) {
			      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
			      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
			      this.length--;
			    },
			    hasOwnProperty: function (sKey) {
			      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
			    }
			};
		}
	})(),

	sessionStore : (function(){
		try{
			window.sessionStorage.setItem('_sessionStorage_support_',1);
			return  window.sessionStorage;
		}catch(e){
			return {
			    getItem: function (sKey) {
			      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
			      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
			    },
			    key: function (nKeyId) {
			      return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
			    },
			    setItem: function (sKey, sValue) {
			      if(!sKey) { return; }
			      document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT;path=/";
			      this.length = document.cookie?document.cookie.match(/\=/g).length:0;
			    },
			    length: 0,
			    removeItem: function (sKey) {
			      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
			      document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
			      this.length--;
			    },
			    hasOwnProperty: function (sKey) {
			      return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
			    }
			};
		}
	})(),

	//取cookie
	getCookie:function(objName){//获取指定名称的cookie的值

	    var arrStr = document.cookie.split("; ");

	    for(var i = 0;i < arrStr.length;i ++){

			var temp = arrStr[i].split("=");

			if(temp[0] == objName) {
				return unescape(temp[1]);
			}
				 
		}

		return undefined;

	},
	setCookie:function (name,value){  

        var Days = 7;  

        var exp  = new Date();  

        exp.setTime(exp.getTime() + Days*24*60*60*1000);  

        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+';path=/;';  
        
    } ,
    //删除cookie
    delCookie:function(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
	   var date = new Date();
	   date.setTime(date.getTime() - 10000);
	   document.cookie = name + "=0;  path=/;expires=" + date.toGMTString();
	},
	//url 参数
	getUrlParams: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return r[2];
		return null;
	},
	//渲染模板 ; 依赖doT.js
	render: function(tmpl, data, container) {
		if (tmpl.indexOf('#') == 0) {
			tmpl = $(tmpl).html();
		}

		var doTtmpl = doT.template(tmpl);

		var html = doTtmpl(data);

		if (typeof container == 'string') {
			$(container).html(html);
		}else if(typeof container == 'object'){
			container.html(html);
		}

		return html;
	},
	/**
	 * 将数值四舍五入(最多保留2位小数)后格式化成金额形式
	 *
	 * @param num 数值(Number或者String)
	 * @return 金额格式的字符串,如'1,234,567.45'
	 * @type String
	 */
	formatCurrency2 : function (num) {
	    num = num.toString().replace(/\$|\,/g,'');
	    if(isNaN(num))
	    num = "0";
	    sign = (num == (num = Math.abs(num)));
	    num = Math.floor(num*100+0.50000000001);
	 	var  cents = num%100;
	    num = Math.floor(num/100).toString();
	    if(cents<10)
	    cents = "0" + cents;
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	    num = num.substring(0,num.length-(4*i+3))+','+
	    num.substring(num.length-(4*i+3));
	    if(parseInt(cents) == 0){
	    	return (((sign)?'':'-') + num ) ;
	    }else{
	    	 return (((sign)?'':'-') + num + '.' + cents);
	    }
	   
	},
	/**
	 * 将数值四舍五入(保留1位小数)后格式化成金额形式
	 *
	 * @param num 数值(Number或者String)
	 * @return 金额格式的字符串,如'1,234,567.4'
	 * @type String
	 */
	formatCurrency1 :function (num) {
	    num = num.toString().replace(/\$|\,/g,'');
	    if(isNaN(num))
	    num = "0";
	    sign = (num == (num = Math.abs(num)));
	    num = Math.floor(num*10+0.50000000001);
	    var cents = num%10;
	    num = Math.floor(num/10).toString();
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	    num = num.substring(0,num.length-(4*i+3))+','+
	    num.substring(num.length-(4*i+3));
	    return (((sign)?'':'-') + num + '.' + cents);
	},
	/**
	 * 将数值四舍五入后格式化成金额形式
	 *
	 * @param num 数值(Number或者String)
	 * @return 金额格式的字符串,如'1,234,567'
	 * @type String
	 */
	formatCurrency :function (num) {
		num = Math.round(num);
	    num = num.toString().replace(/\$|\,/g,'');
	    if(isNaN(num))
	    num = "0";
	    sign = (num == (num = Math.abs(num)));
	    num = Math.floor(num*10+0.50000000001);
	    
	    num = Math.floor(num/10).toString();
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	    num = num.substring(0,num.length-(4*i+3))+','+
	    num.substring(num.length-(4*i+3));
	    return (((sign)?'':'-') + num );
	},
	//格式化金额大写
	capitalFormat : function (n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "";
        var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
            n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p+1, 2);
            unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "万元");
	},
	//给定日期返回所属月份
	getMonth : function(date){
		var date=new Date(date);
		return date.getMonth()+1;
	},
	//比较两个日期大小
	compareDate : function(startTime,endTime){  
		if(typeof startTime == 'object'){
			startTime = util.formatDate('YYYY-MM-DD hh:mm:ss');
		}
		if(typeof endTime == 'object'){
			endTime = util.formatDate('YYYY-MM-DD hh:mm:ss');
		}
	    var start = new Date(startTime.replace("-", "/").replace("-", "/"));  
	    var end=new Date(endTime.replace("-", "/").replace("-", "/"));      
	    if(end<start){  
	        return false;  
	    }  
	    return true;  
	},
	//校验密码
	checkPwd : function(pwd){
		if(/^[a-zA-Z]+$/g.test(pwd)){
			return '不能为全字母'; //全字母
		}else if(/^\d+$/g.test(pwd)){
			return '不能为全数字'; //全数字
		}else{
			return 1; //正确
		}
	}
},
ajax = {
	/**
	* 超时时间
	*/
	timeout : 20000,

	/**
	* XMLHttpRequest
	*/
	xhr : (function(){

		if(window.XMLHttpRequest){

			return function(){
				return new XMLHttpRequest() ;
			}

	    } else if(window.ActiveXobject) {

	    	return function(){
	    		try{
	    			return new ActiveXObject("Microsoft.XMLHTTP");
	    		}catch(e){}
			}

	    }

	})(),
	 

	ajax : function(method , url ,param , success ,error){

		var xhr = this.xhr();

		xhr.onreadystatechange =  function(){

			if(xhr.readyState == 4){

			 	if (xhr.status==200){

			 		success(xhr.responseText);

			 	}else{

			    	error(xhr.status,xhr.responseText);

			    }

			}
		}

		//处理参数
		var a = [] ;

		if(typeof param == 'object'){
			var i = 0
			for(var key in param){
				a[i] = key + '=' + encodeURI(param[key]);
				i++;
			}
		}
		
		param = a.join('&') ;

		var nowTime = new Date().getTime();//获取当前时间作为随机数

		if( a.length > 0 && method == "get"){
			if(url.indexOf('?') == -1){
				url = url+'?'+param;	
			}else{
				url = url+'&'+param;
			}

		}	

		if(url.indexOf('?') == -1){
			url = url+'?time='+nowTime;
		}else{
			url = url+'&time='+nowTime;
		}
		
		xhr.open(method,url,true);

		xhr.timeout = this.timeout;

		xhr.setRequestHeader("Content-type", "application/json; charset=utf-8"); 

		if(method == "post"){  
            xhr.send(param);  
        }else{  
            xhr.send(null);  
        }  

	},

	get : function(url,param,successCallback,errorCallback){

		if(typeof param == 'function'){

			errorCallback = successCallback;

			successCallback = param;

			param= {};
		}

		try{
			var user = $.parseJSON(util.store.getItem('_user_'));
			
			$.extend(param,{uuid:user.uuid});

		}catch(e){}

		this.ajax('get',url,param,function(data){

			data = JSON.parse(data);

			var status = data.status ;

			if(status == 200){

				successCallback(data.body);

			}else if(status === 208){

				util.store.removeItem('_user_');


				//如果是登录页面
				if(window.location.href.indexOf('login.html')===-1){
					window.location.href = '/login.html';
				}	

			}else{

				if(typeof errorCallback == 'function'){
					errorCallback(data);
				}

			}

		},function(status,data){
			if(status == 400){
				console.log('param is error');
			}else if(status == 502){
				console.log('server is down');
			}else if(status == 404){
				console.log('source not found');
			}else if(status == 500){
				console.log('server is error');
			}

			if(typeof errorCallback == 'function'){
				console.log('请刷新页面重试!');
			}

		});
		
	},

	post1 : function(url,param,successCallback,errorCallback){
		if(typeof param == 'function'){

			errorCallback = successCallback;

			successCallback = param;

			param= {};
		}

		try{
			var user = $.parseJSON(util.store.getItem('_user_'));
			
			$.extend(param,{uuid:user.uuid});

		}catch(e){}

		this.ajax('post',url,param,function(data){

			data = JSON.parse(data);

			var status = data.status ;

			if(status == 200){

				successCallback(data.body);

			}else if(status === 208){

				util.store.removeItem('_user_');
//                localStorage.removeItem('_user_');

				//如果是登录页面
				if(window.location.href.indexOf('login.html')===-1){
					window.location.href = '/login.html';
				}	

			}else{

				if(typeof errorCallback == 'function'){
					errorCallback(data);
				}

			}

		},function(status,data){
			if(status == 400){
				console.log('param is error');
			}else if(status == 502){
				console.log('server is down');
			}else if(status == 404){
				console.log('source not found');
			}else if(status == 500){
				console.log('server is error');
			}

			if(typeof errorCallback == 'function'){
				console.log('请刷新页面重试!');
			}

		});
	},



	post : function(url,param,successCallback,errorCallback){
		if(typeof param == 'function'){
			errorCallback = successCallback;
			successCallback = param;
			param= {};
		}
		try{
			var user = $.parseJSON(util.store.getItem('_user_'));
			$.extend(param,{uuid:user.uuid});
		}catch(e){}
		$.ajax({
				url : url,
				contentType : "application/json; charset=utf-8",
				type : "POST",
				timeout : 20000,//超时时间设定
				dataType : "json",
				data : JSON.stringify(param),
				success : function(data) {
					console.log(data);
					var status = data.status;
					if(status === 500){
						console.log(data.message);
					}
					else if(status === 600){console.log('请求超时');}
					else if(status === 800){console.log('余额不足');}
					else if(status === 201){console.log('注册失败');}
					else if(status === 202){console.log('用户名或密码错误.');}
					else if(status === 203){console.log('手机号已经注册过了，不可以重复注册.');}
					else if(status === 204){console.log('您的信息正在后台审核中，还不能正常登录.');}
					else if(status === 205){console.log('您的信息审核失败，请联系客服了解详情。感谢支持！');}
					else if(status === 206){console.log('该手机号码还没有注册，请您先注册.');}
					else if(status === 207){console.log('我们已向您的手机号发送找回密码短信，请注意查收.');}
					else if(status === 208){console.log('用户尚未登录，请重新登录后在操作.');}
					else if(status === 210){console.log('旧密码输入错误，请重新输入.');}
					else if(status === 211){console.log('您输入的用户名或手机号不能为空，请重新输入.');}
					else if(status === 212){console.log('您输入的密码错误，请重新输入.');}
					else if(status === 213){console.log('您输入的验证码错误，请重新输入.');}
					else if(status === 214){console.log('恭喜您，注册成功.');}
					else if(status === 215){console.log('数据签名错误.');}

					
					if(status === 200){
						if(typeof successCallback == 'function'){
							successCallback(data.body);
						}
					}

					if(typeof errorCallback == 'function' && status!=200){
					
						errorCallback(data);
					}
					if(status === 208){
					    util.store.removeItem('_user_');
					    if(window.location.href.indexOf('vote/index.html')!==-1){
                            var confir=confirm("您尚未登录，请登录后投票");
                            if(confir){
                                window.location.href = '/login.html?channel=vote';
                            }
                            return false;
                        }else if(window.location.href.indexOf('vote/company.html')!==-1){
                            $.yn_confirm('您尚未登录，请登录后投票');
                            $('.confirm').on('click',function(){
                                if(window.location.href.indexOf('login.html')===-1){
                                    window.location.href = '/login.html?channel=votec';
                                }
                            })
                            return false;

                        }else{
                            $.yn_confirm('用户尚未登录，请重新登录后再操作');
                            $('.confirm').on('click',function(){
                                if(window.location.href.indexOf('login.html')===-1){
                                    window.location.href = '/login.html';
                                }
                            })
                        }

					}

				},
				error : function(data) {
					console.log(data);
					console.log('接口:'+url,param);
					console.log('服务器繁忙,请稍后重试!');
					// $.yn_alert('服务器繁忙,请稍后重试!');
					if(typeof errorCallback == 'function'){
						errorCallback(data);
					}
				}
		});
	}
};



/**
* 倒计时 a  var st = new showTime(1,3);
    //st.ele_id = 1;
//st.time_distance = 10000;
    st.setTimeShow();
*/
function showTime(ele_id, time_distance,format) {
    this.ele_id = ele_id;
    if(typeof time_distance == 'string'){
    	time_distance = util.formatDate(time_distance,'YYYY/MM/DD hh:mm:ss');
    	time_distance = new Date(time_distance) - new Date() ;
    }
	this.time_distance = time_distance ;
	this.format = format;
}
showTime.prototype.setTimeShow = function () {
    var timer = document.getElementById(this.ele_id);
    var str_time;
    var int_day, int_hour, int_minute, int_second;
    time_distance = this.time_distance;
    this.time_distance = this.time_distance - 1000;
    if (time_distance > 0) {
        int_day = Math.floor(time_distance / 86400000);
        time_distance -= int_day * 86400000;
        int_hour = Math.floor(time_distance / 3600000);
        time_distance -= int_hour * 3600000;
        int_minute = Math.floor(time_distance / 60000);
        time_distance -= int_minute * 60000;
        int_second = Math.floor(time_distance / 1000);
        if (int_hour < 10)
            int_hour = "0" + int_hour;
        if (int_minute < 10)
            int_minute = "0" + int_minute;
        if (int_second < 10)
            int_second = "0" + int_second;
        str_time = int_day + "天" + int_hour + "小时" + int_minute + "分" + int_second + "秒";

        if(typeof this.format == 'string'){
        	str_time =  this.format.replace(/D/g,int_day).replace(/H/g,int_hour).replace(/M/g,int_minute).replace(/S/g,int_second);
        }

        timer.innerHTML= str_time;
        var self = this;
        setTimeout(function () { self.setTimeShow(); }, 1000); //D:正确
    } else {
        timer.innerHTML= "已结束";
        return;
    }
} 


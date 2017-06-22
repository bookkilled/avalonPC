/**
 * 接口请求API
 */
// window.$ = require('jquery');

// 拼接公共参数
function encryptData(obj) {
    var parms = {
        tag: 'wap'
    };
    $.extend(true, obj, parms);
    return obj;
};

var Timeout = 3000;

function getDate() {
    console.log(new Date());
    return 1;
}

function getWeather() {
    var parms = {
        city: '%B1%B1%BE%A9',
        password: 'DJOYnieT8234jlsK',
        day: 0
    };
    $.ajax({
        url: 'http://php.weather.sina.com.cn/xml.php',
        type: 'GET',
        data: encryptData(parms),
        cache: false,
        dataType: 'jsonp',
        timeout: Timeout,
        success: function(req) {
            console.log(req);
        },
        error: function(err) {
            console.log(err);
        },
    });
}

function getProductDetail() {
    var parms = {
        productId: '10034600'
    };
    $.ajax({
        url: 'https://pa18-wapmall-dmzstg1.pingan.com.cn:53443/chaoshi/finance/open/product/productInfo.do',
        type: 'GET',
        data: encryptData(parms),
        cache: false,
        dataType: 'jsonp',
        timeout: Timeout,
        success: function(req) {
            console.log(req);
        },
        error: function(err) {
            console.log(err);
        },
    });
}

module.exports = {
    encryptData,
    getDate,
    getWeather,
    getProductDetail
};
/**
 * ajaxSeries by Ling
 * 获取form表单中所有元素的键/值,并以Ajax方法提交
 * 使用方法:
 * $('form').ajaxSeries(ajaxOptions);
 * 其中ajaxOptions与jQuery的ajax方法参数相同
 */
(function($){
    var win = window, $win = $(window), d = document, $d = $(document);
    $.fn.ajaxSeries = function(options){
        var self = this;
        if(typeof options !== 'object') throw new TypeError('Option should be an object!');
        options.data = urlencoded(_serialize(self));
        return $.ajax(options);
    }

    function toArray($arr){
        return Array.prototype.slice.call($arr);
    }

    /**
     * 数组去重 兼容JQ对象和Array
     */
    function filterArray(rawArr){
        var ret = [];
        function iter(isJq){
            var obj = {};
            if(isJq){
                return function(i, val){
                    run(val);
                };
            }else{
                return function(val){
                    run(val);
                };
            }

            function run(val){
                var _t = typeof val;
                if(obj[val] != _t){
                    obj[val] = _t;
                    ret.push(val);
                }
            }
        }
        if(rawArr.map == $.fn.map){
            rawArr.map(iter(true));
            return $(ret);
        }else{
            rawArr.map(iter(false));
        }
        return ret;
    }

    function urlencoded(arr, multi){
        if(multi){
            return arr.value.map(function(_v){
                return arr.key + "[]=" + _v;
            }).join('&');
        }
        if(typeof arr == 'object' && !arr instanceof Array)//类数组对象
            arr = toArray(arr);
        var _ret = arr.map(function(_v){
            if(_v.value instanceof Array) return urlencoded(_v, true);
            return _v.key + "=" + _v.value;
        });
        return _ret.join('&');
    }

    function _serialize(form){
        var $inputs = $(form).find('input, select, textarea');
        var nameList = $inputs.map(function(i, _v){
            return $(_v).attr('name');
        });
        return filterArray(toArray(nameList)).map(function(name){
            return getInput(name);
        });
    }

    function getInput(name){
        return {
            key: name,
            value: $('[name=' + name + ']').val()
        };
    }
})(jQuery);
/**
 * Created by Liuchenling on 3/19/15.
 */
$(document).ready(function(){
    var ret = $('#demoForm').ajaxSeries({
        //这个对象的参数会传入$.ajax函数的参数执行
        url: "http://the.domain.here/path?query",
        dataType: "json",
        success: function(res){
            //...
        },
        complete: function(res){
            //...
        }
    });
    console.log(ret);
});
/**
 * Created by Liuchenling on 3/19/15.
 */
var arr = [3,10,45,6,7,8,9,9,6,5,42,54,6,5,76,7,54,45,45,67,67,4,100,7,32,20,42,84,81,22];
var rawArr = arr.slice(0); //复制一份arr
var pos = 15; //下标, 第16个的数组下标是15

/**
 * 入口函数, 闭包, 运行思想:
 * 使用tools.randomArrayIndex方法产生一个随机删除的数组下标位置,
 * 判断这个位置 若小于等于15, 则最终位置向前移动一位
 * 使用Array.splice删除数组中指定位置元素
 * 循环5次后返回最终的位置(pos)
 */
var result = (function run(rawArr, newArr, pos){
    for(var i = 0; i < 5; i ++){
        var randomPos = randomArrayIndex(newArr);
        if(randomPos <= pos){
            pos--;
        }
        arr.splice(randomPos, 1);
    }
    return pos;
}(rawArr, arr, pos));

console.log("the result is", result);

/**
 * 随机数 返回0到(n-1)间的一个整数
 * @param n
 * @returns int
 */
function randomArrayIndex (n){
    if(typeof n === "number"){
        var random = Math.random() * n;
        return parseInt(random);
    }else if(n instanceof Array){
        var len = n.length;
        return this.randomArrayIndex(len);
    }else{
        return 0;
    }
}
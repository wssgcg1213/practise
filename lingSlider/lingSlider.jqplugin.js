/**
 * Created by Liuchenling on 3/21/15.
 */
$.slider = (function($){
    return function(options){
        /**
         * options: {
             *  slider: $('#demo'),
             *  width: 300,
             *  prev: $('.prev'),
             *  next: $('.next'),
             *  interval: 3000
             * }
         */
        var $slider = $(options.slider),
            w = options.width || $slider.width(),
            n = $slider.find('li').length,
            prevBtn = options.prev || $slider.find('.prev'),
            nextBtn = options.next || $slider.find('.next'),
            pageContainer = options.pageContainer || $slider.find('.page'),
            interval = options.interval || 5000;
        var flag = false;
        var $ul = $slider.find('ul');
        function prev(){
            if(flag) return;
            flag = true;
            var _left = parseInt($ul.css('left')) || 0;
            var targetPos = _left >= 0 ? (1 - n) * w : _left + w;
            $ul.animate({left: targetPos + 'px'}, 'slow', 'swing', function (){
                flag = false;
                $(pageContainer).html(parseInt(-targetPos / w) + 1);
            });
        };
        function next(){
            if(flag) return;
            flag = true;
            var _left = parseInt($ul.css('left')) || 0;
            var targetPos = (-_left >= (n-1) * w) ? 0 : (_left - w);
            $ul.animate({left: targetPos + 'px'}, 'slow', 'swing', function (){
                flag = false;
                $(pageContainer).html(parseInt(-targetPos / w) + 1);
            });
        };
        $(prevBtn).on('click', prev);
        $(nextBtn).on('click', next);
        setInterval(function(){
            nextBtn.click();
        }, interval);
    };
})(jQuery);

jQuery.fn.slider = function(options){
    options.slider = this;
    $.slider(options);
    return this;
};
$(function () {
    function paginator(opts) {
        var now = opts.currentPage|| 1;
        var total = opts.totalPage;
        var callback = opts.callback;
        callback && callback(now);
        if (now > total) return;
        var that = this;
        // 创建分页
        function create(opts) {
            $(that).empty();
            var html = '<div class="page_number">当前第<span class="nowPage"></span>页,共<span class="totalPa' +
                'ge"></span>页</div>'
            html += '<div class="clearfix pagination-content">'
            html += '<ul class="clearfix pagination_list">'
            html += '<li id="first"><span class="first"></span></li>'
            html += '<li id="prev"><span class="prev"></span><</li>'

            for (var i = 1; i <= total; i++) {
                if (parseInt(now) == i) {
                    html += '<li class="box currentPage" data-id="' + parseInt(now) + '">' + parseInt(now) + '</li>'
                } else {
                    if (i < 4 || i < (parseInt(now) + 3) && i > (parseInt(now) - 3) || i > (parseInt(total) - 2)) {
                        html += '<li class="box" data-id="' + parseInt(i) + '">' + parseInt(i) + '</li>'
                    } else if (i == parseInt(now) - 3 || i == parseInt(now) + 3) {
                        html += '<li>...</li>'
                    }
                }
            }

            html += '<li id="next" class="next_li"><span class="next"></span></li>'
            html += '<li id="last" class="last_li"><span class="last"></span></li>'
            html += '</ul>';
            html += '<div class="number"><input type="text" id="jump"><span class="go">GO</span></div>'
            html += '</span>';
            $(that).append(html);

            $('.nowPage').html(now);
            $('.totalPage').html(total);
            $('#jump').val(now);
            // 分页的显示和隐藏

            $('.box').each(function () {
                var text = $(this).text();
                if (!isNaN(parseInt(text))) {
                    if (now == 1) {
                        $('#first,#prev').addClass('hidden');
                    } else if (now == total) {
                        $('#next,#last').addClass('hidden');
                    }
                }
            })
        }
        create(opts);

        $('#first').click(function () {
            $(that).paginator({
                currentPage: 1,
                totalPage: total,
                callback: callback
            })
        })
        $('#prev').click(function () {
            if (now > 1) {
                $(that).paginator({
                    currentPage: parseInt(now) - 1,
                    totalPage: total,
                    callback: callback
                })

            } else {
                $(that).paginator({
                    currentPage: 1,
                    totalPage: total,
                    callback: callback
                })
            }
        })
        $('#next').click(function () {
            if (now < total) {
                $(that).paginator({
                    currentPage: parseInt(now) + 1,
                    totalPage: total,
                    callback: callback
                })
            } else {
                $(that).paginator({
                    currentPage: total,
                    totalPage: total,
                    callback: callback
                })
            }
        })
        $('#last').click(function () {
            $(that).paginator({
                currentPage: total,
                totalPage: total,
                callback: callback
            })
        })
        $('.go').click(function () {
            var ind = isNaN(parseInt($('#jump').val())) ? 0 : parseInt($('#jump').val());
            console.log(ind, total, now)
            if (ind > total || ind == now || ind <= 0) {
                return false;
            }
            $(that).paginator({
                currentPage: parseInt(ind),
                totalPage: total,
                callback: callback
            })
        })
        $('.box').click(function () {
            var ind = $(this).attr('data-id');
            if (ind == now) return;
            $(that).paginator({
                currentPage: parseInt(ind),
                totalPage: total,
                callback: callback
            })
        })
    }
    $.fn.extend({
        paginator: paginator
    })
});

$(function(){
      function paginator(opts){
        var now=opts.currentPage;
        var total=opts.totalPage;
        if(now>total) return;
        var that=this;
        // 创建分页
        function create(opts){ 
          $(that).empty();    
          var html='<div class="page_number">当前第<span class="nowPage"></span>页,共<span class="totalPage"></span>页</div>'
              html+='<ul><li id="first" data-id="first" class="box flex_child">《</li>'
              html+='<li id="prev" data-id="prev" class="box flex_child"><</li>'
          for(var i=1;i<=total;i++){
            if(parseInt(now)==i){
              html+='<li class="box"><a class="flex_child active" data-id="'+parseInt(now)+'">'+parseInt(now)+'</a></li>'
            }else{
              html+='<li class="box"><a class="flex_child" data-id="'+parseInt(i)+'">'+parseInt(i)+'</a></li>'
            }
          }
          // html+='<li class="box"><input type="text" class="number" id="jump"></li>'
          html+='<li id="next" data-id="next" class="box flex_child">></li>'
          html+='<li id="last" data-id="last" class="box flex_child">》</li>'
          html+='</ul>'
          $(that).append(html);

          $('.nowPage').html(now);
          $('.totalPage').html(total);
          // $('#jump').val(now);
           // 分页的显示和隐藏
          $('.box a').each(function(index){
            var text=$(this).text();
            $(this).hover(function(){
            if((parseInt(index)+1)==now){
              $(this).css({
                'background': '#34c28e',
                'color': '#fff'
              })
             }
            })
            if(!isNaN(parseInt(text))){
              if(now == 1){
                  if(text>parseInt(now)+2&&text!=parseInt(total)&&text!=parseInt(total)-1){
                    if(text==parseInt(now)+3){
                      $(this).parent('li').empty().text('...')
                    }else{
                      $(this).parent('li').addClass('hidden');
                    }
                  }
            }else if(now == total){
              if(text<parseInt(now)-2&&text!=1&&text!=2){
                    if(text==parseInt(now)-3){
                      $(this).parent('li').empty().text('...')
                    }else{
                      $(this).parent('li').addClass('hidden');
                    }
                  }  
              }else{
                  if((text<parseInt(now)-2 || text>parseInt(now)+2)&&text!=1&&text!=2&&text!=parseInt(total)&&text!=parseInt(total)-1){
                    if(text==parseInt(now)-3 || text==parseInt(now)+3){
                      $(this).parent('li').empty().text('...');
                    }else{
                      $(this).parent('li').addClass('hidden');
                    }
                  }
              }
            }
          })
        }
        create(opts);
        
        $('#first').click(function(){
          $(that).paginator({currentPage:1,totalPage:total})
        })
        $('#prev').click(function(){
          if(now>1){
            $(that).paginator({currentPage:parseInt(now)-1,totalPage:total})
          }else{
            $(that).paginator({currentPage:1,totalPage:total})
          }
        })
        $('#next').click(function(){
          if(now<total){
            $(that).paginator({currentPage:parseInt(now)+1,totalPage:total})
          }else{
            $(that).paginator({currentPage:total,totalPage:total})
          }
        })
        $('#last').click(function(){
          $(that).paginator({currentPage:total,totalPage:total})
        })
        $('.box a').each(function(){
          $(this).click(function(){
            var ind=$(this).attr('data-id');
            if(ind==now) return;
            console.log(ind,'ind')
            $(that).paginator({currentPage:parseInt(ind),totalPage:total})
          })
        })
      }
      $.fn.extend({
        paginator:paginator
      })
});

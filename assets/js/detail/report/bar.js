define(function(){

    // config
    //      height
    //      width
    //      dis
    //      max
    //      min
    //      guide
    //      name, value
    //      cond:
    //          more:
    //              className
    //              text
    //              
    //          less: ...
    //          between: ...

    /* demo: 
    var demoConfig = {
        style: {},
        max: 1.9,
        min: 1.2,
        guide: 1.6,
        cond: {
            more: {
                text: '正常',
                className: 'normal'
            },
            less: {
                text: '危险',
                className: 'danger'
            }
        }
    };
    */
    // <li class="" style="" title="">
    //     <div class="bar-value " style="">
    //         <div class="value-text"></div>
    //     </div>
    //     <div class="guideLine"></div>
    // </li>


    var Bar = function(config){
        var li = document.createElement('li');
        var classes = ['chart-bar'];
        this.name = config.name;
        this.value = config.value;
        
        

        var styleStr = '';
        styleStr += 'width:' + config.style.width + ';';
        styleStr += 'height:' + config.style.height + ';';

        li.setAttribute('class', classes.join(' '));
        li.setAttribute('style', styleStr);
        this.el = li;

        // var html = '';
        // // var styleStr = 
        // html += buildBarValue(config);
        // html += buildGuideLine(config);
        // li.innerHTML = html;
        var barValue = document.createElement('div');
        this.barValue = barValue;
        var barValleDetail = getBarValueDetail(config);
        for( var i in barValleDetail.attr){
            this.barValue.setAttribute( i.substr(1), barValleDetail.attr[i] );
        }
        this.barValue.innerHTML = '<div class="value-text">' + barValleDetail.content + '</div>';
        this.el.appendChild(this.barValue);

        var guideStyleArr = getGuideLineStyle(config);
        this.guideLineArr = [];
        for( var i=0, j=guideStyleArr.length; i<j; i++ ){
            var el = document.createElement('div');
            el.setAttribute('class', 'guideLine');
            this.guideLineArr.push(el);
            this.guideLineArr[i].style = guideStyleArr[i];

            this.el.appendChild( this.guideLineArr[i] );
        }

        return this;
    }
    Bar.prototype.update = function(config) {
        // 更新bar
        var barValleDetail = getBarValueDetail(config);
        for( var i in barValleDetail.attr){
            this.barValue.setAttribute( i.substr(1), barValleDetail.attr[i] );
        }
        this.barValue.innerHTML = '<div class="value-text">' + barValleDetail.content + '</div>';
        // this.el.appendChild(this.barValue);

        // 更新guideline
        var guideStyleArr = getGuideLineStyle(config);
        for( var i=0, j=guideStyleArr.length; i<j; i++ ){
            var el = document.createElement('div');
            this.guideLineArr[i].style = guideStyleArr[i];
        }
    };

    function getBarValueDetail(config){
        var value = config.value;
        var max = config.max;
        var min = config.min;
        var guide = config.guide;
        var cond = config.cond;
        
        var result = {};

        var valueStyle = 'height: '+ safeValue((value - min)/(max - min))*100 +'%;';
        var classArr = ['bar-value'];
        var text = '';
        if( typeof guide === 'number'){
            if(value >= guide){
                classArr.push(cond.more.className);
                text = cond.more.text || '';
            }
            else if(value < guide){
                classArr.push(cond.less.className);
                text = cond.less.text || '';
            }
        }
        // else{

        // }

        result.attr = {
            _style: valueStyle,
            _class: classArr.join(' ')
        };
        result.content = text;
        return result;
    }
    function getGuideLineStyle( config ){
        var max = config.max;
        var min = config.min;
        var guide = config.guide;
        // var html = '';
        if( typeof guide == 'number' ){
            return 'top: '+ safeValue((max - guide)/(max - min))*100 +'%;'
        }
        else if( guide.isArray() ){
            var arr = [];
            for( var i=0, j=guide.length; i<j; i++ ){
                arr.push( 'top: '+ safeValue((max - guide)/(max - min))*100 +'%;' );
            }
            return arr;
        }
        return false;
    }
    function safeValue(val, safeZone){
        safeZone = safeZone || {max: 1, min:0};
        if(val > safeZone.max){
            return safeZone.max;
        }
        else if(val < safeZone.min){
            return safeZone.min;
        }
        else{
            return val;
        }
    }



    return Bar;
});
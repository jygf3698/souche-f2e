(function(){

  var SCDB = function(_namespace){
    this.namespace = (_namespace || 'souche') + "_";
  }
  var util = {
    /**
    * 将任何值转换为数组，如果已经是直接返回。
    */
    valueToArray:function(value){
      if (value==null){
        return [];
      }else if (value.splice && value.length) {
        return value;
      }else{
        return [value];
      }
    }
  }
  SCDB.prototype = {
    get:function(key){
      key = this.namespace + key;
      var value = localStorage.getItem(key);
      value = JSON.parse(value);
      if(!value.length){
        value = null;
        return value;
      }
      return value[0];
    },
    set:function(key,value){
      key = this.namespace + key;
      value = util.valueToArray(value);
      try{
        localStorage.setItem(key,JSON.stringify(value));
      }catch(e){
        console.trace(e)
      }
      
    },
    gets:function(key){
      key = this.namespace + key;
      var value = localStorage.getItem(key);
      value = JSON.parse(value);
      return value;
    },
    sets:function(key,value){
      key = this.namespace + key;
      value = util.valueToArray(value);
      try{
        localStorage.setItem(key,JSON.stringify(value));
      }catch(e){
        console.trace(e)
      }
    },
    add:function(key,value){
      var values = this.gets(key);
      var value = util.valueToArray(value);
      if(values){
        values = values.concat(value);
      }else if(value){
        values = value;
      }
      this.sets(key,values);
    },
    del:function(key){
      key = this.namespace + key;
      localStorage.setItem(key,'');
    }
  }
})();

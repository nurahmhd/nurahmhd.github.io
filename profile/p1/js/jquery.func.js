(function($, undefined) {
  
  var arrayProto = Array.prototype;
  
  // Props to Michael Geary
  // http://www.mail-archive.com/discuss@jquery.com/msg04261.html
  $.fn.reverse = arrayProto.reverse;
  
  $.fn.all = function(iterator) {
    var i, length = this.length;
    
    if(length == 0) return false;
    
    for(i = 0; i < length; i++) {
      if(!iterator.call(this[i], i, this[i])) {
        return false;
      }
    }
    
    return true;
  };
  
  $.fn.any = function(iterator) {
    var i, length = this.length;
    
    for(i = 0; i < length; i++) {
      if(iterator.call(this[i], i, this[i])) {
        return true;
      }
    }
    
    return false;
  };
  
  $.fn.intercept = function(interceptor) {
    interceptor.call(this, this);
    return this;
  };
  
  $.method = function(name) {
    var args = arrayProto.slice.call(arguments, 1);
    
    return function() {
      var obj = this instanceof $ ? this : $(this); 
      return obj[name].apply(obj, args);
    }
  };
  
  $.fn.invoke = function() {
    var args = arrayProto.slice.call(arguments);
    var method = $.method.apply(null, args);
    
    return this.map(method);
  };
  
  $.fn.reduce = function(iterator, seed) {
    var initial = arguments.length == 1;
    var result = seed;
    
    this.each(function(index, element) {
      if(initial) {
        result = this;
        initial = false;
      } else {
        result = iterator.call(this, result, element, index);
      }
    });
    
    return result;
  };
  
})(jQuery);

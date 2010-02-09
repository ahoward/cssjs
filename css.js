// one global css object
//
  var css;

  (function(){

    css = function(){
    // static data
    //
      this.data =
        this.data || {};

      this.quote = 
        this.quote || function(v){
          if(v.indexOf('"') >= 0) return("'"+v+"'");
          if(v.indexOf('"') >= 0) return('"'+v+'"');
          return v;
        };

    // parse args
    //
      var args = Array.prototype.slice.call(arguments);
      var arg = args.shift();

    // no arguments give generate css
    //
      if(!arg){
        var text = [];

        for(selector in data){
          text.push("\n", selector, " { ");
          properties = data[selector];
          for(var k in properties){
            var v = properties[k];
            text.push( k, ":", quote(v), "; ");
          }
          text.push("} ", "\n");
        }

        return text.join("");
      }

    // get properties
    //
      if(typeof(arg) == 'string'){
        return data[arg];
      }

    // set properties
    //
      for(var selector in arg){
        var properties = arg[selector];
        data[selector] = properties;
      }
    };

    var load = window.onload;

    window.onload = function(){
      if(load) load();

      var head = document.getElementsByTagName("head")[0];

      if(head){
        var style = document.createElement("style");
        style.innerHTML = css();
        head.appendChild(style);
      }
    }

  })();

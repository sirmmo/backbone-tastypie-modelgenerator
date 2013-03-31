/*
* Backbone-tastypie model generator
* Created by Marco Montanari
* released under 3 clause BSD 
*/

(function( undefined ) {

    Backbone.SchemaUrl = "";
	Backbone.LoadModelsFromUrl = function(url, models){
		Backbone.SchemaUrl =url;
		$.getJSON(Backbone.SchemaUrl , function(data){
			Backbone.LoadModels(data, models)
		});
	}

	Backbone.LoadModels = function(object, models){
		for (var model in object){
			var _mdl = {};
			_mdl['name'] = Backbone.ModelNameGenerator (model);
			_mdl['url'] = object[model]['list_endpoint'].slice(0,-1);
			_mdl['container_name'] = Backbone.ModelNameGenerator (model)+"Container";
    		_mdl['schema'] = object[model]['schema'];
            
            
			
			$.getJSON(_mdl['schema'] , function(data){
			
			});
            
           	 window[_mdl['name']] = Backbone.Model.extend({
				urlRoot: _mdl['url']//,
				url: function() {
				    var original_url = Backbone.Model.prototype.url.call( this );
				    var parsed_url = original_url + ( original_url.charAt( original_url.length - 1 ) == '/' ? '' : '/' );
				
				    return parsed_url;
				  }
                		//validate:_mdl['validator']
			});
		window[_mdl['container_name']] = Backbone.Collection.extend({
				urlRoot: _mdl['url']//, 
				//model: window[_mdl['name']]
			});
		}
	}
	
	Backbone.ModelNameGenerator = function (string)
	{
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}


    Backbone.TPValidator = function(model, attrib_set){
        var url = model.url();
        
    }

	Backbone.Validators = {};

	Backbone.Validators['string'] = function(attribute, value){
		if (typeof value != "string")
			return "Not valid string for attribute "+attribute;
	}

	Backbone.Validators['object']= function(attribute, value){
		if (typeof value != "object")
			return "Not valid object for attribute "+attribute;
	}

	Backbone.Validators['number']= function(attribute, value){
		if (typeof value != "number")
			return "Not valid number for attribute "+attribute;
	}
	Backbone.Validators['boolean']= function(attribute, value){
		if (typeof value != "boolean")
			return "Not valid boolean for attribute "+attribute;
	}

})();

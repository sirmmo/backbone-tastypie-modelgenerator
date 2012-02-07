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

			window[_mdl['name']] = Backbone.Model.extend({
				rootUrl: _mdl['url']
			});
			window[_mdl['container_name']] = Backbone.Collection.extend({
				urlRoot: _mdl['url'], 
				model: window[_mdl['name']]
			});

/*			_mdl['fields'] = {};
			schema = object[model]['schema'];
			$.getJSON(schema , function(data){
				for (var field in schema['fields']){
					if (object['fields'][field]['type'] == "string")
						_mdl['fields'][field]['type'] = Backbone.Validators.String ;
				}
			});*/
		}
	}
	
	Backbone.ModelNameGenerator = function (string)
	{
    	return string.charAt(0).toUpperCase() + string.slice(1);
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
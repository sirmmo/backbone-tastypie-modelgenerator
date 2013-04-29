backbone-tastypie modelgenerator 

This library enables the automatic creation of Models and Collections in the typical backbone-tastypie flavor with the usage of the schema metadata available for each resource. 
This enables the simple creation of web interfaces on data-centric RESTful applications.

Requires:
- backbone-tastypie,
- backbone.validations

Usage: 

Backbone.LoadModelsFromUrl("/api/v1/");

From this moment on every resource defined in the API is available as a windows.* element. 

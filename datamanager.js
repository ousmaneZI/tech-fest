const fs = require("fs")

console.log('include datamanager');

const dataFileNameSuffix = '.dat';

const getDataFileName = function(who){
	return who + dataFileNameSuffix;
};

module.exports =  {
	saveFeature: function(who, feature){
		             console.log('Save feature to ' + who + dataFileNameSuffix);
					 var result = false;
					 fs.writeFile(getDataFileName(who), feature, "utf-8", function(err, data) {
						 if(!err) {
							 result = true;
						 }
					 });
					 return result;
				 },
	addFeature:  function(who, feature){
		             console.log('Add feature to ' + who + dataFileNameSuffix);
					 var result = false;
					//  fs.appendFile(getDataFileName(who), "***", function(err, data) {
					// 	if(!err) {
					// 		result = true;
					// 	}
					// });
					 fs.appendFile(getDataFileName(who), feature + " ", function(err, data) {
						 if(!err) {
							 result = true;
						 }else{
							 console.log("error ....: ", err);
						 }
						 
					 });
					 return result;
				 },	
	getFeatures: function(who){
		             console.log('Get features from ' + who + dataFileNameSuffix);
					 var featureData = null;
					 //var fileName = 
					 featureData = fs.readFileSync(getDataFileName(who), "utf-8");
					 console.log(featureData);

					 return featureData.split(" ");					 
	             }	
};
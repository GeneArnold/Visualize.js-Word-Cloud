var app_wordcloud = app_wordcloud || {};

app_wordcloud = {
	init: function(){
		//console.log("init");
		app_wordcloud.getData();
	},
	getData: function(){
		//console.log("getData");

		visualize({
		    auth: {
		        name: "jasperadmin",
		        password: "jasperadmin",
		        organization: "organization_1"
		    }
		}, function (v) {
	        report = v.report({
	            resource: "/public/Samples/MyExamples/Visualize_JSON_Export_Example/products",

	            success: function(){

					report.export({        
					        outputFormat: "json"//,

					    }, function (link, request) {
					        request({
					            dataType: "json" 
					        })
					        .done(app_wordcloud.processData)
					        .fail(function(){
					        	app_wordcloud.errorHandler(error);
					        });
					        
					    });

	            },

	            error: function(){
	            	app_wordcloud.errorHandler(error);
	            }
	        });
		});
	},
	processData: function(data){
		//console.log("processData");

		var dataItem = [];

		var dataItems = [];

		for (var i = data.length - 1; i >= 0; i--) {
			dataItems.push([data[i].product_name,data[i].product_count]);    
		};


		app_wordcloud.displayCloud(dataItems);

	},
	displayCloud: function(list){
		//console.log("displayCloud");

		WordCloud(document.getElementById('canvas'), { 
			list: list,
			click: function(item,dimension,event){
				//console.log("WordCloud.click");
				app_wordcloud.renderSubReport(item);
			},
			hover: function(item,dimension,event){
				//console.log("WordCloud.click");
				document.getElementById("display").innerHTML = item[0];
			},
			gridSize: 1,
			shuffle:true,
			rotateRatio:1,
			minSize:1
		} );
	},
	renderSubReport: function(item){
		//console.log("renderSubReport");
		console.log(item[0]);

		visualize({
		    auth: {
		        name: "jasperadmin",
		        password: "jasperadmin",
		        organization: "organization_1"
		    }
		}, function (v) {
	        report = v.report({
	            resource: "/public/Samples/MyExamples/Visualize_JSON_Export_Example/stores",
	            params: {
		            "par_product_name": [item[0]]
		        },
		        container: "#report",
	            success: function(){

	            },

	            error: function(){
	            	console.log(error);
	            }
	        });
		});
	},
	errorHandler: function(error){
		console.log(error);
	}
};

$( document ).ready(app_wordcloud.init);
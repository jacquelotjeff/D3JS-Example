$(document).ready(function(){
	// No cache for this request
	$.ajaxSetup({ cache: false });
	
	function getRequest(url, callback) {
		$.get(url, function(data) {
			data = $.parseJSON(data);
			callback(data);
		});
	}	

	function generateBarChart(idDiv, data, ticks)
	{
		$.jqplot.config.enablePlugins = true;
		var barChart = $.jqplot(idDiv, [data], {
            animate: !$.jqplot.use_excanvas,
            seriesDefaults:{
                renderer:$.jqplot.BarRenderer,
                pointLabels: { show: true }
            },
            axes: {
                xaxis: {
                    renderer: $.jqplot.CategoryAxisRenderer,
                    ticks: ticks
                }
            },
			axesDefaults:
			{
				min: 0,
				tickInterval: 1,
				tickOptions: {
					formatString: '%d'
				}
			},
            highlighter: { show: false }
        });

		$(window).resize(function() {
			barChart.replot( { resetAxes: true } );
		});
	}

	var list_users = [];
	getRequest('webservices/liste_amis_user.php?user=5', function(data) {
		var list_users = "";
		for (var i = 0; i <= data.length - 1; i++) {
			//console.log(i);
			if (i == 0) {
				list_users = data[i][1];
			} else {
				list_users = list_users+','+data[i][1];
			}
		}

		getRequest('webservices/infos_user.php?user='+list_users, function(data) {
			var count_man = 0;
			var count_woman = 0;
			for (var i = 0; i <= data.length - 1; i++) {
				if (data[i][7] == 1) {
					count_woman = count_man+1;
				} else {
					count_man = count_woman+1;
				}
			}

			// Generate the bar chart
			generateBarChart('pourcent_friend_gender', [count_man, count_woman], ["Hommes", "Femmes"]);
		});
	});
});
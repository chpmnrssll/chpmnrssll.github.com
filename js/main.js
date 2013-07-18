$(document).ready(function () {
	Tabletop.init({
		key: '0ArGSorgsgZvbdEFWWE5uN0NncDA0U1VHbzhHRV9YQVE',
		callback: function(data, tabletop) { 
			var i, dataLength = data.length;
			
			for(i = 0; i < dataLength; i++) {
				$('#cms').append(
					$('<div>', { html: '<h3>' + data[i].name + '</h3><em>' + data[i].date + '</em> - ' + data[i].content })
					//$('<li>', { text: data[i].name + ', ' + data[i].content })
				);
			}
		},
		simpleSheet: true 
	});
});
$(document).ready(function () {
	Tabletop.init({
		key: '0ArGSorgsgZvbdEFWWE5uN0NncDA0U1VHbzhHRV9YQVE',
		callback: function(data, tabletop) { 
			var i, dataLength = data.length;
			
			for(i = 0; i < dataLength; i++) {
				$('#cms').append(
					$('<span>', { html: data[i].name }).html() + "<hr/>" +
					$('<span>', { html: data[i].content }).html() + "<br/>"
				);
			}
		},
		simpleSheet: true 
	});
});
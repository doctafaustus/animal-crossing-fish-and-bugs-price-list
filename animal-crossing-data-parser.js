function getFish() {
	$('noscript').remove();
	var data = [];

	$('.acnh_mushi').each(function() {
	  var $table = $(this);

	  $table.find('tr').each(function() {
	  	var $row = $(this);

	  	var object = {
	  		no: $row.find('td:nth-child(1)').text(),
	  		name: $row.find('td:nth-child(2) a').text(),
	  		image: $row.find('td:nth-child(2) a img').attr('data-original'),
	  		shadow: $row.find('td:nth-child(3)').text(),
	  		price: $row.find('td:nth-child(4)').text(),
	  		location: $row.find('td:nth-child(5)').text().replace('(', ' ('),
	  		time: $row.find('td:nth-child(6)').html(),
	  		rarity: $row.find('td:nth-child(7)').text()
	  	};

	  	if (object.name) data.push(object);
	  });
	});

	console.log(data);
}



function getBugs() {
	$('noscript').remove();
	var data = [];

	$('.acnh_mushi').each(function() {
	  var $table = $(this);

	  $table.find('tr').each(function() {
	  	var $row = $(this);

	  	var object = {
	  		no: $row.find('td:nth-child(1)').text(),
	  		name: $row.find('td:nth-child(2) a').text(),
	  		image: $row.find('td:nth-child(2) a img').attr('src'),
	  		price: $row.find('td:nth-child(3)').text(),
	  		time: $row.find('td:nth-child(4)').html()
	  	};

	  	if (object.name) data.push(object);
	  });
	});

	console.log(data);
}

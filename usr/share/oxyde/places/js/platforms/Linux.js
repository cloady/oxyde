var fs = require('fs');

module.exports = {
	ROOT: '/',
	HOME: '/root/',
	ListDirectory: function(path, callback) {
		fs.readdir(path, function(err, files) {
			files.map(function(file) {
				var stats = fs.statSync(path+'/'+file);
				callback({
					name: file,
					path: path+'/'+file,
					size: stats.size
				});
			});
		});
	}
};
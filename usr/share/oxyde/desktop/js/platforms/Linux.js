var fs = require('fs'),
	ini = require('ini'),
	cp = require('child_process'),
	glob = require('glob');

var USR_PIXMAPS_PATH = '/usr/share/pixmaps',
	USR_APPS_PATH = '/usr/share/applications',
	USR_DOCKAPPS_PATH = '/usr/share/dock/applications',
	USR_64x64ICON_PATH = '/usr/share/icons/hicolor/64x64/apps',
	USR_64x64ICON_PATH = '/usr/share/icons/hicolor/48x48/apps',
	USR_OTHERICON_PATH = '/usr/share/icons/hicolor/scalable/apps',
	USR_BACKGROUND_PATH = '/usr/share/backgrounds';

var DEFAULT_WALLPAPER = 'oxydesk_oxygen_wallpaper.jpg';

function parseGtkApps(path, callback) {
	fs.readdir(path, function(err, files) {
		files.map(function(file) {
			try {
				var data = ini.parse(fs.readFileSync(path+'/'+file, 'utf-8'));

				if ((data["Desktop Entry"]["Show"] === undefined) || (data["Desktop Entry"]["Name"]))
				{
					var icon = '';

					try { (fs.lstatSync(USR_PIXMAPS_PATH+'/'+data["Desktop Entry"]["Icon"]+'.png')) && (icon=USR_PIXMAPS_PATH+'/'+data["Desktop Entry"]["Icon"]+'.png'); 	} catch(e) {}
					try { (fs.lstatSync(USR_OTHERICON_PATH+'/'+data["Desktop Entry"]["Icon"]+'.svg')) && (icon=USR_OTHERICON_PATH+'/'+data["Desktop Entry"]["Icon"]+'.svg');	} catch(e) {}
					try { (fs.lstatSync(USR_64x64ICON_PATH+'/'+data["Desktop Entry"]["Icon"]+'.png')) && (icon=USR_64x64ICON_PATH+'/'+data["Desktop Entry"]["Icon"]+'.png');	} catch(e) {}
					try { (fs.lstatSync(USR_48x48ICON_PATH+'/'+data["Desktop Entry"]["Icon"]+'.png')) && (icon=USR_48x48ICON_PATH+'/'+data["Desktop Entry"]["Icon"]+'.png');	} catch(e) {}
					try { (fs.lstatSync(data["Desktop Entry"]["Icon"])) && (icon=data["Desktop Entry"]["Icon"]); } catch(e) {  }

						callback({
							name: data["Desktop Entry"]["Name"],
							icon: icon,
							exec: data["Desktop Entry"]["Exec"]
						});
				}
			} catch(e) { 
				//console.log(e);
			}
		});
	});
}

module.exports = {
	ListAll: function(callback) {
		parseGtkApps(USR_APPS_PATH, callback);
	},

	ListDock: function(callback) {
		parseGtkApps(USR_DOCKAPPS_PATH, callback);
	},

	ListFile: function() {

	},

	Exec: function(cmd) {
		var cp = require("child_process");
		cp.exec(cmd);
	},

	SetWallpaper: function(image) {
		
	},

	ListWallpaper: function(callback) {
		fs.readdir(USR_BACKGROUND_PATH, function(err, files) {
			files.map(function(file) {
				callback({ name: file, image: USR_BACKGROUND_PATH+'/'+file });
			});
		});
	},

	GetWallpaper: function() {
		return USR_BACKGROUND_PATH+'/warty-final-ubuntu.png';
	}
};
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

function parsePath(path, callback) {
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
				console.error(e);
			}
		});
	});
}

exports.ListAll = function(callback) {
	parsePath(USR_APPS_PATH, callback);
};

exports.ListDock = function(callback) {
	parsePath(USR_DOCKAPPS_PATH, callback);
};

exports.ListFile = function() {

};

exports.Exec = function(cmd) {
	var cp = require("child_process");
	cp.exec(cmd);
};

exports.GetWallpaper = function() {
	return USR_BACKGROUND_PATH+'/warty-final-ubuntu.png'
};
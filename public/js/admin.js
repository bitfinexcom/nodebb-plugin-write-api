(function() {
	'use strict';
	/* globals define, $, socket, ajaxify, app */

	define('admin/plugins/write-api', ['settings'], function(Settings) {
		var Admin = {};

		Admin.init = function() {
			Admin.initSettings();
			$('#newToken-create').on('click', Admin.createToken);
		};

		Admin.initSettings = function() {
			Settings.load('writeapi', $('.writeapi-settings'));

			$('#save').on('click', function() {
				Settings.save('writeapi', $('.writeapi-settings'), function() {
					app.alert({
						type: 'success',
						alert_id: 'writeapi-saved',
						title: 'Settings Saved',
						message: 'Please reload your NodeBB to apply these settings',
						clickfn: function() {
							socket.emit('admin.reload');
						}
					});
				});
			});
		};

		Admin.createToken = function() {
			var uid = parseInt($('#newToken-uid').val(), 10) || 1;

			socket.emit('plugins.writeApi.createToken', uid, function(err) {
				if (!err) {
					ajaxify.refresh();
				} else {
					app.alertError(err.message);
				}
			});
		};

		return Admin;
	});
})();
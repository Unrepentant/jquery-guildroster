/**
 * Guild Roster - jQuery Plugin
 * List your World of Warcraft guild data with jQuery
 *
 * Examples and documentation at: https://github.com/microtroll/jquery-guildroster
 *
 * Copyright (c) 2013 microtroll
 *
 * Version: 2.3 (09/01/2014)
 * Requires: jQuery v2+
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

(function($) {

	$.fn.extend({

		roster: function(settings) {

			/* Default settings */
			var r = {
				lang: 'en',
				locale: 'eu',
				realm: '',
				guild: ''
			};
			settings = $.extend(r, settings);

			/* Generate list */
			return this.each(function() {
				obj = $(this);

				// List
				obj.append('<div id="roster" class="table"><table><thead><tr><th class="name"><a href="#" class="sort-link">Name</a></th><th class="race align-center"><a href="#" class="sort-link">Race</a></th><th class="cls align-center"><a href="#" class="sort-link">Class</a></th><th class="lvl align-center"><a href="#" class="sort-link">Level</a></th><th class="rank align-center"><a href="#" class="sort-link">Guild Rank</a></th><th class="ach-points align-center"><a href="#" class="sort-link">Achievement Points</a></th></tr></thead><tbody></tbody></table></div>');

				var bn = 'http://' + r.locale + '.battle.net/api/wow/guild/' + r.realm + '/' + r.guild + '?fields=members,achievements&jsonp=?';
			
				$.ajax({
					url: bn,
					dataType: 'jsonp',
					error: function(xhr) {
						throw new Error('Failed to load API (' + xhr.statusText + ')');
					},
					success: function(guild) {
						$.each(guild.members, function(i, user) {

							// alternate row colors
							var count = 'row1';
							for (var nrow = 0; nrow < i; nrow++) {
								if (nrow%2 === 0) {
									count = 'row2';
								} else {
									count = 'row1';
								}
							}
							// generate data
							var content = '<tr class="'+count+'" data-level="'+user.character.level+'">';
							// name
							content += '<td class="name"><strong><a href="http://'+r.locale+'.battle.net/wow/'+r.lang+'/character/'+r.realm+'/'+user.character.name+'/" class="color-c'+user.character.class+'">'+user.character.name+'</a></strong></td>';
							// race
							content += '<td class="race"><span class="icon-frame frame-14"><img src="http://media.blizzard.com/wow/icons/18/race_'+user.character.race+'_'+user.character.gender+'.jpg" alt="" width="14" height="14" /></span></td>';
							// class
							content += '<td class="cls" data-raw="'+user.character.class+'"><span class="icon-frame frame-14"><img src="http://media.blizzard.com/wow/icons/18/class_'+user.character.class+'.jpg" alt="" width="14" height="14" /></span></td>';
							// level
							content += '<td class="lvl">'+user.character.level+'</td>';
							// guild master
							if(user.rank !== 0) {
								content += '<td class="rank" data-raw="'+user.rank+'"><span>Rank '+user.rank+'</span></td>';
							} else {
								content += '<td class="rank" data-raw="'+user.rank+'"><span class="guild-master">Guild Master<span class="symbol"></span></span></td>';
							}
							// achievements
							content += '<td class="ach-points"><span class="ach-icon">'+user.character.achievementPoints+'</span></td>';
							content += '</tr>';

							// create table
							$("#roster table tbody").append(content);
						});
					}
				});
			});
		}

	});
})(jQuery);
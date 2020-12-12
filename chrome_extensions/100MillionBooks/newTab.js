window.onload = function() {

    /*******************************************************************

    pure dom-related stuff

    *******************************************************************/

    $( "#service-announcements .announcement-third.oc-email input[type='email']" ).keypress( function(e) {
		if (e.which == 13) {
			save_email();
		}
	} );

    $( '.send-email' ).on( 'click', function( e ) {

        e.preventDefault();

        save_email();

        return;
    });

    $( '#announcement-dash' ).on( 'mouseenter', function() {

        $( '#announcement-dash > i' ).hide();
        $( '#announcement-dash > a' ).fadeIn();
    });
    $( '#announcement-dash' ).on( 'mouseleave', function() {

        $( '#announcement-dash > a' ).fadeOut();
        $( '#announcement-dash > i' ).fadeIn();
    });
    $( '.row.title-area' ).on( 'click', '#announcement-dash > a', function() {
        $( '#service-announcements' ).addClass( 'open' );
        $( '#page-filter' ).addClass( 'active' );    //obfuscate background to focus on announcements
    });
    $( '.row.title-area' ).on( 'click', '#service-announcements .btn-special', function() {
        close_announcements();
    });
    $( '#page-filter' ).on( 'click', function() {
        close_announcements();
    });

    function close_announcements() {
        $( '#service-announcements' ).removeClass( 'open' );
        $( '#announcement-dash > i' ).removeClass( 'new' );
        $( '#announcement-dash > img' ).hide();
        $( '#page-filter' ).removeClass( 'active' );    //obfuscate background to focus on announcements
        chrome.storage.local.get({ 'last_announcement_update': 2 }, function( u ) {

            chrome.storage.local.set({
                'last_announcement_check': u['last_announcement_update'],
                'first_announcement': false
            });
        });

        return;
    }

	$( '.footer-action.history' ).on( 'click', function( e ) {
		e.preventDefault();
		$( '#history-list' ).modal('show');
	});

	$( '.footer-action.favorites' ).on( 'click', function( e ) {
		e.preventDefault();
		$( '#faves-list' ).modal('show');
	});

    //adjust height for text in footer (because variable height)
    var about_height = $( '#about' ).height();
    $( '#about' ).css( 'margin-top', 'calc((20vh - ' + about_height + 'px) / 2)' );

    $( '#faves-list' ).on( 'click', '.remove-fave', function( o ) {
        removeFromLocalFaves( o.target.parentElement.id );
    });

    $( '.footer-action.settings, .open-settings' ).on( 'click', function() {
        chrome.runtime.openOptionsPage();
    });

	$( '.top-right' ).on( 'click', '#stumble-statement.no-speeds', function() {
        chrome.runtime.openOptionsPage();
    });

    $( '.fave' ).on( 'click', function() {

		var that = this;

		chrome.storage.local.get( { 'cached_books': [] }, function( cb ) {

			if( $(that).hasClass('faved') ) {
				$(that).removeClass('faved');
				removeFromLocalFaves( cb[ 'cached_books' ][0]._id );

			} else {
				$(that).addClass('faved');
				addToLocalFaves( cb[ 'cached_books' ][0] );
			}
		});

    });

    $( '.row.snippet-area, #faves-list .modal-body' ).on( 'click', 'a.amz, a.gr, a.lt, a.bkwty', function() {

        var bo = "";
        var cl = $( this ).attr( 'class' );

		if( cl.indexOf( 'perma' ) >= 0 ) {
			if( cl.indexOf( 'bkwty' ) >= 0 ) {
				cl = "bkwty";
			}
		}

        //which book
        if( $( this ).parent()[0].id == 'book-actions' ) {
            chrome.storage.local.get( { 'cached_books': [] }, function( cb ) {
                bo = cb[ 'cached_books' ][0]._id;
                $.getJSON( 'https://confidencehq.org/allthebooks/100mb-1m.php?bo=' + bo + '&cl=' + cl + '&callback=?' );
            });
        } else {
            bo = $( this ).closest('.row.fave-item')[0].id;
            $.getJSON( 'https://confidencehq.org/allthebooks/100mb-1m.php?bo=' + bo + '&cl=' + cl + '&callback=?' );
        }
    });


	$('[data-toggle="tooltip"]').tooltip();

    /*******************************************************************

    calculate time left for countdown

    *******************************************************************/

    function calc_time_left() {

        window.clearInterval();
        var t = 0; var diff = 0;

        chrome.storage.local.get( { 'cached_books': [], 'update_interval': 'minutes' }, function( arr ) {

            seconds = get_interval( arr[ 'update_interval' ] );

            t = Math.ceil( ( + new Date() ) / 1000 );
            diff = t - arr['cached_books'][0].timestamp;

            set_the_interval( seconds - diff );
        })
    }

    function set_the_interval( diff ) {
        window.setInterval( function() {
            if( diff < 1 ) {
                diff = 0;
            }

            var s = new Date(diff * 1000).toISOString();
            var t = s.substr(11, 8);
            if( diff > 86400 ) {
                t = ( parseInt( t.substr(0,2), 10 ) + 24 ) + t.substr(2);
            }

            $( '#time-left' ).text( t );

            diff = diff - 1;
        }, 1000);
        return;
    }

    function get_interval( setting ) {
        switch( setting ) {
            case 'seconds':
                return 3;
            case 'minutes':
                return 1800;
            case 'hours':
                return 10800;
            case 'days':
                return 108000;
            default:
                return 1800;
        }
    }

    /*******************************************************************

    identify user so developer knows how many unique requests coming in (and identify spammers)

    *******************************************************************/

    function getRandomToken() {
        var randomPool = new Uint8Array(32);
        crypto.getRandomValues(randomPool);
        var hex = '';
        for (var i = 0; i < randomPool.length; ++i) {
            hex += randomPool[i].toString(16);
        }
        return hex;
    }

    /******************************************************************/

    //check if new request being made within 9 seconds of last one (let folks catch the last book)
    function get_books( userid ) {

        var new_array = [];
        var seconds = 1800;

        chrome.storage.local.get( { 'cached_books': [], 'update_interval': 'minutes' }, function( book_arr_obj ) {

            book_arr = book_arr_obj['cached_books'];

            if( book_arr.length < 5 ) {

                load_items( userid, true );
                add_stumble();

            } else {    //means >0 items

                seconds = get_interval( book_arr_obj[ 'update_interval' ] );

                var t = Math.ceil( ( + new Date() ) / 1000 );
                if( ( t - book_arr[0].timestamp ) < seconds ) {
                    mod_the_dom( book_arr[0] );
                    calc_time_left();
                } else {

                    var removed = {};
                    removed = book_arr.shift();
                    add_to_history( removed );

                    book_arr[0].timestamp = Math.ceil( ( + new Date() ) / 1000 );

                    chrome.storage.local.set({ 'cached_books': book_arr }, function() {
                        mod_the_dom( book_arr[0] );
                        calc_time_left();
                        add_stumble();
                    });

                    if( Object.keys( book_arr ).length < 6 ) {
                        load_items( userid );
                    }
                }
            }
        });

    }

    function load_items( uid, show = false ) {

        var alltogethernow = [];

        //check if last book was fetched within past 10 seconds
        $.getJSON( 'https://confidencehq.org/allthebooks/100mb-1m.php?uid=' + uid + '&callback=?' )

        .done( function( json ) {
            if( json ) {
                var transformed = transform_data( json );

                chrome.storage.local.get( { 'cached_books': [] }, function( cb ) {

                    alltogethernow = cb['cached_books'].concat(transformed);

                    if( show ) {
                        alltogethernow[0].timestamp = Math.ceil( ( + new Date() ) / 1000 );
                    }

                    chrome.storage.local.set({ 'cached_books': alltogethernow }, function() {
                        if( show ) {
                            mod_the_dom(alltogethernow[0]);
                            calc_time_left();
                        }
                    });
                });
            }
        })

        .fail( function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    }


    function transform_data( json ) {

        for( var o in json ) {

            if( json[o]['supersnip_text'] ) {
                json[o]['supersnip_text'] = ( json[o]['supersnip_text'] ).substring( 1, ( json[o]['supersnip_text'].length - 1 ) );

                if( json[o]['supersnip_text'] ===  "<p class='visual-quote'>If you're seeing this message, you're running an old version of the Chrome extension.<br><br>Please update!</p>" ) {
                    json[o]['supersnip_text'] = null;
                }
            }

            var year = json[o]['year'];

            if( year < 1500 ) {
                if( year < 0 ) {
                    year = Math.abs(year) + " BC";
                } else {
                    year = Math.abs(year) + " AD";
                }
            }

            json[o]['year'] = year;
        }

        return json;
    }

    function add_stumble() {

        chrome.storage.local.get( { 'number_stumbles': 0 }, function( n ) {
            chrome.storage.local.set({
				number_stumbles: n.number_stumbles+1
			});
        });

        return;
    }

    //fill faves with faves
    chrome.storage.local.get( { 'faves':  [] }, function( f ) {
        if( ( f.faves ).length > 0 ) {
            for( var i in f.faves ) {
                $( '#faves-list .brief-list' ).append("<div class='row fave-item' id='"+f['faves'][i]._id+"'><div class='thumbnail-img' style='background-image:url(" + f['faves'][i].cover + ");'></div><div class='info'><p class='title'>"+f['faves'][i].title+"</p><p class='author'>"+f['faves'][i].author+"; " +f['faves'][i].year+"</p><a href='https://100millionbooks.org/snippet/?uid=" + f['faves'][i].uid + "' target='_blank' class='perma'><i class='fa fa-link' aria-hidden='true'></i> Permalink</a></div><i class='fa fa-times remove-fave'></i></div>");
            }
        } else {
            $( '#faves-list .modal-body' ).append("<p class='nothing-yet'>No favorites yet.</p>");
        }
    });

    //get history
    chrome.storage.local.get( { 'history':  [] }, function( f ) {
        if( ( f.history ).length > 0 ) {
            for( var i in f.history ) {
                $( '#history-list .brief-list' ).append("<div class='row fave-item' id='"+f['history'][i]._id+"'><div class='thumbnail-img' style='background-image:url(" + f['history'][i].cover + ");'></div><div class='info'><p class='title'>"+f['history'][i].title+"</p><p class='author'>"+f['history'][i].author+"; " +f['history'][i].year+"</p><a href='https://100millionbooks.org/snippet/?uid=" + f['history'][i].uid + "' target='_blank' class='perma'><i class='fa fa-link' aria-hidden='true'></i> Permalink</a></div></div>");
            }
        } else {
            $( '#history-list .modal-body' ).append("<p class='nothing-yet'>No history yet.</p>");
        }
    });

	chrome.storage.local.get( { 'userid': '', 'gold_status': false, 'first_time': true, 'number_stumbles': 0, 'update_interval': 'minutes', 'no_trial_offer_yet': true, user_32: 'false', last_announcement_check: 0, last_announcement_update: 2, first_announcement: true }, function( items ) {  //change announcement index here TOO

		var userid = items.userid;
		var transformed = [];

        chrome.storage.local.set( { 'last_announcement_update': 2 }, function() {   //change announcement index here as necessary
            if( items.last_announcement_update > items.last_announcement_check ) {
                $( '#announcement-dash > i' ).addClass( 'new' );
                if( items.first_announcement ) {
                    $( '#announcement-dash > img' ).show();
                }
            } else {
                $( '#announcement-dash > i' ).removeClass( 'new' );
            }
        });


        if (userid) {
            get_books( userid );

			if(  items.user_32 && !items.gold_status ) {
				launch_user32_modals( items.first_time, items.number_stumbles, items.no_trial_offer_yet );
			}
        } else {
            userid = getRandomToken();

			if( items.gold_status ) {
				chrome.storage.local.set( { userid: userid, user_32: true, cached_books: [] }, function() {
					get_books( userid );
				});
			} else {
				//set cached_books to trial books for new users
                transformed = transform_data( trial_books );
				chrome.storage.local.set( { userid: userid, user_32: true, cached_books: transformed, update_interval: 'seconds' }, function() {
					get_books( userid );//[]
				});

				launch_user32_modals( true, 0, true );

			}
        }

    });



	//version 3.2-specific funnel for new users...no existing users are effected
	function launch_user32_modals( first_time, number_stumbles, no_trial_offer_yet ) {
		if( first_time ) {
			$( '#first-time' ).modal( { backdrop: 'static', keyboard: false } );
		}

		if( number_stumbles < 53 ) {
			//chrome.storage.local.set( { 'update_interval': 'seconds' } );
		}

		if( ( number_stumbles > 52 ) && no_trial_offer_yet ) {	//AND NEW USERS ONLY
			$( '#offer-time' ).modal( { backdrop: 'static', keyboard: false } );
			//chrome.storage.local.set( { 'update_interval': 'minutes' } );
		}

		return;
	}


	//first time modal
	$( '#first-time .modal-footer button' ).on( 'click', function() {
		$( '#first-time' ).modal( 'hide' );
		chrome.storage.local.set( { 'first_time': false } );
	});

	//offer time no
	$( '#offer-time .acknowledge' ).on( 'click', function() {
		$( '#offer-time' ).modal( 'hide' );
		chrome.storage.local.set( { 'no_trial_offer_yet': false } );
	});

    //add element to history
    function add_to_history( current_item ) {

        var new_item = {
            _id: current_item._id,
            title: current_item.title,
            author: current_item.author,
            year: current_item.year,
            cover: current_item.cover_picture,
            uid: current_item.uid,
        }

        chrome.storage.local.get( { 'cached_books': [], 'history':  [] }, function( f ) {

			if( Object.keys( current_item ).length === 0 ) {
				return;
			}

            f['history'].unshift( new_item );

            if( f['history'].length > 20 ) {
                f['history'].pop();
            }

            chrome.storage.local.set({
                history: f.history
            });

            //update dom
            $( '#history-list .modal-body .nothing-yet' ).remove();
            $( '#history-list .brief-list' ).prepend("<div class='row fave-item' id='"+current_item._id+"'><div class='thumbnail-img' style='background-image:url(" + current_item.cover_picture + ");'></div><div class='info'><p class='title'>"+current_item.title+"</p><p class='author'>"+current_item.author+"; " +current_item.year+"</p><a href='https://100millionbooks.org/snippet/?uid=" + current_item.uid + "' target='_blank' class='perma'><i class='fa fa-link' aria-hidden='true'></i> Permalink</a></div></div>");
        });

    }

    chrome.storage.local.get( { 'gold_status': false, gold_lastchecked: 0, gold_key: '', gold_topsites: [] }, function( o ) {

		var full_link = ""; favicon_link = "";

		if( ( o.gold_topsites ).length > 0 ) {
			$( ".top-right" ).addClass( 'top-sites' );

			for( var s in o.gold_topsites ) {
				full_link = /^(http|https):/.test(o.gold_topsites[s][0]) ? o.gold_topsites[s][0] : 'http://' + o.gold_topsites[s][0];
				favicon_link = ( ( ( o.gold_topsites[s][0] ).toLowerCase() ).indexOf( 'news.ycombinator.com' ) >= 0 ) ? "https://news.ycombinator.com/favicon.ico" : "https://www.google.com/s2/favicons?domain=" + o.gold_topsites[s][0];
				$( ".top-right" ).append( "<a href='" + full_link + "'><p><img src='" + favicon_link + "'>" + o.gold_topsites[s][1] + "</p></a>" );
			}
		} else {
			$( ".top-right" ).append( "<p id='stumble-statement' class='no-speeds'>No speed-dial links set.<br><a href='#'>Add some here</a>!</p>" );
		}

		if( o.gold_status ) {
			console.log();
			$( '.row.status-area #about p.footer-action.settings.time-left' ).addClass( 'pronto' );

			//check gold status
			prove_gold( o.gold_key, o.gold_status, o.gold_lastchecked );
		} else {

		}

    });

    $( '#tab-options' ).on( 'click', '.disc-action.show-info', function() {
        //show info
        $( '#book-snippet' ).fadeOut( 150, function() {
            $( '#book-info' ).fadeIn( 150 );
        });

		$( '#book-actions' ).fadeOut();
		$( '#book-tags' ).fadeIn();

        $( '#tab-options' ).html( '<div class="info-note"><p class="disc-action-note">Show Snippet</p><i class="fa fa-quote-left disc-action show-quote" aria-hidden="true"></i></div>' );
    });

    $( '#tab-options' ).on( 'click', '.disc-action.show-quote', function() {
        $( '#book-info' ).fadeOut( 150, function() {
            $( '#book-snippet' ).fadeIn( 150 );
        });

		$( '#book-tags' ).fadeOut();
		$( '#book-actions' ).fadeIn();

        $( '#tab-options' ).html( '<div class="info-note"><p class="disc-action-note">Show Description</p><i class="fa fa-info-circle disc-action show-info" aria-hidden="true"></i></div>' );
    });

    function mod_the_dom( book ) {

        /*chrome.storage.local.get( 'number_stumbles', function( n ) {
            $( '#stumble-number' ).text( n.number_stumbles );
        });*/

        $( '#book-title' ).text( book.title );
        $( '#book-author' ).text( book.author );
        $( '#book-year' ).text( book.year );

        $( '#book-img' ).attr( 'src', book.cover_picture );

        if( book.supersnip_text ) {
            $( '#book-snippet' ).html( '<i class="fa fa-quote-left watermark" aria-hidden="true"></i><i class="fa fa-quote-right watermark" aria-hidden="true"></i>' + book.supersnip_text );

            if( book.description ) {
                $( '#book-info' ).html( book.description );
            }

            if( book.supersnip_text && book.description ) {
                $( '#tab-options' ).html( '<div class="info-note"><p class="disc-action-note">Show Description</p><i class="fa fa-info-circle disc-action show-info" aria-hidden="true"></i></div>' );
            }
        } else {
            $( '#book-info' ).html( book.description );
            $( '#book-snippet' ).remove();
            $( '#book-info' ).show();

            $( '#tab-options' ).html( '<div class="info-note"><p class="disc-action-note">No quote yet. Know one? Add one!</p><a href="https://docs.google.com/forms/d/e/1FAIpQLScvfBPULpD8VOqCYjQazj7M-4amEbtdTgpc2AD6joguGi3S_w/viewform?usp=sf_link" target="_blank"><i class="fa fa-plus-circle disc-action" aria-hidden="true"></i></a></div>' );
        }

        if( book.suggested_by_name ) {
            var sugg_text = "";
            if( book.suggested_by_link ) {
                var hostname = getDomain( book.suggested_by_link );
                sugg_text = "Suggested by <img src='https://www.google.com/s2/favicons?domain="+hostname+"'> <a href='"+book.suggested_by_link+"' target='_blank'> " +book.suggested_by_name+"</a>";
            } else {
                sugg_text = "Suggested by " + book.suggested_by_name;
            }
            $( '#suggestion-credit' ).css( 'padding', '2px 6px' );
            $( '#suggestion-credit' ).html( sugg_text );
        }

        chrome.storage.local.get( { 'save_to':  'goodreads', 'amazon': true }, function( o ) {
            var skeleton = "<div id='book-actions'>";

			skeleton += "<a class='perma' title='Permanent link' href='https://100millionbooks.org/snippet/?uid=" + book.uid + "' target='_blank'><i class='fa fa-link'></i> Share this</a>";

			/* if( book.bkwty_url ) {
                skeleton += "<a class='perma bkwty' title='Prices often lower than Amazon + free worldwide shipping!' href='" + book.bkwty_url + "' target='_blank'><img src='images/bookwitty_yellow.png'></i> Buy on Bookwitty</a><br>";
            } else {
				skeleton += "<br>";
            } */

            skeleton += "<br>";     //need to add <br> because bookwitty is gone forever

            if( ( o['amazon'] === true ) && book.asin ) {
                skeleton += "<a class='amz' href='https://www.amazon.com/dp/"+book.asin+"' target='_blank'>Amazon</a>"
            }

            if( o['save_to'] === 'goodreads' ) {
                skeleton += "<a class='gr' href='https://www.goodreads.com/book/isbn/"+book.asin+"' target='_blank'>Goodreads</a>"
            }

            if( o['save_to'] === 'librarything' ) {
                skeleton += "<a class='lt' href='http://www.librarything.com/isbn/"+book.isbn10+"' target='_blank'>LibraryThing</a>"
            }

            skeleton += "</div>"
            $( '#book-img' ).after( skeleton );
        });

		//add tags
		var tags_html = "<div id='book-tags'>";
		var tags_arr = [];
		if( book.tags ) {
			tags_arr = ( book.tags ).split( ',' );
		}
		for( var t in tags_arr ) {
			tags_html += "<span>" + tags_arr[t] + "</span>";
		}
		tags_html += "</div>";
		$( '#book-img' ).after( tags_html );

        $( '.pre-load' ).fadeOut( 400, function() {
            $( '.pre-load' ).remove();
            $( '.post-load' ).fadeIn();
        });

        return;
    }

    function getDomain(url, subdomain) {
            subdomain = subdomain || false;

            url = url.replace(/(https?:\/\/)?(www.)?/i, '');

            if (!subdomain) {
                url = url.split('.');

                url = url.slice(url.length - 2).join('.');
            }

            if (url.indexOf('/') !== -1) {
                return url.split('/')[0];
            }

            return url;
        }


    function addToLocalFaves( current_item ) {

        var new_fave = {
            _id: current_item._id,
            title: current_item.title,
            author: current_item.author,
            year: current_item.year,
            cover: current_item.cover_picture,
            asin: current_item.asin,
            isbn10:  current_item.isbn10,
            uid: current_item.uid
        }

        chrome.storage.local.get( { 'cached_books': [], 'faves':  [] }, function( f ) {

            for( var i in f.faves ) {
                if( new_fave._id == f['faves'][i]._id ) {
                    return;
                }
            }

            ( f.faves).unshift( new_fave );
            chrome.storage.local.set({
                faves: f.faves
            });

            //update dom
            $( '#faves-list .modal-body .nothing-yet' ).remove();

            $( '#faves-list .brief-list' ).prepend("<div class='row fave-item' id='"+current_item._id+"'><div class='thumbnail-img' style='background-image:url(" + current_item.cover_picture + ");'></div><div class='info'><p class='title'>"+current_item.title+"</p><p class='author'>"+current_item.author+"; " +current_item.year+"</p><a href='https://100millionbooks.org/snippet/?uid=" + current_item.uid + "' target='_blank' class='perma'><i class='fa fa-link' aria-hidden='true'></i> Permalink</a></div><i class='fa fa-times remove-fave'></i></div>");

            $.getJSON( 'https://confidencehq.org/allthebooks/100mb-1m.php?bo=' + f[ 'cached_books' ][0]._id + '&cl=local_saves' + '&callback=?' );
        });

    }

    function removeFromLocalFaves( uid ) {
        chrome.storage.local.get( { 'faves':  [] }, function( f ) {

            for( var o in f.faves ) {
                if( f.faves[o]['_id'] == uid ) {
                    (f.faves).splice(o, 1);
                }
            }

            chrome.storage.local.set({ faves: f.faves }, function( ) {
                if( ( f.faves ).length == 0 ) {
                    $( '#faves-list .modal-body' ).append("<p class='nothing-yet'>No favorites yet.</p>");
                }
            });
        });

        //update dom
        $( '#' + uid ).remove();
        $( '.fave' ).removeClass( 'faved' );
    }

	//handle checking for gold
	function prove_gold( key, status, lastchecked ) {

		if( status ) {
			var right_now = Date.now() / 86400000;	//unix time in days
			var last_checked = lastchecked;

			if( ( right_now - last_checked ) > 7 ) {

				console.log('checking membership with gumroad');

				//check with gumroad
				$.getJSON( 'https://confidencehq.org/allthebooks/100mb-1m.php?gk=' + key + '&callback=?' )

				.done( function( json ) {
					if( json.success ) {
						chrome.storage.local.set({
							gold_key: key,
							gold_status: true,
							gold_lastchecked: right_now
						});

					} else {
						chrome.storage.local.set({
							gold_key: '',
							gold_status: false,
							gold_lastchecked: 0
						});
					}
				})

				.fail( function( jqxhr, textStatus, error ) {
					var err = textStatus + ", " + error;
					console.log( "License Verify Request Failed: " + err );
					
					chrome.storage.local.set({
						gold_key: '',
						gold_status: false,
						gold_lastchecked: 0
					});
				});
				
			} else {
				return;
			}
		} else {
			chrome.storage.local.set({
				gold_key: '',
				gold_status: false,
				gold_lastchecked: 0
			});
			
			return;
		}
		
	}
    
    //save email from input
    function save_email() {
        
        $( "#service-announcements .announcement-third.oc-email i.get-email-status" ).hide();
        $( "#service-announcements .announcement-third.oc-email i.get-email-status.loading" ).fadeIn();
        
        var user_email_input = $( "#service-announcements .announcement-third.oc-email input[type='email']" ).val();
        
        var re = /\S+@\S+/;
        if( ( user_email_input.length !== 0 ) && ( re.test( user_email_input ) ) ) {
            
            $.getJSON( 'https://confidencehq.org/allthebooks/100mb-1m.php?get_new_email_address=' + encodeURIComponent(user_email_input) + '&client=chrome-extension&callback=?' )

            .done( function( json ) {
                
                $( "#service-announcements .announcement-third.oc-email i.get-email-status" ).hide();
                $( "#service-announcements .announcement-third.oc-email i.get-email-status.success" ).fadeIn();
            
                console.log( 'successful email-save', json );
            })
            
            .fail( function( jqxhr, textStatus, error ) {
                
                $( "#service-announcements .announcement-third.oc-email i.get-email-status" ).hide();
                $( "#service-announcements .announcement-third.oc-email i.get-email-status.fail" ).fadeIn();
            
                console.log( 'fail email-save', jqxhr, textStatus, error );
            });
            
            
        } else {
            $( "#service-announcements .announcement-third.oc-email i.get-email-status" ).hide();
            $( "#service-announcements .announcement-third.oc-email i.get-email-status.fail" ).fadeIn();
        }
        
        return;
	
    }
    
    //force update
    chrome.runtime.onUpdateAvailable.addListener( function() {
        chrome.runtime.reload();
    });
}

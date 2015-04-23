/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
		init();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
		
	},
	// Update DOM on a Received Event
	receivedEvent: function(id) {
	}
};

app.initialize();

// Functions
function init(){
	signin_login();
	vertical_center();
}

function signin_login(){
	$('.signIn, .logIn, .sign_log_in').hide();
	$('.connected').hide();
	var connected = false,
		phone_number = '0633086880',
		url_access = "http://rabillon.fr/";
	$.post(url_access+'functions.php',{phone_number:phone_number, what_function:'authentificate'},function(data) {
		if(data != 'KO') {
			var data = JSON.parse(data);
			$('.carte_name_name').text(data.name);
			$('.carte_pokedex_name').text(data.pokedex);
			$('.carte_right img').attr('src', data.picture);
			$('.connected').show();
		} else {
			$('.sign_log_in').show();
		}
	});
	$('.sign_log_in button').on('click', function() {
		var wut = $(this).attr('class');
		$('.sign_log_in').hide();
		if(wut == 'show_log_in') {
			$('.logIn').show();
		} else if(wut == 'show_sign_in') {
			$('.signIn').show();
		}
	});
	$('.signIn').on('submit', function(e) {
		e.preventDefault();
		var data = {};
		data['sign_name'] = $(this).find('input[name=name]').val();
		data['sign_email'] = $(this).find('input[name=email]').val();
		data['sign_phone_number'] = $(this).find('input[name=phone_number]').val();
		data['sign_password'] = $(this).find('input[name=password]').val();
		$.post(url_access+'functions.php',{data:data, what_function:'sign_in'},function(data) {
			if(data != 'KO') {
				var data = JSON.parse(data);
				$('.carte_name_name').text(data.name);
				$('.carte_pokedex_name').text(data.pokedex);
				$('.carte_right img').attr('src', data.picture);
				$('.connected').show();
				$('.signIn').hide();
			} else {
				$('.sign_log_in').show();
			}
		});
	});
	$('.logIn').on('submit', function(e) {
		e.preventDefault();
		var data = {};
		data['log_name'] = $(this).find('input[name=name]').val();
		data['log_password'] = $(this).find('input[name=password]').val();
		$.post(url_access+'functions.php',{data:data, what_function:'log_in'},function(data) {
			if(data != 'KO') {
				$('.logIn').hide();
				var data = JSON.parse(data);
				$('.carte_name_name').text(data.name);
				$('.carte_pokedex_name').text(data.pokedex);
				$('.carte_right img').attr('src', data.picture);
				$('.connected').show();
			} else {
				$('.sign_log_in').show();
			}
		});
	});
}

function vertical_center(){
	$('.vertical-center').each(function(){
		var elH 	= $(this).height(),
			parentH	= $(this).parent().height(),
			calc	= (parentH / 2) - (elH / 2);
		$(this).css('margin-top',calc);
	});
}
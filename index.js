//<html>
	/*<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>*/
	//<script>
	
			// ---------------------------------Start here----------------------------------//
	$(document).ready(function(){


			// ---------------------------------Buttons hide----------------------------------//
		//$(".back_to_home").hide();
		
		
		$("#view_next_two").hide();
		$("#view_next_two_albums").hide();
		$("#back_image").hide();
		$("#view_more_photos").hide();
		$("#album_container").hide();
		$("#user_container").hide();
		$("#post_container").show();
		$("#photos_container").hide();
		
		// ---------------------------------Variables----------------------------------//
		
		var root = "https://jsonplaceholder.typicode.com";
		var k = 0;
		var z = 0;
		var n = 0;
		window.gID;
		
		// -------------------------------------------AJAX Start here----------------------------------//
		$.ajax({
			type: "GET",
			url: root + '/posts',
			dataType: "json",
			success: function(data){
				var postData = data;
				
		// -------------------------------------------AJAX Get Post----------------------------------//
				$.ajax({
					type: "GET",
					url: root + "/users",
					dataType: "json",
					success: function(data){
						var userData = data;
						var postsContainer = $("#posts_container");
						var postContainer = $("<div>").addClass("post_container");
						var container = $("<div>").addClass("container");
						var postUsername = $("<div>").addClass("post_username");
						var postTitle = $("<div>").addClass("post_title");
						var postContent = $("<div>").addClass("post_content");
						
						var i =0;
						var j =0;
						
						for(var m = 0; m < 10; m++){
							for(; i < postData.length;){
								postTitle.html(postData[i].title);
								postContent.html(postData[i].body);	
								var userID = postData[i].userId;
								i= i + 10;
								break
							}
							for(; j < userData.length; j++){
								if(parseInt(userID) == parseInt(userData[j].id)){
									postUsername.html(userData[j].username);
									postUsername.attr('id', m);
									//postContainer.append(postUsername);
									//postContainer.append(postTitle);
									//postContainer.append(postContent);
									//postsContainer.append(postContainer.clone());
									container.append(postUsername);
									container.append(postTitle);
									container.append(postContent);
									postContainer.append(container);
									postsContainer.append(postContainer.clone());
									break;
								}
							}
						}
						k++;
					}
				});
			}
		});
		
		
		
		// -------------------------------------------AJAX View next ten post----------------------------------//
		
		
		$("#view_next_ten").click(function(){
			if(k < 10){
				$.ajax({
					type: "GET",
					url: root + '/posts',
					dataType: "json",
					success: function(data){
						var postData = data;
						$.ajax({
							type: "GET",
							url: root + "/users",
							dataType: "json",
							success: function(data){
								var userData = data;
								var postsContainer = $("#posts_container");
								var postContainer = $("<div>").addClass("post_container");
								var container = $("<div>").addClass("container");
								var postUsername = $("<div>").addClass("post_username");
								var postTitle = $("<div>").addClass("post_title");
								var postContent = $("<div>").addClass("post_content");
								
								var i =0 + k;
								var j =0;
								
								for(var m = 0; m < 10; m++){
									for(; i < postData.length;){
										postTitle.html(postData[i].title);
										postContent.html(postData[i].body);	
										var userID = postData[i].userId;
										i= i + 10;
										break
									}
									for(; j < userData.length; j++){
										if(parseInt(userID) == parseInt(userData[j].id)){
											postUsername.html(userData[j].username);
											postUsername.attr('id', m);
											//postContainer.append(postUsername);
											//postContainer.append(postTitle);
											//postContainer.append(postContent);
											//postContainer.val = m;
											//postsContainer.append(postContainer.clone());
											container.append(postUsername);
											container.append(postTitle);
											container.append(postContent);
											postContainer.val = m;
											postContainer.append(container);
											postsContainer.append(postContainer.clone());
											break;
										}
									}
								}
								k++;
							}
						});
					}
				});
			}else{
				alert("No more posts to show.")
			}
		});
		
		
		// -------------------------------------------AJAX Next two post----------------------------------//
		
		$("#view_next_two").click(function(){
			if(z < 10){
				$.ajax({
					type: "GET",
					url: root + '/posts',
					dataType: "json",
					success: function(data){
						var postData = data;
						$.ajax({
							type: "GET",
							url: root + "/users",
							dataType: "json",
							success: function(data){
								var userData = data;
								var postsContainer = $("#posts_container");
								var postContainer = $("<div>").addClass("post_container");
								var container = $("<div>").addClass("container");
								var postUsername = $("<div>").addClass("post_username");
								var postTitle = $("<div>").addClass("post_title");
								var postContent = $("<div>").addClass("post_content");
								
								var i =0 + z;
								
								for(var m = 0; m < 2; m++){
									for(; i < postData.length;){
										postTitle.html(postData[i].title);
										postContent.html(postData[i].body);	
										i++;
										break
									}
									postUsername.html(userData[userID].username);
									postUsername.attr('id', userID);
									//postContainer.append(postUsername);
									//postContainer.append(postTitle);
									//postContainer.append(postContent);
									//postContainer.val = userID;
									//postsContainer.append(postContainer.clone());
									
									container.append(postUsername);
									container.append(postTitle);
									container.append(postContent);
									postContainer.append(container);
									postContainer.val = userID;
									postsContainer.append(postContainer.clone());
								}
								z+=2;
							}
						});
					}
				});
			}else{
				alert("No more posts to show.")
			}
		});	
		
		
		// -------------------------------------------AJAX Next trwo album----------------------------------//
		
		$("#view_next_two_albums").click(function(){
			if(n < 10){
				$.ajax({
					type: "GET",
					url: root + "/albums",
					dataType: "json",
					success: function(data){
						for(var a = 0; a < data.length; a++){
							if(data[a].userId == gID){
								var album = $("<div>").addClass("album");
								album.html(data[a+n].title);
								$("#album_container").append(album);
								n++;
							}
						}
					}
				});
			}else{
					alert("No more albums to load.");
			}
		});
		
		// -------------------------------------------AJAX Post Container----------------------------------//
			
		$("body").on('click','.post_username', function(e){
			
			
			
			gID = $(this).attr('id');
			userID = $(this).attr('id');
			gID++;
			$("#view_photos").show()
			$(".full_Container").remove();
			$("#posts_container").empty();
			$("#posts_container").show();
			$("#album_container").empty();
			$("#user_container").empty();
			$("#user_container").show();
			$("#user_container").addClass("user_container");
			$("#view_next_ten").hide();
			$("#view_next_two").show();
			$("#view_next_two_albums").show();
			$("#back_to_home").show();
			$("#back_image").hide();
			k = 0;
			z = 0;
			n = 0;
			
			$.ajax({
				type: "GET",
				url: root + '/posts',
				dataType: "json",
				success: function(data){
					var postData = data;
					$.ajax({
						type: "GET",
						url: root + "/users",
						dataType: "json",
						success: function(data){
							var userData = data;
							
							var id = $("<div>").addClass("UserID");
							var name = $("<div>").addClass("Name");
							var username = $("<div>").addClass("Username");
							var email = $("<div>").addClass("Email");
							var address = $("<div>").addClass("UserAddress");
							var street = $("<div>");
							var suite = $("<div>");
							var city = $("<div>");
							var zipcode = $("<div>");
							var phone = $("<div>").addClass("UserPhone");
							var website = $("<div>").addClass("UserWebsite");
							var company = $("<div>").addClass("UserAddress");
							var cName = $("<div>");
							var catchPhrase = $("<div>");
							var bs = $("<div>");
							
							id.html("Username: " + userData[userID].id);
							name.html("Name: " + userData[userID].name);
							username.html("Username: " + userData[userID].username);
							email.html("Email: " + userData[userID].email);
							address.html("address: ");
							street.html(userData[userID].address.street);
							suite.html(userData[userID].address.suite);
							city.html(userData[userID].address.city);
							zipcode.html(userData[userID].address.zipcode);
							phone.html(userData[userID].phone);
							website.html(userData[userID].website);
							company.html("company:");
							cName.html(userData[userID].company.name);
							catchPhrase.html(userData[userID].company.catchPhrase);
							bs.html(userData[userID].company.bs);
							
							address.append(street);
							address.append(suite);
							address.append(city);
							address.append(zipcode);
							company.append(cName);
							company.append(catchPhrase);
							company.append(bs);
							
							$("#user_container").append(id);
							$("#user_container").append(name);
							$("#user_container").append(username);
							$("#user_container").append(email);
							$("#user_container").append(address);
							$("#user_container").append(phone);
							$("#user_container").append(website);
							$("#user_container").append(company);
							
							
							var postsContainer = $("#posts_container");
							var postContainer = $("<div>").addClass("post_container");
							var container = $("<div>").addClass("container");
							var postUsername = $("<div>").addClass("post_username");
							var postTitle = $("<div>").addClass("post_title");
							var postContent = $("<div>").addClass("post_content");
							
							$.ajax({
								type: "GET",
								url: root + "/albums",
								dataType: "json",
								success: function(data){
									var newDiv = $("<div>");
									newDiv.html("Albums:");
									$("#album_container").append(newDiv);
									for(var a = 0; a < data.length; a++){
										if(data[a].userId == gID){
											var album = $("<div>").addClass("album");
											album.html(data[a].title);
											$("#album_container").append(album);
											n++;
										}
										if(n >= 2){
											break;
										}
									}
								}
							});
							
							$("#album_container").show();
							
							var i =0;
							var j =0;
							
							for(var m = 0; m < 2; m++){
								for(; i < postData.length;){
									postTitle.html(postData[i].title);
									postContent.html(postData[i].body);	
									i++;
									break
								}
								postUsername.html(userData[userID].username);
								postUsername.attr('id', userID);
								//postContainer.append(postUsername);
								//postContainer.append(postTitle);
								//postContainer.append(postContent);
								//postContainer.val = userID;
								//postsContainer.append(postContainer.clone());
								
								
								container.append(postUsername);
								container.append(postTitle);
								container.append(postContent);
								postContainer.append(container);
								postContainer.val = userID;
								postsContainer.append(postContainer.clone());
							}
							z+=2;
						}
					});
				}
			});
		});
		
		
		// -------------------------------------------AJAX view photos----------------------------------//
		
		$("#view_photos").click(function(){
			$("#user_container").hide();
			$("#photos_container").show();
			//shows thumbnails
			//see only 9-15 in beginning
			
			//clicking username or album name will lead to corresponding pages
			$("#posts_container").empty();
			$("#posts_container").hide();
			$("#album_container").empty();
			$("#album_container").hide();
			$("#user_container").empty();
			$("#view_next_ten").hide();
			$("#view_next_two").hide();
			$("#view_next_two_albums").hide();
			$("#view_photos").hide();
			$("#back_to_home").show();
			$("#photos_container").show();
			$("#back_image").hide();
			$("#view_more_photos").show();
			k = 0;
			z = 0;
			n = 0;
			$.ajax({
				type: "GET",
				url: root + '/photos',
				dataType: "json",
				success: function(data){
					for(var x = 0 + n; x < data.length; x++){
						
						var imgDiv = $("<div>").addClass("image");
						var thumb = data[x].thumbnailUrl;
						imgDiv.append('<img src='+thumb+'/>');
						imgDiv.attr('id', x);
						$("#photos_container").append(imgDiv);
						if(x == n+14){
							n = x;
							break;
						}
					}
				}
			});
		});
		
		
		// -------------------------------------------AJAX more photos----------------------------------//
		
		$("#view_more_photos").click(function(){
			$.ajax({
				type: "GET",
				url: root + '/photos',
				dataType: "json",
				success: function(data){
					for(var x = 0 + n+1; x < data.length; x++){
						var imgDiv = $("<div>").addClass("image");
						var thumb = data[x].thumbnailUrl;
						imgDiv.append('<img src='+thumb+'/>');
						imgDiv.attr('id', x);
						$("#photos_container").append(imgDiv);
						if(x == n+14){
							y = x;
							break;
						}
					}
				}
			});
		});
		
		// -------------------------------------------AJAX photos container----------------------------------//
		
		$("#photos_container").on('click','.image', function(){
			
			id = $(this).attr('id');
			$("#photos_container").hide();
			$("#back_image").show();
			$("#load_more_images").hide();
			$("#view_more_photos").hide();
			
			$("body").append($("<div>").addClass("full_Container"));
			var fullPhotoContainer = $(".full_Container");
			
			
			//may view original photo plus info upon clicking thumbnail(title, who uploaded, which album title)
			var photoData;
			var albumData;

			
			
			$.ajax({
				type: 'GET',
				url: root + '/photos',
				dataType: 'json',
				success: function(data){
					var photoData = data;
					$.ajax({
						type: 'GET',
						url: root + '/albums',
						dataType: 'json',
						success: function(data){
							var albumData = data;
							$.ajax({
								type: 'GET',
								url: root + '/users',
								dataType: 'json',
								success: function(data){
									var imgDiv = $("<div>").addClass("full_photo");
									var thumb = photoData[id].url;
									var back;
									back = $('<div>').addClass("back_image");
									imgDiv.append('<img src='+thumb+'/>');
									back.html("Back");
									back.click(function(){
											$("#photos_container").show();
											$("#posts_container").empty();
											$("#back_image").hide();
											$("#view_more_photos").show();
											$(".full_Container").remove();
										});
									
									$(".full_Container").append(imgDiv);
									$(".full_Container").append(back);
									var c = 0;
									$(".full_photo").click(function(){
										if(c == 0){
											var photoTitle;
											var photoUploader;
											var photoAlbum;
											
											
											photoTitle = $('<div>');
											photoUploader = $('<div>').addClass("post_username");
											photoAlbum = $('<div>').addClass("album");
											photoTitle.html("Title: ");
											photoUploader.html("Uploader: ");
											photoAlbum.html("Album: ");
											
											var userID;
											var albumID;
											
											for(var d = 0; d < photoData.length; d++){
												id++;
												if(photoData[d].id == id){
													photoTitle.append(photoData[d].title);
													
													albumID = photoData[d].albumId;
													photoAlbum.attr('id', albumID);
												}
												id--;
												
											}
											
											for(var d = 0; d < albumData.length; d++){
												if(albumData[d].id == albumID){
													photoAlbum.append(albumData[d].title);
													userID = albumData[d].userId;
												}
											}
											
											for(var d = 0; d < data.length; d++){
												if(data[d].id == userID){
													photoUploader.append(data[d].username);
													photoUploader.attr('id', userID-1);
												}
											}

											$(".full_Container").append(photoTitle);
											$(".full_Container").append(photoUploader);
											$(".full_Container").append(photoAlbum);
											
											c = 1;
										}
									});
								}
							});
						}
					});
				}
			});
			
		});
		
		// -------------------------------------------AJAX photo container----------------------------------//
		
		$("body").on('click','.album', function(){
			$(".full_Container").remove();
			$("#user_container").hide();
			$("#posts_container").empty();
			$("#posts_container").show();
			$("#photos_container").empty();
			$("#photos_container").show();
			$("#view_more_photos").hide();
			$("#back_image").hide();
			id = $(this).attr('id');
			$.ajax({
				type: 'GET',
				url: root + '/albums',
				dataType: 'json',
				success: function(data){
					var albumData = data;
					$.ajax({
						type: 'GET',
						url: root + '/photos',
						dataType: 'json',
						success: function(data){
							var newDiv = $('<div>');
							$("#photos_container").append()
							for(var x = 0; x < data.length; x++){
								if(data[x].albumId == id){
									console.log(id);
									console.log(data[x].albumId);
									console.log(data.length);
									var imgDiv = $("<div>").addClass("image");
									var thumb = data[x].thumbnailUrl;
									imgDiv.append('<img src='+thumb+'/>');
									imgDiv.attr('id', x);
									$("#photos_container").append(imgDiv.clone());
									
								}
							}
							$(".albumImage").click(function(){
								var albumName;
								var albumNumber;
								for(var x = 0; x < albumData.length; x++){
									console.log(id);
									if(albumData[x].id == id){
										albumName = albumData[x].title;
										albumNumber = albumData[x].id;
									}
								}
								var string;
								string = ('Album number: ' + albumNumber + ' | Album name: ' + albumName + ' | Image name: ' + data[$(this).attr('id')].title + ' | Thumbnail URL: ' + data[$(this).attr('id')].thumbnailUrl + ' | Full image URL: ' + data[$(this).attr('id')].url); 
							
								alert(string);

							});
						}
					});
				}
			});
		});
		
		// -------------------------------------------AJAX image function----------------------------------//
		/*
		$(".back_image").click(function(){
			alert();
			$("#photos_container").show();
			$("#posts_container").empty();
			$("#back_image").hide();
			$("#view_more_photos").show();
			$(".full_Container").remove();
		});
		*/
		// -------------------------------------------AJAX back to home----------------------------------//
		
		$(".back_to_home").click(function(){
			
			$(".full_Container").remove();
			$("#user_container").empty();
			$("#user_container").hide();
			$("#posts_container").empty();
			$("#album_container").empty();
			$("#album_container").hide();
			$("#photos_container").empty();
			$("#photos_container").hide();
			$("#load_more_images").hide();
			$("#view_more_photos").hide();
			
			//$("#back_to_home").hide();
			//$(".back_to_home").hide();
			
			$("#view_next_ten").show();
			$("#view_next_two").hide();
			$("#view_next_two_albums").hide();
			$("#view_photos").show();			
			$("#back_image").hide();
			$("#posts_container").show();

			k = 0;
			z = 0;
			n = 0;
			$.ajax({
				type: "GET",
				url: root + '/posts',
				dataType: "json",
				success: function(data){
					var postData = data;
					$.ajax({
						type: "GET",
						url: root + "/users",
						dataType: "json",
						success: function(data){
							var userData = data;
							var postsContainer = $("#posts_container");
							var postContainer = $("<div>").addClass("post_container");
							var container = $("<div>").addClass("container");
							var postUsername = $("<div>").addClass("post_username");
							var postTitle = $("<div>").addClass("post_title");
							var postContent = $("<div>").addClass("post_content");
							
							var i =0;
							var j =0;
							
							for(var m = 0; m < 10; m++){
								for(; i < postData.length;){
									postTitle.html(postData[i].title);
									postContent.html(postData[i].body);	
									var userID = postData[i].userId;
									i= i + 10;
									break
								}
								for(; j < userData.length; j++){
									if(parseInt(userID) == parseInt(userData[j].id)){
										postUsername.html(userData[j].username);
										postUsername.attr('id', m);
										//postContainer.append(postUsername);
										//postContainer.append(postTitle);
										//postContainer.append(postContent);
										//postsContainer.append(postContainer.clone());
										
										container.append(postUsername);
										container.append(postTitle);
										container.append(postContent);
										postContainer.append(container);
										postsContainer.append(postContainer.clone());
										break;
									}
								}
							}
							k++;
							$("#post_container").show();
						}
					});
				}
			});
			
		});
	});
	//</script>
	/*
	<head>
	
	</head>
	
	<body>
	
	// -------------------------------------------AJAX stuff---------------------------------//
		<div id="user_container"></div>
		<div id="album_container"></div>
		<div id="photos_container"></div>
		<div id="posts_container"></div>
		
	// -------------------------------------------AJAX buttons----------------------------------//
		<button id="view_next_ten">Load more posts</button>
		<button id="view_next_two">Load more posts</button>
		<button id="view_next_two_albums">Show all albums</button>
		<button id="view_photos">Show all photos</button>
		<button id="back_to_home">Home</button>
		<button id="back_image">Back</button>
		<button id="view_more_photos">Load more images</button>
	</body>

</html>*/
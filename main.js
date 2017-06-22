var resultsection = document.getElementById("results");

var searchBox = document.getElementById("searchBox");

var musicBox =
document.getElementById("music-player")

function searchNOW(){
	var results = document.getElementById("results");
	var music =
	document.getElementById("music-player");
	let markup = ``
	results.innerHTML = markup

	var searchTerm = searchBox.value;
	console.log(searchTerm);
	var url =  "https://api.soundcloud.com/tracks/?client_id=86b6a66bb2d863f5d64dd8a91cd8de94&q="+searchTerm;
	fetch(url)
		.then(
			function(response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' +
						response.status);
				}
				response.json().then(function(data) {
					console.log(data.length)
					for (let i = 0; i < data.length; i++) {
						console.log(data[i].title);
						let art = data[i].artwork_url;
						let id = data[i].stream_url;
						console.log(art);
						if (art == null) {
							art = data[i].user.avatar_url
							console.log(art)
						};
						let title = data[i].title;
						let music = data[i].stream_url
						let markup = `
								<ul>
			            <div class="title" id="${id}">
			            <img src=${art} id="${id}">
									${title}</div>
								</ul>
			        `;
					results.innerHTML += markup;
		}
	})
})
};


searchBox.addEventListener("keypress", function(e) {
	if (e.keyCode === 13) {
		searchNOW();
		}
	}
);

resultsection.addEventListener("click",function(a) {
	{
		if (musicBox.paused===true) {
			console.log(a.target.id);
			musicBox.src = a.target.id + "?client_id=86b6a66bb2d863f5d64dd8a91cd8de94";
			musicBox.play();
		} else if (musicBox.paused===false) {
			musicBox.pause();
		}
	}
}
)

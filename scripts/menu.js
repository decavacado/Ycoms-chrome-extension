var button_test = new Blu("changeColor", {
	fun: function(){
		console.log("Hello World")
	}
})
var log = new Blu("log", {
	opener: function(){
		window.open("https://ycoms-test.herokuapp.com/login")
	}
})
var reg = new Blu("reg", {
	opener: function(){
		window.open("https://ycoms-test.herokuapp.com/register")
	}
})
window.addEventListener('load', (event) => {
		chrome.cookies.get({url: "https://ycoms-test.herokuapp.com", name: "session"}, async function(cookie){
		    if(cookie){
		    	let session_id = cookie.value
		    	console.log(session_id)
		    	console.log(cookie)
		    	let response = await fetch("https://ycoms-test.herokuapp.com/api/session_check", {mode: 'cors', method: "post", 'Access-Control-Allow-Headers': 'Content-Type', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: `id=${session_id}`})
		    	let data = await response.json()
		    	if(data.user.username){
		    		console.log(data)
		    		let element = $("#username")
		    		element.text(data.user.username)
		    		chrome.storage.sync.clear(console.log)
		    		chrome.storage.sync.set({session: {session_id: session_id, user: data.user.username}}, function() {
          					console.log("Value Set");
        			});
		    	}else {
		    		let element = $("#login")
		    		element.css("display", "flex")
		    	}
		    }else {
		    	let element = $("#login")
		    	element.css("display", "flex")
		    }
		})	  
});

console.log(chrome)

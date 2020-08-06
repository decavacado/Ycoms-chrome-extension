/* setTimeout(async function(){
	let mes = document.querySelector("yt-formatted-string[id='message']")
	mes.remove()
	mes = document.createElement("div")
	console.log(mes)
	let id = window.location.href.split("=")[1]
	id = id.split("&")[0]
	console.log(id)
	let res = await fetch(`https://ycoms-test.herokuapp.com/api/${id}/comments`)
	let data = await res.json()
	console.log(data)
	let temp = `
	<style>
		.come {
			font-size: 30px;
		}
		.text {
			padding: 15px;
			font-size: 15px;
		}
		.user {
			font-weight: bold;
		}
		.inputs {
			padding-right: 72px;
			border: none;
			font-size: 20px;
			width: 100%;
			height: 30px;
			border-bottom: solid 1px;
			outline: none;
			transition: border-bottom-color 0.5s ease-in-out;
		}
		.comments_wrapper {
			position: relative;
		}
		.comments_wrapper p {
			position: absolute;
			right: 0;
		}
		.post:hover {
			cursor: pointer;
			color: #FF0000;
		}
		.inputs:focus {
			border-bottom-color: #FF0000;
		}
		.post {
			margin: auto;
			display: inline-block;
		}
		.comments_wrapper {
			width: 50%;
			margin: 12px;
			padding-top: 10px;
		}
	</style>
	<h1 class="come">Comments <%= comments.length %></h1>
	<div class="comments_wrapper">
		<input type="text" id="comment" placeholder="Comment..." class="inputs">
		<p class="post" id="post" onclick="comment()">comment</p>
	</div>
	<% comments.forEach(function(e){ %>
		<p class="text user"><%= e.username %></p>
		<p class="text"><%= e.comment %></p>
	<% }) %>
	`
	let html = ejs.render(temp,{comments: data.comments})
	mes.innerHTML = html
	let mess = document.querySelector("div[id='primary']")
	mess.appendChild(mes)
}, 18000) */

async function test(){
	let mes = document.querySelector("yt-formatted-string[id='message']")
	if(!mes){
		setTimeout(test, 18000)
	}else {
		mes.remove()
		mes = document.createElement("div")
		console.log(mes)
		let id = window.location.href.split("=")[1]
		id = id.split("&")[0]
		console.log(id)
		let res = await fetch(`https://ycoms-test.herokuapp.com/api/${id}/comments`)
		let data = await res.json()
		console.log(data)
		let temp = `
		<style>
			.come {
				font-size: 30px;
			}
			.text {
				padding: 15px;
				font-size: 15px;
			}
			.user {
				font-weight: bold;
			}
			.inputs {
				padding-right: 72px;
				border: none;
				font-size: 20px;
				width: 100%;
				height: 30px;
				border-bottom: solid 1px;
				outline: none;
				transition: border-bottom-color 0.5s ease-in-out;
			}
			.comments_wrapper {
				position: relative;
			}
			.comments_wrapper p {
				position: absolute;
				padding: 6px;
				font-size: 18px;
			}
			.post:hover {
				cursor: pointer;
				color: #FF0000;
			}
			.inputs:focus {
				border-bottom-color: #FF0000;
			}
			.post {
				margin: auto;
				display: inline-block;
			}
			.comments_wrapper {
				width: 50%;
				margin: 12px;
				padding-top: 10px;
			}
		</style>
		<h1 class="come">Comments <%= comments.length %></h1>
		<div class="comments_wrapper">
			<input type="text" id="comment_ycoms" placeholder="Comment..." class="inputs">
			<p class="post" id="post">comment</p>
		</div>
		<div id="all_comments">
		<% comments.forEach(function(e){ %>
			<p class="text user"><%= e.username %></p>
			<p class="text"><%= e.comment %></p>
		<% }) %>
		</div>
		`
		let html = ejs.render(temp,{comments: data.comments})
		mes.innerHTML = html
		let mess = document.querySelector("div[id='primary']")
		mess.appendChild(mes)
		let com = document.getElementById("post")
		com.addEventListener('click', function(e){
			let comment = document.getElementById("comment_ycoms")
			chrome.storage.sync.get("session", async function(result) {
          		console.dir(comment)
          		console.log(result)
          		if(result.session){
          			let appender = document.getElementById("all_comments")
          			let title = document.createElement("p")
          			title.innerHTML = result.session.user
          			title.className = "text user"
					let content = document.createElement("p")
					content.innerHTML = comment.value
					content.className = "text"
					appender.append(title)
					appender.append(content)
          			let res = await fetch(`https://ycoms-test.herokuapp.com/api/${id}/comments`, {method: "POST", headers: {"Content-Type": "application/json"} ,body: JSON.stringify({comment: comment.value, session_id: result.session.session_id})})
          			let data = await res.json()
					console.log(data)
          		}
        	});
		})
	}
}
console.log(ejs)
console.log(chrome)
spf.cache.clear()
spf.script.ready("desktop_polymer_inlined_html_polymer_flags/desktop_polymer_inlined_html_polymer_flags", test, console.log)
var posts = [];
var totalNumOfPosts = 0;

serviceUrl = 'http://jsonplaceholder.typicode.com/posts';
function getPosts(){
  fetch(serviceUrl).then((response) => {
   if(response.ok){
     return response.json();
   } 
    throw new Error('Request failed!');
  },(networkError) => {
    console.log(networkError.message);
  }).then(responseJson => {
    posts = responseJson;
    showPosts();
  });
}
//getPosts();

function getPostbyUserId(){
  var all = document.getElementById('myCheck').checked;
  console.log(all);
  if(all == true){
    getPosts();
    return;
  }
  fetch(serviceUrl+`?userId=${document.getElementById('userId').value}`).then((response) => {
   if(response.ok){
     return response.json();
   } 
    throw new Error('Request failed!');
  },(networkError) => {
    console.log(networkError.message);
  }).then(responseJson => {
    posts = responseJson;
    showPosts();
  });
}
function createNewPost(){
  fetch(serviceUrl, {
    method: 'POST',
    body: JSON.stringify({
      title: document.getElementById('ipTitle').value,
      body:  document.getElementById('ipBody').value,
      userId:  document.getElementById('ipUserId').value
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => {
    if(response.ok)
    {
      console.log("Request done successfully");
      return response.json();
    }
    throw new Error('Post request failed!');
  },networkError => {
  console.log(networkError.message);
  }).then(json => {
    swal({text:`Post ${json.id} added Successfully!`,icon: "success"});
  });
}

function deletePost(postId){
  fetch(`${serviceUrl}?userId=${postId}`)
  .then(response => response.json())
  .then(json => console.log(json));
}

function showPosts(){
  var postsLength = document.getElementById('totalNumOfPosts');
  postsLength.textContent = `${posts.length} Posts`;

  var postsDiv = document.getElementById('postsDiv');
  for(let i=0; i< posts.length; i++){
    var div = document.createElement('div');
    div.className = 'well well-sm';
    div.style = 'margin: 5px;';

    var header = document.createElement('h4');
    header.textContent = posts[i].title;

    var body = document.createElement('p');
    body.textContent = posts[i].body;

    div.appendChild(header);
    div.appendChild(body);
    postsDiv.appendChild(div);
  }
}

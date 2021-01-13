
(function () {
  let submitBtn = document.querySelector("#submitPostButton");
  let postTextarea = document.querySelector("#postTextarea");
 
  postTextarea.addEventListener("keyup", (e) => {
    if (e.target.value.trim() != "") {
      return (submitBtn.disabled = false);
    }
    return (submitBtn.disabled = true);
  });

  submitBtn.addEventListener("click", async () => {
    data = {
      content: postTextarea.value.trim(),
    };
    console.log(data.content);
    axios.post("/api/posts",data).then( res => console.log(res));
  });

  
  function createPostHtml(postData) {
    let postedBy = postData.postedBy;
    let displayName = postedBy.firstName + " " + postedBy.lastName;
    let timestamp = postData.createdAt;

    return `<div class='post'>
                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='far fa-comment'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='fas fa-retweet'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='far fa-heart'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
  }
})();

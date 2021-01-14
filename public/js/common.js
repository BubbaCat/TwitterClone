let submitBtn = document.querySelector("#submitPostButton");
let postTextarea = document.querySelector("#postTextarea");

postTextarea.addEventListener("keyup", (e) => {
  if (e.target.value.trim() != "") {
    return (submitBtn.disabled = false);
  }
  return (submitBtn.disabled = true);
});

submitBtn.addEventListener("click", async () => {
  fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: postTextarea.value.trim(),
    }),
  });
  postTextarea.value = "";
  submitBtn.disabled = true;
});

function getPostIdFromElement(element) {
  let isRoot = element.hasClass("post");
  let rootElement = isRoot == true ? element : element.closest(".post");
  let postId = rootElement.data().id;

  if (postId === undefined) return alert("Post id undefined");

  return postId;
}

function createPostHtml(postData) {
  let postedBy = postData.author;
  if (postedBy._id === undefined) {
    return console.log("User object not populated");
  }

  let displayName = `${postedBy.firstName} ${postedBy.lastName}`;
  let timestamp = timeDifference(new Date(), new Date(postData.createdAt));

  return `<div class='post' data-id='${postData._id}'>

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
                                <button class='likeButton'>
                                    <i class='far fa-heart'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "Just now";
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}

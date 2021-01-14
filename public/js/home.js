document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/posts", { method: "GET" })
    .then(async (res) => await res.json())
    .then((data) => {
      console.log(data);
      outputPosts(data, document.querySelector(".postsContainer"));
    });
}); 

function outputPosts(results, container) {
  container.innerHTML = ``;

  results.forEach((result) => {
    container.innerHTML += createPostHtml(result);
  });

  if (results.length == 0) {
    container.innerHTML = "<span class='noResults'>Nothing to show.</span>";
  }
}


let fetchPosts=async()=>{
    
    try{
        let posts="";
        let res = await axios("http://localhost:3000/posts");
        posts= res.data.map((elem)=>{
            return `
            <div class="post" data-post-id=${elem.id} id=${elem.id}>
        <img class="postImg" src=${elem.image} alt="img-sample">
        <div class="post-rating-container">
            <div class="post-rating ">
                <button class="post-rating-btn">
                    <span class="material-symbols-outlined thumbUp">
                        thumb_up
                    </span>
                </button>
                <span class="post-rating-count">0</span>
            </div>
            <div class="post-rating ">
                <button class="post-rating-btn">
                    <span class="material-symbols-outlined thumbDown">
                        thumb_down
                    </span>
                </button>
                <span class="post-rating-count">0</span>
            </div>
        </div>

    </div>
            `;
        });
    document.querySelector(".DBposts").innerHTML = posts.join("");
    }
    catch(error){
        console.log(error.message);
        
    }
    document.querySelectorAll(".post").forEach((post) => {
      const postId = post.dataset.postId;
      const ratings = post.querySelectorAll(".post-rating");
      const likeRating = ratings[0];
      ratings.forEach((rating) => {
        const button = rating.querySelector(".post-rating-btn");
        const count = rating.querySelector(".post-rating-count");

        button.addEventListener("click", async () => {
          if (rating.classList.contains("post-rating-selected")) {
            return;
          }
          count.textContent = Number(count.textContent) + 1;
          ratings.forEach((rating) => {
            if (rating.classList.contains("post-rating-selected")) {
              const count = rating.querySelector(".post-rating-count");
              count.textContent = Math.max(0, Number(count.textContent) - 1);
              rating.classList.remove("post-rating-selected");
            }
          });
          rating.classList.add("post-rating-selected");

          const likeOrDislike = likeRating === rating ? "like" : "dislike";
          const response = await fetch(`/post/${postId}/${likeOrDislike}/`);
          const body = await response.json();
        });
      });
    });
}
fetchPosts();


document.querySelectorAll(".post").forEach(post =>{
    const postId= post.dataset.postId;
    const ratings=post.querySelectorAll(".post-rating");
    const likeRating=ratings[0];
    ratings.forEach(rating=>{
        const button = rating.querySelector(".post-rating-btn");
        const count=rating.querySelector(".post-rating-count");
        
        button.addEventListener("click", async ()=>{
            const likeOrDislike= likeRating === rating ? "like": "dislike";
            const response= await fetch (`/post/${postId}/${likeOrDislike}/`);
            const body = await response.json();
        } );
    });

});
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let content = '';

        // Print comments from users
        for (let comment of data.comments) {
            content += `
        <div class="datas">
            <div class="flexdiv">
                <img src="${comment.user.image.png}" alt="${comment.user.username}">
                <p class="title">${comment.user.username}</p>
                <p class="createdAt">${comment.createdAt}</p>
            </div>
            <p class="comment">${comment.content}</p>
            <div class="scorediv">
                <div class="vote">
                    <button>+</button>
                    <p class="score">${comment.score}</p>
                    <button>-</button>
                </div>
                <p class="reply">Reply</p>
            </div>
        </div>
      `;

            // Print reply for every comments
            for (let reply of comment.replies) {
                content += `
                <div class="main_reply"> 
                    <div class="data_reply">
                        <div class="flexdiv">
                        <img src="${reply.user.image.png}" alt="${reply.user.username}">
                        <p class="title">${reply.user.username}</p>
                        <p class="createdAt">${reply.createdAt}</p>
                    </div>
                    <p class="comment"><span class="mention">@${reply.replyingTo} </span>${reply.content}</p>
                    <div class="scorediv">
                          <div class="vote">
                          <button>+</button>
                          <p class="score">${reply.score}</p>
                          <button>-</button>
                    </div>
                    <p class="reply">Reply</p>
                    </div >
                    </div >
                </div>
                `;
            }

        }
        // Current user
        content += `
            <div class="yourcomment">
            <input class="commenttxt" placeholder="Add a comment..." type="text">
                    <section class="imgbtn">
                    <img class="comentimg" src="${data.currentUser.image.png}" alt="${data.currentUser.username}">
                    <div class="sendBTN">SEND</div>
                    </section>
            </div>
            </div>
            `;

        document.querySelector('.data').innerHTML = content;
    })
    .catch(error => console.error(error));
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let comments = '';
        let replys = '';
        let sendComment = '';


        // Print comments from users
        for (let comment of data.comments) {
            comments += `
        <div class="datas">
            <div class="flexdiv">
                <img class="dataimg" src="${comment.user.image.png}" alt="${comment.user.username}">
                <p class="title">${comment.user.username}</p>
                <p class="createdAt">${comment.createdAt}</p>
            </div>
            <p class="comment">${comment.content}</p>
            <div class="scorediv">
                <div class="vote">
                <div class='pluscolor'>+</div>
                    <p class="score">${comment.score}</p>
                    <div class='pluscolor'>-</div>
                </div>
                <img class="replyicon" src="./images/icon-reply.svg" alt="replyicon">
                <p class="reply">Reply</p>
            </div>
        </div>
      `;

            // Print reply for every comments
            for (let reply of comment.replies) {
                replys += `
                  <div class="main_reply"> 
                    <div class="data_reply">
                      <div class="flexdiv">
                        <img class="dataimg" src="${reply.user.image.png}" alt="${reply.user.username}">
                        <p class="title">${reply.user.username === `${data.currentUser.username}` ? `${reply.user.username}<div class="youlogo">you</div>` : `${reply.user.username}`}</p>
                        <p class="createdAt">${reply.createdAt}</p>
                      </div>
                      <p class="comment"><span class="mention">@${reply.replyingTo} </span>${reply.content}</p>
                      <div class="scorediv">
                        <div class="vote">
                          <div class='pluscolor'>+</div>
                          <p class="score">${reply.score}</p>
                          <div class='pluscolor'>-</div>
                        </div>
                        <div class="optionclass">
                            <p class="reply">${reply.user.username === `${data.currentUser.username}` ? `<img class="icons" src="./images/icon-delete.svg" alt="deleteicon"><div class="delete">Delete</div><img class="icons" src="./images/icon-edit.svg" alt="editicon"><div class="edit">Edit</div>` : `<img class="replyicon" src="./images/icon-reply.svg" alt="replyicon">Reply`}</p>
                        </div>
                        </div>
                    </div>
                  </div>
                `;
            }

        }
        // Current user

        sendComment += `
            <div class="yourcomment ${data.currentUser.username === 'julisimo' ? 'julisimo-comment' : ''}">
              <textarea onkeyup="textAreaAdjust(this)" class="commenttxt" placeholder="Add a comment..." type="text"></textarea>
              <section class="imgbtn">
                <img class="comentimg" src="${data.currentUser.image.png}" alt="${data.currentUser.username}">
                <div class="sendBTN">SEND</div>
              </section>
            </div>
          `;



        let content = comments + replys + sendComment;


        document.querySelector('.data').innerHTML = content;
    })
    .catch(error => console.error(error));

const commentarebi = document.querySelectorAll('.title');


function textAreaAdjust(element) {
    element.style.height = "1px";
    element.style.height = (element.scrollHeight) + "px";
}
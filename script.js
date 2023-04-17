"use strict";
let content;
const visible = document.querySelector(".data");
let comments = "";
let replys = "";
let sendComment = "";
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // Print comments from users
    for (let comment of data.comments) {
      comments += `
        <div class="datas" id="${comment.id}">
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
                <div class='optionclass1' onclick="replying(${comment.id})">
                <img class="replyicon" src="./images/icon-reply.svg" alt="replyicon">
                <p class="reply">Reply</p>
                </div>
            </div>
        </div>
      `;

      // Print reply for every comments
      for (let reply of comment.replies) {
        replys += `
                  <div class="main_reply" id="${reply.id}"> 
                    <div class="data_reply">
                      <div class="flexdiv">
                        <img class="dataimg" src="${
                          reply.user.image.png
                        }" alt="${reply.user.username}">
                        <p class="title">${
                          reply.user.username === `${data.currentUser.username}`
                            ? `${reply.user.username}<div class="youlogo">you</div>`
                            : `${reply.user.username}`
                        }</p>
                        <p class="createdAt">${reply.createdAt}</p>
                      </div>
                      <p class="comment"><span class="mention">@${
                        reply.replyingTo
                      } </span>${reply.content}</p>
                      <div class="scorediv">
                        <div class="vote">
                          <div class='pluscolor'>+</div>
                          <p class="score">${reply.score}</p>
                          <div class='pluscolor'>-</div>
                        </div>
                        <div class="optionclass1">
                            <p class="reply">${
                              reply.user.username ===
                              `${data.currentUser.username}`
                                ? `<div class="optionclass" onclick="deleteComment(${reply.id})">
                            <img class="icons" src="./images/icon-delete.svg" alt="deleteicon">
                            <div class="delete">Delete</div></div><div class="optionclass" id="editBTN" onclick="editComment(${reply.id})">
                            <img class="icons" src="./images/icon-edit.svg" alt="editicon">
                            <div class="edit">Edit</div></div>`
                                : `<div class="reply" onclick="replying(${reply.id})"><img class="replyicon" src="./images/icon-reply.svg" alt="replyicon">Reply`
                            }</p></div>
                        </div>
                        </div>
                    </div>
                  </div>
                `;
      }
    }
    // Current user
    sendComment += `
            <div class="yourcomment ${
              data.currentUser.username === "julisimo" ? "julisimo-comment" : ""
            }">
              <textarea onkeyup="textAreaAdjust(this)" id="commenttxt" class="commenttxt" placeholder="Add a comment..." type="text"></textarea>
              <section class="imgbtn">
                <img class="comentimg" src="${
                  data.currentUser.image.png
                }" alt="${data.currentUser.username}">
                <div class="sendBTN" onclick="send()">SEND</div>
              </section>
            </div>
          `;
    content = comments + replys + sendComment;
    visible.innerHTML = content;
  })
  .catch((error) => console.error(error));

const commentarebi = document.querySelectorAll(".title");

// function send() {
//     const text = document.getElementById('commenttxt');
//     let comm = document.createElement('div');
//     let user;
//     content += `
//         <div class="datas">
//             <div class="flexdiv">
//                 <img class="dataimg" src="./images/avatars/image-juliusomo.png" alt="User avatar">
//                         <p class="title">${user === `juliusomo` ?
//             `juliusomo<div class="youlogo">you</div>` : ``}</p>
//                 <p class="title">juliusomo</p>
//                 <p class="createdAt">1 wlis win</p>
//             </div>
//             <p class="comment">${text.value}</p>
//             <div class="scorediv">
//                 <div class="vote">
//                 <div class='pluscolor'>+</div>
//                     <p class="score">0</p>
//                     <div class='pluscolor'>-</div>
//                 </div>
//                 <img class="replyicon" src="./images/icon-reply.svg" alt="replyicon">
//                 <p class="reply">Reply</p>

function textAreaAdjust(element) {
  element.style.height = "1px";
  element.style.height = element.scrollHeight + "px";
}

function editComment(replyId) {
  document.getElementById("editBTN").removeAttribute("onclick");
  document.getElementById("editBTN").onclick = null;
  const replyElement = document.getElementById(replyId);
  const commentText = replyElement.querySelector(".comment").textContent;
  const editForm = document.createElement("div");
  const commentInput = document.createElement("textarea");
  commentInput.innerText = commentText;
  const submitButton = document.createElement("div");
  submitButton.textContent = "UPDATE";
  submitButton.classList.add("sendBTN");
  commentInput.setAttribute("type", "text");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const editedComment = commentInput.value;
    replyElement.querySelector(".comment").textContent = editedComment;
    editForm.remove();
    document.getElementById("editBTN").onclick = function () {
      editComment(replyId);
    };
  });
  editForm.appendChild(commentInput);
  replyElement.querySelector(".comment").textContent = "";
  commentInput.classList.add("commenttxtedit");
  replyElement.querySelector(".comment").appendChild(editForm);
  replyElement.querySelector(".comment").appendChild(submitButton);
  let simagle = document.querySelector(".commenttxtedit");
  simagle.style.height = simagle.scrollHeight - 20 + "px";
}

function deleteComment(replyId) {
  let deleteSCR = document.getElementById("deleteScreen");
  deleteSCR.style.display = "flex";

  // add event listener to "Yes" button
  let yesButton = document.getElementById("delete");
  yesButton.addEventListener("click", function () {
    let replyElement = document.getElementById(replyId);
    replyElement.classList.add("comment_remove");
    setTimeout(() => replyElement.remove(), 1000);

    deleteSCR.style.display = "none";
  });

  // add event listener to "No" button
  let noButton = document.getElementById("cancel");
  noButton.addEventListener("click", function () {
    deleteSCR.style.display = "none";
  });
}

// function replying(replyId) {
//   let reply = document.createElement("div");
//   let replyContent = document.createElement("div");
//   let userImage = document.createElement("img");
//   let userText = document.createElement("textarea");
//   let replyBTN = document.createElement("div");
//   const replyElement = document.getElementById(replyId);
//   replyElement.appendChild(reply);
//   reply.appendChild(replyBTN);
//   reply.classList.add("replying");
// }

function replying(commentID) {
  let reply = document.createElement("div");
  const replyElement = document.querySelectorAll(".data");
  const replyElement1 = document.querySelectorAll(".datas");
  let replyContent = document.createElement("div");
  let userImage = document.createElement("img");
  let userText = document.createElement("textarea");
  let replyBTN = document.createElement("img");
  replyContent.classList.add("flexer");
  userImage.src = "./images/avatars/image-juliusomo.png";
  userImage.classList.add("comentimg");
  userText.setAttribute("type", "text");
  userText.classList.add("commenttxtreply");
  replyBTN.classList.add("replyBTN");
  replyBTN.src = "./images/paper-plane-solid.svg";
  replyElement[0].insertBefore(
    replyContent,
    replyElement1[commentID - 1].nextSibling
  );
  replyContent.append(userImage, userText, replyBTN);
  const box = document.querySelectorAll(".optionclass1");
  box[commentID - 1].removeAttribute("onclick");
}

import { section, cloneCommentDiv } from "./index.js";

async function loadCommentsFromJson() {
    const result = await fetch('./data.json')
    const data = await result.json()
    displayCommentsNode(data)
}


// Function to display comments and their replies
function displayCommentsNode(data) {
    data.comments.forEach((comment, index) => {

        // Displays a comment div
        const newCommentDiv = cloneCommentDiv()
        section.append(newCommentDiv);

        //insert a div as a sibling to the comment node to house replies to the comment if peradventure there will be
        const div = document.createElement('div')
        div.classList.add('replies')
        newCommentDiv.insertAdjacentElement('afterend', div)

        // Input the correct data from data.json into the node
        inputCommentData(data, newCommentDiv, index);

        // Checks if there are replies to the comment div
        if (comment.replies.length != 0) {

            comment.replies.forEach((reply, replyIndex) => {

                //displaying a reply div
                let newReplyDiv
                if (reply.user.username === data.currentUser.username) {
                    newReplyDiv = cloneCommentDiv(true); //displays a user reply div
                } else {
                    newReplyDiv = cloneCommentDiv(); //displays an ordinary reply div
                }
                newReplyDiv.classList.add('reply-comment');

                // Insert reply data into the reply div
                inputReplyCommentData(reply, newReplyDiv, replyIndex)

                // Attaches the reply to the comment
                div.appendChild(newReplyDiv)
            });
        }
    });
}



// Function to input data into reply comment node
function inputReplyCommentData(reply, node, index) {
    const header = node.querySelector('.header');

    header.children[0].setAttribute('src', reply.user.image.png); // Changes the avatar
    header.children[1].innerText = reply.user.username; // Changes the username
    header.querySelector('.created-at').innerText = reply.createdAt; // Changes the time on comment

    node.querySelector('.body .content').innerHTML = `<b style='color: hsl(238, 40%, 52%);'>@${reply.replyingTo}</b> ${reply.content}`;// Changes the user comment

    node.querySelector('.footer .score p').innerText = reply.score; // Changes the score
}

// Function to input data into comment node
function inputCommentData(data, node, index) {
    const header = node.querySelector('.header').children;
    const commentData = data.comments[index]; // This is declared to minimize repetition

    header[0].setAttribute('src', commentData.user.image.png); // Changes the avatar
    header[1].innerText = commentData.user.username; // Changes the username
    header[2].innerText = commentData.createdAt; // Changes the time on comment

    node.querySelector('.body .content').innerText = commentData.content;// Changes the user comment

    node.querySelector('.footer .score p').innerText = commentData.score; // Changes the score
}

loadCommentsFromJson()


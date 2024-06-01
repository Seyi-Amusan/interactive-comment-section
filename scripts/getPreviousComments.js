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
        const newCommentDiv = cloneCommentDiv();
        section.append(newCommentDiv);

        // Input the correct data from data.json into the node
        inputCommentData(data, newCommentDiv, index);

        // Checks if there are replies to the comment div
        if (comment.replies.length != 0) {
            comment.replies.forEach((reply, replyIndex) => {
                console.log(reply);
                const newReplyDiv = cloneCommentDiv();
                newReplyDiv.classList.add('reply-comment');

                // Insert reply data into the reply div
                inputReplyCommentData(reply, newReplyDiv, replyIndex)

                // Adds the reply as a sibling to the comment div on the DOM
                newCommentDiv.insertAdjacentElement('afterend', newReplyDiv);
            });
        }
    });
}



// Function to input data into reply comment node
function inputReplyCommentData(reply, node, index) {
    console.log(index);
    const header = node.querySelector('.header').children;

    header[0].setAttribute('src', reply.user.image.png); // Changes the avatar
    header[1].innerText = reply.user.username; // Changes the username
    header[2].innerText = reply.createdAt; // Changes the time on comment

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


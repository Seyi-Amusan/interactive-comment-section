import { section, cloneCommentDiv } from "./index.js";

async function loadCommentsFromJson() {
    const result = await fetch('../data.json')
    const data = await result.json()
    displayComments(data)
}

// function getNewSection() {
//     loadCommentsFromJson()

//     return document.querySelector('section')

// }

function displayComments(data) {
    data.comments.forEach(comment => {
        
        //displays a comment div
        const newCommentDiv = cloneCommentDiv()
        section.append(newCommentDiv)


        //checks if there are replies to the comment div
        if (comment.replies.length != 0) {

            comment.replies.forEach(reply => {
                const newReplyDiv = cloneCommentDiv()
                newReplyDiv.classList.add('reply-comment')

                //adds the reply as a sibling to the comment div on the DOM 
                newCommentDiv.insertAdjacentElement('afterend', newReplyDiv)
            })
        }
    });
}

// getNewSection()

// export {getNewSection}

loadCommentsFromJson()


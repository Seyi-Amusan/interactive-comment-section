import { section, cloneCommentDiv } from "./index.js";

async function loadCommentsFromJson() {
    const result = await fetch('../data.json')
    const data = await result.json()
    displayCommentsNode(data)
}

let i = 1


function displayCommentsNode(data) {
    data.comments.forEach(comment => {
        
        //displays a comment div
        const newCommentDiv = cloneCommentDiv()
        section.append(newCommentDiv)

        //input the correct data from data.json into the node
        
        while (i > -1) {

            inputCommentNodeData(data, newCommentDiv, i)
            i--


        }
        


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



function inputCommentNodeData(data, node, index) {
    console.log(index);
    const header = node.querySelector('.header').children

    const commentData = data.comments[index] //this is declared to minimize repetition
    
    header[0].setAttribute('src', commentData.user.image.png) //changes the avatar
    header[1].innerText = commentData.user.username //changes the username
    header[2].innerText = commentData.createdAt //changes the time on comment

    node.querySelector('.body .content').innerText = commentData.content //changes the user comment

    node.querySelector('.footer .score p').innerText = commentData.score //changes the score


    console.log(commentData);
}

loadCommentsFromJson()


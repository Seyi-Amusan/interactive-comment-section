import { formEl, cloneCommentDiv } from "./index.js";


//a second should be enough time to generate previous comments
setTimeout(() => {

    const replyBtns = document.querySelectorAll('.reply')

    replyBtns.forEach(btn => {

        btn.addEventListener('click', () => {
            
            //grabs the username and comment user wants to reply to
            const commentToReply = btn.parentNode.parentNode
            const replyingTo = commentToReply.querySelector('.header .username').innerText

            //grabs and displays the input element to collect the user reply
            const replyForm = formEl.cloneNode(true)
            replyForm.querySelector('input').placeholder = 'Reply...'
            replyForm.querySelector('button').innerText = 'REPLY'
            commentToReply.insertAdjacentElement('afterend', replyForm)            

            const sendReplyBtn = replyForm.querySelector('button')

            //when user clicks button to send reply
            sendReplyBtn.addEventListener('click', e => {
                e.preventDefault()

                //creating the reply node
                const newCommentDiv = cloneCommentDiv(true)
                // newCommentDiv.querySelector('.body p').innerText = `@${replyingTo} ${replyForm.querySelector('input').value}` 
                newCommentDiv.querySelector('.body p').innerHTML = `<b style="color: hsl(238, 40%, 52%);">@${replyingTo}</b> ${replyForm.querySelector('input').value}`;
                newCommentDiv.querySelector('.header .created-at').innerText = 'Just now'
                newCommentDiv.classList.add('reply-comment')
                
                // displaying the reply node
                replyForm.remove()
                if (commentToReply.nextElementSibling.className === 'replies') {
                    commentToReply.nextSibling.appendChild(newCommentDiv)
                } else {
                    const div = document.createElement('div')
                    div.className = 'replies'
                    commentToReply.insertAdjacentElement('afterend', div)
                    commentToReply.nextSibling.appendChild(newCommentDiv)
                }
            })

        })
    });
}, 1000);
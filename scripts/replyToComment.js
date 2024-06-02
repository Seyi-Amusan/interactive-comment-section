import { section, formEl, cloneCommentDiv, userCommentDiv } from "./index.js";


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
            replyForm.querySelector('input').focus()
            section.insertBefore(replyForm, commentToReply.nextSibling)
            

            const sendReplyBtn = replyForm.querySelector('button')

            //when user clicks button to send reply
            sendReplyBtn.addEventListener('click', e => {
                e.preventDefault()

                //creating the reply node
                const newCommentDiv = cloneCommentDiv(true)
                newCommentDiv.querySelector('.body p').innerText = `@${replyingTo} ${replyForm.querySelector('input').value}` 
                newCommentDiv.querySelector('.header .created-at').innerText = 'Just now'
                newCommentDiv.classList.add('reply-comment')
                
                // replyForm.replaceWith(newCommentDiv)
                replyForm.remove()
                commentToReply.nextSibling.appendChild(newCommentDiv)
            })

        })
    });
}, 1000);
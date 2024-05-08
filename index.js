const commentBox = document.querySelector('.comment')
const section = document.querySelector('section')
const input = document.querySelector('input')
const userCommentNode = document.querySelector('.user-comment')
const userAvatarInForm = document.querySelector('.new-comment img')
const userAvatarInComment = document.querySelector('.avatar')
const username = document.querySelector('.user.username')
const addCommentBtn = document.querySelector('.add-comment-btn')
const plus = document.querySelector('.plus')
const minus = document.querySelector('.minus')
const score = document.querySelector('.score p')
let deleteCommentBtn




let userCommentsArr = []

let i = 0


fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {

        /**Input current user avatar and name */
        userAvatarInForm.setAttribute('src', json.currentUser.image.png)
        userAvatarInComment.setAttribute('src', json.currentUser.image.png)
        username.innerText = json.currentUser.username


        /**Duplicate the comment node to show all comments in data.json */
        for (i; i < json.comments.length; i++) {
            let clonedNode = commentBox.cloneNode(true);
            section.appendChild(clonedNode)
            clonedNode.style.display = 'grid'


            /**Handling the replies to a comment immediately after it has been duplicated */
            if (json.comments[i].replies.length === 0) {
                continue
            } else {
                for (let index = 0; index < json.comments[i].replies.length; index++) {
                    let clonedReplyNode = commentBox.cloneNode(true);
                    Object.values(section.children)[index].insertAdjacentElement('afterend', clonedReplyNode);
                    clonedReplyNode.style.display = 'grid'
                }
               
            }
        }

        function handleUserReply(commentToReply, userReply) {
            let clonedNode = userCommentNode.cloneNode(true);
            clonedNode.classList.add('reply-comment')
            clonedNode.querySelector('.body .content').innerText = userReply
            commentToReply.insertAdjacentElement('afterend', clonedNode)
            clonedNode.style.display = 'grid'
        }
    

        const replyBtns = Object.values(document.getElementsByClassName('reply'))

        let c = 0 /**c is declared to know which comment user wants to reply to*/
        for (const replyBtn of replyBtns) {
            replyBtn.addEventListener('click', e => {

                c = replyBtns.indexOf(replyBtn)

                if (e.target.tagName === "IMG" || e.target.tagName === 'P') {
                    addCommentBtn.innerText = 'REPLY'
                    scrollToInput()
                }

            })


        }

        let editCommentBtns

        let d = 0
        function handleCommentEdit() {
            Object.values(section.querySelectorAll('.user-comment .body .content'))[d].innerText = input.value;
        }


        
        

        addCommentBtn.addEventListener('click', e => {
            e.preventDefault()
            switch (addCommentBtn.innerText) {

                case 'SEND':
                    addComment()
                    editCommentBtns = Object.values(document.getElementsByClassName('edit'))

                    /**We can now make use of the editCommentBtns variable */
                    for (const editBtn of editCommentBtns) {
                        editBtn.addEventListener('click', e => {
            
                            d = editCommentBtns.indexOf(editBtn)
            
                            if (e.target.tagName === 'IMG' || e.target.tagName === 'P') {
                                addCommentBtn.innerText = 'EDIT'
                                scrollToInput()
                            }
                        })
                    }
                    break;
                
                case 'EDIT':
                    handleCommentEdit()
                    input.value = ''
                    break;
                
                case 'REPLY':
                    handleUserReply(section.getElementsByClassName('comment')[c], input.value)
                    editCommentBtns = Object.values(document.getElementsByClassName('edit'))

                    break;
            }

            

            addCommentBtn.innerText = 'SEND'

            /**if user wishes to delete a newly added comment */
            deleteComment()
            
        })


        

    });



function addComment() {
    let userComment = userCommentNode.cloneNode(true);
    userCommentsArr.push(userComment)
    section.appendChild(userComment)
    userComment.querySelector('.body .content').innerText = input.value
    input.value = ''
    userComment.querySelector('.header .created-at').innerText = 'Just now'
    userComment.style.display = 'grid'
}

    
function deleteComment() {
    deleteCommentBtn = Object.values(document.getElementsByClassName('delete'))
    for (const deleteBtn of deleteCommentBtn) {
        deleteBtn.addEventListener('click', (e) => {
        
            if (e.target.tagName === 'IMG' || e.target.tagName === "P") {
                const c = deleteCommentBtn.indexOf(deleteBtn); /**c is declared to know on which comment the delele icon ia clicked */
                section.getElementsByClassName('user-comment')[c].remove();
            }
            
        })
        
    }
}

deleteComment()

function scrollToInput() {
    input.scrollIntoView({
        behavior: 'smooth'
    });
    input.focus()
}









import { addCommentBtn, cloneCommentDiv, inputEl, section } from "./index.js";


addCommentBtn.addEventListener('click', e => {
    e.preventDefault()
    
    const newCommentDiv = cloneCommentDiv(true)

    //makes the comment div the user comment div
    newCommentDiv.classList.remove('comment')
    newCommentDiv.classList.add('user-comment')
    newCommentDiv.style.display = 'grid'

    //input the user comment
    newCommentDiv.querySelector('.body .content').innerText = inputEl.value
    newCommentDiv.querySelector('.header .created-at').innerText = 'Just now'
    
    section.append(newCommentDiv)
    inputEl.value = ''
})



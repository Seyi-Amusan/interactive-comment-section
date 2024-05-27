export const commentDiv = document.querySelector('.comment')
export const userCommentDiv = document.querySelector('.user-comment')
export const section = document.querySelector('section')
export const addCommentBtn = document.querySelector('.add-comment-btn')
export const inputEl = document.querySelector('input')


export function cloneCommentDiv(user) {
    let newCommentDiv

    //check whether to clone a regular or user comment node
    if (user) {
        newCommentDiv = userCommentDiv.cloneNode(true)
    } else {
        newCommentDiv = commentDiv.cloneNode(true)
    }

    newCommentDiv.style.display = 'block'
    return newCommentDiv
}



//to get the edit and delete buttons of newly added comments

let btns

export function initBtns(addCommentBtn) {
    addCommentBtn.addEventListener('click', () => {
        btns = document.querySelectorAll('.delete-edit')
        const event = new CustomEvent('deleteBtnsSet', { detail: btns })
        addCommentBtn.dispatchEvent(event)
    })
}

export function onDeleteBtnsSet(callback) {
    addCommentBtn.addEventListener('deleteBtnsSet', (event) => {
        callback(event.detail);
    });
}

export function getDeleteBtns(btns) {
    return btns
}

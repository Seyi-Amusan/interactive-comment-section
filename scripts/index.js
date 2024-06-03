export const commentDiv = document.querySelector('.comment')
export const userCommentDiv = document.querySelector('.user-comment')
export const section = document.querySelector('section')
export const addCommentBtn = document.querySelector('.add-comment-btn')
export const inputEl = document.querySelector('input')
export const formEl = document.querySelector('form')
export const modal = document.querySelector('.modal-bg')
export const cancelDelete = document.querySelector('.cancel-delete')
export const confirmDelete = document.querySelector('.confirm-delete')



//clones a comment node
export function cloneCommentDiv(user) {
    let newCommentDiv

    //check whether to clone a regular or user comment node
    if (user) {
        newCommentDiv = userCommentDiv.cloneNode(true)
    } else {
        newCommentDiv = commentDiv.cloneNode(true)
    }

    newCommentDiv.style.display = 'grid'
    return newCommentDiv
}



//gets the edit and delete buttons of newly added comments because the process is asynchronous

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

//score voting....
//a second should be enough to update dom in order to store appropriate values into variables
setTimeout(() => {
    const score = document.querySelectorAll('.score p')
    const upVoteBtns = document.querySelectorAll('.plus')
    const downVoteBtns = document.querySelectorAll('.minus')

    let upvoted

    upVoteBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (upvoted) {
                return
            }
            score[index].innerText++;
            upvoted = true
        })
    });

    downVoteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            score.innerText--;
        })
    });
}, 1000);

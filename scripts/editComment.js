import { onDeleteBtnsSet, initBtns, getDeleteBtns, addCommentBtn, formEl, section } from "./index.js";



onDeleteBtnsSet(btns => {
    //get edit btns on the dom
    const editBtns = getDeleteBtns(btns);

    editBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            if (e.target.closest('.edit')) {
                //gets the comment node user wants to edit
                const commentToEdit = btn.parentNode.parentNode
                
                const editForm = formEl.cloneNode(true)

                const input = editForm.querySelector('input')

                input.placeholder = 'Edit comment...'
                editForm.querySelector('button').innerText = 'EDIT'
                section.insertBefore(editForm, commentToEdit.nextSibling)

                //when user clicks on the button to send the edited comment message
                editForm.querySelector('button').addEventListener('click', e => {
                    e.preventDefault()

                    editForm.remove()
                    commentToEdit.querySelector('.body .content').innerText = input.value //applying the edit
                })

            }
            return
        })
    });
})

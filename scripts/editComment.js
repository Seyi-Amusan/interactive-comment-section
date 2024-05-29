import { onDeleteBtnsSet, initBtns, getDeleteBtns, addCommentBtn, formEl, section } from "./index.js";


onDeleteBtnsSet(btns => {
    const editBtns = getDeleteBtns(btns);

    editBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            if (e.target.closest('.edit')) {
                const commentToEdit = btn.parentNode.parentNode
                
                const editForm = formEl

                editForm.querySelector('input').placeholder = 'Edit comment...'
                editForm.querySelector('button').innerText = 'EDIT'
                editForm.querySelector('input').focus()
                section.insertBefore(editForm, commentToEdit.nextSibling)
            }
            return
        })
    });
})



initBtns(addCommentBtn)
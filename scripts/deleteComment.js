import { onDeleteBtnsSet, initBtns, getDeleteBtns, addCommentBtn, modal, cancelDelete, confirmDelete } from "./index.js";


onDeleteBtnsSet(btns => {
    const deleteBtns = getDeleteBtns(btns);

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            if (e.target.closest('.delete')) {

                //modal to confirm deletion of comment
                modal.style.top = `${window.scrollY}px` //displays the modal at the scroll position of the user
                modal.style.display = 'block'

                cancelDelete.addEventListener('click', () => {
                    modal.style.display = 'none'
                })

                confirmDelete.addEventListener('click', () => {
                    btn.parentNode.parentNode.remove()
                    modal.style.display = 'none'
                })
                
            }
            return
        })
    });
})



initBtns(addCommentBtn)
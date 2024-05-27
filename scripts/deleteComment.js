import { onDeleteBtnsSet, initBtns, getDeleteBtns, addCommentBtn } from "./index.js";


onDeleteBtnsSet(btns => {
    const deleteBtns = getDeleteBtns(btns);

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            if (e.target.closest('.delete')) {
                btn.parentNode.parentNode.remove()
            }
            return
        })
    });
})



initBtns(addCommentBtn)
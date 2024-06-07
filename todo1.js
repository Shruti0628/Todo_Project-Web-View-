const todoPlaceholder = document.querySelector(".placeholder");
const todoInput = document.querySelector(".placeholder input[type='text']");
const todoList = document.querySelector(".todo-options");

todoPlaceholder.addEventListener("click", (event) => {
    if (event.target.matches(".iconify[data-icon='ei:plus']")) {
        event.preventDefault();
        const newTodoText = todoInput.value;
        if (newTodoText.trim() !== "") {
            const newLi = document.createElement("li");
            newLi.classList.add("task");
            const uniqueId = `task${Date.now()}`; // Generate a unique ID
            const newLiInnerHTML = `
                <div class="placeholder">
                    <div class="circle-icon">
                        <input type="checkbox" id="${uniqueId}">
                        <label for="${uniqueId}"></label>
                    </div>
                    <input type="text" value="${newTodoText}" readonly>
                    <div class="placeholder-icons">
                        <span class="icon iconify edit-icon" data-icon="material-symbols-light:edit-outline"></span>
                        <span class="icon iconify delete-icon" data-icon="material-symbols-light:delete-outline"></span>
                    </div>
                </div>
            `;
            newLi.innerHTML = newLiInnerHTML;
            todoList.append(newLi);
            todoInput.value = "";
        }
    }
});

todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
        // e.target.parentElement.parentElement.remove();
        const targetedLi = e.target.closest("li");
        const inputField = targetedLi.querySelector("input[type = 'text']");
        inputField.style.textDecoration = "line-through";
        setTimeout(()=>{
            targetedLi.remove();
        },500)
     
    }
    
    if (e.target.classList.contains("edit-icon")) {
        const inputField = e.target.closest(".placeholder").querySelector("input[type='text']");
        inputField.removeAttribute("readonly");
        inputField.focus();
        
        inputField.addEventListener("blur", () => {
            inputField.setAttribute("readonly", true);
        });
        
        inputField.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                inputField.setAttribute("readonly", true);
            }
        });
    }
});


todoList.addEventListener("change",(e)=>{
    if(e.target.type === 'checkbox' && e.target.checked){
        alert("Yeah! Successful Completion of the task🎉");
        e.target.closest("li").remove();
    }
});



const textField = document.querySelector('#inputValue');
const submitBtn = document.querySelector('#submitBtn');
const todoContainer = document.querySelector('#todoContainer');
const clearAllBtn = document.querySelector('#clearAllBtn')

let deleteTable = document.getElementsByClassName('delete');

let todoData;


submitBtn.addEventListener('click', ()=>{
    displayText(textField.value);

    if(textField.value === ''){
        return;
    }
    todoData = { todo: textField.value };



    fetch('http://localhost:3555/post', {
        method: 'POST',
        body: JSON.stringify(todoData),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.text())
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error));

    textField.value = '';
})


function displayText(inputValue, inputKey){
    let todoBox = document.createElement('div');
    todoBox.className = 'flex justify-between w-full gap-2';

    let textBox = document.createElement('p');
    textBox.className = 'border py-1.5 px-3 w-full rounded border-gray-500 text-gray-800';
    textBox.textContent = inputValue;

    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'px-3 text-white bg-gray-600 rounded delete cursor-pointer';
    deleteBtn.textContent = 'X';

    todoBox.setAttribute('dataKey', inputKey)





    todoBox.appendChild(textBox)
    todoBox.appendChild(deleteBtn);

    todoContainer.appendChild(todoBox);

}




function displayTodos(){
    fetch('http://localhost:3333/todos')
        .then(response => response.json())
        .then(data => {
            data.forEach(e => {
                displayText(e.id, e.id)
            });
            deleteData();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

displayTodos();



function deleteData(){
    for (const deleteBtn of deleteTable) {
        deleteBtn.addEventListener('click',()=>{
            fetch('http://localhost:3333/todos')
                .then(response => response.json())
                .then(data => {
                    data.forEach(e => {
                        if (e.id == deleteBtn.parentElement.getAttribute('dataKey')){
    
                            let deleteData = { todo: e.id };

                            console.log(deleteData)

                            fetch('http://localhost:3444/delete', {
                                method: 'POST',
                                body: JSON.stringify(deleteData),
                                headers: { 'Content-Type': 'application/json' }
                            })
                                .then(res => res.text())
                                .then(response => console.log('Data Deleted:', response))
                                .catch(error => console.error('Error:', error));

                                deleteBtn.parentElement.remove()
                       }
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
    }
}

deleteData();

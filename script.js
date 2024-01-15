//sub nav on/off:
const fileMenu = document.getElementById("fileMenu");
const fileMenuSibClassList = fileMenu.nextElementSibling.classList;
const editMenu = document.getElementById("editMenu");
const editMenuSibClassList = editMenu.nextElementSibling.classList;
const tools = document.getElementsByClassName('toolBoxItem');
fileMenu.addEventListener('click', function () {
    this.classList.toggle('active');
    if (editMenuSibClassList.contains('show')) {
        editMenuSibClassList.remove('show');
        editMenu.classList.remove('active');
        fileMenuSibClassList.toggle('show');
    } else {
        fileMenuSibClassList.toggle('show');
    }
});
editMenu.addEventListener('click', function () {
    this.classList.toggle('active');
    if (fileMenuSibClassList.contains('show')) {
        fileMenuSibClassList.remove('show');
        fileMenu.classList.remove('active');
        editMenuSibClassList.toggle('show');
    } else {
        editMenuSibClassList.toggle('show');
    }
});

//test
// const testLink = document.getElementById('testLink');
// testLink.addEventListener('click', function () {
//     createTextInputUnderEl();
// })


//workArea listens to element dropped:
const workArea = document.getElementById('workArea');
workArea.addEventListener('dragover', function (e) {
    e.preventDefault();
})
//letting items in the toolbox to be dragged and dropped
for (const tool of tools) {
    tool.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text', event.target.id);
    });
}

function createTextInputUnderEl(element) {
    let workAreaElements = workArea.querySelectorAll('*');
    console.log('workAreaElements', workAreaElements);
    workAreaElements.forEach(element => {
        element.addEventListener('click', function (event) {
            let child = this.querySelectorAll('span');
            element.classList.toggle('editing');
            if (child.length > 0) {
                child[0].parentNode.replaceChild(editTextSpan, child[0]);
                child[0].classList.toggle('hidden');
                if (child[0].classList.contains('hidden')) {
                    console.warn('class hidden found on' + child[0]);
                    // child[0].classList.remove('hidden');
                    // child[0].classList.add('show');
                }
            }
        })
        let editTextSpan = document.createElement('span');
        let editTextInput = document.createElement('input');
        let editTextArea = document.createElement('textarea');
        let submitChange = document.createElement('button');
        editTextInput.type = 'text';
        editTextInput.value = element.textContent;
        editTextSpan.appendChild(editTextInput);
        editTextSpan.classList.add('editText', 'hidden');
        submitChange.textContent = 'Save';
        submitChange.classList.add('submitChange');
        editTextSpan.appendChild(submitChange);
        //check if span exists under this element:
        let child = element.querySelectorAll('span');
        if (child.length > 0) {
            child[0].parentNode.replaceChild(editTextSpan, child[0]);
        } else {
            element.appendChild(editTextSpan);
            // editTextSpan.classList.toggle('hidden');
            // editTextSpan.classList.toggle('show');
        }
        return;
    })
}

function createWorkAreaElement(elemID) {
    let el = document.createElement(elemID);
    el.textContent = `This is ${elemID}`;
    workArea.appendChild(el);
    createTextInputUnderEl(elemID);
    // el.addEventListener('click', function (event) {
    //     // event.preventDefault();
    //     createTextInputUnderEl(elemID);
    // })
}

workArea.addEventListener('drop', function (event) {
    event.preventDefault();
    let workElements = this.querySelectorAll('*');
    workElements.forEach(element => {
        element.addEventListener('click', function (event) {
            console.log('click on', event.target.id);
        });
    });
    if (this.textContent === 'This is the work area') {
        this.textContent = '';
    }
    let elemID = event.dataTransfer.getData('text');
    if (elemID === 'h1' || elemID === 'div' || elemID === 'span' || elemID === 'form' || elemID === 'p' || elemID === 'strong' || elemID === 'ul' || elemID === 'li' || elemID === 'img' || elemID === 'a') {
        createWorkAreaElement(elemID);
    }
})
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
        //clicking on element shows text box:
        element.addEventListener('click', function (event) {
            if (event.target.closest('input[type="text"]')) { return } //exclud text input from triggering class cange
            let child = this.querySelectorAll('span');
            element.classList.toggle('editing');
            if (child.length > 0) {
                child[0].parentNode.replaceChild(editTextSpan, child[0]);
                child[0].classList.toggle('hidden');
            } else {
                element.appendChild(editTextSpan);
                child[0].classList.toggle('hidden');
            }
            return;
        })
        var randNum = ('10000' + Math.floor(Math.random() * 10000)).slice(1);
        let editTextSpan = document.createElement('span');
        let editTextInput = document.createElement('input');
        let editTextArea = document.createElement('textarea');
        let submitChange = document.createElement('button');
        editTextInput.type = 'text';
        editTextInput.value = element.textContent;
        editTextInput.id = `textInput_${randNum}`;
        editTextSpan.appendChild(editTextInput);
        editTextSpan.classList.add('editText', 'hidden');
        submitChange.textContent = 'Save';
        submitChange.classList.add('submitChange');
        submitChange.id = `saveChange_${randNum}`;
        editTextSpan.appendChild(submitChange);
        //check if span exists under this element:
        let child = element.querySelectorAll('span');
        if (child.length > 0) {
            child[0].parentNode.replaceChild(editTextSpan, child[0]);
        } else {
            element.appendChild(editTextSpan);
        }
        submitChange.addEventListener('click', function (event) {
            element.textContent = editTextInput.value;
            console.log('child: ', child);
            //child.classList.add('hidden');
        })
        return;

    })
}

function createWorkAreaElement(elemID) {
    let el = document.createElement(elemID);
    if (el === 'img') {
        el.src = 'https://picsum.photos/200/300';

    } else {
        el.textContent = `This is ${elemID}`;
    }

    workArea.appendChild(el);
    createTextInputUnderEl(elemID);
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
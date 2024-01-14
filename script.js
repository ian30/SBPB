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
const testLink = document.getElementById('testLink');
testLink.addEventListener('click', function () {
    createTextInputUnderEl();
})


//handling elements drag:
const workArea = document.getElementById('workArea');
workArea.addEventListener('dragover', function (e) {
    e.preventDefault();
})

for (const tool of tools) {
    tool.addEventListener('dragstart', function (event) {
        //console.log(event.target.id);
        event.dataTransfer.setData('text', event.target.id);
    });
}
let workElements = document.querySelectorAll('#workArea *');
setTimeout(function () {
    workElements = document.querySelectorAll('#workArea *');
    console.log('workElements: ', workElements);
}, 12000)

workElements.forEach(element => {
    element.addEventListener('click', function (event) {
        console.log('click on', event.target.id);
    });
});
function createTextInputUnderEl(element) {
    let workAreaElements = workArea.querySelectorAll('*');
    workAreaElements.forEach(element => {
        let editTextSpan = document.createElement('span');
        let editTextInput = document.createElement('input');
        editTextInput.type = 'text';
        editTextSpan.appendChild(editTextInput);
        editTextSpan.classList.add('editText', 'hidden');
        element.appendChild(editTextSpan);
        return;
    })
}

workArea.addEventListener('drop', function (event) {
    event.preventDefault();

    if (this.textContent === 'This is the work area') {
        this.textContent = '';
    }
    let elemID = event.dataTransfer.getData('text');
    if (elemID === 'h1') {
        let element = document.createElement('h1');
        element.textContent = 'This is H1 Heading';
        this.appendChild(element);
        createTextInputUnderEl();
    } else if (elemID === 'div') {
        const element = document.createElement('div');
        element.textContent = 'This is a Div element';
        this.appendChild(element);
        createTextInputUnderEl();
    } else if (elemID === 'span') {
        const element = document.createElement('span');
        element.textContent = 'This is a Span element';
        this.appendChild(element);
        createTextInputUnderEl();
    } else if (elemID === 'form') {
        const element = document.createElement('form');
        element.textContent = 'This is a Form element';
        this.appendChild(element);
        createTextInputUnderEl();
    } else if (elemID === 'p') {
        const element = document.createElement('p');
        element.textContent = 'This is a P element';
        this.appendChild(element);
        createTextInputUnderEl();
    } else if (elemID === 'strong') {
        const element = document.createElement('strong');
        element.textContent = 'This is a Strong element';
        this.appendChild(element);
        createTextInputUnderEl();
    } else if (elemID === 'ul') {
        const element = document.createElement('ul');
        element.textContent = 'This is a UL element';
        this.appendChild(element);
        createTextInputUnderEl();
    } else if (elemID === 'li') {
        const element = document.createElement('li');
        element.textContent = 'This is a LI element';
        this.appendChild(element);
        createTextInputUnderEl();
    } else if (elemID === 'img') {
        const element = document.createElement('img');
        element.src = 'https://picsum.photos/200/300';
        element.alt = 'This is an IMG element';
        element.textContent = 'This is an IMG element';
        this.appendChild(element);
        createTextInputUnderEl();
    }
})
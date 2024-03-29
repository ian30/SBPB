//sub nav on/off:
const fileMenu = document.getElementById("fileMenu");
const fileMenuSibClassList = fileMenu.nextElementSibling.classList;
const editMenu = document.getElementById("editMenu");
const editMenuSibClassList = editMenu.nextElementSibling.classList;
const tools = document.getElementsByClassName('toolBoxItem');
function generateRandomID() {
    return ('100' + Math.floor(Math.random() * 100)).slice(1);
}
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
//workArea listens to element dropped:
const workArea = document.getElementById('workArea');
workArea.addEventListener('dragover', function (e) {
    e.preventDefault();
});
//letting items in the toolbox to be dragged and dropped
for (const tool of tools) {
    tool.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text', event.target.id);
    });
}

function createTextInputUnderEl(element) {
    let workAreaElements = workArea.querySelectorAll('*');
    workAreaElements.forEach(element => {
        //all other elements that are textual, show text box:
        element.addEventListener('click', function (event) {
            if (event.target.closest('input[type="text"]')) { return } //exclud text input from triggering class change
            let child = this.querySelectorAll('span');
            if (this.classList.contains('editing')) {
                this.classList.toggle('editing');
            } else {
                this.classList.add('editing');
            }

            if (child.length > 0) {
                child[0].parentNode.replaceChild(editTextSpan, child[0]);
                child[0].classList.toggle('hidden');
            } else {
                element.appendChild(editTextSpan);
            }
            return;
        });


        let editTextSpan = document.createElement('span');
        let editTextInput = document.createElement('input');
        let editTextArea = document.createElement('textarea');
        let submitChange = document.createElement('button');
        let deleteEl = document.createElement('button');
        editTextInput.type = 'text';
        editTextInput.value = element.textContent;
        editTextInput.id = `textInput_${generateRandomID()}`;
        editTextSpan.appendChild(editTextInput);
        editTextSpan.classList.add('editText', 'hidden');
        submitChange.textContent = 'Save';
        submitChange.classList.add('submitChange', 'button');
        submitChange.id = `saveChange_${generateRandomID()}`;
        deleteEl.textContent = 'Remove';
        deleteEl.classList.add('deleteEl', 'button');
        editTextSpan.appendChild(submitChange);
        editTextSpan.appendChild(deleteEl);
        //check if span exists under this element:
        let child = element.querySelectorAll('span');
        if (child.length > 0) {
            child[0].parentNode.replaceChild(editTextSpan, child[0]);
        } else {
            element.appendChild(editTextSpan);
        }
        submitChange.addEventListener('click', function (event) {
            this.parentNode.classList.toggle('hidden');
            element.textContent = editTextInput.value;
            console.log('child: ', child);
        });
        deleteEl.addEventListener('click', function (event) {
            element.parentNode.removeChild(element);
        });
        return;
    })
}
function createWorkAreaElement(elemID) {
    let el = document.createElement(elemID);
    el.draggable = 'true';
    el.classList.add('posRelative');
    if (elemID === 'img') {
        let wrapperSpan = document.createElement('span');
        wrapperSpan.classList.add('imgContainer');
        el.src = 'https://picsum.photos/400/400';
        el.alt = 'sample image';
        wrapperSpan.appendChild(el);
        workArea.appendChild(wrapperSpan);
    } else if (elemID === 'p') {
        el.textContent = 'Phasellus scelerisque metus mattis lorem egestas egestas. Vestibulum pretium erat et ex tempus, nec aliquam nisi bibendum. Curabitur blandit feugiat scelerisque. ';
        workArea.appendChild(el);
        createTextInputUnderEl(elemID);
    } else if (elemID === 'hr') {
        el.textContent = '';
        workArea.appendChild(el);
        createTextInputUnderEl(elemID);
    } else if (elemID === 'form') {
        let formMarkup = `
            <form action="">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter name">
                </div>  
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
                </div>
                <div class="tx-center">
                    <button type="submit" class="button bg-primary">Submit</button>
                </div>
            </form>
        `;
        el.innerHTML = formMarkup;
        workArea.appendChild(el);
    } else {

        el.textContent = `This is a ${elemID}, click on it to edit.`;
        workArea.appendChild(el);
        createTextInputUnderEl(elemID);
    }
}
workArea.addEventListener('drop', function (event) {
    event.preventDefault();
    let workElements = this.querySelectorAll('*');
    workElements.forEach(element => {
        element.addEventListener('click', function (event) {

        });
    });
    if (this.textContent === 'This is the work area') {
        this.textContent = '';
    }
    let elemID = event.dataTransfer.getData('text');
    if (elemID === 'h1' || elemID === 'h2' || elemID === 'h3' || elemID === 'h4' || elemID === 'h5' || elemID === 'h6' || elemID === 'div' || elemID === 'span' || elemID === 'form' || elemID === 'p' || elemID === 'strong' || elemID === 'ul' || elemID === 'li' || elemID === 'a' || elemID === 'img' || elemID === 'hr' || elemID === 'a' || elemID === '20px') { createWorkAreaElement(elemID); }
})
//new file/clear:
const newFileTrig = document.getElementById('fileMenu_new');
newFileTrig.addEventListener('click', function (event) {
    //check if workArea has any elements: 
    let workAreaElements = workArea.querySelectorAll('*');
    fileMenuSibClassList.toggle('show');//closing nav dropdown
    fileMenu.classList.remove('active');
    if (workAreaElements.length > 0) {
        let confirm = window.confirm(`work area contains at least 1 element. Are you sure you want to create new file?`)
        if (confirm === false) {
            return false;
        } else {
            workArea.innerHTML = '';
        }
    }
})
//open/close page settings:
const dismissSettingsEl = document.getElementById('dismissSettings');
const pageSettingsEl = document.getElementById('pageSettings');
const openSettingsBtn = document.getElementById('settingsMenu');
openSettingsBtn.addEventListener('click', function () {
    if (!helpEl.classList.contains('hidden')) {
        helpEl.classList.add('hidden');
        pageSettingsEl.classList.toggle('hidden');
    } else {
        pageSettingsEl.classList.toggle('hidden');
    }
    const customCssTextAreaEl = document.getElementById('customCSS');
    let customCssLabel = customCssTextAreaEl.previousElementSibling;
    let customCSSElHeight = customCssTextAreaEl.offsetHeight;
    customCssLabel.style.height = customCSSElHeight + 'px';
});
//opep/close help:
const helpEl = document.getElementById('help');
const openHelpBtn = document.getElementById('helpMenu');
openHelpBtn.addEventListener('click', function () {
    if (!pageSettingsEl.classList.contains('hidden')) {
        pageSettingsEl.classList.add('hidden');
        helpEl.classList.toggle('hidden');
    } else {
        helpEl.classList.toggle('hidden');
    }
});

//save page settings: (PS = Page Settings)
const savePageSettingsBtn = document.getElementById('savePageSettings');
let PSpageTitle;
let PSfontFamily
let PScustomCSS;
let PSwrapperTag;
let PSwrapperId;
let PSwrapperClass;
savePageSettingsBtn.addEventListener('click', function () {
    PSpageTitle = document.getElementById('pageTitle').value;
    PSfontFamily = document.getElementById('fontFamily').value;
    PScustomCSS = document.getElementById('customCSS').value;
    PSwrapperTag = document.getElementById('wrapperElementTag').value;
    PSwrapperId = document.getElementById('wrapperElementId').value;
    PSwrapperClass = document.getElementById('wrapperElementClass').value;
    pageSettingsEl.classList.add('hidden');
});
//save file:
function gatherContent() {
    const workArea = document.getElementById('workArea');
    const workAreaEls = workArea.querySelectorAll('*');
    workAreaEls.forEach(el => {
        el.classList.remove('editing');//remove editing class before export
    });
    let content = workArea.innerHTML;
    let editSpans = workArea.querySelectorAll('.editText');//select all the edit spans we don't want to export.
    editSpans.forEach(span => {
        content = content.replace(span.outerHTML, "");//remove all edit spans and their children:
    });
    let htmlStart = `
        <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>body {font-family: ${PSfontFamily};\n${PScustomCSS}}</style>
                    <title>${PSpageTitle}</title>
                </head>
                <body><${PSwrapperTag} id="${PSwrapperId}" class="${PSwrapperClass}">
        `;
    let htmlEnd = `</${PSwrapperTag}></body></html>`;
    return htmlStart + content + htmlEnd;
}
let previousBlobUrl = null;
function saveFile(filename, type) {
    let downloadLink = document.getElementById('fileMenu_save');
    downloadLink.addEventListener('click', function (event) {
        event.preventDefault();
        fileMenu.classList.remove('active');
        fileMenuSibClassList.toggle('show');//closing navigation dropdown
        if (previousBlobUrl) window.URL.revokeObjectURL(previousBlobUrl);// Revoke the previous Blob URL
        let data = gatherContent();// Get the latest content from 'workArea'

        let file = new Blob([data], { type: type });// Create a Blob from the data
        previousBlobUrl = URL.createObjectURL(file);
        downloadLink.href = previousBlobUrl;
        downloadLink.download = filename;
        downloadLink.click();
        // Wait for the download to start, then revoke the URL
        setTimeout(function () {
            window.URL.revokeObjectURL(previousBlobUrl);
        }, 1000000);
    }, { once: true });
}
saveFile(`file_${generateRandomID()}.html`, "text/html");

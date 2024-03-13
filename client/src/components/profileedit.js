const { reqUser } = require("../utils/requser.js");
const { fetchProfileKey } = require("../utils/fetchprofiledata.js");

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('prof-edit-button')) {
        //get editable elements in an array
        const superParent = event.target.parentNode.parentNode;
        const siblings = Array.from(superParent.parentNode.children).filter(child => child !== superParent);
        //execute function
        //focus on first element
        //add submit functionality
        siblings.forEach((element, index) => {
            makeEditable(element, index);
            if (element.tagName != 'IMG') {
                element.addEventListener(('keydown'), (event) => editSubmit(siblings, index, event));
                element.addEventListener(('blur'), (event) => editSubmit(siblings, index, event));  
            }
        });
        siblings[0].focus();
    }
});

function makeEditable(element) {
    if (element.tagName === 'IMG') {
        getPFP();
    } else {
        //change content editable
        const isEditable = JSON.parse(element.getAttribute('contenteditable'));
        element.setAttribute('contenteditable', !isEditable);
    }
}

function editSubmit(elements, index, event) {
     if (event.key === 'Enter' || event.type === 'blur') {
        if (event.target.getAttribute('contenteditable') === 'true') {
            event.preventDefault();
            event.target.setAttribute('contenteditable', 'false');
            //edit behavior
            var type = 'bio';
            if (index == 0) {
                type = 'full_name';
            }
            updateText(type, event.target.textContent);
            //next element
            elements[(index+1) % elements.length].focus();
        }
    }
}

function updateText(type, text) {
    const formData = new FormData();
    username = reqUser();
    formData.append('username', username);
    formData.append('type', type);
    formData.append('text', text);
    fetch('http://localhost:3000/api/profiles/set', {
        method: 'POST',
        body: formData,
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.json();
    }).then((body) => {
        if (body) {
            //nothing?
        } else {
            //text too long, characters not welcome, etc
        }
    }).catch((error) => {
        console.error('Error uploading video: ', error);
        //display that user doesn't exist? Don't allow redirect?
    });
}

function getPFP() {
    const pfpUpload = document.getElementById('pfpUpload');
    pfpUpload.click();
    pfpUpload.removeEventListener('change', pfpUploadListener);
    pfpUpload.addEventListener('change', pfpUploadListener);
}

function pfpUploadListener(event) {
    const newPFP = event.target.files[0];
    if (newPFP) {
        updatePFP(newPFP);
    }
}

async function updatePFP(imgInput) {
    //get upload data
    const formData = new FormData();
    pfpKey = await fetchProfileKey(reqUser());
    formData.append('pfpKey', pfpKey);
    formData.append('imageFile', imgInput, imgInput.name);
    //send upload to back end
    fetch('http://localhost:3000/api/upload/pfp', {
        method: 'POST',
        body: formData,
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        return response.json();
    }).then((body) => {
        if (body) {
            const currentPFP = document.getElementById('profPFP');
            currentPFP.src = body;
        } else {
            //picture too large or bad extension
        }
    }).catch((error) => {
        console.error('Error uploading video: ', error);
        //display that user doesn't exist? Don't allow redirect?
    });
}
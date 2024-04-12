const { fetchProfileKey } = require("../utils/fetchprofiledata.js");
const { reqUser } = require("../utils/fetchusername.js");

//when page is fully loaded, load edit buttons if user is logged in
document.addEventListener('profPageOnloadComplete', async (event) => {
    const elements = Array.from(document.getElementsByClassName('prof-edit-button'));
    username = await reqUser();
    if(username === document.getElementById('profPageUsername').textContent) {
        elements.forEach((element) => {
            element.style.display = "block";
        })
    }
})

//check for button clicks to edit buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('prof-edit-button')) {
        //get editable elements in an array
        const superParent = event.target.parentNode.parentNode;
        const siblings = Array.from(superParent.parentNode.children).filter(child => child !== superParent);
        //add submit functionality
        siblings.forEach((element, index) => {
            makeEditable(element, index);
            //image behavior is handled differently
            if (element.tagName != 'IMG') {
                var type = 'full_name';
                if (event.target.classList.contains('description-edit')) {
                    type = 'bio';
                }
                //submit on submit key
                element.addEventListener(('keydown'), (event) => editSubmit(siblings, index, event, type));
                //submit on unselected
                element.addEventListener(('blur'), (event) => editSubmit(siblings, index, event, type));  
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

//submit edits
function editSubmit(elements, index, event, type) {
     if ((event.key === 'Enter' || event.type === 'blur')) {
        if (event.target.getAttribute('contenteditable') === 'true') {
            event.preventDefault();
            event.target.setAttribute('contenteditable', 'false');
            //edit behavior
            if (elements[index].tagName === 'VIDEO' && event.type != 'blur') {
                //video behavior
                getVideo(elements[index]);
            } else if (elements[index].tagName != 'VIDEO') {
                //text behavior
                updateText(type, event.target.textContent);
                //next element
                elements[(index+1) % elements.length].focus();
            }
        }
    }
}

function updateText(type, text) {
    const formData = new FormData();
    const username = document.getElementById('profPageUsername').textContent;
    formData.append('username', username);
    formData.append('type', type);
    formData.append('text', text);
    const apiUrl = BASE_URL + '/api/profiles/set';
    fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
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
        location.reload();
        //display that user doesn't exist? Don't allow redirect?
    });
}

function getVideo(element) {
    const formData = new FormData();
    const assetKey = element.id;
    formData.append('assetKey', assetKey);
    formData.append('assetType', 'video');
    const apiUrl = BASE_URL + '/api/assets/delete';
    fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    }).then(response => {
        if(!response) {
            throw new Error("Network response not ok");
        }
        return response.json();
    }).then(body => {
        if (body) {
            //announce feed reload
            location.reload(); //temp
        } else {
            //failed to delete video
        }
    }).catch(err => {
        location.reload();
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
    const username = document.getElementById('profPageUsername').textContent;
    pfpKey = await fetchProfileKey(username);
    formData.append('username', username);
    formData.append('pfpKey', pfpKey);
    formData.append('imageFile', imgInput, imgInput.name);
    const apiUrl = BASE_URL + '/api/upload/pfp';
    //send upload to back end
    fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
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
        location.reload();
        //display that user doesn't exist? Don't allow redirect?
    });
}
const $ = document.querySelector.bind(document);
const $$ = document.getElementById.bind(document);

const fileList = $(".file-recent");
const saveBtn = $(".file-option__save");
const inputName = $(".file-info__name-text");

const listApi = 'http://localhost:3000/docs';

function start() {
  handleCreateDocument()
}

start();

function renderDocs(docs) {
    var htmls = docs.map(function(doc) {
        return `
        <li class="file-recent__info" onclick="openFile(${doc.id})">
    <div class="file-recent__info-wrap">
      <div class="file-recent-heading">
        <div class="file-recent-heading__location"> 
          <i class="fas fa-map-marker-alt"></i>
          <p class="file-recent-heading__forder">Web<p>
        </div>
        <div class="file-recent-heading__menu"> 
          <button class="file-recent-heading__menu-btn file-recent-heading__menu-star"><i class="fas fa-star"></i></button>
          <button class="file-recent-heading__menu-btn file-recent-heading__menu-detail"><i class="fas fa-ellipsis-h"></i></button>
          <ul class="file-recent-heading__menu-list">
            <li class="file-recent-heading__menu-item">
              <i class="fas fa-copy"></i>
              <p>Duplicate</p>
            </li>
            <li class="file-recent-heading__menu-item">
              <i class="fas fa-trash"></i>
              <p>Delete</p>
            </li>
            <li class="file-recent-heading__menu-item">
              <i class="fas fa-pen"></i>
              <p>Edit</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="file-recent-wrap">
        <div class="file-recent-name">
          <h3 class="file-recent-name__name">${doc.name}</h3>
          <p class="file-recent-name__content">No comment</p>
        </div>
      </div>
      <div class="file-recent-date">
        <i class="fas fa-calendar-alt"></i>
        Last update ${doc.timeLastModified}
      </div>
    </div>
    </li>
    `
    });
    fileList.innerHTML = htmls.join('');
}

function createDocument(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(listApi, options)
    .then(response => response.json())
    .then(data => console.log(data));
}
function handleCreateDocument() {
    saveBtn.onclick = function() {
        var name = inputName.value;
        var content = CKEDITOR.instances.text.getData();
        var formData = {
            name: name,
            content: content
        };
        createDocument(formData);
    }
}
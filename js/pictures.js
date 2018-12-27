"use strict";
debugger;
var PHOTOS_COMMENTS = [
    "Всё отлично!",
    "В целом всё неплохо. Но не всё.",
    "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
    "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
    "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
    "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
]

var PHOTOS__DESCRIPTION = [
    "Тестим новую камеру!",
    "Затусили с друзьями на море",
    "Как же круто тут кормят",
    "Отдыхаем...",
    "Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......",
    "Вот это тачка!"
]

var pictureTemplate = document.querySelector("#picture").content.querySelector(".picture");
var picture = document.querySelector(".pictures")
var imgUploadOverlay = document.querySelector(".img-upload__overlay");
var uploadCancel = imgUploadOverlay.querySelector("#upload-cancel");
var ESC_KEYCODE = 27;

var photos = [];
for (var i = 0; i < 25; i++) {
    photos.push(photo());
}

function photo() {
    return {
        url: "photos/" + (i + 1) + ".jpg",
        likes: getRandomNumber(15, 200),
        comments: generateComments(),
        description: getRandomElement(PHOTOS__DESCRIPTION)
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
};

function generateComments() {
    var randomComments = [];
    for (var i = 0; i < getRandomNumber(1, 2); i++) {
        randomComments.push(getRandomElement(PHOTOS_COMMENTS));
    }
    return randomComments;
};

function clone(array, renderElement, parentElement) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
        fragment.appendChild(renderElement(array[i]));
    }
    parentElement.appendChild(fragment);
};

function renderPictures(photo) {
    var picturesElement = pictureTemplate.cloneNode(true);
    picturesElement.querySelector("img").src = photo.url;
    picturesElement.querySelector(".picture__likes").textContent = photo.likes;
    picturesElement.querySelector(".picture__comments").textContent = photo.comments.length;
    return picturesElement;
};

clone(photos, renderPictures, picture);

function renderComments(comments, socialComment) {
    var commentsElement = socialComment.cloneNode(true);
    commentsElement.querySelector(".social__picture").src = "img/avatar-" + getRandomNumber(1, 6) + ".svg";
    commentsElement.querySelector(".social__text").textContent = comments;
    return commentsElement;
};

function renderBigPicture(photo) {
    var bigPicture = document.querySelector(".big-picture");
    bigPicture.classList.remove("hidden");
    bigPicture.querySelector(".big-picture__img > img").src = photo.url;
    bigPicture.querySelector(".likes-count").textContent = photo.likes;
    bigPicture.querySelector(".comments-count").textContent = photo.comments.length + 2;
    bigPicture.querySelector(".social__caption").textContent = photo.description;
    bigPicture.querySelector(".social__comment-count").classList.add("visually-hidden");
    bigPicture.querySelector(".social__footer").classList.add("hidden");
    var socialComments = bigPicture.querySelector(".social__comments");
    var socialComment = socialComments.querySelector(".social__comment");
    var comments = photo.comment;
    renderComments(comments, socialComment);
    clone(comments, renderComments, socialComments);
};

var uploadFile = document.querySelector("#upload-file");

uploadFile.addEventListener("change", function () {
    showForm(imgUploadOverlay);
});

function showForm(imgUploadOverlay) {
    imgUploadOverlay.classList.remove("hidden");
    document.addEventListener("keydown", closeFormEsc);
}

uploadCancel.addEventListener("click", function () {
    imgUploadOverlay.classList.add("hidden");
    uploadFile.value = "";
});

function closeFormEsc(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        imgUploadOverlay.classList.add("hidden");
        uploadFile.value = "";
        console.log(imgUploadOverlay);
    }
};
var picturesContainer = document.querySelector(".pictures");
var pictures = picturesContainer.querySelectorAll(".picture > .picture__img");
picturesContainer.addEventListener("click", function (evt) {
    console.log(pictures);
    console.log(photos[0]);
    for (var i = 0; i < pictures.length; i++) {
        if (evt.target == pictures[i]) {
            console.log("все норм");
            renderBigPicture(photos[i]);
        }
    }
})
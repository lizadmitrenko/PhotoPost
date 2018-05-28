"use strict";

let module = (function () {

    let photoPosts = [
        {
            id: '1',
            description: 'Look at my art!',
            date: new Date('2018-02-17T22:39:00'),
            name: 'MaryLee.io.photopost',
            photoLink: 'images/23182.jpg',
            hashtags: ['Girl', 'Art', 'style'],
            likes: ['BossLemon', 'KateOrient', 'Denis', 'Vlados'],
        },

        {
            id: '2',
            description: 'My favourite food!',
            date: new Date('2018-02-16T18:12:00'),
            name: 'Food.io.photopost',
            photoLink: 'images/4.png',
            hashtags: ['food','homefood'],
            likes: ['MaryLee', 'Denis'],
        },

        {
            id: '3',
            description: 'My gym needs me!',
            date: new Date('2018-02-16T08:22:00'),
            name: 'Homenko.io.photopost',
            photoLink: 'images/2.jpg',
            hashtags: ['blog', 'HomenkoTV'],
            likes: ['Vanya', 'AnyaKiselka'],
        },

        {
            id: '4',
            description: 'Morning!',
            date: new Date('2018-02-15T21:53:00'),
            name: 'ChanYeol.io.photopost',
            photoLink: 'images/3.jpg',
            hashtags: ['morning', 'fun'],
            likes: ['MaryLee'],
        },

        {
            id: '5',
            description: 'Maмина радость, лизина сладость',
            date: new Date('2018-02-15T12:48:00'),
            name: 'MaryLee.io.photopost',
            photoLink: 'images/5.png',
            hashtags: ['suho', 'exo'],
            likes: ['KateOrient','AnyaKiselka'],
        },

        {
            id: '6',
            description: 'Thanks for work!',
            date: new Date('2018-02-15T04:13:00'),
            name: 'exid.io.photopost',
            photoLink: 'images/10.jpg',
            hashtags: [],
            likes: ['Vladik'],
        },

        {
            id: '7',
            description: 'Great fanart!',
            date: new Date('2018-02-14T22:02:00'),
            name: 'exofan.io.photopost',
            photoLink: 'images/6.png',
            hashtags: ['k-pop', 'art', 'music', 'love'],
            likes: ['MaryLee'],
        },

        {
            id: '8',
            description: 'Hey,you!',
            date: new Date('2018-02-15T09:35:00'),
            name: 'Hyuna.io.photopost',
            photoLink: 'images/8.jpg',
            hashtags: [],
            likes: ['Vladik', 'Vlados'],
        },

        {
            id: '9',
            description: 'Look at this abs!',
            date: new Date('2018-02-13T23:23:00'),
            name: 'chiminfan.io.photopost',
            photoLink: 'images/7.jpg',
            hashtags: ['bts','body'],
            likes: [],
        },

        {
            id: '10',
            description: 'sexy photo',
            date: new Date('2018-02-12T01:03:00'),
            name: 'iu.io.photopost',
            photoLink: 'images/9.jpg',
            hashtags: ['iu'],
            likes: ['Vladik'],
        }
    ];

    function checkTagExistence(i, tag) {
       return photoPosts[i].hashtags.some(elem => elem===tag);
    }

    function getPhotoPost(id) {
        return photoPosts.find(x => x.id === id);
    }

    function validate(post)
    {
        if(typeof(post.name) !== 'string' || typeof(post.description) !== 'string' || !post.description ||
            !post.name || !post.photoLink || typeof(post.photoLink) !== 'string'||
            typeof(post.id) !== 'string' || !(post.date instanceof Date)){
            return false;
        }
        return true;
    }

    function addPhotoPost(post) {
        if (!validate(post))
            return false;
        else {
            photoPosts.push(post);
            return true;
        }
    }

    function editPhotoPost(id, post) {
        if (getPhotoPost(id) !== false && post !== undefined){
            if(post.description !== undefined && post.description.length < 200)
                getPhotoPost(id).description = post.description;
            if(post.hashtags !== undefined)
                getPhotoPost(id).hashtags = post.hashtags;
            if(post.photoLink != undefined)
                getPhotoPost(id).photoLink = post.photoLink;
            return true;
        }
        return false;
    }

    function removePhotoPost(id) {
        if (getPhotoPost(id) !== false) {
            photoPosts.splice(photoPosts.indexOf(getPhotoPost(id)), 1);
            return true;
        }
        else {
            return false;
        }
    }

    function compareDate(a, b) {
        return (b.date).getTime() - (a.date).getTime();
    }

    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
        let array = [];
        photoPosts.sort(compareDate);
        let count = 0;

        if (filterConfig === undefined) {
            for (let i = skip; i < top + skip; i++) {
                if (i > photoPosts.length - 1) {
                    return array;
                }
                array.push(photoPosts[i]);
            }
        }
        else {

            if(filterConfig.name !== undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashtags !== undefined){
                array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].name === filterConfig.name && (photoPosts[i].date).getTime() < (filterConfig.up).getTime() && (photoPosts[i].date).getTime() > (filterConfig.bottom).getTime()  && checkTagExistence(i, filterConfig.hashtags)) {
                        count++;
                        if(count > skip)
                            array.push(photoPosts[i]);
                        if(array.length === top)
                            return array;
                    }
                });
            }

            else if(filterConfig.name === undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashtags !== undefined){
                array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].date.getTime() < filterConfig.up.getTime() && photoPosts[i].date.getTime() > filterConfig.bottom.getTime() && checkTagExistence(i, filterConfig.hashtags)) {
                        count++;
                        if(count > skip)
                            array.push(photoPosts[i]);
                        if(array.length === top)
                            return array;
                    }
                });
            }

            else if(filterConfig.name !== undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashtags !== undefined){
                array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].name === filterConfig.name && checkTagExistence(i, filterConfig.hashtags)) {
                        count++;
                        if(count > skip)
                            array.push(photoPosts[i]);
                        if(array.length === top)
                            return array;
                    }
                });
            }

            else if(filterConfig.name !== undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashtags === undefined){
                array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].name === filterConfig.name && photoPosts[i].date.getTime() < filterConfig.up.getTime() && photoPosts[i].date.getTime() > filterConfig.bottom.getTime()) {
                        count++;
                        if(count > skip)
                            array.push(photoPosts[i]);
                        if(array.length === top)
                            return array;
                    }
                });
            }

            else if(filterConfig.name === undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashtags !== undefined){
                array = photoPosts.filter(function(post,i,photoPosts) {
                    if(checkTagExistence(i, filterConfig.hashtags)) {
                        count++;
                        if(count > skip)
                            array.push(photoPosts[i]);
                        if(array.length === top)
                            return array;
                    }
                });
            }

            else if(filterConfig.name !== undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashtags === undefined){
                array = photoPosts.filter(function(post,i,photoPosts) {
                    if(photoPosts[i].name === filterConfig.name) {
                        count++;
                        if(count > skip)
                            array.push(photoPosts[i]);
                        if(array.length === top)
                            return array;
                    }
                });
            }

            else if(filterConfig.name === undefined && filterConfig.up !== undefined && filterConfig.bottom !== undefined && filterConfig.hashtags === undefined){
                array = photoPosts.filter(function(post,i,photoPosts) {
                    if((photoPosts[i].date).getTime() <= (filterConfig.up).getTime() && (photoPosts[i].date).getTime() >= (filterConfig.bottom).getTime()) {
                        count++;
                        if(count > skip)
                            array.push(photoPosts[i]);
                        if(array.length === top)
                            return array;
                    }
                });
            }

            else if(filterConfig.name === undefined && filterConfig.up === undefined && filterConfig.bottom === undefined && filterConfig.hashtags === undefined){
                for (let i = skip; i < top + skip; i++) {
                    if (i > photoPosts.length - 1) {
                        if (array.length === 0)
                            return null;
                        return array;
                    }
                    array.push(photoPosts[i]);
                }
            }
        }
        return array;

    }

    return {
        getPhotoPosts: getPhotoPosts,
        getPhotoPost: getPhotoPost,
        validate: validate,
        addPhotoPost: addPhotoPost,
        editPhotoPost: editPhotoPost,
        removePhotoPost: removePhotoPost
    }
})();

let user = 'marylee';
let count = 0;
let necessaryPhotos;
//////////////////////////////////////////////////////////////////////////////////////


let dom = (function () {
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    function addPostAtTheEnd(post) {
        let photo = document.querySelector('.photoPost');
        let clone = photo.cloneNode(true);
        clone.id = post.id;
        clone.style.display = 'inline-block';
        clone.querySelector('.description').innerHTML = post.description;
        clone.querySelector('.date').innerHTML = new Date(post.createdAt).toLocaleString('en-US', options);
        clone.querySelector('.name').innerHTML = post.name;
        clone.querySelector('.photo-img').src = post.photoLink;
        clone.querySelector('.likes').innerHTML = post.likes.length;
        let string = '';
        tags.innerHTML = string;
        let photos = document.querySelector('.photos');
        photos.appendChild(clone);
        clone.querySelector('.likes').id = post.id + '_like';
        clone.querySelectorAll('.material-icons')[2].id = post.id + '_heart';
        clone.querySelectorAll('.material-icons')[2].addEventListener('click', onclickLike);
        if (JSON.parse(localStorage.getItem('user')) !== post.name) {
            clone.querySelectorAll('.material-icons')[0].style.display = 'none';
            clone.querySelectorAll('.material-icons')[1].style.display = 'none';
        } else {
            clone.querySelectorAll('.material-icons')[1].id = post.id + '_delete';
            clone.querySelectorAll('.material-icons')[1].addEventListener('click', onclickDeletePh);
            clone.querySelectorAll('.material-icons')[0].id = post.id + '_edit';
            clone.querySelectorAll('.material-icons')[0].addEventListener('click', onclickEdit);
            clone.querySelectorAll('.material-icons')[0].style.display = 'inline';
            clone.querySelectorAll('.material-icons')[1].style.display = 'inline';
        }
        if (post.likes.indexOf(JSON.parse(localStorage.getItem('user'))) !== -1) {
            clone.querySelectorAll('.material-icons')[2].style.color = 'red';
        } else {
            clone.querySelectorAll('.material-icons')[2].style.color = 'black';
        }
    }
    function generatePhotoPosts(array, deleteOldPosts) {
        console.log(array);
        array = array || action.getPhotoPosts();
        let photos = document.querySelector('.section-photo');
        if (deleteOldPosts === undefined) {
            photos.innerHTML = '';
        }
        for (let i = 0; i < array.length; i++) {
            addPostAtTheEnd(array[i]);
        }
        if (array.length >= 10 && array[array.length - 1] !== JSON.parse(localStorage.getItem('photoPosts'))[JSON.parse(localStorage.getItem('photoPosts')).length - 1]) {
            document.querySelector('.show-more').style.display = 'inline-block';
        } else {
            document.querySelector('.show-more').style.display = 'none';
        }
    }

    function generatePhoto(array, deleteOldPosts) {
        generatePhotoPosts(array, deleteOldPosts);
    }

    function removePhoto(id) {
        if (document.getElementById(id) !== null) {
            document.getElementById(id).parentNode.removeChild(document.getElementById(id));
            let array = module.getPhotoPosts(0, count);
            generatePhotoPosts(array);
        }
    }

    function editMyPhotoPost(id) {
        if (document.getElementById(id) !== null) {
            let array = module.getPhotoPosts(0, count);
            generatePhotoPosts(array);
        }
    }

    function showElementsHeader() {
        let name = document.querySelector('.name');
        name.innerHTML = JSON.parse(localStorage.getItem('user'));
        name.style.display = 'inline-block';
        if (JSON.parse(localStorage.getItem('user')) === null) {
            document.querySelector('.button').innerHTML = 'Log in';
            document.querySelector('.button-add-photo').style.display = 'none';
        } else {
            document.querySelector('.button').innerHTML = 'Log out';
            document.querySelector('.button-add-photo').style.display = 'inline';
        }
    }

    return {
        generatePhoto,
        generatePhotoPosts,
        removePhoto,
        editMyPhotoPost,
        showElementsHeader
    }
})();

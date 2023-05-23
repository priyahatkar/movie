console.log("hello world");

const cl = console.log;

const showModelBtn = document.getElementById("showModelBtn");
const updateBtn = document.getElementById("update");
const submitBtn = document.getElementById("submitBtn");
const myModel = document.getElementById("myModel");
const movieClose = [...document.querySelectorAll(".movieClose")]
const backDrop = document.getElementById("backDrop");
const titleControl = document.getElementById("title");
const imgUrlControl = document.getElementById("imgUrl");
const ratingControl = document.getElementById("rating");
const moviesContainer = document.getElementById("moviesContainer");
const movieForm = document.getElementById("movieForm");


let movieArr = [];



movieArr =JSON.parse(localStorage.getItem("movieData")) ?? [];

const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


let drama = (str) =>{
    let result = "";
    str.forEach(arr =>{
        result += `
        <div class=" col-md-4 col-sm-6 mb-20">
                    <div class="card-group mt-3">
                        <div class="card border-0" id="${arr.id}">
                            <div class="card-header text-center">
                                <h2>${arr.title}</h2>
                            </div>
                            <div class="card-body">
                                <img src="${arr.imgUrl}"
                                    class="img-fluid movieImg" alt="logo">
                            </div>
                            <div class="card-footer">
                                <p>${arr.rating}/5</p>
                                <div class="text-right footerIcon">
                                    <button type="" class="btn btn-primary" onclick ="onEditHandler(this)"><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button type="" class="btn btn-danger" onclick="onDeleteHandler(this)"><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                        `
    })
    moviesContainer.innerHTML=result
}

const onEditHandler = (ele) => {
    // cl(ele)
    let editId = ele.closest(".card").getAttribute("id")
    localStorage.setItem("editId", editId)
    let editObj = movieArr.find(std => std.id === editId);
    // cl(editObj)
    titleControl.value = editObj.title,
    imgUrlControl.value = editObj.imgUrl,
    ratingControl.value = editObj.rating

    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
    
    myModel.classList.toggle("visible");
    backDrop.classList.toggle("visible");
}

const onUpdate = () => {
    let updateId = localStorage.getItem("editId");
    // cl(updateId)

    movieArr.forEach(obj =>{
        if(obj.id === updateId){
            obj.title = titleControl.value,
            obj.imgUrl =  imgUrlControl.value,
            obj.rating = ratingControl.value
        }
    })
    localStorage.setItem("movieData", JSON.stringify(movieArr))
    drama(movieArr)
    myModel.classList.toggle("visible");
    backDrop.classList.toggle("visible");
    movieForm.reset();
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Movie Is Updated',
        showConfirmButton: false,
        timer: 3000
    })
}


const onDeleteHandler = (ele) => {
    // cl(ele)
    let deleteId = ele.closest(".card").id;
    // cl(deleteId)
    let deleteInd = movieArr.findIndex(arr => arr.id === deleteId)
    cl(deleteInd)
    movieArr.splice(deleteInd, 1)
    localStorage.setItem("movieData", JSON.stringify(movieArr))
    drama(movieArr)
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Movie Is Deleted',
        showConfirmButton: false,
        timer: 3000
    })
}

const modelShowHideHandler = () =>{
    myModel.classList.toggle("visible");
    backDrop.classList.toggle("visible");
}
drama(movieArr)

const onSubmitMovieHandler = (e) =>{
    e.preventDefault();

    movieObj ={
        title : titleControl.value,
        imgUrl : imgUrlControl.value,
        rating : ratingControl.value,
        id : generateUuid(),
    }
    movieArr.unshift(movieObj);
    drama(movieArr)
    localStorage.setItem("movieData", JSON.stringify(movieArr));
    e.target.reset();
    modelShowHideHandler()
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Movie Added In Successfully',
        showConfirmButton: false,
        timer: 3000
    })
    cl(movieArr)
}


showModelBtn.addEventListener("click", modelShowHideHandler);
movieClose.forEach(ele =>ele.addEventListener("click", modelShowHideHandler));
movieForm.addEventListener("submit", onSubmitMovieHandler);
updateBtn.addEventListener("click", onUpdate);
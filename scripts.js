import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSetting = {
    databaseURL: "https://teste-3c552-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSetting)
const datebase = getDatabase(app)
const wordsInDB = ref(datebase,"words")
const booksInDB = ref(datebase,"books")

const element = document.getElementById("input-field")
const butao = document.getElementById("add-button")

const list = document.getElementById("shopping-list")

onValue(wordsInDB, function (snapshot)
{
    if (snapshot.exists()){
    let wordsArray = Object.entries(snapshot.val())
    let wordsArrayValue = Object.values(snapshot.val())
    let wordsArrayID = Object.keys(snapshot.val())

    cleatInnerHtml()

    for (let i = 0; i < wordsArray.length; i++){
        let currentWord = wordsArray[i]
        let currentWordValue = wordsArrayValue[i]
        let currentWordID = wordsArrayID[i]
        addToList(currentWordValue,currentWordID)
    }
}
    else {
        list.innerHTML = "No itens here"
    }
})

butao.addEventListener("click", function () {
        let elementValue = element.value
        push (wordsInDB,elementValue)

       

 
        clearInput()
       
})

function cleatInnerHtml()
{
    list.innerHTML = ""
}
function clearInput ()
{
    element.value = ""
}

function addToList(value,ID)
{
    // ele[0] = id
    // ele[1] = value

    let item = document.createElement("li")
    
    item.textContent = value
    list.appendChild(item)
    item.addEventListener("click", function() {
        let locationInDB = ref(datebase,`words/${ID}`)

        remove(locationInDB)
    } )

   

}


// Object.values(user)
// Object.keys (user)
// Object.entries(user)


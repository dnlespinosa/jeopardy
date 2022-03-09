// READ ME
// currently when pressing the restart button, the game board will load, no categories in the top section and ? in all playable squares. In the DOM when I run the function fillCategories(), I will get 6 categories formatted to the data structure below. In  the DOM when I run the function insertHeaders(), the data from the categories array is placed on the board and is playable. 

// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
let catId = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    const res = await axios.get('http://jservice.io/api/clues')
    let arr = [];
    let arr2 = [];
    for (let id of res.data){
        arr.push(id.category.id);
    }
    const randInt = Math.floor(Math.random()*100)+1;
    catId.push(arr[randInt]);
    }

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
    const res = await axios.get('http://jservice.io/api/clues');
    let arr = [];
    let obj = {};
    let arr2 = [];
    for (let id of res.data){
        if (id.category_id === catId){
            arr2.push({
                question: id.question, 
                answer: id.answer
            })
            obj.title = id.category.title;
            obj.clues = arr2;
            arr.push(obj);
        }
    }

    categories.push(arr[0]);
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */



async function fillTable() {
    const body = document.querySelector('body');
    const board = document.createElement('table');
    board.setAttribute('id', 'board');
    const top = document.createElement('thead');
    top.setAttribute('id', 'top-head');
    for (let x =0; x<6; x++){
        const headCell = document.createElement('td');
        headCell.setAttribute('id', `${x}`);
        top.append(headCell);
    }
    board.append(top);

    for (let x=0; x<5; x++){
        const row = document.createElement('tr');
        for (let y=0; y<6; y++){
            const cell = document.createElement('td');
            cell.setAttribute('id', `${y}-${x}`);
            cell.setAttribute('class', '?');
            cell.innerText = '?';
            row.append(cell);
            cell.addEventListener('click', handleClick)
        }
        board.append(row);
    }
    body.append(board);

}



function fillCatId() {
    catId = [];
    for (let x=0; x<6; x++){
        getCategoryIds();
    }
}

function removeDuplicates(arr){
    let arr2 = arr.filter((num, index) => arr.indexOf(num)===index);
    catId = arr2;
}

function replaceValues () {
    let num ='';
    if(catId.length<6){
        num = 6-catId.length;
    }
    console.log(num);
}

function fillCategories() {
    for (let num of catId){
        getCategory(num);
    }
}

function insertHeaders() {
    for (let x=0; x<6; x++){
        let item = document.getElementById(`${x}`);
        if (categories[x] === undefined){
            item.innerText = 'RELOAD PAGE';
        } else {
            item.innerText = categories[x].title
        }
    }
}




/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    let x = evt.target.id;
    let num = x.split('');
    let ditch = num.splice(1,1);
    let num1 = num[0];
    let num2 = num[1];
    if (evt.target.innerText === "?"){
        if (categories[num1].clues[num2].question === '' || categories[num1].clues[num2].question === undefined){
            evt.target.innerText = 'RELOAD PAGE';
        } else {
            evt.target.innerText = categories[num1].clues[num2].question
        }
        evt.target.class = 'CLICKED';
    } else if (evt.target.class === 'CLICKED') {
        if (evt.target.innerText === 'RELOAD PAGE'){
            evt.target.innerText = 'RELOAD PAGE';
        } else if (categories[num1].clues[num2].answer === '' || categories[num1] === undefined){
            evt.target.innerText = 'RELOAD PAGE';
        }
        else {
            evt.target.innerText = categories[num1].clues[num2].answer;
        }
        evt.target.class = 'SOLVED';
    }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
    await fillCatId();
    await fillCategories();
    fillTable();

}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

let body = document.querySelector('body');
let btn = document.createElement('button');
btn.innerText = 'RESTART GAME';
btn.addEventListener('click', setupAndStart);
body.append(btn);







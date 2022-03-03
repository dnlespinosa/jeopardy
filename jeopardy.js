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
    // console.log(res.data);
    let arr = [];
    for (let id of res.data){
        arr.push(id.category.id);
        // console.log(id.category.id);
    }
    const randInt = Math.floor(Math.random()*100)+1;
    catId.push(arr[randInt]);
    return catId;
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
    // console.log(res.data);
    let arr = [];
    let obj = {};
    let arr2 = [];
    for (let id of res.data){
        // console.log(id);
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
    return categories;
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
        }
        board.append(row);
    }
    // put board on the actual page
    body.append(board);

}



function fillCatId() {
    for (let x=0; x<6; x++){
        getCategoryIds();
    }
}

function fillCategories() {
    for (let x=0; x<6; x++){
        getCategory(catId[x]);
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
    for (let x=0; x<6; x++){
        for (let y=0; y<6; y++){
            let itemBlock = document.getElementById(`${y}-${x}`);
            if (categories[x].clues[y].question === ''){
                itemBlock.innerText = 'RELOAD PAGE';
            } else {
                itemBlock.innerText = categories[x].clues[y].question
            }
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
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO



fillTable();
var swidth = visualViewport.width;
var sheight = visualViewport.height;

function bogoSort(columns) {
    function validate() {}
}

function bubbleSort(columns) {
    var curlength = columns.length;
    var done = false;
    var seconds = 0;
    function trackTime() {
        if (curlength == 0) {
            done = true;
            console.log(true);
            var secondCounter = document.createElement('div');
            secondCounter.innerHTML = `Seconds passed: ${seconds}`;
            secondCounter.style.fontFamily = '"Avenir.otf",sans-serif';
            secondCounter.style.fontSize = '35px';
            secondCounter.style.position = 'fixed';
            secondCounter.style.top = '80px';
            document.body.appendChild(secondCounter);
        }
        if (!done) {
            setTimeout(() => {
                seconds += 0.01;
                seconds = seconds.toFixed(2);
                seconds = Number(seconds);
                trackTime();
            }, 10);
        }
    }
    trackTime();

    //bubble sort
    function sort() {
        function sortdeeper(j) {
            setTimeout(() => {
                if (curlength >= 2 && j <= curlength - 2) {
                    var cur = columns[j];
                    var ahead = columns[j + 1];
                    if (cur[1] > ahead[1]) {
                        cur[0].style.height = `${ahead[1]}px`;
                        ahead[0].style.height = `${cur[1]}px`;
                        cur[0].style.backgroundColor = 'blue';
                        ahead[0].style.backgroundColor = 'blue';
                        var this1 = cur[1];
                        cur[1] = ahead[1];
                        ahead[1] = this1;
                    } else {
                        cur[0].style.backgroundColor = 'red';
                        ahead[0].style.backgroundColor = 'red';
                    }
                    setTimeout(() => {
                        cur[0].style.backgroundColor = 'black';
                        ahead[0].style.backgroundColor = 'black';
                    }, 20);
                }
                j++;
                if (j < curlength) {
                    sortdeeper(j);
                } else {
                    if (curlength > 0) curlength--;
                    var curr = columns[curlength];
                    curr[0].style.backgroundColor = 'green';
                }
            }, 20);
        }
        setTimeout(() => {
            var j = 0;
            sortdeeper(j);
            if (curlength) {
                sort();
            }
        }, 20 * curlength + 23);
    }
    sort();
}

function positionRandomize(listlength) {
    var baseWidth = 10;
    var fullWidth = 11;
    function fixWidth(listlength) {
        while (listlength * fullWidth >= swidth / 1.6) {
            baseWidth -= 1;
            fullWidth = Number(baseWidth.toFixed(1)) * 1.1;
        }
        return [baseWidth, Math.round(fullWidth)];
    }

    var [sideWidth, fullWidth] = fixWidth(listlength);
    var listOfColumns = [];
    for (var i = 0; i < listlength; i++) {
        var newColumn = document.createElement('div');
        var length = Math.round((Math.random() * sheight) / 2) + 20;

        newColumn.classList.add('column');
        newColumn.style.height = `${length}px`;
        newColumn.style.width = `${sideWidth}px`;
        newColumn.style.left = `${
            i * fullWidth + (swidth / 2 - (fullWidth * listlength) / 2)
        }px`;
        newColumn.style.bottom = `${sheight / 4}px`;

        listOfColumns.push([newColumn, length]);
        document.body.appendChild(newColumn);
    }
    return listOfColumns;
}
var leninput = document.getElementById('listlength');
var send = document.getElementById('start');
var bubblesort = document.getElementById('bubblesort');
var columns;

var arrayGenerated = false;

var sorters = [
    false, //bubblesort
];
send.addEventListener('click', () => {
    if (leninput.value && Number(leninput.value) <= 180) {
        arrayGenerated = true; //so that it doesnt try to run on an empty array
        document.body.innerHTML = ''; //reset all of the columns
        document.body.appendChild(leninput);
        document.body.appendChild(send); //reappend buttons into doc
        document.body.appendChild(bubblesort);
        columns = positionRandomize(leninput.value); //generate new columns
        //reset all values in 'sorters'
        for (var i = 0; i < sorters.length; i++) {
            sorters[i] = false;
        }
    }
});
bubblesort.addEventListener('click', () => {
    if (
        arrayGenerated &&
        !sorters[0] /* So that it wont break when bubble sort is requested multiple times */
    ) {
        sorters[0] = true;
        bubbleSort(columns);
    }
});

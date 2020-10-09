var firstCode = [{'code': 'createUser(request, response)', 'cb': false}, {'code': 'User.findOrCreate({ where: request.body })', 'cb': true, 'cbText': 'findOrCreate'}, {'code': 'logging(`/users route called with ${request.body}`)', 'cb': false}, {'code': 'empty', 'cb': false}];
var firstCallback = [{'code': 'findOrCreate({ where: request.body })', 'cb': false}, {'code': 'getContacts()', 'cb': true, 'cbText': 'getContacts()'}, {'code': 'empty', 'cb': false}];
var secondCallback = [{'code': 'getContacts()', 'cb': false}, {'code': "response.render('profile', {user, contacts})", 'cb': false}, {'code': 'empty', 'cb': false}];


var currentCBQueue = [];
var currentElements = [];

function stackExample() { 
    document.getElementById('start').remove();
    var set1 = new Promise((resolve, reject) => {
        firstCode.forEach((element, i, array) => {
            setTimeout(() => {
                dealWithFirstSet(element);
                if (i === array.length -1) {
                    resolve();
                }
              }, i * 1000);
            
        });
    })
    set1.then(() => {
        stackExmapleContinue();
        console.log('1done')
    })

    
}

function stackExmapleContinue() {
    var set2 = new Promise((resolve, reject) => {
        currentElements.forEach((element, i, array) => {
            setTimeout(() => {
                removeElement(element);
                if (i === 3) {
                    resolve();
                }
              }, i * 1000);
        });
    });
    set2.then(() => {
        removeCBElement();
        stackExmapleContinue2(); 
        console.log('2done')
    })
}

function stackExmapleContinue2() {
    var set3 = new Promise((resolve, reject) => {
        firstCallback.forEach((element, i, array) => {
            setTimeout(() => {
                dealWithFirstCB(element);
                if (i === array.length -1) {
                    resolve();
                }
              }, i * 1000);
        })
    })
    set3.then(() => {
        console.log('3done');
        stackExampleContinue3();
    })
}

function stackExampleContinue3() {
    console.log(currentElements);
    var set4 = new Promise((resolve, reject) => {
        currentElements.forEach((element, i, array) => {
            setTimeout(() => {
                removeElement();
                if (i === 2) {
                    resolve();
                }
                console.log(i)
              }, i * 1000);
        });
    });
    set4.then(() => {
        removeCBElement();
        console.log('4done')
        stackExmapleContinue4(); 
    })
}

function stackExmapleContinue4() {
    var set5 = new Promise((resolve, reject) => {
        secondCallback.forEach((element, i, array) => {
            setTimeout(() => {
                dealWithSecondCB(element);
                if (i === array.length -1) {
                    resolve();
                }
              }, i * 1000);
        })
    })
    set5.then(() => {
        console.log('5done');
        stackExmapleContinue5();
    })
}

function stackExmapleContinue5() {
    console.log(currentElements);
    var set5 = new Promise((resolve, reject) => {
        currentElements.forEach((element, i, array) => {
            setTimeout(() => {
                removeElement();
                if (i === array.length -1) {
                    resolve();
                }
              }, i * 1000);
        });
    });
    set5.then(() => {
        removeCBElement();
        console.log('5done')
    })
}

function dealWithFirstSet(element) {
    if (element.cb) {
        var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        createElement(element.cbText, id, 'cbQueue');
        currentCBQueue.push(id);
    }
    var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    createElement(element.code, id, 'mainstack');
    currentElements.push(id);
}

function dealWithFirstCB(element) {
    if (element.cb) {
        var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        createElement(element.cbText, id, 'cbQueue');
        currentCBQueue.push(id);
    }
    var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    createElement(element.code, id, 'mainstack');
    currentElements.push(id);
}

function dealWithSecondCB(element) {
    if (element.cb) {
        var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        createElement(element.cbText, id, 'cbQueue');
        currentCBQueue.push(id);
    }
    var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    createElement(element.code, id, 'mainstack');
    currentElements.push(id);
}

function createElement(text, id, tableid) {
    var element = document.createElement("tr");
    element.id = id;
    var el2 = document.createElement("td");
    el2.textContent = text;

    // element.appendChild(el2);

    var tablebody = document.getElementById(tableid);
    var tr = tablebody.tBodies[0].insertRow(0);
    tr.id = id;
    tr.appendChild(el2);

}

function removeElement() {
    var element = document.getElementById(currentElements[currentElements.length - 1]);
    currentElements.pop();
    element.remove();
}

function removeCBElement() {
    var element = document.getElementById(currentCBQueue[currentCBQueue.length -1]);
    currentCBQueue.pop();
    element.remove();
}


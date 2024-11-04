const boxes = []; // مصفوفة لتخزين العقد
const character = document.getElementById('character'); // الحصول على عنصر الأيقونة
let currentIndex = 0; // لعد النودز

document.getElementById('startGame').onclick = () => {
    document.querySelector('.init').classList.add('hidden');
    document.querySelector('.game').classList.remove('hidden');
};

function createGame() {
    const gameContainer = document.querySelector('.game');
    for (let i = 0; i < 9; i++) {
        addBox(i);
    }
    // وضع الأيقونة في المربع الأول
    moveCharacterToBox(0);
}

function addBox(index) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.setAttribute('data-value', index);

    // تمييز الرقم
    const number = document.createElement('span');
    number.textContent = `${index}`;
    number.classList.add('node-number');
    box.appendChild(number);

    // إضافة حدث عند الضغط على المربع
    box.addEventListener('click', function () {
        handleBoxClick(index);
    });

    // إضافة العقدة إلى المصفوفة
    boxes.push({
        element: box,
        value: index,
        state: 'closed'
    });

    // إضافة العقدة إلى واجهة المستخدم
    document.querySelector('.game').appendChild(box);
}

function moveCharacterToBox(boxIndex) {
    const box = boxes[boxIndex].element;
    const boxRect = box.getBoundingClientRect(); // الحصول على موقع المربع

    // تحديث موقع الأيقونة
    character.style.left = `${boxRect.left}px`;
    character.style.top = `${boxRect.top}px`;
}

function handleBoxClick(index) {
    const box = boxes[index];
    box.state = box.state === 'closed' ? 'open' : 'closed';
    box.element.style.backgroundColor = box.state === 'open' ? 'green' : 'white';

    // لنقل الشخصية عندما يتم النقر على مربع
    moveCharacterToBox(index);
    console.log(`Clicked on box ${index}, now ${box.state}`);
}

document.getElementById('insertAtFront').onclick = () => {
    insertAtFront();
};

function insertAtFront() {
    resetBoxColors();
    const newIndex = currentIndex++; // استخدام القيمة الحالية ثم زيادة العداد
    const newBox = document.createElement('div');

    newBox.classList.add('box');
    newBox.setAttribute('data-value', newIndex);
    setTimeout(() => {
        newBox.style.backgroundColor = 'yellow'; // تمييز اللون
    }, 500);

    // تمييز الرقم
    const number = document.createElement('span');
    number.textContent = `${newIndex}`;
    number.classList.add('node-number');
    newBox.appendChild(number);

    // إضافة حدث عند الضغط على المربع
    newBox.addEventListener('click', function () {
        handleBoxClick(newIndex);
    });

    // إدراج العقدة الجديدة في البداية
    boxes.unshift({
        element: newBox,
        value: newIndex,
        state: 'closed'
    });

    // إضافة العقدة الجديدة إلى واجهة المستخدم في البداية
    const gameContainer = document.querySelector('.game');
    gameContainer.insertBefore(newBox, gameContainer.firstChild);

    // تحريك الأيقونة إلى العقدة الجديدة
    moveCharacterToBox(0);
}

document.getElementById('insertAtLast').onclick = () => {
    insertAtLast();
};

function insertAtLast() {
    resetBoxColors();
    const newIndex = currentIndex++; // استخدام القيمة الحالية ثم زيادة العداد
    addBox(newIndex); // إضافة العقدة الجديدة
    moveCharacterToBox(boxes.length - 1); // تحريك الأيقونة إلى آخر عقدة
}


document.getElementById('delete').onclick = () => {
    deleteFromFront();
};

function deleteFromFront() {
    resetBoxColors();
    if (boxes.length > 0) {
        const removedBox = boxes[0]; // الحصول على العقدة الأولى
        removedBox.element.style.border = '2px solid red'; // تمييز الحدود
        removedBox.element.style.backgroundColor = 'yellow'; // تمييز اللون

        console.log(`About to delete box from front.`);
        setTimeout(() => {
            document.querySelector('.game').removeChild(removedBox.element);
            boxes.shift(); // إزالة العقدة من المصفوفة
            console.log(`Deleted box from front.`);
            if (boxes.length > 0) moveCharacterToBox(0); // تحديث موقع الشخصية إذا كانت هناك عقدة متبقية
        }, 500); // الانتظار لمدة 1 ثانية
    } else {
        console.log(`No boxes to delete.`);
    }
}

document.getElementById('deleteFromLast').onclick = () => {
    deleteFromLast();
};

function deleteFromLast() {
    resetBoxColors();
    if (boxes.length > 0) {
        const removedBox = boxes[boxes.length - 1]; // الحصول على العقدة الأخيرة
        removedBox.element.style.border = '2px solid red'; // تمييز الحدود
        removedBox.element.style.backgroundColor = 'yellow'; // تمييز اللون

        console.log(`About to delete box from last.`);
        setTimeout(() => {
            document.querySelector('.game').removeChild(removedBox.element);
            boxes.pop(); // إزالة العقدة من المصفوفة
            console.log(`Deleted box from last.`);
            if (boxes.length > 0) {
                moveCharacterToBox(boxes.length - 1); // تحريك الأيقونة إلى آخر عقدة
            }
        }, 500); // الانتظار لمدة 1 ثانية
    } else {
        console.log(`No boxes to delete.`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').onclick = () => {
        resetBoxColors();
        const searchValue = document.getElementById('searchInput').value; // الحصول على قيمة البحث
        const nodeIndex = boxes.findIndex(box => box.value === parseInt(searchValue)); // العثور على فهرس العقدة

        if (nodeIndex !== -1) {
            moveCharacterToBox(nodeIndex); // تحريك الأيقونة إلى العقدة
            boxes[nodeIndex].element.style.backgroundColor = 'yellow'; // تلوين العقدة باللون الأصفر
            console.log(`Found node with value: ${searchValue}`);
        } else {
            console.log(`Node with value ${searchValue} not found.`);
        }
    };
});

function resetBoxColors() {
    boxes.forEach(box => {
        box.element.style.backgroundColor = box.state === 'open' ? 'yellow' : 'white'; // إعادة اللون الأصلي
    });
}

// استدعاء الدالة لإنشاء اللعبة عند التحميل
createGame();

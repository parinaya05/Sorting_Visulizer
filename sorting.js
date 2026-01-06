let arr = [];
let comparisons = 0;
let swaps = 0;
let delay = 150;

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function updateStats() {
    document.getElementById("cmp").innerText = comparisons;
    document.getElementById("swp").innerText = swaps;
}

function displayArray() {
    const input = document.getElementById("input").value.trim();
    if (!input) return alert("Enter numbers");

    arr = input.split(",").map(Number);
    if (arr.some(isNaN)) return alert("Invalid input");

    comparisons = swaps = 0;
    updateStats();
    render();
}

function generateRandom() {
    arr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    comparisons = swaps = 0;
    updateStats();
    render();
}

function resetArray() {
    arr = [];
    comparisons = swaps = 0;
    updateStats();
    document.getElementById("bars").innerHTML = "";
}

function render(h1 = -1, h2 = -1, done = []) {
    const bars = document.getElementById("bars");
    bars.innerHTML = "";

    const max = Math.max(...arr, 1);
    const scale = 250 / max;

    arr.forEach((v, i) => {
        const b = document.createElement("div");
        b.className = "bar";
        b.style.height = `${v * scale}px`;
        b.textContent = v;

        if (done.includes(i)) b.classList.add("done");
        else if (i === h1 || i === h2) b.classList.add("active");

        bars.appendChild(b);
    });
}

/* SORTING */

async function bubbleSort() {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            comparisons++; updateStats();
            render(j, j + 1);
            await sleep(delay);

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swaps++; updateStats();
            }
        }
        render(-1, -1, [arr.length - 1 - i]);
    }
    render(-1, -1, arr.map((_, i) => i));
}

async function selectionSort() {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            comparisons++; updateStats();
            render(min, j);
            await sleep(delay);
            if (arr[j] < arr[min]) min = j;
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
            swaps++; updateStats();
        }
        render(-1, -1, [...Array(i + 1).keys()]);
    }
}

async function insertionSort() {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            comparisons++; swaps++; updateStats();
            arr[j + 1] = arr[j];
            j--;
            render(j, j + 1);
            await sleep(delay);
        }
        arr[j + 1] = key;
    }
    render(-1, -1, arr.map((_, i) => i));
}

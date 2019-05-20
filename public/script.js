function makeRequest(callback, input) {
    function request(command, url) {
        const xhr = new XMLHttpRequest();
        xhr.open(command, url, true);
        return xhr;
    }

    const url = `query?message=${input}`;
    const xhr = request('GET', url);

    if (!xhr) throw 'Error, something went wrong...';

    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        callback(data);
    };

    xhr.onerror = function () {
        throw 'Error, something went wrong...';
    };

    xhr.send();
}

function display(data) {
    document.getElementById('output').textContent = data;
}

const button = document.getElementById('submit');

button.onclick = function() {
    const input = document.getElementById('word').value;
    makeRequest(display, input);
}
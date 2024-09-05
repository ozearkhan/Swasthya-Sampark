document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    function sendSymptom() {
        const symptom = document.getElementById('symptomInput').value;
        socket.emit('initialSymptom', symptom);
    }

    document.getElementById('sendButton').addEventListener('click', sendSymptom);

    socket.on('initialSymptomResult', (result) => {
        document.getElementById('output').innerHTML += `<p>Initial symptom: ${JSON.stringify(result)}</p>`;
        socket.emit('expandSymptom', result.data.name);
    });

    socket.on('expandSymptomResult', (result) => {
        document.getElementById('output').innerHTML += `<p>Expanded symptoms: ${JSON.stringify(result)}</p>`;
    });

    socket.on('error', (error) => {
        document.getElementById('output').innerHTML += `<p>Error: ${error}</p>`;
    });
});
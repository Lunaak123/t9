const params = new URLSearchParams(window.location.search);
const sheetName = params.get('sheetName');
const fileUrl = params.get('fileUrl');

async function loadSheet() {
    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_html(sheet, { editable: true });
    document.getElementById('sheet-content').innerHTML = data;
}

document.getElementById('apply-operation').addEventListener('click', () => {
    const primaryColumn = document.getElementById('primary-column').value;
    const operationColumns = document.getElementById('operation-columns').value.split(',');
    const operationType = document.getElementById('operation-type').value;
    const operation = document.getElementById('operation').value;

    // Implement the logic for applying the operations based on the user's input
    console.log(primaryColumn, operationColumns, operationType, operation);
    // Add your logic here to filter or manipulate the data
});

document.getElementById('download-button').addEventListener('click', () => {
    document.getElementById('download-modal').style.display = 'block';
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('download-modal').style.display = 'none';
});

document.getElementById('confirm-download').addEventListener('click', () => {
    const filename = document.getElementById('filename').value;
    const format = document.getElementById('file-format').value;

    // Implement download logic here based on selected format
    console.log(`Downloading ${filename}.${format}`);
    // Add your logic here for downloading the processed file
});

// Load the sheet on page load
loadSheet();

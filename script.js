// script.js
document.getElementById('convert-btn').addEventListener('click', function () {
    const files = document.getElementById('file-input').files;
    if (files.length === 0) {
        alert("Por favor, selecione arquivos para converter.");
        return;
    }
    
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Converta cada planilha para CSV
            workbook.SheetNames.forEach(sheetName => {
                const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                downloadCSV(csvData, file.name.replace(".xlsx", `_${sheetName}.csv`));
            });
        };
        
        reader.readAsArrayBuffer(file);
    }
});

function downloadCSV(csvContent, fileName) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");

    if (link.download !== undefined) { // Verifica se o download é suportado
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

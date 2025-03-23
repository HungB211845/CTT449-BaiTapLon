/**
 * Convert JSON data to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {Array} headers - Array of header objects with title and key
 * @returns {string} CSV formatted string
 */
export const exportToCSV = (data, headers) => {
  if (!data || !data.length) return '';

  // Create header row
  const headerRow = headers.map(header => header.title).join(',');
  
  // Create data rows
  const rows = data.map(item => {
    return headers.map(header => {
      // Handle fields with commas by wrapping in quotes
      let value = item[header.key] || '';
      if (typeof value === 'string' && value.includes(',')) {
        value = `"${value}"`;
      }
      return value;
    }).join(',');
  });

  // Combine header and data rows
  return [headerRow, ...rows].join('\n');
};

/**
 * Trigger file download
 * @param {string} content - Content to download
 * @param {string} fileName - Name of the file
 * @param {string} contentType - MIME type of the file
 */
export const downloadFile = (content, fileName, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export data to CSV and trigger download
 * @param {Array} data - Array of objects to export
 * @param {Array} headers - Array of header objects with title and key
 * @param {string} fileName - Name of the file without extension
 */
export const exportCSVFile = (data, headers, fileName = 'export') => {
  const csvContent = exportToCSV(data, headers);
  downloadFile(csvContent, `${fileName}.csv`, 'text/csv;charset=utf-8;');
};

/**
 * Print data as a formatted table
 * @param {Array} data - Array of objects to print
 * @param {Array} headers - Array of header objects with title and key
 * @param {string} title - Title of the report
 */
export const printTable = (data, headers, title = 'Report') => {
  // Create a new window
  const printWindow = window.open('', '_blank');
  
  // Generate HTML content for the print window
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h1 { text-align: center; }
        .print-header { display: flex; justify-content: space-between; }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="print-header">
        <h1>${title}</h1>
        <button onclick="window.print()">In báo cáo</button>
      </div>
      <table>
        <thead>
          <tr>
            ${headers.map(header => `<th>${header.title}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
  `;
  
  // Add data rows
  data.forEach(item => {
    htmlContent += '<tr>';
    headers.forEach(header => {
      htmlContent += `<td>${item[header.key] || ''}</td>`;
    });
    htmlContent += '</tr>';
  });
  
  // Close the HTML
  htmlContent += `
        </tbody>
      </table>
    </body>
    </html>
  `;
  
  // Write to the print window and focus it
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

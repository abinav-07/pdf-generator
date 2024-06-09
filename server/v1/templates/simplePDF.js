exports.createSimpleTemplate = (headerHTML, bodyHTML, footerHTML) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <div class="header">${headerHTML}</div>
        <div class="body">${bodyHTML}</div>
        <div class="footer">${footerHTML}</div>
    </body>
    </html>
`;

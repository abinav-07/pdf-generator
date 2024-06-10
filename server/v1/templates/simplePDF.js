exports.createSimpleTemplate = ( bodyHTML) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            .body {
                padding: 1in 0.75in;
            }
        </style>
    </head>
    <body>
        <div class="body">${bodyHTML}</div>
    </body>
    </html>
`;

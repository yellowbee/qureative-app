export default ({ body, title, initialState }) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
        <script>{window.__APP_INITIAL_STATE__ = ${initialState}}</script>
        <title>${title}</title>
        <meta charset="UTF-8"/>
        <title>Title</title>
        <style type="text/css" media="screen">
                {"canvas { background: url(images/maze-01-wharf.jpg); background-size: 450px 450px;"}
        </style>

        </head>
        <body>
            <div id="root">${body}</div>
            <script src="/lib/blockly-interpreter/acorn.js"></script>
            <script src="/lib/blockly-interpreter/interpreter.js"></script>
            <script src="/bundle.js"></script>
        </body>
    </html>
    `;
};

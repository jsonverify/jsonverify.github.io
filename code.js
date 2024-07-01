document.addEventListener('DOMContentLoaded', function() {
    // Initialize Ace editor
    var editor = ace.edit("json-input");
    editor.setTheme("ace/theme/twilight");
    editor.session.setMode("ace/mode/json");
    editor.setShowPrintMargin(false);

    var messageParagraph = document.getElementById('message');

    function validateAndFormatJSON() {
        try {
            var json = JSON.parse(editor.getValue());
            messageParagraph.textContent = "Valid JSON";
            messageParagraph.style.color = "green";
            editor.session.setValue(JSON.stringify(json, null, 4));
            editor.session.clearAnnotations();
        } catch (e) {
            messageParagraph.textContent = "Invalid JSON: " + e.message;
            messageParagraph.style.color = "red";
            editor.session.setAnnotations([{
                row: e.at - 1,
                column: 0,
                text: e.message,
                type: "error"
            }]);
        }
    }

    document.getElementById('validate-btn').addEventListener('click', validateAndFormatJSON);

    document.getElementById('load-btn').addEventListener('click', function() {
        var url = prompt("Enter the URL of the JSON file:");
        
        if (url) {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(json => {
                    editor.session.setValue(JSON.stringify(json, null, 4));
                    validateAndFormatJSON();
                })
                .catch((error) => {
                    messageParagraph.textContent = "Error: " + error.message;
                    messageParagraph.style.color = "red";
                    editor.session.setAnnotations([{
                        row: 0,
                        column: 0,
                        text: error.message,
                        type: "error"
                    }]);
                });
        }
    });

    document.getElementById('download-btn').addEventListener('click', function() {
        var jsonContent = editor.getValue();
        if (jsonContent) {
            var blob = new Blob([jsonContent], { type: "application/json" });
            var url = URL.createObjectURL(blob);

            var downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = "edited_json.json";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
        }
    });
});

 document.addEventListener('DOMContentLoaded', function() {
    // Initialize Ace editor
    var editor = ace.edit("json-input");
    // ... the rest of your editor initialization code ...

    var messageParagraph = document.getElementById('message');

    // ... other event listeners (validate, load, download)

    var clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            console.log('Clear button clicked'); // Debugging line
            // Clear the editor content
            editor.session.setValue('');
            // Reset any displayed messages or annotations
            messageParagraph.textContent = "";
            messageParagraph.style.color = ""; // Resetting to default color
            editor.session.clearAnnotations();
        });
    } else {
        console.error('Clear button element not found'); // Debugging line
    }

    // ... the rest of the code ...
});





document.addEventListener('DOMContentLoaded', function () {
    // Assuming you've initialized Ace Editor as "editor"
    var editor = ace.edit("json-input"); // replace "json-input" with your editor's container ID
    editor.setTheme("ace/theme/monokai"); // or any other theme
    editor.getSession().setMode("ace/mode/json");

    var messageParagraph = document.getElementById('message');
    var toggleFormatBtn = document.getElementById('toggle-format-btn');
    var isMinified = false; // Track whether the JSON is minified

    toggleFormatBtn.addEventListener('click', function () {
        var content = editor.getValue();
        var result;
        
        try {
            var json = JSON.parse(content);

            // Toggle between minify and prettify
            if (isMinified) {
                result = JSON.stringify(json, null, 4);
                toggleFormatBtn.textContent = 'Minify JSON';
            } else {
                result = JSON.stringify(json);
                toggleFormatBtn.textContent = 'Prettify JSON';
            }

            isMinified = !isMinified;
            editor.setValue(result, -1); // -1 moves the cursor to the start

            messageParagraph.style.color = "green";
            messageParagraph.textContent = 'JSON formatted successfully.';

        } catch (e) {
            messageParagraph.style.color = "red";
            messageParagraph.textContent = 'Invalid JSON: ' + e.message;
        }
    });

    // ... rest of your Ace Editor related code ...
});

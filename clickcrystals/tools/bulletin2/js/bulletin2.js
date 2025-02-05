
const input = document.getElementById('input');
const output = document.getElementById('output');

document.addEventListener('keyup', onKeyPress);

function onKeyPress(e) {
    var ann = readMarkdown(input.value);
    output.value = JSON.stringify(ann);
}


function readMarkdown(str) {
    var lines = str.split('\n');
    var title = "Release <version>";
    var desc = "Check out the new release, ClickCrystals v<version>!";
    var fields = [];

    var currentField = null;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.trim().length == 0)
            continue;
        if (line.match(/\s*```\w*\s*/gm) != null)
            continue;

        if (line.match(/\s*Version:\s*.+\s*/gmi) != null) {
            line = line.replace(/\s*Version:\s*/gmi, '');
            title = "Release " + line
            desc = "Check out the new release, ClickCrystals v" + line + "!";
        }
        else if (line.match(/\s*Desc(ription)?:\s*.+\s*/gmi) != null) {
            line = line.replace(/\s*Desc(ription)?:\s*/gmi, '');
            desc = line
        }
        else if (line.match(/\s*.+:\s*/gm) != null) {
            line = line.trim().replace(/:/, '');
            if (currentField != null)
                fields.push(currentField);
            currentField = new Field(line, '');
        }
        else if (line.match(/\s*-\s*.+\s*/gm) != null) {
            line = line.trim().replace(/\s*-\s*/, '');
            if (currentField != null) {
                currentField.desc += currentField.desc.length == 0 ? '' : ', ';
                currentField.desc += line;
            }
        }
    }

    return new Ann(title, desc, fields);
}

class Ann {
    title
    desc
    fields

    constructor(title, desc, fields) {
        this.title = title;
        this.desc = desc;
        this.fields = fields;
    }
}

class Field {
    title
    desc

    constructor(title, desc) {
        this.title = title;
        this.desc = desc;
    }
}
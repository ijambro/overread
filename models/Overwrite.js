'use strict';

module.exports = class Overwrite {
    constructor(id, sourceId, parentId, type, title, genre, userName, text, description) {
        this.id = id;
        this.sourceId = sourceId;
        this.parentId = parentId;
        this.type = type;
        this.title = title;
        this.genre = genre;
        this.userName = userName;
        this.timestamp = new Date();
        // this.before = before;
        // this.after = after;
        // this.instances = instances;
        // this.page = page;
        // this.line = line;
        // this.char = char;
        
        this.text_plain = text;
        this.text_html = text.replace(/\r\n/g, "<br>");
        
        this.description = description;
    }

    toString() {
        return JSON.stringify(this);
    }

    display() {
        console.log(toString());
    }
}


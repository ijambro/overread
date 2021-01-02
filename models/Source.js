'use strict';

module.exports = class Source {
    constructor(id, type, title, author, genre, coverImageUrl, userName, text) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.coverImageUrl = coverImageUrl;
        this.userName = userName;
        this.timestamp = new Date();

        this.text_plain = text;
        this.text_html = text.replace(/\r\n/g, "<br>");
    }

    toString() {
        return JSON.stringify(this);
    }

    display() {
        console.log(toString());
    }
}
'use strict';

module.exports = class Overwrite {
    constructor(id, userId, time, sourceId, before, after, instances, page, line, char, label, notes) {
        this.id = id;
        this.userId = userId;
        this.time = time;
        this.sourceId = sourceId;
        this.before = before;
        this.after = after;
        this.instances = instances;
        this.page = page;
        this.line = line;
        this.char = char;
        this.label = label;
        this.notes = notes;
    }

    toString() {
        return JSON.stringify(this);
    }

    display() {
        console.log(toString());
    }
}


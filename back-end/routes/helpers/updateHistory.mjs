import History from '../../db/models/history.mjs';
import Delta from 'fossil-delta';

async function checkValidHistory(history) {
    history.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
    for (var i = 0; i < history.length - 1; i++) {
        var current = history[i];
        var next = history[i + 1];
        if (current._id != next.previousID) {
            return false;
        }
    }
    return true;
}

export async function updateHistory(title, editText, previousText, username) {
    var history = await History.find({ title: title });
    if(await checkValidHistory(history) == false)
    {
        console.log("history is invalid");
        return false;
    }
    if(history.length == 0) {
        console.log("no edits");
        lastID = null;
    } else {
        var lastID = history[history.length - 1]._id;
    }

    var delta = Delta.create(editText, previousText);

    var newHistory = new History({
        delta: delta,
        title: title,
        timestamp: Date.now(),
        username: username,
        previousID: lastID,
        outputSize: Delta.outputSize(delta),
    });
    
    await newHistory.save();

    return true;
}
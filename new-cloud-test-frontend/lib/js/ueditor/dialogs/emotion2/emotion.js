var textHTML = [];
for (var i = 1; i <=80; i++) {
    textHTML.push("<div class='face face-" + i + "' onclick='InsertSmiley(" + i + ")'></div>");
}
textHTML = textHTML.join("");
$G("face_container").innerHTML = textHTML;
function InsertSmiley(i) {
    editor.execCommand('insertHtml', "[EMOT]" + i+"[/EMOT]");
    dialog.close();
}
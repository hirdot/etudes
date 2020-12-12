function createArray(buf) {
    var arr = new Array();
    var lines  = buf.split("\n");
    for (var i = 0; i < lines.length;++i) {
        var cells = lines[i].replace("\r","").split(",");
        if( cells.length != 1 ) {
            arr.push(cells);
        }
    }
    return arr;
}

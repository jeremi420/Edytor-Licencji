function JSONArrayFromUrl(url, callback){
    let array = [], row = [];
    $.getJSON(url, function(JSONData){
        $.each(JSONData,function(index,object){
            for(let key in object){
                row.push(object[key]);
            }
            array.push(row);
            row = [];
        });
        callback(array);
    }).fail(function(){alert("download json data failed!");})
}

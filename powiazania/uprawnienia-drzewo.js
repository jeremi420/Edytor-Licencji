$(document).ready(function(){
    var Uprawnienia = new dhtmlXTreeObject("uprawnienia","100%","100%",0);
    Uprawnienia.setImagePath("../dhtmlxSuite_v51_pro_eval/sources/dhtmlxUprawnienia/codebase/imgs/dhxtree_skyblue");
    Uprawnienia.enableDragAndDrop(true);
    Uprawnienia.enableMercyDrag(true);
    JSONArrayFromUrl("http://192.168.110.10:8160/bart/uprawnienia",function(JSONArray){
        for (let i = 0; i < JSONArray.length; i++) {
            JSONArray[i].splice(1,0,0);
        }
        JSONArray.shift();
        Uprawnienia.parse(JSONArray,"jsarray");
    });
    Uprawnienia.attachEvent('onDragIn', function(sId, tId, id, sObject, tObject){
        return false; //zablokuj upuszczanie na drzewo
    });
});
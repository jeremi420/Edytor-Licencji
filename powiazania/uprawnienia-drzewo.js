var Uprawnienia
$(document).ready(function(){
    Uprawnienia = new dhtmlXTreeObject("uprawnienia","100%","100%",0);
    Uprawnienia.setImagePath("../dhtmlxSuite_v51_pro_eval/sources/dhtmlxTree/codebase/imgs/dhxtree_skyblue/");
    Uprawnienia.enableCheckBoxes(1);
    Uprawnienia.enableDragAndDrop(true);
    Uprawnienia.enableMultiselection(true);
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
function copySelected(){
    let rekordyId = Uprawnienia.getAllChecked().split(',');
    for (let i = 0; i < rekordyId.length; i++) {
        let rekordId = rekordyId[i];
        let text = Uprawnienia.getItemText(rekordId);
        Powiazania.insertNewItem(0,Powiazania.hasChildren(0),text);
    }
}
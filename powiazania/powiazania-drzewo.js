var Powiazania;
var otwartyModul;
var newRights = [];
$(document).ready(function(){
    Powiazania = new dhtmlXTreeObject("powiazania","100%","100%",0);
    Powiazania.setImagePath("../dhtmlxSuite_v51_pro_eval/sources/dhtmlxTree/codebase/imgs/dhxtree_skyblue/");
    Powiazania.enableDragAndDrop(true);
    Powiazania.attachEvent('onDrag',function(sId, tId, id, sObject, tObject){
        if(tId != 0){
            return false;
        }
        newRights.push(sObject.getItemText(sId));
        return true;
    });
    Powiazania.attachEvent('onBeforeDrag',function(sId){
        return false;
    });
});
function saveChanges(){
    $.each(newRights,function(index,value){
        fetch("http://192.168.110.10:8160/bart/powiazania?modulid="+otwartyModul+"&right="+value,{
            method:'PUT'
        })
    });
}

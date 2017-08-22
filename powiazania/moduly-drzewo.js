$(document).ready(function(){
    var Moduly = new dhtmlXTreeObject("moduly","100%","100%",0);
    Moduly.setImagePath("../dhtmlxSuite_v51_pro_eval/sources/dhtmlxTree/codebase/imgs/dhxtree_skyblue/");
    JSONArrayFromUrl("http://192.168.110.10:8160/bart/moduly",function(JSONArray){
        for (let i = 0; i < JSONArray.length; i++) {
            JSONArray[i] = [JSONArray[i][0],0,JSONArray[i][1]];
        }
        Moduly.parse(JSONArray,"jsarray");
    });
    Moduly.attachEvent('onSelect',function(id){
        JSONArrayFromUrl("http://192.168.110.10:8160/bart/powiazania?modulid="+id,function(JSONArray){
            for (let i = 0; i < JSONArray.length; i++) {
                let rightName = JSONArray[i][0];
                JSONArray[i] = [i+1,0,rightName];
            }
            Powiazania.deleteChildItems(0);
            if(JSONArray.length > 0){
                Powiazania.parse(JSONArray,"jsarray");
            }
            otwartyModul = Moduly.getItemText(id);
            document.getElementById('info').innerHTML = 'otwarty element :' + otwartyModul;
        });
    });
});
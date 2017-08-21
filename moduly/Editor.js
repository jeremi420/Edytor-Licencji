var Grid, EditedRows = [];
$(document).ready(function(){
    Grid = new dhtmlXGridObject('grid');
    Grid.setImagePath('./dhtmlxSuite_v51_pro_eval/sources/dhtmlxGrid/codebase/imgs/dhxgrid_skyblue');
    Grid.setHeader("id,nazwa,rodzaj,opis");
    Grid.setInitWidths("100,200,200,*");
    Grid.setColAlign("left,left,left,left");
    Grid.setColTypes("ron,edtxt,edtxt,edtxt");
    Grid.setColSorting("int,str,str,str");
    JSONArrayFromUrl("http://192.168.110.10:8160/bart/moduly",function(data){
        Grid.parse(data,"jsarray");   
    });
    Grid.init();
    Grid.attachEvent('onEditCell',function(stage,rId,cInd,nValue,oValue){
        if(stage == 2 && !_.contains(EditedRows,rId)){
            EditedRows.push(rId);
        }
        return nValue;
    });
});
function AddRow(){
    let newRowId = Grid.uid();
    Grid.addRow(newRowId,["","","",""]);
    EditedRows.push[newRowId];
    Grid.selectRowById(newRowId);
}

function SaveChanges(){
    $.each(EditedRows,function(id,rId){
        let rowData = getRowData(rId);
        let Message;
        let httpMethod;
        if(rowData.length!=4){
            alert("zła ilość elementów");
        }
        let index = rowData[0];
        let nazwa = rowData[1];
        let rodzaj = rowData[2];
        let opis = rowData[3];
        httpMethod = index? "post" : "put";
        Message = "<root>";
        if(index){
            Message+="<id>"+ index +"</id>";
        }
        Message +="<nazwa>"+ nazwa +"</nazwa>";
        Message+="<rodzaj>"+ rodzaj +"</rodzaj>";
        Message+="<opis>"+ opis +"</opis>";
        Message+="</root>"
        fetch("http://192.168.110.10:8160/bart/moduly",{
            method: httpMethod,
            headers: {
              'Accept': 'text/xml',
              'Content-Type': 'text/xml'
            },
            mode: "no-cors",
            body: Message
        });
    });
}
upuprawnieni
function getRowData(rId){
    let array = [];
    for(let i = 0;i<Grid.getColumnsNum();i++){
        array.push(Grid.cells(rId,i).getValue());
    }
    return array;
}
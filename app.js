const XLSX = require('xlsx');

function leerExcel(ruta){
    const workbook = XLSX.readFile(ruta);
    const workbookSheet = workbook.SheetNames;
    const sheet = workbookSheet[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
    console.log(dataExcel[0]);

    //console.log(dataExcel);
    for (const itemeFila of dataExcel){
        //console.log(itemeFila['Province_State']);
        //console.log(itemeFila['4/27/21']);
    }
}
leerExcel('time_series_covid19_deaths_US.xlsx');

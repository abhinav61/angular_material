import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';


@Component({
  selector: 'app-past-training-tss',
   templateUrl: './past-training-tss.component.html',
  styleUrls: ['./past-training-tss.component.css'],
      
})
export class PastTrainingTssComponent {
  alert: boolean = false; 
   gridApi : any;
   columnApi: any;
   
    @ViewChild('agGrid') agGrid: AgGridAngular;
    title = 'app';

    columnDefs = [
        {headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true,editable: true },
        {headerName: 'Model', field: 'model', sortable: true, filter: true, editable: true},
        {headerName: 'Price', field: 'price', sortable: true, filter: true, editable: true}
    ];

    rowData: any;

    constructor(private http: HttpClient) {

    }

    ngOnInit() {
 
      this.rowData = this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/rowData.json')
      }
      save() {
    console.log("Save", this.rowData);
  }

  addRow() {
    let newRows = [{ make: "", model: "", price: "" }];
    this.agGrid.api.updateRowData({ add: newRows });
    this.agGrid.api.setPinnedTopRowData(newRows);
  }

  onGridReady(params) {
    this.agGrid.api = params.api;
    this.columnApi = params.columnApi;
  }

  updateRow() {
    this.rowData = this.getAllRows();
    this.agGrid.api.setRowData(this.getAllRows()); // Refresh grid
    console.log(this.rowData[this.rowData.length - 1]);
  }

  getAllRows() {
    let rd = [];
    this.agGrid.api.forEachNode(node => rd.push(node.data));
    return rd;
    this.agGrid.api.setRowData(this.getAllRows());
  }
  //  save(){
  //    console.log('Save', this.rowData);
  //  }
  
  // addRow() {
  //   let newRows = [{  make: "", model: "", price: '' }];
  //   this.agGrid.api.applyTransaction({ add: newRows});
  //   this.agGrid.api.setPinnedTopRowData(newRows)
    
    
  //   }
    
  
  // onGridReady(params) {
  //   this.agGrid.api = params.api;
  //   this.columnApi = params.columnApi;
    
  // }

  //  updateRow(){
    
  //     this.agGrid.api.setRowData(this.rowData); // Refresh grid
  //     console.log(this.rowData);
  //   }
  
  gridOptions = {
  }
    
     
  //     let rowsSelection = this.gridOptions.api.getSelectedRows();
  //     console.info(rowsSelection);
  //   }
  //   // this.agGrid.getRowNodeId = function(data) {
  //   //   return data.id;
  // };
  
  // var rowNode = this.gridApi.getRowNode('ID');
  // rowNode.setSelected(true);
  // rowNode.setData('data');
  
  // updateRow(){
  //   let newRows= RowNode;
  //   newRows = this.gridApi.getRowNode(0).node;
     
  //   this.gridApi.RowNode.setSelected(true);
  //   this.gridApi.RowNode.setData(newRows)
  // }
  //  updateRow(){
     
  //     let newRows;
  //     //get the first row
  //     newRows = this.gridApi.getRowNode(0).node;
  //     this.gridApi.applyTransaction({ update: [newRows] });
  //     this.gridApi.rowEdit.setRowsClean( newRows );
  // }
  // updateRow(){
  //   let ab
  //   this.http.get(ab).subscribe(ab=>{
  //   this.gridApi.setRowData([]);
  //   var newData = ab;
  //   this.gridApi.updateRowData({add: newData});
  //   });
  // }
  
  
  
   deleteRow(){
    var selectedData = this.agGrid.api.getSelectedRows();
   this.agGrid.api.applyTransaction({ remove: selectedData });
   this.alert = true;

  
   }
   closeAlert(){
     this.alert=false;
   }
   }
    


import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss']
})
export class ViewBillProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'category',
    'price',
    'quantity',
    'total',
  ];
  dataSource: any[] = []; // Initialize as empty array
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              public dialogRef: MatDialogRef<ViewBillProductsComponent>) { }

  ngOnInit() {
    console.log('Dialog Data:', this.dialogData);
    this.data = this.dialogData.data;

    // Check if productDetails is an array (assuming it is an array of objects)
    if (Array.isArray(this.data.productDetails)) {
      this.dataSource = this.data.productDetails;
    }
  }
}

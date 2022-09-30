import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const MEDIATYPE = 'application/pdf';
const PDF_EXTENSION = '.pdf';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  /**
   * @description this will export array data to excel format
   * @param json form in array
   * @param excelFileName any name can be given
   */
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  /**
   * @description sa ve the file with in inputted file name.
   * @param buffer 
   * @param fileName 
   */
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public exportAsPDFFile(json: any, fileName: string) {
    var blob = new Blob([json], { type: MEDIATYPE });
    saveAs(blob, fileName + '_export_' + new Date().getTime() + PDF_EXTENSION);
  }

}

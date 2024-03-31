import { Component, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "app-sheet",
  templateUrl: "./sheet.component.html",
  styleUrls: ["./sheet.component.css"],
})
export class SheetComponent {
  activeSheet = 1;
  data = {
    1: [
      ["1", "", "", "", ""],
      ["2", "", "", "", ""],
      ["3", "", "", "", ""],
      ["4", "", "", "", ""],
      ["5", "", "", "", ""],
      ["6", "", "", "", ""],
      ["7", "", "", "", ""],
      ["8", "", "", "", ""],
    ],
    2: [
      ["1", "", "", "", ""],
      ["2", "", "", "", ""],
      ["3", "", "", "", ""],
      ["4", "", "", "", ""],
    ],
  };

  @ViewChild("tableContainer") tableContainer: ElementRef;

  switchSheet(sheetNum: number): void {
    this.activeSheet = sheetNum;
  }

  saveData(): void {
    console.log("Datos guardados:", this.data[this.activeSheet]);
    alert("Datos guardados");
  }

  ngOnInit() {
    this.tableContainer.nativeElement.addEventListener("keydown", (event) => {
      const keyCode = event.keyCode;
      const currentCell = document.activeElement as HTMLElement;
      const currentRowIndex = (currentCell.parentElement as HTMLTableRowElement)
        .rowIndex;
      const currentCellIndex = (currentCell as HTMLTableCellElement).cellIndex;
      let nextCell;

      switch (keyCode) {
        case 37: // Left arrow
          nextCell =
            currentCellIndex > 0
              ? (currentCell.parentElement as HTMLTableRowElement).cells[
                  currentCellIndex - 1
                ]
              : currentCell;
          break;
        case 38: // Up arrow
          nextCell =
            currentRowIndex > 0
              ? (
                  currentCell.parentElement
                    .previousElementSibling as HTMLTableRowElement
                ).cells[currentCellIndex]
              : currentCell;
          break;
        case 39: // Right arrow
          nextCell =
            currentCellIndex <
            (currentCell.parentElement as HTMLTableRowElement).cells.length - 1
              ? (currentCell.parentElement as HTMLTableRowElement).cells[
                  currentCellIndex + 1
                ]
              : currentCell;
          break;
        case 40: // Down arrow
          nextCell =
            currentRowIndex <
            (currentCell.parentElement.parentElement as HTMLTableElement).rows
              .length
              ? (
                  currentCell.parentElement
                    .nextElementSibling as HTMLTableRowElement
                ).cells[currentCellIndex]
              : currentCell;
          break;
      }
      if (nextCell !== currentCell) {
        nextCell.focus();
        event.preventDefault();
      }
    });
  }
}

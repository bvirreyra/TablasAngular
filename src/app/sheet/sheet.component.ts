import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-sheet",
  templateUrl: "./sheet.component.html",
  styleUrls: ["./sheet.component.css"],
})
export class SheetComponent {
  [x: string]: any;
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

  @HostListener("window:keydown", ["$event"])
  @ViewChild("tableContainer")
  tableContainer: ElementRef<HTMLDivElement>;

  constructor() {}

  ngoninit(): void {
    this.getData();
  }

  getData(): void {
    // this.http.get('URL_DE_TU_API').subscribe((response: any) => {
    //   this.data = response;
    // });
  }

  switchSheet(sheetNum: number): void {
    this.activeSheet = sheetNum;
  }

  saveData(): void {
    console.log("Datos guardados:", this.data[this.activeSheet]);
    alert("Datos guardados");
  }
  @HostListener("window:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    const currentCell = document.activeElement as HTMLTableCellElement;
    const currentRowIndex = (currentCell.parentElement as HTMLTableRowElement)
      .rowIndex;
    const currentCellIndex = currentCell.cellIndex;
    let nextCell: HTMLTableCellElement | undefined;

    switch (key) {
      case "ArrowLeft": // Left arrow
        nextCell =
          currentCellIndex > 0
            ? (currentCell.parentElement as HTMLTableRowElement).cells[
                currentCellIndex - 1
              ]
            : currentCell;
        break;
      case "ArrowUp": // Up arrow
        nextCell =
          currentRowIndex > 1
            ? (
                currentCell.parentElement
                  .previousElementSibling as HTMLTableRowElement
              ).cells[currentCellIndex]
            : currentCell;
        break;
      case "ArrowRight": // Right arrow
        nextCell =
          currentCellIndex <
          (currentCell.parentElement as HTMLTableRowElement).cells.length - 1
            ? (currentCell.parentElement as HTMLTableRowElement).cells[
                currentCellIndex + 1
              ]
            : currentCell;
        break;
      case "ArrowDown": // Down arrow
        nextCell =
          currentRowIndex <
            (currentCell.parentElement.parentElement as HTMLTableElement).rows
              .length && currentRowIndex > 0
            ? (
                currentCell.parentElement
                  .nextElementSibling as HTMLTableRowElement
              ).cells[currentCellIndex]
            : currentCell;
        break;
    }

    if (nextCell && nextCell !== currentCell) {
      nextCell.focus();
      event.preventDefault();
    }
  }
}

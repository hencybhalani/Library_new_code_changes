// import { Component, OnInit } from '@angular/core';
// import { EBookModalComponent } from '../e-book-modal/e-book-modal.component';
// import { ToastrService } from 'ngx-toastr';
// import { UserService } from '../../_service/UserService';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { SharedModule } from '../../shared/shared.module';
// import { MaterialModule } from '../../material.module';
// import { MatSelectModule } from '@angular/material/select';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-e-book',
//   standalone: true,
//   imports: [EBookModalComponent, CommonModule, SharedModule, MaterialModule, MatSelectModule, FormsModule],
//   templateUrl: './e-book.component.html',
//   styleUrls: ['./e-book.component.css']
// })
// export class EBookComponent implements OnInit {
//   Ebooks: any = [];
//   paginatedEbooks: any = [];
//   currentPage: number = 1;
//   itemsPerPage: number = 6;
//   totalPages: number = 1;
//   pages: number[] = [];
//   userType: any;
//   booklist: any[] = [];
//   selectedCategoryId: any;
//   Book: any[] = [];

//   constructor(private apiService: UserService, private toaster: ToastrService, private router: Router) {
//     const userInfo = this.apiService.getUserInfo();
//     console.log(userInfo);
//     this.userType = userInfo?.userType;
//     this.loadBooks();
//   }

//   ngOnInit(): void {
//     this.apiService.getEbookList().subscribe(data => {
//       this.Book = data;
//       this.Ebooks = data.map((ebook: any) => {
//         if (ebook.storedImage) {
//           ebook.imageUrl = `data:image/jpeg;base64,${ebook.storedImage}`;
//         }
//         if (ebook.storedDocument) {
//           ebook.documentUrl = `data:application/pdf;base64,${ebook.storedDocument}`;
//         }
//         return ebook;
//       });
//       this.updatePagination();
//     });
//   }

//   loadBooks(): void {
//     this.apiService.GetEcategoryList().subscribe(data => {
//       this.booklist = data;
//       console.log(this.booklist);
//     });
//   }

//   updatePagination(): void {
//     this.totalPages = Math.ceil(this.Ebooks.length / this.itemsPerPage);
//     this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
//     this.paginatedEbooks = this.Ebooks.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
//     console.log("paginated", this.paginatedEbooks);
//   }

//   changePage(page: number): void {
//     if (page >= 1 && page <= this.totalPages) {
//       this.currentPage = page;
//       this.updatePagination();
//     }
//   }

//   viewDocument(base64Document: string): void {
//     const byteCharacters = atob(base64Document);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     const blob = new Blob([byteArray], { type: 'application/pdf' });
//     const objectUrl = URL.createObjectURL(blob);

//     const pdfWindow = window.open();
//     if (pdfWindow) {
//       pdfWindow.location.href = objectUrl;
//     }
//   }

//   ebookcomponent(eid: number): void {
//     this.router.navigate(['/dashboard/e-book-deatils', eid]);
//   }

//   openEbookModal(): void {
//     this.router.navigateByUrl('/dashboard/addebook');
//   }

//   filterBooksByCategory(): void {
//     console.log("Filtering books by category");
//     console.log(this.selectedCategoryId);

//     if (!this.selectedCategoryId) {
//       // Show all books if no category is selected
//       this.Ebooks = this.Book;
//     } else {
//       // Filter books based on selected category
//       this.Ebooks = this.Book.filter((ebook: any) => ebook.ecategoryId == this.selectedCategoryId);
      

//     }
//     this.currentPage = 1; // Reset to first page
//     this.updatePagination(); // Update pagination with filtered results
//   }
// }

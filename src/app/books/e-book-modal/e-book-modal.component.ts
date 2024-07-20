// import { CommonModule } from '@angular/common';
// import { Component, Output, EventEmitter } from '@angular/core';
// import { UserService } from '../../_service/UserService';
// import { ToastrService } from 'ngx-toastr';
// import { MaterialModule } from '../../material.module';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { SharedModule } from '../../shared/shared.module';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-e-book-modal',
//   standalone: true,
//   imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule,SharedModule, MatGridListModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatButtonModule
//   ],
//   templateUrl: './e-book-modal.component.html',
//   styleUrls: ['./e-book-modal.component.css']
// })
// export class EBookModalComponent {
//   @Output() closeModalEvent = new EventEmitter<void>();
//   isVisible = false;
//   booklist: any[] = [];
//   selectedImage: File | null = null;
//   selectedFile: File | null = null;
//   newBook: FormGroup;

//   onFileSelected(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];
//       console.log('Selected file:', file.name);
//       // Handle the selected file
//     }
//   }
//   openModal() {
//     this.isVisible = true;
//     console.log("hello");
//   }

//   onImageChange(event: any): void {
//     const image: File = event.target.files[0];
//     if (image) {
//       this.selectedImage = image;
//     } else {
//       this.selectedImage = null;
//     }
//   }

//   onFileChange(event: any): void {
//     const file: File = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//     } else {
//       this.selectedFile = null;
//     }
//   }

//   closeModal(event?: Event) {
//     if (event) {
//       event.stopPropagation();
//     }
//     this.isVisible = false;
//     this.closeModalEvent.emit();
//   }

//   constructor(private apiService: UserService, private toaster: ToastrService, fb: FormBuilder,private router : Router) {
//     this.loadBooks();
//     this.newBook = fb.group({
//       etitle: fb.control('', [Validators.required]),
//       eauthor: fb.control('', [Validators.required]),
//       edescription: fb.control('', [Validators.required,Validators.minLength(10)]),
//       epublisher: fb.control('', [Validators.required]),
//       eprice: fb.control(0, [Validators.required,Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]),
//       image: fb.control(null, [Validators.required]),
//       document: fb.control(null, [Validators.required]),
//       type: fb.control('', [Validators.required]),
//       EcategoryId: fb.control(-1, [Validators.required])
//     });
//   }

//   loadBooks() {
//     this.apiService.GetEcategoryList().subscribe(data => {
//       this.booklist = data;
//       console.log(this.booklist);
//     });
//   }

//   addNewBook() {
//     let formData = new FormData();
//     formData.append('etitle', this.newBook.get('etitle')?.value);
//     formData.append('eauthor', this.newBook.get('eauthor')?.value);
//     formData.append('edescription', this.newBook.get('edescription')?.value);
//     formData.append('epublisher', this.newBook.get('epublisher')?.value);
//     formData.append('eprice', this.newBook.get('eprice')?.value.toString());

//     if (this.selectedImage) {
//       formData.append('image', this.selectedImage);
//     } else {
//       formData.append('image', ''); // Ensure image field is always present
//     }

//     if (this.selectedFile) {
//       formData.append('document', this.selectedFile);
//     } else {
//       formData.append('document', ''); // Ensure document field is always present
//     }

//     formData.append('type', this.newBook.get('type')?.value);
//     formData.append('EcategoryId', this.newBook.get('EcategoryId')?.value);

//     this.apiService.addEBook(formData).subscribe({
//       next: (res) => {
//         console.log(res);
//         if (res.message == 'INSERTED') {
//           this.toaster.success('Book added successfully', 'OK');
//           this.newBook.reset();
//           this.router.navigateByUrl('/dashboard/e-books');
          
//         }
//       },
//       error: (err) => {
//         console.error('Error adding book', err);
//         this.toaster.error('Failed to add book', 'Error');
//       }
//     });
//   }
// }

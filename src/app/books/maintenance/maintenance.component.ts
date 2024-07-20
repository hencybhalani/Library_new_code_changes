import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_service/UserService';
import { ToastrService } from 'ngx-toastr';
import { Router } from 'express';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { Book, BookCategory } from '../../_model/user.model';
import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import { NotificationService } from '../../_service/notification.service';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [MaterialModule,CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.css'
})
export class MaintenanceComponent {
  
  booklist: any[] = [];
  newCategory: FormGroup;
  newBook: FormGroup;
  deleteBook: FormControl;
  BookCatagoryForm={
   
      "id": 0,
      "category": "string",
      "subCategory": "string"
  }
  categoryList: { id: number; displayValue: string }[] = [];

  constructor(
    fb: FormBuilder,
    private apiService: UserService,
    private toaster: ToastrService,private notificationService: NotificationService
  ) {
    this.loadbookname();
    this.newCategory = fb.group({
      bCategory: fb.control('', [Validators.required]),
      bSubCategory: fb.control('', [Validators.required]),
    });

    this.newBook = fb.group({
      title: fb.control('', [Validators.required]),
      author: fb.control('', [Validators.required]),
      price: fb.control(0, [Validators.required,Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]),
      category: fb.control(-1, [Validators.required]),
    });


    this.apiService.getCategories().subscribe({
      next: (res: any) => {
        this.categoryList = res.map((category: any) => ({
          id: category.id,
          displayValue: `${category.category} / ${category.subCategory}`
        }));
        console.log('category', this.categoryList);
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
    this.deleteBook = fb.control('', [Validators.required]);
}

loadbookname() {
  this.apiService.getBooks().subscribe(data => {
    this.booklist = data;
    console.log(this.booklist);
  });
}
addNewCategory() {
  

this.BookCatagoryForm.category=this.newCategory.value.bCategory;
this.BookCatagoryForm.subCategory=this.newCategory.value.bSubCategory;
  this.apiService.addNewCategory(this.BookCatagoryForm).subscribe({
    next: (res:any) => {
      console.log(res);
      if (res.message == 'cannot insert') {
        this.toaster.error('Already Exists!', 'OK');
      } else {
        this.toaster.success('Category are Added Successfully', 'OK');
        this.newCategory.reset();
        this.notificationService.changeMessage(`Category: ${this.BookCatagoryForm.category}, SubCategory: ${this.BookCatagoryForm.subCategory} are added successfully by Admin!`);


      }
    },
  });
}

addNewBook() {
  let book: Book = {
    id: 0,
    title: this.newBook.get('title')?.value,
    author: this.newBook.get('author')?.value,
    price: this.newBook.get('price')?.value,
    ordered: false, // default value
    bookCategoryId: this.newBook.get('category')?.value,
    Title: '',
    Author: '',
    bookCategory: undefined,
    bCategory: '',
    bSubCategory: ''
  };

  this.apiService.addBook(book).subscribe({
    next: (res) => {
      console.log(res);
      if (res.message == 'INSERTED')
         this.toaster.success('Book are Added Successfully', 'OK');
      this.newBook.reset();
      this.notificationService.changeMessage(`Book: ${book.title}, Author: ${book.author} added successfully!`);

    },
  });
}

deleteExistingBook() {
  let id = this.deleteBook.value;
  this.apiService.deleteBook(id).subscribe({
    next: (res:any) => {
      if (res.message == 'deleted')
        this.toaster.success('Book has been Deleted!', 'OK');
      const deletedBook = this.categoryList.find(book => book.id === id);
          this.notificationService.changeMessage(`Book: ${deletedBook?.displayValue} deleted successfully!`);
          this.deleteBook.reset();
      
    },
    error: (err:any) => this.toaster.error('Book does not Exist!', 'OK'),
  });
}
}
 
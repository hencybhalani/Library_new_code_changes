

import { Component } from '@angular/core';
import { Book, BooksByCategory } from '../../_model/user.model';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../_service/UserService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-store',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
export class BookStoreComponent {
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'order',
  ];
  books: Book[] = [];
  booksToDisplay: BooksByCategory[] = [];
  userType:any;

  
  categoriesVisible = false;

  constructor(private apiService: UserService,private toaster: ToastrService) {
    this.loadBooks();
    const userInfo = this.apiService.getUserInfo();
    console.log(userInfo);
    this.userType=userInfo?.userType;
  }

  loadBooks() {
    this.apiService.getBooks().subscribe({
      
      next: (res: Book[]) => {
        
        this.books = res;
        console.log(this.books);
        this.booksToDisplay = [];
        this.organizeBooksByCategory();
      },
      error: (err) => {
        console.error('Error fetching books', err);
      }
    });
  }

  organizeBooksByCategory() {
    for (let book of this.books) {
      let categoryExists = false;
      let categoryBook: BooksByCategory | null = null;

      for (let bookToDisplay of this.booksToDisplay) {
        if (bookToDisplay.bookCategoryId === book.bookCategoryId) {
          categoryExists = true;
          categoryBook = bookToDisplay;
          break;
        }
      }

      if (categoryExists) {
        categoryBook!.book.push(book);
      } else {
        const newCategory = {
          bookCategoryId: book.bookCategoryId,
          bCategory: book.bCategory ?? 'Unknown Category',
          bSubCategory: book.bSubCategory ?? 'Unknown SubCategory',
          book: [book],
          visible: false  // Add visible property for toggling
        };
        this.booksToDisplay.push(newCategory);
      }
    }
  }

 
  toggleSubcategories(category: BooksByCategory) {
    category.visible = !category.visible;
  }
  //remaining complete
  searchBooks(value: string) {
    value = value.toLowerCase();
    this.booksToDisplay = this.booksToDisplay.filter((booksByCategory) => {
      const filteredBooks = booksByCategory.book.filter((book) =>
        book.title.toLowerCase().includes(value)
      );
  
      const categoryMatches = booksByCategory.bCategory.toLowerCase().includes(value) ||
                              booksByCategory.bSubCategory.toLowerCase().includes(value);
  
      booksByCategory.book = filteredBooks;
  
      return filteredBooks.length > 0 || categoryMatches;
    }).filter(category => category.book.length > 0);
  }
  
  orderBooks(book:any){
    debugger;
   this.apiService.orderBook(book).subscribe({
    next: (res:any) =>{
      console.log(res);
      if(res.message =="orderd"){
        book.ordered = true;
        let today = new Date();
        let returnDate = new Date();
        returnDate.setDate(today.getDate() + 10);

        this.toaster.success(
          book.title +
            ' has been ordered! You will have to return on ' +
            returnDate.toDateString(),
          'OK'
        );
      }else{
        this.toaster.info( 'You already have 3 orders pending to return.','OK');
      }
    },

   });
  }
 
}


export interface userregister{
    id?:number;
    username?:string;
    email:string;
    phone?:string;
    department? :string;
    password:string;
    userType?:UserType;
    accountStatus?:AccountStatus;
    createdOn?:string;

}
export enum AccountStatus {
    UNAPPROVED,
    ACTIVE,
    BLOCKED
}

export enum UserType{
    ADMIN,
    STUDENT,
    
}

export interface BookCategory {
    id: number;
    bCategory: string;
    bsubCategory: string;
  }
  
  export interface Book {
    id: number;
    title: string;
    Title: string;
    author: string;
    Author: string;
    price: number;
    ordered: boolean;
    bookCategoryId?: number;
    bookCategory?: BookCategory;
    bCategory?: string;
    bSubCategory?: string;
  }
  
  export interface BooksByCategory {
    bookCategoryId: number|undefined  ;
    bCategory: string;
    bSubCategory: string;
    book: Book[];
    visible?: boolean;
  }
  
  export interface Order {
    id: number;
    userId: number;
    userName: string | null;
    BookId: number;
    Book : Book;
    bookTitle: string;
    OrderDate: string;
    Returned: boolean;
    ReturnedDate: string | null;
    FinePaid: number;
  }
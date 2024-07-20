import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSource = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSource.asObservable();

  addToWishlist(ebook: any) {
    const currentWishlist = this.wishlistSource.value;
    if (!currentWishlist.some(item => item.eid === ebook.eid)) {
      this.wishlistSource.next([...currentWishlist, ebook]);
    }
  }
}

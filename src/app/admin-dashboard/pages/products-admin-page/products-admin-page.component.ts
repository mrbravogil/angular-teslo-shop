import { ProductTableComponent } from "@/products/components/product-table/product-table.component";
import { ProductsService } from "@/products/services/products.service";
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { PaginationService } from "@/shared/components/pagination/pagination.service";
import { Component, inject, signal } from '@angular/core';
import { rxResource } from "@angular/core/rxjs-interop";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'products-admin-page',
  imports: [ProductTableComponent, PaginationComponent, RouterLink],
  templateUrl: './products-admin-page.component.html',
  
})
export class ProductsAdminPageComponent {
  
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  productsPerPage = signal(10);
  
  
  productsResource = rxResource({
    params: () => ({ 
      page: this.paginationService.currentPage() - 1, limit: this.productsPerPage()
    }),
    stream: ({ params }) => 
      this.productsService.getProducts({
      offset: params.page * params.limit,
      limit: params.limit,
    }),
  
  });

 }

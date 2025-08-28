import { ProductCardComponent } from "@/products/components/product-card/product-card.component";
import { Options, ProductsService } from '@/products/services/products.service';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { PaginationService } from "@/shared/components/pagination/pagination.service";
import { TitleCasePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, TitleCasePipe, PaginationComponent],
  templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenderPageComponent { 

  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  
  limit  = signal(9);
  offset = signal(0);
  gender = toSignal(this.route.params.pipe(map(({gender}) => gender)));


  readonly params = computed<Options>(() => ({
    limit: this.limit(),
    offset: this.offset(),
    gender: this.gender(),
  }));

  productsResource = rxResource({
    params: () => ({gender: this.gender(), page: this.paginationService.currentPage() - 1}),
    stream: ({ params }) => this.productsService.getProducts({
    gender: params.gender,
    offset: params.page * 9
    }),
    
  });
}

// product-card.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { ProductCardComponent, PRODUCT_API, ProductApi } from './product-card.component';

describe(ProductCardComponent.name, () => {
  it('renders title from PRODUCT_API', async () => {
    const mockProductApi: ProductApi = {
      getTitle: () => 'Angular T-shirt',
    };

    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    })
      .overrideProvider(PRODUCT_API, { useValue: mockProductApi })
      .compileComponents();

    const fixture = TestBed.createComponent(ProductCardComponent);
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[data-testid="title"]')?.textContent).toContain('Angular T-shirt');
  });
});

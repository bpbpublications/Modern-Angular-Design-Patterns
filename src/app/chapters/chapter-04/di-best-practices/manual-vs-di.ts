// ============================================================================
// REFERENCE FILE ONLY: Best Practices For Using DI In Angular
// ============================================================================
// This file is kept verbatim for reference and is intentionally never imported.
// The chapter's live DI demo lives in ../di-service-in-service instead. The
// book shows two one-line fragments — manual instantiation vs DI.
// ============================================================================
import { Component, inject } from '@angular/core';
import { ProductService } from '../di-service-in-service/product.service';

const productService = new ProductService();  // Wrong: Manual Instantiation

@Component({ selector: 'app-di-best-practices', template: '' })
export class DiBestPracticesExample {
  private productService = inject(ProductService);
}

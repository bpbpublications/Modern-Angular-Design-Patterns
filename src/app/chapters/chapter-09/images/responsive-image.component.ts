// "Responsive image loading" — ngSrc/ngSrcset/sizes usage.
// The IMAGE_LOADER provider maps ngSrc + width to product[-width].jpg asset naming.
import { Component } from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-responsive-image',
  imports: [NgOptimizedImage],
  providers: [{
    provide: IMAGE_LOADER,
    useValue: (config: ImageLoaderConfig) => {
      if (!config.width) return config.src;
      const dot = config.src.lastIndexOf('.');
      return dot === -1
        ? `${config.src}-${config.width}`
        : `${config.src.slice(0, dot)}-${config.width}${config.src.slice(dot)}`;
    },
  }],
  template: `
    <img
      ngSrc="/assets/images/product.jpg"
      width="600"
      height="400"
      alt="Product"
      sizes="(max-width: 600px) 100vw, 600px"
      ngSrcset="300w, 600w"
    />
  `,
})
export class ResponsiveImageComponent {}

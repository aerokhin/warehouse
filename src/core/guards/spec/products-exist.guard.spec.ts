import { ProductMultipleGuard } from '../product-multiple.guard';

describe('ProductsExistGuard', () => {
  it('should be defined', () => {
    expect(new ProductMultipleGuard()).toBeDefined();
  });
});

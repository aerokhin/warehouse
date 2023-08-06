import { ProductsExistGuard } from '../products-exist.guard';

describe('ProductsExistGuard', () => {
  it('should be defined', () => {
    expect(new ProductsExistGuard()).toBeDefined();
  });
});

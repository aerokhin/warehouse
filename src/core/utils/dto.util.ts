export class DtoUtil {
  static toDto<T>(entity: any, dto: T): T {
    return Object.keys(dto)
      .reduce<T>((acc, key) => {
        acc[key] = entity[key]

        return acc;
      }, {} as T);
  }
}

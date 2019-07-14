export interface EntityState<V> {
  ids: string[] | number[];
  entities: { [id: number]: V };
}

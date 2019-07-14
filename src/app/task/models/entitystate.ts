export interface EntityState<V> {
  ids: number[];
  entities: { [id: number]: V };
}

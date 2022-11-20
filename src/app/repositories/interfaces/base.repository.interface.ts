export interface BaseRepositoryInterface {
  findById(id: number): Promise<any>
  getAll()
  getAllAndCount(): Promise<{ rows: any[]; count: number }>
  findByCondition(args: object): Promise<any>
  findOrCreateByCondition(args: object): Promise<any>
}

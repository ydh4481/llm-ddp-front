export interface Database {
  id: number;
  name: string;
  description: string;
  connection_info: string;
  db_type: string;
  init_step: number;
}

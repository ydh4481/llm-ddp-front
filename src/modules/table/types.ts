export interface Database {
  name: string;
  description: string;
  db_type: string;
  connection_info: string;
  id?: number;
}

export interface Schema {
  schema_name: string;
}

export interface Table {
  database_id: number;
  name: string;
  table_description: string;
  schema_name: string;
}

export interface Column {
  name: string;
  description: string;
  data_type: string;
  default_value: string | null;
  column_seq: number;
  is_nullable: boolean;
  is_primary_key: boolean;
  is_unique: boolean;
  is_foreign_key: boolean;
  foreign_key_table: string | null;
  foreign_key_column: string | null;
}
export interface MetaInfo {
  schema_name: string;
  table_name: string;
  table_description: string;
  columns: Column[];
}

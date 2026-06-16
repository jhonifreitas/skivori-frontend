export interface IBase {
  id: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

export interface IError {
  error: Error;
  statusCode: number;
}

export type TApiOption = {
  tags?: string[];
  headers?: HeadersInit;
  noAuth?: boolean;
  query?: {
    [_: string]:
      | string
      | number
      | boolean
      | Date
      | string[]
      | number[]
      | undefined
      | null;
  };
};

export type TFilterList = {
  search?: string;
  skip?: number;
  take?: number;
  orderBy?: string;
  showArchived?: boolean;
  orderDirection?: "asc" | "desc";
};

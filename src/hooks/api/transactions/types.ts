export interface Transaction {
  id: string;
  amount: number;
  type: string; 
  direction: string; 
  description: string;
  status: string;
  balanceAfter: number;
  walletId: string;
  refId: string;
  refType: string;
  projectId: string;
  milestoneId?: string;
  companyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  unpaged: boolean;
  paged: boolean;
}

export interface Page<T> {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  last: boolean;
  first: boolean;
  size: number;
  content: T[];
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: string;
  timestamp: string;
}
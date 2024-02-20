export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserDataAllResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserData[];
}

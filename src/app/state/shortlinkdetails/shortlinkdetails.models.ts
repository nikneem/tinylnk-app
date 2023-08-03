export interface IShortLinksListDto {
  page: number;
  pageSize: number;
  totalEntries: number;
  totalPages: number;
  shortLinks: Array<IShortLinkDetailsDto>;
}
export interface IShortLinkDetailsDto {
  id: string;
  shortCode: string;
  endpointUrl: string;
  createdOn: Date;
  expiresOn?: Date;
}

export interface ICreateShortlinkDto {
  endpoint: string;
}

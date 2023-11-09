export interface IShortLinksListDto {
  page: number;
  pageSize: number;
  totalEntries: number;
  hits?: number;
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

export interface IHitsHistoryDto {
  dateTimeKey: string;
  dateTime: Date;
  totalHits: number;
}

export interface ICreateShortlinkDto {
  endpoint: string;
}

export type RequestStatus = 'Failed' | 'Completed' | 'Pending' | 'Valid' | 'Invalid' | string;

export interface RequestRecord {
  id: number;
  parentId: number | null;
  correlationId: string;
  sourceChannel: string;
  productCode: string;
  policyId: string;
  producerId: string;
  expirationDate: string;
  status: RequestStatus;
  payload: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface RequestMemberRecord {
  id: number;
  requestId: number;
  isMainInsured: boolean;
  firstName: string;
  lastName: string;
  middleName: string | null;
  gender: 'M' | 'F' | string;
  birthDate: string;
  amkaNum: string | null;
  marketingConsent: boolean;
  gdprConsent: boolean;
  homePhoneNum: string | null;
  cellularPhoneNum: string | null;
  emailAddress: string | null;
  taxNumType: string | null;
  taxNum: string | null;
  idNum: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  crmId: string | null;
  nelisId: string | null;
  prospectId: string | null;
  personalizedLink: string | null;
  errorCode: string | null;
  errorDescription: string | null;
}

export interface RequestSearchFilters {
  correlationId: string;
  sourceChannel: string;
  policyId: string;
  producerId: string;
  status: string;
  parentCorrelationId: string;
  memberQuery: string;
}

export interface RequestAggregate {
  request: RequestRecord;
  parentRequest: RequestRecord | null;
  members: RequestMemberRecord[];
}

export type RequestUpdateInput = Pick<RequestRecord, 'sourceChannel' | 'producerId' | 'status' | 'expirationDate'>;


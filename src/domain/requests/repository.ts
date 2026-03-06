import { appConfig } from '../../config/appConfig';
import requestMembersSeed from '../../mocks/data/requestMembers.json';
import requestsSeed from '../../mocks/data/requests.json';
import type {
  RequestAggregate,
  RequestMemberRecord,
  RequestRecord,
  RequestSearchFilters,
  RequestUpdateInput,
} from './types';

export interface RequestRepository {
  getRequests(filters?: Partial<RequestSearchFilters>): Promise<RequestAggregate[]>;
  updateRequest(id: number, input: RequestUpdateInput): Promise<RequestRecord>;
}

class MockRequestRepository implements RequestRepository {
  private requests = (requestsSeed as RequestRecord[]).map((request) => ({ ...request }));
  private members = (requestMembersSeed as RequestMemberRecord[]).map((member) => ({ ...member }));

  async getRequests(filters?: Partial<RequestSearchFilters>): Promise<RequestAggregate[]> {
    const requestsById = new Map(this.requests.map((request) => [request.id, request]));

    const aggregates = this.requests.map((request) => {
      const parentRequest = request.parentId ? requestsById.get(request.parentId) ?? null : null;
      const members = this.members.filter((member) => member.requestId === request.id);

      return { request, parentRequest, members };
    });

    return applyRequestFilters(aggregates, filters ?? {});
  }

  async updateRequest(id: number, input: RequestUpdateInput): Promise<RequestRecord> {
    const request = this.requests.find((item) => item.id === id);
    if (!request) {
      throw new Error(`Request with id ${id} was not found`);
    }

    Object.assign(request, input, { updatedAt: new Date().toISOString() });
    return { ...request };
  }
}

class ApiRequestRepository implements RequestRepository {
  async getRequests(filters?: Partial<RequestSearchFilters>): Promise<RequestAggregate[]> {
    const query = toQueryString(filters ?? {});
    const response = await fetch(`${appConfig.apiBaseUrl}/requests${query}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch requests from API');
    }

    return (await response.json()) as RequestAggregate[];
  }

  async updateRequest(id: number, input: RequestUpdateInput): Promise<RequestRecord> {
    const response = await fetch(`${appConfig.apiBaseUrl}/requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Failed to update request from API');
    }

    return (await response.json()) as RequestRecord;
  }
}

const toQueryString = (filters: Partial<RequestSearchFilters>): string => {
  const entries = Object.entries(filters).filter(([, value]) => Boolean(value));
  if (!entries.length) {
    return '';
  }

  const params = new URLSearchParams(entries as [string, string][]);
  return `?${params.toString()}`;
};

const includes = (value: string, query: string): boolean =>
  value.toLowerCase().includes(query.toLowerCase());

const applyRequestFilters = (
  items: RequestAggregate[],
  filters: Partial<RequestSearchFilters>,
): RequestAggregate[] => {
  return items.filter((item) => {
    if (filters.correlationId && !includes(item.request.correlationId, filters.correlationId)) {
      return false;
    }

    if (filters.sourceChannel && !includes(item.request.sourceChannel, filters.sourceChannel)) {
      return false;
    }

    if (filters.policyId && !includes(item.request.policyId, filters.policyId)) {
      return false;
    }

    if (filters.producerId && !includes(item.request.producerId, filters.producerId)) {
      return false;
    }

    if (filters.status && !includes(item.request.status, filters.status)) {
      return false;
    }

    if (
      filters.parentCorrelationId &&
      !(item.parentRequest && includes(item.parentRequest.correlationId, filters.parentCorrelationId))
    ) {
      return false;
    }

    if (filters.memberQuery) {
      const hasMatchingMember = item.members.some((member) => {
        const query = filters.memberQuery ?? '';
        return (
          includes(member.firstName, query) ||
          includes(member.lastName, query) ||
          includes(member.status, query) ||
          includes(member.taxNum ?? '', query)
        );
      });

      if (!hasMatchingMember) {
        return false;
      }
    }

    return true;
  });
};

export const requestRepository: RequestRepository =
  appConfig.dataSource === 'api' ? new ApiRequestRepository() : new MockRequestRepository();


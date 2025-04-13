import { ApiOptions, ApiResponse } from './types';

/**
 * API 요청의 기본 주소 (환경변수 기반)
 * 예: NEXT_PUBLIC_API_URL=http://localhost:8000/api
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * API 요청 시 사용할 옵션 타입
 * - params: 쿼리스트링
 * - body: JSON 요청 본문
 */

/**
 * 공통 fetch 함수 (API 호출용)
 * - Django 백엔드와 통신
 * - HTTP 메서드 및 쿼리스트링 지원
 * - 예외 처리 및 응답 파싱 포함
 *
 * @param path API 경로 (예: "/ddp/db/")
 * @param options 요청 옵션 (메서드, 파라미터, 본문 등)
 * @returns 파싱된 JSON 데이터
 */
export async function fetcher<T>(path: string, options: ApiOptions = {}): Promise<ApiResponse<T>> {
  // URL 생성 + 쿼리 파라미터 추가
  const url = new URL(`${API_BASE}${path}`);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) =>
      url.searchParams.append(key, String(value)),
    );
  }

  // fetch 요청
  const res = await fetch(url.toString(), {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  // 오류 처리
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `API 호출 실패: ${res.status}`);
  }

  const json: ApiResponse<T> = await res.json();

  // 예외 상황 핸들링 가능
  if (json.status !== 'success') {
    throw new Error(json.message || 'API 요청 실패');
  }

  // JSON 파싱 결과 반환
  return json;
}

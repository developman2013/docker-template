#!/usr/bin/env bash
set -euo pipefail

FRONTEND_URL="${FRONTEND_URL:-http://localhost}"
API_BASE_URL="${API_BASE_URL:-http://localhost:5001}"
SMOKE_TIMEOUT_SECONDS="${SMOKE_TIMEOUT_SECONDS:-90}"
SMOKE_RETRY_DELAY_SECONDS="${SMOKE_RETRY_DELAY_SECONDS:-2}"

wait_for_http_200() {
  local url="$1"
  local deadline=$((SECONDS + SMOKE_TIMEOUT_SECONDS))
  local status=""

  while (( SECONDS < deadline )); do
    status="$(curl -sS -o /dev/null -w "%{http_code}" "${url}" || true)"

    if [[ "${status}" == "200" ]]; then
      echo "Ready: ${url}"
      return 0
    fi

    sleep "${SMOKE_RETRY_DELAY_SECONDS}"
  done

  echo "Smoke test failed: ${url} did not return 200 within ${SMOKE_TIMEOUT_SECONDS}s (last status: ${status:-n/a})"
  return 1
}

wait_for_http_200 "${FRONTEND_URL}"
wait_for_http_200 "${API_BASE_URL}/healthz"
wait_for_http_200 "${API_BASE_URL}/weatherforecast"

echo "Smoke test passed"

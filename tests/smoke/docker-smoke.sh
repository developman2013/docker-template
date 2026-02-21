#!/usr/bin/env bash
set -euo pipefail

FRONTEND_URL="${FRONTEND_URL:-http://localhost}"
API_BASE_URL="${API_BASE_URL:-http://localhost:5001}"

frontend_status="$(curl -sS -o /dev/null -w "%{http_code}" "${FRONTEND_URL}")"
api_health_status="$(curl -sS -o /dev/null -w "%{http_code}" "${API_BASE_URL}/healthz")"
api_forecast_status="$(curl -sS -o /dev/null -w "%{http_code}" "${API_BASE_URL}/weatherforecast")"

if [[ "${frontend_status}" != "200" ]]; then
  echo "Smoke test failed: frontend status ${frontend_status}"
  exit 1
fi

if [[ "${api_health_status}" != "200" ]]; then
  echo "Smoke test failed: health endpoint status ${api_health_status}"
  exit 1
fi

if [[ "${api_forecast_status}" != "200" ]]; then
  echo "Smoke test failed: weatherforecast status ${api_forecast_status}"
  exit 1
fi

echo "Smoke test passed"

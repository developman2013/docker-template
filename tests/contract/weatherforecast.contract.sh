#!/usr/bin/env bash
set -euo pipefail

API_BASE_URL="${API_BASE_URL:-http://localhost:5001}"
ENDPOINT="${API_BASE_URL}/weatherforecast"

response_file="$(mktemp)"
status_code="$(curl -sS -o "${response_file}" -w "%{http_code}" "${ENDPOINT}")"

if [[ "${status_code}" != "200" ]]; then
  echo "Contract test failed: expected status 200, got ${status_code}"
  cat "${response_file}"
  exit 1
fi

jq -e '
  type == "array" and
  length == 5 and
  all(.[];
    (keys | sort) == ["date", "summary", "temperatureC", "temperatureF"] and
    (.date | type == "string") and
    (.summary | type == "string") and
    (.temperatureC | type == "number") and
    (.temperatureF | type == "number")
  )
' "${response_file}" >/dev/null

echo "Contract test passed: ${ENDPOINT}"

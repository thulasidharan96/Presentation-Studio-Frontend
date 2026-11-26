#!/bin/sh
set -eu

escape_json() {
    printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g' -e 's/</\\u003c/g' -e ':a' -e 'N' -e '$!ba' -e 's/\n/\\n/g'
}

api_base_url=$(escape_json "${VITE_API_BASE_URL:-/api/v1}")
tenant_id=$(escape_json "${VITE_AZURE_TENANT_ID:-}")
client_id=$(escape_json "${VITE_AZURE_CLIENT_ID:-}")
api_scope=$(escape_json "${VITE_AZURE_API_SCOPE:-}")

cat > /usr/share/nginx/html/env-config.js <<EOF
window.__ENV__ = {
  VITE_API_BASE_URL: "$api_base_url",
  VITE_AZURE_TENANT_ID: "$tenant_id",
  VITE_AZURE_CLIENT_ID: "$client_id",
  VITE_AZURE_API_SCOPE: "$api_scope"
};
EOF

exec "$@"

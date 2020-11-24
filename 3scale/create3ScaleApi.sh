#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}\n\t==============================================="
echo -e "\t\tRun APICAST container"
echo -e "\t===============================================${NC}\n"

echo -e "\n${BLUE}==> Logging into redhat docker registry...${NC}\n"

3scale metrics list https://2e773e4e779397e0487a35a2fb90c05a@3scale-admin.apps.openshift.incubation.api.canada.ca 20

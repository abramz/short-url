#!/bin/bash
#
# Environment variables
#export PROJECT_ID=
#export CLUSTER_NAME=
#export ZONE=

# Create container cluster
gcloud beta container --project "${PROJECT_ID}" \
	clusters create "${CLUSTER_NAME}" \
	--zone "${ZONE}" \
	--machine-type "n1-standard-1" \
	--scope "https://www.googleapis.com/auth/compute" \
		"https://www.googleapis.com/auth/devstorage.read_only" \
		"https://www.googleapis.com/auth/sqlservice.admin" \
		"https://www.googleapis.com/auth/logging.write" \
		"https://www.googleapis.com/auth/monitoring" \
	--num-nodes "5" \
	--network "default"

# create api controller & service
kubectl create -f ./api/definitions/api-controller.yml
kubectl create -f ./api/definitions/api-service.yml

# create proxy controller & service
kubectl create -f ./proxy/definitions/proxy-controller.yml
kubectl create -f ./proxy/definitions/proxy-service.yml

# display controllersr and services
kubectl get rc
kubectl get services

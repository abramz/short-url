#! /bin/bash
# authenticate our deployment service account
echo $GCLOUD_KEY | base64 --decode > gcloud.p12
~/google-cloud-sdk/bin/gcloud auth activate-service-account $GCLOUD_EMAIL --key-file gcloud.p12
ssh-keygen -f ~/.ssh/google_compute_engine -N ""
# push to google container registry
~/google-cloud-sdk/bin/gcloud docker push $GCLOUD_IMAGE:$TRAVIS_BUILD_ID
# add creds for kubectl
~/google-cloud-sdk/bin/gcloud container clusters get-credentials $GCLOUD_CLUSTER_NAME --zone $GCLOUD_ZONE
# rolling update
~/google-cloud-sdk/bin/kubectl rolling-update $GCLOUD_CONTROLLER_NAME --image=$GCLOUD_IMAGE:$TRAVIS_BUILD_ID

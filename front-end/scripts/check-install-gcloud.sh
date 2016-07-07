#! /bin/bash
pip install pyopenssl
if [ ! -d ~/google-cloud-sdk ]; then
    curl https://sdk.cloud.google.com | bash;
    ~/google-cloud-sdk/bin/gcloud components update preview;
    ~/google-cloud-sdk/bin/gcloud components update kubectl;
    ~/google-cloud-sdk/bin/gcloud config set project $GCLOUD_PROJECT_ID;
    ~/google-cloud-sdk/bin/gcloud config set compute/zone $GCLOUD_ZONE;
    ~/google-cloud-sdk/bin/gcloud config set container/cluster $GCLOUD_CLUSTER_NAME
fi

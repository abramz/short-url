# short-url
Master repository for ShortUrl.

# Deployment
## Front end
On successful build of the master branch, the code in /dist is deployed to a Google Cloud Storage.

## API
On successful build of the master branch, the docker image is deployed to Google Container Registry and a rolling update of the Container Cluster is initiated.

## Proxy
On successful build of the master branch, the docker image is deployed to Google Container Registry and a rolling update of the Container Cluster is initiated.

# [License](LICENSE.txt)

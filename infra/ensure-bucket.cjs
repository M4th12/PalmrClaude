#!/usr/bin/env node
// Creates the internal storage bucket if it does not exist yet.
// Replaces the MinIO client (mc), whose download is no longer available.
// Uses the S3 SDK already shipped with the server; must live next to its node_modules.
const { S3Client, HeadBucketCommand, CreateBucketCommand } = require("@aws-sdk/client-s3");

const { EB_ENDPOINT, EB_ACCESS_KEY, EB_SECRET_KEY, EB_BUCKET } = process.env;

if (!EB_ENDPOINT || !EB_ACCESS_KEY || !EB_SECRET_KEY || !EB_BUCKET) {
  console.error("[ensure-bucket] Missing EB_ENDPOINT / EB_ACCESS_KEY / EB_SECRET_KEY / EB_BUCKET");
  process.exit(2);
}

const client = new S3Client({
  endpoint: EB_ENDPOINT,
  region: "us-east-1",
  forcePathStyle: true,
  credentials: { accessKeyId: EB_ACCESS_KEY, secretAccessKey: EB_SECRET_KEY },
});

async function main() {
  try {
    await client.send(new HeadBucketCommand({ Bucket: EB_BUCKET }));
    console.log(`[ensure-bucket] Bucket '${EB_BUCKET}' already exists`);
    return;
  } catch (err) {
    const status = err?.$metadata?.httpStatusCode;
    if (status !== 404 && err?.name !== "NotFound" && err?.name !== "NoSuchBucket") {
      throw err;
    }
  }

  try {
    await client.send(new CreateBucketCommand({ Bucket: EB_BUCKET }));
    console.log(`[ensure-bucket] Bucket '${EB_BUCKET}' created`);
  } catch (err) {
    if (err?.name === "BucketAlreadyOwnedByYou" || err?.name === "BucketAlreadyExists") {
      console.log(`[ensure-bucket] Bucket '${EB_BUCKET}' already exists`);
      return;
    }
    throw err;
  }
}

main().catch((err) => {
  console.error(`[ensure-bucket] Failed: ${err?.name || "Error"}: ${err?.message || err}`);
  process.exit(1);
});

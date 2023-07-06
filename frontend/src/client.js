import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = new sanityClient({
  projectId: portfolio-inky-two-96.vercel.app,
  dataset: "production",
  apiVersion: "2022-02-01",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// import { SanityClient } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";

// export const client = new SanityClient({
//   projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
//   dataset: "production",
//   apiVersion: "2022-02-01",
//   iseCdn: true,
//   token: process.env.REACT_APP_SANITY_TOKEN,
// });

// const builder = new imageUrlBuilder(client);

// export const urlFor = (source) => builder.image(source);

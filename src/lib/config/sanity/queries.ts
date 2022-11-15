import groq from 'groq';

const postFields = groq`
  _id,
  name,
  title,
  date,
  postContent,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`;

export const settingsQuery = groq`*[_type == "settings"][0]{title}`;

export const postVisionQuery = groq`*[_type == "post"] | order(date desc, _updatedAt desc) {
  ...
}`;

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;


// POSTS STUFF
export const postQuery = groq`
{
  "draft": *[_type == "post" && slug.current == $slug && defined(draft) && draft == true][0]{
    content,
    ${postFields}
  },
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`;

export const allPostsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;
